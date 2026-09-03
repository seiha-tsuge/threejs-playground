import * as THREE from 'three/webgpu'
import { PLANETS, type PlanetId } from './planetCatalog'

/** 惑星IDから、その惑星の公転アンカーを参照するためのマップ。 */
export type OrbitAnchors = {
  readonly [id in PlanetId]: THREE.Group
}

/**
 * 太陽系ルート配下に置く、8惑星分の公転アンカーを生成する。
 *
 * アンカーは太陽系の中心を回転軸にし、惑星はアンカーの子として
 * 軌道半径の位置に配置する。これにより、アンカーの回転（公転）と
 * 惑星自身の回転を別々のObject3Dで制御できる。
 */
export function createOrbitAnchors(): OrbitAnchors {
  const anchors = {} as Record<PlanetId, THREE.Group>

  for (const planet of PLANETS) {
    const anchor = new THREE.Group()
    anchor.name = `${planet.id}-orbit-anchor`
    anchor.userData.planetId = planet.id
    anchor.userData.orbitRadius = planet.orbitRadius
    anchors[planet.id] = anchor
  }

  return anchors
}

/** 惑星IDに対応する公転アンカーを取得する。 */
export function getOrbitAnchor(
  anchors: OrbitAnchors,
  planetId: PlanetId,
): THREE.Group {
  return anchors[planetId]
}
