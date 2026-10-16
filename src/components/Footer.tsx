import React from "react";
import { Mail, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#294B40] text-[#FBF9F4] pt-16 pb-12 border-t border-[#1E372F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DCE9DF] flex items-center justify-center text-[#294B40] shadow-xs">
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
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BloomWell <span className="text-[#DCE9DF] font-light">AI</span>
              </span>
            </div>

            <p className="text-[#DCE9DF] font-serif italic text-base">
              &ldquo;Small steps. Healthier days.&rdquo;
            </p>

            <p className="text-sm text-[#DCE9DF]/80 max-w-sm leading-relaxed">
              Your everyday companion for mindful movement, nourishing choices,
              restful nights, and healthier routines. Discover practical habits that fit your life.
            </p>

            <div className="pt-2 text-xs text-[#DCE9DF]/70">
              <span>Founded and designed by </span>
              <strong className="text-white font-medium">Mahi Ugale</strong>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DCE9DF]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#DCE9DF]/80">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Philosophy
                </a>
              </li>
              <li>
                <a href="#wellness" className="hover:text-white transition-colors">
                  Wellness Exploration
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#planner" className="hover:text-white transition-colors">
                  Daily Reset Planner
                </a>
              </li>
              <li>
                <a href="#tips" className="hover:text-white transition-colors">
                  Daily Tips
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Tech Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DCE9DF]">
              Contact &amp; Connect
            </h4>

            <p className="text-sm text-[#DCE9DF]/80 leading-relaxed">
              Have feedback, partnership ideas, or inquiries about the platform? Reach out directly:
            </p>

            <div className="pt-1">
              <a
                href="mailto:mahiugale.mu@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-[#DCE9DF] underline decoration-white/30 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#DCE9DF]" />
                <span>mahiugale.mu@gmail.com</span>
              </a>
            </div>

            <div className="pt-3 text-xs text-[#DCE9DF]/60 space-y-1">
              <p>Built with Next.js, React, Tailwind CSS, TypeScript &amp; Gemini AI.</p>
              <p>Designed for portfolio &amp; internship demonstration.</p>
            </div>
          </div>
        </div>

        {/* Prominent Medical & General Wellness Disclaimer */}
        <div className="my-8 p-5 rounded-2xl bg-[#1E372F] border border-white/10 text-xs text-[#DCE9DF]/90 leading-relaxed">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#DCE9DF] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">
                Important General Wellness Disclaimer:
              </strong>
              <span>
                BloomWell AI and the Bloom wellness assistant provide educational lifestyle and habit suggestions for everyday wellness.
                The content is not intended to be a substitute for professional medical advice, clinical diagnosis, psychotherapy, or treatment.
                Always seek the advice of your physician, psychiatrist, or qualified healthcare professional regarding any medical condition or symptoms.
                Never disregard professional advice or delay seeking it because of something you read on this site.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#DCE9DF]/70 gap-4">
          <p>
            &copy; {currentYear} BloomWell AI. Created with care by Mahi Ugale. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#F9E7E5] fill-current" />
            <span>for peaceful, mindful living</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
