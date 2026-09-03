import * as THREE from 'three/webgpu'

export function createPlanet(): THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
> {
  return new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 64, 32),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    }),
  )
}
