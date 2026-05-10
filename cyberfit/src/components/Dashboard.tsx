import { Zap, Heart, Flame, Terminal, Plus, ThumbsUp } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface MetricCardProps {
  label: string
  value: string
  unit: string
  trend: string
  color: 'cyan' | 'lime' | 'purple'
}

export function MetricCard({ label, value, unit, trend, color }: MetricCardProps) {
  const colorMap = {
    cyan: 'border-cyber-cyan/30 text-cyber-cyan',
    lime: 'border-cyber-lime/30 text-cyber-lime',
    purple: 'border-cyber-purple/30 text-cyber-purple',
  }

  const iconMap = {
    cyan: Zap,
    lime: Flame,
    purple: Heart,
  }

  const Icon = iconMap[color]

  return (
    <div className={cn(
      "border bg-cyber-charcoal/20 p-6 glassmorphism transition-all duration-300 hover:bg-white/5",
      colorMap[color]
    )}>
      <div className="flex justify-between items-start mb-4">
        <Icon size={24} />
        <span className="font-jetbrains text-[10px] opacity-70 tracking-widest uppercase">{trend}</span>
      </div>
      <div>
        <h3 className="text-gray-400 font-jetbrains text-[10px] uppercase tracking-[0.2em] mb-1">{label}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold font-orbitron text-white">{value}</span>
          <span className="text-xs font-jetbrains opacity-50 uppercase">{unit}</span>
        </div>
      </div>
    </div>
  )
}

export function QuickLog() {
  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <div className="flex items-center gap-2 mb-6">
        <Terminal size={18} className="text-cyber-cyan" />
        <h2 className="font-orbitron text-sm uppercase tracking-widest text-white">Quick_Log // FS-01</h2>
      </div>
      
      <div className="space-y-6">
        <div className="group">
          <label className="block font-jetbrains text-[10px] text-gray-500 uppercase mb-2 group-focus-within:text-cyber-cyan transition-colors">
            _EXECUTE_EXERCISE
          </label>
          <input 
            type="text" 
            placeholder="Search Database..."
            className="w-full bg-transparent border-b border-white/20 py-2 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan transition-colors"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-jetbrains text-[10px] text-gray-500 uppercase mb-2">SETS</label>
            <input type="number" className="w-full bg-transparent border border-white/10 p-2 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
          </div>
          <div>
            <label className="block font-jetbrains text-[10px] text-gray-500 uppercase mb-2">REPS</label>
            <input type="number" className="w-full bg-transparent border border-white/10 p-2 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
          </div>
          <div>
            <label className="block font-jetbrains text-[10px] text-gray-500 uppercase mb-2">LOAD (KG)</label>
            <input type="number" className="w-full bg-transparent border border-white/10 p-2 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
          </div>
        </div>

        <button className="w-full border border-cyber-cyan/50 hover:bg-cyber-cyan hover:text-black transition-all duration-300 py-3 flex items-center justify-center gap-2 group">
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          <span className="font-jetbrains text-xs font-bold uppercase tracking-widest">Commit_Sequence</span>
        </button>
      </div>
    </div>
  )
}

export function SocialFeed({ items }: { items: any[] }) {
  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <h2 className="font-orbitron text-sm uppercase tracking-widest text-white mb-6">Cyber_Activity</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-l border-white/10 pl-4 py-2 hover:bg-white/5 transition-colors group">
            <div className="flex justify-between items-start mb-1">
              <span className="text-cyber-cyan font-bold text-xs uppercase">{item.user}</span>
              <span className="text-[10px] font-jetbrains text-gray-600">{item.time}</span>
            </div>
            <p className="text-gray-400 text-xs mb-3 italic">{item.action}</p>
            <button className="flex items-center gap-2 text-[10px] font-jetbrains text-cyber-purple/70 hover:text-cyber-purple transition-colors">
              <ThumbsUp size={12} />
              KUDOS: {item.kudos}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
