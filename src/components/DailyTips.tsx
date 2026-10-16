"use client";

import React, { useState } from "react";
import { RefreshCw, BookmarkCheck, Sun } from "lucide-react";
import { WELLNESS_TIPS } from "@/lib/wellness-tips";
import { TipCategory } from "@/types";

export default function DailyTips() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TipCategory | "All">("All");

  const categories: (TipCategory | "All")[] = [
    "All",
    "Movement",
    "Mindful Breathing",
    "Sleep",
    "Hydration",
    "Balanced Meals",
    "Relaxation",
    "Gratitude",
  ];

  const filteredTips = selectedCategory === "All"
    ? WELLNESS_TIPS
    : WELLNESS_TIPS.filter((t) => t.category === selectedCategory);

  const activeTip = filteredTips[currentIndex % filteredTips.length] || WELLNESS_TIPS[0];

  const handleNextTip = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTips.length);
      setIsFading(false);
    }, 180);
  };

  const handleCategorySelect = (cat: TipCategory | "All") => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <section
      id="tips"
      aria-label="Daily Wellness Tips"
      className="py-24 bg-white/70 relative border-t border-[#294B40]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9E7E5]/70 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-[#C46860]" />
            <span>Gentle Daily Inspiration</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
            A Little Good for Today
          </h2>

          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed">
            Bite-sized, practical habits for instant calm, mental clarity, and physical ease.
            No rigid regimens—just small, uplifting choices.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#294B40] text-white shadow-2xs"
                    : "bg-[#FBF9F4] text-[#65736B] hover:text-[#294B40] hover:bg-[#DCE9DF]/50 border border-[#294B40]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Tip Showcase Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#FBF9F4] rounded-3xl p-8 sm:p-12 border border-[#294B40]/15 shadow-sm overflow-hidden">
            {/* Background decorative orbs */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 bg-[#DCE9DF]/50 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#EAE1F6]/50 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Dynamic Tip Body with Fade Effect */}
            <div
              className={`transition-opacity duration-200 ${
                isFading ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
              }`}
            >
              {/* Category Badge & Index Indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-[#294B40]/15 text-[#294B40]">
                  {activeTip.category}
                </span>

                <span className="text-xs font-mono text-[#65736B]">
                  Tip {(currentIndex % filteredTips.length) + 1} of {filteredTips.length}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#294B40] mb-3">
                {activeTip.title}
              </h3>

              <p className="text-xs uppercase tracking-wider text-[#3E6759] font-semibold mb-4">
                &bull; {activeTip.tagline}
              </p>

              {/* Tip Content */}
              <p className="text-base sm:text-lg text-[#65736B] leading-relaxed mb-6 font-normal">
                {activeTip.tip}
              </p>

              {/* Action Step Highlight Box */}
              <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#294B40]/10 shadow-2xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#DCE9DF] flex items-center justify-center text-[#294B40] shrink-0">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#294B40] mb-1">
                    Try this today (under 2 minutes)
                  </h4>
                  <p className="text-sm text-[#4E6258] leading-normal font-medium">
                    {activeTip.actionStep}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="mt-8 pt-6 border-t border-[#294B40]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#65736B]">
                Curated local tips &bull; Available offline
              </span>

              <button
                type="button"
                onClick={handleNextTip}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#294B40] hover:bg-[#1E372F] text-white text-xs font-semibold shadow-xs transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFading ? "animate-spin" : ""}`} />
                <span>Show Another Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
