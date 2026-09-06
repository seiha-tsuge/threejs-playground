import * as THREE from 'three/webgpu'
import {
  cameraPosition,
  color,
  normalWorld,
  positionWorld,
  smoothstep,
} from 'three/tsl'

const ATMOSPHERE_RADIUS_SCALE = 1.035
const ATMOSPHERE_COLOR = 0x4da3ff
const ATMOSPHERE_OPACITY = 0.28
const ATMOSPHERE_RIM_START = 0.12
const ATMOSPHERE_RIM_END = 0.42

export type EarthAtmosphereMesh = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicNodeMaterial
>

/** 地球の輪郭だけに薄い青い光を重ねる背面シェルを生成する。 */
export function createEarthAtmosphere(earthRadius: number): EarthAtmosphereMesh {
  const atmosphereRadius = earthRadius * ATMOSPHERE_RADIUS_SCALE
  const material = new THREE.MeshBasicNodeMaterial({
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  })
  const viewDirection = cameraPosition.sub(positionWorld).normalize()
  const facing = normalWorld.dot(viewDirection).abs()
  const rim = smoothstep(
    ATMOSPHERE_RIM_START,
    ATMOSPHERE_RIM_END,
    facing.oneMinus(),
  )

  material.name = 'earth-atmosphere'
  material.colorNode = color(ATMOSPHERE_COLOR)
  material.opacityNode = rim.mul(ATMOSPHERE_OPACITY)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(atmosphereRadius, 64, 32),
    material,
  )
  atmosphere.name = 'earth-atmosphere'
  atmosphere.userData.bodyId = 'earth-atmosphere'
  atmosphere.userData.radius = atmosphereRadius
  // 地表と雲の深度を優先し、外周のシェルだけを後から重ねる。
  atmosphere.renderOrder = 2
  return atmosphere
}
