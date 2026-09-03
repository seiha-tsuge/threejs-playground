import * as THREE from 'three/webgpu'
import { DISPLAY_RADIUS_SCALE } from './displayScale'

const SUN_DISPLAY_RADIUS = 5 * DISPLAY_RADIUS_SCALE
const SUN_WIDTH_SEGMENTS = 64
const SUN_HEIGHT_SEGMENTS = 32

/** 太陽系の中心に表示する、塗りつぶしの太陽を生成する。 */
export function createSun(): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
> {
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(
      SUN_DISPLAY_RADIUS,
      SUN_WIDTH_SEGMENTS,
      SUN_HEIGHT_SEGMENTS,
    ),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
  )

  sun.name = 'sun'
  return sun
}
