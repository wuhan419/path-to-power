/* ============================================================================
 * CONTENT · 60-progression.js
 * 跨时代通用的晋升事件链（每一条对应一次层级跃迁或轨道里程碑）。
 * 事件结构见 docs/CONTENT-SCHEMA.md
 * ==========================================================================*/

POTUS.define("event", [
  {
    "id": "prog_council",
    "grade": "minor",
    "category": "career",
    "unique": false,
    valence: "risk", dyn: true,
    "tierRaw": true,     // 晋升脊柱：按新 10 级空间直接判定，不走 tierBand 铺档（跨时代通用——任何时代都要能迈出第一步）
    "tierMin": 0,
    "tierMax": 0,        // 等级1（志愿者）触发；第一次参选，升 等级2 地方党务
    "minTenure": 8,        // 在当前级蹲够这么多个月才有资格（与 balance.tierGates 同调）
    "weight": 20,
    "brief": {
      "lede": "第一次有人要认真地对你说：把你的名字印在选票上。",
      "known": [
        "地方选举通常在春天举行，和全国大选错开，投票率低得惊人——有时不到两成。",
        "低投票率意味着，一小撮高度动员的人就能决定结果。基层组织比广告更管用。",
        "报名需要一笔押金、一批有效签名，还有一份公开的财务申报。",
        "你的对手很可能是一位已经干了很多年的现任者，他的名字邻居都认识。"
      ],
      "rumor": [
        "有人告诉你，这个席位的现任者其实早就不想干了，只是没人出来接。",
        "有人说本地一家企业愿意资助「讲道理的人」，条件是别碰他们的许可。"
      ],
      "unknown": [
        "你会输得多难看，还是赢得有多侥幸。",
        "这一步会不会成为你整个生涯里最干净的一步。",
        "之后每一次往上走，你都要付出什么。"
      ],
      "terms": [
        {
          "k": "市镇选举",
          "v": "美国最基层的选举，议题多为学校、道路、分区与许可，是政治生涯最常见的起点。"
        },
        {
          "k": "投票率",
          "v": "有投票资格的人中实际投票的比例。地方选举常年极低，这既让动员变得关键，也让结果更容易被操纵。"
        },
        {
          "k": "签名门槛",
          "v": "参选前需要收集一定数量的选民签名，用来证明你不是来搅局的。"
        }
      ]
    },
    "title": "第一次把自己的名字放上选票",
    "body": "选区不大，但这是从‘帮忙的人’变成‘候选人’的那一步。你要么从此有了自己的地盘，要么被打回原点。",
    "choices": [
      {
        "id": "doorknock",
        "text": "逐门逐户敲门，靠双腿跑票",
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你把整条街的人都聊成了朋友，高票当选，从此有了自己的地盘。",
            "effects": {
              "tier": 1,
              "rep": 3,
              "fac": {
                "base": 12
              }
            }
          },
          "ok": {
            "body": "你赢了。位置不大，但从此你不再是‘助理’。",
            "effects": {
              "tier": 1,
              "rep": 1.5,
              "fac": {
                "base": 6
              }
            }
          },
          "meh": {
            "body": "你赢了，但花光了积蓄，还欠了人情。",
            "effects": {
              "tier": 1,
              "rep": 0.8,
              "fun": -9,
              "fav": -1
            }
          },
          "fail": {
            "body": "你差一点。知名度涨了，位置没到手。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "base": 4
              }
            }
          },
          "critfail": {
            "body": "你输得很难看，还被对手挖出旧账。",
            "effects": {
              "rep": -1.5,
              "fac": {
                "base": -10
              },
              "flags": [
                "scandal_1"
              ]
            }
          }
        }
      },
      {
        "id": "ads",
        "text": "砸钱投广告，快速买曝光",
        "req": {
          "fun": 5.5
        },
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.3
          },
          {
            "src": "fac",
            "key": "commercial",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "广告轰炸奏效，你以压倒性优势当选。",
            "effects": {
              "tier": 1,
              "rep": 3,
              "fac": {
                "base": 8,
                "commercial": 6
              }
            }
          },
          "ok": {
            "body": "钱花得值，你当选了。",
            "effects": {
              "tier": 1,
              "rep": 2,
              "fun": -5.5
            }
          },
          "meh": {
            "body": "你赢了，但被批‘金钱民主’，且囊中羞涩。",
            "effects": {
              "tier": 1,
              "rep": 0.8,
              "fun": -9,
              "fac": {
                "base": -6
              }
            }
          },
          "fail": {
            "body": "钱花了，票没来。",
            "effects": {
              "fun": -9,
              "rep": 0.4
            }
          },
          "critfail": {
            "body": "你的广告被指违规，选举委员会找上门。",
            "effects": {
              "fun": -13.5,
              "flags": [
                "investigation_open",
                "scandal_2"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_state",
    "grade": "minor",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 2,
    "tierMax": 2,        // 等级3（市议员）触发；进州议会，升 等级4 州众议员
    "minTenure": 12,        // 与 balance.tierGates 同调
    "weight": 16,
    "brief": {
      "lede": "州议会的席位空了出来。有人劝你去填。",
      "known": [
        "州议会掌握本州的法律、预算和选区划分。选区怎么划，直接决定未来十年谁能当选。",
        "州议员拿的薪水通常不高，但它是通往联邦层面的标准跳板。",
        "空缺席位可能由补选产生，也可能由党内提名填补——规则各州不同，往往决定谁能上。",
        "你这个选区的党组织负责人认识你，但只认识一半。"
      ],
      "rumor": [
        "有人说这个位子是某位大佬为某个人留的，而那个人还没决定要不要。",
        "有人说选区边界明年会重新划一次，谁在里面都不一样了。"
      ],
      "unknown": [
        "在州议会里，你会不会成为某个派系的人。",
        "你要为这个席位放弃多少你现在拥有的东西。",
        "这个席位会不会在几年后因为重划选区而消失。"
      ],
      "terms": [
        {
          "k": "州议会",
          "v": "各州的立法机关，掌预算、州法与选区划分，是联邦政治的主要人才来源。"
        },
        {
          "k": "补选",
          "v": "因在任者离职而举行的临时选举。"
        },
        {
          "k": "选区重划",
          "v": "每十年根据人口普查重新划定选区边界，是两党争夺的关键战场。"
        }
      ]
    },
    "title": "州议会的席位空了出来",
    "body": "有人劝你‘再等等’。但空位不会等任何人。",
    "choices": [
      {
        "id": "run",
        "text": "立刻宣布参选",
        "req": {
          "rep": 6
        },
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.2
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你干净利落地赢下选区，州府的大门为你打开。",
            "effects": {
              "tier": 1,
              "rep": 4,
              "fac": {
                "base": 8,
                "establishment": 8
              }
            }
          },
          "ok": {
            "body": "你赢了，坐进了州议会的席位。",
            "effects": {
              "tier": 1,
              "rep": 2.5,
              "fac": {
                "establishment": 5
              }
            }
          },
          "meh": {
            "body": "你赢了，但党内从此把你当‘需要提防的人’。",
            "effects": {
              "tier": 1,
              "rep": 1.25,
              "fac": {
                "establishment": -6
              }
            }
          },
          "fail": {
            "body": "你输了，但州级曝光让你更有名。",
            "effects": {
              "rep": 1.5
            }
          },
          "critfail": {
            "body": "惨败，你被贴上‘不自量力’的标签。",
            "effects": {
              "rep": -2,
              "fac": {
                "base": -8,
                "establishment": -6
              }
            }
          }
        }
      },
      {
        "id": "wait",
        "text": "让位，换党内一个承诺",
        "base": 0.48,
        "mods": [
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.4
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的退让换来一个委员会的实权位置。",
            "effects": {
              "rep": 1.5,
              "fac": {
                "establishment": 14
              },
              "fav": 2
            }
          },
          "ok": {
            "body": "党魁记住了你的忠诚。",
            "effects": {
              "fac": {
                "establishment": 8
              },
              "fav": 1
            }
          },
          "meh": {
            "body": "你什么也没换到。",
            "effects": {}
          },
          "fail": {
            "body": "你被当成没有野心的人，从此被冷落。",
            "effects": {
              "fac": {
                "establishment": -5
              }
            }
          },
          "critfail": {
            "body": "你让了位，对方反手把你边缘化。",
            "effects": {
              "fac": {
                "establishment": -12,
                "base": -6
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_federal",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 5,
    "tierMax": 5,        // 等级6（全州公职）触发；进国会，升 等级7 联邦众议员（胜利线）
    "minTenure": 24,        // 与 balance.tierGates 同调
    "weight": 15,
    "brief": {
      "lede": "联邦众议院的门开着一条缝。你要挤进去。",
      "known": [
        "联邦众议员任期两年，这意味着你几乎一当选就要开始下一场竞选。",
        "一个众议院选区的规模通常有几十万人。你不可能认识他们中的大多数。",
        "在任者拥有巨大的优势：免费邮寄、媒体曝光、以及捐款人只愿意给赢面大的人钱。",
        "如果他决定退，你的机会会从渺茫变成真实；如果他要连任，你要先掀翻他。"
      ],
      "rumor": [
        "有人说现任者正在被一桩旧事缠住，还没公开。",
        "有人说党内高层更愿意推另一个人，但没钱的人是推不动的。",
        "有人说这次会有大量外部资金涌进来，来自你从没听说过的组织。"
      ],
      "unknown": [
        "进了华盛顿以后，你会变成什么样。",
        "你会不会在两年的竞选循环里，把自己耗干。",
        "你第一次投票时，会不会发现自己只是某一栏里的一个数字。"
      ],
      "terms": [
        {
          "k": "众议院",
          "v": "美国国会下院，共 435 个席位，按各州人口分配，任期两年。"
        },
        {
          "k": "在任者优势",
          "v": "现任议员在曝光、筹款、免费通讯上的结构性优势，使连任率长期高得惊人。"
        },
        {
          "k": "外部资金",
          "v": "来自本选区之外的捐款与独立支出，往往决定一场地方选举的胜负。"
        }
      ]
    },
    "title": "联邦众议员的机会",
    "body": "华盛顿的席位空了。所有地方政客都在盯着它。",
    "choices": [
      {
        "id": "run",
        "text": "冲进全国舞台",
        "req": {
          "rep": 5,
          "fun": 5.5
        },
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你以黑马姿态进入国会，全国媒体开始念你的名字。",
            "effects": {
              "tier": 1,
              "rep": 2.75,
              "fac": {
                "base": 12,
                "press": 8
              }
            }
          },
          "ok": {
            "body": "你赢了，成为联邦众议员。",
            "effects": {
              "tier": 1,
              "rep": 1.5,
              "fac": {
                "base": 6
              }
            }
          },
          "meh": {
            "body": "你赢了，但代价是背上一身竞选债。",
            "effects": {
              "tier": 1,
              "rep": 1,
              "fun": -7
            }
          },
          "fail": {
            "body": "你输了，但全国都知道了你是谁。",
            "effects": {
              "rep": 1.25
            }
          },
          "critfail": {
            "body": "你输了，且竞选中收受黑金的传言缠上你。",
            "effects": {
              "rep": -0.8,
              "flags": [
                "scandal_2",
                "investigation_open"
              ]
            }
          }
        }
      },
      {
        "id": "decline",
        "text": "放弃，深耕地方",
        "base": 0.7,
        "mods": [
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你成了地方上说一不二的人物，稳稳的地位。",
            "effects": {
              "rep": 1,
              "fac": {
                "base": 12
              },
              "fav": 2
            }
          },
          "ok": {
            "body": "你守住了基本盘。",
            "effects": {
              "fac": {
                "base": 6
              }
            }
          },
          "meh": {
            "body": "你保住了位置，也保住了天花板。",
            "effects": {
              "fac": {
                "base": 3
              }
            }
          },
          "fail": {
            "body": "有人嘲笑你没有野心。",
            "effects": {
              "rep": -0.4
            }
          },
          "critfail": {
            "body": "你不够进取，支持者开始流失。",
            "effects": {
              "fac": {
                "base": -10
              },
              "rep": -0.8
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_senate",
    "grade": "major",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 6,
    "tierMax": 6,        // 等级7（联邦众议员）触发；升 等级8 联邦参议员 / 州长
    "minTenure": 28,        // 与 balance.tierGates 同调
    "weight": 14,
    "brief": {
      "lede": "参议员和州长，两条路都摆在你面前。",
      "known": [
        "参议员任期六年，在华盛顿说话，管全国性议题；州长任期四年，在本州动手，管预算和人事。",
        "参议院有更大的平台和更强的稳定性；州长的权力更具体——你签的字当天就会改变某些人的生活。",
        "参议员要跟全国性的钱打交道；州长要跟本地的利益集团打交道。",
        "两者都是通往最高位置的标准路径，但走法完全不同。"
      ],
      "rumor": [
        "有人说本党的全国委员会更希望你选参议员，因为那个席位现在还空不出人来。",
        "有人说州长这条路更安全，因为你的对手在党内初选里会先自相残杀。",
        "有人说，无论选哪条，你都会在十年后懊悔没选另一条。"
      ],
      "unknown": [
        "哪一条路会在某个关键年份正好遇到一个空档。",
        "你会在哪一条路上得罪那些真正掌握资源的人。",
        "你会成为哪一种人——立法者，还是行政者。"
      ],
      "terms": [
        {
          "k": "参议院",
          "v": "美国国会上院，每州两名，共 100 席，任期六年。拥有对任命与条约的确认权。"
        },
        {
          "k": "州长",
          "v": "各州行政首长，掌握预算执行、人事任命与州国民警卫队指挥权。"
        },
        {
          "k": "全国委员会",
          "v": "政党在全国层面的常设机构，负责筹款、协调选战与规则制定。"
        }
      ]
    },
    "title": "参议员 / 州长：二选一",
    "body": "两条路，都通向国家权力核心，但代价不同。",
    "choices": [
      {
        "id": "senate",
        "text": "竞选联邦参议员（全国舞台）",
        "req": {
          "rep": 4.5,
          "fun": 6.5
        },
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "press",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你赢了，坐进参议院。全国的镜头都对准你。",
            "effects": {
              "tier": 1,
              "rep": 2,
              "fac": {
                "press": 12,
                "base": 10
              }
            }
          },
          "ok": {
            "body": "你成为参议员，权力核心的门票到手。",
            "effects": {
              "tier": 1,
              "rep": 1.25,
              "fac": {
                "press": 6
              }
            }
          },
          "meh": {
            "body": "你赢了，但欠下巨额政治债。",
            "effects": {
              "tier": 1,
              "rep": 0.9,
              "fun": -7.5,
              "fav": -2
            }
          },
          "fail": {
            "body": "你惜败，但已经是全国级人物。",
            "effects": {
              "rep": 0.9
            }
          },
          "critfail": {
            "body": "你输了，还因竞选资金问题被调查。",
            "effects": {
              "rep": -0.7,
              "flags": [
                "scandal_3",
                "investigation_open"
              ]
            }
          }
        }
      },
      {
        "id": "governor",
        "text": "竞选州长（地方实权）",
        "req": {
          "rep": 4,
          "fun": 5
        },
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你入主州府，成为一方诸侯。",
            "effects": {
              "tier": 1,
              "rep": 1.75,
              "fac": {
                "establishment": 12,
                "base": 8
              }
            }
          },
          "ok": {
            "body": "你当选州长，掌握了实权。",
            "effects": {
              "tier": 1,
              "rep": 1,
              "fac": {
                "establishment": 8
              }
            }
          },
          "meh": {
            "body": "你当选，但州议会不听话。",
            "effects": {
              "tier": 1,
              "rep": 0.7,
              "fac": {
                "establishment": 4,
                "base": -6
              }
            }
          },
          "fail": {
            "body": "你输了，回到原点。",
            "effects": {
              "rep": 0.6
            }
          },
          "critfail": {
            "body": "惨败，且被质疑执政能力。",
            "effects": {
              "rep": -0.7,
              "fac": {
                "press": -10
              }
            }
          }
        }
      },
      {
        "id": "shoestring",
        "text": "不等本钱，靠义工和教堂硬打一场",
        "base": 0.32,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "base", "w": 0.4 }
        ],
        "outcomes": {
          "crit": {
            "body": "你跑遍了每一个县，把「他连广告都买不起还来见我们」变成了一句好话。你赢了——带进去的全是自发义工，不是买来的广告。",
            "effects": {
              "tier": 1,
              "rep": 1.1,
              "fun": -2,
              "fac": { "base": 15, "establishment": -3 },
              "voters": { "diehard": 600, "warm": 300 }
            }
          },
          "ok": {
            "body": "义工替你跑赢了一台机器。你坐进去了，但团队是拼凑的，欠的账要慢慢还。",
            "effects": {
              "tier": 1,
              "rep": 0.7,
              "fun": -1.5,
              "fav": -2,
              "fac": { "base": 10 },
              "voters": { "diehard": 300 }
            }
          },
          "meh": {
            "body": "你差了几个百分点。没赢，但所有人都记住了那个不肯退的人。",
            "effects": {
              "rep": 0.5,
              "fun": -1.5,
              "fav": -2,
              "fac": { "base": 7 },
              "voters": { "diehard": 120 }
            }
          },
          "fail": {
            "body": "钱不够就是钱不够。你在初选里被碾过去，积蓄见了底，还欠下一屁股义工的人情。",
            "effects": {
              "rep": -0.4,
              "fun": -2,
              "fav": -2,
              "fac": { "base": 3, "establishment": -4 }
            }
          },
          "critfail": {
            "body": "竞选账目被翻出来，你连报名费都凑不齐这件事上了本地报纸。",
            "effects": {
              "rep": -0.9,
              "fun": -2,
              "fav": -1,
              "fac": { "base": -3, "establishment": -3 },
              "flags": [ "scandal_1" ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_president",
    "grade": "major",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 8,
    "tierMax": 8,        // 等级9（总统候选人）触发；问鼎白宫，升 等级10 总统
    "minTenure": 40,        // 与 balance.tierGates 同调
    "weight": 30,
    "brief": {
      "lede": "所有人都看着你。你要不要说那句话。",
      "known": [
        "宣布参选总统的窗口通常在选举年的前一年冬天到初夏，太早会被消耗，太晚募不到钱。",
        "要拿到提名，需要在各州初选里累积代表席位，而早期的几个州会对后面的捐款产生巨大影响。",
        "大选阶段的资金几乎不设上限，钱会以你无法追踪的路径涌进来。",
        "你将要面对的对手，可能比你在党内遇到的所有人都友善。"
      ],
      "rumor": [
        "有人说本党的几位大捐款人已经决定好了人选，正在等人开口。",
        "有人说对手阵营手里有一份关于你的材料，会在大选前三个月用。",
        "有人说今年的选举会被一个没人预料到的议题彻底改掉。"
      ],
      "unknown": [
        "这条路走到底，会改变你这个人多少。",
        "如果你输了，还剩下什么。",
        "历史会怎么记录你——但那是很久以后的事。"
      ],
      "terms": [
        {
          "k": "代表席位",
          "v": "各州初选产生的党内代表名额，用于在党代会上正式表决提名人。"
        },
        {
          "k": "选举人团",
          "v": "美国宪法规定的间接选举机制：选民实际选出的是选举人，由选举人投票选出总统。"
        },
        {
          "k": "摇摆州",
          "v": "两党支持率接近、结果不确定的州。整个大选的资源几乎都压在这几个州上。"
        }
      ]
    },
    "title": "总统大选：你决定参选",
    "body": "历史上只有极少数人走到这一步。你需要全国的钱、全国的票、全国的运气。",
    "choices": [
      {
        "id": "run",
        "text": "全力冲刺白宫",
        "req": {
          "rep": 6,
          "fun": 25
        },
        "base": 0.4,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你赢了。历史翻开了新的一页，而你在那一页的最上面。",
            "effects": {
              "tier": 1,
              "rep": 2.25,
              "fac": {
                "base": 20,
                "press": 15
              },
              "flags": [
                "president"
              ]
            }
          },
          "ok": {
            "body": "你赢得大选，成为美国总统。",
            "effects": {
              "tier": 1,
              "rep": 1.75,
              "fac": {
                "base": 12
              },
              "flags": [
                "president"
              ]
            }
          },
          "meh": {
            "body": "你赢了，但只赢了一届，且被丑闻笼罩。",
            "effects": {
              "tier": 1,
              "rep": 1,
              "flags": [
                "president",
                "scandal_3"
              ]
            }
          },
          "fail": {
            "body": "你输掉了大选，但你已经写进了历史。",
            "effects": {
              "rep": 1
            }
          },
          "critfail": {
            "body": "你惨败，且竞选中的旧案被全面翻出。",
            "effects": {
              "rep": -1,
              "flags": [
                "scandal_4",
                "investigation_open"
              ]
            }
          }
        }
      },
      {
        "id": "step_aside",
        "text": "退居幕后，支持别人上台",
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你扶植的候选人获胜，你成了真正的造王者。",
            "effects": {
              "rep": 1,
              "fac": {
                "establishment": 18
              },
              "fav": 5,
              "flags": [
                "kingmaker"
              ]
            }
          },
          "ok": {
            "body": "你的人赢了，你分到了一杯羹。",
            "effects": {
              "rep": 0.7,
              "fac": {
                "establishment": 10
              },
              "fav": 3
            }
          },
          "meh": {
            "body": "你的人赢了，却把你忘了。",
            "effects": {
              "fac": {
                "establishment": 4
              }
            }
          },
          "fail": {
            "body": "你押错了人。",
            "effects": {
              "fac": {
                "establishment": -8
              },
              "rep": -0.3
            }
          },
          "critfail": {
            "body": "你扶持的人在胜选后反手清算你。",
            "effects": {
              "fac": {
                "establishment": -15,
                "base": -8
              },
              "rep": -0.7
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_appoint",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "boon", dyn: true,
    "tierRaw": true,
    "tierMin": 4,
    "tierMax": 7,
    "minTenure": 20,        // 委任轨道中途的破格提拔（与 tierGates 同调）
    "weight": 16,
    "brief": {
      "lede": "一个不需要选举的位置出现了。它只需要一个人点头。",
      "known": [
        "委任职位由行政首长或部门任命，不需要选民投票，也不需要筹款。",
        "它通常需要经过背景审查、财务披露，有时还需要参议院确认。",
        "它给你实权，但不给你民意基础——一旦任命你的人离开，你就会跟着失去一切。",
        "推荐你的那个人，会一直在你档案里。"
      ],
      "rumor": [
        "有人说这个位置已经有内定人选，你只是陪跑。",
        "有人说推荐你的人正在跟另一个派系做交换，你只是其中一张牌。",
        "有人说这个部门最近在处理一些不想被公开的事。"
      ],
      "unknown": [
        "你会不会在任上被卷入某件与你无关的事。",
        "这份资历能带你走多远。",
        "推荐你的人将来会向你索要什么。"
      ],
      "terms": [
        {
          "k": "委任",
          "v": "由行政或部门直接任命职位，不经选举，是专业型政治人物的主要上升路径。"
        },
        {
          "k": "背景审查",
          "v": "任命前对财务、履历、社会关系的全面调查，任何隐瞒都会导致资格被取消。"
        },
        {
          "k": "参议院确认",
          "v": "部分高级职位需经参议院表决通过才能就任。"
        }
      ]
    },
    "tracks": [
      "appointment"
    ],
    "title": "有一个任命职位要交到你手上",
    "body": "总统（或州长）手里有个位子：法官、监管委员会、或者内阁次长。他们想找一个‘靠得住又不多事’的人。",
    "choices": [
      {
        "id": "accept",
        "text": "接受任命，走技术官僚的路",
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "INT",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "任命通过，你手握实权，且不需竞选也能掌权。",
            "effects": {
              "tier": 1,
              "rep": 2,
              "fac": {
                "establishment": 14
              }
            }
          },
          "ok": {
            "body": "你拿到了位置。",
            "effects": {
              "tier": 1,
              "rep": 1.25,
              "fac": {
                "establishment": 8
              },
              "fav": -1
            }
          },
          "meh": {
            "body": "你上位了，但欠了举荐人一个大人情。",
            "effects": {
              "tier": 1,
              "rep": 0.8,
              "fav": -2
            }
          },
          "fail": {
            "body": "提名被否，你空欢喜一场。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "establishment": -4
              }
            }
          },
          "critfail": {
            "body": "你的资质被公开质疑，听证会上出丑。",
            "effects": {
              "rep": -1.25,
              "fac": {
                "press": -10,
                "establishment": -8
              }
            }
          }
        }
      },
      {
        "id": "refuse",
        "text": "拒绝，继续走选举路线",
        "base": 0.7,
        "mods": [
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的‘不为官位所动’赢得基层敬佩。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "base": 12
              },
              "attr": {
                "INTG": 3
              }
            }
          },
          "ok": {
            "body": "你留在了自己选择的路上。",
            "effects": {
              "fac": {
                "base": 5
              }
            }
          },
          "meh": {
            "body": "你错过了捷径。",
            "effects": {
              "fac": {
                "base": 2
              }
            }
          },
          "fail": {
            "body": "举荐人觉得你不识抬举。",
            "effects": {
              "fac": {
                "establishment": -6
              }
            }
          },
          "critfail": {
            "body": "你得罪了整个委任体系，从此无缘内阁。",
            "effects": {
              "fac": {
                "establishment": -14
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_kingmaker",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 3,
    "tierMax": 6,
    "minTenure": 24,        // 操盘轨道：让别人当选换来的级（与 tierGates 同调）
    "weight": 16,
    "brief": {
      "lede": "你手里有一个人。他自己还不知道他是一张牌。",
      "known": [
        "操盘者的权力不来自选票，而来自信息、资金和时机。",
        "一个成功的候选人背后，通常有一个决定他什么时候说、说什么、对谁说的人。",
        "你选中的这个人可能是别人挑剩的——正因为他不耀眼，才轮得到你。",
        "你投入的是你的判断力。如果错了，你失去的是所有人对你的信任。"
      ],
      "rumor": [
        "有人说另一个操盘手也在看同一个人，而且手上的钱更多。",
        "有人说这个人自己有一份没说出口的野心，时机到了会翻脸。",
        "有人说这一场选战真正的胜负，会在投票前一周的一次意外里决定。"
      ],
      "unknown": [
        "你培养出来的人会不会把你一脚踢开。",
        "你会不会在某个时刻意识到，你更想自己站上去。",
        "造王者这三个字，最后会被刻在谁的名字旁边。"
      ],
      "terms": [
        {
          "k": "操盘",
          "v": "不自己参选，通过组织、筹款与议题设置使他人当选，从而获得影响力。"
        },
        {
          "k": "造王者",
          "v": "在党内提名或关键人事决定上拥有决定性影响力的人物。"
        },
        {
          "k": "议题设置",
          "v": "决定这一场选举「在谈什么」的能力，往往比候选人的立场更关键。"
        }
      ]
    },
    "tracks": [
      "operative"
    ],
    "title": "你不参选，转而决定谁能获得提名",
    "body": "你不打算自己参选。你打算决定别人能不能参选。",
    "choices": [
      {
        "id": "run_it",
        "text": "亲自操盘一场关键选举",
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.6
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的人大胜，所有人开始排队求你的电话。",
            "effects": {
              "tier": 1,
              "rep": 2.5,
              "fac": {
                "establishment": 14,
                "press": 8
              },
              "fav": 3
            }
          },
          "ok": {
            "body": "你的人赢了，你的影子更深了。",
            "effects": {
              "tier": 1,
              "rep": 1.5,
              "fac": {
                "establishment": 10
              },
              "fav": 2
            }
          },
          "meh": {
            "body": "你的人赢了，但你成了众矢之的。",
            "effects": {
              "tier": 1,
              "rep": 1,
              "fac": {
                "base": -8,
                "establishment": 6
              }
            }
          },
          "fail": {
            "body": "你搞砸了，客户流失。",
            "effects": {
              "rep": -0.6,
              "fac": {
                "establishment": -6
              }
            }
          },
          "critfail": {
            "body": "你操盘的丑闻曝光，被行业封杀。",
            "effects": {
              "rep": -1.5,
              "fac": {
                "press": -15,
                "establishment": -12
              },
              "flags": [
                "scandal_3"
              ]
            }
          }
        }
      },
      {
        "id": "stay_low",
        "text": "低调布局，不站到台前",
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你无声地织了一张网，几年后人人都在网里。",
            "effects": {
              "tier": 1,
              "rep": 1.25,
              "fac": {
                "establishment": 10
              },
              "fav": 3
            }
          },
          "ok": {
            "body": "你的影响力稳步增长。",
            "effects": {
              "rep": 0.8,
              "fac": {
                "establishment": 6
              },
              "fav": 2
            }
          },
          "meh": {
            "body": "进展缓慢，但没风险。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "establishment": 3
              }
            }
          },
          "fail": {
            "body": "你被更年轻的操盘手取代。",
            "effects": {
              "rep": -0.4
            }
          },
          "critfail": {
            "body": "有人识破了你的布局，反将你一军。",
            "effects": {
              "rep": -1.25,
              "fac": {
                "establishment": -10
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_magnate",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 3,
    "tierMax": 6,
    "minTenure": 24,        // 财富轨道：用钱改写一场选举（与 tierGates 同调）
    "weight": 16,
    "brief": {
      "lede": "有人拿着一张纸来找你。上面写着：钱可以这样花。",
      "known": [
        "这是新的玩法：一个名义上独立于候选人的委员会，可以接受几乎无限额的捐款。",
        "它不能直接与候选人协调，但可以做广告、可以做地面动员，可以说任何话。",
        "捐款人的名字会被公开——但公开，很多人在这个年份并不介意。",
        "钱能买到曝光，买不到信任。但曝光够多的时候，两者会变得难以区分。"
      ],
      "rumor": [
        "有人说监管机构正在争论这群组织的合法性，结论会在下一次裁决里出现。",
        "有人说几家大公司已经准备好资金，只等一个「值得投的人」。",
        "有人提醒你：一旦你收下这笔钱，你就不再是一个人的候选人。"
      ],
      "unknown": [
        "这些钱背后的人，将来会向你要什么。",
        "这条路会不会在某一天被一条新的规则堵死。",
        "你会不会最终发现，你其实是在为一个你没有见过的人工作。"
      ],
      "terms": [
        {
          "k": "超级政治行动委员会",
          "v": "可接受无上限捐款、独立于竞选活动的政治支出组织，不得与候选人直接协调。"
        },
        {
          "k": "独立支出",
          "v": "组织自行花钱支持或反对某个候选人，法律上不视为对竞选的捐款。"
        },
        {
          "k": "披露",
          "v": "向监管机构公开捐款人名单的义务。公开并不等于有人看。"
        }
      ]
    },
    "tracks": [
      "wealth"
    ],
    "title": "超级政治行动委员会",
    "body": "你不需要选票，你只需要支票簿。一千万美元，足以让任何一场地方选举按你的剧本走。",
    "choices": [
      {
        "id": "spend",
        "text": "砸下巨资，改写一场选举",
        "req": {
          "fun": 28
        },
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "commercial",
            "w": 0.4
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的钱选出了想要的议员，从此国会有你的回音。",
            "effects": {
              "tier": 1,
              "rep": 2,
              "fac": {
                "commercial": 20,
                "establishment": 8
              },
              "fav": 2
            }
          },
          "ok": {
            "body": "你买到了影响力。",
            "effects": {
              "tier": 1,
              "rep": 1.25,
              "fac": {
                "commercial": 14
              },
              "fun": -22
            }
          },
          "meh": {
            "body": "钱花了，对方当选却翻脸不认人。",
            "effects": {
              "tier": 1,
              "rep": 0.6,
              "fun": -28,
              "fac": {
                "commercial": 6
              }
            }
          },
          "fail": {
            "body": "你押错了人，钱打了水漂。",
            "effects": {
              "fun": -22,
              "fac": {
                "commercial": -6
              }
            }
          },
          "critfail": {
            "body": "你的资金被查出违规来源，联邦调查局介入。",
            "effects": {
              "fun": -14,
              "flags": [
                "scandal_3",
                "investigation_open",
                "launder"
              ]
            }
          }
        }
      },
      {
        "id": "buy_media",
        "text": "转而收购一家媒体",
        "req": {
          "fun": 55.5
        },
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "commercial",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你拥有了话语权本身。从今往后，新闻的走向由你定。",
            "effects": {
              "tier": 1,
              "rep": 2.75,
              "fac": {
                "commercial": 18,
                "press": -8
              },
              "flags": [
                "owns_media"
              ]
            }
          },
          "ok": {
            "body": "你买下了一家濒死的报纸，它开始为你说话。",
            "effects": {
              "tier": 1,
              "rep": 1.5,
              "fac": {
                "commercial": 12
              },
              "fun": -55.5,
              "flags": [
                "owns_media"
              ]
            }
          },
          "meh": {
            "body": "收购完成，但读者流失严重。",
            "effects": {
              "tier": 1,
              "rep": 1,
              "fun": -69.5,
              "fac": {
                "press": -10
              }
            }
          },
          "fail": {
            "body": "交易被反垄断部门盯上。",
            "effects": {
              "fun": -28,
              "flags": [
                "investigation_open"
              ]
            }
          },
          "critfail": {
            "body": "收购失败，还暴露了你的资金来源。",
            "effects": {
              "flags": [
                "scandal_4",
                "investigation_open"
              ]
            }
          }
        }
      },
      {
        "id": "handshake",
        "text": "不碰那笔钱，只用手上这点人情换一个承诺",
        "base": 0.35,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你没花一分钱，只把三方的人凑到一张桌上谈了一晚。第二天，那个席位的人选变了。",
            "effects": {
              "tier": 1,
              "rep": 1.75,
              "fav": 1,
              "fac": {
                "base": 8,
                "establishment": 6
              }
            }
          },
          "ok": {
            "body": "你靠人情把一件小事办成了，知道这件事的人不多，但都是关键的人。",
            "effects": {
              "tier": 1,
              "rep": 1,
              "fac": {
                "establishment": 5
              }
            }
          },
          "meh": {
            "body": "桌上的人笑着答应了，散场后谁也没动。",
            "effects": {
              "rep": 0.2,
              "fav": -1
            }
          },
          "fail": {
            "body": "你把人情用光了，却什么也没换到。有人开始觉得你只会空谈。",
            "effects": {
              "rep": -0.8,
              "fav": -2,
              "fac": {
                "commercial": -8
              }
            }
          },
          "critfail": {
            "body": "那晚的话被传了出去——你想用关系摆平一场选举。所有人都在装没听见，但都记住了。",
            "effects": {
              "rep": -1.5,
              "fac": {
                "commercial": -12,
                "press": -6
              },
              "flags": [
                "scandal_2"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "prog_star",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "boon", dyn: true,
    "tierRaw": true,
    "tierMin": 2,
    "tierMax": 5,
    "minTenure": 30,        // 名人轨道：名气走在职位前面（与 tierGates 同调）
    "weight": 16,
    "brief": {
      "lede": "你的名字比你的头衔更响。这既是资产，也是麻烦。",
      "known": [
        "你现在被认出来的次数，超过了你的职位应得的程度。",
        "名气可以直接换成选票，也可以直接换成钱，但两条路通向不同的地方。",
        "名声是最容易贬值的资产——它需要不断供给新的内容，否则会消散。",
        "你身边的人开始分为两类：一类在保护你，一类在使用你。"
      ],
      "rumor": [
        "有人说你已经被某个更大的名利场盯上了。",
        "有人说你上个月的那次曝光，让某些真正有权的人感到了不舒服。",
        "有人说你的名气已经开始脱离你的控制，自己生长。"
      ],
      "unknown": [
        "当你需要它的时候，名声还在不在。",
        "你有没有一天会为了它，做出不像自己的事。",
        "它会把你推向更高的位置，还是让你停在原地看着别人上去。"
      ],
      "terms": [
        {
          "k": "名人轨道",
          "v": "依靠公众知名度而非党内机器获得政治影响力的路径，可以绕过传统的爬升台阶。"
        },
        {
          "k": "曝光",
          "v": "媒体出现的频次与方式。它既是资源也是风险，因为注意力可以随时转移。"
        },
        {
          "k": "人设",
          "v": "公众对你的固定印象。它一旦形成，就很难被你自己改变。"
        }
      ]
    },
    "tracks": [
      "celebrity"
    ],
    "title": "你的名声超过了你的职位",
    "body": "电视节目、畅销书、全国巡讲。你还没有实权，但你已经有‘群众’了。",
    "choices": [
      {
        "id": "ride",
        "text": "乘势而上，把名气变成政治资本",
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.6
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的巡回演讲场场爆满，‘人民的人’人设立住了。",
            "effects": {
              "tier": 1,
              "rep": 3,
              "fac": {
                "base": 18
              },
              "fun": 11
            }
          },
          "ok": {
            "body": "你的人气持续攀升。",
            "effects": {
              "tier": 1,
              "rep": 2,
              "fac": {
                "base": 12
              },
              "fun": 5.5
            }
          },
          "meh": {
            "body": "热度有了，但被建制派讥为‘娱乐明星’。",
            "effects": {
              "tier": 1,
              "rep": 1.25,
              "fac": {
                "base": 10,
                "establishment": -10
              }
            }
          },
          "fail": {
            "body": "观众疲劳，热度下滑。",
            "effects": {
              "rep": -0.4,
              "fac": {
                "base": -4
              }
            }
          },
          "critfail": {
            "body": "你在直播中失言，人设崩塌。",
            "effects": {
              "rep": -1.5,
              "fac": {
                "base": -14,
                "press": -12
              },
              "flags": [
                "scandal_2"
              ]
            }
          }
        }
      },
      {
        "id": "cash",
        "text": "先把名气变现",
        "base": 0.48,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你赚得盆满钵满，且没人觉得你俗。",
            "effects": {
              "fun": 41.5,
              "rep": 1
            }
          },
          "ok": {
            "body": "出书、代言、演讲费，钱包鼓了。",
            "effects": {
              "fun": 25,
              "rep": 0.4
            }
          },
          "meh": {
            "body": "你赚了钱，但被批‘消费政治’。",
            "effects": {
              "fun": 14,
              "fac": {
                "press": -6,
                "base": -4
              }
            }
          },
          "fail": {
            "body": "变现失败，还被指割韭菜。",
            "effects": {
              "rep": -0.6,
              "fac": {
                "base": -8
              }
            }
          },
          "critfail": {
            "body": "你的‘致富课’被查出传销性质，检方介入。",
            "effects": {
              "fun": -8.5,
              "flags": [
                "scandal_3",
                "investigation_open"
              ]
            }
          }
        }
      }
    ]
  },

  /* ===== 桥接台阶：把旧 6 档的稀疏台阶补成连续 10 级（等级2→3、等级4→5、等级5→6、等级8→9） ===== */
  {
    "id": "prog_city",
    "grade": "minor",
    "category": "career",
    "unique": false,        // 市议员=大多数人应能抵达的基线：可重试，难度墙砌在它之上
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 1,
    "tierMax": 1,        // 等级2（地方党务）触发；第一次选上公职，升 等级3 市议员
    "minTenure": 10,        // 与 balance.tierGates 同调
    "weight": 18,
    "brief": {
      "lede": "党务干得再久，名字也只在党的名册上。要让它出现在选票上，你得去争一个真正的席位。",
      "known": [
        "市议员多为兼职，津贴不高，但它是第一个‘代表一城人’的职务。",
        "市的议题很具体：警察、消防、分区、垃圾清运——每一件都有人为你记一辈子。",
        "党内需要一个熟悉基层的人去占住这个位子，你已经干了几年党务，他们开始考虑你。"
      ],
      "rumor": [
        "有人说现任市长跟本地开发商走得近，这个位子未必有人真心想守。",
        "有人说你只要出面，党的捐款人就会跟上一小笔。"
      ],
      "unknown": [
        "你是在为自己参选，还是在替党务机器占位。",
        "第一次拥有实权，会让你更谨慎，还是更激进。"
      ],
      "terms": [
        { "k": "市议会", "v": "市的立法机关，管预算、分区与地方条例，是地方政治最常见的实权起点。" },
        { "k": "兼职议员", "v": "许多市的议员是兼职，有本职工作，靠津贴与名誉支撑。" }
      ]
    },
    "title": "市议会的一个席位",
    "body": "从党的干部变成民选的公职人员，这一步跨过去，你才算真正上了牌桌。",
    "choices": [
      {
        "id": "run",
        "text": "争取党内提名，参选市议员",
        "base": 0.5,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "establishment", "w": 0.3 }
        ],
        "stake": { "fun": true },
        "outcomes": {
          "crit": { "body": "党内顺利背书，你以高票当选市议员。", "effects": { "tier": 1, "rep": 2.5, "fac": { "establishment": 8, "base": 6 } } },
          "ok": { "body": "你赢下了这个席位，第一次成为民选官员。", "effects": { "tier": 1, "rep": 1.5, "fac": { "establishment": 5 } } },
          "meh": { "body": "你险胜，但欠了党机器一份人情。", "effects": { "tier": 1, "rep": 0.8, "fav": -1 } },
          "fail": { "body": "你输了，但在地方上露了脸。", "effects": { "rep": 1 } },
          "critfail": { "body": "惨败，党内开始怀疑你的号召力。", "effects": { "rep": -1.25, "fac": { "establishment": -6 } } }
        }
      },
      {
        "id": "selfrun",
        "text": "不靠党机器，自己拉一支志愿者队伍选",
        "base": 0.42,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "base", "w": 0.4 }
        ],
        "outcomes": {
          "crit": { "body": "草根的奇迹：你绕开党机器，靠双腿跑赢了选举。", "effects": { "tier": 1, "rep": 3, "fac": { "base": 12 }, "voters": { "diehard": 400, "warm": 200 } } },
          "ok": { "body": "你当选了，代价是从此被党里当成‘不好管的人’。", "effects": { "tier": 1, "rep": 1.5, "fav": -1, "fac": { "base": 8, "establishment": -5 }, "voters": { "diehard": 200 } } },
          "meh": { "body": "你赢了，但队伍散得比组建还快，欠下的人情要一张张去还。", "effects": { "tier": 1, "rep": 0.7, "fav": -2, "fac": { "base": 2 }, "voters": { "diehard": 60 } } },
          "fail": { "body": "没有机器的选举终究太难，你差了一截，垫付的积蓄也见了底。", "effects": { "rep": 0.5, "fav": -1, "fun": -0.5, "fac": { "base": 4 } } },
          "critfail": { "body": "你输了，还落得孤立。", "effects": { "rep": -1, "fav": -1, "fac": { "base": -4, "establishment": -2 } } }
        }
      }
    ]
  },
  {
    "id": "prog_upper",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 3,
    "tierMax": 3,        // 等级4（州众议员）触发；升 等级5 州参议员
    "minTenure": 18,        // 与 balance.tierGates 同调
    "weight": 15,
    "brief": {
      "lede": "众议院的资历攒够了，党里有人暗示你：参议院那张桌子可以给你留个位置。",
      "known": [
        "州参议员比众议员更少、更稳，每一个席位都对应更大的选区。",
        "参院握有人事与预算的确认权，是通往全州职务的中间站。",
        "空出的席位往往由党内大佬先过一遍目——你得到场，也得有人替你说话。"
      ],
      "rumor": [
        "有人说这个位子早被内定给一位捐得更多的人。",
        "有人说现任者想退休，但没跟任何人说过。"
      ],
      "unknown": [
        "从多数党里的小角色，到少数人之一的参议员，别人对你的眼光会怎么变。",
        "你会不会为了这张桌子，欠下一个还不清的人情。"
      ],
      "terms": [
        { "k": "州参议院", "v": "州议会上院，席位更少、任期更长，握有确认与预算的关键权力。" }
      ]
    },
    "title": "本区州参议院的席位空了出来，等你去争",
    "body": "从‘一名州众议员’变成‘本区参议员’，选区更大，赌注也更大。",
    "choices": [
      {
        "id": "run",
        "text": "争取提名，竞选州参议员",
        "req": { "rep": 5 },
        "base": 0.48,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "establishment", "w": 0.3 }
        ],
        "outcomes": {
          "crit": { "body": "大佬替你开了口，党机器全速运转，你顺利入主参院。", "effects": { "tier": 1, "rep": 3, "fac": { "establishment": 10 } } },
          "ok": { "body": "你当选州参议员，进入了州议会的上院。", "effects": { "tier": 1, "rep": 1.75, "fac": { "establishment": 6 } } },
          "meh": { "body": "你赢了，但为了让大佬助你，你许下了几个不太好兑现的承诺。", "effects": { "tier": 1, "rep": 0.9, "fac": { "establishment": 4 }, "flags": ["compromised"] } },
          "fail": { "body": "你输了，但已经是州里有名有姓的人物。", "effects": { "rep": 1.25 } },
          "critfail": { "body": "惨败，党内改推了别人，你被冷处理。", "effects": { "rep": -1.25, "fac": { "establishment": -8 } } }
        }
      },
      {
        "id": "hold",
        "text": "不冒险，继续在众院深耕资历",
        "base": 0.65,
        "mods": [{ "src": "fac", "key": "establishment", "w": 0.3 }],
        "outcomes": {
          "crit": { "body": "你成了委员会里最懂某块业务的人，说话开始有分量。", "effects": { "rep": 1.25, "fac": { "establishment": 8 }, "fav": 2 } },
          "ok": { "body": "你稳稳地攒着资历。", "effects": { "fac": { "establishment": 5 } } },
          "meh": { "body": "你守住了位子，也守住了天花板。", "effects": { "fac": { "establishment": 2 } } },
          "fail": { "body": "有人觉得你安于现状。", "effects": { "rep": -0.3 } },
          "critfail": { "body": "错过这一波，下次不知要等多久。", "effects": { "rep": -0.6, "fac": { "establishment": -4 } } }
        }
      }
    ]
  },
  {
    "id": "prog_stwide",
    "grade": "mid",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 4,
    "tierMax": 4,        // 等级5（州参议员）触发；升 等级6 全州公职（州总检察官/州级大员）
    "minTenure": 20,        // 与 balance.tierGates 同调
    "weight": 15,
    "brief": {
      "lede": "要在一个选区里赢是一回事，要让全州的人都认识你是另一回事。",
      "known": [
        "全州公职——州总检察长、州务卿、州财务官——由整个州投票选出，名字要出现在每一张州选票上。",
        "这一步是从‘地方人物’变成‘全州人物’的分水岭，也是通往联邦与全国舞台的跳板。",
        "竞选全州职务意味着高昂的广告与差旅，钱从这一刻起变成硬门槛。"
      ],
      "rumor": [
        "有人说现任的州级大员要转战联邦，这个位子在空。",
        "有人说对手阵营已经筹到了你两倍的款。"
      ],
      "unknown": [
        "全州曝光带来的，是机会还是靶子。",
        "为打这场选战，你要向谁借钱、又是欠谁的人情。"
      ],
      "terms": [
        { "k": "全州公职", "v": "由整个州选民选出的行政或检察职务（如州总检察长），是从地方通往全国的关键台阶。" }
      ]
    },
    "title": "把版图扩大到全州",
    "body": "一个全州性的职位出现了。拿下它，你就再不是某一区的人了。",
    "choices": [
      {
        "id": "run",
        "text": "竞选全州公职",
        "req": { "rep": 5, "fun": 6 },
        "base": 0.46,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "press", "w": 0.3 }
        ],
        "outcomes": {
          "crit": { "body": "你的名字上了全州的选票，也赢了整个州。", "effects": { "tier": 1, "rep": 3, "fac": { "press": 10, "base": 6 } } },
          "ok": { "body": "你当选州级公职，正式成为全州人物。", "effects": { "tier": 1, "rep": 1.75, "fac": { "press": 5 } } },
          "meh": { "body": "你赢了，但竞选债压得你喘不过气。", "effects": { "tier": 1, "rep": 0.9, "fun": -7 } },
          "fail": { "body": "你输了，但全州都认识了你的名字。", "effects": { "rep": 1.5, "fun": -3 } },
          "critfail": { "body": "惨败，竞选财务还被翻了个底朝天。", "effects": { "rep": -1.25, "fun": -6, "flags": ["scandal_2", "investigation_open"] } }
        }
      },
      {
        "id": "wait",
        "text": "这次不上，先攒资历和人脉",
        "base": 0.6,
        "mods": [{ "src": "fac", "key": "establishment", "w": 0.3 }],
        "outcomes": {
          "crit": { "body": "你躲开了一场本就赢不了的硬仗，保住了实力。", "effects": { "rep": 1, "fac": { "establishment": 8 }, "fav": 2 } },
          "ok": { "body": "你按兵不动，等着更合适的时机。", "effects": { "fac": { "establishment": 4 } } },
          "meh": { "body": "错过一次，机会可能不再来。", "effects": {} },
          "fail": { "body": "别人上了车，你还在站台上。", "effects": { "rep": -0.4 } },
          "critfail": { "body": "被视为难当大任，党里转向力捧别人。", "effects": { "rep": -0.8, "fac": { "establishment": -6 } } }
        }
      }
    ]
  },
  {
    "id": "prog_vp",
    "grade": "major",
    "category": "career",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 7,
    "tierMax": 7,        // 等级8（联邦参议员/州长）触发；升 等级9 副总统/总统候选人
    "minTenure": 34,        // 与 balance.tierGates 同调
    "weight": 16,
    "brief": {
      "lede": "你已经站在了全国舞台的中央。现在有一个更高的电话在响。",
      "known": [
        "到大选年，领跑者会挑选竞选伙伴——一张副总统的选票，或一个全国性的枢机职位。",
        "副总统候选人的遴选看的是互补：地理、派系、性别、经验，一样样地配。",
        "这通电话既可能把你推上权力顶点，也可能让你在聚光灯下被反复审视。"
      ],
      "rumor": [
        "有人说候选名单已经内定，你只是被拿来平衡某个派系。",
        "有人说对手已经准备好一叠关于你的黑材料。"
      ],
      "unknown": [
        "站上这个舞台，会不会是你政治生命的最高点。",
        "你愿意为了这张票，替别人的议程背书到什么程度。"
      ],
      "terms": [
        { "k": "竞选伙伴", "v": "候选人挑选的副手，用于平衡选票与派系，正式成为副总统/总统候选人。" }
      ]
    },
    "title": "有人请你出马竞选副总统",
    "body": "一个全国性的位置在向你招手：入局，或保持独立、坐等下一轮。",
    "choices": [
      {
        "id": "accept",
        "text": "接受征召，成为总统候选人／副手",
        "req": { "rep": 6, "fun": 8 },
        "base": 0.5,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "establishment", "w": 0.3 }
        ],
        "outcomes": {
          "crit": { "body": "你被正式提名，名字与总统之位并列，全国瞩目。", "effects": { "tier": 1, "rep": 3, "fac": { "establishment": 12, "press": 8 } } },
          "ok": { "body": "你成了总统候选人／副手，站进了权力中枢。", "effects": { "tier": 1, "rep": 2, "fac": { "establishment": 8 } } },
          "meh": { "body": "你上了名单，但成了替罪羊，要为别人的失误埋单。", "effects": { "tier": 1, "rep": 0.8, "fac": { "establishment": -4 } } },
          "fail": { "body": "你落选了副手之位，但已是全国性重量级人物。", "effects": { "rep": 1.25 } },
          "critfail": { "body": "遴选会上被当众拒绝，难堪传遍全国。", "effects": { "rep": -1.25, "fac": { "establishment": -8, "press": -6 } } }
        }
      },
      {
        "id": "stay",
        "text": "婉拒征召，守住自己的独立地位",
        "base": 0.55,
        "mods": [{ "src": "attr", "key": "INTG", "w": 0.3 }],
        "outcomes": {
          "crit": { "body": "你保持独立的姿态赢得尊重，党里把你当成各方都想拉拢的关键人物。", "effects": { "rep": 1.5, "attr": { "INTG": 3 }, "fac": { "base": 8 } } },
          "ok": { "body": "你没当任何人的副手，声望反而更硬。", "effects": { "rep": 1, "fac": { "base": 4 } } },
          "meh": { "body": "你守住了一身干净，也错过了一班快车。", "effects": { "rep": 0.3 } },
          "fail": { "body": "两边都不再把你当自己人。", "effects": { "fac": { "establishment": -5 } } },
          "critfail": { "body": "你以为的独立，被人读成了傲慢。", "effects": { "rep": -0.8, "fac": { "establishment": -6, "base": -4 } } }
        }
      }
    ]
  }
]);
