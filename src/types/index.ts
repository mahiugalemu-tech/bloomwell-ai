export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isError?: boolean;
  isDemo?: boolean;
}

export interface ChatRequestBody {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatApiResponse {
  reply?: string;
  isDemo?: boolean;
  model?: string;
  disclaimer?: string;
  error?: string;
  needsSetup?: boolean;
  setupInstructions?: string;
}

export interface DailyHabit {
  id: string;
  label: string;
  category: "movement" | "mindfulness" | "sleep" | "nutrition" | "lifestyle";
  completed: boolean;
  timeHint?: string;
  description?: string;
}

export interface DashboardState {
  intention: string;
  waterGlasses: number;
  waterGoal: number; // e.g. 8 glasses (approx 250ml each = 2000ml)
  habits: DailyHabit[];
  lastUpdatedDate: string;
}

export type TipCategory =
  | "Movement"
  | "Hydration"
  | "Relaxation"
  | "Sleep"
  | "Balanced Meals"
  | "Gratitude"
  | "Mindful Breathing"
  | "Outdoor Time"
  | "Healthy Digital Habits";

export interface WellnessTip {
  id: string;
  category: TipCategory;
  title: string;
  tip: string;
  actionStep: string;
  tagline: string;
}

export interface WellnessSubtopic {
  title: string;
  description: string;
  practicalTip: string;
}

export interface WellnessTopic {
  id: string;
  title: string;
  badge: string;
  summary: string;
  iconName: string;
  accentBg: string;
  borderColor: string;
  subtopics: WellnessSubtopic[];
  gentleReminder: string;
  recommendedQuestions: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
