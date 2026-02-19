import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"; //
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-ORALS | Automated Viva Voce",
  description: "AI-powered voice interviews for academic assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
  appearance={{
    variables: {
      colorPrimary: '#2dd4bf', 
      colorBackground: '#18181b', 
      colorText: 'white',
    },
    elements: {
      // Targets the Google button text specifically
      socialButtonsBlockButtonText: {
        color: 'white',
        fontWeight: '600',
      },
      // Targets the input fields
      formFieldInput: {
        backgroundColor: 'white',
        color: 'black',
        '&::placeholder': {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
      // Fixes the "OR" divider text
      dividerText: {
        color: '#a1a1aa', // zinc-400
      },
      // Ensures the card looks clean on your dark background
      card: {
        border: '1px solid #27272a', // zinc-800
        backgroundColor: '#18181b',
      }
    }
  }}
>{/* Wrap everything here */}
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090b]`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}