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
          colorBackground: "#0A0A0A",
          colorInputBackground: "#111111",
          colorInputText: "#ffffff",
          fontFamily: "var(--font-hanken)",
        },
        elements: {
          card: "border border-cyber-cyan/20 glassmorphism rounded-none bg-black/80 shadow-[0_0_30px_rgba(0,245,255,0.1)]",
          navbar: "hidden",
          headerTitle: "font-orbitron text-xl uppercase tracking-tighter",
          headerSubtitle: "font-jetbrains text-[10px] uppercase tracking-widest text-gray-500",
          formButtonPrimary: "bg-cyber-cyan text-black hover:bg-white transition-all uppercase tracking-[0.2em] font-black rounded-none h-12 text-xs",
          formFieldLabel: "font-jetbrains text-[9px] uppercase tracking-widest text-gray-400 mb-2",
          formFieldInput: "bg-black/50 border-white/10 text-white rounded-none focus:border-cyber-cyan transition-colors h-11",
          footerActionText: "font-jetbrains text-[10px] uppercase text-gray-600",
          footerActionLink: "font-jetbrains text-[10px] uppercase text-cyber-cyan hover:text-white transition-colors",
          socialButtonsBlockButton: "border border-white/10 rounded-none hover:bg-white/5 transition-colors",
          socialButtonsBlockButtonText: "font-jetbrains text-[10px] uppercase tracking-widest",
          dividerText: "font-jetbrains text-[9px] uppercase text-gray-700",
          identityPreviewText: "font-jetbrains text-xs text-white",
          identityPreviewEditButton: "text-cyber-cyan hover:text-white",
          userButtonAvatarBox: "rounded-none border border-cyber-cyan/30",
          userButtonPopoverCard: "border border-cyber-cyan/20 glassmorphism rounded-none",
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
