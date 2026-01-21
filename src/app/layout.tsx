import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const generateViewport = (): Viewport => ({
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="author" href="/humans.txt" />
        <meta name="author" content="Anas Khan" />
        <meta name="copyright" content="Anas Khan" />
        <Script
          id="structured-data-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`font-hanken-grotesk antialiased min-h-screen bg-white text-black dark:bg-black dark:text-white ${geistSans.variable} ${geistMono.variable}`}>
        <Script
          data-goatcounter="https://anas.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">{children}</main>
        <Footer />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
