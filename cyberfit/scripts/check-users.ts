import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function check() {
  const users = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'asc' }
  })

  if (users.length === 0) {
    console.log('NO_USERS_FOUND: Please sign up at /sign-up first.')
  } else {
    console.log('OPERATIVES_FOUND:')
    users.forEach(u => console.log(`- ID: ${u.id} | Email: ${u.email}`))
  }
}

check()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
