import type { Config } from "drizzle-kit"

export default {
  schema: "./src/schema.ts",
  out: "./src/drizzle",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config
