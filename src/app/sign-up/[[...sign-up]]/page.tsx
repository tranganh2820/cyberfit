import { SignUp } from "@clerk/nextjs";
import { Activity } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="z-10 flex flex-col items-center gap-8 max-w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <Activity className="text-cyber-cyan w-12 h-12 animate-pulse" />
          <h1 className="text-4xl font-bold font-orbitron tracking-tighter text-white uppercase">
            CyberFit // <span className="text-cyber-cyan">New_Operative</span>
          </h1>
          <p className="font-jetbrains text-[10px] text-gray-400 uppercase tracking-[0.4em]">Initializing_Data_Sequence</p>
        </div>

        <SignUp />
      </div>

      <div className="mt-12 text-gray-400 font-jetbrains text-[8px] tracking-[0.3em] uppercase z-10">
        Registration_Node: [SECURE] // Status: [CONNECTED]
      </div>
    </div>
  );
}
