import { WellnessTopic } from "@/types";

export const WELLNESS_TOPICS: WellnessTopic[] = [
  {
    id: "movement",
    title: "Movement & Gentle Fitness",
    badge: "Energize & Unwind",
    summary:
      "Physical movement should feel like an act of care, not a punishment. Discover sustainable ways to stay active through gentle stretching, restorative walks, and playful daily motion.",
    iconName: "Activity",
    accentBg: "bg-[#DCE9DF]/50",
    borderColor: "border-[#DCE9DF]",
    subtopics: [
      {
        title: "Gentle Stretching Routines",
        description:
          "Target common tension zones in the neck, shoulders, hips, and lower back with 5-minute floor or chair mobility sequences.",
        practicalTip:
          "Start your morning with a 3-minute cat-cow spinal flex and gentle child's pose to awaken blood flow without cardiovascular strain.",
      },
      {
        title: "Mindful Walking Ideas",
        description:
          "Transform simple walks into grounding rituals. Focus on the rhythmic foot strike, surrounding natural sounds, and your natural breathing pace.",
        practicalTip:
          "Take a 10-minute walk after lunch without headphones, observing three natural colors around you.",
      },
      {
        title: "Beginner-Friendly Movement Habits",
        description:
          "Consistency triumphs over intensity. Micro-workouts of 5–10 minutes throughout the day build enduring physical stamina and joint health.",
        practicalTip:
          "Do 10 gentle bodyweight squats or standing calf raises while waiting for the kettle to boil.",
      },
      {
        title: "Rest & Active Recovery",
        description:
          "True progress happens when your body rests. Active recovery like gentle foam rolling, restorative yoga, or simply lying with legs elevated restores vitality.",
        practicalTip:
          "Spend 5 minutes in 'legs up the wall' pose before bed to encourage venous circulation and ease tired legs.",
      },
    ],
    gentleReminder:
      "Movement is personal. Listen to your body's energy levels each day and honor what feels restoring rather than depleting.",
    recommendedQuestions: [
      "Suggest a 5-minute desk stretch for lower back tightness.",
      "How can I build a gentle walking habit without feeling overwhelmed?",
      "What are simple ways to stay active when working from home all day?",
    ],
  },
  {
    id: "nutrition",
    title: "Food & Nourishing Nutrition",
    badge: "Nourish & Balance",
    summary:
      "A compassionate approach to eating that focuses on adding nourishing variety, honoring hunger cues, and enjoying wholesome foods without guilt or restrictive rules.",
    iconName: "Utensils",
    accentBg: "bg-[#F9E7E5]/50",
    borderColor: "border-[#F9E7E5]",
    subtopics: [
      {
        title: "Balanced Plate Blueprint",
        description:
          "Aim for a harmonious harmony of complex carbohydrates, clean protein sources, healthy fats, and a rainbow of colorful vegetables.",
        practicalTip:
          "Think 'half plate color, quarter plate protein, quarter plate whole grains' as a flexible visual guide.",
      },
      {
        title: "Mindful Eating Practices",
        description:
          "Savoring meals without screens or hurried multitasking improves digestive enzyme production and helps tune into genuine fullness cues.",
        practicalTip:
          "Chew slowly and set your fork down between bites for the first five minutes of your next meal.",
      },
      {
        title: "Simple, Stress-Free Meal Prep",
        description:
          "You don't need to cook all Sunday. Prepping a single versatile grain and roasting a tray of seasonal vegetables keeps weekday lunches effortless.",
        practicalTip:
          "Roast a large baking tray of sweet potatoes, broccoli, and chickpeas with olive oil and herbs for quick lunch bowls.",
      },
      {
        title: "Gentle Energy Sustenance",
        description:
          "Prevent afternoon slumps by combining dietary fiber with healthy protein, avoiding sharp blood sugar spikes and crashes.",
        practicalTip:
          "Pair fresh apple slices with almond butter or a handful of raw walnuts for steady afternoon focus.",
      },
    ],
    gentleReminder:
      "Food is nourishment, comfort, and culture. Strive for gentle consistency over restrictive perfection.",
    recommendedQuestions: [
      "What does an easy, balanced plant-forward lunch look like?",
      "How can I stop the 3 PM afternoon energy crash?",
      "What are simple snacks that combine fiber and protein?",
    ],
  },
  {
    id: "sleep",
    title: "Sleep & Restorative Rest",
    badge: "Unwind & Restore",
    summary:
      "Sleep is the biological foundation of mental clarity, emotional resilience, and cellular repair. Discover gentle rituals to quiet an active mind and cultivate deeper rest.",
    iconName: "Moon",
    accentBg: "bg-[#EAE1F6]/50",
    borderColor: "border-[#EAE1F6]",
    subtopics: [
      {
        title: "Consistent Bedtime Rituals",
        description:
          "Going to bed and waking up within a 30-minute window every day reinforces your circadian rhythm for easier sleep onset.",
        practicalTip:
          "Set a gentle 'start winding down' chime on your phone 45 minutes before your target bedtime.",
      },
      {
        title: "Creating a Sleep Sanctuary",
        description:
          "Keep your sleeping environment cool (around 18-20°C / 65-68°F), dark, quiet, and dedicated solely to rest and tranquility.",
        practicalTip:
          "Remove work devices and bright LED indicators from direct eye level in your sleeping room.",
      },
      {
        title: "The Evening Wind-Down Routine",
        description:
          "Gradually taper sensory stimulation. Swap high-tempo social media scrolling for warm baths, soothing herbal tea, or gentle journaling.",
        practicalTip:
          "Sip a warm cup of chamomile or lemon balm tea while jotting down three things you are grateful for.",
      },
      {
        title: "Relaxation When Sleep Won't Come",
        description:
          "Tossing and turning creates subconscious sleep anxiety. If awake after 20 minutes, move to a dim chair and read something gentle until drowsy.",
        practicalTip:
          "Practice progressive muscle relaxation: systematically tense and release muscle groups from toes to crown.",
      },
    ],
    gentleReminder:
      "Good sleep begins in the morning with natural light and continues through gentle, consistent evening wind-downs.",
    recommendedQuestions: [
      "How can I quiet racing thoughts when trying to sleep?",
      "Suggest an evening wind-down routine for a busy schedule.",
      "What can I do if I wake up in the middle of the night?",
    ],
  },
  {
    id: "mindfulness",
    title: "Mindfulness & Inner Calm",
    badge: "Pause & Center",
    summary:
      "Learn to step off the autopilot of modern life. Mindfulness is not about emptying your thoughts, but creating a compassionate, steady space to observe them.",
    iconName: "Sparkles",
    accentBg: "bg-[#E3E8F8]/50",
    borderColor: "border-[#E3E8F8]",
    subtopics: [
      {
        title: "Micro-Breathing Pauses",
        description:
          "Box breathing (4s in, 4s hold, 4s out, 4s hold) or the 4-7-8 method rapidly dials down acute sympathetic nervous system stress.",
        practicalTip:
          "Take three slow, intentional sighs before answering an unexpected phone call or opening your email inbox.",
      },
      {
        title: "Present-Moment Sensory Check-In",
        description:
          "The 5-4-3-2-1 technique anchors you in physical reality whenever anxious thoughts take flight into future worries.",
        practicalTip:
          "Silently identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      },
      {
        title: "Gratitude & Perspective Journaling",
        description:
          "Writing down brief reflections of everyday grace helps counteract the brain's natural evolutionary negativity bias.",
        practicalTip:
          "Write down one kind thing someone did for you this week, no matter how small.",
      },
      {
        title: "Mindful Digital Boundaries",
        description:
          "Protecting your cognitive sanctuary from constant notification pings preserves sustained mental focus and inner stillness.",
        practicalTip:
          "Declare the first 20 minutes of your morning and last 30 minutes of your evening phone-free zones.",
      },
    ],
    gentleReminder:
      "You don't need an hour of silent retreat to be mindful. A single conscious breath is already a complete practice.",
    recommendedQuestions: [
      "Guide me through a 3-minute emergency calm-down breathing exercise.",
      "How do I practice mindfulness if I can't sit still for meditation?",
      "What are simple ways to handle acute workday stress?",
    ],
  },
  {
    id: "hydration",
    title: "Mindful Daily Hydration",
    badge: "Refresh & Clarify",
    summary:
      "Hydration powers cellular energy, digestive ease, cognitive clarity, and skin health. Learn practical, pressure-free habits to keep your body comfortably hydrated.",
    iconName: "Droplet",
    accentBg: "bg-[#E3E8F8]/60",
    borderColor: "border-[#DCE9DF]",
    subtopics: [
      {
        title: "Understanding Personal Hydration Needs",
        description:
          "Hydration requirements vary with climate, physical activity, and body mass. The common baseline of 6–8 glasses (1.5–2L) is a gentle starting reference.",
        practicalTip:
          "Check the color of your urine as a natural indicator: pale straw yellow indicates balanced hydration.",
      },
      {
        title: "Building Hydration Triggers",
        description:
          "Keep water visible. Having an aesthetic carafe or reusable glass bottle at your desk removes friction from remembering to drink.",
        practicalTip:
          "Fill a fresh 1-liter carafe every morning and place it right beside your computer keyboard.",
      },
      {
        title: "Natural Flavors & Herbal Teas",
        description:
          "Herbal infusions like peppermint, ginger, and rooibos contribute to your daily fluid intake while providing gentle botanical benefits.",
        practicalTip:
          "Add crushed fresh rosemary, sliced strawberries, or lime wheels to your chilled water bottle.",
      },
      {
        title: "Hydration for Movement & Recovery",
        description:
          "Sip water before, during, and after physical exertion to prevent muscle cramps and sustain steady cardiovascular stamina.",
        practicalTip:
          "Drink an extra glass of water with a pinch of mineral sea salt and lemon juice after extended walks or sweating.",
      },
    ],
    gentleReminder:
      "Hydrate steadily throughout the day rather than chugging large volumes late in the evening.",
    recommendedQuestions: [
      "How do I calculate a healthy daily water goal for myself?",
      "What are tasty, natural ways to infuse water without sugar?",
      "Why do I get headaches when I forget to hydrate?",
    ],
  },
  {
    id: "habits",
    title: "Everyday Habits & Flow",
    badge: "Build & Flourish",
    summary:
      "Sustainable change isn't born from sudden overhaul, but from tiny daily choices repeated with grace. Learn how to shape routines that feel effortless and joyful.",
    iconName: "Compass",
    accentBg: "bg-[#DCE9DF]/40",
    borderColor: "border-[#EAE1F6]",
    subtopics: [
      {
        title: "The Art of Habit Stacking",
        description:
          "Attach a new micro-habit to an already established routine (e.g., 'After I brush my teeth, I will do 60 seconds of gentle stretching').",
        practicalTip:
          "Identify one rock-solid daily anchor (like your morning coffee) and stack a 1-minute positive action right behind it.",
      },
      {
        title: "Crafting a Soft Morning Transition",
        description:
          "How you spend your first 30 minutes sets the tone for your nervous system. Give yourself time to wake up gently before meeting the world's demands.",
        practicalTip:
          "Avoid looking at emails or urgent headlines until you have finished your first glass of water and stretched your arms.",
      },
      {
        title: "The Power of the 2-Minute Reset",
        description:
          "When overwhelmed, shrinking tasks to two minutes bypasses the brain's resistance to change and builds immediate momentum.",
        practicalTip:
          "Commit to doing just two minutes of tidy-up, journaling, or breathing when you feel unmotivated.",
      },
      {
        title: "Compassionate Habit Recovery",
        description:
          "Missing a day is natural life, not failure. The secret to long-term wellness is simply never missing twice in a row without self-criticism.",
        practicalTip:
          "If you miss a planned habit, treat yourself with the exact kindness you would extend to a dear friend.",
      },
    ],
    gentleReminder:
      "Small steps repeated with patience create profound, lasting transformation over time.",
    recommendedQuestions: [
      "How does habit stacking work in real everyday practice?",
      "What should I do when I lose motivation for my healthy habits?",
      "Suggest a gentle, realistic morning routine for low-energy mornings.",
    ],
  },
];
