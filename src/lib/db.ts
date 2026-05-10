import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const getPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // During Next.js build, this might be missing. 
    // We return a proxy or a dummy if we're in build mode, 
    // but for simplicity, we'll just allow it to be initialized lazily.
    console.warn("DATABASE_URL is not set. Database operations will fail if invoked.");
    return new PrismaClient(); // Fallback to default, Prisma will throw error on actual query
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

export const db = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
