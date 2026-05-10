'use client'

import { Trophy, ChevronUp, ChevronDown, User, Target } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function RankHero({ rank, percentile }: { rank: string, percentile: string }) {
  return (
    <div className="border border-cyber-cyan bg-cyber-cyan/5 p-10 glassmorphism glow-cyan text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <Trophy className="text-cyber-cyan opacity-20" size={80} />
      </div>
      <h2 className="font-jetbrains text-[10px] text-cyber-cyan tracking-[0.4em] uppercase mb-4">_GLOBAL_RANK_PROTOCOL</h2>
      <div className="text-7xl font-bold font-orbitron text-white mb-2">#{rank}</div>
      <p className="text-cyber-lime font-jetbrains text-xs tracking-widest uppercase">Top {percentile} of all operatives</p>
      <button className="mt-8 text-white font-jetbrains text-[10px] border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all tracking-widest uppercase">
        View_Detailed_Analysis
      </button>
    </div>
  )
}

export function LeaderboardList({ items }: { items: any[] }) {
  return (
    <div className="border border-white/10 bg-black/40 glassmorphism overflow-hidden">
      <div className="flex border-b border-white/10">
        {['GLOBAL', 'FRIENDS', 'REGIONAL'].map((tab, i) => (
          <button 
            key={tab}
            className={cn(
              "flex-1 py-4 font-orbitron text-xs tracking-widest transition-colors",
              i === 0 ? "text-cyber-cyan border-b border-cyber-cyan bg-cyber-cyan/5" : "text-gray-500 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-2">
        <table className="w-full text-left font-jetbrains">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5">
              <th className="p-4">Rank</th>
              <th className="p-4">Operative</th>
              <th className="p-4">Power_Level</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {items.map((item) => (
              <tr 
                key={item.user} 
                className={cn(
                  "hover:bg-white/5 transition-colors border-b border-white/5",
                  item.isUser && "bg-cyber-cyan/5 border-l-2 border-l-cyber-cyan"
                )}
              >
                <td className="p-4 font-bold text-white italic">#{item.rank}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyber-charcoal border border-white/10 flex items-center justify-center text-[10px] font-bold">
                      {item.avatar}
                    </div>
                    <span className="text-white uppercase tracking-tighter">{item.user}</span>
                  </div>
                </td>
                <td className="p-4 text-cyber-cyan font-bold">{item.powerLevel}</td>
                <td className="p-4 text-right">
                  <button className="border border-cyber-cyan/40 px-4 py-1 text-[10px] text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all uppercase tracking-widest">
                    Challenge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function BiometricHUD() {
  const stats = [
    { label: 'POWER_OUTPUT', user: 84, elite: 98, color: '#00F5FF' },
    { label: 'STAMINA_INDEX', user: 72, elite: 92, color: '#BF00FF' },
    { label: 'RECOVERY_RATE', user: 90, elite: 88, color: '#39FF14' },
  ]

  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <div className="flex items-center gap-2 mb-8">
        <Target size={18} className="text-cyber-purple" />
        <h2 className="font-orbitron text-sm uppercase tracking-widest text-white">Biometric_Comparison</h2>
      </div>

      <div className="space-y-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between text-[10px] font-jetbrains uppercase mb-3">
              <span className="text-gray-500">{stat.label}</span>
              <span className="text-white">VS #1 ELITE</span>
            </div>
            <div className="relative h-12 flex items-center gap-2">
               <div className="flex-1 space-y-2">
                  <div className="h-1 bg-white/5 relative">
                    <div 
                      className="absolute inset-y-0 left-0 transition-all duration-1000"
                      style={{ width: `${stat.user}%`, backgroundColor: stat.color }}
                    />
                  </div>
                  <div className="h-1 bg-white/5 relative">
                    <div 
                      className="absolute inset-y-0 left-0 transition-all duration-1000 opacity-30"
                      style={{ width: `${stat.elite}%`, backgroundColor: stat.color }}
                    />
                  </div>
               </div>
               <div className="text-right min-w-[40px]">
                 <div className="text-xs font-bold font-jetbrains" style={{ color: stat.color }}>{stat.user}%</div>
                 <div className="text-[9px] font-jetbrains text-gray-600">{stat.elite}%</div>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/5">
        <div className="text-[10px] font-jetbrains text-gray-500 uppercase mb-4 tracking-[0.2em]">Neural_Sync_Status</div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-cyber-lime border-t-transparent animate-spin" />
          <div className="font-jetbrains text-[9px] text-cyber-lime leading-relaxed uppercase">
            Data_Stream: Stable<br />
            Integrity: 99.8%<br />
            Sync_Time: 0.02ms
          </div>
        </div>
      </div>
    </div>
  )
}
