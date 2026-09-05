import * as THREE from 'three/webgpu'
import type { PlanetData } from './planetCatalog'
import { createMercury } from './createMercury'
import { createPlanetMaterial } from './createPlanetMaterial'

export function createPlanet(planet: PlanetData): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardNodeMaterial
> {
  if (planet.id === 'mercury') return createMercury(planet)

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(planet.displayRadius, 64, 32),
    createPlanetMaterial(planet),
  )
  mesh.name = `${planet.id}-planet`
  mesh.userData.planetId = planet.id
  return mesh
}
