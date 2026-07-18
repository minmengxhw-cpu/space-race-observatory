# G2 · 中美前沿科技每日对照

按 [PRD V0.1](docs/PRD-v0.1-中美前沿科技对比站.md) 实现的**每日对照**静态站（站名 **G2**）。

**在线：** https://minmengxhw-cpu.github.io/space-race-observatory/

## 产品

- **L1 每日动态（首页最前）**：过去约24小时可核实大事，中美两栏对照；事实 + 意义 + 来源
- **L2 指标看板**：领域页双向条形图
- **L3 里程碑 / 一周观察**：放在领域页**最后**，标注为观察
- 手机 + 桌面均为科技馆大色块；按日翻页 + 归档
- 每天 **06:00** 本机脚本巡检 + 飞书通知（`scripts/morning-update.sh`）

## 数据（真相源）

```
web/public/data/
  site.json
  daily/YYYY-MM-DD.json
  daily/index.json          # dates + latest
  metrics/{ai,aerospace,biopharma,future}.json
  milestones.json
```

### 每日更新（V0 手动）

1. 新建 `daily/YYYY-MM-DD.json`（可参考 `prompts/daily-l1.md`）
2. 把日期写入 `daily/index.json` 的 `dates` 与 `latest`
3. 提交 `main` → Pages 自动部署

### V1 目标

GitHub Actions 每日 07:00（北京）自动生成 L1 JSON（见 PRD §7）。

## 本地

```bash
cd web && npm install && npm run dev
```

## 开放问题默认

| 项 | 默认 |
|----|------|
| 站名 | 双轨 |
| 受众 | 可公开、措辞中立 |
| 托管 | GitHub Pages（可迁 Cloudflare） |
| 审核 | V0 手动 |
| 未来产业 | 机器人 / 量子 / 聚变 |
