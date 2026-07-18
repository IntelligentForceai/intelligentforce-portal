import { useState, useRef } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

interface AlexVideoProps {
  /** Path or URL to the HeyGen MP4 video file. Leave empty to show placeholder. */
  videoSrc?: string;
  /** Poster image shown before play */
  posterSrc?: string;
  className?: string;
}

export default function AlexVideo({ videoSrc, posterSrc, className = "" }: AlexVideoProps) {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleEnded = () => setPlaying(false);

  // Default poster – ALEX image
  const defaultPoster =
    posterSrc ||
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663514335084/QGFVPTlLwNCwfnql.png";

  return (
    <div
      className={`alex-video-container glow-blue ${className}`}
      style={{ position: "relative", overflow: "hidden", borderRadius: "inherit" }}
    >
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={defaultPoster}
            playsInline
            onEnded={handleEnded}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          {/* Controls overlay */}
          {!playing && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.35)",
              }}
            >
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 btn-gradient px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                aria-label={t.alex.playBtn}
              >
                <Play size={20} fill="white" />
                {t.alex.playBtn}
              </button>
            </div>
          )}
          {playing && (
            <button
              onClick={toggleMute}
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                padding: "0.5rem",
                background: "rgba(0,0,0,0.5)",
                borderRadius: "9999px",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
        </>
      ) : (
        /* Placeholder */
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={defaultPoster}
            alt="ALEX – IntelligentForce AI Assistant"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: 0.85,
            }}
          />
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center" }}>
            <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center shadow-lg">
              <Play size={28} fill="white" className="ml-1" />
            </div>
            <p className="text-white font-semibold text-sm drop-shadow">{t.alex.playBtn}</p>
          </div>
        </div>
      )}
    </div>
  );
}
