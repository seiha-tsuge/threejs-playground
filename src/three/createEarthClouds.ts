import * as THREE from 'three/webgpu'
import {
  color,
  mx_noise_float,
  positionLocal,
  smoothstep,
  vec3,
} from 'three/tsl'

const CLOUD_RADIUS_SCALE = 1.02
const CLOUD_COLOR = 0xf5fbff
const CLOUD_OPACITY = 0.52
const CLOUD_BASE_SCALE = 3.2
const CLOUD_DETAIL_SCALE = 9
const CLOUD_DETAIL_OFFSET = vec3(7.1, 2.8, 5.4)

export type EarthCloudMesh = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardNodeMaterial
>

/** 地球表面から少し離した、静的な半透明の雲レイヤーを生成する。 */
export function createEarthClouds(earthRadius: number): EarthCloudMesh {
  const cloudRadius = earthRadius * CLOUD_RADIUS_SCALE
  const material = new THREE.MeshStandardNodeMaterial({
    color: CLOUD_COLOR,
    roughness: 0.92,
    metalness: 0,
    transparent: true,
    depthWrite: false,
  })
  const normalizedPosition = positionLocal.div(cloudRadius)
  const baseClouds = mx_noise_float(
    normalizedPosition.mul(CLOUD_BASE_SCALE),
    0.5,
    0.5,
  )
  const detailClouds = mx_noise_float(
    normalizedPosition.mul(CLOUD_DETAIL_SCALE).add(CLOUD_DETAIL_OFFSET),
    0.5,
    0.5,
  )
  const cloudDensity = baseClouds.add(detailClouds.sub(0.5).mul(0.35))

  material.name = 'earth-clouds'
  material.colorNode = color(CLOUD_COLOR)
  material.opacityNode = smoothstep(0.5, 0.63, cloudDensity).mul(
    CLOUD_OPACITY,
  )

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(cloudRadius, 64, 32),
    material,
  )
  clouds.name = 'earth-clouds'
  clouds.userData.bodyId = 'earth-clouds'
  clouds.userData.radius = cloudRadius
  // 地表との半径差で分離し、透明面が地表の深度を書き換えないようにする。
  clouds.renderOrder = 1
  return clouds
}
