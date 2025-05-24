import type { InferInsertModel } from "drizzle-orm"
import { notes } from "../schema"
import { db } from "../db"

export async function getNotes() {
  return await db.query.notes.findMany()
}

export async function createNote(note: InferInsertModel<typeof notes>) {
  await db.insert(notes).values(note)
}
