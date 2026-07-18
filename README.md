# Space Race Observatory · 航天对照台

中美航天（SpaceX / 美国 vs 中国）发射、回收、星座可视化项目。

| 路径 | 说明 |
|------|------|
| `docs/PRD.md` | 产品需求文档 |
| `web/` | 前端应用（Vite + React） |

## 启动

```bash
cd web
npm install
npm run dev
```

## 数据

前端读取 `web/public/data/seed.json`。修改 JSON 即可更新页面数字，无需改组件代码。
