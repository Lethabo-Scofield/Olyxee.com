import { FC, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import TalkToEnterprise from "./EnterpriseContactModal";

const OrgniVideoSection: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion !== false) {
      video.pause();
      return;
    }

    let active = true;
    const attemptPlayback = async () => {
      try {
        await video.play();
        if (active) setIsPlaying(true);
      } catch {
        if (active) setIsPlaying(false);
      }
    };
    void attemptPlayback();

    return () => {
      active = false;
    };
  }, [reducedMotion]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section
      aria-labelledby="orgni-business-heading"
      className="relative isolate min-h-[560px] overflow-hidden bg-black text-white sm:min-h-[620px]"
    >
      <video
        ref={videoRef}
        src="/videos/research-areas.mp4"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay={reducedMotion === false}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 to-black/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-black/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-20 sm:min-h-[620px] sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-medium tracking-[0.16em] text-white/70">
            ORGNI BY OLYXEE
          </p>
          <h2
            id="orgni-business-heading"
            className="max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl"
          >
            Spend less time searching. Get back to your business.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Orgni brings your business knowledge, people and systems into
            practical context, so everyday work is easier to understand.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <TalkToEnterprise
              label="Talk through your business"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
            />
            <span className="text-sm text-white/65">
              An applied research environment for organizational intelligence.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 right-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 bg-black/45 px-4 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-8 sm:right-8"
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {isPlaying ? "Pause motion" : "Play motion"}
        </button>
      </div>
    </section>
  );
};

export default OrgniVideoSection;