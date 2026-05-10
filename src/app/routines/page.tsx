import { ExerciseDatabase, SequenceDesigner, VolumePredictor } from '@/components/Routines'
import { getExercises } from '@/lib/actions'
import { exercises as mockExercises } from '@/data/mockData'

export default async function RoutinesPage() {
  const dbExercises = await getExercises()
  const displayExercises = dbExercises.length > 0 ? dbExercises : mockExercises

  return (
    <main className="p-8 h-[calc(100vh-64px)] overflow-hidden flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Exercise Database Sidebar */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <ExerciseDatabase items={displayExercises} />
        </div>
...
        {/* Main Sequence Designer */}
        <div className="lg:col-span-6 h-full overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-sm z-10 py-2">
            <div>
              <h2 className="font-orbitron text-xl text-white tracking-tighter uppercase">Tactical_Sequence_Designer</h2>
              <p className="text-[10px] font-jetbrains text-cyber-cyan tracking-[0.3em]">ID: PROTOCOL_ALPHA_01</p>
            </div>
          </div>
          <SequenceDesigner />
        </div>

        {/* Volume Predictor Sidebar */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <VolumePredictor />
        </div>
      </div>
    </main>
  )
}
