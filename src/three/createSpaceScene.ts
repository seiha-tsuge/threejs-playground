import * as THREE from 'three/webgpu'
import { createControls } from './createControls'
import { createCamera, createScene } from './createScene'
import { createPlanet } from './createPlanet'
import { createRenderer } from './createRenderer'
import { createStars } from './createStars'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface SpaceScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGPURenderer
  controls: OrbitControls
  planet: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  stars: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
}

export function createSpaceScene(container: HTMLElement): SpaceScene {
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(container)
  const controls = createControls(camera, renderer.domElement)
  const planet = createPlanet()
  const stars = createStars()

  scene.add(planet, stars)

  return { scene, camera, renderer, controls, planet, stars }
}

export function disposeSpaceScene(
  spaceScene: SpaceScene,
  container: HTMLElement,
): void {
  spaceScene.renderer.setAnimationLoop(null)
  spaceScene.controls.dispose()
  spaceScene.planet.geometry.dispose()
  spaceScene.planet.material.dispose()
  spaceScene.stars.geometry.dispose()
  spaceScene.stars.material.dispose()
  spaceScene.renderer.dispose()

  if (spaceScene.renderer.domElement.parentNode === container) {
    container.removeChild(spaceScene.renderer.domElement)
  }
}
