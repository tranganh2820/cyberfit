import { SignUp } from "@clerk/nextjs";
import { Activity } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="z-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 mb-4">
          <Activity className="text-cyber-cyan w-10 h-10 animate-pulse" />
          <h1 className="text-3xl font-bold font-orbitron tracking-tighter text-white uppercase">
            CyberFit // New_Operative
          </h1>
        </div>

        <SignUp 
          appearance={{
            elements: {
              footerActionText: "text-gray-500",
              footerActionLink: "text-cyber-cyan hover:text-white transition-colors",
              formButtonPrimary: "bg-cyber-cyan text-black hover:bg-white transition-all uppercase tracking-widest font-black rounded-none",
              formFieldInput: "bg-black border-white/20 text-white rounded-none focus:border-cyber-cyan",
              headerTitle: "text-white font-orbitron uppercase tracking-widest",
              headerSubtitle: "text-gray-500 font-jetbrains",
            }
          }}
        />
      </div>

      <div className="mt-8 text-gray-700 font-jetbrains text-[10px] tracking-[0.2em] uppercase z-10">
        Secure_Registration_Portal // Data_Encryption_Enabled
      </div>
    </div>
  );
}
