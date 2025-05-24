import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { createPlatformSpecificImportPlugin } from "./specific-import"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "import-raw",
      transform(code, id) {
        if (id.endsWith(".sql")) {
          const json = JSON.stringify(code)
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029")

          return {
            code: `export default ${json}`,
          }
        }
      },
    },
    createPlatformSpecificImportPlugin("web"),
    react(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
          next()
        })
      },
    },
  ],
  optimizeDeps: {
    exclude: ["sqlocal"],
  },
})
