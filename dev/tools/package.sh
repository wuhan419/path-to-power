#!/usr/bin/env bash
# ============================================================================
# POTUS · tools/package.sh  —— 一键发布：自检 + 打包 dist/
#
# 作用：先跑 validate.js 做引擎/内容自检，全部通过后再把 dev/ 打包成可分发的
#       dist/。dist/index.html 双击即玩（file:// 协议、零依赖、零构建）。
#
# 用法（在项目任意目录均可，脚本自己定位）：
#   bash dev/tools/package.sh            # 自检 + 打包（推荐，一键发布）
#   bash dev/tools/package.sh --fast     # 跳过自检，只打包
#   bash dev/tools/package.sh --check    # 只自检，不打包
#   bash dev/tools/package.sh --help     # 看说明
#
# 安全边界（本脚本只会「写」/「删」dist/ 这一个目录，绝不碰其它任何路径）：
#   1) 删除前校验 DIST 必须严格等于「项目根/dist」，且非空串、非 /、非源码目录
#   2) rsync --delete 之前先确认 dev/ 源码完整（防止源意外为空把目标清空）
#   3) 全程使用脚本自算的绝对路径，不接受任何外部传入的删除目标
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"           # dev/
PROJ_ROOT="$(cd "$DEV_ROOT/.." && pwd)"            # 项目根
DIST="$PROJ_ROOT/dist"                             # 唯一可被本脚本删/写的目标
VALIDATE="$DEV_ROOT/tools/validate.js"

# ---------- 参数解析 ----------
MODE="all"
for arg in "$@"; do
  case "$arg" in
    --fast|--no-validate)   MODE="package" ;;
    --check|--validate-only) MODE="validate" ;;
    -h|--help)
      sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "✗ 未知参数：$arg（支持 --fast / --check / --help）" >&2; exit 2 ;;
  esac
done

# ---------- 安全护栏：DIST 必须是「项目根/dist」，才允许对它删/写 ----------
guard_dist() {
  if [ -z "$DIST" ] || [ "$DIST" = "/" ]; then
    echo "✗ DIST 解析异常（空或根目录），中止" >&2; exit 1
  fi
  if [ "$(dirname "$DIST")" != "$PROJ_ROOT" ] || [ "$(basename "$DIST")" != "dist" ]; then
    echo "✗ DIST 不是预期的「项目根/dist」：$DIST（PROJ_ROOT=$PROJ_ROOT），中止" >&2; exit 1
  fi
  if [ "$DIST" = "$DEV_ROOT" ] || [ "$DIST" = "$PROJ_ROOT" ]; then
    echo "✗ DIST 与源码/项目根重合，中止" >&2; exit 1
  fi
}

# ---------- 源完整性：dev/ 必须像个完整源码目录，才敢 rsync --delete ----------
guard_src() {
  local missing=0 f
  for f in index.html engine content assets; do
    if [ ! -e "$DEV_ROOT/$f" ]; then
      echo "✗ 源码缺少 dev/$f，中止（避免打包出残缺 dist）" >&2; missing=1
    fi
  done
  [ "$missing" = 0 ] || exit 1
}

run_validate() {
  if ! command -v node >/dev/null 2>&1; then
    echo "✗ 未找到 node，无法自检（如需跳过请用 --fast）" >&2; exit 1
  fi
  echo "▶ 自检：node tools/validate.js"
  node "$VALIDATE"
  echo "✓ 自检通过"
}

build_dist() {
  guard_dist
  guard_src
  echo "▶ 打包 $DEV_ROOT → $DIST"
  # 只对已通过护栏校验的 $DIST 动手
  if [ -d "$DIST" ]; then rm -rf -- "$DIST"; fi
  mkdir -p "$DIST"

  # 游戏本体 = index.html + engine/ + content/ + assets/；排除开发工具与文档
  rsync -a --delete \
    --exclude 'tools/' \
    --exclude 'docs/' \
    --exclude '.DS_Store' \
    --exclude '*.bak*' \
    --exclude 'node_modules/' \
    "$DEV_ROOT/" "$DIST/"

  # 玩家视角的简版 README
  cat > "$DIST/README.txt" <<'EOF'
权力之路 · 一个美国小伙的从政之路
================================

怎么玩：双击 index.html（无需安装任何东西，浏览器打开即玩）。

- 建议用 Chrome / Edge / Safari 桌面版
- 存档在浏览器本地（localStorage），可用操作栏 导出/导入 存档文件
- 内容包持续扩充中：引擎与内容分离，想加事件/时代不需要改引擎

开发者：源码与文档在 dev/ 与 docs/，改动后跑 dev/tools/package.sh 一键自检并重新生成本 dist/。
EOF

  # dist 完整性校验：关键文件都在
  local f
  for f in index.html engine/core.js engine/render.js content/01-config.js content/events/54-era-waves.js assets/events/general.jpg; do
    if [ ! -f "$DIST/$f" ]; then
      echo "✗ dist 缺少 $f" >&2; exit 1
    fi
  done

  echo "✓ dist 发布完成：$(find "$DIST" -type f | wc -l | tr -d ' ') 个文件"
  echo "  试玩：open $DIST/index.html"
}

case "$MODE" in
  validate) run_validate ;;
  package)  build_dist ;;
  all)      run_validate; echo; build_dist ;;
esac
