import * as THREE from 'three/webgpu'
import {
  color,
  mix,
  positionLocal,
  smoothstep,
  triNoise3D,
  uniform,
  vec3,
} from 'three/tsl'
import type { UniformNode } from 'three/webgpu'
import { DISPLAY_RADIUS_SCALE } from './displayScale'

const SUN_DISPLAY_RADIUS = 5 * DISPLAY_RADIUS_SCALE
const SUN_WIDTH_SEGMENTS = 64
const SUN_HEIGHT_SEGMENTS = 32
const SUN_DEEP_COLOR = 0x7c210f
const SUN_HOT_COLOR = 0xff8a1f
const SUN_BRIGHT_COLOR = 0xffe7a3
const SUN_EMISSIVE_INTENSITY = 1.8
const SUN_NOISE_SCALE = 0.8
const SUN_DETAIL_NOISE_SCALE = 2.2
const SUN_NOISE_SPEED = 0.12
const SUN_DETAIL_NOISE_SPEED = 0.08

export class SunMesh extends THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardNodeMaterial
> {
  private readonly elapsedTime: UniformNode<'float', number>

  constructor() {
    const elapsedTime = uniform(0).setName('sunElapsedTime')
    const material = new THREE.MeshStandardNodeMaterial({
      roughness: 0.75,
      metalness: 0,
    })
    const noise = createSunSurfaceNoise(elapsedTime)
    const surfaceColor = createSunSurfaceColor(noise)

    material.colorNode = surfaceColor
    material.emissiveNode = surfaceColor.mul(SUN_EMISSIVE_INTENSITY)

    super(
      new THREE.SphereGeometry(
        SUN_DISPLAY_RADIUS,
        SUN_WIDTH_SEGMENTS,
        SUN_HEIGHT_SEGMENTS,
      ),
      material,
    )

    this.elapsedTime = elapsedTime
    this.name = 'sun'
  }

  /** 太陽表面のアニメーション時間を表示上の経過秒だけ進める。 */
  advanceTime(deltaSeconds: number): void {
    this.elapsedTime.value += deltaSeconds
  }
}

/** 太陽系の中心に表示する、自己発光する太陽を生成する。 */
export function createSun(): SunMesh {
  return new SunMesh()
}

function createSunSurfaceNoise(elapsedTime: UniformNode<'float', number>) {
  const basePosition = positionLocal.mul(SUN_NOISE_SCALE)
  const detailPosition = positionLocal
    .mul(SUN_DETAIL_NOISE_SCALE)
    .add(vec3(11.3, 5.7, 3.1))
  const baseNoise = triNoise3D(basePosition, SUN_NOISE_SPEED, elapsedTime)
  const detailNoise = triNoise3D(
    detailPosition,
    SUN_DETAIL_NOISE_SPEED,
    elapsedTime,
  )

  return baseNoise.mul(0.75).add(detailNoise.mul(0.25)).clamp()
}

function createSunSurfaceColor(noise: ReturnType<typeof createSunSurfaceNoise>) {
  const hotRegions = smoothstep(0.18, 0.62, noise)
  const brightRegions = smoothstep(0.58, 0.92, noise)
  const deepToHot = mix(color(SUN_DEEP_COLOR), color(SUN_HOT_COLOR), hotRegions)

  return mix(deepToHot, color(SUN_BRIGHT_COLOR), brightRegions)
}
