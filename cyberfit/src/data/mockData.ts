export const dashboardMetrics = [
  { label: 'Active Minutes', value: '42', unit: 'MIN', trend: '+12%', color: 'cyan' },
  { label: 'Avg. Heart Rate', value: '72', unit: 'BPM', trend: '-2%', color: 'purple' },
  { label: 'Calories Burned', value: '1,240', unit: 'KCAL', trend: '+5%', color: 'lime' },
]

export const activityFeed = [
  { id: 1, user: 'Operative_X', action: 'completed Power Sequence', time: '2m ago', kudos: 12 },
  { id: 2, user: 'Neon_Racer', action: 'hit New 1RM: Deadlift', time: '15m ago', kudos: 45 },
  { id: 3, user: 'Ghost_Lift', action: 'initialized Morning Protocol', time: '1h ago', kudos: 8 },
]

export const macroStats = {
  protein: { current: 145, target: 180, color: '#BF00FF' },
  carbs: { current: 210, target: 250, color: '#00F5FF' },
  fats: { current: 65, target: 80, color: '#39FF14' },
}

export const leaderboardData = [
  { rank: 1, user: 'Elite_Prime', powerLevel: '9,840', change: 'static', avatar: 'EP' },
  { rank: 2, user: 'Neon_Specter', powerLevel: '9,720', change: 'up', avatar: 'NS' },
  { rank: 3, user: 'Cyber_Titan', powerLevel: '9,650', change: 'down', avatar: 'CT' },
  { rank: 1240, user: 'Operative_742', powerLevel: '4,210', change: 'up', avatar: 'O7', isUser: true },
]

export const exercises = [
  { id: 'ex1', name: 'Neural-Squat', category: 'LOWER', load: '140kg' },
  { id: 'ex2', name: 'Plasma-Press', category: 'UPPER', load: '100kg' },
  { id: 'ex3', name: 'Cyber-Deadlift', category: 'CORE', load: '180kg' },
  { id: 'ex4', name: 'Static-Hold', category: 'TACTICAL', load: 'Body' },
]

