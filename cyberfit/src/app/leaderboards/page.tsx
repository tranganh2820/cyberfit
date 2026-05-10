import { RankHero, LeaderboardList, BiometricHUD } from '@/components/Leaderboards'
import { leaderboardData } from '@/data/mockData'

export default function LeaderboardsPage() {
  return (
    <main className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <RankHero rank="1,240" percentile="12%" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Rankings */}
          <div className="lg:col-span-2">
            <LeaderboardList items={leaderboardData} />
          </div>

          {/* Biometric Comparison */}
          <div className="lg:col-span-1">
            <BiometricHUD />
          </div>
        </div>
      </div>
    </main>
  )
}
