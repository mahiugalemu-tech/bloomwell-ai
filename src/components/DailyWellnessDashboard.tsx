"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Droplet,
  Plus,
  Minus,
  RotateCcw,
  Check,
  Sparkles,
  Info,
  Calendar,
  AlertTriangle,
  Award,
} from "lucide-react";
import { DashboardState, DailyHabit } from "@/types";

const DEFAULT_HABITS: DailyHabit[] = [
  {
    id: "h1",
    category: "movement",
    label: "10-minute gentle walk or light stretch",
    timeHint: "Morning or mid-day",
    completed: false,
    description: "Unfold the spine and awaken blood circulation.",
  },
  {
    id: "h2",
    category: "mindfulness",
    label: "3 conscious breathing pauses (4-6 breath)",
    timeHint: "Anytime you feel rushed",
    completed: false,
    description: "Signal your parasympathetic nervous system to slow down.",
  },
  {
    id: "h3",
    category: "nutrition",
    label: "Add a splash of color/vegetable to one meal",
    timeHint: "Lunch or dinner",
    completed: false,
    description: "Focus on adding vibrant nutrients rather than restricting.",
  },
  {
    id: "h4",
    category: "sleep",
    label: "30-minute evening digital dim-down",
    timeHint: "Before sleep",
    completed: false,
    description: "Switch overhead lights to warm lamps; set phone aside.",
  },
];

const INTENTION_SUGGESTIONS = [
  "Move with patience. Breathe deeply.",
  "Savor quiet moments of pause.",
  "Listen gently to my body's needs.",
  "Choose calm over constant rush.",
  "One kind thing for myself today.",
];

const STORAGE_KEY = "bloomwell_daily_reset_v1";

export default function DailyWellnessDashboard() {
  const [state, setState] = useState<DashboardState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            return {
              intention: parsed.intention || "Move with patience. Breathe deeply.",
              waterGlasses: typeof parsed.waterGlasses === "number" ? parsed.waterGlasses : 3,
              waterGoal: typeof parsed.waterGoal === "number" ? parsed.waterGoal : 8,
              habits: Array.isArray(parsed.habits) ? parsed.habits : DEFAULT_HABITS,
              lastUpdatedDate: parsed.lastUpdatedDate || "2026-10-16",
            };
          }
        }
      } catch {
        // ignore storage errors
      }
    }
    return {
      intention: "Move with patience. Breathe deeply.",
      waterGlasses: 3,
      waterGoal: 8,
      habits: DEFAULT_HABITS,
      lastUpdatedDate: "2026-10-16",
    };
  });

  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(8);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage quota errors
    }
  }, [state]);

  // Calculations
  const completedHabitsCount = state.habits.filter((h) => h.completed).length;
  const totalHabits = state.habits.length;

  const waterCompletionRatio = Math.min(1, state.waterGlasses / (state.waterGoal || 1));
  const habitCompletionRatio = totalHabits > 0 ? completedHabitsCount / totalHabits : 0;
  // Overall composite daily score: 40% water + 60% habits
  const overallPercentage = Math.round((waterCompletionRatio * 0.4 + habitCompletionRatio * 0.6) * 100);

  // Water controls
  const handleAddWater = () => {
    setState((prev) => ({
      ...prev,
      waterGlasses: Math.min(prev.waterGlasses + 1, 24),
    }));
  };

  const handleSubWater = () => {
    setState((prev) => ({
      ...prev,
      waterGlasses: Math.max(0, prev.waterGlasses - 1),
    }));
  };

  const handleSaveGoal = () => {
    const valid = Math.max(2, Math.min(20, tempGoal));
    setState((prev) => ({ ...prev, waterGoal: valid }));
    setIsEditingGoal(false);
  };

  // Habit toggling
  const toggleHabit = (id: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)),
    }));
  };

  // Reset confirmation
  const handleConfirmReset = () => {
    setState({
      intention: INTENTION_SUGGESTIONS[Math.floor(Math.random() * INTENTION_SUGGESTIONS.length)],
      waterGlasses: 0,
      waterGoal: state.waterGoal || 8,
      habits: DEFAULT_HABITS.map((h) => ({ ...h, completed: false })),
      lastUpdatedDate: new Date().toISOString().split("T")[0],
    });
    setShowResetConfirm(false);
  };

  return (
    <section
      id="planner"
      aria-label="Daily Wellness Planner"
      className="py-24 bg-[#FBF9F4] relative border-t border-[#294B40]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE9DF]/80 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sample Routine Organizer</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
            Your Little Daily Reset
          </h2>

          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed">
            A quiet space to organize today&apos;s intention, gentle habits, and hydration.
            Private to your browser—no account needed, no pressure, and completely free.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Intention & Habits (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Daily Intention Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#294B40]/10 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#65736B] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#C46860]" />
                  Today&apos;s Mindful Intention
                </span>
                <span className="text-xs text-[#65736B]">Click text to customize</span>
              </div>

              <div className="relative">
                <textarea
                  value={state.intention}
                  onChange={(e) => setState((prev) => ({ ...prev, intention: e.target.value }))}
                  placeholder="What gentle feeling or focus do you want to hold today?"
                  rows={2}
                  maxLength={150}
                  className="w-full text-base sm:text-lg font-serif italic text-[#294B40] bg-[#FBF9F4] border border-[#294B40]/15 rounded-2xl p-4 focus:ring-2 focus:ring-[#294B40] focus:border-transparent outline-none transition-all resize-none"
                  aria-label="Daily intention statement"
                />
              </div>

              {/* Quick suggestion pills */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[#65736B] font-medium mr-1">Try:</span>
                {INTENTION_SUGGESTIONS.slice(0, 3).map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, intention: sug }))}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#DCE9DF]/40 hover:bg-[#DCE9DF] text-[#294B40] transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Habit Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#294B40]/10 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#294B40]">
                    Gentle Daily Checkpoints
                  </h3>
                  <p className="text-xs text-[#65736B] mt-1">
                    Small, restorative micro-habits. Complete what feels right.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DCE9DF] text-[#294B40]">
                  {completedHabitsCount} of {totalHabits} completed
                </span>
              </div>

              <div className="space-y-3">
                {state.habits.map((habit) => (
                  <div
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex items-start gap-4 ${
                      habit.completed
                        ? "bg-[#DCE9DF]/30 border-[#DCE9DF] opacity-90"
                        : "bg-[#FBF9F4] border-[#294B40]/10 hover:border-[#294B40]/30 hover:bg-white"
                    }`}
                    role="checkbox"
                    aria-checked={habit.completed}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggleHabit(habit.id);
                      }
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        habit.completed
                          ? "bg-[#294B40] text-white"
                          : "border-2 border-[#294B40]/30 bg-white group-hover:border-[#294B40]"
                      }`}
                    >
                      {habit.completed && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <p
                          className={`text-sm sm:text-base font-medium transition-all ${
                            habit.completed
                              ? "text-[#65736B] line-through decoration-[#65736B]/50"
                              : "text-[#294B40]"
                          }`}
                        >
                          {habit.label}
                        </p>
                        {habit.timeHint && (
                          <span className="text-[11px] text-[#65736B] font-mono shrink-0">
                            {habit.timeHint}
                          </span>
                        )}
                      </div>
                      {habit.description && (
                        <p className="text-xs text-[#65736B] mt-1 leading-normal">
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hydration Tracker & Day Progress (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Water Tracker Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#294B40]/10 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#65736B] flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-[#3B66A3]" />
                  Mindful Hydration
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTempGoal(state.waterGoal);
                    setIsEditingGoal(!isEditingGoal);
                  }}
                  className="text-xs text-[#3E6759] hover:underline font-medium"
                >
                  {isEditingGoal ? "Cancel" : "Edit Target"}
                </button>
              </div>

              {/* Goal Editor popup */}
              {isEditingGoal && (
                <div className="mb-4 p-3 rounded-2xl bg-[#E3E8F8]/40 border border-[#E3E8F8] flex items-center justify-between gap-3 animate-fade-in">
                  <div className="text-xs text-[#294B40]">
                    <span>Target glasses (250ml each):</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={2}
                      max={20}
                      value={tempGoal}
                      onChange={(e) => setTempGoal(parseInt(e.target.value) || 2)}
                      className="w-14 px-2 py-1 text-center text-sm font-semibold border rounded-lg bg-white"
                      aria-label="Target glasses count"
                    />
                    <button
                      type="button"
                      onClick={handleSaveGoal}
                      className="px-3 py-1 rounded-lg bg-[#294B40] text-white text-xs font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {/* Water Volume Display */}
              <div className="text-center py-4">
                <div className="inline-flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-bold text-[#294B40]">
                    {state.waterGlasses}
                  </span>
                  <span className="text-xl text-[#65736B]">/ {state.waterGoal}</span>
                  <span className="text-xs text-[#65736B] ml-1 uppercase font-semibold">
                    glasses
                  </span>
                </div>
                <p className="text-xs text-[#65736B] mt-1 font-mono">
                  Approx. {(state.waterGlasses * 250).toLocaleString()} ml of {(state.waterGoal * 250).toLocaleString()} ml
                </p>

                {/* Visual Glasses Display (up to 12) */}
                <div className="flex flex-wrap justify-center gap-2 my-5">
                  {Array.from({ length: state.waterGoal }).map((_, idx) => {
                    const isFilled = idx < state.waterGlasses;
                    return (
                      <div
                        key={idx}
                        className={`w-7 h-9 rounded-md border flex items-end justify-center transition-all ${
                          isFilled
                            ? "bg-[#E3E8F8] border-[#3B66A3]/40 shadow-2xs"
                            : "bg-[#FBF9F4] border-dashed border-[#294B40]/20"
                        }`}
                        title={`Glass ${idx + 1}`}
                      >
                        {isFilled && (
                          <div className="w-full bg-[#3B66A3]/30 h-3/4 rounded-b-[4px]" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Water Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleSubWater}
                    disabled={state.waterGlasses <= 0}
                    className="w-12 h-12 rounded-full border border-[#294B40]/20 bg-[#FBF9F4] hover:bg-white text-[#294B40] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs active:scale-95"
                    aria-label="Remove a glass of water"
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleAddWater}
                    className="px-6 py-3 rounded-full bg-[#294B40] hover:bg-[#1E372F] text-white flex items-center gap-2 font-medium shadow-xs transition-all active:scale-95"
                    aria-label="Add a glass of water"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Drink Glass</span>
                  </button>
                </div>
              </div>

              {/* Water advice note */}
              <p className="text-[11px] text-[#65736B] text-center mt-3 leading-snug">
                Drink steadily throughout the day. Listen to personal thirst, climate, and activity.
              </p>
            </div>

            {/* Daily Overall Progress & Reset Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#294B40]/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#294B40] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#3E6759]" />
                    Today&apos;s Gentle Flow
                  </h4>
                  <p className="text-xs text-[#65736B]">
                    A non-judgmental snapshot of your day
                  </p>
                </div>
                <span className="font-serif text-3xl font-bold text-[#294B40]">
                  {overallPercentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#FBF9F4] h-3 rounded-full overflow-hidden border border-[#294B40]/10">
                <div
                  className="h-full bg-gradient-to-r from-[#DCE9DF] via-[#3E6759] to-[#294B40] transition-all duration-500 rounded-full"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#65736B] pt-1">
                <span>Hydration: {Math.round(waterCompletionRatio * 100)}%</span>
                <span>Habits: {Math.round(habitCompletionRatio * 100)}%</span>
              </div>

              {/* Encouragement message */}
              <div className="p-3 rounded-2xl bg-[#DCE9DF]/30 border border-[#DCE9DF] text-xs text-[#294B40] leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#3E6759] shrink-0 mt-0.5" />
                <span>
                  {overallPercentage >= 80
                    ? "Wonderful care today! You are nurturing your rhythm with patience."
                    : overallPercentage >= 40
                    ? "Every small step counts. Honor the energy you have right now."
                    : "A fresh beginning. Even one conscious sip or breath makes a difference."}
                </span>
              </div>

              {/* Reset Day Button */}
              <div className="pt-2 border-t border-[#294B40]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#65736B] hover:text-[#C46860] transition-colors p-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset for Tomorrow</span>
                </button>

                <div className="flex items-center gap-1 text-[11px] text-[#65736B]" title="Non-medical tool">
                  <Info className="w-3 h-3" />
                  <span>Saved locally</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal for Resetting */}
        {showResetConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#294B40]/40 backdrop-blur-xs"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#294B40]/15 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F9E7E5] flex items-center justify-center text-[#C46860] mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#294B40]">
                  Reset Your Daily Reset?
                </h3>
                <p className="text-xs sm:text-sm text-[#65736B] leading-relaxed">
                  This will reset your checklist and water count back to zero for a brand-new day.
                  Your daily intention will refresh with an inspiring prompt.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#294B40]/20 text-xs font-semibold text-[#294B40] hover:bg-gray-50 transition-colors"
                >
                  Keep Today&apos;s Progress
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="flex-1 py-2.5 rounded-full bg-[#C46860] hover:bg-[#A9534B] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Yes, Start Fresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
