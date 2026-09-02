import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three/webgpu'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import './App.css'

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const container = canvasContainerRef.current

    if (!container) {
      return
    }

    let disposed = false
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020617)

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.set(0, 0.4, 5)

    const renderer = new THREE.WebGPURenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = 2.5
    controls.maxDistance = 12

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 64, 32),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      }),
    )
    scene.add(sphere)

    const starCount = 4000
    const starPositions = new Float32Array(starCount * 3)

    for (let index = 0; index < starCount; index += 1) {
      const radius = THREE.MathUtils.lerp(15, 45, Math.pow(Math.random(), 0.65))
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const sinPhi = Math.sin(phi)

      starPositions[index * 3] = radius * sinPhi * Math.cos(theta)
      starPositions[index * 3 + 1] = radius * Math.cos(phi)
      starPositions[index * 3 + 2] = radius * sinPhi * Math.sin(theta)
    }

    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3),
    )

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const render = () => {
      sphere.rotation.y += 0.002
      stars.rotation.y += 0.00015
      stars.rotation.x += 0.00004
      controls.update()
      renderer.render(scene, camera)
    }

    const initializeRenderer = async () => {
      try {
        await renderer.init()

        if (disposed) {
          renderer.dispose()
          return
        }

        renderer.setAnimationLoop(render)
      } catch (initializationError) {
        if (!disposed) {
          console.error(initializationError)
          setError('WebGPUの初期化に失敗しました。対応ブラウザで確認してください。')
        }
      }
    }

    void initializeRenderer()

    return () => {
      disposed = true
      resizeObserver.disconnect()
      renderer.setAnimationLoop(null)
      controls.dispose()
      sphere.geometry.dispose()
      sphere.material.dispose()
      stars.geometry.dispose()
      stars.material.dispose()
      renderer.dispose()

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <main className="app-shell">
      <div ref={canvasContainerRef} className="scene-container" aria-label="Three.jsの3Dシーン">
        {error && <p className="scene-error">{error}</p>}
      </div>
    </main>
  )
}

export default App
