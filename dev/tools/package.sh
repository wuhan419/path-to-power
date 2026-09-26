#!/usr/bin/env bash
# ============================================================================
# POTUS · tools/package.sh  —— 一键发布：自检 + 打包 dist/
#
# 作用：先跑 validate.js 做引擎/内容自检，全部通过后再把 dev/ 打包成可分发的
#       dist/。dist/index.html 双击即玩（file:// 协议、零依赖、零构建）。
#       最后把 dist/ 压成 itch.io 上传包（index.html 直接位于压缩包根目录，
#       不套一层文件夹 —— 勾上「This file will be played in the browser」才能生效）。
#
# 用法（在项目任意目录均可，脚本自己定位）：
#   bash dev/tools/package.sh            # 自检(快速·30局) + 打包 + 出 zip（推荐，日常发布）
#   bash dev/tools/package.sh --full     # 自检跑完整 300 局生涯模拟（发布大版本前深度验）
#   bash dev/tools/package.sh --fast     # 跳过自检，只打包
#   bash dev/tools/package.sh --check    # 只自检，不打包
#   bash dev/tools/package.sh --no-zip   # 只刷新 dist/，不出 itch.io 压缩包
#   bash dev/tools/package.sh --help     # 看说明
#
# 发布包版本号只影响压缩包文件名（path-to-power-<版本>.zip），发新版时改下面
# 参数解析之前的 VERSION 常量。
#
# 自检提速：validate.js 的结构校验（语法/引用/三值性/死局保护等）与模拟局数无关，
#           耗时主要来自「生涯模拟」；默认降到 30 局即可快速放行，需深验时用 --full。
#
# 安全边界（本脚本只会「写」/「删」dist/ 目录和项目根的那一个 zip 文件，绝不碰其它路径）：
#   1) 删除前校验 DIST 必须严格等于「项目根/dist」，且非空串、非 /、非源码目录
#   2) 整体复制 dev/ 之前先确认源码完整（防止源意外为空把目标清空）
#   3) 全程使用脚本自算的绝对路径，不接受任何外部传入的删除目标
#   4) zip 只删「脚本自己算出来的那一个文件名」，且文件名必须带 path-to-power- 前缀
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"           # dev/
PROJ_ROOT="$(cd "$DEV_ROOT/.." && pwd)"            # 项目根
DIST="$PROJ_ROOT/dist"                             # 唯一可被本脚本删/写的目标
VALIDATE="$DEV_ROOT/tools/validate.js"
VERSION="v0.12.1"                  # 发布包版本号：只影响压缩包文件名，发新版时改这里
ZIP="$PROJ_ROOT/path-to-power-$VERSION.zip"        # itch.io 上传包（项目根，不入库）

# 打包器：优先 Info-ZIP 的 zip（-r 自带目录条目），没有则用 python 逐条写入。
# 挑 python 时要求它真能跑：Windows 的 python3 可能是「Microsoft Store 转发桩」，
# 只会在被调用时弹商店，所以用 -c pass 实测过才算数。
PY=""
for _cand in python3 python; do
  if command -v "$_cand" >/dev/null 2>&1 && "$_cand" -c 'pass' >/dev/null 2>&1; then
    PY="$(command -v "$_cand")"; break
  fi
done
unset _cand

# ---------- 参数解析 ----------
MODE="all"
VGAMES="30"                      # 自检生涯模拟局数：默认 30（快速放行，日常默认走这档），--full 走 300
DO_ZIP=1
for arg in "$@"; do
  case "$arg" in
    --full)                       VGAMES="300" ;;
    --fast|--no-validate)   MODE="package" ;;
    --check|--validate-only) MODE="validate" ;;
    --no-zip)                       DO_ZIP=0 ;;
    -h|--help)
      sed -n '2,29p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "✗ 未知参数：$arg（支持 --full / --fast / --check / --no-zip / --help）" >&2; exit 2 ;;
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
  # 前置门禁：index.html 的内容清单归生成器托管。漏登记的文件不会报错，
  # 只会静默不加载 —— 所以硬性要求托管区与磁盘一致。
  echo "▶ 清单同步：node tools/gen-manifest.js --check"
  if ! node "$DEV_ROOT/tools/gen-manifest.js" --check; then
    echo "✗ dev/index.html 内容清单已过期，先跑：node dev/tools/gen-manifest.js" >&2; exit 1
  fi
  echo "▶ 自检：node tools/validate.js --games=$VGAMES"
  node "$VALIDATE" --games="$VGAMES"
  echo "✓ 自检通过"
}

build_dist() {
  guard_dist
  guard_src
  echo "▶ 打包 $DEV_ROOT → $DIST"
  # 只对已通过护栏校验的 $DIST 动手
  if [ -d "$DIST" ]; then rm -rf -- "$DIST"; fi
  mkdir -p "$DIST"

  # 游戏本体 = index.html + engine/ + content/ + assets/；排除开发工具与文档。
  # 不用 rsync：这台机器的 Git Bash 没装它（脚本因此在这台机器上从来没跑通过）。
  # 先整体复制、再从已过关护栏的 $DIST 里删掉非发布项——语义等价，且只依赖 cp/find。
  cp -a "$DEV_ROOT/." "$DIST/"
  rm -rf -- "$DIST/tools" "$DIST/docs" "$DIST/node_modules"
  find "$DIST" -name '.DS_Store' -delete 2>/dev/null || true
  find "$DIST" -name '*.bak*' -delete 2>/dev/null || true

  # 设计文档 docs/ 一并纳入 dist（GitHub Pages 只发布 dist/，文档要随包走）
  if [ -d "$PROJ_ROOT/docs" ]; then
    mkdir -p "$DIST/docs"
    cp -a "$PROJ_ROOT/docs/." "$DIST/docs/"
    find "$DIST/docs" -name '.DS_Store' -delete 2>/dev/null || true
    echo "  ✓ 已打包 docs/ → dist/docs/（$(find "$DIST/docs" -type f | wc -l | tr -d ' ') 个文件）"
  fi

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
  for f in index.html engine/core.js engine/view/shell.js engine/view/stage.js content/01-config.js content/events/54-era-waves.js assets/events/general.jpg; do
    if [ ! -f "$DIST/$f" ]; then
      echo "✗ dist 缺少 $f" >&2; exit 1
    fi
  done

  echo "✓ dist 发布完成：$(find "$DIST" -type f | wc -l | tr -d ' ') 个文件"
  echo "  试玩：open $DIST/index.html"

  if [ "$DO_ZIP" = 1 ]; then build_zip; fi
}

# ---------- itch.io 上传包 ----------
# itch.io 的「在浏览器中游玩」要求两件事，缺任何一条都是线上 404 白屏、本地双击却一切正常：
#   1) index.html 位于压缩包根目录 —— 解压出来直接是 index.html + engine/ + content/ +
#      assets/，不能套一层 dist/ 文件夹。
#   2) 归档里必须带**目录条目**（engine/、content/i18n/en/view/ 这些以 / 结尾的条目）。
#      Windows 自带的压缩（PowerShell Compress-Archive / 资源管理器「发送到 → 压缩文件夹」）
#      只写文件条目、一个目录条目都不写；itch 的解压器遇到"父目录还没建"的文件会静默跳过，
#      结果半站 js/css 404、engine/core.js 缺席 → 白屏 + "POTUS is not defined"（v0.12.1 实测）。
# 所以优先用 Info-ZIP 的 zip（-r 自带目录条目），没有就用 python 逐条写入并补目录条目。
# 两条打包路径共用同一份条目表校验 —— 结构问题只有在这里拦得住。
build_zip() {
  # 护栏：ZIP 必须是「项目根/path-to-power-*.zip」才允许删
  if [ "$(dirname "$ZIP")" != "$PROJ_ROOT" ] || [ "${ZIP#"$PROJ_ROOT/path-to-power-"}" = "$ZIP" ]; then
    echo "✗ ZIP 路径异常：$ZIP，中止" >&2; exit 1
  fi
  rm -f -- "$ZIP"                       # zip 是追加语义，旧包不清掉会越打越大
  echo "▶ 打 itch.io 包：$ZIP"
  if command -v zip >/dev/null 2>&1; then
    ( cd "$DIST" && zip -q -r -X "$ZIP" . )
  elif [ -n "$PY" ]; then
    echo "  （本机无 zip，改用 $PY 打包：逐条写入并补目录条目）"
    ( cd "$DIST" && "$PY" - "$ZIP" <<'PYZIP'
import os, sys, zipfile
out = os.path.abspath(sys.argv[1])
zf = zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED, compresslevel=9)
for root, dirs, files in os.walk('.'):
    dirs.sort(); files.sort()
    rel = os.path.relpath(root, '.').replace(os.sep, '/')
    if rel != '.':
        zf.writestr(rel + '/', b'')     # 目录条目：itch 的解压器靠它建目录
    for f in files:
        zf.write(os.path.join(root, f), (rel + '/' if rel != '.' else '') + f)
zf.close()
PYZIP
    )
  else
    echo "✗ 既没有 zip 也没有 python，无法生成 itch.io 上传包。" >&2
    echo "  dist/ 已就绪，手动压缩时注意：index.html 必须在压缩包根目录，且要保留目录条目。" >&2
    exit 1
  fi
  verify_zip
}

# 条目表校验：两种打包实现共用，任一不合格直接非零退出（set -e 会中断整条发布）
verify_zip() {
  local list want have
  if [ -n "$PY" ]; then
    list="$("$PY" -c 'import sys,zipfile;[print(x) for x in zipfile.ZipFile(sys.argv[1]).namelist()]' "$ZIP")"
  elif command -v unzip >/dev/null 2>&1; then
    list="$(unzip -Z1 "$ZIP")"
  else
    echo "⚠ 无 python/unzip，跳过压缩包条目校验（结构问题线上才会暴露，慎用）" >&2
    return 0
  fi

  if ! printf '%s\n' "$list" | grep -qx 'index.html'; then
    echo "✗ 压缩包根目录没有 index.html（itch 要求解压即玩），条目首行：$(printf '%s\n' "$list" | head -1)" >&2
    exit 1
  fi
  if printf '%s\n' "$list" | grep -q '^dist/'; then
    echo "✗ 压缩包里套了一层 dist/ 目录，不符合 itch.io 要求" >&2; exit 1
  fi
  if printf '%s\n' "$list" | grep -q '[\\]'; then
    echo "✗ 条目名里有反斜杠（Windows 自带压缩的老毛病），非 Windows 解压器会当成一整个文件名" >&2; exit 1
  fi
  if ! printf '%s\n' "$list" | grep -q '/$'; then
    echo "✗ 压缩包里一个目录条目都没有 —— itch 的解压器会静默跳过文件，线上表现为半站 404 + 白屏" >&2
    exit 1
  fi
  want="$(find "$DIST" -type f | wc -l | tr -d ' ')"
  have="$(printf '%s\n' "$list" | grep -cv '/$')"
  if [ "$want" != "$have" ]; then
    echo "✗ 压缩包文件数 $have ≠ dist/ 的 $want，有文件没进包" >&2; exit 1
  fi
  echo "  ✓ 根目录即 index.html ｜ $have 个文件 + $(printf '%s\n' "$list" | grep -c '/$') 个目录条目 ｜ $(du -h "$ZIP" | cut -f1 | tr -d ' ') ｜ itch 上传后勾选「This file will be played in the browser」"
}

case "$MODE" in
  validate) run_validate ;;
  package)  build_dist ;;
  all)      run_validate; echo; build_dist ;;
esac
