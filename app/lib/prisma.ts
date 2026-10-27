import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to connect to the MySQL database.");
}

const connectionUrl = new URL(databaseUrl);

if (connectionUrl.protocol !== "mysql:") {
  throw new Error("DATABASE_URL must use the mysql:// protocol.");
}

const database = decodeURIComponent(connectionUrl.pathname.slice(1));

if (!database) {
  throw new Error("DATABASE_URL must include a database name.");
}

const adapter = new PrismaMariaDb({
  host: connectionUrl.hostname,
  port: Number(connectionUrl.port || 3306),
  user: decodeURIComponent(connectionUrl.username),
  password: decodeURIComponent(connectionUrl.password),
  database,
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
