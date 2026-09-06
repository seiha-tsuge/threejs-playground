import {
  DISPLAY_DISTANCE_SCALE,
  DISPLAY_RADIUS_SCALE,
} from './displayScale'

/** 地球が画面上で一周する表示上の秒数。実際の惑星間の周期比は下で維持する。 */
const DISPLAY_EARTH_ORBIT_PERIOD_SECONDS = 20
const EARTH_ORBIT_SPEED = (Math.PI * 2) / DISPLAY_EARTH_ORBIT_PERIOD_SECONDS

/** 太陽系の8惑星を識別するためのID。 */
export type PlanetId =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'

/**
 * 画面表示に使う惑星データ。
 * 表示半径は地球半径を1とした値に DISPLAY_RADIUS_SCALE を適用し、
 * 軌道半径は天文単位を1とした値に DISPLAY_DISTANCE_SCALE を適用する。
 */
export interface PlanetData {
  readonly id: PlanetId
  readonly name: string
  readonly displayRadius: number
  readonly orbitRadius: number
  /** 表示上の経過秒あたりの公転角速度（ラジアン）。 */
  readonly orbitSpeed: number
  readonly color: number
}

export type PlanetCatalog = {
  readonly [id in PlanetId]: PlanetData & { readonly id: id }
}

/**
 * IDをキーにした惑星カタログ。
 * PlanetCatalog により、8惑星の不足・余分なID・IDとキーの不一致を型検査で検出する。
 */
export const PLANET_CATALOG = {
  mercury: {
    id: 'mercury',
    name: '水星',
    displayRadius: 0.383 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 0.387 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 0.2408467,
    color: 0x9ca3af,
  },
  venus: {
    id: 'venus',
    name: '金星',
    displayRadius: 0.949 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 0.723 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 0.6151973,
    color: 0xf59e0b,
  },
  earth: {
    id: 'earth',
    name: '地球',
    displayRadius: 1 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 1 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED,
    color: 0x3b82f6,
  },
  mars: {
    id: 'mars',
    name: '火星',
    displayRadius: 0.532 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 1.524 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 1.8808,
    color: 0xef4444,
  },
  jupiter: {
    id: 'jupiter',
    name: '木星',
    displayRadius: 11.21 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 5.203 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 11.862,
    color: 0xd97706,
  },
  saturn: {
    id: 'saturn',
    name: '土星',
    displayRadius: 9.45 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 9.537 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 29.457,
    color: 0xfacc15,
  },
  uranus: {
    id: 'uranus',
    name: '天王星',
    displayRadius: 4.01 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 19.191 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 84.017,
    color: 0x67e8f9,
  },
  neptune: {
    id: 'neptune',
    name: '海王星',
    displayRadius: 3.88 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 30.069 * DISPLAY_DISTANCE_SCALE,
    orbitSpeed: EARTH_ORBIT_SPEED / 164.8,
    color: 0x2563eb,
  },
} as const satisfies PlanetCatalog

/** 表示順に参照したい場合の、型付き惑星一覧。 */
export const PLANETS: readonly PlanetData[] = Object.values(PLANET_CATALOG)
