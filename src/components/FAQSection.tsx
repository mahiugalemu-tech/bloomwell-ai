"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is BloomWell AI?",
    answer:
      "BloomWell AI is an everyday wellness and healthy lifestyle companion founded by Mahi Ugale. It is designed to help you discover realistic, sustainable daily habits across gentle movement, mindful nutrition, restorative sleep, hydration, and quiet pauses—focusing on small steps rather than intense, punishing overhauls.",
  },
  {
    question: "Is BloomWell AI a medical service?",
    answer:
      "No. BloomWell AI provides general educational lifestyle guidance and is not a clinical or medical service. It does not provide medical diagnosis, clinical treatment, psychotherapy, or pharmaceutical prescriptions. Always seek the advice of a qualified physician, licensed therapist, or registered dietitian for any medical or mental health condition.",
  },
  {
    question: "How does the wellness assistant work?",
    answer:
      "Bloom is powered by Google's Gemini API via a secure server-side route handler. It offers gentle, encouraging educational ideas tailored to your everyday lifestyle questions. If the site administrator has not configured a Gemini API key, Bloom seamlessly offers a local educational demo mode so you can still explore sample guidance without any external dependencies.",
  },
  {
    question: "Can I use the daily planner without an account?",
    answer:
      "Yes, completely! The interactive Daily Reset dashboard and water tracker operate entirely without account registration or passwords. Your intention, water servings, and checklist progress are stored locally and privately in your own web browser.",
  },
  {
    question: "Is the ocean sound optional?",
    answer:
      "Yes, absolutely. In compliance with web accessibility standards, ambient audio is never auto-played loudly. The ocean soundscape is purely optional—you can start, pause, mute, or adjust its volume at any time via the floating sound player or the top navigation bar.",
  },
  {
    question: "Does the AI chatbot always work?",
    answer:
      "Live AI responses require an active server environment configured with a Gemini API key. If no key is present or if the free tier quota is temporarily reached, Bloom transparently displays an honest notification and enables you to use the local educational demo mode without broken interfaces.",
  },
  {
    question: "Is my personal information stored?",
    answer:
      "We do not require account logins and never collect sensitive health records. Planner checkmarks and daily intentions remain strictly inside your browser's local storage. Any queries sent to the live AI assistant are processed securely according to Google's standard developer terms without unnecessary personal logging.",
  },
  {
    question: "How can I contact the website owner?",
    answer:
      "You can contact creator and owner Mahi Ugale directly by emailing mahiugale.mu@gmail.com, or by using the validated contact form in the section below.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-24 bg-[#FBF9F4] relative border-t border-[#294B40]/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3E8F8]/70 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#3B66A3]" />
            <span>Honest Answers</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our gentle wellness philosophy, privacy,
            AI features, and how to make the most of BloomWell.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#294B40]/10 overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#294B40]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FBF9F4] flex items-center justify-center text-[#294B40] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#DCE9DF]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#65736B] leading-relaxed border-t border-[#294B40]/5 animate-fade-in">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Educational note footer */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-[#65736B]">
          <ShieldCheck className="w-4 h-4 text-[#3E6759]" />
          <span>Need more details? We welcome your questions anytime.</span>
        </div>
      </div>
    </section>
  );
}
