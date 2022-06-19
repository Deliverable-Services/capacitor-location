import React from 'react'
import {
  Location as CapacitorLocation,
  useCapacitorLocation
} from '@deliverable/capacitor-location'

const App = () => {
  const { coords } = useCapacitorLocation()
  return (
    <div>
      <h1>Hello I'm using Capacitor locatoin</h1>
      <CapacitorLocation />

      <h1>This is the web location</h1>
      <pre>{JSON.stringify(coords)}</pre>
    </div>
  )
}

export default App
