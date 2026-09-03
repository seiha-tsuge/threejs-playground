import * as THREE from 'three/webgpu'
import type { PlanetData } from './planetCatalog'

export function createPlanet(planet: PlanetData): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
> {
  return new THREE.Mesh(
    new THREE.SphereGeometry(planet.displayRadius, 64, 32),
    new THREE.MeshStandardMaterial({
      color: planet.color,
      roughness: 0.85,
    }),
  )
}
