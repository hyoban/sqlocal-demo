import { drizzle } from "drizzle-orm/sqlite-proxy"
import { SQLocalDrizzle } from "sqlocal/drizzle"
import migrations from "./drizzle/migrations"
import { migrate } from "./migrator"
import * as schema from "./schema"

const { driver, batchDriver } = new SQLocalDrizzle("database.sqlite3")
export const db = drizzle(driver, batchDriver, { schema })

export function migrateDb() {
  return migrate(db, migrations)
}
