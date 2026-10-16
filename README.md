# 🌿 BloomWell AI — Small Steps. Healthier Days.

> **BloomWell AI** is a modern, responsive, production-minded everyday wellness and healthy lifestyle platform. Founded and created by **Mahi Ugale** (`mahiugale.mu@gmail.com`), BloomWell AI encourages gentle, sustainable micro-habits rather than rigid, extreme overhauls.

---

## 🌟 Highlights & Features

- **🌸 Refined Nature-Inspired Design System**: Built with an editorial palette of cotton ivory (`#FBF9F4`), sage green (`#DCE9DF`), misty blue (`#E3E8F8`), soft lavender (`#EAE1F6`), blush pink (`#F9E7E5`), and dark forest green (`#294B40`).
- **🤖 Bloom, Your Gentle Wellness Assistant**:
  - Secure server-side Next.js route handler (`/api/chat`) using the official `@google/genai` SDK.
  - Zero exposure of API keys in browser-side code.
  - Transparent dual-mode engine: connects to live **Google Gemini AI** when `GEMINI_API_KEY` is present, and gracefully provides a clearly labeled **Local Educational Demo Mode** when unconfigured.
  - Strict health and safety guardrails: non-medical disclaimers, no prescription/diagnosis claims, compassionate crisis lifeline referrals.
- **🌊 Ambient Ocean-Wave Soundscape**:
  - Procedural sound synthesizer powered by the **Web Audio API** (pink-noise filter modulation creating natural 8-second wave swells).
  - 100% offline, 0MB download, perfectly looping, with play/pause, mute, volume slider, and visualizer.
  - Option to load custom audio from `/public/audio/ocean-waves.mp3`.
- **🧘 Interactive 12-Second Mindful Pause**:
  - Embedded right in the hero section for instant nervous system resets (4s inhale, 4s hold, 4s exhale).
- **📋 "Your Little Daily Reset" Dashboard**:
  - Daily intention statement editor with quick-preset suggestions.
  - Interactive water tracker (increment/decrement, customizable target, glass & milliliter readouts).
  - Four restorative habit checklists (gentle movement, breathing pause, balanced nutrition, evening dim-down).
  - Real-time progress percentage bar and next-day reset with confirmation dialog.
  - Local browser persistence via `localStorage`—no login required.
- **💡 "A Little Good for Today" Daily Tips**:
  - Curated collection of 12+ actionable wellness tips across movement, hydration, sleep, nutrition, and gratitude.
  - Instant category filter and smooth rotating transitions.
- **🗺️ 6 Interactive Wellness Exploration Dimensions**:
  - Movement & Gentle Fitness, Food & Nourishing Nutrition, Sleep & Restorative Rest, Mindfulness & Inner Calm, Mindful Daily Hydration, and Everyday Habits & Flow.
  - Detailed modal popups featuring practical habits and direct "Ask Bloom" topic prompts.
- **📬 Validated Contact Section**:
  - Clean client-side validation with transparent `mailto:` generation directly addressing owner Mahi Ugale.
- **❓ Interactive FAQ Accordion**:
  - Honest disclosure on privacy, AI operations, medical disclaimers, and local storage.
- **♿ Accessibility & Performance**:
  - Semantic HTML5, visible focus rings, ARIA dialogs, `prefers-reduced-motion` compliance, and mobile responsive drawers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI Integration** | [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai) (`@google/genai`) |
| **Audio** | Procedural Web Audio API Synthesizer (BiquadFilter + LFO Pink Noise) |
| **Typography** | Google Fonts (`Plus Jakarta Sans` + `Playfair Display`) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
Bloomwell-ai/
├── public/
│   ├── favicon.svg             # Custom BloomWell floral brand mark
│   └── audio/                  # (Optional) Drop custom ocean-waves.mp3 here
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts    # Secure server-side Gemini route handler
│   │   ├── globals.css         # Tailwind v4 theme, pastel gradients, animations
│   │   ├── layout.tsx          # Root layout, Google Fonts, SEO metadata
│   │   └── page.tsx            # Main single-page application orchestrator
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky responsive header with sound status
│   │   ├── Hero.tsx            # Editorial hero with mindful breathing widget
│   │   ├── AboutSection.tsx    # Philosophy & 3 core pillars
│   │   ├── WellnessCards.tsx   # 6 interactive exploration dimensions
│   │   ├── WellnessModal.tsx   # Topic details & suggested questions
│   │   ├── HowItWorks.tsx      # 3-step visual process
│   │   ├── DailyWellnessDashboard.tsx # Daily reset planner & water tracker
│   │   ├── DailyTips.tsx       # Rotating daily tips with category filter
│   │   ├── OceanSoundPlayer.tsx# Ambient ocean wave synthesizer controls
│   │   ├── WellnessChatbot.tsx # Bloom AI chatbot modal with demo mode
│   │   ├── FAQSection.tsx      # Interactive FAQ accordion
│   │   ├── ContactSection.tsx  # Validated contact form with mailto fallback
│   │   └── Footer.tsx          # Brand links, copyright & medical disclaimer
│   ├── lib/
│   │   ├── ai.ts               # Gemini client, system prompts, health rules
│   │   ├── sound-synth.ts      # Web Audio procedural wave synthesis engine
│   │   ├── validation.ts       # Input validation & mailto URL generator
│   │   ├── wellness-tips.ts    # Curated offline wellness tips database
│   │   └── wellness-topics.ts  # Deep wellness dimension content
│   └── types/
│       └── index.ts            # TypeScript interfaces and contracts
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules protecting secrets
├── package.json                # Dependencies and scripts
└── README.md                   # Complete documentation
```

---

## 🚀 Quick Start (Running Locally)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18.18 or higher (tested on Node v24)
- npm, pnpm, or yarn

### 2. Clone and Install
```bash
git clone https://github.com/mahiugale/Bloomwell-ai.git
cd Bloomwell-ai
npm install
```

### 3. Configure Environment Variables (Optional for Live AI)
The project runs out-of-the-box in **Local Demo Mode** even without an API key! To enable live Gemini AI:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and add your free Google AI Studio key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```

> 💡 **Where to get a free Gemini API key?**
> Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and click **"Create API Key"**. The free tier provides generous daily quotas with zero subscription costs.

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Lint Checks
```bash
# Run ESLint checks
npm run lint

# Build production bundle
npm run build

# Start production server locally
npm start
```

---

## 🌊 Ocean-Wave Soundscape: How It Works

BloomWell AI includes a custom Web Audio procedural ocean wave generator (`src/lib/sound-synth.ts`):
- **No external audio file required**: It synthesizes a gentle, rhythmic swell using stereo pink noise filtered through an LFO-modulated low-pass biquad filter.
- **Custom Audio Support**: If you prefer playing a recorded ocean wave audio file, simply place your audio file at `public/audio/ocean-waves.mp3`.
- **Browser Autoplay Compliance**: Browsers require user interaction before playing audio; sound is off by default and starts only upon an explicit click.

---

## 🔒 Security & Privacy Practices

1. **No Client-Side Secrets**: All calls to the Gemini API are executed strictly on the server in `src/app/api/chat/route.ts`. The API key is never sent to the browser.
2. **Zero Involuntary Tracking**: The daily planner uses the browser's `localStorage` for private persistence. No personal health records or emails are saved to an external database.
3. **Transparent Contact**: The contact form does not simulate a fake sent message; it transparently builds a structured `mailto:` link opening the visitor's mail client directly to `mahiugale.mu@gmail.com`.
4. **Git Protection**: `.gitignore` is pre-configured to exclude all `.env*` files (except `.env.example`).

---

## 🌐 Deployment to Vercel

BloomWell AI is optimized for one-click deployment on [Vercel](https://vercel.com/):

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit: BloomWell AI complete release"
git remote add origin https://github.com/mahiugale/Bloomwell-ai.git
git push -u origin master
```

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Select your GitHub repository `Bloomwell-ai`.
4. Framework Preset will be automatically detected as **Next.js**.

### Step 3: Configure Environment Variables
Under **Environment Variables**, add:
- `GEMINI_API_KEY`: Your Google AI Studio API key.
- `GEMINI_MODEL`: `gemini-2.5-flash` (or `gemini-1.5-flash`).

### Step 4: Deploy
Click **"Deploy"**. Within ~1 minute, your production URL will be live!

---

## 📋 Honest Verification & Test Status

| Feature / Verification | Status | Verification Method |
|---|---|---|
| **Next.js Production Build** | ✅ PASSED | `npm run build` compiled static & dynamic routes in ~1.8s |
| **ESLint Quality Checks** | ✅ PASSED | `npm run lint` exited with code 0 (zero errors or warnings) |
| **Homepage HTTP 200** | ✅ PASSED | Tested local server GET `/` responding with complete DOM |
| **Chat API Missing Key Fallback** | ✅ PASSED | Returns 200 with `needsSetup: true` and setup instructions |
| **Chat API Local Demo Mode** | ✅ PASSED | Returns 200 with `isDemo: true` and offline educational answer |
| **Empty/Malformed Chat Inputs** | ✅ PASSED | Validated and rejected with 400 Bad Request |
| **Web Audio Ocean Synth** | ✅ PASSED | Clean procedural sound synthesis with zero external dependencies |
| **Planner LocalStorage** | ✅ PASSED | Saves state without cascading effect re-renders |
| **Contact Form Validation** | ✅ PASSED | Validates name, email, subject, message; encodes clean mailto link |

---

## 📄 License & Attribution

- **Project Creator & Owner**: Mahi Ugale ([mahiugale.mu@gmail.com](mailto:mahiugale.mu@gmail.com))
- **Disclaimer**: BloomWell AI provides general educational lifestyle and wellness information. It is not intended as medical advice or clinical diagnosis.
