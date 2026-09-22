/* ============================================================================
 * CONTENT · 70-demo-resources.js
 * 【资源机制示范】三张开局事件，用来说明两件事的写法：
 *   1) cost  —— 选项的“资源代价”，余额不足时选项直接变灰并提示缺什么
 *   2) stake  —— 判定前可“投入资源加码”，打开 D&D 式面板：
 *                资金/精力 加值提高目标值，人情 换一次重投取优（advantage）
 *
 * 三张卡各自归入常规分类（丑闻 / 金钱 / 综合），weight 偏高，开局头几年多半会撞上，
 * 让玩家在真实剧情里自然学会 cost 与 stake。id 仍保留 demo_ 前缀，validate 与冒烟测试依赖它。
 *
 * 字段写法见 docs/CONTENT-SCHEMA.md 的「cost / stake」一节。
 * ==========================================================================*/

/* 事件对所有已注册时代生效；以后新增时代，本包自动跟着扩。 */
const DEMO_ERAS = Object.keys(POTUS.reg.era);

POTUS.define("event", [
  /* ------------------------------------------------------------------
   * 演示 1：一个选项列出全部三种资源，另外几个选项各自演示「纯代价」与「状态门槛」
   * ------------------------------------------------------------------ */
  {
    id: "demo_hearing",
    grade: "mid", valence: "risk", dyn: true,
    category: "scandal",
    era: DEMO_ERAS,
    tierMin: 0,
    tierMax: 5,
    weight: 6,
    brief: {
      "lede": "一场听证会，几条路。每一条都要你先付出点什么。",
      "known": [
        "传票是真的。委员会主席盯上你，是因为你上个月在电视上说了句他不爱听的话。",
        "你的团队把能想到的路写在了一张纸上：硬扛、花钱、求人、装病。",
        "你手上有三样东西可以动：资金（能换成律师和排场）、精力（你自己还能撑多久）、人情（别人愿意为你做的事）。",
        "硬扛不用花钱，但胜算低；花钱能买到确定性；而有些门，钱敲不开。"
      ],
      "rumor": [
        "有人告诉你主席其实不想真打，他只是想上电视。",
        "有人提醒你，出了这个门，你今天说过的话都会被剪成十秒的短片。"
      ],
      "unknown": [
        "哪一条路会在四年后被人翻出来当成把柄。",
        "你押掉的那些资源，会不会刚好是你后面最需要的那一样。"
      ],
      "terms": [
        {
          "k": "资金 / 精力 / 人情",
          "v": "本作三种可支配资源。资金能下注换胜算，精力的上限取决于健康，人情能换一次「重投取优」。"
        },
        {
          "k": "投注",
          "v": "带「可投入资源」标记的选项，点开后会弹出面板，押多少由你自己决定，确认判定时才扣。"
        }
      ]
    },
    title: "听证会：要不要押上家底",
    body: "传票已经送到。委员会的主席是个记仇的老头，他想在镜头前把你钉死。\n" +
      "你的团队给出几条路，但每一条都要你「掏东西」——钱、精力，或者人情。",
    choices: [
      {
        id: "all_in",
        text: "亲自出庭，把能押的都押上",
        base: 0.42,
        cost: { ap: 1 },
        stake: { fun: true, ap: true, fav: true },
        mods: [
          { src: "attr", key: "CHA", w: 0.5 },
          { src: "attr", key: "CUN", w: 0.3 }
        ],
        outcomes: {
          crit: {
            body: "你把听证会变成了个人秀。主席越凶，你越亮。剪辑片段当晚就上了三大台。",
            effects: { rep: 3, fac: { base: 18, press: 12 }, attr: { CHA: 4 } }
          },
          ok: {
            body: "你顶住了。没有名场面，但也没有破绽。",
            effects: { rep: 1.5, fac: { base: 8, press: 4 } }
          },
          meh: {
            body: "你答得中规中矩，对方拿到了他们想要的截图。",
            effects: { rep: 0.4, fac: { establishment: 3 } }
          },
          fail: {
            body: "你在一个时间线上说错了话，律师在台下手都在抖。",
            effects: { rep: -1.25, fac: { base: -6, press: -8 } }
          },
          critfail: {
            body: "你当场翻脸拍了桌子。画面循环播放了一整周。",
            effects: { rep: -2.5, fac: { base: -14, press: -16 }, flags: ["scandal_3"] }
          }
        }
      },
      {
        id: "lawyers",
        text: "重金请顶级律师团（花 $400k）",
        base: 0.72,
        cost: { fun: 11 },
        mods: [{ src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: {
            body: "律师把你的每句话都变成了不可追问的堡垒。委员会空手而归。",
            effects: { rep: 2, attr: { INT: 2 }, fac: { establishment: 10, commercial: 8 } }
          },
          ok: {
            body: "程序被拖成了迷宫，最后不了了之。",
            effects: { rep: 1, attr: { INT: 1 }, fac: { establishment: 5 } }
          },
          meh: {
            body: "你安全了，但纳税人买单的账被媒体翻了出来。",
            effects: { rep: 0.2, fac: { base: -5, press: -4 } }
          },
          fail: {
            body: "对方看出你在用钱拖延，舆论站到了他们那边。",
            effects: { rep: -1, fac: { base: -9 } }
          },
          critfail: {
            body: "律师团当庭爆出另一桩旧案，你连辩白的机会都没有。",
            effects: { rep: -2.25, fac: { base: -14, press: -12 }, flags: ["scandal_4"] }
          }
        }
      },
      {
        id: "call_favor",
        text: "托人让主席把议程往后挪（花 1 点人情）",
        base: 0.62,
        cost: { fav: 1 },
        mods: [{ src: "fac", key: "establishment", w: 0.35 }],
        outcomes: {
          crit: {
            body: "听证会无限期推迟。你欠的那个人情，日后会以更贵的方式收回。",
            effects: { rep: 1.25, attr: { CUN: 1 }, fac: { establishment: 12 } }
          },
          ok: {
            body: "议程挪到了选举之后。你喘了口气。",
            effects: { rep: 0.6, attr: { CUN: 1 }, fac: { establishment: 6 } }
          },
          meh: {
            body: "推迟了两周，然后如期举行。",
            effects: { rep: 0.2 }
          },
          fail: {
            body: "你求的人转头把这件事告诉了主席。你不但没挪成，还多了个把柄。",
            effects: { rep: -0.8, fac: { establishment: -8 } }
          },
          critfail: {
            body: "你想干预议程的通话记录被完整披露。这比原来的指控更致命。",
            effects: { rep: -2, fac: { establishment: -14, press: -14 }, flags: ["scandal_4"] }
          }
        }
      },
      {
        id: "big_shot_req",
        text: "动用你在参议院的老关系（需要 T3 以上）",
        base: 0.82,
        req: { tier: 3 },
        outcomes: {
          crit: {
            body: "一通电话，听证会直接取消。没人问为什么。",
            effects: { rep: 2.5, fac: { establishment: 20 } }
          },
          ok: {
            body: "你的老关系替你说了话。风暴被按在纸面之下。",
            effects: { rep: 1.5, fac: { establishment: 12 } }
          },
          meh: {
            body: "关系打了折扣，只换来一点缓冲时间。",
            effects: { rep: 0.6, fac: { establishment: 5 } }
          },
          fail: {
            body: "对方如今不接你的电话了。",
            effects: { rep: -0.6, fac: { establishment: -6 } }
          },
          critfail: {
            body: "你的老关系把通话记录交了出去，用以自保。",
            effects: { rep: -1.75, fac: { establishment: -16, press: -10 }, flags: ["scandal_3"] }
          }
        }
      },
      {
        id: "sick",
        text: "病假缺席，什么都不花",
        base: 0.45,
        stake: { ap: true },
        outcomes: {
          crit: {
            body: "医生证明无懈可击。委员会白白摆了一天的椅子。",
            effects: { rep: 0.6, attr: { INTG: 2 }, fac: { base: -2 } }
          },
          ok: {
            body: "你缺席了，风波顺延到明年。",
            effects: { attr: { INTG: 1 } }
          },
          meh: {
            body: "有人拍到你当天在高尔夫球场。",
            effects: { rep: -0.6, fac: { base: -6, press: -5 } }
          },
          fail: {
            body: "缺席被解读为心虚，媒体用了三个礼拜讲这件事。",
            effects: { rep: -1.5, fac: { base: -10, press: -10 } }
          },
          critfail: {
            body: "你的「病」被查出是伪造的证明。这一条比原指控更致命。",
            effects: { rep: -2.5, fac: { base: -14, press: -14 }, flags: ["scandal_4", "investigation_open"] }
          }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 演示 2：钱多钱少决定你能不能选 —— "缺少资金" 变灰效果
   * ------------------------------------------------------------------ */
  {
    id: "demo_donor_gala",
    grade: "minor", valence: "risk", dyn: true,
    category: "finance",
    era: DEMO_ERAS,
    tierMin: 0,
    tierMax: 5,
    weight: 5,
    brief: {
      "lede": "一张请柬。你是去募款的——但场面上的每一分体面都要本钱。",
      "known": [
        "请柬上写的是「晚宴」。你很清楚那是一场交易：他们出钱，你出未来。",
        "主桌上那三十个人，能决定你未来两年的钱够不够用。",
        "想在对面的酒店办一场同规格的场子把人请过来，场地加排场要 75 万——你现在拿不出来，所以那个选项此刻是灰的。",
        "你也可以空手去，只带一段话。那不需要花钱，但需要你真的站得住。"
      ],
      "rumor": [
        "有人说到场的人里有两个正在互相挖墙脚。",
        "有人说去年同类的场合上，有人因为礼物的价签没撕干净，被记了三年。"
      ],
      "unknown": [
        "今晚拿到的钱，将来要用什么还。",
        "你会在哪一天发现，自己其实一直在替别人说话。"
      ],
      "terms": [
        {
          "k": "缺少资金",
          "v": "代价付不起时选项会置灰并写明缺什么。那是提示，不是禁止——去把钱弄到手，选项就会亮起来。"
        },
        {
          "k": "筹码",
          "v": "资源可以在判定前当赌注押进去。押注额会被你的余额夹住，不会让你投成负数。"
        }
      ]
    },
    title: "金主的晚宴",
    body: "城里最有钱的三十个人今晚在同一张桌子上。你是被邀请的「潜在受助人」——去拿钱的，不是去花钱的。当然，把场面撑起来也要本钱。",
    choices: [
      {
        id: "buy_floor",
        text: "自己办一场答谢酒会，把这些人请到你的场子（花 $150k 场地与餐饮）",
        note: "你是主人，他们是你请来的客人——这场酒会本质是「我值得投资」的展示。现实对标：地方级筹款活动成本五位数起，全国级六位数。",
        base: 0.75,
        cost: { fun: 16.5 },
        stake: { fun: true },
        mods: [{ src: "fac", key: "commercial", w: 0.4 }],
        outcomes: {
          crit: {
            body: "你成了那晚唯一的主角。三个人当场承诺开票。",
            effects: { rep: 5, fun: 100, fac: { commercial: 22 } }
          },
          ok: {
            body: "排场到位，饭后多了几个电话号码。",
            effects: { rep: 2, fun: 33.5, fac: { commercial: 12 } }
          },
          meh: {
            body: "场子办得不错，酒会顺利结束——只是没有人当场承诺什么。你的名片留在了三十个口袋里，未来再说。",
            effects: { rep: 0.8, fac: { commercial: 5 } }
          },
          fail: {
            body: "有人把「候选人自费包场」捅给了记者。",
            effects: { rep: -2, fac: { commercial: 3, press: -9 } }
          },
          critfail: {
            body: "账目出了问题，你花的钱成了一条洗钱线索。",
            effects: { rep: -3.5, fac: { commercial: -12 }, flags: ["launder", "investigation_open"] }
          }
        }
      },
      {
        id: "gift",
        text: "给当晚的主宾各备一份得体的见面礼（花 $30k）——进了这个圈子的规矩",
        base: 0.58,
        cost: { fun: 3.5 },
        stake: { fun: true, fav: true },
        outcomes: {
          crit: {
            body: "礼物挑得极准。老钱们觉得你「懂规矩」。",
            effects: { rep: 3, fun: 28, fac: { commercial: 16 } }
          },
          ok: {
            body: "你被记住了名字。",
            effects: { rep: 1.5, fun: 6.5, fac: { commercial: 8 } }
          },
          meh: {
            body: "礼物和其他人撞了。你显得毫无想象力。",
            effects: { rep: -0.4, fac: { commercial: 2 } }
          },
          fail: {
            body: "礼物的价签没撕干净。",
            effects: { rep: -2, fac: { commercial: -8, press: -6 } }
          },
          critfail: {
            body: "送礼被定性为贿赂，检方开始过问。",
            effects: { rep: -4, fac: { commercial: -14, agency: -10 }, flags: ["scandal_4"] }
          }
        }
      },
      {
        id: "ideals",
        text: "空手赴宴，只谈理想（投入精力换取说服力）",
        base: 0.4,
        stake: { ap: true },
        mods: [{ src: "attr", key: "CHA", w: 0.55 }, { src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: {
            body: "你讲了二十分钟，最老的一个人说：「我三十年没听过这种话了。」",
            effects: { rep: 5.5, fac: { base: 14, commercial: 10, church: 8 } }
          },
          ok: {
            body: "有人被打动了，虽然没给钱。",
            effects: { rep: 2.5, fac: { base: 8, commercial: 4 } }
          },
          meh: {
            body: "礼貌的沉默。你被安排在了长桌最远的那一端。",
            effects: { rep: 0.4 }
          },
          fail: {
            body: "有人中途开始看手机。",
            effects: { rep: -1.5, fac: { commercial: -8 } }
          },
          critfail: {
            body: "你说到激动处骂了在座的一个人。宴会提前散了。",
            effects: { rep: -3.5, fac: { commercial: -18, base: -6 } }
          }
        }
      },
      {
        id: "bring_press",
        text: "带记者一起去（花 2 点精力，讨好媒体）",
        base: 0.5,
        cost: { ap: 2 },
        mods: [{ src: "fac", key: "press", w: 0.35 }],
        outcomes: {
          crit: {
            body: "报道写成了「他要向金主开刀」。你一分钱没花，声望翻倍。",
            effects: { rep: 6, fac: { press: 18, base: 12, commercial: -12 } }
          },
          ok: {
            body: "新闻有了，金主们觉得你很危险。",
            effects: { rep: 2.5, fac: { press: 10, commercial: -8 } }
          },
          meh: {
            body: "稿子发在第三版。没人读到。",
            effects: { rep: 0.4, fac: { commercial: -3 } }
          },
          fail: {
            body: "记者把你在席间的醉话写进了导语。",
            effects: { rep: -2.5, fac: { press: -4, commercial: -10 } }
          },
          critfail: {
            body: "你把金主惹毛了，也把记者得罪了。两边同时开火。",
            effects: { rep: -4, fac: { press: -12, commercial: -16 }, flags: ["scandal_3"] }
          }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 演示 3：精力是稀缺资源 —— 三个选项都在消耗它；人情换重投
   * ------------------------------------------------------------------ */
  {
    id: "demo_2am_call",
    grade: "minor", valence: "risk", dyn: true,
    category: "general",
    era: DEMO_ERAS,
    tierMin: 0,
    tierMax: 5,
    weight: 4,
    brief: {
      "lede": "一天只有这么多小时。今晚你只能把它花在一个地方。",
      "known": [
        "电话那头的人不能等。明早八点之前必须有个结果。",
        "你手上有精力（今晚还能撑多久）和人情（谁愿意在半夜接你的电话）。",
        "连夜飞过去最靠谱，但会吃掉三点精力——而精力的上限取决于你的健康。",
        "你也可以不接。不接也是一种选择，只是要承担它的后果。"
      ],
      "rumor": [
        "有人说这件事本来不需要你出面，是有人故意把球踢给你。",
        "有人说对方真正想谈的，并不是电话里说的那件事。"
      ],
      "unknown": [
        "你今晚用掉的精力，明天还回不回来。",
        "那通电话会不会决定一个你根本不知道存在的任命。"
      ],
      "terms": [
        {
          "k": "精力",
          "v": "每年按健康恢复（6 + 健康/25，上限 12）。健康掉下来，你每年能做的事会一起变少。"
        },
        {
          "k": "重投取优",
          "v": "花 1 点人情，判定时掷两次骰子取更好的那一次结果。"
        }
      ]
    },
    title: "凌晨两点，一个你不敢挂断的人打来电话",
    body: "电话那头是一个你不敢挂断的人。事情必须在明早八点之前有个结果。\n" +
      "精力不是无限的——一天只有这么多小时。",
    choices: [
      {
        id: "fly",
        text: "连夜飞过去（花 3 点精力，可押人情换重投）",
        base: 0.66,
        cost: { ap: 3 },
        stake: { fav: true },
        mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        outcomes: {
          crit: {
            body: "你凌晨四点出现在他家门口。他愣住了，然后什么都答应了。",
            effects: { rep: 4, fav: 2, fac: { establishment: 14 } }
          },
          ok: {
            body: "事情谈成了，代价是你会连着一周靠咖啡活着。",
            effects: { rep: 2, fav: 1, hp: -1.5, fac: { establishment: 7 } }
          },
          meh: {
            body: "他见了你，但什么都没答应。你白飞了一趟。",
            effects: { hp: -1 }
          },
          fail: {
            body: "他让助理在楼下打发了你。",
            effects: { rep: -1.25, hp: -1.5, fac: { establishment: -6 } }
          },
          critfail: {
            body: "你半夜出现在他家门口这件事，被写成了一封恐吓信。",
            effects: { rep: -3.5, hp: -2, fac: { establishment: -14, press: -10 }, flags: ["scandal_3"] }
          }
        }
      },
      {
        id: "phone",
        text: "就在电话里稳住他（花 1 点精力）",
        base: 0.5,
        cost: { ap: 1 },
        stake: { fav: true },
        mods: [{ src: "attr", key: "CUN", w: 0.6 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: {
            body: "四十分钟后他自己说服了自己。你甚至没下床。",
            effects: { rep: 2.75, fav: 1, fac: { establishment: 10 } }
          },
          ok: {
            body: "拖住了。明早再说。",
            effects: { rep: 1.25, fac: { establishment: 4 } }
          },
          meh: {
            body: "他挂电话前没说你做错了，但也没说对。",
            effects: { hp: -0.5 }
          },
          fail: {
            body: "你听上去像在敷衍。他把电话挂了。",
            effects: { rep: -1.5, fac: { establishment: -8 } }
          },
          critfail: {
            body: "你以为他挂了，其实没有。接下来的话他全听见了。",
            effects: { rep: -4, fac: { establishment: -16 }, flags: ["tape_out", "scandal_3"] }
          }
        }
      },
      {
        id: "assistant",
        text: "花钱让助理连夜跑一趟（花 $60k）",
        base: 0.46,
        cost: { fun: 6.5 },
        outcomes: {
          crit: {
            body: "助理办成了。你甚至不知道他怎么做到的——这让你有点不安。",
            effects: { rep: 1.5, fac: { establishment: 6 } }
          },
          ok: {
            body: "事情办妥了，助理第二天辞了职——但走前把整个流程写成了一页纸留给你。",
            effects: { rep: 2, attr: { CUN: 1 } }
          },
          meh: {
            body: "助理去了，对方没开门。",
            effects: { fun: -2.25 }
          },
          fail: {
            body: "助理在门口说错了话，把小事变成了大事。",
            effects: { rep: -2, fac: { establishment: -9 } }
          },
          critfail: {
            body: "助理被收买了，带去的东西落到了对方手里。",
            effects: { rep: -3.5, fac: { establishment: -15 } }
          }
        }
      },
      {
        id: "ignore",
        text: "不接。明天再说（可投入精力硬扛）",
        base: 0.34,
        stake: { ap: true, fav: true },
        outcomes: {
          crit: {
            body: "第二天早上一切风平浪静。你赌赢了。",
            effects: { rep: 1.5, hp: 1.5 }
          },
          ok: {
            body: "他找到了别人。事情绕开了你，也算解决。",
            effects: {}
          },
          meh: {
            body: "你在半梦半醒间想了这件事一整晚。",
            effects: { hp: -1 }
          },
          fail: {
            body: "他记住了你那个晚上没接电话。",
            effects: { rep: -1.5, fac: { establishment: -9 } }
          },
          critfail: {
            body: "那通电话决定了你的一个任命。你知道的时候，名单已经公布。",
            effects: { rep: -4, fac: { establishment: -14, agency: -8 } }
          }
        }
      }
    ]
  }
]);
