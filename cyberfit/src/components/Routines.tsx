import { Search, Database, BarChart3, ChevronRight, Play, Trash2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ExerciseDatabase({ items }: { items: any[] }) {
  return (
    <div className="border border-white/10 bg-black/40 h-full glassmorphism flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Database size={16} className="text-cyber-cyan" />
          <h2 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-white">Exercise_Database</h2>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="FILTER_BY_TAG..."
            className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 font-jetbrains text-[10px] focus:outline-none focus:border-cyber-cyan transition-colors"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {['CORE', 'UPPER', 'LOWER', 'TACTICAL'].map((cat) => (
          <div key={cat} className="mb-4">
            <div className="text-[9px] font-jetbrains text-gray-600 px-3 mb-2 tracking-[0.3em]">[{cat}]</div>
            {items.filter(i => i.category === cat).map((item) => (
              <button 
                key={item.id}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-cyber-cyan/10 group transition-colors border border-transparent hover:border-cyber-cyan/30"
              >
                <span className="font-jetbrains text-[11px] text-gray-300 group-hover:text-white uppercase tracking-tighter">
                  {item.name}
                </span>
                <ChevronRight size={14} className="text-gray-700 group-hover:text-cyber-cyan transition-colors" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SequenceDesigner() {
  const sequence = [
    { id: 1, name: 'NEURAL-SQUAT', sets: 4, reps: 10, load: 140, rest: '90s' },
    { id: 2, name: 'PLASMA-PRESS', sets: 3, reps: 12, load: 100, rest: '60s' },
  ]

  return (
    <div className="space-y-4">
      {sequence.map((step, i) => (
        <div key={step.id} className="border border-white/10 bg-white/5 p-6 glassmorphism relative group">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-cyber-charcoal border border-white/10 flex items-center justify-center font-jetbrains text-[10px] text-cyber-cyan">
            {i + 1}
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-orbitron text-sm text-white tracking-widest ml-4">{step.name}</h3>
            <button className="text-gray-600 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 ml-4">
            <div>
              <label className="block font-jetbrains text-[9px] text-gray-500 uppercase mb-2 italic">_SETS</label>
              <input type="number" defaultValue={step.sets} className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
            </div>
            <div>
              <label className="block font-jetbrains text-[9px] text-gray-500 uppercase mb-2 italic">_REPS</label>
              <input type="number" defaultValue={step.reps} className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
            </div>
            <div>
              <label className="block font-jetbrains text-[9px] text-gray-500 uppercase mb-2 italic">_LOAD_KG</label>
              <input type="number" defaultValue={step.load} className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
            </div>
            <div>
              <label className="block font-jetbrains text-[9px] text-gray-500 uppercase mb-2 italic">_REST</label>
              <input type="text" defaultValue={step.rest} className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
            </div>
          </div>
        </div>
      ))}

      <button className="w-full border-2 border-dashed border-white/5 py-8 text-gray-600 font-jetbrains text-[10px] tracking-[0.4em] uppercase hover:border-cyber-cyan/30 hover:text-cyber-cyan transition-all">
        + DROP_NEW_EXERCISE_MODULE
      </button>
    </div>
  )
}

export function VolumePredictor() {
  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <div className="flex items-center gap-2 mb-8">
        <BarChart3 size={18} className="text-cyber-lime" />
        <h2 className="font-orbitron text-sm uppercase tracking-widest text-white">Volume_Predictor</h2>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-[10px] font-jetbrains uppercase mb-2">
            <span className="text-gray-500">Total_Load_Volume</span>
            <span className="text-cyber-cyan">8,420 kg</span>
          </div>
          <div className="h-1 bg-white/5 relative">
            <div className="absolute inset-y-0 left-0 bg-cyber-cyan w-3/4 shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-jetbrains uppercase mb-2">
            <span className="text-gray-500">Fatigue_Projection</span>
            <span className="text-cyber-purple">Medium</span>
          </div>
          <div className="h-24 flex items-end gap-1 mt-4">
             {[30, 45, 60, 40, 55, 80, 70, 90].map((h, i) => (
               <div 
                 key={i} 
                 className="flex-1 bg-cyber-purple/20 border-t border-cyber-purple/50"
                 style={{ height: `${h}%` }}
               />
             ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-jetbrains">
            <span className="text-gray-500">PRIMARY_STIMULUS:</span>
            <span className="text-cyber-lime uppercase">Hypertrophy</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-jetbrains">
            <span className="text-gray-500">EST_DURATION:</span>
            <span className="text-white">52:00 MIN</span>
          </div>
        </div>
      </div>

      <button className="w-full mt-12 bg-cyber-cyan text-black font-bold py-4 flex items-center justify-center gap-3 group">
        <Play size={18} className="fill-black group-hover:scale-110 transition-transform" />
        <span className="font-orbitron text-xs tracking-[0.2em] uppercase font-black">Initialize_Routine</span>
      </button>
    </div>
  )
}
