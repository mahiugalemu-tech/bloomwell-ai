"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ContactFormData, ContactFormErrors } from "@/types";
import { validateContactForm, buildMailtoUrl } from "@/lib/validation";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [statusState, setStatusState] = useState<"idle" | "preparing_mail" | "sent_mail">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStatusState("preparing_mail");

    // Construct honest transparent mailto link
    const mailtoUrl = buildMailtoUrl(formData, "mahiugale.mu@gmail.com");

    // Brief timeout to let the user see the state transition before opening the mail client
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatusState("sent_mail");
    }, 400);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-24 bg-white/70 relative border-t border-[#294B40]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Creator Note */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE9DF]/70 text-[#294B40] text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#294B40] tracking-tight">
              Let&apos;s Make Room for Better Days
            </h2>

            <p className="text-base sm:text-lg text-[#65736B] leading-relaxed">
              Questions, ideas, or feedback? I&apos;d love to hear from you.
              Whether you are exploring daily habits or discussing collaborative wellness initiatives,
              feel welcome to reach out.
            </p>

            {/* Direct Contact Card */}
            <div className="bg-[#FBF9F4] rounded-3xl p-6 sm:p-8 border border-[#294B40]/10 space-y-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#DCE9DF] flex items-center justify-center text-[#294B40] font-serif font-bold text-lg">
                  MU
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#294B40]">
                    Mahi Ugale
                  </h3>
                  <p className="text-xs text-[#65736B]">
                    Founder &amp; Creator of BloomWell AI
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#294B40]/10 space-y-2">
                <p className="text-xs text-[#65736B]">Direct Email:</p>
                <a
                  href="mailto:mahiugale.mu@gmail.com"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#294B40] hover:text-[#3E6759] underline decoration-[#294B40]/30 hover:decoration-[#3E6759] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#3E6759]" />
                  <span>mahiugale.mu@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#E3E8F8]/40 border border-[#294B40]/10 text-xs text-[#4E6258] leading-relaxed">
              <strong>Transparent Delivery:</strong> In keeping with our free, zero-paid-infrastructure design, submitting the form below pre-populates your email client using a clean, direct <code>mailto:</code> link.
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FBF9F4] rounded-3xl p-8 sm:p-10 border border-[#294B40]/15 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#294B40] mb-2"
                  >
                    Your Name <span className="text-[#C46860]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Lin"
                    className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#294B40] outline-none transition-all ${
                      errors.name
                        ? "border-[#C46860] focus:ring-2 focus:ring-[#C46860]/30"
                        : "border-[#294B40]/15 focus:ring-2 focus:ring-[#294B40]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-[#C46860] mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#294B40] mb-2"
                  >
                    Your Email Address <span className="text-[#C46860]">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#294B40] outline-none transition-all ${
                      errors.email
                        ? "border-[#C46860] focus:ring-2 focus:ring-[#C46860]/30"
                        : "border-[#294B40]/15 focus:ring-2 focus:ring-[#294B40]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#C46860] mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold uppercase tracking-wider text-[#294B40] mb-2"
                  >
                    Subject <span className="text-[#C46860]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Feedback, question, or just saying hello"
                    className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#294B40] outline-none transition-all ${
                      errors.subject
                        ? "border-[#C46860] focus:ring-2 focus:ring-[#C46860]/30"
                        : "border-[#294B40]/15 focus:ring-2 focus:ring-[#294B40]"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-[#C46860] mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#294B40] mb-2"
                  >
                    Message <span className="text-[#C46860]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share what's on your mind..."
                    className={`w-full p-4 rounded-2xl bg-white border text-sm text-[#294B40] outline-none transition-all resize-y ${
                      errors.message
                        ? "border-[#C46860] focus:ring-2 focus:ring-[#C46860]/30"
                        : "border-[#294B40]/15 focus:ring-2 focus:ring-[#294B40]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-[#C46860] mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Status Notice if activated */}
                {statusState === "preparing_mail" && (
                  <div className="p-4 rounded-2xl bg-[#DCE9DF] text-[#294B40] text-xs leading-relaxed flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#294B40] animate-ping" />
                    <span>Opening your default mail client with your drafted message...</span>
                  </div>
                )}

                {statusState === "sent_mail" && (
                  <div className="p-4 rounded-2xl bg-[#DCE9DF] text-[#294B40] text-xs leading-relaxed flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3E6759]" />
                    <span>Your email composer has been launched. If it didn&apos;t open, you can send directly to mahiugale.mu@gmail.com!</span>
                  </div>
                )}

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#294B40] hover:bg-[#1E372F] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#294B40] active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Draft Email to Mahi Ugale</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
