const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push("sql")
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const result = context.resolveRequest(context, moduleName, platform)
  if (result.type === "sourceFile") {
    const lastDotIndex = result.filePath.lastIndexOf(".")
    const mobilePath = `${result.filePath.slice(0, lastDotIndex)}.mobile${result.filePath.slice(lastDotIndex)}`
    const file = context.fileSystemLookup(mobilePath)
    if (file.exists) {
      return {
        ...result,
        filePath: mobilePath,
      }
    } else {
      return result
    }
  }
  return result
}

module.exports = config
