import { MetricCard, QuickLog, SocialFeed } from '@/components/Dashboard'
import { dashboardMetrics, activityFeed, macroStats } from '@/data/mockData'

export default function Dashboard() {
  return (
    <main className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardMetrics.map((metric) => (
          <MetricCard 
            key={metric.label}
            {...metric} 
            color={metric.color as any}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[500px]">
        {/* Workout Logger */}
        <div className="lg:col-span-1">
          <QuickLog />
        </div>

        {/* Social Feed */}
        <div className="lg:col-span-1">
          <SocialFeed items={activityFeed} />
        </div>

        {/* Nutrition Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
            <h2 className="font-orbitron text-sm uppercase tracking-widest text-white mb-6">Biometric_Fuel</h2>
            <div className="space-y-6">
              {Object.entries(macroStats).map(([key, stat]) => (
                <div key={key}>
                  <div className="flex justify-between text-[10px] font-jetbrains uppercase mb-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="text-white">{stat.current} / {stat.target}g</span>
                  </div>
                  <div className="h-1 bg-white/5 relative overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 transition-all duration-1000"
                      style={{ 
                        width: `${(stat.current / stat.target) * 100}%`,
                        backgroundColor: stat.color,
                        boxShadow: `0 0 10px ${stat.color}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Footer Overlay */}
      <div className="flex justify-between items-center text-[10px] font-jetbrains text-gray-700 uppercase tracking-widest pt-8 border-t border-white/5">
        <span>Region: Sector_7G</span>
        <span>Lat: 37.7749 // Long: -122.4194</span>
        <span>Local_Time: {new Date().toLocaleTimeString()}</span>
      </div>
    </main>
  )
}
