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
    "brief": {
      "lede": "财政部深夜来电。你要在四个小时里，替一场你还没搞懂的事背书。",
      "known": [
        "你 24 岁，刚开始从政。手上没有实权，只有一点钱、一点人脉，和一张没人认识的脸。",
        "过去两周，华尔街像多米诺骨牌。9 月 7 日政府接管了房利美和房地美；9 月 15 日雷曼兄弟申请破产，报纸说这是美国历史上最大的破产案；第二天，政府又出手接管了保险巨头 AIG。",
        "来电话的是财政部一名中层官员，你上周在一场酒会上刚认识他。他要的是你的名字、你的脸，和一句能在电视上播出来的话。他反复强调「两党都支持」。",
        "他传过来的文件叫《紧急经济稳定法案》：国会批准 7000 亿美元，让财政部去收购金融机构手里的「问题资产」。文件很长，你只有四个小时。",
        "文件末尾附了一张名单，写着「已同意署名的民间人士」。上面有几个你只在新闻里见过的名字。"
      ],
      "rumor": [
        "有人说倒下的不止雷曼，下一家可能是摩根士丹利，也可能是高盛。",
        "有人说财长是在周五把三页纸的草案直接拍在国会桌上的，民主党议员当场骂他「要一张空白支票」。",
        "有律师朋友在饭局上压低声音说，这份文件里有几条「不可复核」的授权条款，具体是什么，他也不知道。"
      ],
      "unknown": [
        "这 7000 亿最后会不会真花出去、花在谁身上、由谁监督——此刻没有任何人能告诉你。",
        "你读不懂的那几条授权条款，将来会成为对手手里的刀。",
        "两个月后就是大选。谁支持救市、谁反对救市，会被拿去划线。而在那之后，还有更远的事。",
        "名单上其他人各自拿了什么好处，你永远不会被告知。"
      ],
      "terms": [
        {
          "k": "救市",
          "v": "政府动用纳税人的钱去接住濒临倒闭的金融机构，防止连锁崩盘。支持者说这是止血，反对者说这是奖励搞砸的人。"
        },
        {
          "k": "两房",
          "v": "房利美（Fannie Mae）与房地美（Freddie Mac），美国最大的两家住房抵押贷款机构，9 月 7 日被政府接管。"
        },
        {
          "k": "次贷",
          "v": "发给信用较差借款人的住房贷款。2007 年起大规模违约，把整个体系往下拽。"
        },
        {
          "k": "TARP",
          "v": "问题资产救助计划（Troubled Asset Relief Program），即那 7000 亿美元授权资金的名字。"
        }
      ]
    },
    "title": "财政部要你在电视上为救市方案背书",
    "body": "财政部的人深夜来电：救市方案需要‘民间声音’背书。签名就能上电视，但条款里藏着一笔会让你未来的对手抓住的把柄。",
    "choices": [
      {
        "id": "sign",
        "text": "签名背书，登上全国荧幕",
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
    "brief": {
      "lede": "报税截止日。一群把政府叫做抢劫犯的人，挤满了一间高中体育馆。",
      "known": [
        "会场在一所高中的体育馆里。门口有人发手写标语，内容大意是「别碰我的钱」。",
        "来的人不全是穷人。你看见开着皮卡来的承包商，也看见穿着旧西装来的退休教师。",
        "他们恨的是同一件事：政府拿纳税人的钱去救那些搞砸了的银行，而他们的房子还在被收走。",
        "组织者给你留了十五分钟。你可以站他们那边，也可以劝他们冷静——但你不能不表态。"
      ],
      "rumor": [
        "有人说背后有电视台主持人在带节奏，下周他会从直播里骂街。",
        "有人说这同一批人里已经有人在聊明年的选举，想找一个「自己人」去参选。",
        "有人低声说，这场运动过两年会被人贴上一个标签，然后变成一股真正的力量。"
      ],
      "unknown": [
        "这股愤怒会持续多久、会长成什么样、最后被谁收走——没人知道。",
        "你今晚说的每一句话都会被录下来。其中一句会在几年后出现在对手的广告里。",
        "这些人四年后还记不记得你今晚站在哪一边。"
      ],
      "terms": [
        {
          "k": "茶党",
          "v": "借 1773 年波士顿倾茶事件取名的草根抗议运动，核心诉求是反对政府开支与税收。"
        },
        {
          "k": "市镇厅会议",
          "v": "美国基层的公开质询会。议员在这种场合直面选民，往往会被当场质问，也会被录像。"
        },
        {
          "k": "法拍",
          "v": "房屋被贷款机构强制拍卖。2008 年前后美国有数百万家庭经历了这件事。"
        }
      ]
    },
    "title": "茶党纳税人挤满会场，要你就救银行表态",
    "body": "一群自称‘茶党’的纳税人把会场挤满。他们要你表态：政府到底该不该再印一张钞票？",
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
    "brief": {
      "lede": "一个对冲基金的朋友递给你一份数据。数字不算难看，难看的是它的斜率。",
      "known": [
        "递数据的人叫 R，在康涅狄格州一家基金做事，做的是房贷证券的定价模型。",
        "数字显示：几种被评级机构标为「优质」的房贷池，逾期率正在以异常的速度往上爬。按历史模型，这不该发生。",
        "他的说法是：「模型没错，是模型的假设前提错了。」",
        "你要么跟着下注——通过信用违约互换做空这些房贷证券，要么把这份数据公开。"
      ],
      "rumor": [
        "R 说他不是唯一看见的人，有几家基金已经在悄悄建仓。",
        "有人说某家大型投行的杠杆倍数高得离谱，一旦短期拆借市场收紧，几天就能撑不住。",
        "有人说评级机构知道这件事，只是不想降级。"
      ],
      "unknown": [
        "这一切什么时候会崩、先崩谁——你知道方向，但不知道时间表。",
        "你会不会在崩盘到来之前，就先被自己的仓位拖死。",
        "崩盘之后，坐在听证席上被质问的人会是谁。"
      ],
      "terms": [
        {
          "k": "次贷",
          "v": "面向信用较差借款人的住房贷款，违约率高。"
        },
        {
          "k": "CDS",
          "v": "信用违约互换。一种类似保险的合约：你定期付保费，标的债券一旦违约，对方赔付。做空的常用工具。"
        },
        {
          "k": "杠杆",
          "v": "借钱放大仓位。赚钱时收益翻倍，亏钱时会被追缴保证金并被迫平仓。"
        },
        {
          "k": "回购市场",
          "v": "金融机构互相短期拆借的市场。投行靠它过日子，它一旦冻结，投行几天就会倒。"
        }
      ]
    },
    "tracks": [
      "wealth",
      "celebrity"
    ],
    "title": "一位基金朋友递来数据，劝你押上身家做空房市",
    "body": "一位对冲基金朋友递来一份数据：那些‘优质’房贷，违约率正在静默攀升。跟着下注，你可能一夜暴富，也可能万劫不复。",
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
    "brief": {
      "lede": "一张支票，换你在能源委员会上的一个点头。",
      "known": [
        "主人是德州来的能源商人，在城里有一栋房子和一个永远订满的餐厅包厢。",
        "他要的东西非常直白：希望你在他关心的那条立法上「理解他的处境」。",
        "他开出的数字够你把整个竞选撑完，还剩下钱养团队。",
        "同席还有两个你认识的议员，他们看起来比你睡得安稳。"
      ],
      "rumor": [
        "有人提醒你：他前年给另一位议员塞过更重的东西，后来那位议员投桃报李，通过了对他有利的条款。",
        "有人说他喜欢留一手——录音或者录像——用来「维持关系的稳定」。",
        "有人说 2008 年这种年份，捐款人比政客更怕被看见。"
      ],
      "unknown": [
        "这笔钱会不会在某一天以丑闻的形式回到你面前。",
        "同席那两位议员各自付出了什么代价。",
        "几年后会有更严格的披露规则，届时所有旧账都会被重新翻出来。"
      ],
      "terms": [
        {
          "k": "政治献金",
          "v": "个人或机构向竞选活动提供的资金，有法定上限。绕过上限的各种方式构成了这个行业的大部分阴暗面。"
        },
        {
          "k": "能源委员会",
          "v": "国会中主管能源政策的委员会，对石油、天然气、电力的监管有实质影响力。"
        },
        {
          "k": "游说",
          "v": "由专业公司代表利益集团影响立法。合法，但高度渗透。"
        }
      ]
    },
    "tracks": [
      "electoral",
      "operative",
      "wealth"
    ],
    "title": "一位石油大亨的晚宴",
    "body": "他想要‘一个能听进话的人’。一张支票足以撑起你整个竞选，条件是‘在能源委员会投对的票’。",
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
    "brief": {
      "lede": "凌晨一点十七分的一条消息。你很清楚这意味着什么。",
      "known": [
        "发消息的人是你一位同僚的助理，你们在几场活动上见过。",
        "你喝了酒，你的婚姻正处在没人愿意多提的阶段。",
        "她是那位同僚最信任的人——他的日程、他的电话簿、他和谁吃过饭，她全都知道。",
        "这件事如果被拍照、被说话，你的政治生命会在四十八小时内结束。"
      ],
      "rumor": [
        "圈子里有人说你也已经听说了。这种消息在华盛顿传播得比任何政策都快。",
        "有人说你那位同僚本人最近也在闹同样的事——所以她比你想象的更不需要小心。"
      ],
      "unknown": [
        "枕边话在这座城市是硬通货：她会跟你说话，而说出来的东西未必只是情话。",
        "痴心的人是最好用的人——也是最难撤的人。这条规则你此刻还没体会。",
        "有没有第三个人已经知道这条消息的存在。"
      ],
      "terms": [
        {
          "k": "绯闻政治",
          "v": "在美国政治中，私生活丑闻的杀伤力取决于时机与证据：有无照片、有无录音、是否在任期内曝光。"
        },
        {
          "k": "枕边情报",
          "v": "亲密关系里流通的信息。不合法也不非法，但比大多数简报都新鲜。"
        }
      ]
    },
    "title": "一位同僚的助理深夜发来暧昧邀约",
    "body": "一位同僚的助理，深夜发来一条消息。你知道这意味着什么——也知道一旦被拍下，什么都完了。\n但你也知道另一件事：她枕着的是那个人的全部秘密。",
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
    "brief": {
      "lede": "她说的那份「下周的事」，真的发生了。现在轮到你决定怎么用。",
      "known": [
        "她当初在枕边说的三件事，两件已经应验——那位同僚果然在委员会里塞进了自己的人。",
        "现在摆在面前的是一场关键表决：那位同僚的席位是决定票之一，而他的婚房首付和「咨询合同」的事只有你知道。",
        "她的最新消息只有一行：「他下周会很脆弱。」"
      ],
      "rumor": [
        "有人说她也把同样的话告诉过别人——情报员从不止一个买家。",
        "有人说那位同僚已经在怀疑身边有耳朵，正在换人。"
      ],
      "unknown": [
        "用这份情报的每一种方式，都会留下「你怎么会知道」的问题。",
        "她要的回报是什么，此刻还没有说。"
      ],
      "terms": [
        { "k": "枕边情报的用法", "v": "三种：直接放给媒体（脏但快）、私下警告本人（换人情）、留着自己用（最安全也最浪费）。第四种是不用——但它不会过期，只会发酵。" }
      ]
    },
    "title": "情人透露的同僚秘密现在能左右一场表决",
    "body": "那位同僚即将在关键表决里出手。而他不知道的是——他的秘密，此刻睡在你这边。\n怎么用？",
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
    "brief": {
      "lede": "竞选打到一半，对手的挖坟队挖到了那年冬天。",
      "known": [
        "你的竞选经理把一张照片放在桌上：就是那次。有日期，有地点。",
        "发件人匿名，但时机精准——三周后就是初选投票日。",
        "你的妻子还不知道。你的选民也不知道。这两件事将在同一个星期结束。"
      ],
      "rumor": [
        "有人说照片是对手从私家侦探手里买的，花了六位数。",
        "有人说她本人就是源头——被你伤过的人比比皆是。"
      ],
      "unknown": [
        "认下来能不能活：这个州有过先例，两种结果都有。",
        "她此刻在哪里、会不会被找到、被问到时会说什么——你完全不知道。"
      ],
      "terms": [
        { "k": "认或否认", "v": "美国政治丑闻的古典命题：否认到底（赌证据链断）、抢先承认（赌选民疲劳）、还是归档为「私事」（赌媒体转向）。三种都有人活下来过，也都有人死掉。" }
      ]
    },
    "title": "对手拿到了你外遇的照片，三周后就是投票日",
    "body": "竞选经理把照片推到你面前：「三周后投票。」\n那张照片在你手里很轻，在选民眼里会很重。",
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
    "brief": {
      "lede": "镜头已经开了。对方问到第一个人身攻击的题目。",
      "known": [
        "这是直播，没有剪辑的机会。全国观众里有九成此刻才第一次认真看你。",
        "对方的问题里埋了一个预设：只要你回答，就等于承认了那个预设。",
        "你的团队在台下做手势，但你看不清他们在比什么。",
        "规则给的回应时间是九十秒。你已经用掉三十五秒。"
      ],
      "rumor": [
        "有人赛前告诉你，对方准备了三个针对你的攻击点，今晚只会用其中一个。",
        "有人说对手阵营手里还有一份没公开的材料，留着以后用。"
      ],
      "unknown": [
        "这三十秒会怎么被剪、被截屏、被做成什么，第二天你才知道。",
        "观众记住的是你的回答，还是你停顿的那两秒。",
        "后面还有辩论。你的形象会被今晚这一晚定下来。"
      ],
      "terms": [
        {
          "k": "直播辩论",
          "v": "候选人同台直播回答提问。失言无法剪辑，事后会被反复回放。"
        },
        {
          "k": "预设问题",
          "v": "提问里已经包含了未经证明的前提。接受前提再辩解，往往比不回答更糟。"
        },
        {
          "k": "镜头切换",
          "v": "电视导播在两人之间切画面。一个表情包的传播力常常超过整段论述。"
        }
      ]
    },
    "tracks": [
      "electoral",
      "celebrity"
    ],
    "title": "直播辩论的陷阱",
    "body": "对手抛出一个你根本没准备的问题，镜头直对着你。全场在等。",
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
    "brief": {
      "lede": "一个以你名字命名的地方。它可以是慈善，也可以是别的东西。",
      "known": [
        "在美国，政客成立与自己同名的基金会是常规操作：可以募款、可以雇人、可以做「社区服务」。",
        "基金会的账目只要请一家合格的会计师事务所，就可以合法地不公开绝大部分细节。",
        "你身边的人已经算过一笔账：它能同时解决钱、人和名声三个问题。",
        "但你清楚，一旦它成了工具，你就不再只是它的创始人。"
      ],
      "rumor": [
        "有人说某位议员靠着自家基金会养了八个「顾问」，那些人一个都没上过班。",
        "有人说税务局查这类机构查得很松，但媒体查得很紧。"
      ],
      "unknown": [
        "几年后会不会有记者专门去翻你基金会的每一张报销单。",
        "那些「顾问」里，谁会第一个开口。",
        "它会不会在你最需要体面的时候，成为你最不体面的部分。"
      ],
      "terms": [
        {
          "k": "基金会",
          "v": "美国的非营利组织。合规运作可以抵税、募款、雇人；一旦被认定自肥或洗钱，是联邦重罪。"
        },
        {
          "k": "免税资格",
          "v": "税法给予非营利组织的免税地位，申请与维持都有严格限制。"
        },
        {
          "k": "会计师事务所",
          "v": "负责审计的组织。基金会每年需要它出一份报告。"
        }
      ]
    },
    "tracks": [
      "operative",
      "wealth"
    ],
    "title": "成立你自己的基金会",
    "body": "一个以你名字命名的东西，能洗白、能筹款、能养人。也能成为明天的罪证。",
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
    "brief": {
      "lede": "你随手发出去的那句话，现在有两万个人在转。",
      "known": [
        "你在凌晨随手发了一条，嘲讽当天的那条新闻。你当时觉得很聪明。",
        "半小时后它被一个大号转了，然后有两万次转发，然后有人开始截图，配上一句「这就是他们的真面目」。",
        "你的团队说：越删越像心虚；不删，明天早报会引用它。",
        "你心里清楚，那句话如果不带那个词，本来没有任何问题。"
      ],
      "rumor": [
        "有人说几个大博主正在排时间，准备一起发。",
        "有人说对手阵营已经联系了记者。"
      ],
      "unknown": [
        "这件事会在多快之后被忘记。",
        "会不会有人把这条永久保存下来，在你最需要体面的时候拿出来。",
        "将来这个平台会变成什么样子——每一条旧发言都会被算法重新翻出来。"
      ],
      "terms": [
        {
          "k": "截图政治",
          "v": "任何发言都可能被截图储存在别人的硬盘里，永久有效。"
        },
        {
          "k": "转发风暴",
          "v": "一条内容在数小时内被大量账号扩散，往往在当事人察觉之前就已经失控。"
        }
      ]
    },
    "tracks": [
      "celebrity"
    ],
    "title": "一条失控的推文",
    "body": "你随手发了一条，半小时后有了两万转发。有人把它读成了别的意思。",
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
    "brief": {
      "lede": "电话那头说：我们想请您未来的委员会「理解」一下我们的处境。",
      "known": [
        "K 街是华盛顿的游说公司聚集地。这条街的电话，比任何选民来电都更容易打到议员办公室。",
        "对方代表的是一个行业协会，会员里有几家你熟悉的公司。",
        "他能提供的东西很具体：竞选捐款、一份薪水丰厚的「顾问」合同、一群会替你打电话的人。",
        "他还带了一句不那么客气的话：如果你不接，他也会去找你的对手。"
      ],
      "rumor": [
        "有人说这个人前年运作过一次立法，把一条监管条款改成了对自己有利的措辞。",
        "有人说他跟某位委员会主席关系很近，近到可以决定议程。",
        "有人说现在风声紧，做事最好别留纸。"
      ],
      "unknown": [
        "这条线上的钱，有多少是合法的，有多少只是还没被发现。",
        "对方手上有没有录音。",
        "几年后，会有一场改革把这类操作的规则彻底翻新。"
      ],
      "terms": [
        {
          "k": "K 街",
          "v": "华盛顿特区的一条街，游说公司密集，代指整个游说行业。"
        },
        {
          "k": "委员会主席",
          "v": "国会各委员会的主持者，掌握议程排期权，是游说行业的首要目标。"
        },
        {
          "k": "游说改革",
          "v": "限制游说者与议员接触、强制披露捐款与游说支出的立法改革。"
        }
      ]
    },
    "tracks": [
      "operative",
      "wealth"
    ],
    "title": "一位游说者打电话要你为行业协会办事",
    "body": "‘我们想请您未来的委员会，“理解”一下我们的处境。’翻译过来：钱，或者刀。",
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
    "brief": {
      "lede": "党内建制推了另一个人。你的选择是不打，或者掀桌子。",
      "known": [
        "党内初选是各州分别投票，赢者拿代表席位，最终在党代会上定提名人。",
        "党的机器、基层组织和筹款网络，都在建制候选人手里。",
        "你在基层收到的反馈不错，但那不能直接换成代表席位。",
        "规则是：挑战建制派，你会输掉党内的信任；服从，你会输掉自己的时间。"
      ],
      "rumor": [
        "有人说主席私下表示，只要你这次「懂事」，下一次会许你一个好位子。",
        "有人说你的支持者里已经有人开始串联，准备自己筹钱推你。",
        "有人说建制候选人有旧账在对手手里，但没人敢动。"
      ],
      "unknown": [
        "初选之后，党内会怎么对待一个掀过桌子的人。",
        "你今晚的决定会不会被写进某个派系对你的长期评价里。",
        "下一次机会什么时候来。"
      ],
      "terms": [
        {
          "k": "初选",
          "v": "党内提名选举。赢下足够代表席位即可拿到本党提名。"
        },
        {
          "k": "代表席位",
          "v": "支持特定候选人的党内代表名额，党代会上用于表决提名人。"
        },
        {
          "k": "建制派",
          "v": "掌握党内资源与组织机器的既有人士。"
        }
      ]
    },
    "tracks": [
      "electoral",
      "celebrity",
      "wealth"
    ],
    "title": "党内建制推了别人，你要决定是否掀桌挑战初选",
    "body": "党内建制推了另一个人。你要不打就认输，要打就掀了桌子。",
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
