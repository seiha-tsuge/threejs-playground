import * as THREE from 'three/webgpu'

export function createRenderer(container: HTMLElement): THREE.WebGPURenderer {
  const renderer = new THREE.WebGPURenderer({ antialias: true })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight, false)
  container.appendChild(renderer.domElement)
  return renderer
}
