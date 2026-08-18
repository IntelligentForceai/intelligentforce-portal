#!/usr/bin/env python3
"""Run a non-destructive IntelligentForce platform health check.

This script reads private credentials only from local files outside Git and prints
status codes and record counts, never secret values or customer content.
"""

from __future__ import annotations

import json
import subprocess
import sys
import urllib.request
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
PRIVATE_CONFIG = Path("/home/ubuntu/.intelligentforce/supabase_enterprise_ledger.json")


def request_json(url: str, payload: dict | None = None, headers: dict[str, str] | None = None) -> tuple[int, dict | str]:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = urllib.request.Request(url, data=data, headers=headers or {}, method="POST" if data else "GET")
    with urllib.request.urlopen(request, timeout=45) as response:
        body = response.read().decode("utf-8")
        try:
            return response.status, json.loads(body)
        except json.JSONDecodeError:
            return response.status, body


def check_http(url: str) -> dict[str, object]:
    status, _ = request_json(url)
    return {"url": url, "status": status, "ok": 200 <= status < 300}


def main() -> int:
    results: dict[str, object] = {}
    results["website"] = check_http("https://intelligentforce.ai/")
    results["admin"] = check_http("https://intelligentforce.ai/admin.html")

    worker_status, worker_body = request_json(
        "https://alex-ai-worker.vladimir-joffcheff.workers.dev/",
        payload={
            "messages": [{"role": "user", "content": "CONTROL CHECK ONLY: Confirm service availability briefly."}],
            "adminMode": False,
            "controlMode": True,
            "leadCapture": False,
        },
        headers={"Content-Type": "application/json", "User-Agent": "IntelligentForce-health-check/1.0"},
    )
    results["alex_worker"] = {
        "status": worker_status,
        "ok": worker_status == 200 and isinstance(worker_body, dict) and bool(worker_body.get("reply")),
    }

    private = json.loads(PRIVATE_CONFIG.read_text(encoding="utf-8"))
    key = private["service_role_key"]
    ledger_status, ledger_body = request_json(
        f"{private['url']}/rest/v1/leads?select=id",
        headers={"apikey": key, "Authorization": f"Bearer {key}"},
    )
    results["lead_ledger"] = {
        "status": ledger_status,
        "ok": ledger_status == 200 and isinstance(ledger_body, list),
        "record_count": len(ledger_body) if isinstance(ledger_body, list) else None,
    }

    head = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=PROJECT_ROOT, text=True).strip()
    remote = subprocess.check_output(["git", "rev-parse", "origin/main"], cwd=PROJECT_ROOT, text=True).strip()
    results["github"] = {"ok": head == remote, "head": head[:7], "remote": remote[:7]}

    print(json.dumps(results, indent=2, sort_keys=True))
    return 0 if all(item.get("ok") for item in results.values() if isinstance(item, dict) and "ok" in item) else 1


if __name__ == "__main__":
    sys.exit(main())
