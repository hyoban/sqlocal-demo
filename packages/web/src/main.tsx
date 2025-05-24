import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { prepareStore } from "store"
import { App } from "./App.tsx"

prepareStore().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
