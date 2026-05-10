import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

// Mock @clerk/nextjs/server
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn().mockImplementation(async () => ({
    userId: 'test-user-id',
  })),
}))

// Mock Prisma
vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      upsert: vi.fn(),
    },
    workoutSession: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
    nutritionLog: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}))
