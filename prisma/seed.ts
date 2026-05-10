import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('--- INITIALIZING CYBERFIT NEURAL SEED ---')

  // 1. Create Test Operatives
  const alpha = await prisma.user.upsert({
    where: { email: 'alpha@cyberfit.test' },
    update: {},
    create: {
      id: 'user_dev_alpha_001',
      email: 'alpha@cyberfit.test',
      role: 'OVERRIDE',
    },
  })

  const specter = await prisma.user.upsert({
    where: { email: 'specter@cyberfit.test' },
    update: {},
    create: {
      id: 'user_dev_specter_002',
      email: 'specter@cyberfit.test',
      role: 'ELITE',
    },
  })

  console.log(`✓ Operatives Registered: ${alpha.id}, ${specter.id}`)

  // 2. Create Workout Sessions for Alpha
  const session1 = await prisma.workoutSession.create({
    data: {
      userId: alpha.id,
      date: new Date(),
      totalVolume: 5200,
      fatigueLevel: 7,
      notes: 'Tactical leg optimization protocol.',
      exercises: {
        create: [
          { exerciseName: 'Neural-Squat', category: 'LOWER', sets: 4, reps: 10, weight: 120 },
          { exerciseName: 'Cyber-Deadlift', category: 'CORE', sets: 3, reps: 5, weight: 180 },
        ]
      }
    }
  })

  console.log(`✓ Session Initialized: ${session1.id}`)

  // 3. Create Nutrition Logs for Alpha
  await prisma.nutritionLog.create({
    data: {
      userId: alpha.id,
      date: new Date(),
      protein: 165,
      carbs: 210,
      fats: 72,
      totalCalories: 2150,
    }
  })

  console.log('✓ Biometric Fuel Logs Synced')
  console.log('--- SEED PROTOCOL COMPLETE ---')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
