import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logWorkout, getDashboardData } from '../actions'
import { db } from '../db'
import { auth } from '@clerk/nextjs/server'

describe('Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('logWorkout', () => {
    it('should create a workout session when authorized', async () => {
      const mockWorkoutData = {
        exerciseName: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 80
      }

      await logWorkout(mockWorkoutData)

      expect(db.workoutSession.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          userId: 'test-user-id',
          exercises: {
            create: expect.objectContaining({
              exerciseName: 'Bench Press',
              sets: 3,
              reps: 10,
              weight: 80
            })
          }
        })
      }))
    })

    it('should throw error when unauthorized', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ userId: null } as any)
      
      await expect(logWorkout({
        exerciseName: 'Squat',
        sets: 1,
        reps: 1,
        weight: 100
      })).rejects.toThrow('Unauthorized')
    })
  })

  describe('getDashboardData', () => {
    it('should return metrics and activity data', async () => {
      vi.mocked(db.workoutSession.findMany).mockResolvedValueOnce([
        {
          id: 'w1',
          userId: 'test-user-id',
          date: new Date(),
          exercises: [
            { weight: 100, reps: 5, sets: 5 }
          ]
        }
      ] as any)

      vi.mocked(db.nutritionLog.findMany).mockResolvedValueOnce([])
      vi.mocked(db.user.findUnique).mockResolvedValueOnce({ email: 'test@example.com' } as any)

      const result = await getDashboardData()

      expect(result).not.toBeNull()
      expect(result?.metrics).toContainEqual(expect.objectContaining({ label: 'Total Volume', value: '2,500' }))
      expect(result?.activity[0].action).toBe('completed Workout')
    })
  })
})
