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

  // Default poster – ALEX image from existing site
  const defaultPoster =
    posterSrc ||
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663514335084/QGFVPTlLwNCwfnql.png";

  return (
    <div className={`alex-video-container glow-blue ${className}`}>
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={defaultPoster}
            playsInline
            onEnded={handleEnded}
            className="w-full h-full object-cover"
          />
          {/* Controls overlay */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
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

        </>
      ) : (
        /* Placeholder – ready for HeyGen MP4 upload */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-card to-background p-6">
          <img
            src={defaultPoster}
            alt="ALEX – IntelligentForce AI Assistant"
            className="w-full h-full object-cover absolute inset-0 opacity-80"
          />
          <div className="relative z-10 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center shadow-lg">
              <Play size={28} fill="white" className="ml-1" />
            </div>
            <p className="text-white font-semibold text-sm drop-shadow">{t.alex.playBtn}</p>
            <p className="text-white/60 text-xs drop-shadow">
              {/* Placeholder notice – visible only in dev */}
              {import.meta.env.DEV && "📹 HeyGen MP4 goes here"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
