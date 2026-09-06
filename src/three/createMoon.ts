import * as THREE from 'three/webgpu'
import { DISPLAY_RADIUS_SCALE } from './displayScale'

/** 月の地球中心からの表示上の軌道半径。月の位置だけを調整したいときに変更する。 */
export const MOON_ORBIT_RADIUS = 0.35

const MOON_RADIUS_IN_EARTH_RADII = 0.273
const MOON_DISPLAY_RADIUS =
  MOON_RADIUS_IN_EARTH_RADII * DISPLAY_RADIUS_SCALE
const MOON_COLOR = 0x9ca3af

export type MoonMesh = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardNodeMaterial
>

/** 地球の衛星アンカー配下に置く、小さな月メッシュを生成する。 */
export function createMoon(): MoonMesh {
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(MOON_DISPLAY_RADIUS, 32, 16),
    new THREE.MeshStandardNodeMaterial({
      color: MOON_COLOR,
      roughness: 0.96,
      metalness: 0,
    }),
  )
  moon.name = 'moon'
  moon.userData.bodyId = 'moon'
  moon.userData.orbitRadius = MOON_ORBIT_RADIUS
  moon.position.x = MOON_ORBIT_RADIUS
  return moon
}
