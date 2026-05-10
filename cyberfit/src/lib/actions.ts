'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function logWorkout(formData: {
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  await db.workoutSession.create({
    data: {
      userId,
      exercises: {
        create: {
          exerciseName: formData.exerciseName,
          category: 'CORE', // Defaulting for now, could be dynamic
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
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await db.nutritionLog.create({
    data: {
      userId,
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
  const { userId } = await auth()
  if (!userId) return null

  const [workouts, nutrition, user] = await Promise.all([
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
    }),
    db.user.findUnique({
      where: { id: userId }
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
      user: user?.email.split('@')[0] || 'Unknown',
      action: `completed ${w.exercises[0]?.exerciseName || 'Workout'}`,
      time: new Date(w.date).toLocaleTimeString(),
      kudos: 0
    }))
  }
}
