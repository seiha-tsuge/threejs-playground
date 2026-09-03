import * as THREE from 'three/webgpu'
import { DISPLAY_DISTANCE_SCALE } from './displayScale'

const SUN_LIGHT_COLOR = 0xfff4cf
const BASE_SUN_LIGHT_INTENSITY = 100
const SUN_LIGHT_DECAY = 2

/**
 * 太陽から惑星を照らすポイントライトを生成する。
 *
 * 光の強さは距離の表示スケールの二乗に比例させる。これにより、表示
 * スケールを変更しても、対応する距離での照度を保てる。減衰は物理的
 * な点光源に合わせて逆二乗（2）を使う。
 */
export function createSunLight(): THREE.PointLight {
  return new THREE.PointLight(
    SUN_LIGHT_COLOR,
    BASE_SUN_LIGHT_INTENSITY * DISPLAY_DISTANCE_SCALE ** 2,
    0,
    SUN_LIGHT_DECAY,
  )
}
