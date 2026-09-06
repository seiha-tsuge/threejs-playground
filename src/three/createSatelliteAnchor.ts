import * as THREE from 'three/webgpu'

/** 地球を中心に衛星を配置するためのアンカーを生成する。 */
export function createSatelliteAnchor(orbitRadius: number): THREE.Group {
  const anchor = new THREE.Group()
  anchor.name = 'earth-satellite-anchor'
  anchor.userData.parentBodyId = 'earth'
  anchor.userData.orbitRadius = orbitRadius
  return anchor
}
