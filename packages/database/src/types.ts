import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core/db"
import * as schema from "./schema"

export type DB =
  | BaseSQLiteDatabase<"async", any, typeof schema>
  | BaseSQLiteDatabase<"sync", any, typeof schema>
