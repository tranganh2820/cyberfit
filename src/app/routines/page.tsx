import { ExerciseDatabase, SequenceDesigner, VolumePredictor } from '@/components/Routines'
import { getExercises, getRoutines } from '@/lib/actions'
import { exercises as mockExercises } from '@/data/mockData'

export default async function RoutinesPage() {
  const [dbExercises, savedRoutines] = await Promise.all([
    getExercises(),
    getRoutines()
  ])

  const displayExercises = dbExercises.length > 0 ? dbExercises : mockExercises

  return (
    <main className="p-8 h-[calc(100vh-64px)] overflow-hidden flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Exercise Database Sidebar */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <ExerciseDatabase items={displayExercises} />
        </div>

        {/* Main Sequence Designer */}
        <div className="lg:col-span-6 h-full overflow-y-auto pr-2 custom-scrollbar">
          <SequenceDesigner savedRoutines={savedRoutines} />
        </div>

        {/* Volume Predictor Sidebar */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <VolumePredictor />
        </div>
      </div>
    </main>
  )
}
