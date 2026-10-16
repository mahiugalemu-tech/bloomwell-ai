import { NextRequest, NextResponse } from "next/server";
import {
  isGeminiConfigured,
  generateBloomResponse,
  generateLocalDemoResponse,
} from "@/lib/ai";
import { validateChatMessage } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, isDemo } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "A message history is required." },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || typeof latestMessage.content !== "string") {
      return NextResponse.json(
        { error: "Invalid message format." },
        { status: 400 }
      );
    }

    const validation = validateChatMessage(latestMessage.content);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error || "Invalid message input." },
        { status: 400 }
      );
    }

    // Check if live Gemini API is configured
    const configured = isGeminiConfigured();

    // If user explicitly asks for Demo Mode OR if API key is not configured and demo is requested
    if (isDemo || (!configured && isDemo === true)) {
      const demoReply = generateLocalDemoResponse(validation.sanitized);
      return NextResponse.json({
        reply: demoReply,
        isDemo: true,
        model: "Local Demo Mode (Educational Offline Engine)",
        disclaimer:
          "This answer is provided by BloomWell's built-in local educational engine for demonstration purposes. It does not use live Gemini AI.",
      });
    }

    // If API key is not configured and demo was not explicitly enabled
    if (!configured) {
      return NextResponse.json(
        {
          needsSetup: true,
          error: "Gemini API key is not configured.",
          reply:
            "Hi there! Bloom is ready, but live AI responses require a Gemini API key. " +
            "If you are the website owner, simply add your GEMINI_API_KEY to your .env.local file. " +
            "In the meantime, you can switch to our free Local Demo Mode below to explore sample educational wellness guidance!",
          setupInstructions:
            "1. Visit https://aistudio.google.com and generate a free Gemini API key.\n" +
            "2. Create a .env.local file in the project root.\n" +
            "3. Add: GEMINI_API_KEY=your_key_here\n" +
            "4. Restart the Next.js development server.",
        },
        { status: 200 }
      );
    }

    // Live AI processing
    // Keep last 8 messages to maintain context while keeping latency minimal
    const trimmedHistory = messages.slice(-8).map((m: { role: string; content: string }) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
      content: m.content.slice(0, 2000),
    }));

    try {
      const { reply, model } = await generateBloomResponse(trimmedHistory);

      return NextResponse.json({
        reply,
        model,
        isDemo: false,
        disclaimer:
          "Bloom provides general educational wellness guidance, not medical diagnosis or clinical treatment.",
      });
    } catch (aiErr: unknown) {
      const err = aiErr as { message?: string };
      if (err.message === "QUOTA_EXCEEDED") {
        return NextResponse.json(
          {
            error: "Gemini API rate limit or free tier quota reached.",
            reply:
              "It looks like the Gemini free quota limit was temporarily reached. Please take a gentle pause and try asking again in a minute, or toggle Local Demo Mode above.",
          },
          { status: 429 }
        );
      }

      if (err.message === "HIGH_DEMAND_503") {
        return NextResponse.json(
          {
            error: "Gemini service temporarily experiencing high demand.",
            reply:
              "The AI model is currently handling a temporary spike in traffic. Please try asking again in a moment, or toggle Local Demo Mode above.",
          },
          { status: 503 }
        );
      }

      console.error("Gemini API call failed:", err.message);
      return NextResponse.json(
        {
          error: err.message || "Could not generate response from AI.",
          reply:
            "I encountered a temporary connection issue reaching the AI service. Please check your network or try again.",
        },
        { status: 500 }
      );
    }
  } catch (parseErr) {
    console.error("Error in /api/chat route:", parseErr);
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
