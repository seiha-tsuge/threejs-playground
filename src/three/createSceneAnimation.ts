import type { SpaceScene } from './createSpaceScene'
import { DISPLAY_TIME_SCALE } from './displayScale'

const STARS_ROTATION_SPEED_Y = 0.00015
const STARS_ROTATION_SPEED_X = 0.00004
const REFERENCE_FRAME_RATE = 60

const STARS_ROTATION_SPEED_Y_PER_SECOND =
  STARS_ROTATION_SPEED_Y * REFERENCE_FRAME_RATE
const STARS_ROTATION_SPEED_X_PER_SECOND =
  STARS_ROTATION_SPEED_X * REFERENCE_FRAME_RATE

export function createSceneAnimation({
  scene,
  camera,
  renderer,
  controls,
  stars,
}: SpaceScene): () => void {
  let previousTime: number | undefined

  return (time = performance.now()) => {
    const deltaSeconds =
      previousTime === undefined ? 1 / REFERENCE_FRAME_RATE : (time - previousTime) / 1000
    previousTime = time
    const elapsedDisplaySeconds = deltaSeconds * DISPLAY_TIME_SCALE

    stars.rotation.y +=
      STARS_ROTATION_SPEED_Y_PER_SECOND * elapsedDisplaySeconds
    stars.rotation.x +=
      STARS_ROTATION_SPEED_X_PER_SECOND * elapsedDisplaySeconds
    controls.update()
    renderer.render(scene, camera)
  }
}
