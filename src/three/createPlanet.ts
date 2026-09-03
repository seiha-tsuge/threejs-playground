import * as THREE from 'three/webgpu'
import type { PlanetData } from './planetCatalog'

export function createPlanet(planet: PlanetData): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
> {
  return new THREE.Mesh(
    new THREE.SphereGeometry(planet.displayRadius, 64, 32),
    new THREE.MeshBasicMaterial({
      color: planet.color,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    }),
  )
}
