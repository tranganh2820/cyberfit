import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SideNavBar, TopAppBar } from "@/components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberFit // Biometric Performance",
  description: "Tactical fitness tracking for the cyber athlete.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00F5FF",
          colorBackground: "#121212",
          colorInputBackground: "#000000",
          colorInputText: "#ffffff",
        },
        elements: {
          card: "border border-cyber-cyan/30 glassmorphism",
          navbar: "hidden", // Hide sidebar in Clerk's default UI
        }
      }}
    >
      <html lang="en" className="h-full bg-black antialiased">
        <body className={`${orbitron.variable} ${jetbrains.variable} ${hanken.variable} font-hanken min-h-full flex text-white overflow-hidden`}>
          <SideNavBar />
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden">
            <TopAppBar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
