#!/usr/bin/env bash
# 双轨 · 每天 06:00 数据巡检 + 飞书通知
# 由 LaunchAgent com.cheer.dualtrack.morning 调用

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATA="$ROOT/web/public/data/daily"
INDEX="$DATA/index.json"
LOG_DIR="$ROOT/scripts/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/morning-$(date +%Y%m%d).log"

exec >>"$LOG" 2>&1
echo "==== $(date '+%Y-%m-%d %H:%M:%S %z') morning-update ===="

TODAY=$(date +%Y-%m-%d)
SITE_URL="https://minmengxhw-cpu.github.io/space-race-observatory/"
USER_OPEN_ID="${G2_FEISHU_OPEN_ID:-${DUALTRACK_FEISHU_OPEN_ID:-ou_56c8fecf85c044d81c98b518eac470c0}}"
LARK="${LARK_CLI:-$HOME/.local/bin/lark-cli}"

# 1) 若无今日 JSON：从最近一天复制骨架，并标为待人工补全
if [[ ! -f "$DATA/$TODAY.json" ]]; then
  echo "No daily file for $TODAY — scaffolding from latest"
  LATEST=$(python3 - <<'PY'
import json, pathlib
p = pathlib.Path("'"$INDEX"'")
if p.exists():
    print(json.loads(p.read_text())["latest"])
else:
    print("")
PY
)
  if [[ -n "$LATEST" && -f "$DATA/$LATEST.json" ]]; then
    python3 - <<PY
import json
from pathlib import Path
src = Path("$DATA/$LATEST.json")
dst = Path("$DATA/$TODAY.json")
data = json.loads(src.read_text())
data["date"] = "$TODAY"
data["note"] = "自动骨架（自 $LATEST 复制）。请人工替换为「过去 24 小时」真实动态后提交。"
data["focus"] = []
# 清空具体事件，避免重复旧闻误导
data["items"] = []
dst.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("wrote", dst)
PY
  else
    cat >"$DATA/$TODAY.json" <<EOF
{
  "date": "$TODAY",
  "focus": [],
  "items": [],
  "note": "自动创建的空日文件，请补充 L1 动态。"
}
EOF
  fi

  # 更新 index.json
  python3 - <<PY
import json
from pathlib import Path
p = Path("$INDEX")
idx = json.loads(p.read_text()) if p.exists() else {"dates": [], "latest": ""}
if "$TODAY" not in idx["dates"]:
    idx["dates"] = ["$TODAY"] + [d for d in idx.get("dates", []) if d != "$TODAY"]
idx["latest"] = "$TODAY"
p.write_text(json.dumps(idx, ensure_ascii=False, indent=2) + "\n")
print("index updated", idx)
PY
else
  echo "Daily file exists: $DATA/$TODAY.json"
fi

# 2) 统计今日条目
SUMMARY=$(python3 - <<PY
import json
from pathlib import Path
p = Path("$DATA/$TODAY.json")
d = json.loads(p.read_text())
items = d.get("items", [])
cn = sum(1 for i in items if i.get("country")=="CN")
us = sum(1 for i in items if i.get("country")=="US")
focus = len(d.get("focus") or [])
titles = [i.get("title","") for i in items[:6]]
print(f"条目 {len(items)} 条（中{cn}/美{us}）· 焦点 {focus}")
for t in titles:
    print(f"· {t}")
if not items:
    print("（今日内容为空或待补全，请打开仓库编辑 daily JSON）")
PY
)

# 3) 可选：自动 git 提交（仅当有变更且设置了 DUALTRACK_AUTO_COMMIT=1）
if [[ "${DUALTRACK_AUTO_COMMIT:-0}" == "1" ]]; then
  cd "$ROOT"
  if ! git diff --quiet -- web/public/data/daily; then
    git add web/public/data/daily
    git -c user.email="dualtrack-bot@local" -c user.name="dualtrack-bot" \
      commit -m "chore(daily): scaffold $TODAY" || true
    git push origin main || echo "push failed (ok if offline)"
  fi
fi

# 4) 飞书通知
if [[ ! -x "$LARK" ]]; then
  echo "lark-cli not found at $LARK"
  exit 0
fi

MSG=$(cat <<EOF
**G2 · 早报已就绪**（$TODAY 06:00）

[打开今日对照]($SITE_URL)

$SUMMARY

规则：只收过去约24小时可核实大事（发布/发射/获批/融资/大会）。
若条目为空，请编辑 \`web/public/data/daily/$TODAY.json\` 后推送。
EOF
)

export LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1
export LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1

"$LARK" im +messages-send --as user --user-id "$USER_OPEN_ID" --markdown "$MSG" && echo "Feishu sent OK" || echo "Feishu send failed"

echo "==== done ===="
