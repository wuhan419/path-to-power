/* ============================================================================
 * CONTENT · 51-era-1960.js
 * 时代：1960 新边疆 —— 该时代专属事件。
 * 事件结构见 docs/CONTENT-SCHEMA.md
 * ==========================================================================*/

POTUS.define("event", [
  {
    "id": "1960_tv",
    "grade": "major",
    "category": "media",
    "medium": "tv",
    valence: "risk", dyn: true,
    "era": [
      "1960_CAMELOT"
    ],
    "tierMin": 0,
    "tierMax": 5,
    "weight": 12,
    "month": 9,
    "day": 26,
    "brief": {
      "lede": "历史上第一次，两位总统候选人要在同一块屏幕上同时出现。",
      "known": [
        "这是美国历史上第一次电视直播的总统候选人辩论。听收音机的人和看电视的人，会得到两个完全不同的版本。",
        "规矩是：不许看笔记，不许打断，镜头随时切。",
        "你的对手经验比你丰富，但他的体力不好，而且前几周刚病过一场。",
        "化妆师说：镜头会放大一切。你只要自然后仰，就够赢了。"
      ],
      "rumor": [
        "有人听过电台转播的版本，说对手「赢了」。",
        "有人说真正决定结果的是那天看屏幕的几千万人，而不是听广播的人。",
        "有人提醒你：政策讲得再好，也敌不过一个画面。"
      ],
      "unknown": [
        "这一夜会不会被写进历史书的某一章。",
        "电视从此以后会把政治变成什么样子。",
        "十天后还有一场。对手的团队回去会做什么调整。"
      ],
      "terms": [
        {
          "k": "电视辩论",
          "v": "1960 年的这场辩论是首次电视直播的总统候选人辩论，此后成为美国选举的固定环节。"
        },
        {
          "k": "上镜",
          "v": "候选人首次需要为上电视而化妆、打光、控制体态。"
        }
      ]
    },
    "title": "第一次电视辩论",
    "body": "镜头会吃掉一切不自然。化妆师说，你要么成为新星，要么成为笑料。",
    "choices": [
      {
        "id": "shine",
        "text": "把镜头当舞台",
        "base": 0.55,
        "mods": [
          {
            "src": "attr",
            "key": "CHA",
            "w": 0.6
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你赢了‘荧幕之战’，全国记住了你的脸。",
            "effects": {
              "rep": 1.5,
              "fac": {
                "base": 15
              }
            }
          },
          "ok": {
            "body": "你不怯场，印象分不错。",
            "effects": {
              "rep": 0.7,
              "fac": {
                "base": 8
              }
            }
          },
          "meh": {
            "body": "还行，但对手更有镜头感。",
            "effects": {
              "rep": 0.2,
              "fac": {
                "base": 3
              }
            }
          },
          "fail": {
            "body": "你显得僵硬，电台却赢了。",
            "effects": {
              "rep": -0.2,
              "fac": {
                "base": -5
              }
            }
          },
          "critfail": {
            "body": "你冒了汗，特写成为丑态。",
            "effects": {
              "rep": -0.9,
              "fac": {
                "press": -10,
                "base": -8
              }
            }
          }
        }
      },
      {
        "id": "substance",
        "text": "只拼政策不拼脸",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "INT",
            "w": 0.5
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你的数据碾压对手，社论盛赞‘内容取胜’。",
            "effects": {
              "rep": 0.9,
              "fac": {
                "press": 12,
                "establishment": 5
              },
              "attr": {
                "INT": 3
              }
            }
          },
          "ok": {
            "body": "你稳住了知识份子的票。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "press": 6
              }
            }
          },
          "meh": {
            "body": "专家认可，观众嫌闷。",
            "effects": {
              "rep": 0.1,
              "fac": {
                "press": 3,
                "base": -3
              }
            }
          },
          "fail": {
            "body": "你被说‘书呆子’。",
            "effects": {
              "fac": {
                "base": -4
              }
            }
          },
          "critfail": {
            "body": "你记错一个数字，全场哗然。",
            "effects": {
              "rep": -0.7,
              "fac": {
                "press": -10
              },
              "attr": {
                "INT": -4
              }
            }
          }
        }
      }
    ]
  },
  {
    "id": "1960_civil",
    "grade": "major",
    "category": "civil",
    "medium": "tv",
    valence: "risk", dyn: true,
    "era": [
      "1960_CAMELOT"
    ],
    "tierMin": 1,
    "tierMax": 5,
    "weight": 11,
    "month": 10,
    "day": 26,
    "brief": {
      "lede": "一位民权领袖请你同台。你的政党在南方的票仓会因此恨你。",
      "known": [
        "南方的种族隔离没有写在联邦法律里，却在日常生活里无处不在。",
        "你的政党在南方的票仓，依赖一批坚决反对联邦干预种族问题的白人选民。",
        "请你同台的那位领袖，不久前在一场坐下抗议中被捕，关进了州立监狱。",
        "你站在台上说的话，会被南方每一家报纸引用，也会被北方每一家报纸引用。"
      ],
      "rumor": [
        "有人说对手的竞选团队正在考虑公开表态声援，但还没有动。",
        "有人说一通打给家属的电话，就能让北方几个大城市的黑人选票整块转向。",
        "有人说南方有些县已经在筹备组织，专门对抗这类表态。"
      ],
      "unknown": [
        "你今晚的措辞，十年后会怎么被评价。",
        "民权运动接下来会走到哪里，会不会溅血。",
        "你政党内部对这件事的分裂，会不会在几年后爆发。"
      ],
      "terms": [
        {
          "k": "坐下抗议",
          "v": "在种族隔离的场所静坐拒绝离开的抗议方式，1960 年在美国南方大规模发生。"
        },
        {
          "k": "州立监狱",
          "v": "因抗议被逮捕的人常被关进州立监狱，保释往往被故意拖延。"
        },
        {
          "k": "白人公民委员会",
          "v": "南方反对民权改革的白人组织。"
        }
      ]
    },
    "title": "南方的一座教堂",
    "body": "民权领袖请你同台。你的政党在南方的票仓会因此恨你。",
    "choices": [
      {
        "id": "stand",
        "text": "站上教堂台阶",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
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
            "body": "你成了道义标杆，历史会记得这一夜。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "base": 20,
                "labor": 10
              },
              "attr": {
                "INTG": 5
              }
            }
          },
          "ok": {
            "body": "你赢得良知票，失去南方保守票。",
            "effects": {
              "rep": 0.7,
              "fac": {
                "base": 12,
                "labor": 6,
                "establishment": -8
              }
            }
          },
          "meh": {
            "body": "你去了，但发言含糊。",
            "effects": {
              "rep": 0.3,
              "fac": {
                "base": 6,
                "establishment": -4
              }
            }
          },
          "fail": {
            "body": "你临阵改口，两头不是人。",
            "effects": {
              "rep": -0.2,
              "fac": {
                "base": -6,
                "establishment": -4
              }
            }
          },
          "critfail": {
            "body": "你说了句种族歧视旧调，被录音，政治生命蒙尘。",
            "effects": {
              "rep": -1,
              "fac": {
                "base": -18,
                "press": -15
              },
              "flags": [
                "scandal_3"
              ]
            }
          }
        }
      },
      {
        "id": "avoid",
        "text": "以‘日程冲突’婉拒",
        "base": 0.65,
        "mods": [
          {
            "src": "fac",
            "key": "establishment",
            "w": 0.3
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你巧妙缺席又不显怯懦。",
            "effects": {
              "fac": {
                "establishment": 6
              }
            }
          },
          "ok": {
            "body": "你保住了南方票。",
            "effects": {
              "fac": {
                "establishment": 4,
                "base": -4
              }
            }
          },
          "meh": {
            "body": "有人注意到你没去。",
            "effects": {
              "fac": {
                "base": -3
              }
            }
          },
          "fail": {
            "body": "回避被当成怯懦。",
            "effects": {
              "fac": {
                "base": -8
              }
            }
          },
          "critfail": {
            "body": "你‘冲突’的借口当天被戳穿。",
            "effects": {
              "fac": {
                "base": -10,
                "press": -6
              }
            }
          }
        }
      }
    ]
  },

  /* ==========================================================================
   * 以下为 1960 时代的"纵深"内容：把 v0.4 的三套新机制（把柄 / 人脉 / 灰产）
   * 放回它自己的年代里 —— 1960 年的把柄不是复印机，是联邦调查局的一页纸；
   * 1960 年的基层不是社交媒体，是南区礼拜堂的周日早晨。
   * ======================================================================== */

  {
    id: "1960_fbi", grade: "mid", valence: "bane", dyn: true, category: "scandal", era: ["1960_CAMELOT"],
    tierMin: 1, tierMax: 5, weight: 11,
    title: "来客没有留下名片",
    body: "两个穿深色西装的人在你的办公室外等了四十分钟，没有预约，也没有解释。\n" +
      "他们进门之后先夸了你的办公室，然后说了一句谁都听得懂的话：\n" +
      "「我们手上有很多人的材料。有些人我们从来不用。」\n" +
      "他们把一份薄薄的东西放在桌上，标题是打字机打的，下面空着签名。",
    brief: {
      lede: "1960 年，这个国家有一间谁都不敢提的档案室。它不抓人，它只是记住。",
      known: [
        "这份东西记录的是你另外一个朋友的事，不是你的事 —— 这才是它被放在你桌上的原因。",
        "他们不缺材料，他们缺的是「愿意替他们传话的人」。",
        "这间办公室里有三样东西可以让他们真的动你，其中两样他们已经有了。",
        "他们不会再来第二次。这不是威胁，这是这个机构的办事习惯。"
      ],
      rumor: [
        "有人说上个月有一位州议员因为不肯配合，忽然被查了六年前的税务。",
        "有人说这间档案室里最厚的那一格，属于这个国家最有名的那几位。"
      ],
      unknown: [
        "如果这份东西被转给了南方那几家报纸，你那位朋友会怎样。",
        "你今天在这间办公室里说的话，会不会也进那份档案。"
      ],
      terms: [
        { k: "材料", v: "1960 年的把柄是纸、是照片、是录音带。它的可怕之处在于没有人知道总量。" },
        { k: "替你记住", v: "这个机构的工作方式：不处理你，只是把你放在某一格里。" }
      ]
    },
    choices: [
      {
        id: "accept", text: "收下。以后有事，你知道该找谁",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "agency", w: 0.3 }],
        cost: { ap: 2 }, stake: { ap: true, fav: true },
        outcomes: {
          crit: { body: "你收下了那份东西，还顺手问了一个他们没准备的问题。其中一个笑了——他记住你了，用好的那种方式。你从此有一个电话可以打，也从此有一格抽屉属于你。", effects: { lev: 1, rep: 0.8, contact: { fed: 14 }, fac: { agency: 14, establishment: 6 } } },
          ok: { body: "你收下了。他们把东西留在桌上就走了。你把它锁进抽屉最里层，然后去开下一场会。", effects: { lev: 1, contact: { fed: 8 }, fac: { agency: 8 } } },
          meh: { body: "你收下了，但他们看出来你不太愿意。他们不缺一个勉强的人。", effects: { lev: 1, hp: -0.8, contact: { fed: 2 }, fac: { agency: 3 } } },
          fail: { body: "你收下了，又问了太多问题。他们走的时候把你的名字记在了另一本册子上。", effects: { lev: 1, hp: -1, fac: { agency: -8 } } },
          critfail: { body: "你收了那份材料，还拿它去换了一个人情。三个月后你才知道，那份材料是他们故意给你的。", effects: { lev: 1, rep: -1, fac: { agency: -14 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "refuse", text: "推回去。让他们自己处理自己那份东西",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.55 }],
        cost: { rep: 0.4 },
        outcomes: {
          crit: { body: "你把纸推回去，说：「这件事您该找他本人谈。」办公室里安静了六秒。他们把东西收起来，临走时那位年纪大的说了一句：「我记住您了。」这句话在 1960 年有很多种读法，你后来发现是好的那一种。", effects: { rep: 1.5, fac: { agency: 8, base: 6, establishment: 4 } } },
          ok: { body: "你推回去了。他们没有为难你，也没有再来。", effects: { rep: 0.8, fac: { agency: 4, base: 3 } } },
          meh: { body: "你推回去了，但话说得很客气，客气到他们不确定你的意思。", effects: { rep: 0.2, fac: { agency: 1 } } },
          fail: { body: "你说得太硬了。他们走的时候那句话是：「希望您将来不需要我们。」", effects: { rep: 0.2, hp: -0.8, fac: { agency: -10 } } },
          critfail: { body: "你把这件事说给了别人听。第三个星期，你的司机被问过一次话，而你的办公室开始有人在外面拍照。", effects: { rep: -0.6, hp: -1.25, fac: { agency: -16 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "nothing", text: "什么都不说，把这件事放在今天之后",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你不置可否，然后在一周内把该打的电话都打了一遍——不是找他们，是找你自己的朋友。你把这件事变成了一件有别人知道的事。这是 1960 年最聪明的做法。", effects: { rep: 0.8, contact: { fixer: 8, columnist: 6 }, fac: { base: 5, agency: 4 } } },
          ok: { body: "你没表态。他们走了，那份东西也走了。这件事从此没有再被提过。", effects: { rep: 0.4, fac: { base: 2 } } },
          meh: { body: "你没表态，也没有人再问。你花了很多个晚上想这件事，这是唯一的代价。", effects: { hp: -0.8 } },
          fail: { body: "你以为不表态就是安全。三个月后你发现，他们把你的沉默读成了默认。", effects: { rep: -0.4, hp: -1, fac: { agency: -6 } } },
          critfail: { body: "你什么都没说，也什么都没做。这份材料里的那位朋友，后来在一场听证会上替所有人承担了责任。", effects: { rep: -0.8, hp: -1, contact: { fed: -10 }, fac: { base: -6, agency: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  {
    id: "1960_church", grade: "minor", valence: "risk", dyn: true, category: "civil", era: ["1960_CAMELOT"],
    tierMin: 0, tierMax: 4, weight: 10,
    title: "选民登记表",
    body: "南区那间礼拜堂的牧师在教堂后面摆了一张折叠桌，上面放着六十张选民登记表。\n" +
      "来登记的人要在门口报出自己的住址，然后被问三个问题 —— 三个和识字、宪法和算术有关的问题。\n" +
      "答错一个，表格就作废。\n" +
      "牧师问你：「你能不能坐在那张桌子后面，替他们作保？」",
    brief: {
      lede: "在这个年代，一张登记表上的签名，比一场集会更能决定谁有资格说话。",
      known: [
        "这三道题的通过率取决于问问题的人是谁 —— 这是这套制度真正的设计。",
        "坐在桌子后面作保的人，会被登记员记下名字。",
        "牧师已经找到了四十个人，但他缺一个「外面的人」坐在那里。",
        "礼拜天上午是他一周里唯一能凑齐两百个人的时段。"
      ],
      rumor: [
        "有人说上个月邻县有两间教堂的登记桌被人半夜掀了。",
        "有人说县里已经在讨论要不要把登记点从教堂挪走。"
      ],
      unknown: [
        "如果今天有人被拒，会不会有事发生。",
        "你坐在那里这件事，会被谁记下来、记多久。"
      ],
      terms: [
        { k: "识字测试", v: "1960 年南方用来阻挡黑人选民登记的手段之一。题目的难度由提问者决定。" },
        { k: "作保", v: "由一位有身份的社区外人士签名担保登记人的住址与身份。" }
      ]
    },
    choices: [
      {
        id: "sit", text: "坐下。从上午九点坐到下午四点",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "attr", key: "CHA", w: 0.25 }],
        cost: { ap: 2, rep: 0.8 }, stake: { ap: true, fav: true },
        outcomes: {
          crit: { body: "你坐了一整天。六十张表格里有五十一张被接受，这个数字在县里传了很久。散场的时候牧师没有谢你，他只是把那张折叠桌收起来，说：「下个月还来。」", effects: { rep: 5, contact: { preacher: 18 }, fac: { civil: 20, base: 14, church: 10, establishment: -10 }, flags: ["enclave_base"] } },
          ok: { body: "你坐了一天。有三个人被拒，其中一位女士在门口站了很久。你把她的名字和地址记了下来。", effects: { rep: 2.75, contact: { preacher: 10 }, fac: { civil: 12, base: 8, establishment: -6 } } },
          meh: { body: "你坐了半天就走了。牧师没有说什么，但他记住了你几点离开的。", effects: { rep: 0.8, contact: { preacher: 4 }, fac: { civil: 5, base: 3 } } },
          fail: { body: "你在桌子后面和登记员争了两句。争完之后，那天下午的每个人都被问了第四道题。", effects: { rep: -0.8, contact: { preacher: -4 }, fac: { civil: 4, base: 2, establishment: -8 } } },
          critfail: { body: "那天下午有人在教堂门口等着你。你没有受伤，但你从此明白了这件事在这个县里意味着什么。", effects: { rep: -1.5, hp: -4, contact: { preacher: 4 }, fac: { civil: 8, base: 4, establishment: -12 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fund", text: "不作保，但出钱把这件事变得专业",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: { body: "你出了钱：一辆能跑县城三趟的车、一台油印机、还有一位懂宪法的退休教师。到年底，这个县被接受的登记表是去年的四倍。", effects: { rep: 3, contact: { preacher: 12, brother: 6 }, fac: { civil: 14, base: 8, church: 8 } } },
          ok: { body: "钱出了，油印机买了。牧师说：「下个月来的人会多一点。」", effects: { rep: 1.5, contact: { preacher: 7 }, fac: { civil: 8, base: 5 } } },
          meh: { body: "钱出了，但那台油印机三个月后才送到，中间一直在某个仓库里。", effects: { rep: 0.4, contact: { preacher: 2 }, fac: { civil: 3 } } },
          fail: { body: "你出的钱被一位经手人拿了一半。牧师没有告诉你，你自己查出来的。这件事你们两个人都没有提。", effects: { rep: -0.4, contact: { preacher: -3 }, fac: { civil: 2 } } },
          critfail: { body: "有人把你捐款的数额和用途登在了县报的地方版上，标题是问句。那间教堂的那个月没能摆出登记桌。", effects: { rep: -1.5, contact: { preacher: -8 }, fac: { civil: -8, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "message", text: "不出面。托一句问候过去",
        base: 0.7, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你没有去，但你托人送去了一句话：「这件事我不出面，但我不会说反话。」在 1960 年的南方，这句话对某些人来说是很有分量的。", effects: { rep: 1.25, contact: { preacher: 5 }, fac: { civil: 5, base: 3 } } },
          ok: { body: "你托人带了话。牧师回了两个字：「知道了。」", effects: { rep: 0.4, contact: { preacher: 2 }, fac: { civil: 2 } } },
          meh: { body: "你的话在路上变了形。传到牧师那里时，已经成了「他最近很忙」。", effects: { rep: -0.4, fac: { civil: -2 } } },
          fail: { body: "你什么都没做。那个月摆出来的六十张表，最后只有十七张被接受。", effects: { rep: -0.8, fac: { civil: -6, base: -4 } } },
          critfail: { body: "你不出面这件事，被你的对手替你说了一遍，而且说得比你打算说的那句更响。", effects: { rep: -2, contact: { preacher: -8 }, fac: { civil: -12, base: -8 } } }
        }
      }
    ]
  },

  {
    id: "1960_dock", grade: "mid", valence: "risk", dyn: true, category: "political", era: ["1960_CAMELOT"],
    tierMin: 1, tierMax: 5, weight: 10,
    title: "七号码头",
    body: "码头工会的办公室在七号仓库的二楼，门上的漆已经掉了一半。\n" +
      "他们管着这个港口一千两百个工作岗位，以及一个更重要的东西：谁能进港区。\n" +
      "头目把一张通行证推到你面前，然后说：「你不用马上回答我。\n" +
      "你只要告诉我一件事：你进来以后，会不会把我们卖掉。」",
    brief: {
      lede: "在港口城市，能进港区的人比能进市政厅的人少。",
      known: [
        "这一千两百张票通常听工会的，但前提是工会自己团结。",
        "他们内部正在吵一件事：要不要接那一批自动化吊车。",
        "那张通行证是长期的。它意味着这个港区的每一场会你都能进场。",
        "头目今年五十九岁，明年要退。他还没定接班人。"
      ],
      rumor: [
        "有人说他上面还有人，那个人收的不是钱，是「信息」。",
        "有人说那一批吊车背后是一个你也认识的名字。"
      ],
      unknown: [
        "他真正想从你这里拿到的，是一个承诺还是一句话。",
        "如果他明年退了，这张通行证还算不算数。"
      ],
      terms: [
        { k: "通行证", v: "进港区的凭证。它的价值不在于那张纸，在于谁批的。" },
        { k: "自动化吊车", v: "1960 年的码头正面临第一次机械替代。它决定的是明年还有多少岗位。" }
      ]
    },
    choices: [
      {
        id: "take", text: "收下通行证，把话说明白：我不卖人",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "labor", w: 0.35 }],
        cost: { ap: 2 }, stake: { ap: true, fav: true },
        outcomes: {
          crit: { body: "你把通行证收进口袋，只说了一句：「我进来是为了替你们的合同签字，不是为了替你们的敌人签字。」他看了你很久，然后叫进来三个人，一个一个介绍了名字。", effects: { rep: 1.75, fav: 1, contact: { union_boss: 18, fixer: 8 }, fac: { labor: 22, base: 10 }, flags: ["union_backing", "street_army"] } },
          ok: { body: "他信了你，把通行证给了你。一年后你才发现，他也把同一张通行证给了别人。", effects: { rep: 1, contact: { union_boss: 10 }, fac: { labor: 12, base: 5 }, flags: ["union_backing"] } },
          meh: { body: "通行证拿到手了，但你感觉到有人在门口替你说话，也有人在门口替你说反话。", effects: { rep: 0.4, contact: { union_boss: 3 }, fac: { labor: 4 } } },
          fail: { body: "你说得太快，听起来像准备好的。他把通行证拿回去了一半 —— 只给你白天的。", effects: { rep: -0.6, contact: { union_boss: -8 }, fac: { labor: -12 } } },
          critfail: { body: "你把那句话说给了第三个人听。传到港区的时候，它变成了另外一句话，而那句话里有你的名字。", effects: { rep: -1.25, contact: { union_boss: -16 }, fac: { labor: -20, base: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "buy", text: "不参合他的话，直接买下一条装卸线",
        base: 0.55, mods: [{ src: "fac", key: "commercial", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 2 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你买下了三号码头的一条装卸线。这在这个港口是一个信号：你不是来要东西的，你是来雇人的。第二天有人在你办公室门口排队。", effects: { rep: 1.5, contact: { union_boss: 10, lobbyist: 6 }, fac: { commercial: 12, labor: 8 } } },
          ok: { body: "钱付了，线买下了。工会没有为难你，也没有特别欢迎你。", effects: { rep: 0.6, contact: { union_boss: 4 }, fac: { commercial: 8, labor: 4 } } },
          meh: { body: "你买下的是闲置最久的那一条。头目在收据上签字的时候笑了一下。", effects: { rep: 0.2, fac: { labor: 2 } } },
          fail: { body: "你买的那条线正卡在工会和厂方的一场仲裁里。你花钱买了一个麻烦。", effects: { rep: -0.6, contact: { union_boss: -6 }, fac: { commercial: 6, labor: -12 } } },
          critfail: { body: "你买下那条线的价格，比市价高了三成，而且这件事被写进了县报的商业版。港区里开始有人说你是替别人来的。", effects: { fun: -2, rep: -1, contact: { union_boss: -12 }, fac: { commercial: 4, labor: -18 } } }
        }
      },
      {
        id: "pass", text: "两个都不要。把通行证推回去",
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: { body: "你把通行证推回去，说：「等我真要替你们签字的那一年，我再来拿它。」头目点了点头。这句话三年后被人翻出来引用过一次。", effects: { rep: 1, contact: { union_boss: 8, preacher: 4 }, fac: { labor: 8, base: 5 } } },
          ok: { body: "你推回去了。你少了一个港区，多了一个没有欠人情的名声。", effects: { rep: 0.6, fac: { labor: 3, base: 3 } } },
          meh: { body: "你推回去了。半年后你需要进港区参加一场婚礼，被门口的保安拦了二十分钟。", effects: { rep: 0.2 } },
          fail: { body: "你的对手拿了那张通行证。到了秋天，港区的每一场集会上都有他的名字。", effects: { rep: -0.6, fac: { labor: -10, base: -5 } } },
          critfail: { body: "你推回去的那天，头目把通行证给了你的对手，并且加了一句：「那位先生嫌我们脏。」", effects: { rep: -1.25, contact: { union_boss: -12 }, fac: { labor: -18, base: -10 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  {
    id: "1960_radio", grade: "mid", valence: "risk", dyn: true, category: "media", era: ["1960_CAMELOT"],
    tierMin: 0, tierMax: 5, weight: 10, medium: "radio",
    title: "深夜十五分钟",
    body: "本地那家电台在晚上十一点一刻有一个十五分钟的时段，没有主持人，只有一个人对着话筒说话。\n" +
      "它从来不打广告，但那个时段在这个州很有名 —— 因为第二天早上总有人在饭桌上引用它。\n" +
      "电台经理把价目表放在你面前，然后说了一句奇怪的话：\n" +
      "「钱是次要的。我要知道你会不会在节目里点别人的名字。」",
    brief: {
      lede: "在电视还没有覆盖到所有卧室之前，深夜的收音机是唯一能直接进到人枕头边的政治。",
      known: [
        "这个时段的听众不多，但其中有一半是各地的编辑、牧师和小店主。",
        "节目一旦开始点名，就等于把一场冲突搬到公众面前，而且没有退路。",
        "电台的执照每三年要续一次，经理最不希望的就是节目被投诉。",
        "上个月同一时段的主讲人因为一句话，让一位州议员丢了一个委员会的位置。"
      ],
      rumor: [
        "有人说这个时段的真正赞助人是一家谁都不知道名字的基金会。",
        "有人说经理已经把两个名字列在黑名单上，只是还没说出口。"
      ],
      unknown: [
        "如果你点了名字，那个人会不会来找你。",
        "如果你不点，这个时段的听众会不会觉得你只是个念稿的人。"
      ],
      terms: [
        { k: "时段", v: "广播时代真正的资源。买下来的是别人一整夜的耳朵。" },
        { k: "点名", v: "在节目里直接说出对手的名字。它把政治变成一场有名字的对决。" }
      ]
    },
    choices: [
      {
        id: "buy", text: "买下时段，但一个字的名字都不点",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { fun: 0.4 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你讲了三周的县政预算，每期都在结尾留一分钟讲一个普通人的事。第四周开始，有牧师在布道时引用你。这个时段的收听率涨了一倍。", effects: { rep: 1.5, contact: { columnist: 10, preacher: 8 }, fac: { press: 14, base: 10, church: 6 } } },
          ok: { body: "你讲了四周，讲得干净。有人开始把你的名字和那个时段连在一起。", effects: { rep: 0.8, contact: { columnist: 6 }, fac: { press: 8, base: 5 } } },
          meh: { body: "你讲了四周，反响平平。经理说：「您讲得比上一位好，但上一位有人骂他。」", effects: { rep: 0.2, fac: { press: 3 } } },
          fail: { body: "第四期你读了一封听众来信，那封信其实是有人递给你安排的。听众里有人听出来了。", effects: { rep: -0.4, fac: { press: -4, base: -3 } } },
          critfail: { body: "节目里你说的一句关于农业补贴的话，被三个县的报纸同时引用，而且都做了相反的解读。你花了一个月解释。", effects: { rep: -1, fac: { press: -8, base: -6 } } }
        }
      },
      {
        id: "name", text: "点一个名字。让这个时段替你开一枪",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "press", w: 0.3 }],
        cost: { fun: 0.4, lev: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你用十一分钟讲清楚了那个人的一件事，全部有据可查，最后只说了他的名字和一句话：「这件事我不评论。」第二天他退出了一个委员会。你的节目成了那个时段的传奇。", effects: { rep: 2, lev: 1, contact: { columnist: 12, fed: 6 }, fac: { press: 16, base: 8, establishment: -8 }, flags: ["compromised"] } },
          ok: { body: "你点了名字。他受了伤，但不是致命的那种。电台经理第二周把价目表涨了一倍。", effects: { rep: 1, fac: { press: 8, establishment: -6 }, flags: ["compromised"] } },
          meh: { body: "你点了名字，但听众更关心那件事本身，而不是是谁做的。这件事没有形成冲击。", effects: { rep: 0.2, fac: { press: 2 } } },
          fail: { body: "他第二天就上了同一个时段的隔壁台，讲了四十分钟。你提供了他这个机会。", effects: { rep: -0.8, fac: { press: -8, establishment: -6 } } },
          critfail: { body: "你点名的那个名字，背后站着三位还没出手的人。他们不出手，只是在之后的每一次场合里都记着你。", effects: { rep: -1.5, fac: { press: -10, establishment: -14 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "pass", text: "不买。让那个时段继续空着",
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你没买。两个月后那个时段被一位年轻教师接手，他讲得比谁都好，而且他后来成了你最早的一批支持者。有些资源不买到手，反而更长久。", effects: { rep: 1, contact: { preacher: 6 }, fac: { base: 8, press: 4 } } },
          ok: { body: "你没买。那十五分钟继续由别人说话，而你继续跑你的会场。", effects: { rep: 0.4, fac: { base: 3 } } },
          meh: { body: "你没买。到了秋天，那个时段开始出现你的对手的声音。", effects: { rep: -0.2, fac: { press: -3 } } },
          fail: { body: "你没买。它被一位反对你的商人买下了，第一期就点了你的名。", effects: { rep: -0.8, fac: { press: -8, base: -5 } } },
          critfail: { body: "那个时段在之后的两年里成了你的对手的固定地盘。你每次开车经过那栋楼，都会下意识地调一下收音机。", effects: { rep: -1.25, fac: { press: -12, base: -8 } } }
        }
      }
    ]
  },

  {
    id: "1960_name", grade: "minor", valence: "risk", dyn: true, category: "media", era: ["1960_CAMELOT"],
    tierMin: 0, tierMax: 4, weight: 9, medium: "print",
    title: "你的名字怎么印",
    body: "县报的排版员打电话来，问了一个很实际的问题：你的名字在他们的报上要怎么印？\n" +
      "三个选项：按本来的拼法；按美国人一看就会念的拼法；或者干脆用一个更短的名字。\n" +
      "他解释得很平淡：「这不是政治问题，这是排版问题。\n" +
      "但如果他们念不出来，他们就不会投给一个念不出来的人。」",
    brief: {
      lede: "在这一年，一个名字的拼法就可能让人决定要不要认真读你的政见。",
      known: [
        "这个县里有四成选民的祖辈来自别的地方，他们知道这种感觉。",
        "排版员不站边。他只是每周要排三百个名字，他知道哪种排法会被读出来。",
        "改法一旦定下，就会跟着你走 —— 选票、海报、你在广播里被介绍的方式。",
        "你的家里人对这件事的看法，和竞选团队完全不同。"
      ],
      rumor: [
        "有人说上一位改过名字的候选人，后来在自己家里被叫了二十年那个新名字。",
        "有人说广播播音员每次念你的名字之前，都会先停半秒。"
      ],
      unknown: [
        "如果念得出你名字的人多了，你家里人会怎么想。",
        "十年之后，你自己会更喜欢哪一个版本。"
      ],
      terms: [
        { k: "排版", v: "报纸时代的隐形权力：名字的拼写、字号、出现在第几栏，都由排版房决定。" },
        { k: "改口音", v: "1960 年代移民后代从政时常面对的要求。它换得来选票，也换得来看法。" }
      ]
    },
    choices: [
      {
        id: "change", text: "改。用一个这个县能一遍念对的名字",
        base: 0.64, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { ap: 1, rep: 0.4 },
        outcomes: {
          crit: { body: "新名字在两张海报之后就顺口了。广播里介绍你的时候不用再停半秒。你的家里人什么都没说，只是母亲从此在信封上还是写原来的拼法。", effects: { rep: 2.5, fac: { base: 10, press: 6 } } },
          ok: { body: "名字改了。念起来顺了，争议也少了。这是一笔很划算的交易。", effects: { rep: 1.25, fac: { base: 6, press: 4 } } },
          meh: { body: "名字改了，但你自己在说的时候还会卡一下。有人听出来了。", effects: { rep: 0.4, hp: -1, fac: { base: 3 } } },
          fail: { body: "改得太彻底，一位老邻居在集会上问：「你是哪家的孩子？」这个问题让你的回答慢了半拍。", effects: { rep: -0.8, fac: { base: -4, civil: -4 } } },
          critfail: { body: "你的改名被一位专栏作家写成了一篇短评，标题是问句。那篇文章里，你的原名被印错了两次。", effects: { rep: -2, fac: { base: -6, press: -8, civil: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "keep", text: "不改。把它念对的人，才值得我说话",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: { body: "你在第一次演讲的开头花了四十秒教全场念自己的名字，然后说：「记不住也没关系，记住我替你们做过什么就行。」那天的掌声比任何一次都长。", effects: { rep: 3.5, contact: { preacher: 8, columnist: 8 }, fac: { civil: 14, base: 12, church: 6 }, flags: ["enclave_base"] } },
          ok: { body: "你没改。有一些播音员一直念错，但你知道他们是在认真念。", effects: { rep: 1.5, fac: { civil: 8, base: 6 } } },
          meh: { body: "你没改。几个月里你的名字在不同的报纸上有四种拼法。有人以为那是四个人。", effects: { rep: 0.4, fac: { base: 2, civil: 3 } } },
          fail: { body: "你没改，但你在一次重要场合被人连着念错三次，而且没有人纠正。", effects: { rep: -0.8, fac: { base: -4 } } },
          critfail: { body: "你坚持不改，但你因此拒绝了一次重要的广播受访机会。你的对手在那里讲了二十分钟。", effects: { rep: -1.5, fac: { base: -6, press: -6 } } }
        }
      },
      {
        id: "both", text: "两个都要：选票上用新的，社区里用旧的",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你把这件事做成了一个很少人做到的样子：在市政厅你是一个名字，在自家社区你是另一个。两边的门都替你开着，而且两边都知道你有另一扇门。", effects: { rep: 2.75, contact: { fixer: 8, preacher: 6 }, fac: { civil: 10, base: 10, establishment: 5 }, flags: ["enclave_base"] } },
          ok: { body: "两边各用各的。有人觉得你聪明，也有人觉得你在演。", effects: { rep: 1.25, fac: { civil: 6, base: 5 } } },
          meh: { body: "两边用两个名字的结果是：两边都觉得你更属于另一边。", effects: { rep: 0, fac: { civil: 2, base: -2 } } },
          fail: { body: "一张印错的传单把两个名字同时印在了一面墙上。有些事一旦并排放着就很好笑。", effects: { rep: -1.25, fac: { civil: -4, base: -4 } } },
          critfail: { body: "有人拿这两个名字做了一篇稿子，说你在两个社区里说两种话。这篇稿子后来被对手的团队用了整整一年。", effects: { rep: -2.5, fac: { civil: -10, base: -8, press: -8 }, flags: ["scandal_2"] } }
        }
      }
    ]
  }
]);
