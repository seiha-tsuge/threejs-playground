import * as THREE from 'three/webgpu'

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x020617)
  return scene
}

export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(60, 1, 0.001, 400)
  camera.position.set(0, 0.4, 5)
  return camera
}
