"use client";

import React, { useState } from "react";
import { Sparkles, ArrowDown, Droplet, Heart, Wind, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenChat: (initialPrompt?: string) => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const [breathingStep, setBreathingStep] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [breathActive, setBreathActive] = useState(false);

  const startQuickBreath = () => {
    if (breathActive) return;
    setBreathActive(true);
    setBreathingStep("Inhale");

    setTimeout(() => {
      setBreathingStep("Hold");
      setTimeout(() => {
        setBreathingStep("Exhale");
        setTimeout(() => {
          setBreathActive(false);
          setBreathingStep("Inhale");
        }, 4000);
      }, 4000);
    }, 4000);
  };

  return (
    <section
      id="hero"
      aria-label="Welcome to BloomWell AI"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-mesh-soft"
    >
      {/* Soft Blurred Background Ambient Orbs */}
      <div
        className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-[#DCE9DF]/60 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#EAE1F6]/50 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-[#F9E7E5]/55 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust-oriented badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#294B40]/15 text-[#294B40] text-xs font-semibold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#3E6759] animate-pulse" />
              <span>Your gentle guide to everyday wellness</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#294B40] font-bold tracking-tight leading-[1.12]">
              Feel better, <br />
              <span className="italic font-normal text-[#365E51]">
                one little habit
              </span>{" "}
              at a time.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#65736B] max-w-2xl font-normal leading-relaxed">
              Your everyday companion for mindful movement, nourishing choices,
              restful nights, and healthier routines. Discover small steps that
              fit your life.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#wellness"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#294B40] hover:bg-[#1E372F] text-[#FBF9F4] text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40] focus-visible:ring-offset-2 active:scale-98"
              >
                Explore Your Wellness
              </a>

              <button
                type="button"
                onClick={() => onOpenChat("Hi Bloom! Can you suggest a gentle morning habit to help me start my day feeling grounded?")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#294B40] border border-[#294B40]/20 text-base font-semibold shadow-xs hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40] active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#7A629B]" />
                <span>Chat with Bloom</span>
              </button>
            </div>

            {/* Micro-Features highlight */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#294B40]/10 max-w-lg">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#65736B]">
                <CheckCircle2 className="w-4 h-4 text-[#3E6759] shrink-0" />
                <span>100% Free to Use</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#65736B]">
                <CheckCircle2 className="w-4 h-4 text-[#3E6759] shrink-0" />
                <span>No Account Needed</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#65736B]">
                <CheckCircle2 className="w-4 h-4 text-[#3E6759] shrink-0" />
                <span>Gentle AI Guidance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Visual Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Center Visual Canvas with Layered Cards */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/50 border border-white/80 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
              {/* Organic decorative illustration backdrop */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10 opacity-70">
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#DCE9DF]/60 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#F9E7E5]/70 rounded-full blur-2xl" />
              </div>

              {/* Floating Card 1: Today's Intention */}
              <div className="bg-white/90 rounded-2xl p-4 border border-[#294B40]/10 shadow-xs animate-float-slow">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#294B40]/5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#65736B] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#C46860]" />
                    Today&apos;s Intention
                  </span>
                  <span className="text-[11px] bg-[#DCE9DF] text-[#294B40] font-medium px-2 py-0.5 rounded-full">
                    Grounded
                  </span>
                </div>
                <p className="text-sm font-medium text-[#294B40] italic">
                  &ldquo;Move with patience. Honor quiet pauses.&rdquo;
                </p>
              </div>

              {/* Floating Card 2: Interactive Mindful Pause */}
              <div className="bg-white/95 rounded-2xl p-4 border border-[#294B40]/10 shadow-sm mx-auto w-full my-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EAE1F6] flex items-center justify-center text-[#294B40]">
                      <Wind className="w-4 h-4 text-[#7A629B]" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-[#294B40]">
                        Take a Mindful Pause
                      </h2>
                      <p className="text-[11px] text-[#65736B]">
                        {breathActive ? `${breathingStep}... (4s)` : "One 12-second nervous system reset"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={startQuickBreath}
                    disabled={breathActive}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      breathActive
                        ? "bg-[#EAE1F6] text-[#294B40] animate-pulse"
                        : "bg-[#294B40] text-white hover:bg-[#1E372F]"
                    }`}
                  >
                    {breathActive ? breathingStep : "Breathe"}
                  </button>
                </div>

                {/* Micro breath progress visualizer */}
                {breathActive && (
                  <div className="mt-3 w-full bg-[#EAE1F6]/50 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7A629B] rounded-full animate-pulse w-full transition-all duration-1000" />
                  </div>
                )}
              </div>

              {/* Floating Card 3: Water Break Reminder */}
              <div className="bg-white/90 rounded-2xl p-4 border border-[#294B40]/10 shadow-xs animate-float-delayed">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E3E8F8] flex items-center justify-center text-[#3B66A3]">
                      <Droplet className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#294B40]">
                        Hydration Check
                      </p>
                      <p className="text-[11px] text-[#65736B]">
                        A crisp glass of water awaits
                      </p>
                    </div>
                  </div>
                  <a
                    href="#planner"
                    className="text-xs text-[#294B40] font-semibold hover:underline bg-[#DCE9DF]/50 px-2.5 py-1 rounded-full"
                  >
                    Track in Planner &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gentle Scroll Cue */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center text-xs font-medium text-[#65736B] hover:text-[#294B40] transition-colors focus:outline-none"
            aria-label="Scroll to About section"
          >
            <span>Learn our philosophy</span>
            <ArrowDown className="w-4 h-4 mt-1 text-[#65736B] group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
