#!/usr/bin/env bash
# ============================================================================
# POTUS · tools/package.sh
# 把 dev/ 打包成可分发的 dist/：
#   dist/index.html 双击即玩（file:// 协议、零依赖、零构建）
#   排除 tools/（校验器）、docs/、.DS_Store 等开发产物
# 用法：bash tools/package.sh   （在 dev/ 下或任意目录均可，脚本自己定位）
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"           # dev/
PROJ_ROOT="$(cd "$DEV_ROOT/.." && pwd)"            # 项目根
DIST="$PROJ_ROOT/dist"

echo "打包 $DEV_ROOT → $DIST"

rm -rf "$DIST"
mkdir -p "$DIST"

# rsync：排除开发工具与文档；游戏本体 = index.html + engine/ + content/ + assets/
rsync -a --delete \
  --exclude 'tools/' \
  --exclude 'docs/' \
  --exclude '.DS_Store' \
  --exclude '*.bak*' \
  --exclude 'node_modules/' \
  "$DEV_ROOT/" "$DIST/"

# 顺手拷一份 README（玩法说明），改写成玩家视角的简版
cat > "$DIST/README.txt" <<'EOF'
POTUS · 一个美国小伙的从政之路
================================

怎么玩：双击 index.html（无需安装任何东西，浏览器打开即玩）。

- 建议用 Chrome / Edge / Safari 桌面版
- 存档在浏览器本地（localStorage），可用顶部工具条 导出/导入 存档文件
- 内容包持续扩充中：引擎与内容分离，想加事件/时代不需要改引擎

开发者：源码与文档在 dev/ 与 docs/，改动后跑 dev/tools/validate.js 自检，
再跑 dev/tools/package.sh 重新生成本 dist/。
EOF

# 校验 dist 的完整性：关键文件都在
for f in index.html engine/core.js engine/render.js content/01-config.js content/events/54-era-waves.js assets/events/general.jpg; do
  if [ ! -f "$DIST/$f" ]; then
    echo "✗ dist 缺少 $f" >&2
    exit 1
  fi
done

echo "✓ dist 打包完成：$(find "$DIST" -type f | wc -l | tr -d ' ') 个文件"
echo "  玩法：open $DIST/index.html"
