import { Lora, Inter } from "next/font/google";

// Shared by both root layouts (SiteShell) and the 404 page
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
