/**
 * 物理値を画面上で見やすい Three.js のシーン単位へ変換するためのスケール。
 * 天体データや軌道を追加するときは、表示値をこのモジュールに集約する。
 */

/**
 * 距離の表示スケール。
 * 単位: Three.js のシーン単位 / 論理上の距離単位
 */
export const DISPLAY_DISTANCE_SCALE = 1

/**
 * 天体半径の表示スケール。
 * 単位: Three.js のシーン単位 / 論理上の半径単位
 */
export const DISPLAY_RADIUS_SCALE = 1

/**
 * 時間の表示スケール。公転速度などのアニメーションに適用する。
 * 単位: 表示上の経過秒 / 実時間の秒
 */
export const DISPLAY_TIME_SCALE = 1
