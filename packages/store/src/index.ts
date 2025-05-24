import { createNote, getNotes } from "database/service/notes.ts"
import { migrateDb } from "database"
import { create } from "zustand"

export type Note = {
  content: string
}

export type NoteStore = {
  notes: Note[]
  addNote: (note: Note) => void
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: async (note) => {
    set((state) => ({ notes: [...state.notes, note] }))
    await createNote(note)
  },
}))

async function hydrateNotesStore() {
  const notes = await getNotes()
  useNoteStore.setState({
    notes: notes.map((note) => ({ content: note.content })),
  })
}

export async function prepareStore() {
  await migrateDb()
  await hydrateNotesStore()
}
