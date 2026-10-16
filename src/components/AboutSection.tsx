import React from "react";
import { Sparkles, Sprout, Clock, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      icon: Sprout,
      iconBg: "bg-[#DCE9DF]",
      iconColor: "text-[#294B40]",
      badge: "Sustainable Rhythm",
      title: "Small Steps",
      description:
        "Real well-being is not built on sudden, punishing overhauls. We champion micro-habits that take 2 to 5 minutes—actions so simple and gentle they slip effortlessly into your existing day.",
    },
    {
      icon: Clock,
      iconBg: "bg-[#EAE1F6]",
      iconColor: "text-[#6B4B96]",
      badge: "Present Living",
      title: "A More Mindful Day",
      description:
        "Modern life rushes by at high speed. BloomWell provides gentle moments to pause, breathe, reflect, and reset your nervous system without guilt, rigid timers, or complicated rituals.",
    },
    {
      icon: Sparkles,
      iconBg: "bg-[#E3E8F8]",
      iconColor: "text-[#3B66A3]",
      badge: "Compassionate AI",
      title: "Guidance That Feels Personal",
      description:
        "Our AI companion, Bloom, offers supportive educational answers tailored to your schedule, energy level, and preferences—always meeting you where you are with encouragement and warmth.",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About BloomWell AI"
      className="py-24 bg-white/70 relative border-t border-b border-[#294B40]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE9DF]/60 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Our Gentle Philosophy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
            Wellness should fit your life—
            <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#365E51]">
              not the other way around.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed pt-2">
            Most wellness programs demand perfection, extreme discipline, or exhausting restrictions.
            BloomWell AI takes a different path: compassionate consistency through tiny, joyful choices
            that support your mind, body, and daily spirit.
          </p>
        </div>

        {/* 3 Pillars / Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#FBF9F4] rounded-3xl p-8 border border-[#294B40]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white border border-[#294B40]/10 text-[#65736B]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#294B40] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-[#65736B] text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#294B40]/5 flex items-center gap-1.5 text-xs font-semibold text-[#3E6759]">
                  <span>Crafted for real everyday life</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Disclaimer Callout */}
        <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-[#E3E8F8]/40 border border-[#294B40]/10 p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#3B66A3] shrink-0" />
          <p className="text-xs sm:text-sm text-[#4E6258] leading-normal">
            <strong>Honest Wellness Boundary:</strong> BloomWell AI provides general educational lifestyle
            guidance. We do not offer medical diagnosis, clinical treatment, or prescriptions. For medical concerns,
            always seek the advice of your physician.
          </p>
        </div>
      </div>
    </section>
  );
}
