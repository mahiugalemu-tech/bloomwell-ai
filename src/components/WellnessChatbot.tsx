"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  HelpCircle,
  Settings,
} from "lucide-react";
import { ChatMessage, ChatApiResponse } from "@/types";

interface WellnessChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

const SUGGESTED_QUESTIONS = [
  "How can I build a better sleep routine?",
  "Suggest a simple morning routine.",
  "What does a balanced meal look like?",
  "Give me a 5-minute relaxation exercise.",
  "How can I remember to drink water?",
  "Suggest beginner-friendly movement ideas.",
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-1",
  role: "assistant",
  content:
    "Hi! I’m Bloom, your wellness assistant. How can I help you feel your best today?",
  timestamp: 1729000000000,
};

export default function WellnessChatbot({
  isOpen,
  onClose,
  externalPrompt,
  onClearExternalPrompt,
}: WellnessChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [setupNotice, setSetupNotice] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = useCallback(
    async (textToSend: string) => {
      if (!textToSend.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: textToSend.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setLastFailedMessage(null);

      try {
        const historyToSend = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: historyToSend,
            isDemo: isDemoMode,
          }),
        });

        const data: ChatApiResponse = await response.json();

        if (!response.ok && !data.needsSetup) {
          const fallbackErrorText =
            data.reply ||
            data.error ||
            "I ran into an issue connecting with the service. Please try again or switch to Local Demo Mode.";
          const errMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: fallbackErrorText,
            timestamp: Date.now(),
            isError: true,
          };
          setMessages((prev) => [...prev, errMessage]);
          setLastFailedMessage(textToSend);
          return;
        }

        // If server reported missing Gemini API Key
        if (data.needsSetup) {
          setSetupNotice(data.setupInstructions || "Configure GEMINI_API_KEY in .env.local");
        }

        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.reply || "I'm here to support your daily wellness journey.",
          timestamp: Date.now(),
          isDemo: data.isDemo,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch {
        setLastFailedMessage(textToSend);

        const errorMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I ran into an issue connecting with the service. Please check your network or try again.",
          timestamp: Date.now(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, isDemoMode]
  );

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      textareaRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  // Handle external prompts sent from hero or wellness modal
  useEffect(() => {
    if (externalPrompt && externalPrompt.trim()) {
      const promptToSend = externalPrompt.trim();
      if (onClearExternalPrompt) onClearExternalPrompt();
      const timer = setTimeout(() => {
        sendMessage(promptToSend);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [externalPrompt, onClearExternalPrompt, sendMessage]);

  // Handle keyboard shortcut Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setSetupNotice(null);
    setLastFailedMessage(null);
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      sendMessage(lastFailedMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col w-full sm:w-[440px] h-full sm:h-[650px] max-h-[100vh] sm:max-h-[85vh] bg-[#FBF9F4] sm:rounded-3xl shadow-2xl border border-[#294B40]/15 overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="BloomWell AI Wellness Assistant"
    >
      {/* Header */}
      <div className="bg-[#DCE9DF]/90 backdrop-blur-md px-5 py-4 border-b border-[#294B40]/15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#294B40] text-[#FBF9F4] flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-[#EAE1F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-[#294B40] leading-none">
                Bloom
              </h3>
              {isDemoMode ? (
                <span className="text-[10px] uppercase font-bold bg-[#F9E7E5] text-[#C46860] px-2 py-0.5 rounded-full border border-[#C46860]/20">
                  Demo Mode
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold bg-white text-[#294B40] px-2 py-0.5 rounded-full border border-[#294B40]/15">
                  AI Active
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#4E6258] mt-0.5">
              Your Gentle Wellness Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Reset Conversation */}
          <button
            type="button"
            onClick={handleResetChat}
            title="Start new conversation"
            className="p-2 rounded-full text-[#294B40] hover:bg-white/60 transition-colors"
            aria-label="Start new conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close Chat Window */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#294B40] hover:bg-white/60 transition-colors"
            aria-label="Close Bloom chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Setup Notice Banner (shown if API key is unconfigured) */}
      {setupNotice && (
        <div className="bg-[#F9E7E5] border-b border-[#F9E7E5] p-3 text-xs text-[#294B40] flex items-start gap-2.5">
          <Settings className="w-4 h-4 text-[#C46860] shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="font-bold text-[#C46860]">
              Gemini API Setup Note (For Site Owner)
            </p>
            <p className="text-[11px] text-[#65736B]">
              Add <code className="bg-white/80 px-1 py-0.5 rounded">GEMINI_API_KEY</code> in{" "}
              <code className="bg-white/80 px-1 py-0.5 rounded">.env.local</code> to connect live Gemini AI.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsDemoMode(true);
                setSetupNotice(null);
              }}
              className="mt-1 text-[11px] font-bold underline text-[#294B40] hover:text-[#C46860]"
            >
              Switch to Offline Demo Mode Now &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Mode Switcher Pill */}
      <div className="bg-white/60 px-4 py-2 border-b border-[#294B40]/10 flex items-center justify-between text-xs text-[#65736B]">
        <span>Mode:</span>
        <div className="flex items-center gap-1 bg-[#FBF9F4] p-0.5 rounded-full border border-[#294B40]/10">
          <button
            type="button"
            onClick={() => setIsDemoMode(false)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              !isDemoMode ? "bg-[#294B40] text-white" : "text-[#65736B] hover:text-[#294B40]"
            }`}
          >
            Live Gemini
          </button>
          <button
            type="button"
            onClick={() => setIsDemoMode(true)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              isDemoMode ? "bg-[#294B40] text-white" : "text-[#65736B] hover:text-[#294B40]"
            }`}
          >
            Local Demo
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  isUser
                    ? "bg-[#294B40] text-white"
                    : msg.isError
                    ? "bg-[#F9E7E5] text-[#C46860]"
                    : "bg-[#DCE9DF] text-[#294B40]"
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-[#294B40] text-[#FBF9F4] rounded-tr-none shadow-2xs"
                    : msg.isError
                    ? "bg-[#F9E7E5] text-[#294B40] border border-[#F9E7E5] rounded-tl-none"
                    : "bg-white text-[#294B40] border border-[#294B40]/10 rounded-tl-none shadow-2xs"
                }`}
              >
                {msg.isDemo && (
                  <div className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F9E7E5] text-[#C46860] mb-1.5">
                    Demo Mode Response
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.content}</div>

                <div
                  className={`mt-1.5 text-[10px] ${
                    isUser ? "text-[#FBF9F4]/70 text-right" : "text-[#65736B]"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#DCE9DF] text-[#294B40] flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-[#294B40]/10 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3E6759] animate-bounce" />
              <span
                className="w-2 h-2 rounded-full bg-[#3E6759] animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-[#3E6759] animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
              <span className="text-xs text-[#65736B] ml-2">Bloom is reflecting...</span>
            </div>
          </div>
        )}

        {/* Retry Button if failed */}
        {lastFailedMessage && !isLoading && (
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 text-xs text-[#C46860] hover:underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry last question</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-[#294B40]/10 bg-white/40">
          <p className="text-[11px] font-semibold text-[#65736B] mb-2 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#3E6759]" />
            <span>Gentle topics to explore:</span>
          </p>
          <div className="flex flex-nowrap overflow-x-auto gap-1.5 pb-1 no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-white hover:bg-[#DCE9DF]/50 border border-[#294B40]/15 text-[#294B40] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#294B40]/15">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Bloom about sleep, movement, water, meals..."
            rows={1}
            maxLength={2000}
            disabled={isLoading}
            className="flex-1 max-h-24 p-2.5 text-xs sm:text-sm bg-[#FBF9F4] border border-[#294B40]/20 rounded-2xl focus:ring-2 focus:ring-[#294B40] focus:border-transparent outline-none transition-all resize-none text-[#294B40] placeholder:text-[#65736B]/60"
            aria-label="Ask Bloom a wellness question"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#294B40] hover:bg-[#1E372F] text-white flex items-center justify-center shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>

        {/* Medical disclaimer note */}
        <p className="text-[10px] text-[#65736B] text-center mt-2 leading-tight">
          Bloom provides educational wellness guidance, not medical diagnosis or clinical treatment.
        </p>
      </div>
    </div>
  );
}
