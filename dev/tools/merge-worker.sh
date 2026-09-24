#!/usr/bin/env bash
# ============================================================================
# POTUS · tools/merge-worker.sh —— 把并行 worker 分支串行并入 main 的入库器
#
# 用法（在项目根或任意目录均可，脚本自己定位）：
#   bash dev/tools/merge-worker.sh w01                # 合一个分支
#   bash dev/tools/merge-worker.sh w01 w02 w03        # 合一批（批末统一跑全量门禁）
#   bash dev/tools/merge-worker.sh --dry w01          # 只预演：看会不会冲突，不动仓库
#   bash dev/tools/merge-worker.sh --skip-gate w01    # 只合不验（调试用，正常别用）
#   bash dev/tools/merge-worker.sh --lang-only w05    # 引擎串提取类分支：跑双语 + 全量
#
# 它做什么（顺序固定）：
#   1) 前置：main 工作树必须干净（有未提交改动就直接拒绝，避免把脏东西卷进合并）
#   2) 逐个 --no-ff 合并分支；任一分支合并冲突 → 立刻 merge --abort 并停下报告
#   3) 重跑 gen-manifest（index.html 托管区**一律以重生成为准**，不去手工和解）
#   4) 批末统一跑门禁：validate --games=20 --lang=zh / --games=1 --lang=en /
#      gen-manifest --check / choice-audit（flagged 数只准等于基线，不准变多）/
#      i18n-events --only=event（事件卡缺译叶子只准持平或下降，新卡必须自带英文覆盖层）/
#      text-audit --lang=en --tcase（英文标题 sentence case 条数，只准降不准升）
#   5) 门禁不过：不自动回滚（合并提交是有用信息），只打印 HEAD 与失败项，由人决定
#
# 安全边界：本脚本只在主库工作树里跑 git merge / node，绝不 push、绝不 reset --hard、
#           绝不删分支、绝不碰 worktree。
# ============================================================================
set -uo pipefail

MAIN_ROOT="${MAIN_ROOT:-/d/workspace/path2power}"
DEV="$MAIN_ROOT/dev"
BASE_BRANCH="main"
FLAGGED_BASELINE=3          # 基线：见 docs/PARALLEL-CONTENT-WORK.md §6.3
I18N_MISS="${I18N_MISS:-0}"     # 事件卡缺译叶子基线：276 张卡已全部英文化，所以是硬零——新卡必须自带英文覆盖层（见 docs/I18N.md §8）
TCASE="${TCASE:-0}"             # 英文标题 Title Case 条数：39 条存量已全部洗清，所以是硬零 —— 新卡标题必须 sentence case（规范见 docs/I18N.md §4）
GAMES_FULL=20

DRY=0; GATE=1; LANG_ONLY=0; BRANCHES=()
for a in "$@"; do
  case "$a" in
    --dry)        DRY=1 ;;
    --skip-gate)  GATE=0 ;;
    --lang-only)  LANG_ONLY=1 ;;
    -h|--help)    sed -n '2,26p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    w*)           BRANCHES+=("content/w${a#w}-") ;;
    *)            echo "✗ 未知参数：$a" >&2; exit 2 ;;
  esac
done
# 前缀匹配：worker 分支名是 content/wNN-<tag>（for-each-ref 的 pattern 按路径整段匹配，
# 半截前缀匹配不上，所以这里用 branch 列表自己过滤）
resolve() {
  local prefix="$1" hit n
  hit=$(git branch --format='%(refname:short)' | grep "^$prefix" || true)
  n=$(printf '%s' "$hit" | grep -c . || true)
  if [ "$n" != "1" ]; then echo "✗ 分支前缀 '$prefix' 匹配到 $n 个（$hit），无法确定" >&2; return 1; fi
  printf '%s\n' "$hit"
}

cd "$MAIN_ROOT" || { echo "✗ 进不去 $MAIN_ROOT" >&2; exit 1; }

# ---------- 1) 前置 ----------
if [ -n "$(git status --porcelain)" ]; then
  echo "✗ main 工作树不干净，先提交或 stash 再合并" >&2
  git status --short >&2
  exit 1
fi
cur=$(git rev-parse --abbrev-ref HEAD)
if [ "$cur" != "$BASE_BRANCH" ]; then
  echo "✗ 当前在 $cur，不在 $BASE_BRANCH" >&2; exit 1
fi
if [ "${#BRANCHES[@]}" -eq 0 ]; then echo "✗ 没指定分支（用法见 --help）" >&2; exit 2; fi

RESOLVED=()
for b in "${BRANCHES[@]}"; do
  r=$(resolve "$b") || exit 1
  RESOLVED+=("$r")
done
echo "▶ 目标分支：${RESOLVED[*]}"

# ---------- 2) 合并 ----------
for b in "${RESOLVED[@]}"; do
  if [ "$DRY" = "1" ]; then
    if git merge-tree "$(git write-tree)" "$BASE_BRANCH" "$b" >/dev/null 2>&1; then :; fi
    # 真正的 dry-run：no-commit 后立刻 abort
    if git merge --no-commit --no-ff "$b" >/dev/null 2>&1; then
      echo "  ✓ $b 可无冲突合并（预演，已回退）"
      git merge --abort >/dev/null 2>&1 || true
    else
      echo "  ✗ $b 有冲突（预演，已回退）——下面这些文件要人工和解："
      git status --short | sed 's/^/      /'
      git merge --abort 2>/dev/null
      exit 1
    fi
    continue
  fi
  echo "▶ 合并 $b"
  if ! git merge --no-ff -m "merge $b" "$b"; then
    # 唯一允许自动和解的文件 = dev/index.html 的生成器托管区：多个分支各自往同一区
    # 追加 <script> 行，必然撞车；但内容以第 3 步重生成准，所以取我方版本继续即可。
    conflicted=$(git diff --name-only --diff-filter=U)
    only_html=$(printf '%s\n' "$conflicted" | grep -v '^dev/index\.html$' | grep -c . || true)
    if [ "$only_html" = "0" ] && [ -n "$conflicted" ]; then
      echo "  · 只有 index.html 托管区冲突 → 取我方版本，稍后由 gen-manifest 重生成"
      git checkout --ours dev/index.html && git add dev/index.html
      git commit --no-edit || { echo "✗ 合并提交失败" >&2; exit 1; }
      continue
    fi
    echo "✗ $b 合并冲突，merge 已保留现场（未 abort）：请人工和解后 git commit" >&2
    printf '%s\n' "$conflicted" | sed 's/^/  ✗ /'
    exit 1
  fi
done
[ "$DRY" = "1" ] && { echo "✓ 预演完成，未产生任何提交"; exit 0; }

# ---------- 3) 清单重生成 ----------
echo "▶ 重生成 index.html 托管区"
node "$DEV/tools/gen-manifest.js" || { echo "✗ gen-manifest 失败" >&2; exit 1; }
if [ -n "$(git status --porcelain dev/index.html)" ]; then
  git add dev/index.html && git commit -q -m "merge: 重生成内容清单"
fi

# ---------- 4) 门禁 ----------
if [ "$GATE" = "0" ]; then echo "· 已跳过门禁（--skip-gate）"; exit 0; fi
fail=0
run() { echo "▶ $*"; if ! "$@"; then echo "  ↑ 失败" >&2; fail=$((fail+1)); fi; }

cd "$DEV" || exit 1
run node tools/gen-manifest.js --check
if [ "$LANG_ONLY" = "1" ]; then
  run node tools/validate.js --games="$GAMES_FULL" --lang=zh
  run node tools/validate.js --games=1 --lang=en
else
  # 内容合并走全样本：年均档期上限这类统计断言只在 20 局下判得出（单局噪声见 validate.js 尾注）
  run node tools/validate.js --games="$GAMES_FULL" --lang=zh
  run node tools/validate.js --games=1 --lang=en
fi
echo "▶ choice-audit flagged 计数（基线 $FLAGGED_BASELINE，只准持平）"
json=$(node tools/choice-audit.js --json 2>/dev/null | sed -n '/--JSON--/,$p' | tail -1)
n=$(printf '%s' "$json" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{const j=JSON.parse(s);console.log(j.flagged.length)}catch(e){console.log(-1)}})")
echo "  摘要：$json"
if [ "$n" = "-1" ]; then echo "  ✗ 无法解析 choice-audit 输出" >&2; fail=$((fail+1));
elif [ "$n" -gt "$FLAGGED_BASELINE" ]; then echo "  ✗ flagged 从 $FLAGGED_BASELINE 涨到 $n —— 退回 worker 重塑取舍" >&2; fail=$((fail+1));
else FLAGGED_BASELINE=$n; echo "  ✓ flagged = $n（新基线已抬到 $n）"; fi

echo "▶ i18n 事件卡缺译叶子数（基线 $I18N_MISS，只准持平或下降）"
im=$(node tools/i18n-events.js --only=event --json 2>/dev/null | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{const j=JSON.parse(s);const e=j.find(r=>r.kind==='event');console.log(e?e.missing:-1)}catch(x){console.log(-1)}})")
if [ "$im" = "-1" ]; then echo "  ✗ 无法解析 i18n-events 输出" >&2; fail=$((fail+1));
elif [ "$im" -gt "$I18N_MISS" ]; then echo "  ✗ 缺译从 $I18N_MISS 涨到 $im —— 新卡没写英文覆盖层，退回 worker 补" >&2; fail=$((fail+1));
else I18N_MISS=$im; echo "  ✓ 缺译 = $im（基线已降到 $im）"; fi

echo "▶ 英文标题 Title Case 条数（基线 $TCASE，只准持平或下降；规范是 sentence case）"
tc=$(node tools/text-audit.js --lang=en --tcase 2>/dev/null | head -1 | grep -oE '共 [0-9]+' | tr -dc '0-9')
tc=${tc:-}
if [ -z "$tc" ]; then echo "  ✗ 无法解析 text-audit --tcase 输出" >&2; fail=$((fail+1));
elif [ "$tc" -gt "$TCASE" ]; then echo "  ✗ Title Case 标题从 $TCASE 涨到 $tc —— 新写的英文标题没按 sentence case，退回改" >&2; fail=$((fail+1));
else TCASE=$tc; echo "  ✓ Title Case = $tc（基线已降到 $tc）"; fi

echo
if [ "$fail" = "0" ]; then
  echo "✓ 入库完成：$(git log --oneline -1)"
else
  echo "✗ 门禁 $fail 项未过。合并提交保留在 $(git rev-parse --short HEAD)，"
  echo "  请修好再继续（回退用 git reset --hard ${BASE_BRANCH}~N 由人工执行，本脚本不代做）" >&2
  exit 1
fi
