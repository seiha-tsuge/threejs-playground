import * as THREE from 'three/webgpu'
import { DISPLAY_RADIUS_SCALE } from './displayScale'

const PLANET_RADIUS = 1.35

export function createPlanet(): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
> {
  return new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_RADIUS * DISPLAY_RADIUS_SCALE, 64, 32),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    }),
  )
}
