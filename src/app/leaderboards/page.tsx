import { RankHero, LeaderboardList, BiometricHUD } from '@/components/Leaderboards'
import { getLeaderboardData } from '@/lib/actions'
import { auth } from '@clerk/nextjs/server'

export default async function LeaderboardsPage() {
  const { userId } = await auth()
  const data = await getLeaderboardData()
  
  const userEntry = data.find(e => e.id === userId)
  const sanitizedData = data.map(entry => ({
    ...entry,
    isUser: entry.id === userId
  }))

  return (
    <main className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <RankHero rank={userEntry?.rank.toString() || 'N/A'} percentile="SYNCING..." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Rankings */}
          <div className="lg:col-span-2">
            <LeaderboardList items={sanitizedData} />
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
