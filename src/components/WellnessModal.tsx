"use client";

import React, { useEffect } from "react";
import { X, Sparkles, Lightbulb, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import { WellnessTopic } from "@/types";

interface WellnessModalProps {
  topic: WellnessTopic | null;
  onClose: () => void;
  onAskBloom: (prompt: string) => void;
}

export default function WellnessModal({
  topic,
  onClose,
  onAskBloom,
}: WellnessModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (topic) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [topic, onClose]);

  if (!topic) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#294B40]/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FBF9F4] rounded-3xl shadow-2xl border border-[#294B40]/15 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-6 sm:p-8 ${topic.accentBg} border-b ${topic.borderColor} relative`}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-[#294B40] transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-block px-3 py-1 rounded-full bg-white/80 text-[#294B40] text-xs font-semibold uppercase tracking-wider mb-3">
            {topic.badge}
          </div>

          <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#294B40]">
            {topic.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#4E6258] leading-relaxed max-w-2xl">
            {topic.summary}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#65736B]">
            <Compass className="w-4 h-4 text-[#3E6759]" />
            <span>Practical Everyday Habits</span>
          </div>

          {/* Subtopics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.subtopics.map((sub, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#294B40]/10 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#294B40] mb-2">
                    {sub.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#65736B] leading-relaxed mb-4">
                    {sub.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#DCE9DF]/30 border border-[#DCE9DF] flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-[#3E6759] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#294B40] leading-snug">
                    <strong className="font-semibold">Gentle Practice:</strong> {sub.practicalTip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gentle Reminder Box */}
          <div className="rounded-2xl p-4 bg-[#EAE1F6]/40 border border-[#EAE1F6] flex items-start gap-3">
            <span className="text-lg">🌿</span>
            <p className="text-xs sm:text-sm text-[#543E73] italic leading-relaxed">
              &ldquo;{topic.gentleReminder}&rdquo;
            </p>
          </div>

          {/* Suggested Questions for Bloom */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#65736B] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3E6759]" />
              <span>Ask Bloom AI for personalized ideas</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {topic.recommendedQuestions.map((question, qIdx) => (
                <button
                  key={qIdx}
                  type="button"
                  onClick={() => {
                    onClose();
                    onAskBloom(question);
                  }}
                  className="group text-xs text-left px-3.5 py-2 rounded-xl bg-white hover:bg-[#DCE9DF]/50 border border-[#294B40]/15 text-[#294B40] transition-colors flex items-center gap-2"
                >
                  <span>{question}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#65736B] group-hover:text-[#294B40] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white/80 border-t border-[#294B40]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#65736B]">
            <ShieldCheck className="w-4 h-4 text-[#3E6759]" />
            <span>General wellness education. Non-medical guidance.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#294B40] text-white text-xs font-semibold hover:bg-[#1E372F] transition-colors"
          >
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
