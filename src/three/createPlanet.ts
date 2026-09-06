import * as THREE from 'three/webgpu'
import type { PlanetData } from './planetCatalog'
import { createEarthAtmosphere } from './createEarthAtmosphere'
import { createEarthClouds } from './createEarthClouds'
import { createMercury } from './createMercury'
import { createPlanetMaterial } from './createPlanetMaterial'

export function createPlanet(planet: PlanetData, sunLight: THREE.PointLight): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardNodeMaterial
> {
  if (planet.id === 'mercury') return createMercury(planet)

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(planet.displayRadius, 64, 32),
    createPlanetMaterial(planet, sunLight),
  )
  mesh.name = `${planet.id}-planet`
  mesh.userData.planetId = planet.id

  if (planet.id === 'earth') {
    mesh.add(createEarthClouds(planet.displayRadius))
    mesh.add(createEarthAtmosphere(planet.displayRadius))
  }

  return mesh
}
