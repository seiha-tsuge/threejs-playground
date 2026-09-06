import * as THREE from 'three/webgpu'
import { color, mix, mx_noise_float, positionLocal, smoothstep } from 'three/tsl'
import { DISPLAY_DISTANCE_SCALE } from './displayScale'
import type { PlanetData } from './planetCatalog'

/** 球面上の3Dノイズを使い、経度の継ぎ目がない静的な模様を作る。 */
export function createPlanetMaterial(planet: PlanetData): THREE.MeshPhysicalNodeMaterial {
  const material = new THREE.MeshPhysicalNodeMaterial({
    roughness: 0.9,
    metalness: 0,
    specularIntensity: 0.02,
  })
  material.name = `${planet.id}-surface`
  const p = positionLocal.div(planet.displayRadius)
  const latitude = p.y.abs()
  const terrain = mx_noise_float(p.mul(3.2), 0.5, 0.5)
  const detail = mx_noise_float(p.mul(24), 0.5, 0.5)
  const turbulence = mx_noise_float(p.mul(7), 1, 0)
  const bands = p.y.mul(36).add(turbulence.mul(1.4)).sin().mul(0.5).add(0.5)
  let surface: THREE.Node<'vec3'> = color(planet.color).mul(1)

  switch (planet.id) {
    case 'venus': {
      const clouds = mx_noise_float(p.mul(4).add(turbulence.mul(0.3)), 0.5, 0.5)
      surface = mix(color(0xb99455), color(0xffedbc), clouds.mul(0.8).add(detail.mul(0.2)))
      break
    }
    case 'earth': {
      // 大陸は模式表現。海岸の細部と低緯度の乾燥帯、両極の氷を分ける。
      const elevation = terrain.add(detail.sub(0.5).mul(0.13))
      const landMask = smoothstep(0.51, 0.535, elevation)
      const desert = smoothstep(0.25, 0.4, latitude)
        .mul(smoothstep(0.65, 0.45, latitude))
        .mul(smoothstep(0.4, 0.65, terrain))
      const land = mix(color(0x38734a), color(0xc5ad70), desert)
      const ocean = mix(color(0x082d75), color(0x177eac), smoothstep(0.46, 0.53, elevation))
      const ice = smoothstep(0.91, 0.97, latitude.add(detail.sub(0.5).mul(0.06)))
      surface = mix(mix(ocean, land, landMask), color(0xeaf4f4), ice)
      material.roughnessNode = mix(0.45, 0.95, landMask.max(ice))
      break
    }
    case 'mars': {
      const ground = mix(color(0x633828), color(0xca7850), terrain.mul(0.8).add(detail.mul(0.2)))
      const ice = smoothstep(0.95, 0.982, latitude.add(detail.sub(0.5).mul(0.025)))
      surface = mix(ground, color(0xf1e4d3), ice)
      material.roughness = 0.97
      break
    }
    case 'jupiter': {
      const broadBands = p.y.mul(15).add(turbulence.mul(0.7)).sin().mul(0.5).add(0.5)
      surface = mix(color(0x9a5838), color(0xf2dfbd), smoothstep(0.2, 0.8, broadBands))
      surface = mix(surface, color(0xc39971), bands.mul(0.25).add(detail.mul(0.1)))
      break
    }
    case 'saturn':
      surface = mix(color(0xc3a46f), color(0xecd9ac), bands.mul(0.45).add(terrain.mul(0.55)))
      break
    case 'uranus':
      surface = mix(color(0x83c3ca), color(0xb5e2df), latitude.mul(0.3).add(terrain.mul(0.25)).add(0.25))
      break
    case 'neptune': {
      const cloudBands = smoothstep(0.86, 0.99, bands).mul(0.19)
      surface = mix(color(0x163baf), color(0x3269d0), terrain)
      surface = mix(surface, color(0x8aafe5), cloudBands)
      break
    }
    case 'mercury':
      // 水星は createMercury のクレーターマテリアルを使用する。
      break
  }

  // 表示用の露出補正。太陽の逆二乗減衰を補い、外惑星の模様も読めるようにする。
  // 照明方向による昼夜の陰影は維持する（水星の既存補正と同程度）。
  const orbitAU = planet.orbitRadius / DISPLAY_DISTANCE_SCALE
  material.colorNode = surface.mul(0.05 * orbitAU ** 2)
  return material
}
