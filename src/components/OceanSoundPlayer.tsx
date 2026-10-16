"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Waves,
  ChevronUp,
  ChevronDown,
  Info,
} from "lucide-react";
import { oceanSynth } from "@/lib/sound-synth";

interface OceanSoundPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function OceanSoundPlayer({
  isPlaying,
  onTogglePlay,
}: OceanSoundPlayerProps) {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  // Sync with audio synthesizer
  useEffect(() => {
    if (isPlaying) {
      hasStartedRef.current = true;
      oceanSynth.start().catch(() => {
        setAudioError("Browser audio blocked or unsupported.");
      });
    } else {
      if (hasStartedRef.current) {
        oceanSynth.stop();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    oceanSynth.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    oceanSynth.setMuted(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
  };

  return (
    <aside
      aria-label="Ambient Ocean Sound Player"
      className="fixed bottom-6 left-6 z-30 transition-all duration-300"
    >
      <div className="bg-white/90 backdrop-blur-md border border-[#294B40]/15 rounded-3xl shadow-lg p-3 sm:p-4 text-[#294B40] transition-all">
        {/* Collapsed Bar / Header */}
        <div className="flex items-center gap-3">
          {/* Main Play/Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isPlaying
                ? "bg-[#294B40] text-white"
                : "bg-[#DCE9DF] text-[#294B40] hover:bg-[#c9ded0]"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]`}
            aria-label={isPlaying ? "Pause ocean wave sound" : "Play ambient ocean wave sound"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Label & Sound Status */}
          <div className="flex flex-col cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-bold text-[#294B40]">
                Ocean Soundscape
              </span>
              {/* Animated wave bars */}
              {isPlaying && !isMuted ? (
                <div className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
                  <span className="w-1 bg-[#3E6759] h-2.5 rounded-full animate-pulse" />
                  <span className="w-1 bg-[#3E6759] h-3.5 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 bg-[#3E6759] h-1.5 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                </div>
              ) : (
                <Waves className="w-3.5 h-3.5 text-[#65736B]" />
              )}
            </div>
            <span className="text-[10px] text-[#65736B]">
              {isPlaying ? (isMuted ? "Muted" : "Playing gently") : "Optional ambient calm"}
            </span>
          </div>

          {/* Quick Mute/Unmute */}
          {isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full text-[#65736B] hover:text-[#294B40] hover:bg-[#DCE9DF]/40 transition-colors"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          {/* Expand/Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full text-[#65736B] hover:text-[#294B40] transition-colors"
            aria-label={isExpanded ? "Collapse ocean sound controls" : "Expand ocean sound controls"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Controls Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-[#294B40]/10 space-y-3 animate-fade-in w-64">
            {/* Volume Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#65736B]">
                <span>Volume</span>
                <span>{isMuted ? "0%" : `${Math.round(volume * 100)}%`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-[#DCE9DF] rounded-lg appearance-none cursor-pointer accent-[#294B40]"
                aria-label="Ocean wave volume level"
              />
            </div>

            {/* Note & Tech transparency */}
            <div className="p-2 rounded-xl bg-[#FBF9F4] border border-[#294B40]/10 text-[10px] text-[#65736B] leading-tight flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#3E6759] shrink-0 mt-0.5" />
              <span>
                Generated procedurally with Web Audio API. Seamless looping, 0MB download, completely free.
              </span>
            </div>

            {audioError && (
              <p className="text-[10px] text-[#C46860]">{audioError}</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
