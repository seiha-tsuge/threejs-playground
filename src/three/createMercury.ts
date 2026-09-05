import * as THREE from 'three/webgpu'
import {
  color,
  mix,
  mx_noise_float,
  mx_worley_noise_float,
  positionLocal,
  smoothstep,
} from 'three/tsl'
import type { PlanetData } from './planetCatalog'

const MERCURY_BASE_COLOR = 0x8f8377
const MERCURY_LIGHT_COLOR = 0xb7aa9a
const MERCURY_DARK_COLOR = 0x5b5148
const MERCURY_CRATER_FLOOR_COLOR = 0x4a423b
const MERCURY_CRATER_RIM_COLOR = 0xc3b6a5
const MERCURY_ROUGHNESS = 0.96
// 太陽に近い軌道の強い照明でも、地表色とクレーターの明暗を残す。
const MERCURY_ALBEDO_SCALE = 0.008
const MERCURY_TERRAIN_SCALE = 2.8
const MERCURY_CRATER_SCALE = 9
const MERCURY_CRATER_JITTER = 0.82

/** カタログの水星データから、クレーター表面を持つ水星メッシュを生成する。 */
export function createMercury(
  planet: PlanetData,
): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardNodeMaterial> {
  const material = createMercuryMaterial(planet.displayRadius)
  const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(planet.displayRadius, 64, 32),
    material,
  )

  mercury.name = `${planet.id}-planet`
  mercury.userData.planetId = planet.id
  return mercury
}

function createMercuryMaterial(
  displayRadius: number,
): THREE.MeshStandardNodeMaterial {
  const material = new THREE.MeshPhysicalNodeMaterial({
    color: MERCURY_BASE_COLOR,
    roughness: MERCURY_ROUGHNESS,
    metalness: 0,
    specularIntensity: 0.02,
  })
  material.name = 'mercury-surface'

  const normalizedPosition = positionLocal.div(displayRadius)
  const terrainNoise = mx_noise_float(
    normalizedPosition.mul(MERCURY_TERRAIN_SCALE),
    0.5,
    0.5,
  )
  const terrainColor = mix(
    color(MERCURY_DARK_COLOR),
    color(MERCURY_LIGHT_COLOR),
    terrainNoise,
  )

  // 距離場を使って円形のクレーターを作り、内側を暗く外周を明るくする。
  const craterDistance = mx_worley_noise_float(
    normalizedPosition.mul(MERCURY_CRATER_SCALE),
    MERCURY_CRATER_JITTER,
  )
  const craterFloor = smoothstep(0.035, 0.13, craterDistance)
  const craterRim = smoothstep(0.1, 0.16, craterDistance).sub(
    smoothstep(0.16, 0.24, craterDistance),
  )
  const craterColor = mix(
    color(MERCURY_CRATER_FLOOR_COLOR),
    terrainColor,
    craterFloor,
  )

  material.colorNode = mix(
    craterColor,
    color(MERCURY_CRATER_RIM_COLOR),
    craterRim,
  ).mul(MERCURY_ALBEDO_SCALE)
  return material
}
