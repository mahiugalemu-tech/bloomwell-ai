"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WellnessCards from "@/components/WellnessCards";
import HowItWorks from "@/components/HowItWorks";
import DailyWellnessDashboard from "@/components/DailyWellnessDashboard";
import DailyTips from "@/components/DailyTips";
import OceanSoundPlayer from "@/components/OceanSoundPlayer";
import WellnessChatbot from "@/components/WellnessChatbot";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleOpenChat = (prompt?: string) => {
    if (prompt) {
      setChatPrompt(prompt);
    }
    setIsChatOpen(true);
  };

  const handleToggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F4] text-[#294B40] selection:bg-[#DCE9DF] selection:text-[#294B40]">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenChat={handleOpenChat}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenChat={handleOpenChat} />

        {/* About Section */}
        <AboutSection />

        {/* Wellness Exploration Cards */}
        <WellnessCards onAskBloom={handleOpenChat} />

        {/* How It Works Section */}
        <HowItWorks onOpenChat={handleOpenChat} />

        {/* Interactive Daily Planner / Reset */}
        <DailyWellnessDashboard />

        {/* Daily Wellness Tips */}
        <DailyTips />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient Ocean Wave Sound Player (Fixed Bottom Left) */}
      <OceanSoundPlayer
        isPlaying={isAudioPlaying}
        onTogglePlay={handleToggleAudio}
      />

      {/* Floating Chatbot Trigger Button (Fixed Bottom Right) */}
      {!isChatOpen && (
        <aside aria-label="Open Bloom AI Chatbot">
          <button
            type="button"
            onClick={() => handleOpenChat()}
            className="fixed bottom-6 right-6 z-30 group flex items-center gap-2.5 bg-[#294B40] hover:bg-[#1E372F] text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#294B40]/30 active:scale-95"
            aria-label="Open Bloom AI chat assistant"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#EAE1F6] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#DCE9DF] border-2 border-[#294B40]" />
            </div>
            <span className="font-semibold text-sm tracking-tight pr-1">
              Ask Bloom AI
            </span>
          </button>
        </aside>
      )}

      {/* Bloom Wellness Chatbot Modal / Drawer */}
      <WellnessChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        externalPrompt={chatPrompt}
        onClearExternalPrompt={() => setChatPrompt(undefined)}
      />
    </div>
  );
}
