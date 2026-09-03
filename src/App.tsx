import { useRef } from 'react'
import { useThreeScene } from './hooks/useThreeScene'
import './App.css'

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const error = useThreeScene(canvasContainerRef)

  return (
    <main className="app-shell">
      <div ref={canvasContainerRef} className="scene-container" aria-label="Three.jsの3Dシーン">
        {error && <p className="scene-error">{error}</p>}
      </div>
    </main>
  )
}

export default App
