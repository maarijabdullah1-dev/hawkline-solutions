import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "block",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "block",
});

export const metadata: Metadata = {
  title: "Hawkline Solutions — Security built into every system layer",
  description:
    "Premium QA, Live Surveillance, and Reporting services for retail businesses. Catch theft, monitor sales reps, and get real-time insights. 7-day free trial.",
  keywords: [
    "Hawkline Solutions",
    "retail security",
    "QA service",
    "live surveillance",
    "sales rep monitoring",
    "cash variance",
    "theft detection",
    "Maarij Abdullah",
  ],
  authors: [{ name: "Maarij Abdullah", url: "https://hawklinesolutions.com" }],
  creator: "Maarij Abdullah",
  publisher: "Hawkline Solutions",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Hawkline Solutions — Security built into every system layer",
    description:
      "Premium QA, Live Surveillance, and Reporting services for retail businesses.",
    siteName: "Hawkline Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawkline Solutions",
    description: "Premium QA, Live Surveillance, and Reporting services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              border: "1px solid rgba(200,27,28,0.4)",
              color: "#fff",
              fontFamily: "var(--font-geist-mono), monospace",
              borderRadius: "0",
            },
          }}
        />
      </body>
    </html>
  );
}
