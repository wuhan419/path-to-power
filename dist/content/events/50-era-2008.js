/* ============================================================================
 * CONTENT · 50-era-2008.js
 * 时代：2008 大空头 —— 该时代专属事件。
 * 事件结构见 docs/CONTENT-SCHEMA.md
 * ==========================================================================*/

POTUS.define("event", [
  {
    "id": "2008_crash_offer",
    "grade": "major",
    "category": "crisis",
    valence: "bane", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 0,
    "tierMax": 5,
    "weight": 14,
    "month": 9,
    "day": 24,
    "title": "财政部要你在电视上为救市方案背书",
    "body": "两周前雷曼刚倒，政府把7000亿美元的救市方案（联邦掏钱兜住快倒闭的金融机构，代号TARP）推向国会。" +
      "财政部一个你上周才认识的人深夜来电：方案需要‘民间声音’背书，签名就能上电视。" +
      "文件末尾已有一份署名名单，几个名字你只在新闻里见过。有律师朋友说里面藏了几条无法复核的授权条款——你读不懂的那几条，早晚会反噬。",
    "choices": [
      {
        "id": "sign",
        "text": "签名背书，登上全国荧幕",
        "when": { "tierRaw": true, "tierMin": 4, "tierMax": 6 },
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
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
            "body": "你成了‘冷静理性的年轻人’，全国记住了你。财长私下放话：记你一功。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "establishment": 15,
                "commercial": 10
              }
            }
          },
          "ok": {
            "body": "背书通过，媒体给了你三十秒。建制记住了你。",
            "effects": {
              "rep": 0.7,
              "fac": {
                "establishment": 8
              }
            }
          },
          "meh": {
            "body": "你签了，但条款被博客挖出，‘卖身’标签黏上你。",
            "effects": {
              "rep": 0.3,
              "fac": {
                "establishment": 6,
                "base": -8
              },
              "flags": [
                "bailout_stain"
              ]
            }
          },
          "fail": {
            "body": "背书词被剪接成‘为华尔街说话’，社媒围攻你。",
            "effects": {
              "rep": -0.2,
              "fac": {
                "base": -12,
                "press": -10
              },
              "flags": [
                "bailout_stain"
              ]
            }
          },
          "critfail": {
            "body": "你念错一个数字，全国直播出丑，沦为深夜节目笑料。",
            "effects": {
              "rep": -0.9,
              "fac": {
                "press": -15,
                "base": -10
              }
            }
          }
        }
      },
      {
        "id": "refuse",
        "text": "拒绝，发声明批评救市不公",
        "when": { "tierRaw": true, "tierMin": 7 },
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.3
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的声明被全文转载，‘人民的声音’人设立住。",
            "effects": {
              "rep": 1,
              "fac": {
                "base": 18,
                "labor": 10
              }
            }
          },
          "ok": {
            "body": "你赢得基层好感，但得罪了财政部。",
            "effects": {
              "rep": 0.6,
              "fac": {
                "base": 10,
                "labor": 6,
                "commercial": -10
              }
            }
          },
          "meh": {
            "body": "声明石沉大海，不过你睡得安稳。",
            "effects": {
              "fac": {
                "base": 4
              }
            }
          },
          "fail": {
            "body": "没人理你，反而被说‘蹭热度’。",
            "effects": {
              "rep": -0.2,
              "fac": {
                "base": -4
              }
            }
          },
          "critfail": {
            "body": "你误引了法条，被专家群嘲，可靠性归零。",
            "effects": {
              "attr": {
                "INT": -6
              },
              "fac": {
                "press": -10
              }
            }
          }
        }
      },
      {
        "id": "leak",
        "text": "把简报泄露给记者，换取曝光",
        "when": { "tierRaw": true, "tierMin": 0, "tierMax": 3 },
        "req": {
          "track": "operative"
        },
        "base": 0.4,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "press",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你成了吹哨人，但某个大人物记下了你的名字。",
            "effects": {
              "rep": 0.9,
              "attr": {
                "INTG": 2
              },
              "fac": {
                "press": 15,
                "establishment": -15
              },
              "flags": [
                "whistleblower"
              ]
            }
          },
          "ok": {
            "body": "报道出炉，你被描述为‘内部知情者’。",
            "effects": {
              "rep": 0.4,
              "attr": {
                "INTG": 1
              },
              "fac": {
                "press": 8,
                "establishment": -8
              }
            }
          },
          "meh": {
            "body": "报道很小，你欠了记者一个人情。",
            "effects": {
              "fac": {
                "press": 4
              },
              "fav": -1
            }
          },
          "fail": {
            "body": "线索链断裂，你被怀疑是造谣者。",
            "effects": {
              "fac": {
                "press": -8,
                "establishment": -5
              },
              "flags": [
                "leaker_suspect"
              ]
            }
          },
          "critfail": {
            "body": "你泄露错了版本，反成泄密丑闻主角，面临调查。",
            "effects": {
              "fac": {
                "press": -12,
                "establishment": -12
              },
              "flags": [
                "investigation_open",
                "scandal_2"
              ]
            }
          }
        }
      },
      {
        "id": "shop_floor",
        "text": "不接电视邀约：把被收房的邻里请进办公室，挨户登记求助",
        "when": { "tierRaw": true, "tierMin": 0, "tierMax": 3 },
        "base": 0.62,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.35
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你一晚上登记了三十多户。名单递到镇公所那天，办事员头一回按纸面给你让了座。",
            "effects": {
              "rep": 0.9,
              "fac": {
                "base": 6,
                "church": 3
              }
            }
          },
          "ok": {
            "body": "你把能替人填的表都填了。没人道谢，来年街上却多了几张记得你的脸。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "base": 3
              }
            }
          },
          "meh": {
            "body": "来的人多半只想问电视里到底出了什么事。你答不上，只能陪着坐。",
            "effects": {
              "rep": 0.05
            }
          },
          "fail": {
            "body": "有人认出你也在这份名单上，问的却不是救市，是你自己的钱放在哪家银行。",
            "effects": {
              "rep": -0.6,
              "fac": {
                "base": -4
              }
            }
          },
          "critfail": {
            "body": "你的登记名单被人复印带走，印成「他连这些账都在记」。你的热心成了现成的罪证。",
            "effects": {
              "rep": -1.3,
              "fac": {
                "press": -5,
                "base": -4
              },
              "flags": [
                "scandal_1"
              ]
            }
          }
        }
      },
      {
        "id": "amend_terms",
        "text": "上电视，但只背书把住房救济条款写进去的那个版本",
        "when": { "tierRaw": true, "tierMin": 4, "tierMax": 6 },
        "note": "接住话筒，也开出条件。财政部可能改口，也可能直接换人。",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "INT",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "press",
            "w": 0.2
          }
        ],
        "cost": {
          "fun": 1
        },
        "outcomes": {
          "crit": {
            "body": "你那三十秒被剪进晚间新闻，「救机构先救房主」成了全国引用。委员会把这条写进了修正案。",
            "effects": {
              "rep": 1.4,
              "fun": -1,
              "fac": {
                "press": 6,
                "base": 4,
                "establishment": 3
              }
            }
          },
          "ok": {
            "body": "你上了电视、开了价。条款只添了几行，那几行用的是你给的字句。",
            "effects": {
              "rep": 0.6,
              "fun": -1,
              "fac": {
                "press": 3,
                "base": 2
              }
            }
          },
          "meh": {
            "body": "你的背书被当成噪音，修正案一条没过。",
            "effects": {
              "rep": 0,
              "fun": -1
            }
          },
          "fail": {
            "body": "财政部把你的「但是」原样奉还：条款不改，背书照收。",
            "effects": {
              "rep": -1.2,
              "fun": -1.5,
              "fac": {
                "establishment": -4,
                "press": -3
              }
            }
          },
          "critfail": {
            "body": "你引用的止赎数字被当场证伪，你一夜之间从「讲条件的人」变成「不会算账的人」。",
            "effects": {
              "rep": -2,
              "fun": -1.5,
              "fac": {
                "press": -6,
                "establishment": -4
              },
              "flags": [
                "scandal_1"
              ]
            }
          }
        }
      },
      {
        "id": "floor_vote",
        "text": "把背书换成表决立场：公开念出你的附加条件，赞成反对都在这一票里",
        "when": { "tierRaw": true, "tierMin": 7 },
        "note": "全国盯的就是你这一票。定的是价钱，砸的是自己的信用。",
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.35
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.3
          }
        ],
        "stake": {
          "fav": true
        },
        "outcomes": {
          "crit": {
            "body": "你念出的几处修改意见逐条写进了重新表决的文本，整案按你的价码重排。当晚，两党都要打你的电话。",
            "effects": {
              "rep": 1.8,
              "voters": {
                "warm": 300
              },
              "fac": {
                "establishment": 10,
                "press": 6,
                "base": 4,
                "commercial": -5
              }
            }
          },
          "ok": {
            "body": "你换进一条，其余被砍。你的名字上了「会谈判」的那页纸。",
            "effects": {
              "rep": 0.7,
              "fac": {
                "establishment": 5,
                "base": -2
              }
            }
          },
          "meh": {
            "body": "你的条件被并进冗长辩论记录，没人记得是谁提的。",
            "effects": {
              "rep": 0.1
            }
          },
          "fail": {
            "body": "首轮表决被否的那二十四小时，全国镜头对着「讨价还价的人」，你排第一个。",
            "effects": {
              "rep": -1.8,
              "fac": {
                "establishment": -6,
                "press": -5
              }
            }
          },
          "critfail": {
            "body": "你争到的那条例外，被翻出正是替某家金主改的字。调查函与连任初选同一天寄到。",
            "effects": {
              "rep": -2.6,
              "fac": {
                "press": -8,
                "base": -6,
                "establishment": -5
              },
              "flags": [
                "scandal_2",
                "investigation_open"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_tea_party",
    "grade": "mid",
    "category": "political",
    "medium": ["cable", "social"],
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 1,
    "tierMax": 5,
    "weight": 11,
    "month": 4,
    "day": 15,
    "title": "茶党纳税人挤满会场，要你就救银行表态",
    "body": "报税截止日，一间高中体育馆坐满了自称‘茶党’的人——反加税、反政府开支的草根运动。" +
      "他们恨的是同一件事：政府拿钱救银行，他们的房子却在被收走。组织者给你十五分钟，要你当场站一边——两边都不站不成。" +
      "今晚你说的每句话，几年后都会被对手剪成广告。",
    "choices": [
      {
        "id": "fire",
        "text": "和他们一起怒吼，谴责华盛顿",
        "base": 0.55,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你一句话点燃全场，视频破百万播放。",
            "effects": {
              "rep": 2.5,
              "fac": {
                "base": 20,
                "establishment": -10
              }
            }
          },
          "ok": {
            "body": "你赢得欢呼，但被建制贴上‘民粹’标签。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "base": 12,
                "establishment": -6
              }
            }
          },
          "meh": {
            "body": "掌声还行，有人举牌骂你作秀。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "base": 5
              }
            }
          },
          "fail": {
            "body": "你被一位退休教师追问到语塞。",
            "effects": {
              "rep": -0.4,
              "fac": {
                "base": -6
              }
            }
          },
          "critfail": {
            "body": "你脱口一句被剪成交‘仇视穷人’，全网痛批。",
            "effects": {
              "rep": -1.5,
              "fac": {
                "base": -12,
                "press": -10
              }
            }
          }
        }
      },
      {
        "id": "calm",
        "text": "用数据劝他们冷静",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "INT",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你用一张图表让全场安静，媒体称你‘罕见的理性’。",
            "effects": {
              "rep": 1.5,
              "fac": {
                "establishment": 10,
                "press": 8
              }
            }
          },
          "ok": {
            "body": "气氛缓和，但被认为‘不够热血’。",
            "effects": {
              "rep": 0.6,
              "fac": {
                "establishment": 5,
                "base": -3
              }
            }
          },
          "meh": {
            "body": "一半人走了，一半人记了笔记。",
            "effects": {
              "fac": {
                "establishment": 3
              }
            }
          },
          "fail": {
            "body": "数据被指‘造假’，你丢了面子。",
            "effects": {
              "attr": {
                "INT": -4
              },
              "fac": {
                "press": -6
              }
            }
          },
          "critfail": {
            "body": "你引用的来源当天被证伪，学术信誉重创。",
            "effects": {
              "attr": {
                "INT": -8
              },
              "fac": {
                "press": -12
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_short",
    "grade": "mid",
    "category": "finance",
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 0,
    "tierMax": 5,
    "weight": 9,
    "tracks": [
      "wealth",
      "celebrity"
    ],
    "title": "一位基金朋友递来数据，劝你押上身家做空房市",
    "body": "一位对冲基金朋友递来一份数据：那些标为‘优质’的房贷池，逾期率正按历史模型不该发生的方式攀升。" +
      "他说自己不是唯一看见的人，几家基金已经在悄悄建仓。你面前两条路：通过CDS（做空房贷证券的保险型合约）下注，或者把数据公开。" +
      "你知道方向，不知道它哪天崩——崩盘之前，你的仓位可能先把你拖死。",
    "choices": [
      {
        "id": "short",
        "text": "押上全部身家做空",
        "req": {
          "fun": 5.5
        },
        "base": 0.4,
        "mods": [
          {
            "src": "attr",
            "key": "INT",
            "w": 0.5
          },
          {
            "src": "talent",
            "key": "quant",
            "w": 0.15
          }
        ],
        "outcomes": {
          "crit": {
            "body": "崩盘如期而至，你赚得盆满钵满，也提前看清了体系的腐烂。",
            "effects": {
              "fun": 69.5,
              "rep": 1,
              "flags": [
                "saw_crisis"
              ]
            }
          },
          "ok": {
            "body": "你小赚一笔，但没敢压够重。",
            "effects": {
              "fun": 11,
              "rep": 0.4
            }
          },
          "meh": {
            "body": "你赚了，却因‘发国难财’被骂。",
            "effects": {
              "fun": 8.5,
              "fac": {
                "base": -10,
                "press": -6
              },
              "flags": [
                "vulture"
              ]
            }
          },
          "fail": {
            "body": "时机错了，你割肉离场，元气大伤。",
            "effects": {
              "fun": -7,
              "fac": {
                "commercial": -5
              }
            }
          },
          "critfail": {
            "body": "杠杆反噬，你濒临破产，欠下人情无数。",
            "effects": {
              "fun": -16.5,
              "fav": -3,
              "flags": [
                "debt_crisis"
              ]
            }
          }
        }
      },
      {
        "id": "expose",
        "text": "公开警告，不做空",
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "press",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你成了‘提前预警的人’，道德声望大涨。",
            "effects": {
              "rep": 1.5,
              "fac": {
                "press": 12,
                "base": 10
              },
              "attr": {
                "INTG": 5
              }
            }
          },
          "ok": {
            "body": "媒体认可你的良知，但钱没进兜。",
            "effects": {
              "rep": 0.8,
              "fac": {
                "press": 6,
                "base": 5
              }
            }
          },
          "meh": {
            "body": "无人理会，你错过了一笔财富。",
            "effects": {
              "fac": {
                "base": 3
              }
            }
          },
          "fail": {
            "body": "被嘲笑‘杞人忧天’。",
            "effects": {
              "fac": {
                "press": -4
              }
            }
          },
          "critfail": {
            "body": "你警告的那家机构反过来起诉你扰乱市场。",
            "effects": {
              "fun": -4,
              "flags": [
                "investigation_open"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_donor",
    "grade": "minor",
    "category": "finance",
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 1,
    "tierMax": 5,
    "weight": 10,
    "tracks": [
      "electoral",
      "operative",
      "wealth"
    ],
    "title": "一位石油大亨的晚宴",
    "body": "他想要‘一个能听进话的人’。一张支票足以撑起你整个竞选，条件是‘在能源委员会投对的票’。" +
      "有人说他习惯留下录音录像，好‘维持关系的稳定’。",
    "choices": [
      {
        "id": "take",
        "text": "收下，记下这笔人情",
        "base": 0.6,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "commercial",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你既拿了钱又巧妙地没被绑死，手腕尽显。",
            "effects": {
              "fun": 133.5,
              "fac": {
                "commercial": 15
              },
              "rep": 1.25
            }
          },
          "ok": {
            "body": "竞选资金无忧，但开始有人知道你的价码。",
            "effects": {
              "fun": 89,
              "fac": {
                "commercial": 10
              },
              "flags": [
                "bought"
              ]
            }
          },
          "meh": {
            "body": "钱到手，但你被安排了一场不想去的演讲。",
            "effects": {
              "fun": 66.5,
              "fac": {
                "commercial": 8
              },
              "fav": -1
            }
          },
          "fail": {
            "body": "他录像留证，你成了把柄持有人。",
            "effects": {
              "fun": 44.5,
              "fac": {
                "commercial": 6
              },
              "flags": [
                "compromised"
              ]
            }
          },
          "critfail": {
            "body": "交易被卧底记者拍下，丑闻爆发。",
            "effects": {
              "fun": 22,
              "fac": {
                "commercial": 4,
                "press": -20
              },
              "flags": [
                "scandal_3",
                "investigation_open"
              ]
            }
          }
        }
      },
      {
        "id": "decline",
        "text": "婉拒，保持干净",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
            "w": 0.4
          },
          {
            "src": "fac",
            "key": "base",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你拒绝的姿态被传为佳话，基层捐款反而涌来。",
            "effects": {
              "rep": 3,
              "fac": {
                "base": 15
              },
              "fun": 11
            }
          },
          "ok": {
            "body": "你守住底线，资金紧张但睡得着。",
            "effects": {
              "fac": {
                "base": 6
              },
              "attr": {
                "INTG": 3
              }
            }
          },
          "meh": {
            "body": "少了一笔钱，但无伤大雅。",
            "effects": {
              "fac": {
                "base": 3
              }
            }
          },
          "fail": {
            "body": "对手笑你‘清高误事’。",
            "effects": {
              "fac": {
                "establishment": -3
              }
            }
          },
          "critfail": {
            "body": "你拒绝的方式太傲慢，得罪了整个商会。",
            "effects": {
              "fac": {
                "commercial": -15,
                "establishment": -5
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_affair",
    "grade": "minor",
    "category": "romance",
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 1,
    "tierMax": 5,
    "weight": 7,
    "title": "一位同僚的助理深夜发来暧昧邀约",
    "body": "凌晨一点十七分，一位同僚的助理发来一条消息。你喝了酒，婚姻正处在没人愿意多提的阶段。" +
      "你知道这意味着什么——也知道一旦被拍下，什么都完了。\n" +
      "但你也知道另一件事：他的日程、电话、饭局全从她枕边过一遍，这种‘枕边情报’比任何简报都新鲜。" +
      "还有一件事你看不见：这条消息，有没有第三个人已经读到。",
    "choices": [
      {
        "id": "go",
        "text": "去",
        "note": "收益是真实的：枕边情报（把柄）、一个死心塌地的内线、和一段没人敢碰的亲密。风险也是真实的：照片、要挟、和她男朋友的政治报复。高风险高回报，明码标价。",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "她不止温柔，还健谈。天亮之前你知道了三件事：那位同僚的婚房是谁付的首付、他和哪家游说公司有「咨询合同」、以及他抽屉里锁着什么。\n她把头靠在你肩上说：「这些话我只跟你说。」\n你多了一个死心塌地的内线——和一个再也拆不掉的共谋。",
            "effects": {
              "fac": {
                "base": 5
              },
              "fav": 2,
              "lev": 2,
              "flags": [
                "affair_secret"
              ]
            }
          },
          "ok": {
            "body": "一夜无人知晓。临走时她在门口亲了你的脸颊：「他的日程表，下个月要改三次。想听吗？」\n你拿到了第一份情报，和一个愿意继续说话的人。",
            "effects": {
              "lev": 1,
              "fav": 1,
              "flags": [
                "affair_secret"
              ]
            }
          },
          "meh": {
            "body": "她比你想的清醒。第二天她发来一条得体的消息：「昨晚的事就到昨晚。」然后是一条附言——那位同僚下周要干的事。\n是善意，也是投名状。你留下了把柄，也拿到了筹码。",
            "effects": {
              "lev": 1,
              "flags": [
                "affair_stain"
              ]
            }
          },
          "fail": {
            "body": "酒店走廊的摄像头不是摆设。照片没有流出去——但它存在于某个人的硬盘里。",
            "effects": {
              "flags": [
                "affair_stain",
                "scandal_1"
              ]
            }
          },
          "critfail": {
            "body": "照片卖给小报，婚姻与前途同时爆炸。而最讽刺的是：曝光它的渠道，正是她老板的媒体朋友。",
            "effects": {
              "flags": [
                "scandal_4",
                "divorce_pending"
              ],
              "fac": {
                "press": -20,
                "base": -15
              },
              "rep": -3
            }
          }
        }
      },
      {
        "id": "stop",
        "text": "克制，回家",
        "note": "零风险零收益？不——清醒的第二天，你在这个圈子里可靠的名声会值钱。公信力路线的复利。",
        "base": 0.7,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你关掉手机，第二天更被信任。",
            "effects": {
              "attr": {
                "INTG": 3
              },
              "fac": {
                "base": 4
              }
            }
          },
          "ok": {
            "body": "你做了正确的事。",
            "effects": {
              "fac": {
                "base": 2
              }
            }
          },
          "meh": {
            "body": "有点无聊，但无妨。",
            "effects": {}
          },
          "fail": {
            "body": "你错过了一次潜在的人脉。",
            "effects": {
              "fav": -1
            }
          },
          "critfail": {
            "body": "你拒得太绝情，对方到处说你‘装清高’。",
            "effects": {
              "fac": {
                "base": -4
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_affair_collect",
    "grade": "mid", "unique": true, "category": "romance",
    valence: "risk", dyn: true,
    "era": ["2008_CRASH"],
    "tierMin": 1, "tierMax": 5, weight: 9,
    "after": { "id": "2008_affair", minMonthsAfter: 4, maxMonthsAfter: 30 },
    "flags": ["affair_secret"],
    "title": "情人透露的同僚秘密现在能左右一场表决",
    "body": "她枕边说过的三件事，已经应验两件：那位同僚果然把自己人塞进了位置里。" +
      "关键表决就在眼前，他是决定票，而他的把柄只握在你一个人手上。她最新一条消息只有一行：「他下周会很脆弱。」\n" +
      "怎么用？有人说同样的话她也讲给别人——情报从不只卖一家。而每动用一次，都会引来一句：你怎么知道的？",
    "choices": [
      {
        "id": "media",
        "text": "放给媒体：让他的秘密自己爆炸",
        "note": "最快最脏。他出局，你的表决稳了——但「消息来源」的嫌疑会跟着你很多年。",
        "base": 0.5,
        "mods": [{ "src": "attr", "key": "CUN", "w": 0.4 }],
        "outcomes": {
          "crit": { "body": "报道见报的时机完美：他连夜宣布「陪伴家人」退出公职。表决按你的方向通过，而你的名字从头到尾没出现。", "effects": { rep: 0.3, lev: 1, fac: { press: 8, establishment: 6 } } },
          "ok": { "body": "他退了，表决赢了。记者反复问「消息是谁给的」，你练出了一副无辜的表情。", "effects": { rep: 0.6, fac: { press: 4 } } },
          "meh": { "body": "报道发了，但他死不承认，事情拖成了罗生门。表决勉强过了。", "effects": { rep: 0.2, fac: { press: 3, establishment: -3 } } },
          "fail": { "body": "他挺住了，还反手查泄密源。查到她之前——先查到了你。", "effects": { rep: -0.3, fac: { press: -6, establishment: -8 }, flags: ["leaker_suspect"] } },
          "critfail": { "body": "泄密链条被完整还原：她——你——记者。她的职业生涯结束，你得了「用枕边话杀人的政客」这个跟一辈子的外号。", "effects": { rep: -0.5, fac: { press: -10, establishment: -12, base: -8 }, flags: ["scandal_3"], notFlags: ["affair_secret"] } }
        }
      },
      {
        "id": "warn",
        "text": "私下警告他：投弃权票，或者细节见报",
        "note": "情报换人情。他欠你一个大人情——也知道你的手段。可控的交易。",
        "base": 0.65,
        "mods": [{ "src": "attr", "key": "CUN", "w": 0.35 }, { "src": "attr", "key": "CHA", "w": 0.2 }],
        "outcomes": {
          "crit": { "body": "他听完，很久没说话，然后说：「你要什么？」——从此他在委员会里是你的影子。", "effects": { fav: 2, lev: 1, fac: { establishment: 10 }, contact: { lobbyist: 12 } } },
          "ok": { "body": "表决那天他「因病缺席」。散会后他在走廊对你点了一下头——点得很慢。", "effects": { fav: 1, lev: 1, fac: { establishment: 6 } } },
          "meh": { "body": "他投了弃权，但眼神让你明白：这个人情会以你最不喜欢的方式归还。", "effects": { lev: 1, fac: { establishment: 3 } } },
          "fail": { "body": "他选择鱼死网破：抢先自曝了一半，然后把「被政敌窃听」的锅甩给你。", "effects": { rep: -0.3, fac: { establishment: -8, press: -4 }, flags: ["scandal_2"] } },
          "critfail": { "body": "谈话被录了音。第二天「某议员以私生活相要挟」的报道虽然没有你的名字，但描述得足够清楚。", "effects": { rep: -0.4, fac: { establishment: -10, press: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        "id": "sit",
        "text": "什么都不做：把这份重量留在身上",
        "note": "最安全的玩法是永远不用。情报会过期，但她会记得你握过它——这本身也是一种关系。",
        "base": 0.8,
        "outcomes": {
          "crit": { "body": "表决照旧，世界照旧。但你发现自己开始被另一种目光注视——她看你的眼神里，多了敬重。", "effects": { attr: { INTG: 2 }, contact: { columnist: 6 }, fav: 1 } },
          "ok": { "body": "你把那几句话埋了。它们会烂在土里——大多数秘密都这样。", "effects": {} },
          "meh": { "body": "几个月后那位同僚东窗事发，与你无关。你庆幸，也隐隐惋惜。", "effects": { rep: 0.2 } },
          "fail": { "body": "她等了很久没等到下文。渐渐地，消息不再来了。", "effects": { fav: -1 } },
          "critfail": { "body": "她把情报给了别人，事情照炸不误——而你白担了几个月的风险。", "effects": { rep: -0.4, flags: ["affair_stain"] } }
        }
      }
    ]
  },
  {
    "id": "2008_affair_burn",
    "grade": "major", "unique": true, "category": "romance",
    valence: "bane", dyn: true,
    "era": ["2008_CRASH"],
    "tierMin": 2, "tierMax": 5, weight: 8,
    "after": { "id": "2008_affair", minMonthsAfter: 12, maxMonthsAfter: 60 },
    "flags": ["affair_stain"],
    "title": "对手拿到了你外遇的照片，三周后就是投票日",
    "body": "竞选经理把照片推到你面前：就是那一次，日期和地点都印在背面。「三周后投票。」\n" +
      "寄件人匿名，时机却掐得准。你的妻子和选民都还不知情，两件事会在同一周引爆。\n" +
      "那张照片在你手里很轻，在选民眼里会很重。\n" +
      "有人说这张照片是从私家侦探手里买来的，花了六位数。而照片之外，她现在在哪、会说什么，你完全无从掌控。",
    "choices": [
      {
        "id": "confess",
        "text": "抢先承认：和妻子一起上电视",
        "note": "最高风险高回报：处理得好是「诚实的人犯过错」，处理不好是双重葬礼。公信力此时是真实属性。",
        "base": 0.45,
        "mods": [{ "src": "attr", "key": "INTG", "w": 0.4 }, { "src": "attr", "key": "CHA", "w": 0.3 }],
        "outcomes": {
          "crit": { "body": "那场访问播出的夜晚，你说了实话，你妻子握着你的手。第二天民调不降反升——人们说：至少他不装。", "effects": { rep: 0.1, attr: { INTG: 4 }, voters: { diehard: 800, warm: 2000 }, notFlags: ["affair_stain"] } },
          "ok": { "body": "承认了，挨了两周的打，然后舆论转向了更重要的事。你活了下来，带着伤。", "effects": { rep: 0.3, attr: { INTG: 2 }, notFlags: ["affair_stain"] } },
          "meh": { "body": "道歉声明发了，民调跌了八个点，没有回升也没有崩。选战继续。", "effects": { rep: -0.3, voters: { warm: -500 } } },
          "fail": { "body": "你的道歉被批「排练痕迹过重」。照片之外，记者又挖出了后续的三通电话记录。", "effects": { rep: -0.9, voters: { warm: -1500, oppose: 1000 }, flags: ["scandal_2"] } },
          "critfail": { "body": "访问现场，你妻子先于你开了口——她早就知道，一直在等你自己说。镜头拍下了她离场的背影。那张照片赢得了那一周的普利策，输掉的是你的全部。", "effects": { rep: -0.2, flags: ["scandal_4", "divorce_pending"], voters: { warm: -3000, oppose: 2000 } } }
        }
      },
      {
        "id": "deny",
        "text": "否认到底：这是 AI 合成的、是政治抹黑",
        "note": "赌证据链和技术怀疑。2010 年代前「合成」这个词还不存在——年代越早，这条路越难走。",
        "base": 0.55,
        "mods": [{ "src": "attr", "key": "CUN", "w": 0.4 }, { "src": "fac", "key": "press", "w": 0.2 }],
        "outcomes": {
          "crit": { "body": "你的团队连夜做了「深度伪造分析」的科普帖，技术媒体先信了。照片的来源反成了对方的丑闻。", "effects": { rep: 0.9, fac: { press: 8, base: 5 }, notFlags: ["affair_stain"] } },
          "ok": { "body": "否认持续了三周，投票日你赢了两个点。照片的事没人再提——暂时。", "effects": { rep: 0.2, notFlags: ["affair_stain"] } },
          "meh": { "body": "信的人和不信的人正好对半。选举变成了一场关于照片的公投。", "effects": { rep: -0.2 } },
          "fail": { "body": "第二张照片来了，带着日期和证人。你的第一句否认现在成了罪证。", "effects": { rep: -0.1, flags: ["scandal_3"], voters: { warm: -2000, oppose: 1500 } } },
          "critfail": { "body": "否认的每一句话都被逐条证伪。你的竞选在一周内融化，党内把你除名——你成了「那个撒谎撒到底的人」。", "effects": { rep: -0.2, flags: ["scandal_5"], fall: 1 } }
        }
      },
      {
        "id": "buy_silence",
        "text": "花钱买断：让照片消失",
        "note": "六位数的封口费。买得来照片，买不来知道照片存在的人——而且这笔支出本身是新把柄。",
        base: 0.6,
        cost: { fun: 2.5 },
        "outcomes": {
          "crit": { "body": "中间人收钱消灾，底片当面销毁。整件事像没发生过——除了你和你的会计。", "effects": { notFlags: ["affair_stain"], fac: { commercial: 4 } } },
          "ok": { "body": "照片撤了，但对方留了复印件。你买到的只是时间。", "effects": { lev: 0, flags: ["compromised"] } },
          "meh": { "body": "钱付了，照片「停发」。三个月后它出现在一份小报的内页——没人注意，但你出了冷汗。", "effects": {} },
          "fail": { "body": "付钱的行为本身被记录了。现在你有两个秘密：那张照片，和掩盖它的转账。", "effects": { flags: ["compromised", "launder"] } },
          "critfail": { "body": "「候选人贿赂销毁证据」的标题比原照片劲爆十倍。你花的每一分钱都成了呈堂证供。", "effects": { rep: -0.2, flags: ["scandal_4", "investigation_open"], fall: 1 } }
        }
      }
    ]
  },
  {
    "id": "2008_debate",
    "grade": "mid",
    "category": "media",
    "medium": "tv",
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 2,
    "tierMax": 5,
    "weight": 9,
    "tracks": [
      "electoral",
      "celebrity"
    ],
    "title": "直播辩论的陷阱",
    "body": "这是直播，全国九成观众此刻才第一次认真看你。对手抛出一个你根本没准备的问题——里面埋着一个没被证明的前提：你一旦回答，就等于认了它。" +
      "你有九十秒，已经用掉三十五秒。全场在等。\n" +
      "这几秒明天会被剪成什么，你现在还不知道。",
    "choices": [
      {
        "id": "attack",
        "text": "反手攻击对手的过去",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.5
          },
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "一记绝杀，对手整晚没缓过来，民调飙升。",
            "effects": {
              "rep": 2.5,
              "fac": {
                "base": 15
              }
            }
          },
          "ok": {
            "body": "你没输，平手收场。",
            "effects": {
              "rep": 0.8,
              "fac": {
                "base": 5
              }
            }
          },
          "meh": {
            "body": "你击中对方，却显得刻薄。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "base": 4,
                "press": -4
              }
            }
          },
          "fail": {
            "body": "你的‘事实’被现场辟谣。",
            "effects": {
              "rep": -0.6,
              "fac": {
                "press": -8,
                "base": -5
              }
            }
          },
          "critfail": {
            "body": "你攻击错人，反被揭短，辩论史称耻辱。",
            "effects": {
              "rep": -2,
              "fac": {
                "press": -15,
                "base": -12
              }
            }
          }
        }
      },
      {
        "id": "pivot",
        "text": "把话题引向你擅长的议题",
        "base": 0.6,
        "mods": [
          {
            "src": "attr",
            "key": "INT",
            "w": 0.4
          }
        ],
        "outcomes": {
          "crit": {
            "body": "教科书级的控场，评论员盛赞。",
            "effects": {
              "rep": 1.75,
              "fac": {
                "press": 10,
                "establishment": 5
              }
            }
          },
          "ok": {
            "body": "你稳住了。",
            "effects": {
              "rep": 0.8,
              "fac": {
                "press": 4
              }
            }
          },
          "meh": {
            "body": "你绕开了，但被说回避问题。",
            "effects": {
              "rep": 0.2,
              "fac": {
                "press": -3
              }
            }
          },
          "fail": {
            "body": "生硬转折被哄笑。",
            "effects": {
              "rep": -0.6,
              "fac": {
                "press": -5
              }
            }
          },
          "critfail": {
            "body": "你卡壳了整整十秒，成梗图。",
            "effects": {
              "rep": -1.25,
              "fac": {
                "press": -10
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_foundation",
    "grade": "minor",
    "category": "scandal",
    valence: "bane", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 0,
    "tierMax": 4,
    "weight": 8,
    "tracks": [
      "operative",
      "wealth"
    ],
    "title": "成立你自己的基金会",
    "body": "政客办一家跟你同名的基金会是常规操作：非营利组织，能筹款、能雇人、能赚名声；账目交给会计师事务所审计，细节就能合法不公开。" +
      "它也能成为明天的罪证——一旦被认定自肥，就是重罪。有人说某议员靠自家基金会养着八个吃空饷的顾问。" +
      "迟早会有记者去翻你的报销单。",
    "choices": [
      {
        "id": "found",
        "text": "成立，认真做事",
        "base": 0.6,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "基金会口碑爆棚，你成了‘有理想的实干家’。",
            "effects": {
              "rep": 3,
              "fac": {
                "base": 12,
                "press": 6
              },
              "attr": {
                "INTG": 3
              }
            }
          },
          "ok": {
            "body": "稳步运转。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "base": 5
              }
            }
          },
          "meh": {
            "body": "运转还行，但行政成本被质疑。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "press": -3
              }
            }
          },
          "fail": {
            "body": "善款使用被盯上。",
            "effects": {
              "flags": [
                "foundation_watch"
              ],
              "fac": {
                "press": -5
              }
            }
          },
          "critfail": {
            "body": "自肥证据曝光，基金会成丑闻代名词。",
            "effects": {
              "flags": [
                "scandal_3",
                "foundation_watch"
              ],
              "fac": {
                "press": -18,
                "base": -10
              }
            }
          }
        }
      },
      {
        "id": "sham",
        "text": "成立，当作洗钱壳",
        "base": 0.45,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.5
          }
        ],
        "outcomes": {
          "crit": {
            "body": "天衣无缝，钱洗得干干净净没人发现。",
            "effects": {
              "fun": 100,
              "fac": {
                "commercial": 10
              }
            }
          },
          "ok": {
            "body": "钱到手，痕迹基本清除。",
            "effects": {
              "fun": 55.5,
              "flags": [
                "shell"
              ]
            }
          },
          "meh": {
            "body": "赚到，但合伙人开始不稳。",
            "effects": {
              "fun": 33.5,
              "flags": [
                "shell"
              ],
              "fav": -1
            }
          },
          "fail": {
            "body": "会计师留了底，你被约谈。",
            "effects": {
              "fun": 11,
              "flags": [
                "scandal_2",
                "investigation_open"
              ]
            }
          },
          "critfail": {
            "body": "IRS 直接上门，洗钱罪名成立隐患。",
            "effects": {
              "flags": [
                "scandal_4",
                "investigation_open",
                "launder"
              ],
              "fac": {
                "press": -15
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_social",
    "grade": "minor",
    "category": "media",
    "medium": "social",
    valence: "bane", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 1,
    "tierMax": 5,
    "weight": 7,
    "tracks": [
      "celebrity"
    ],
    "title": "一条失控的推文",
    "body": "你凌晨随手发的那句嘲讽，半小时后被大号转了两万次，截图配着一句定性在跑。" +
      "团队说：删了像心虚，不删明天早报会引用它。你心里清楚，不带那一个词，这句话本来什么问题都没有。\n" +
      "在这里，任何一句话都会被截图存着，永久有效——它会一直等到你最需要体面的那一天。",
    "choices": [
      {
        "id": "double",
        "text": "再发一条，火上浇油",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.5
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你反转型幽默封神，粉丝暴涨。",
            "effects": {
              "rep": 5,
              "fac": {
                "base": 18
              }
            }
          },
          "ok": {
            "body": "热度还在，没翻车。",
            "effects": {
              "rep": 2,
              "fac": {
                "base": 8
              }
            }
          },
          "meh": {
            "body": "热度有了，但被批轻浮。",
            "effects": {
              "rep": 0.8,
              "fac": {
                "base": 4,
                "press": -4
              }
            }
          },
          "fail": {
            "body": "越描越黑。",
            "effects": {
              "rep": -1.25,
              "fac": {
                "press": -8,
                "base": -6
              }
            }
          },
          "critfail": {
            "body": "你骂了不该骂的群体，全面抵制。",
            "effects": {
              "rep": -4,
              "fac": {
                "base": -15,
                "press": -15
              },
              "flags": [
                "scandal_2"
              ]
            }
          }
        }
      },
      {
        "id": "delete",
        "text": "秒删并装死",
        "base": 0.6,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "删得漂亮，截图党也没抓住把柄。",
            "effects": {
              "rep": 0.8
            }
          },
          "ok": {
            "body": "风波平息。",
            "effects": {}
          },
          "meh": {
            "body": "有人存了图，但不了了之。",
            "effects": {
              "flags": [
                "tweet_saved"
              ]
            }
          },
          "fail": {
            "body": "删帖反而坐实心虚。",
            "effects": {
              "fac": {
                "press": -4
              }
            }
          },
          "critfail": {
            "body": "你误删了另一条重要的，自曝其短。",
            "effects": {
              "fac": {
                "press": -10
              },
              "rep": -1.25
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_lobby",
    "grade": "mid",
    "category": "political",
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 2,
    "tierMax": 5,
    "weight": 8,
    "tracks": [
      "operative",
      "wealth"
    ],
    "title": "一位游说者打电话要你为行业协会办事",
    "body": "K街（华盛顿游说公司的集中地，代指整个游说行业）打来电话：‘我们想请您未来的委员会，“理解”一下我们的处境。’" +
      "翻译过来：捐款、顾问合同、替你打电话拉票——他不缺耐心，你不接，他转身就去找你的对手。\n" +
      "你唯一不知道的：这通电话，他手上有没有录音。",
    "choices": [
      {
        "id": "broker",
        "text": "做中间人，抽成",
        "base": 0.55,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.6
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你撮合了一笔大交易，上下都念你的好。",
            "effects": {
              "fun": 19.5,
              "fac": {
                "commercial": 15,
                "establishment": 8
              },
              "fav": 2
            }
          },
          "ok": {
            "body": "抽成到手，关系网更密。",
            "effects": {
              "fun": 8.5,
              "fac": {
                "establishment": 5
              },
              "fav": 1
            }
          },
          "meh": {
            "body": "成是成了，但一方觉得你拿太多。",
            "effects": {
              "fun": 5.5,
              "fav": -1
            }
          },
          "fail": {
            "body": "两头不讨好，你被晾在一边。",
            "effects": {
              "fac": {
                "establishment": -5
              },
              "fav": -1
            }
          },
          "critfail": {
            "body": "交易涉贿，录音流出，你成了替罪羊。",
            "effects": {
              "fun": 1.5,
              "flags": [
                "scandal_3",
                "investigation_open",
                "compromised"
              ],
              "fac": {
                "press": -15
              }
            }
          }
        }
      },
      {
        "id": "reform",
        "text": "反过来推动游说改革",
        "base": 0.4,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
            "w": 0.5
          },
          {
            "src": "fac",
            "key": "press",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你掀翻了潜规则，被奉为清流英雄。",
            "effects": {
              "rep": 2,
              "fac": {
                "press": 15,
                "base": 12
              },
              "attr": {
                "INTG": 5
              }
            }
          },
          "ok": {
            "body": "你立了人设，但得罪 K 街。",
            "effects": {
              "rep": 1,
              "fac": {
                "press": 8,
                "base": 6,
                "commercial": -10
              }
            }
          },
          "meh": {
            "body": "雷声大雨点小。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "press": 3
              }
            }
          },
          "fail": {
            "body": "改革草案被院会压死。",
            "effects": {
              "fac": {
                "commercial": -5
              }
            }
          },
          "critfail": {
            "body": "你动了不该动的奶酪，被报复性抹黑。",
            "effects": {
              "fac": {
                "press": -12,
                "commercial": -10
              },
              "flags": [
                "scandal_1"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "2008_primary",
    "grade": "major",
    "category": "political",
    "medium": ["tv", "social"],
    valence: "risk", dyn: true,
    "era": [
      "2008_CRASH"
    ],
    "tierMin": 2,
    "tierMax": 5,
    "weight": 10,
    "month": 4,
    "day": 30,
    "tracks": [
      "electoral",
      "celebrity",
      "wealth"
    ],
    "title": "党内建制推了别人，你要决定是否掀桌挑战初选",
    "body": "党内建制推了另一个人。初选是党内的提名选举，赢的是代表席位，不是基层热度——而党的机器和整张筹款网络都握在建制候选人手里。" +
      "你要不打就认输，要打就掀了桌子：挑战输的是党内信任，服从输的是自己的时间。\n" +
      "你的支持者已经在串联，准备自己筹钱。至于掀过桌子之后党怎么对你，没人会提前告诉你。",
    "choices": [
      {
        "id": "challenge",
        "text": "初选掀翻建制候选人",
        "req": {
          "fac": "base",
          "min": 20
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
            "body": "你以黑马之姿掀翻建制，全国侧目。",
            "effects": {
              "rep": 1.75,
              "tier": 1,
              "count": { "wrath_establishment": 14 },
              "fac": {
                "base": 18,
                "establishment": -15
              }
            }
          },
          "ok": {
            "body": "惨胜，但赢了。",
            "effects": {
              "rep": 0.9,
              "tier": 1,
              "count": { "wrath_establishment": 10 },
              "fac": {
                "base": 10,
                "establishment": -8
              }
            }
          },
          "meh": {
            "body": "赢了，代价是党内从此视你为叛徒。",
            "effects": {
              "rep": 0.6,
              "tier": 1,
              "count": { "wrath_establishment": 12 },
              "fac": {
                "establishment": -12
              },
              "flags": [
                "party_traitor"
              ]
            }
          },
          "fail": {
            "body": "你输了，但名气涨了。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "base": 6,
                "establishment": -5
              }
            }
          },
          "critfail": {
            "body": "惨败且被揭旧账，元气大伤。",
            "effects": {
              "rep": -0.7,
              "fac": {
                "base": -10,
                "establishment": -10
              },
              "flags": [
                "scandal_2"
              ]
            }
          }
        }
      },
      {
        "id": "comply",
        "text": "服从党意，等下次",
        "base": 0.7,
        "mods": [
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.4
          }
        ],
        "outcomes": {
          "crit": {
            "body": "党魁记住了你的‘懂事’，许你一个好位子。",
            "effects": {
              "rep": 0.6,
              "fac": {
                "establishment": 15
              },
              "fav": 2
            }
          },
          "ok": {
            "body": "你安全过关。",
            "effects": {
              "rep": 0.2,
              "fac": {
                "establishment": 8
              }
            }
          },
          "meh": {
            "body": "你被安排了个闲职。",
            "effects": {
              "fac": {
                "establishment": 5
              }
            }
          },
          "fail": {
            "body": "你被忘了。",
            "effects": {
              "fac": {
                "establishment": -2
              }
            }
          },
          "critfail": {
            "body": "你低头太狠，基层彻底抛弃你。",
            "effects": {
              "fac": {
                "base": -12,
                "establishment": 3
              }
            }
          }
        }
      }
    ]
  }
]);
