import {
  DISPLAY_DISTANCE_SCALE,
  DISPLAY_RADIUS_SCALE,
} from './displayScale'

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
 * 半径は地球半径を1とした相対値、軌道半径は天文単位を1とした相対値。
 */
export interface PlanetData {
  readonly id: PlanetId
  readonly name: string
  readonly displayRadius: number
  readonly orbitRadius: number
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
    color: 0x9ca3af,
  },
  venus: {
    id: 'venus',
    name: '金星',
    displayRadius: 0.949 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 0.723 * DISPLAY_DISTANCE_SCALE,
    color: 0xf59e0b,
  },
  earth: {
    id: 'earth',
    name: '地球',
    displayRadius: 1 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 1 * DISPLAY_DISTANCE_SCALE,
    color: 0x3b82f6,
  },
  mars: {
    id: 'mars',
    name: '火星',
    displayRadius: 0.532 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 1.524 * DISPLAY_DISTANCE_SCALE,
    color: 0xef4444,
  },
  jupiter: {
    id: 'jupiter',
    name: '木星',
    displayRadius: 11.21 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 5.203 * DISPLAY_DISTANCE_SCALE,
    color: 0xd97706,
  },
  saturn: {
    id: 'saturn',
    name: '土星',
    displayRadius: 9.45 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 9.537 * DISPLAY_DISTANCE_SCALE,
    color: 0xfacc15,
  },
  uranus: {
    id: 'uranus',
    name: '天王星',
    displayRadius: 4.01 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 19.191 * DISPLAY_DISTANCE_SCALE,
    color: 0x67e8f9,
  },
  neptune: {
    id: 'neptune',
    name: '海王星',
    displayRadius: 3.88 * DISPLAY_RADIUS_SCALE,
    orbitRadius: 30.069 * DISPLAY_DISTANCE_SCALE,
    color: 0x2563eb,
  },
} as const satisfies PlanetCatalog

/** 表示順に参照したい場合の、型付き惑星一覧。 */
export const PLANETS: readonly PlanetData[] = Object.values(PLANET_CATALOG)
