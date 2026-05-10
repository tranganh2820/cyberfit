import { FuelHero, MacroLog, FuelScanner, NutrientHUD } from '@/components/Nutrition'
import { getDashboardData, getNutritionData } from '@/lib/actions'

export default async function NutritionPage() {
  const [data, logs] = await Promise.all([
    getDashboardData(),
    getNutritionData()
  ])

  if (!data) return null

  const totalCalories = data.macros.protein.current * 4 + data.macros.carbs.current * 4 + data.macros.fats.current * 9

  return (
    <main className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Fuel Overview */}
      <FuelHero 
        protein={data.macros.protein.current} 
        carbs={data.macros.carbs.current} 
        fats={data.macros.fats.current} 
        total={totalCalories.toLocaleString()} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Fuel Scanner Sidebar */}
        <div className="lg:col-span-3">
          <FuelScanner />
        </div>

        {/* Macro Log Main */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron text-sm text-white tracking-widest uppercase">Daily_Fuel_Log</h2>
            <span className="text-[10px] font-jetbrains text-gray-400 uppercase">Status: Active_Cycle</span>
          </div>
          <MacroLog items={logs || []} />
        </div>
...
        {/* Nutrient HUD Sidebar */}
        <div className="lg:col-span-3">
          <NutrientHUD />
        </div>
      </div>
    </main>
  )
}
