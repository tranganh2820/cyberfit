'use client'

import { Search, Apple, Droplets, Trash2, Zap } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState, useEffect } from 'react'
import { logNutrition } from '@/lib/actions'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FuelHero({ protein, carbs, fats, total }: { protein: number, carbs: number, fats: number, total: string }) {
  return (
    <div className="border border-white/10 bg-cyber-charcoal/20 p-8 glassmorphism relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center">
        <div className="space-y-2">
          <div className="text-[10px] font-jetbrains text-gray-500 tracking-widest uppercase">_TOTAL_ENERGY</div>
          <div className="text-5xl font-bold font-orbitron text-white">{total}</div>
          <div className="text-[10px] font-jetbrains text-cyber-cyan uppercase">KCAL_INTAKE</div>
        </div>
        
        {[
          { label: 'PROTEIN', val: protein, target: 180, color: '#BF00FF' },
          { label: 'CARBS', val: carbs, target: 250, color: '#00F5FF' },
          { label: 'FATS', val: fats, target: 80, color: '#39FF14' },
        ].map((macro) => (
          <div key={macro.label} className="space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                <circle 
                  cx="48" cy="48" r="44" stroke={macro.color} strokeWidth="2" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - macro.val / macro.target)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold font-jetbrains text-white">{macro.val}g</span>
              </div>
            </div>
            <div className="text-[10px] font-jetbrains text-gray-400 uppercase tracking-widest">{macro.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MacroLog({ items }: { items: any[] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="border border-white/10 bg-black/40 glassmorphism overflow-hidden">
      <table className="w-full text-left font-jetbrains">
        <thead className="bg-white/5">
          <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/10">
            <th className="p-4">Time</th>
            <th className="p-4">Item</th>
            <th className="p-4 text-center">P</th>
            <th className="p-4 text-center">C</th>
            <th className="p-4 text-center">F</th>
            <th className="p-4 text-right">Kcal</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors border-b border-white/5">
              <td className="p-4 text-gray-500 text-xs">
                {mounted ? new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
              </td>
              <td className="p-4 text-white uppercase tracking-tighter">Energy_Log_{i+1}</td>
              <td className="p-4 text-center text-cyber-purple font-bold">{item.protein}</td>
              <td className="p-4 text-center text-cyber-cyan font-bold">{item.carbs}</td>
              <td className="p-4 text-center text-cyber-lime font-bold">{item.fats}</td>
              <td className="p-4 text-right font-bold">{item.totalCalories}</td>
              <td className="p-4 text-right text-gray-600 hover:text-red-500 cursor-pointer">
                <Trash2 size={14} className="ml-auto" />
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-600 text-xs uppercase tracking-widest italic">
                _NO_ENERGY_LOGS_FOUND_IN_CACHE
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export function FuelScanner() {
  const [isPending, setIsPending] = useState(false)

  const handleLog = async (item: any) => {
    setIsPending(true)
    try {
      await logNutrition({
        protein: item.p,
        carbs: item.c,
        fats: item.f,
        calories: item.kcal
      })
      alert('FUEL_COMMITTED_SUCCESSFULLY')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <div className="flex items-center gap-2 mb-6">
        <Zap size={16} className="text-cyber-cyan" />
        <h2 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-white">System_Scan</h2>
      </div>
      
      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="SEARCH_MACRO_DATABASE..."
          className="w-full bg-transparent border-b border-white/20 py-3 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan"
        />
        <div className="absolute right-0 bottom-3 text-[10px] font-jetbrains text-gray-600">_CMD</div>
      </div>

      <div className="space-y-4">
        {[
          { name: 'OATS_CRUDE', kcal: 380, p: 13, c: 68, f: 7 },
          { name: 'WHEY_ISO', kcal: 120, p: 25, c: 2, f: 1 },
          { name: 'EGGS_AV_06', kcal: 70, p: 6, c: 0.5, f: 5 },
        ].map((res) => (
          <div 
            key={res.name} 
            onClick={() => handleLog(res)}
            className="border border-white/5 p-3 hover:border-cyber-cyan/30 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-white font-bold uppercase">{res.name}</div>
              {isPending && <div className="animate-spin h-2 w-2 bg-cyber-cyan" />}
            </div>
            <div className="flex gap-4 text-[10px] font-jetbrains text-gray-500 group-hover:text-cyber-cyan transition-colors">
              <span>P:{res.p}</span>
              <span>C:{res.c}</span>
              <span>F:{res.f}</span>
              <span className="ml-auto text-white">{res.kcal} KCAL</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NutrientHUD() {
  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <h2 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-white mb-8">Nutrient_Telemetry</h2>
      
      <div className="space-y-12">
        <div className="relative h-48 flex items-center justify-center">
           <div className="absolute inset-0 border border-white/5 rounded-full" />
           <div className="absolute inset-4 border border-white/5 rounded-full" />
           <div className="absolute inset-8 border border-white/5 rounded-full" />
           <svg className="w-full h-full p-4 relative z-10 overflow-visible">
              <polygon 
                points="100,20 160,80 140,160 60,160 40,80" 
                fill="rgba(0, 245, 255, 0.1)" 
                stroke="#00F5FF" 
                strokeWidth="2" 
                className="animate-pulse"
              />
           </svg>
           <div className="absolute top-0 text-[8px] font-jetbrains text-gray-600 tracking-widest uppercase">Vit_A</div>
           <div className="absolute right-0 text-[8px] font-jetbrains text-gray-600 tracking-widest uppercase">Vit_B12</div>
           <div className="absolute bottom-0 text-[8px] font-jetbrains text-gray-600 tracking-widest uppercase">Zinc</div>
           <div className="absolute left-0 text-[8px] font-jetbrains text-gray-600 tracking-widest uppercase">Magnesium</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-[10px] font-jetbrains">
            <div className="flex items-center gap-2">
              <Droplets size={14} className="text-cyber-cyan" />
              <span className="text-gray-500 uppercase">Hydration_Level</span>
            </div>
            <span className="text-cyber-cyan">85%</span>
          </div>
          <div className="h-2 bg-white/5 relative overflow-hidden">
             <div className="absolute inset-y-0 left-0 bg-cyber-cyan w-[85%] shadow-[0_0_15px_rgba(0,245,255,0.5)]" />
          </div>
          <div className="text-[8px] font-jetbrains text-gray-700 uppercase tracking-[0.2em] text-right italic">
            _TARGET: 4.5L // REMAINING: 0.8L
          </div>
        </div>
      </div>
    </div>
  )
}
