import React from "react";
import { MessageSquareText, Compass, CheckCircle2, ArrowRight } from "lucide-react";

interface HowItWorksProps {
  onOpenChat: (prompt?: string) => void;
}

export default function HowItWorks({ onOpenChat }: HowItWorksProps) {
  const steps = [
    {
      step: "01",
      icon: MessageSquareText,
      iconBg: "bg-[#EAE1F6]",
      iconColor: "text-[#6B4B96]",
      title: "Tell Bloom What You Need",
      description:
        "Select a general wellness topic—like sleep, mindful movement, hydration, or balanced eating—or simply ask a candid question about making your days feel less rushed.",
      actionLabel: "Try asking a question",
      prompt: "Hi Bloom! How can I make my morning feel less frantic?",
    },
    {
      step: "02",
      icon: Compass,
      iconBg: "bg-[#DCE9DF]",
      iconColor: "text-[#294B40]",
      title: "Explore Small, Practical Ideas",
      description:
        "Receive clear, gentle educational guidance. Bloom suggests micro-habits that take 2 to 5 minutes, breaking healthy changes down into realistic, bite-sized moments.",
      actionLabel: "Browse wellness topics",
      link: "#wellness",
    },
    {
      step: "03",
      icon: CheckCircle2,
      iconBg: "bg-[#E3E8F8]",
      iconColor: "text-[#3B66A3]",
      title: "Build a Routine That Works for You",
      description:
        "Use our interactive Daily Reset dashboard to set your daily intention, track mindful water intake, and check off gentle movement—all saved privately in your browser.",
      actionLabel: "Open Daily Planner",
      link: "#planner",
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-label="How BloomWell AI Works"
      className="py-24 bg-white/60 relative border-t border-[#294B40]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE9DF]/70 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
            <span>Simple 3-Step Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
            How BloomWell Works
          </h2>

          <p className="text-base sm:text-lg text-[#65736B] leading-relaxed">
            No complicated onboarding, no mandatory apps to download, and no subscriptions.
            Just a peaceful space to reset your daily flow.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#FBF9F4] rounded-3xl p-8 border border-[#294B40]/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#294B40]/25">
                      {item.step}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shadow-2xs`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#294B40] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#65736B] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#294B40]/5">
                  {item.prompt ? (
                    <button
                      type="button"
                      onClick={() => onOpenChat(item.prompt)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#294B40] hover:text-[#1E372F] group"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#3E6759] group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#294B40] hover:text-[#1E372F] group"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#3E6759] group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
