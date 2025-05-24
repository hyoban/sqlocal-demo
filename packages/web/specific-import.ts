import type { Plugin } from "vite"

type Platform = "electron" | "web" | "mobile"
export function createPlatformSpecificImportPlugin(platform: Platform): Plugin {
  return {
    name: "platform-specific-import",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!importer) {
        return null
      }

      const allowExts = [".js", ".jsx", ".ts", ".tsx"]
      const sharedExts: string[] = []

      if (!allowExts.some((ext) => importer.endsWith(ext))) return null

      if (importer.includes("node_modules")) return null
      const [path, query] = source.split("?")

      if (path.startsWith(".") || path.startsWith("/")) {
        let priorities: string[] = []
        switch (platform) {
          case "electron": {
            priorities = [
              ".electron.ts",
              ".electron.tsx",
              ".electron.js",
              ".electron.jsx",
              ...sharedExts,
              ...allowExts,
            ]

            break
          }
          case "web": {
            priorities = [
              ".web.ts",
              ".web.tsx",
              ".web.js",
              ".web.jsx",
              ...sharedExts,
              ...allowExts,
            ]

            break
          }

          case "mobile": {
            priorities = [
              ".mobile.ts",
              ".mobile.tsx",
              ".mobile.js",
              ".mobile.jsx",
              ...sharedExts,
              ...allowExts,
            ]

            break
          }

          // No default
        }

        for (const ext of priorities) {
          const resolvedPath = await this.resolve(
            `${path}${ext}${query ? `?${query}` : ""}`,
            importer,
            {
              skipSelf: true,
            },
          )

          if (resolvedPath) {
            return resolvedPath.id
          }
        }
      }

      return null
    },
  }
}
