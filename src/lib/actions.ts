'use server'

import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function logWorkout(formData: {
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}) {
  const user = await currentUser()
  if (!user) throw new Error('Unauthorized')

  // Self-healing: Ensure user exists in DB
  await db.user.upsert({
    where: { id: user.id },
    update: { email: user.emailAddresses[0].emailAddress },
    create: { id: user.id, email: user.emailAddresses[0].emailAddress }
  })

  await db.workoutSession.create({
    data: {
      userId: user.id,
      exercises: {
        create: {
          exerciseName: formData.exerciseName,
          category: 'CORE',
          sets: formData.sets,
          reps: formData.reps,
          weight: formData.weight,
        }
      }
    }
  })

  revalidatePath('/')
}

export async function logNutrition(formData: {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}) {
  const user = await currentUser()
  if (!user) throw new Error('Unauthorized')

  // Self-healing: Ensure user exists in DB
  await db.user.upsert({
    where: { id: user.id },
    update: { email: user.emailAddresses[0].emailAddress },
    create: { id: user.id, email: user.emailAddresses[0].emailAddress }
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await db.nutritionLog.create({
    data: {
      userId: user.id,
      date: today,
      protein: formData.protein,
      carbs: formData.carbs,
      fats: formData.fats,
      totalCalories: formData.calories,
    }
  })

  revalidatePath('/')
}

export async function getDashboardData() {
  const userRecord = await currentUser()
  if (!userRecord) return null
  const userId = userRecord.id

  // Self-healing: Ensure user exists in DB
  const user = await db.user.upsert({
    where: { id: userId },
    update: { email: userRecord.emailAddresses[0].emailAddress },
    create: { id: userId, email: userRecord.emailAddresses[0].emailAddress }
  })

  const [workouts, nutrition] = await Promise.all([
    db.workoutSession.findMany({
      where: { userId },
      include: { exercises: true },
      orderBy: { date: 'desc' },
      take: 5
    }),
    db.nutritionLog.findMany({
      where: { 
        userId,
        date: { gte: new Date(new Date().setHours(0,0,0,0)) }
      }
    })
  ])

  // Calculate real metrics
  const totalVolume = workouts.reduce((acc, session) => 
    acc + session.exercises.reduce((sAcc, ex) => sAcc + (ex.weight * ex.reps * ex.sets), 0), 0
  )

  const currentMacros = nutrition.reduce((acc, log) => ({
    protein: acc.protein + log.protein,
    carbs: acc.carbs + log.carbs,
    fats: acc.fats + log.fats,
    calories: acc.calories + log.totalCalories
  }), { protein: 0, carbs: 0, fats: 0, calories: 0 })

  return {
    metrics: [
      { label: 'Total Volume', value: totalVolume.toLocaleString(), unit: 'KG', trend: 'LIVE', color: 'cyan' },
      { label: 'Workouts', value: workouts.length.toString(), unit: 'SESS', trend: 'ACTIVE', color: 'purple' },
      { label: 'Daily Fuel', value: currentMacros.calories.toString(), unit: 'KCAL', trend: 'SYNC', color: 'lime' },
    ],
    macros: {
      protein: { current: currentMacros.protein, target: 180, color: '#BF00FF' },
      carbs: { current: currentMacros.carbs, target: 250, color: '#00F5FF' },
      fats: { current: currentMacros.fats, target: 80, color: '#39FF14' },
    },
    activity: workouts.map(w => ({
      id: w.id,
      user: user?.email?.split('@')[0] || 'Operative',
      action: `completed ${w.exercises[0]?.exerciseName || 'Workout'}`,
      time: w.date.toISOString(),
      kudos: 0
    }))
  }
}

export async function getLeaderboardData() {
  const users = await db.user.findMany({
    include: {
      workouts: {
        include: { exercises: true }
      }
    }
  })

  const leaderboard = users.map(user => {
    const totalVolume = user.workouts.reduce((acc, session) => 
      acc + session.exercises.reduce((sAcc, ex) => sAcc + (ex.weight * ex.reps * ex.sets), 0), 0
    )
    
    return {
      rank: 0, // Will calculate below
      user: user.email?.split('@')[0] || 'Unknown',
      powerLevel: totalVolume.toLocaleString(),
      rawVolume: totalVolume,
      change: 'static' as const,
      avatar: (user.email || 'OP').substring(0, 2).toUpperCase(),
      id: user.id
    }
  })

  return leaderboard
    .sort((a, b) => b.rawVolume - a.rawVolume)
    .map((entry, index) => ({ ...entry, rank: index + 1 }))
}

export async function getNutritionData() {
  const userRecord = await currentUser()
  if (!userRecord) return null
  const userId = userRecord.id

  // Self-healing: Ensure user exists in DB
  await db.user.upsert({
    where: { id: userId },
    update: { email: userRecord.emailAddresses[0].emailAddress },
    create: { id: userId, email: userRecord.emailAddresses[0].emailAddress }
  })

  const logs = await db.nutritionLog.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30
  })

  return logs
}

export async function getExercises() {
  const exercises = await db.exerciseSet.findMany({
    distinct: ['exerciseName'],
    select: {
      exerciseName: true,
      category: true
    }
  })

  return exercises.map(e => ({
    id: e.exerciseName,
    name: e.exerciseName,
    category: e.category
  }))
}
