import * as THREE from 'three/webgpu'
import { DISPLAY_DISTANCE_SCALE } from './displayScale'

const STAR_COUNT = 4000
const MIN_STAR_DISTANCE = 15 * DISPLAY_DISTANCE_SCALE
const MAX_STAR_DISTANCE = 45 * DISPLAY_DISTANCE_SCALE

export function createStars(): THREE.Points<
  THREE.BufferGeometry,
  THREE.PointsMaterial
> {
  const positions = createStarPositions()
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.11,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  })

  return new THREE.Points(geometry, material)
}

function createStarPositions(): Float32Array {
  const positions = new Float32Array(STAR_COUNT * 3)

  for (let index = 0; index < STAR_COUNT; index += 1) {
    const radius = THREE.MathUtils.lerp(
      MIN_STAR_DISTANCE,
      MAX_STAR_DISTANCE,
      Math.pow(Math.random(), 0.65),
    )
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const sinPhi = Math.sin(phi)

    positions[index * 3] = radius * sinPhi * Math.cos(theta)
    positions[index * 3 + 1] = radius * Math.cos(phi)
    positions[index * 3 + 2] = radius * sinPhi * Math.sin(theta)
  }

  return positions
}
