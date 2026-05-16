import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AgroHealthAI VetPractice — Veterinary Practice Management",
  description: "The only veterinary ERP with AI-powered clinical diagnostics, antimicrobial stewardship, and 39,917 peer-reviewed evidence sources.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full bg-slate-50 antialiased font-sans">{children}</body>
    </html>
  );
}
