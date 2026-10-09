"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
  label?: string;
}

const SPEEDS = [1, 1.25, 1.5, 2, 0.75] as const;

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/**
 * Starts as a compact "N min listen" pill. Pressing play expands it into a full
 * player (progress, duration, speed) that sticks to the top while scrolling.
 */
const AudioPlayer: FC<AudioPlayerProps> = ({ src, title, label = "listen" }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration)) setDuration(audio.duration);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = SPEEDS[speedIndex];
  }, [speedIndex]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setExpanded(true);
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const minutes = duration > 0 ? Math.max(1, Math.round(duration / 60)) : null;

  return (
    <div className={`z-40 my-6 ${expanded ? "sticky top-20" : ""}`}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className={`flex items-center gap-3 rounded-full bg-white ring-1 ring-neutral-900/15 shadow-lg shadow-neutral-900/10 p-1.5 pr-4 ${
          expanded ? "w-full" : "w-fit"
        }`}
      >
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform hover:scale-105 active:scale-95"
        >
          {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
        </button>

        {!expanded ? (
          <span className="text-sm font-medium text-neutral-800 whitespace-nowrap">
            {minutes ? `${minutes} min ${label}` : label}
          </span>
        ) : (
          <>
            <span className="w-10 shrink-0 text-right text-xs tabular-nums text-neutral-500">{formatTime(current)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={current}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full accent-neutral-900"
              style={{ background: `linear-gradient(to right, #171717 ${progress}%, #d4d4d4 ${progress}%)` }}
            />
            <span className="w-10 shrink-0 text-xs tabular-nums text-neutral-500">{formatTime(duration)}</span>
            <button
              type="button"
              onClick={() => setSpeedIndex((i) => (i + 1) % SPEEDS.length)}
              aria-label="Change playback speed"
              className="w-11 shrink-0 rounded-full py-1 text-xs font-medium tabular-nums text-neutral-600 hover:bg-neutral-100"
            >
              {SPEEDS[speedIndex]}x
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
