import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { prepareStore, useNoteStore } from "store"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await prepareStore()
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <NotesContent />
    </View>
  )
}

function NotesContent() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <View>
      <Text>{JSON.stringify(notes, null, 2)}</Text>
      <Button
        title="Add Note"
        onPress={() => {
          useNoteStore.getState().addNote({ content: "New Note" })
        }}
      ></Button>
    </View>
  )
}
