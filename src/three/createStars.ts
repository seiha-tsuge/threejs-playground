import * as THREE from 'three/webgpu'

const STAR_COUNT = 4000
const MIN_STAR_RADIUS = 15
const MAX_STAR_RADIUS = 45

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
      MIN_STAR_RADIUS,
      MAX_STAR_RADIUS,
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
