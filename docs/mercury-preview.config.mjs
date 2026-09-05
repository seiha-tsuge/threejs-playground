import { fileURLToPath } from 'node:url'

// 撮影用 HTML を直接配信する（Cloudflare の HTML URL 正規化を適用しない）。
export default {
  root: fileURLToPath(new URL('..', import.meta.url)),
  server: { host: '127.0.0.1', port: 5174 },
}
