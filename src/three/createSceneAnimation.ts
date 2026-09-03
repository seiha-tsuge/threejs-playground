import type { SpaceScene } from './createSpaceScene'
import { DISPLAY_TIME_SCALE } from './displayScale'

const PLANET_ROTATION_SPEED = 0.002
const STARS_ROTATION_SPEED_Y = 0.00015
const STARS_ROTATION_SPEED_X = 0.00004

export function createSceneAnimation({
  scene,
  camera,
  renderer,
  controls,
  planet,
  stars,
}: SpaceScene): () => void {
  return () => {
    planet.rotation.y += PLANET_ROTATION_SPEED * DISPLAY_TIME_SCALE
    stars.rotation.y += STARS_ROTATION_SPEED_Y * DISPLAY_TIME_SCALE
    stars.rotation.x += STARS_ROTATION_SPEED_X * DISPLAY_TIME_SCALE
    controls.update()
    renderer.render(scene, camera)
  }
}
