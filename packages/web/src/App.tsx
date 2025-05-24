import { useNoteStore } from "store"

export function App() {
  const notes = useNoteStore((state) => state.notes)

  return (
    <div>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      <button
        onClick={() => {
          useNoteStore.getState().addNote({
            content: "New note",
          })
        }}
      >
        add
      </button>
    </div>
  )
}
