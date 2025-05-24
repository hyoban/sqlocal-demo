import { sqliteTable, int, text } from "drizzle-orm/sqlite-core"

export const notes = sqliteTable("notes", {
  id: int("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
})
