# 航天对照台 · Space Race Observatory

科幻风中美航天成绩对照台：SpaceX / 美国 vs 中国 — 发射 · 回收 · 星座（过去 / 现在 / 未来）。

## 快速开始

```bash
cd web
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:5173`）。

## 构建

```bash
npm run build
npm run preview
```

## 更新数据

编辑 `public/data/seed.json`，刷新页面即可。字段说明见仓库 `docs/PRD.md`。

请同步更新：

- `updatedAt`
- `sources`
- 规划类数字务必保留 `planned: true` 与 `note`

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS v4
- Recharts
- Framer Motion

## 说明

数据为公开报道量级，存在口径差异，仅供科普展示。
