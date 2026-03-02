import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brian Lee - Product Leader & AI Builder",
  description:
    "Product leader with 12+ years at Snap, Meta, YouTube, and Chainlink Labs. Currently building AI products and advising startups.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
