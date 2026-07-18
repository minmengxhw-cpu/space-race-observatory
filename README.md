# Space Race Observatory · 航天对照台

中美航天（SpaceX / 美国 vs 中国）发射、回收、星座可视化项目。

## 在线访问

**https://minmengxhw-cpu.github.io/space-race-observatory/**

| 路径 | 说明 |
|------|------|
| `docs/PRD.md` | 产品需求文档 |
| `web/` | 前端应用（Vite + React） |
| `web/public/data/seed.json` | 可维护数据源 |

## 本地启动

```bash
cd web
npm install
npm run dev
```

## 更新数据

编辑 `web/public/data/seed.json` 后提交 `main`，GitHub Actions 会自动构建并发布到 Pages。

请同步更新 `updatedAt` 与 `sources`。

## 技术栈

Vite · React · TypeScript · Tailwind CSS · Recharts · Framer Motion
