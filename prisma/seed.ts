import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const issueData: Prisma.IssueCreateInput[] = [];

export async function main() {
  for (const issue of issueData) {
    await prisma.issue.create({ data: issue });
  }
}

main();
