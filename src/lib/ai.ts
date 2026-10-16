import { GoogleGenAI } from "@google/genai";

export const BLOOM_SYSTEM_INSTRUCTION = `
You are "Bloom", the gentle AI wellness companion for BloomWell AI (founded by Mahi Ugale).
Your mission is to help people discover practical, realistic, and uplifting daily habits that make their days feel lighter, calmer, and more energized.

YOUR CORE PHILOSOPHY:
- "Small steps. Healthier days."
- Sustainable consistency matters infinitely more than perfection or extreme overhauls.
- Wellness should fit a person's real life—not the other way around.

YOUR TONE & PERSONALITY:
- Warm, calm, reassuring, supportive, and completely non-judgmental.
- Clear, approachable, and encouraging to beginners.
- Concise by default (2 to 4 friendly paragraphs or brief bullet points), but able to provide detailed step-by-step guidance when the user asks for it.
- Use gentle, encouraging language. Never use guilt, shame, or pressure.

YOUR ALLOWED WELLNESS DOMAINS:
1. Daily healthy habits & realistic morning/evening routines
2. General nutrition education, balanced meal ideas, and mindful eating (no prescriptive calorie-counting diets)
3. Gentle fitness, stretching, walking routines, and active recovery
4. Sleep hygiene, bedroom wind-down rituals, and restful environment habits
5. Everyday hydration habits and gentle reminder techniques
6. Mindfulness, calming breathing exercises (like 4-7-8, box breathing), and gratitude
7. Stress management, grounding techniques, and screen breaks

CRITICAL HEALTH & SAFETY GUARDRAILS (STRICT COMPLIANCE REQUIRED):
1. NOT MEDICAL ADVICE: Clearly and gently remind users that you provide general educational wellness guidance, not medical diagnosis or clinical treatment.
2. NO DIAGNOSES OR PRESCRIPTIONS: Never diagnose physical or psychological conditions, never prescribe medications, never suggest altering or discontinuing prescribed medication or therapy.
3. NO CLINICAL REPLACEMENT: Never claim to replace a physician, therapist, licensed dietitian, or psychiatrist.
4. NO EXTREMES: Never recommend severe caloric restriction, rapid weight-loss schemes, unverified high-dose supplements, or dangerous exercise regimens.
5. REFER PERSISTENT SYMPTOMS: If the user describes persistent, severe, or worsening physical or psychological pain, kindly advise them to consult a qualified healthcare professional.
6. CRISIS INTERVENTION: If a user expresses self-harm, severe psychological distress, suicidal ideation, or an acute emergency:
   - Immediately express deep compassion and care.
   - Advise them to connect with immediate support:
     * In the US/Canada: Call or text 988 (Suicide & Crisis Lifeline) or text HOME to 741741.
     * In the UK: Call 111 or text SHOUT to 85258.
     * In India: Call 112 (Emergency) or 9152987821 (Vandrevala Foundation).
     * Worldwide: Contact their local emergency services or visit https://findahelpline.com/
   - Do not attempt to counsel them through acute crisis yourself.
`.trim();

/**
 * Checks if Gemini API key is configured on the server.
 */
export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key.trim().length > 0 && !key.includes("YOUR_API_KEY"));
}

/**
 * Returns the configured Gemini model name.
 */
export function getGeminiModelName(): string {
  return process.env.GEMINI_MODEL?.trim() || "gemini-flash-lite-latest";
}

/**
 * Generates a response using the Gemini API with automatic model failover.
 */
export async function generateBloomResponse(
  messages: Array<{ role: "user" | "assistant"; content: string }>
): Promise<{ reply: string; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey.includes("YOUR_API_KEY")) {
    throw new Error("GEMINI_API_KEY_NOT_CONFIGURED");
  }

  const configuredModel = getGeminiModelName();
  // Candidate models fallback order for maximum availability
  const candidateModels = Array.from(
    new Set([
      configuredModel,
      "gemini-flash-lite-latest",
      "gemini-3.5-flash-lite",
      "gemini-3.6-flash",
      "gemini-3.8-flash",
      "gemini-flash-latest",
    ])
  );

  const ai = new GoogleGenAI({ apiKey });

  // Map messages to Gemini format
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  let lastError: unknown = null;

  for (const modelToTry of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelToTry,
        contents,
        config: {
          systemInstruction: BLOOM_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I'm here with you. How can I help you take a gentle pause today?";
      return { reply, model: modelToTry };
    } catch (error: unknown) {
      lastError = error;
      const errObj = error as { status?: number; message?: string };
      console.warn(`Gemini model ${modelToTry} failed (${errObj?.status || "error"}), trying fallback...`);
      // Continue to next candidate model
    }
  }

  // If all models failed, classify error
  const errObj = lastError as { status?: number; message?: string };
  if (errObj?.status === 429 || errObj?.message?.includes("429") || errObj?.message?.includes("quota")) {
    throw new Error("QUOTA_EXCEEDED");
  }

  if (errObj?.status === 503 || errObj?.message?.includes("503") || errObj?.message?.includes("high demand")) {
    throw new Error("HIGH_DEMAND_503");
  }

  throw lastError;
}

/**
 * Provides a local educational demo response when no API key is configured.
 * Clearly identified as a simulated demo assistant.
 */
export function generateLocalDemoResponse(userPrompt: string): string {
  const lower = userPrompt.toLowerCase();

  let educationalGuidance = "";

  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("night") || lower.includes("tired")) {
    educationalGuidance = 
`Here are 3 gentle steps for better sleep:
1. **The 30-Minute Dim Down**: Lower bright overhead lighting 45 minutes before bed to allow natural melatonin production.
2. **Brain Dump**: Write down tomorrow's 2 or 3 lingering thoughts on a physical notepad by your bed.
3. **Gentle Coolness**: Keep the bedroom around 18–20°C (65–68°F), which signals the body it is time to rest.

*Gentle reminder: If you experience chronic insomnia or daytime exhaustion, speaking with a healthcare professional can provide personalized support.*`;
  } else if (lower.includes("water") || lower.includes("hydrat") || lower.includes("drink")) {
    educationalGuidance = 
`Building a gentle hydration rhythm:
- **Morning Anchor**: Drink one room-temperature glass right after waking up to rehydrate after sleep.
- **Visual Cue**: Keep a filled water carafe or your favorite mug right on your desk where you can see it.
- **Natural Infusions**: Try adding a slice of cucumber, mint, or lemon if plain water feels unexciting.

*Aim for steady sips throughout the day rather than chugging large amounts at night.*`;
  } else if (lower.includes("food") || lower.includes("meal") || lower.includes("nutrition") || lower.includes("eat") || lower.includes("diet")) {
    educationalGuidance = 
`A balanced plate idea without rigid rules:
- **Half the plate**: Colorful vegetables or fresh greens for fiber and micronutrients.
- **A quarter plate**: Quality protein (like lentils, tofu, beans, fish, or eggs) for steady satiety.
- **A quarter plate**: Complex whole grains (like brown rice, quinoa, or roasted sweet potatoes).

*Remember: Wholesome eating is about adding nourishing color and variety, not restrictive diets.*`;
  } else if (lower.includes("yoga") || lower.includes("stretch") || lower.includes("walk") || lower.includes("movement") || lower.includes("exercise") || lower.includes("fitness")) {
    educationalGuidance = 
`Gentle movement ideas to awaken the body:
1. **How to start yoga**: Begin with 5–10 minutes on a soft rug or mat. Focus on gentle child's pose (Balasana), cat-cow spinal stretches, and easy seated twists. Keep your breath slow and never force flexibility.
2. **The Posture Unfold**: Roll your shoulders back, clasp hands behind your hips, and take three deep belly breaths.
3. **10-Minute Walk**: A gentle stroll after a meal aids natural digestion and clears mental fog.`;
  } else if (lower.includes("breath") || lower.includes("stress") || lower.includes("anxious") || lower.includes("calm") || lower.includes("relax")) {
    educationalGuidance = 
`Let's take a 60-second nervous system pause together:
1. Soften your jaw and let your shoulders drop down away from your ears.
2. Inhale gently through your nose for **4 counts**.
3. Exhale slowly and softly through your mouth for **6 counts**.
4. Repeat this 4 times.

Notice how extending your exhale naturally tells your nervous system that you are safe in this moment.`;
  } else {
    educationalGuidance = 
`Thank you for reaching out! In wellness, the secret is starting smaller than you think:
- Choose **one tiny habit** that takes less than 2 minutes (like drinking a glass of water, taking three deep breaths, or stepping into the sun).
- Stack it right next to an existing ritual you already do every single day.
- Treat yourself with kindness if life interrupts your routine.

What area of your day would you love to bring a little more ease to: sleep, gentle movement, hydration, balanced meals, or quiet pauses?`;
  }

  return educationalGuidance;
}
