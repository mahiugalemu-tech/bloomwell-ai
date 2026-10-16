"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Volume2 } from "lucide-react";

interface NavbarProps {
  onOpenChat: (initialPrompt?: string) => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export default function Navbar({
  onOpenChat,
  isAudioPlaying = false,
  onToggleAudio,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#wellness", label: "Wellness" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#planner", label: "Daily Planner" },
    { href: "#tips", label: "Daily Tips" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBF9F4]/90 backdrop-blur-md shadow-xs border-b border-[#294B40]/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40] rounded-lg p-1"
            aria-label="BloomWell AI Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#DCE9DF] flex items-center justify-center border border-[#294B40]/15 shadow-xs group-hover:scale-105 transition-transform duration-200">
              {/* Blooming flower/leaf SVG mark */}
              <svg
                className="w-5 h-5 text-[#294B40]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#294B40]">
                BloomWell <span className="text-[#3E6759] font-normal">AI</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#65736B] hidden sm:block -mt-1 font-medium">
                Small steps. Healthier days.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 px-4 py-1.5 rounded-full border border-[#294B40]/10 shadow-xs backdrop-blur-xs"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#65736B] hover:text-[#294B40] px-3 py-1.5 rounded-full hover:bg-[#DCE9DF]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Ambient Sound Indicator */}
            {onToggleAudio && (
              <button
                type="button"
                onClick={onToggleAudio}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border transition-all ${
                  isAudioPlaying
                    ? "bg-[#DCE9DF] border-[#294B40]/30 text-[#294B40] shadow-xs"
                    : "bg-white/60 hover:bg-white text-[#65736B] border-[#294B40]/10"
                }`}
                aria-label={isAudioPlaying ? "Pause ocean waves" : "Play ocean waves"}
                title="Toggle ocean waves"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? "animate-pulse text-[#294B40]" : ""}`} />
                <span className="hidden lg:inline">{isAudioPlaying ? "Waves On" : "Ocean Sound"}</span>
              </button>
            )}

            {/* Ask Bloom AI CTA */}
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="flex items-center gap-2 bg-[#294B40] hover:bg-[#1E372F] text-[#FBF9F4] px-4 py-2 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40] focus-visible:ring-offset-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#EAE1F6]" />
              <span>Ask Bloom AI</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="p-2 rounded-full bg-[#294B40] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]"
              aria-label="Ask Bloom AI"
            >
              <Sparkles className="w-4 h-4 text-[#EAE1F6]" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/80 border border-[#294B40]/15 text-[#294B40] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bg-[#FBF9F4] border-b border-[#294B40]/15 shadow-xl px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#294B40] py-2 px-3 rounded-lg hover:bg-[#DCE9DF]/50 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-[#294B40]/10 flex flex-col gap-3">
              {onToggleAudio && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleAudio();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full text-sm font-medium py-2.5 px-4 rounded-xl bg-white border border-[#294B40]/15 text-[#294B40]"
                >
                  <span className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#3E6759]" />
                    Ambient Ocean Waves
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#DCE9DF] text-[#294B40]">
                    {isAudioPlaying ? "Playing" : "Paused"}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="flex items-center justify-center gap-2 w-full bg-[#294B40] text-white py-3 rounded-xl font-medium shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#EAE1F6]" />
                <span>Chat with Bloom AI</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
