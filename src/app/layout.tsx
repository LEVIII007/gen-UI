import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenUI - AI-Powered UI Code Generation",
  description:
    "Upload screenshots and generate structured prompts for AI code generation.",
  keywords: [
    "AI",
    "UI Generation",
    "Code Generation",
    "Cursor AI",
    "Windsurf AI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={inter.className}>
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Toaster />
        <Footer></Footer>
      </body>
    </html>
  );
}
