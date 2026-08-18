#!/usr/bin/env python3
"""Deploy the built IntelligentForce portal to Domeneshop using a private local config.

The JSON config is deliberately stored outside this repository. Set
INTELLIGENTFORCE_DEPLOY_CONFIG to use a different local path.
"""

from __future__ import annotations

import argparse
import ftplib
import json
import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONFIG = Path("/home/ubuntu/.intelligentforce/domeneshop_deploy.json")
DEFAULT_BUILD = PROJECT_ROOT / "dist" / "public"


def load_config() -> dict[str, str]:
    config_path = Path(os.environ.get("INTELLIGENTFORCE_DEPLOY_CONFIG", DEFAULT_CONFIG))
    if not config_path.exists():
        raise FileNotFoundError(
            f"Missing private deploy config: {config_path}. "
            "Create it outside the repository before deploying."
        )
    if config_path.stat().st_mode & 0o077:
        raise PermissionError(
            f"Private deploy config has unsafe permissions: {config_path}. Run chmod 600."
        )
    config = json.loads(config_path.read_text(encoding="utf-8"))
    required = {"host", "user", "password", "remote_dir"}
    missing = required - set(config)
    if missing:
        raise ValueError(f"Private deploy config is missing: {', '.join(sorted(missing))}")
    return config


def upload_file(ftp: ftplib.FTP_TLS, local_path: Path, remote_path: str) -> None:
    with local_path.open("rb") as handle:
        ftp.storbinary(f"STOR {remote_path}", handle)
    print(f"uploaded {remote_path} ({local_path.stat().st_size:,} bytes)")


def upload_directory(ftp: ftplib.FTP_TLS, local_directory: Path, remote_directory: str) -> None:
    try:
        ftp.mkd(remote_directory)
    except ftplib.all_errors:
        pass
    for item in sorted(local_directory.iterdir()):
        if item.is_file():
            upload_file(ftp, item, f"{remote_directory}/{item.name}")


def deploy(build_directory: Path, config: dict[str, str], dry_run: bool) -> None:
    if not build_directory.is_dir():
        raise FileNotFoundError(f"Build output does not exist: {build_directory}")
    required_files = [build_directory / ".htaccess", build_directory / "index.html", build_directory / "assets"]
    missing = [str(path) for path in required_files if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Build output is incomplete: {', '.join(missing)}")

    if dry_run:
        print(f"dry run only: would deploy {build_directory} to {config['host']}{config['remote_dir']}")
        return

    remote_dir = config["remote_dir"].rstrip("/") or "/www"
    ftp = ftplib.FTP_TLS()
    ftp.connect(config["host"], 21, timeout=120)
    ftp.login(config["user"], config["password"])
    ftp.prot_p()
    ftp.set_pasv(True)
    try:
        # Remove stale compiled assets before publishing the fresh build.
        try:
            old_assets: list[str] = []
            ftp.retrlines(f"NLST {remote_dir}/assets", old_assets.append)
            for remote_asset in old_assets:
                name = remote_asset.rsplit("/", 1)[-1]
                if name and "/" not in name:
                    try:
                        ftp.delete(f"{remote_dir}/assets/{name}")
                    except ftplib.all_errors:
                        pass
        except ftplib.all_errors:
            pass

        upload_file(ftp, build_directory / ".htaccess", f"{remote_dir}/.htaccess")
        upload_file(ftp, build_directory / "index.html", f"{remote_dir}/index.html")
        upload_directory(ftp, build_directory / "assets", f"{remote_dir}/assets")

        for item in sorted(build_directory.iterdir()):
            if item.name in {".htaccess", "index.html", "assets"}:
                continue
            if item.is_file():
                upload_file(ftp, item, f"{remote_dir}/{item.name}")
            elif item.is_dir():
                upload_directory(ftp, item, f"{remote_dir}/{item.name}")
    finally:
        try:
            ftp.quit()
        except ftplib.all_errors:
            ftp.close()


def main() -> int:
    parser = argparse.ArgumentParser(description="Deploy IntelligentForce portal to Domeneshop")
    parser.add_argument("--build-dir", type=Path, default=DEFAULT_BUILD)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    deploy(args.build_dir, load_config(), args.dry_run)
    print("deploy complete" if not args.dry_run else "dry run complete")
    return 0


if __name__ == "__main__":
    sys.exit(main())
