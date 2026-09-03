import * as THREE from 'three/webgpu'
import { createControls } from './createControls'
import { createCamera, createScene } from './createScene'
import {
  createOrbitAnchors,
  getOrbitAnchor,
  type OrbitAnchors,
} from './createOrbitAnchors'
import { createPlanet } from './createPlanet'
import { createRenderer } from './createRenderer'
import { createStars } from './createStars'
import { PLANET_CATALOG } from './planetCatalog'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface SpaceScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGPURenderer
  controls: OrbitControls
  solarSystem: THREE.Group
  orbitAnchors: OrbitAnchors
  planet: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  stars: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
}

export function createSpaceScene(container: HTMLElement): SpaceScene {
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(container)
  const controls = createControls(camera, renderer.domElement)
  const solarSystem = new THREE.Group()
  const orbitAnchors = createOrbitAnchors()
  const planet = createPlanet(PLANET_CATALOG.earth)
  const stars = createStars()

  planet.position.x = PLANET_CATALOG.earth.orbitRadius
  getOrbitAnchor(orbitAnchors, PLANET_CATALOG.earth.id).add(planet)
  solarSystem.add(...Object.values(orbitAnchors))
  scene.add(solarSystem, stars)

  return {
    scene,
    camera,
    renderer,
    controls,
    solarSystem,
    orbitAnchors,
    planet,
    stars,
  }
}

export function disposeSpaceScene(
  spaceScene: SpaceScene,
  container: HTMLElement,
): void {
  spaceScene.renderer.setAnimationLoop(null)
  spaceScene.controls.dispose()
  disposeObjectResources(spaceScene.solarSystem)
  spaceScene.stars.geometry.dispose()
  spaceScene.stars.material.dispose()
  spaceScene.renderer.dispose()

  if (spaceScene.renderer.domElement.parentNode === container) {
    container.removeChild(spaceScene.renderer.domElement)
  }
}

function disposeObjectResources(root: THREE.Object3D): void {
  root.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
      object.geometry.dispose()
      disposeMaterial(object.material)
    }
  })
}

function disposeMaterial(
  material: THREE.Material | THREE.Material[],
): void {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose())
    return
  }

  material.dispose()
}
