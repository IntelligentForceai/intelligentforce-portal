import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

// Caption type: array of { time (seconds), text }
export interface Caption {
  time: number;
  text: string;
}

interface AlexVideoProps {
  /** Path or URL to the HeyGen MP4 video file. Leave empty to show placeholder. */
  videoSrc?: string;
  /** Poster image shown before play */
  posterSrc?: string;
  className?: string;
  /** Optional timed captions to display during playback */
  captions?: Caption[];
}

export default function AlexVideo({ videoSrc, posterSrc, className = "", captions }: AlexVideoProps) {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentCaption, setCurrentCaption] = useState<string>("");
  const [captionVisible, setCaptionVisible] = useState(false);

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

  const handleEnded = () => {
    setPlaying(false);
    setCurrentCaption("");
    setCaptionVisible(false);
  };

  // Caption sync via timeupdate
  useEffect(() => {
    if (!captions || captions.length === 0) return;
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const t = video.currentTime;
      // Find the most recent caption whose time <= current time
      let active = "";
      for (let i = captions.length - 1; i >= 0; i--) {
        if (t >= captions[i].time) {
          active = captions[i].text;
          break;
        }
      }
      if (active !== currentCaption) {
        if (active) {
          setCaptionVisible(false);
          setTimeout(() => {
            setCurrentCaption(active);
            setCaptionVisible(true);
          }, 150);
        } else {
          setCaptionVisible(false);
          setTimeout(() => setCurrentCaption(""), 300);
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [captions, currentCaption]);

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

          {/* Captions overlay – bottom of video */}
          {captions && captions.length > 0 && playing && currentCaption && (
            <div
              className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8 transition-opacity duration-300 ${
                captionVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
              }}
            >
              <p className="text-white text-center text-sm font-medium leading-snug drop-shadow-lg">
                {currentCaption}
              </p>
            </div>
          )}

          {/* Mute toggle – top right when playing */}
          {playing && (
            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors z-10"
            >
              {muted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
            </button>
          )}

          {/* Play overlay */}
          {!playing && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={handlePlay}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                <Play size={28} fill="white" className="ml-1" />
              </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
