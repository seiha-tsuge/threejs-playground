import type { SpaceScene } from './createSpaceScene'

export function createSceneAnimation({
  scene,
  camera,
  renderer,
  controls,
  planet,
  stars,
}: SpaceScene): () => void {
  return () => {
    planet.rotation.y += 0.002
    stars.rotation.y += 0.00015
    stars.rotation.x += 0.00004
    controls.update()
    renderer.render(scene, camera)
  }
}
