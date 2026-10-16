import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BloomWell AI | Small Steps. Healthier Days.",
  description:
    "Explore everyday wellness with BloomWell AI—your gentle companion for mindful movement, nourishing habits, better rest, and simple daily routines.",
  keywords: [
    "wellness",
    "healthy habits",
    "daily planner",
    "mindfulness",
    "nutrition",
    "gentle fitness",
    "sleep hygiene",
    "BloomWell AI",
    "wellness assistant",
  ],
  authors: [{ name: "Mahi Ugale", url: "mailto:mahiugale.mu@gmail.com" }],
  creator: "Mahi Ugale",
  openGraph: {
    title: "BloomWell AI | Small Steps. Healthier Days.",
    description:
      "Your everyday companion for mindful movement, nourishing choices, restful nights, and healthier routines.",
    type: "website",
    locale: "en_US",
    siteName: "BloomWell AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "BloomWell AI | Small Steps. Healthier Days.",
    description:
      "Explore everyday wellness with BloomWell AI—your gentle companion for mindful habits.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FBF9F4] text-[#294B40] font-sans antialiased selection:bg-[#DCE9DF] selection:text-[#294B40]">
        {children}
      </body>
    </html>
  );
}
