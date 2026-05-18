import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootCursor } from "@/components/ui/RootCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KORFU INVESTMENT — Apartamenty inwestycyjne na Korfu",
  description:
    "Wybrane apartamenty inwestycyjne na greckiej wyspie Korfu. Rzetelna analiza, partner na miejscu, pełny proces zakupu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        {children}
        <RootCursor />
      </body>
    </html>
  );
}
