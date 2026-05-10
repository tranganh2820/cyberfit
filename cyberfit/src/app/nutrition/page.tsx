import { FuelHero, MacroLog, FuelScanner, NutrientHUD } from '@/components/Nutrition'

export default function NutritionPage() {
  return (
    <main className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Fuel Overview */}
      <FuelHero protein={145} carbs={210} fats={65} total="1,840" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Fuel Scanner Sidebar */}
        <div className="lg:col-span-3">
          <FuelScanner />
        </div>

        {/* Macro Log Main */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron text-sm text-white tracking-widest uppercase">Daily_Fuel_Log</h2>
            <span className="text-[10px] font-jetbrains text-gray-500 uppercase">Cycle: 2026.05.09</span>
          </div>
          <MacroLog />
        </div>

        {/* Nutrient HUD Sidebar */}
        <div className="lg:col-span-3">
          <NutrientHUD />
        </div>
      </div>
    </main>
  )
}
