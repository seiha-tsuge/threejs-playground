import * as THREE from 'three/webgpu'

interface SceneResizeOptions {
  container: HTMLElement
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGPURenderer
}

export function observeSceneResize({
  container,
  camera,
  renderer,
}: SceneResizeOptions): () => void {
  const resize = () => {
    const width = Math.max(container.clientWidth, 1)
    const height = Math.max(container.clientHeight, 1)

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  resize()

  return () => resizeObserver.disconnect()
}
