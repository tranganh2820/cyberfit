'use client'

import { Search, Database, BarChart3, ChevronRight, Play, Trash2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { useState } from 'react'
import { logWorkoutSession, saveRoutine } from '@/lib/actions'

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
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
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
            <div className="text-[9px] font-jetbrains text-gray-300 px-3 mb-2 tracking-[0.3em]">[{cat}]</div>
            {items.filter(i => i.category === cat).map((item) => (
              <button 
                key={item.id}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-cyber-cyan/10 group transition-colors border border-transparent hover:border-cyber-cyan/30"
              >
                <span className="font-jetbrains text-[11px] text-gray-300 group-hover:text-white uppercase tracking-tighter">
                  {item.name}
                </span>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-cyber-cyan transition-colors" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SequenceDesigner({ savedRoutines }: { savedRoutines: any[] }) {
  const [activeSequence, setActiveSequence] = useState<any[]>([])
  const [routineName, setName] = useState('NEW_PROTOCOL')
  const [isPending, setIsPending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleStartRoutine = (routine: any) => {
    setActiveSequence(routine.exercises.map((ex: any) => ({
      exerciseName: ex.exerciseName,
      sets: ex.sets,
      reps: ex.reps,
      weight: ex.weight
    })))
    setName(routine.name)
  }

  const handleAddModule = () => {
    setActiveSequence([...activeSequence, { 
      exerciseName: 'NEURAL-STIM', 
      sets: 3, 
      reps: 10, 
      weight: 0 
    }])
  }

  const handleUpdate = (index: number, field: string, value: any) => {
    const updated = [...activeSequence]
    updated[index] = { ...updated[index], [field]: value }
    setActiveSequence(updated)
  }

  const handleCommit = async () => {
    if (activeSequence.length === 0) return
    setIsPending(true)
    try {
      await logWorkoutSession(activeSequence)
      setActiveSequence([])
      setName('NEW_PROTOCOL')
      alert('PROTOCOL_COMMITTED_SUCCESSFULLY')
    } catch (e) {
      alert('SYNC_FAILURE: ' + (e as Error).message)
    } finally {
      setIsPending(false)
    }
  }

  const handleSave = async () => {
    if (activeSequence.length === 0) return
    const name = prompt('ENTER_PROTOCOL_NAME:', routineName)
    if (!name) return
    
    setIsSaving(true)
    try {
      await saveRoutine(name, activeSequence)
      alert('PROTOCOL_SAVED_TO_DATABASE')
    } catch (e) {
      alert('SAVE_FAILURE: ' + (e as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden h-full">
      <div className="lg:col-span-8 h-full overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-8">
          {/* Saved Routines Selection */}
          {savedRoutines.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {savedRoutines.map(r => (
                <button 
                  key={r.id}
                  onClick={() => handleStartRoutine(r)}
                  className="border border-white/10 bg-white/5 p-4 text-left hover:border-cyber-cyan transition-colors group"
                >
                  <div className="text-[10px] font-jetbrains text-gray-300 mb-1">SAVED_PROTOCOL</div>
                  <div className="font-orbitron text-sm text-white">{r.name}</div>
                  <div className="text-[9px] font-jetbrains text-cyber-cyan mt-2 uppercase">{r.exercises.length} MODULES</div>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-sm z-10 py-2 border-b border-white/5">
            <div>
              <h2 className="font-orbitron text-xl text-white tracking-tighter uppercase">Tactical_Sequence_Designer</h2>
              <p className="text-[10px] font-jetbrains text-cyber-cyan tracking-[0.3em]">ID: {routineName}</p>
            </div>
            <div className="flex gap-4">
              {activeSequence.length > 0 && (
                <>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="border border-cyber-cyan text-cyber-cyan font-orbitron font-black text-[10px] px-6 py-2 tracking-widest hover:bg-cyber-cyan hover:text-black transition-all disabled:opacity-50"
                  >
                    {isSaving ? 'SAVING...' : 'SAVE_PROTOCOL'}
                  </button>
                  <button 
                    onClick={handleCommit}
                    disabled={isPending}
                    className="bg-cyber-cyan text-black font-orbitron font-black text-[10px] px-6 py-2 tracking-widest hover:bg-white transition-all disabled:opacity-50"
                  >
                    {isPending ? 'COMMITTING...' : 'EXECUTE_SEQUENCE'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {activeSequence.map((step, i) => (
              <div key={i} className="border border-white/10 bg-white/5 p-6 glassmorphism relative group">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-cyber-charcoal border border-white/10 flex items-center justify-center font-jetbrains text-[10px] text-cyber-cyan">
                  {i + 1}
                </div>
                
                <div className="flex justify-between items-start mb-6">
                  <input 
                    value={step.exerciseName}
                    onChange={(e) => handleUpdate(i, 'exerciseName', e.target.value)}
                    className="font-orbitron text-sm text-white tracking-widest ml-4 bg-transparent border-none focus:outline-none focus:ring-0 w-1/2"
                  />
                  <button 
                    onClick={() => setActiveSequence(activeSequence.filter((_, idx) => idx !== i))}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 ml-4">
                  <div>
                    <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-2 italic">_SETS</label>
                    <input 
                      type="number" 
                      value={step.sets} 
                      onChange={(e) => handleUpdate(i, 'sets', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" 
                    />
                  </div>
                  <div>
                    <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-2 italic">_REPS</label>
                    <input 
                      type="number" 
                      value={step.reps} 
                      onChange={(e) => handleUpdate(i, 'reps', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" 
                    />
                  </div>
                  <div>
                    <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-2 italic">_LOAD_KG</label>
                    <input 
                      type="number" 
                      value={step.weight} 
                      onChange={(e) => handleUpdate(i, 'weight', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-white/10 py-1 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" 
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={handleAddModule}
              className="w-full border-2 border-dashed border-white/5 py-8 text-gray-300 font-jetbrains text-[10px] tracking-[0.4em] uppercase hover:border-cyber-cyan/30 hover:text-cyber-cyan transition-all"
            >
              + DROP_NEW_EXERCISE_MODULE
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 h-full overflow-hidden">
        <VolumePredictor activeSequence={activeSequence} />
      </div>
    </div>
  )
}

export function VolumePredictor({ activeSequence }: { activeSequence: any[] }) {
  const totalVolume = activeSequence.reduce((acc, ex) => acc + (ex.weight * ex.reps * ex.sets), 0)
  const duration = activeSequence.length * 12 // rough estimate 12 mins per exercise module

  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <div className="flex items-center gap-2 mb-8">
        <BarChart3 size={18} className="text-cyber-lime" />
        <h2 className="font-orbitron text-sm uppercase tracking-widest text-white">Volume_Predictor</h2>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-[10px] font-jetbrains uppercase mb-2">
            <span className="text-gray-300">Total_Load_Volume</span>
            <span className="text-cyber-cyan">{totalVolume.toLocaleString()} kg</span>
          </div>
          <div className="h-1 bg-white/5 relative">
            <div 
              className="absolute inset-y-0 left-0 bg-cyber-cyan transition-all duration-500 shadow-[0_0_10px_rgba(0,245,255,0.5)]" 
              style={{ width: `${Math.min((totalVolume / 10000) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-jetbrains uppercase mb-2">
            <span className="text-gray-300">Fatigue_Projection</span>
            <span className="text-cyber-purple">{totalVolume > 5000 ? 'HIGH' : totalVolume > 2000 ? 'MEDIUM' : 'LOW'}</span>
          </div>
          <div className="h-24 flex items-end gap-1 mt-4">
             {activeSequence.map((ex, i) => {
               const vol = ex.weight * ex.reps * ex.sets
               const height = Math.min((vol / 3000) * 100, 100)
               return (
                 <div 
                   key={i} 
                   className="flex-1 bg-cyber-purple/20 border-t border-cyber-purple/50 transition-all duration-500"
                   style={{ height: `${height}%` }}
                 />
               )
             })}
             {activeSequence.length === 0 && (
               <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-700 uppercase tracking-widest italic">
                 Waiting_For_Modules...
               </div>
             )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-jetbrains">
            <span className="text-gray-300">PRIMARY_STIMULUS:</span>
            <span className="text-cyber-lime uppercase">
              {activeSequence.length > 0 ? (totalVolume / activeSequence.length > 500 ? 'STRENGTH' : 'HYPERTROPHY') : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-jetbrains">
            <span className="text-gray-300">EST_DURATION:</span>
            <span className="text-white">{duration}:00 MIN</span>
          </div>
        </div>
      </div>

      <button className="w-full mt-12 border border-white/10 text-gray-400 font-jetbrains text-[10px] py-4 uppercase tracking-[0.2em] disabled:opacity-30">
        <span className="font-orbitron text-xs tracking-[0.2em] uppercase font-black opacity-30">Predictor_Active</span>
      </button>
    </div>
  )
}
