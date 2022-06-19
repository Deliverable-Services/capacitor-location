import React from 'react'
import { useCapacitorLocation } from '@deliverable/capacitor-location'
import { Capacitor } from '@capacitor/core'

const App = () => {
  const { coords, removeLocationWatcher } = useCapacitorLocation({
    watchForBackgroundLocation: true,
    onError: (error) => {
      alert('Error: ' + error.message)
    }
  })
  return (
    <div>
      <h1>Hello I'm using Capacitor locatoin</h1>

      <h1>This is the {Capacitor.getPlatform()} location</h1>
      <pre>{JSON.stringify(coords)}</pre>

      <button onClick={removeLocationWatcher}>Remove location watcher</button>
    </div>
  )
}

export default App
