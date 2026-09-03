import * as THREE from 'three/webgpu'

export function createRenderer(container: HTMLElement): THREE.WebGPURenderer {
  const renderer = new THREE.WebGPURenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight, false)
  container.appendChild(renderer.domElement)
  return renderer
}
