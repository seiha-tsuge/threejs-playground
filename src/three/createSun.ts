import * as THREE from 'three/webgpu'
import { DISPLAY_RADIUS_SCALE } from './displayScale'

const SUN_DISPLAY_RADIUS = 5 * DISPLAY_RADIUS_SCALE
const SUN_WIDTH_SEGMENTS = 64
const SUN_HEIGHT_SEGMENTS = 32
const SUN_EMISSIVE_COLOR = 0xfbbf24
const SUN_EMISSIVE_INTENSITY = 2

/** 太陽系の中心に表示する、自己発光する太陽を生成する。 */
export function createSun(): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
> {
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(
      SUN_DISPLAY_RADIUS,
      SUN_WIDTH_SEGMENTS,
      SUN_HEIGHT_SEGMENTS,
    ),
    new THREE.MeshStandardMaterial({
      color: SUN_EMISSIVE_COLOR,
      emissive: SUN_EMISSIVE_COLOR,
      emissiveIntensity: SUN_EMISSIVE_INTENSITY,
    }),
  )

  sun.name = 'sun'
  return sun
}
