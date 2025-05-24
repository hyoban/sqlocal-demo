import * as SQLite from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import * as schema from "./schema"
import migrations from "./drizzle/migrations"
import { migrate } from "drizzle-orm/expo-sqlite/migrator"

const expo = SQLite.openDatabaseSync("db.db")

export const db = drizzle(expo, { schema })

export function migrateDb(): Promise<void> {
  return migrate(db, migrations)
}
