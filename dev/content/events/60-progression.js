/* ============================================================================
 * CONTENT · 60-progression.js
 * 跨时代通用的晋升事件链（每一条对应一次层级跃迁或轨道里程碑）。
 * 事件结构见 docs/CONTENT-SCHEMA.md
 * ==========================================================================*/

POTUS.define("event", [
  {
    "id": "prog_council",
    "grade": "minor",
    "category": "campaign",
    "unique": false,
    valence: "risk", dyn: true,
    "tierRaw": true,     // 晋升脊柱：按新 10 级空间直接判定，不走 tierBand 铺档（跨时代通用——任何时代都要能迈出第一步）
    "tierMin": 0,
    "tierMax": 0,        // 等级1（志愿者）触发；第一次参选，升 等级2 地方党务
    "minTenure": 8,        // 在当前级蹲够这么多个月才有资格（与 balance.tierGates 同调）
    "weight": 20,
     "brief": {
      "lede": "第一次有人认真地对你说：把你的名字印在选票上。",
      "known": [
        "地方选举投票率极低，几百张动员票就能定结果。",
        "报名需要押金、签名和公开的财务申报。",
        "对手可能是干了多年的现任，邻居都认识他。"
      ],
      "rumor": [
        "有人说现任早就不想干了，只是没人接。",
        "有人说本地企业愿出资，条件是别碰他们许可。"
      ],
      "unknown": [
        "这会不会是你整个生涯最干净的一步。",
        "之后每次往上走你要付出什么。"
      ]
    },
    "title": "第一次把自己的名字放上选票",
    "body": "选区不大，但这是从‘帮忙的人’变成‘候选人’的那一步。你要么从此有了自己的地盘，要么被打回原点。",
    "choices": [
      {
        "id": "doorknock",
        "text": "逐门逐户敲门，靠双腿跑票",
        "ballot": true,
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
        "ballot": true,
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
          },
          { "src": "res", "key": "fun", "min": 5.5, "w": 0.05 }
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
    "category": "campaign",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 2,
    "tierMax": 2,        // 等级3（市议员）触发；进州议会，升 等级4 州众议员
    "minTenure": 12,        // 与 balance.tierGates 同调
    "weight": 16,
    "brief": {
      "lede": "州议会空了个位子。有人劝你去填。",
      "known": [
        "州议会管本州预算和选区划分，是通往联邦的标准跳板。",
        "空缺可能由补选或党内提名填补，规则各州不同。",
        "党组织负责人认识你，但只认识一半。"
      ],
      "rumor": [
        "有人说这席是某位大佬替人留的。",
        "有人说选区边界明年要重划，谁在里面都说不准。"
      ],
      "unknown": [
        "你要放弃多少现在拥有的东西。",
        "几年后重划会不会让这席消失。"
      ],
      "terms": [
        { "k": "补选", "v": "因在任者离职而举行的临时选举。" }
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
        "ballot": true,
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
    "category": "campaign",
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
        "众议员任期两年，一当选就要准备下一场。",
        "在任者有曝光、筹款和免费通讯的结构性优势。",
        "如果他退，机会变真实；如果他选连任，你得先搬翻他。"
      ],
      "rumor": [
        "有人说现任正在被一桩旧事缠住，还没公开。",
        "有人说党内高层更愿意推另一个人。"
      ],
      "unknown": [
        "进了华盛顿你会变成什么样。",
        "两年一圈的竞选会不会把你耗干。"
      ],
      "terms": [
        { "k": "在任者优势", "v": "现任议员的曝光筹款优势，连任率极高。" }
      ]
    },
    "title": "联邦众议员的机会",
    "body": "华盛顿的席位空了。所有地方政客都在盯着它。",
    "choices": [
      {
        "id": "run",
        "text": "冲进全国舞台",
        "req": { "rep": 5 },
        "ballot": true,
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
          },
          { "src": "res", "key": "fun", "min": 5.5, "w": 0.05 }
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
    "category": "campaign",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 6,
    "tierMax": 6,        // 等级7（联邦众议员）触发；升 等级8 联邦参议员 / 州长
    "minTenure": 28,        // 与 balance.tierGates 同调
    "weight": 14,
    "brief": {
      "lede": "参议员和州长，两条路都摆在面前。",
      "known": [
        "参议院任期六年、全国平台；州长任期四年、签字即改变生活。",
        "两者都是通往最高位的标准路径，但走法完全不同。",
        "参议员在全国性资本里游泳；州长和本地利益集团打交道。"
      ],
      "rumor": [
        "全国委员会希望你选参议员，那席位现在空不出人。",
        "州长那条路更安全，对手会先自相残杀。"
      ],
      "unknown": [
        "哪条路会让你得罪真正掌握资源的人。",
        "你会成为立法者还是行政者。"
      ],
      "terms": [
        { "k": "州长", "v": "各州行政首长，掌预算执行与人事任命。" }
      ]
    },
    "title": "参议员 / 州长：二选一",
    "body": "两条路，都通向国家权力核心，但代价不同。",
    "choices": [
      {
        "id": "senate",
        "text": "竞选联邦参议员（全国舞台）",
        "req": { "rep": 4.5 },
        "ballot": true,
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
          },
          { "src": "res", "key": "fun", "min": 6.5, "w": 0.05 }
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
        "req": { "rep": 4 },
        "ballot": true,
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
          },
          { "src": "res", "key": "fun", "min": 5, "w": 0.05 }
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
        "ballot": true,
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
              "count": { "wrath_money": 8 },
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
    "category": "campaign",
    "unique": true,
    valence: "risk", dyn: true,
    "tierRaw": true,
    "tierMin": 8,
    "tierMax": 8,        // 等级9（总统候选人）触发；问鼎白宫，升 等级10 总统
    "minTenure": 40,        // 与 balance.tierGates 同调
    "weight": 30,
     "brief": {
      "lede": "所有人都在看着你。你要不要说那句话。",
      "known": [
        "宣布窗口在选举年前一年冬天到初夏，太早会被消耗。",
        "早期几个州的结果对后续筹款影响巨大。",
        "大选阶段钱会经你无法追踪的路径涌进来。"
      ],
      "rumor": [
        "几位大捐款人已定好人选，正在等人开口。",
        "对手手里有一份关于你的材料。"
      ],
      "unknown": [
        "这条路走到底会改变你多少。",
        "输了之后还剩下什么。"
      ],
      "terms": [
        { "k": "选举人团", "v": "选民选选举人，再由选举人投票选总统。" }
      ]
    },
    "title": "总统大选：你决定参选",
    "body": "历史上只有极少数人走到这一步。你需要全国的钱、全国的票、全国的运气。",
    "choices": [
      {
        "id": "run",
        "text": "全力冲刺白宫",
        "req": { "voterShare": 0.12 },
        "ballot": true,
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
          },
          { "src": "res", "key": "fun", "min": 25, "w": 0.05 }
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
      "lede": "一个不需要选举的位置。只需要一个人点头。",
      "known": [
        "委任职位不用筹款、不用投票，但要过背景审查。",
        "它给你实权，不给民意基础——任命你的人走了你就悬。",
        "推荐你的那个人，会一直在你档案里。"
      ],
      "rumor": [
        "有人说这位置已有内定人选，你是陪跑。",
        "有人说推荐你的人正在拿你做交换。"
      ],
      "unknown": [
        "你会不会被卷入与你无关的事。",
        "推荐人会向你索要什么。"
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
        "操盘者的权力来自信息、资金和时机，不来自选票。",
        "你选的人不耀眼，正因此才轮得到你。",
        "投入的是判断力；错了，失去的是所有人对你的信任。"
      ],
      "rumor": [
        "另一个操盘手也在看同一个人，手上的钱更多。",
        "真正的胜负会在投票前一周的意外里决定。"
      ],
      "unknown": [
        "你培养的人会不会把你踢开。",
        "你会不会想自己站上去。"
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
      "lede": "有人拿着一张纸来找你：钱可以这样花。",
      "known": [
        "超级PAC可接受几乎无限额的捐款，独立于候选人。",
        "它不能直接协调，但能做广告、做动员、说任何话。",
        "捐款人名字公开——但很多人不介意。"
      ],
      "rumor": [
        "几家大公司已备好资金，只等一个「值得投的人」。",
        "一旦你收下这笔钱，你就不再是一个人的候选人。"
      ],
      "unknown": [
        "这钱背后的人将来要什么。",
        "这条路会不会被新规堵死。"
      ],
      "terms": [
        { "k": "超级PAC", "v": "可接受无上限捐款的独立政治支出组织。" }
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
              "count": { "wrath_money": 10, "wrath_press": 8 },
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
        "名气能换成选票，也能换成钱，但两条路通向不同地方。",
        "名声最容易贬值：不供给新内容就会消散。",
        "你身边的人开始分为两类：一类在保护你，一类在使用你。"
      ],
      "rumor": [
        "据说你已被更大的名利场盯上。",
        "据说你上月的曝光让有权的人不舒服。"
      ],
      "unknown": [
        "当你需要它的时候，名声还在不在。",
        "你有没有一天会为了它，做出不像自己的事。"
      ],
      "terms": [
        {
          "k": "名人轨道",
          "v": "靠知名度而非党机器获得影响力。"
        },
        {
          "k": "人设",
          "v": "公众对你的固定印象，形成后很难改。"
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
    "category": "campaign",
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
        "市的议题很具体：警察、消防、分区、垃圾。",
        "党要一个熟基层的人占位；你干了几年党务，他们想到你。"
      ],
      "rumor": [
        "据说现任市长跟开发商走得近，位子未必有人守。",
        "有人说你只要出面，党的捐款人就会跟上一小笔。"
      ],
      "unknown": [
        "你是在为自己参选，还是在替党务机器占位。",
        "第一次握实权，你会更谨慎还是更激进。"
      ],
      "terms": [
        { "k": "市议会", "v": "市的立法机关，管预算与地方条例。" },
        { "k": "兼职议员", "v": "有本职、靠津贴与名誉支撑的议员。" }
      ]
    },
    "title": "市议会的一个席位",
    "body": "从党的干部变成民选的公职人员，这一步跨过去，你才算真正上了牌桌。",
    "choices": [
      {
        "id": "run",
        "text": "争取党内提名，参选市议员",
        "ballot": true,
        "base": 0.5,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "establishment", "w": 0.3 }
        ],
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
        "ballot": true,
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
    "category": "campaign",
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
        "空出的席位常由党内大佬先过目——你得到场也要有人说话。"
      ],
      "rumor": [
        "有人说这个位子早被内定给一位捐得更多的人。",
        "有人说现任者想退休，但没跟任何人说过。"
      ],
      "unknown": [
        "从小角色到参议员，别人眼光会怎么变。",
        "你会不会为这张桌子欠下还不清的人情。"
      ],
      "terms": [
        { "k": "州参议院", "v": "州议会上院，席少任长，掌确认与预算。" }
      ]
    },
    "title": "本区州参议院的席位空了出来，等你去争",
    "body": "从‘一名州众议员’变成‘本区参议员’，选区更大，赌注也更大。",
    "choices": [
      {
        "id": "run",
        "text": "争取提名，竞选州参议员",
        "req": { "rep": 5 },
        "ballot": true,
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
    "category": "campaign",
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
        "全州公职由整个州投票选出，名字要上每一张州选票。",
        "这是从‘地方人物’变成‘全州人物’的分水岭。",
        "竞选全州职务意味着高昂的广告与差旅，钱从这一刻起变成硬门槛。"
      ],
      "rumor": [
        "有人说现任的州级大员要转战联邦，这个位子在空。",
        "有人说对手阵营已经筹到了你两倍的款。"
      ],
      "unknown": [
        "全州曝光带来的，是机会还是靶子。",
        "为打这场选战，你要向谁借钱欠谁人情。"
      ],
      "terms": [
        { "k": "全州公职", "v": "全州选出的高层职务，通往全国的台阶。" }
      ]
    },
    "title": "把版图扩大到全州",
    "body": "一个全州性的职位出现了。拿下它，你就再不是某一区的人了。",
    "choices": [
      {
        "id": "run",
        "text": "竞选全州公职",
        "req": { "rep": 5 },
        "ballot": true,
        "base": 0.46,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "press", "w": 0.3 },
          { "src": "res", "key": "fun", "min": 6, "w": 0.05 }
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
    "category": "campaign",
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
        "大选年，领跑者会挑竞选伙伴——副总统选票或全国要职。",
        "副总统人选看互补：地理、派系、性别、经验一样样配。",
        "这通电话可能把你推上顶点，也可能让你被反复审视。"
      ],
      "rumor": [
        "有人说候选名单已经内定，你只是被拿来平衡某个派系。",
        "有人说对手已经准备好一叠关于你的黑材料。"
      ],
      "unknown": [
        "站上这舞台，会不会是你一生的最高点。",
        "为这票你愿替别人议程背书到什么程度。"
      ],
      "terms": [
        { "k": "竞选伙伴", "v": "候选人挑的副手，用来平衡选票与派系。" }
      ]
    },
    "title": "有人请你出马竞选副总统",
    "body": "一个全国性的位置在向你招手：入局，或保持独立、坐等下一轮。",
    "choices": [
      {
        "id": "accept",
        "text": "接受征召，成为总统候选人／副手",
        "req": { "rep": 6 },
        "ballot": true,
        "base": 0.5,
        "mods": [
          { "src": "attr", "key": "CHA", "w": 0.4 },
          { "src": "fac", "key": "establishment", "w": 0.3 },
          { "src": "res", "key": "fun", "min": 8, "w": 0.05 }
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
