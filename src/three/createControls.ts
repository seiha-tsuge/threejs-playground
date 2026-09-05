import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three/webgpu'

export function createControls(
  camera: THREE.PerspectiveCamera,
  domElement: HTMLElement,
): OrbitControls {
  const controls = new OrbitControls(camera, domElement)
  controls.enableDamping = true
  controls.enablePan = true
  controls.minDistance = 0.12
  controls.maxDistance = 160
  return controls
}
