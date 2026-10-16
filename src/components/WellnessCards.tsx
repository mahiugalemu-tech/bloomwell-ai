"use client";

import React, { useState } from "react";
import {
  Activity,
  Utensils,
  Moon,
  Sparkles,
  Droplet,
  Compass,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { WELLNESS_TOPICS } from "@/lib/wellness-topics";
import { WellnessTopic } from "@/types";
import WellnessModal from "./WellnessModal";

interface WellnessCardsProps {
  onAskBloom: (prompt: string) => void;
}

export default function WellnessCards({ onAskBloom }: WellnessCardsProps) {
  const [selectedTopic, setSelectedTopic] = useState<WellnessTopic | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return Activity;
      case "Utensils":
        return Utensils;
      case "Moon":
        return Moon;
      case "Sparkles":
        return Sparkles;
      case "Droplet":
        return Droplet;
      case "Compass":
      default:
        return Compass;
    }
  };

  return (
    <section
      id="wellness"
      aria-label="Wellness Exploration"
      className="py-24 bg-[#FBF9F4] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE1F6]/70 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#6B4B96]" />
            <span>Gentle Dimensions of Health</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
            Explore Everyday Wellness
          </h2>

          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed">
            Choose an area of your day you would love to bring more ease and vitality to.
            Click any dimension to uncover practical, non-prescriptive daily habits.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WELLNESS_TOPICS.map((topic) => {
            const Icon = getIcon(topic.iconName);
            return (
              <div
                key={topic.id}
                className="group relative bg-white/90 rounded-3xl p-7 border border-[#294B40]/10 shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${topic.accentBg} flex items-center justify-center text-[#294B40] border ${topic.borderColor} shadow-2xs group-hover:scale-105 transition-transform duration-200`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#65736B] px-3 py-1 rounded-full bg-[#FBF9F4] border border-[#294B40]/5">
                      {topic.badge}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-serif text-2xl font-bold text-[#294B40] mb-3 group-hover:text-[#365E51] transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-[#65736B] text-sm leading-relaxed mb-6 line-clamp-3">
                    {topic.summary}
                  </p>

                  {/* Subtopics Preview Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {topic.subtopics.slice(0, 2).map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium text-[#4E6258] bg-[#DCE9DF]/40 px-2.5 py-1 rounded-md"
                      >
                        {sub.title}
                      </span>
                    ))}
                    <span className="text-[11px] font-medium text-[#65736B] bg-gray-100 px-2 py-1 rounded-md">
                      +2 more
                    </span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#294B40]/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#294B40] hover:text-[#1E372F] group-hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40] rounded-md px-1 py-0.5"
                  >
                    <span>Explore Dimension</span>
                    <ArrowRight className="w-4 h-4 text-[#3E6759] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-xs text-[#65736B]/80 font-mono">
                    4 habits
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <WellnessModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onAskBloom={onAskBloom}
      />
    </section>
  );
}
