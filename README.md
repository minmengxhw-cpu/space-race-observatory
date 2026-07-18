# G2 科技树 · 中美科技对照台

中美（G2）科技实力与技术路线科普对照平台。

**在线：** https://minmengxhw-cpu.github.io/space-race-observatory/

## 赛道

| 路由 | 内容 |
|------|------|
| `#/` | 总览 · 科技树分层 |
| `#/ai` | **人工智能（核心）** 头部模型、算力栈、路线图 |
| `#/aerospace` | 航空航天 · SpaceX vs 中国 |
| `#/biopharma` | 生物医药 |
| `#/future` | 十五五未来产业 vs 美国政策工具箱 |

## 本地开发

```bash
cd web
npm install
npm run dev
```

## 数据文件（`web/public/data/`）

- `g2-hub.json` — 总览
- `ai.json` — 人工智能（重点维护）
- `seed.json` + `rockets.json` — 航空航天
- `biopharma.json` — 生物医药
- `future.json` — 十五五产业

计划 **每周一** 巡检更新（见 `.github/workflows/weekly-data-check.yml`）。

## 技术栈

Vite · React · TypeScript · Tailwind · Recharts · Framer Motion
