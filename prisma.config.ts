import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Sobrescreve variáveis já exportadas no shell (ex.: DIRECT_URL antigo do Supabase).
config({ override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
