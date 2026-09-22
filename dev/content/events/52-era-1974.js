/* ============================================================================
 * CONTENT · 52-era-1974.js
 * 时代：1974 信任崩塌 —— 该时代专属事件。
 * 事件结构见 docs/CONTENT-SCHEMA.md
 * ==========================================================================*/

POTUS.define("event", [
  {
    "id": "1974_hearings",
    "grade": "major",
    "category": "scandal",
    valence: "bane", dyn: true,
    "era": [
      "1974_WATERGATE"
    ],
    "tierMin": 1,
    "tierMax": 5,
    "weight": 12,
    "month": 7,
    "day": 24,
    "brief": {
      "lede": "传票上写着「说明情况」。对面坐着的人，正在把整届政府拆开。",
      "known": [
        "1972 年 6 月，五个人闯进华盛顿水门大厦的民主党总部，被当场抓住。当时所有人都以为这是一桩小案子。",
        "两年过去了，案子没有变小。就在这几天，最高法院作出裁决：总统必须交出白宫录音带。",
        "众议院司法委员会正在逐条表决弹劾条款。电视每天直播，全国都在看。",
        "你被传唤了。你不是主角，你是链条上的一环——但对他们来说，每一环都有用。"
      ],
      "rumor": [
        "有人说总统的律师正在讨论一个词：辞职。",
        "有人说白宫内部有人已经在偷偷整理自己的文件。",
        "有人说下一个被点名的人，会是你认识的人。"
      ],
      "unknown": [
        "这场听证会结束后，这个国家会变成什么样子。",
        "你今天说的话，会不会在十年后被人反过来引用。",
        "权力出现空缺之后，谁去填——那是一场你现在还看不懂的博弈。"
      ],
      "terms": [
        {
          "k": "水门事件",
          "v": "1972 年闯入民主党总部、随后被掩盖的丑闻，最终导致尼克松于 1974 年 8 月辞职。"
        },
        {
          "k": "传票",
          "v": "司法机关强制要求到场或提交材料的正式令状。"
        },
        {
          "k": "弹劾条款",
          "v": "众议院司法委员会通过的正式指控，需众议院全体表决，再由参议院审判。"
        },
        {
          "k": "白宫录音带",
          "v": "白宫内部的录音系统留下的磁带，成为定案的关键证据。"
        }
      ]
    },
    "title": "你被传唤去水门听证会说明情况",
    "body": "你被请去‘说明情况’。镜头对面，是磨刀霍霍的检察官。",
    "choices": [
      {
        "id": "cooperate",
        "text": "全面配合，坦白",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "INTG",
            "w": 0.5
          },
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.2
          }
        ],
        "outcomes": {
          "crit": {
            "body": "你交代得干净，反成‘唯一诚实的人’。",
            "effects": {
              "rep": 1,
              "fac": {
                "press": 15,
                "base": 10
              },
              "attr": {
                "INTG": 5
              }
            }
          },
          "ok": {
            "body": "你洗清了嫌疑。",
            "effects": {
              "rep": 0.6,
              "fac": {
                "press": 8,
                "base": 5
              }
            }
          },
          "meh": {
            "body": "你说了一部分，勉强过关。",
            "effects": {
              "rep": 0.2,
              "fac": {
                "press": 3
              }
            }
          },
          "fail": {
            "body": "你遗漏的关键被追问。",
            "effects": {
              "rep": -0.2,
              "fac": {
                "press": -5
              }
            }
          },
          "critfail": {
            "body": "你撒的谎被当场拆穿，伪证嫌疑。",
            "effects": {
              "rep": -0.9,
              "fac": {
                "press": -15
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
        "id": "lawyer",
        "text": "只让律师开口",
        "base": 0.6,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
            "w": 0.4
          }
        ],
        "outcomes": {
          "crit": {
            "body": "律师天衣无缝，你全身而退。",
            "effects": {
              "rep": 0.4,
              "fac": {
                "establishment": 5
              }
            }
          },
          "ok": {
            "body": "你没说错话。",
            "effects": {
              "rep": 0.1
            }
          },
          "meh": {
            "body": "沉默被解读为心虚。",
            "effects": {
              "fac": {
                "press": -3,
                "base": -3
              }
            }
          },
          "fail": {
            "body": "律师也兜不住。",
            "effects": {
              "fac": {
                "press": -6
              }
            }
          },
          "critfail": {
            "body": "律师与你对不上口径，露出马脚。",
            "effects": {
              "fac": {
                "press": -12
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
    "id": "1974_leak",
    "grade": "mid",
    "category": "scandal",
    valence: "bane", dyn: true,
    "era": [
      "1974_WATERGATE"
    ],
    "tierMin": 0,
    "tierMax": 5,
    "weight": 9,
    "month": 5,
    "day": 9,
    "brief": {
      "lede": "一份不该在你桌上的文件，现在在你桌上。",
      "known": [
        "文件上有印章、有编号，还有一行小字写着「内部传阅，不得复制」。",
        "它的内容足以让一位大人物从位置上掉下来。而这位大人物，此刻还在电视上讲话。",
        "如果你是最后一个接触过它的人，你就是嫌疑人。",
        "你手边只有两种处理方式：交给记者，或者让它在垃圾桶里变成灰。"
      ],
      "rumor": [
        "有人说大报的记者已经拿到了更完整的一份，只等一个可以署名的消息源。",
        "有人说这栋楼里最近有人被调走，理由是「正常轮岗」。",
        "有人说文件柜的锁上周被换过，只有三个人有新钥匙。"
      ],
      "unknown": [
        "这份文件是有人故意放在你桌上的，还是纯属意外。",
        "如果你烧掉它，会不会有人在某个抽屉里留着复印件。",
        "三个月后这个国家会经历什么——那时你会发现，今天的每个选择都被记录在案。"
      ],
      "terms": [
        {
          "k": "消息源",
          "v": "向记者提供信息的线人。保密承诺是调查报道的根基，但法律上并不总是受保护。"
        },
        {
          "k": "销毁证据",
          "v": "在美国法律中属于妨碍司法，本身即可构成重罪，而且往往比原始丑闻更致命。"
        },
        {
          "k": "不得复制",
          "v": "内部文件上的限制标记，用来追溯泄露路径。"
        }
      ]
    },
    "tracks": [
      "operative"
    ],
    "title": "有人把一份能掀翻大人物的文件放到你桌上",
    "body": "它足以掀翻一位大人物。交给媒体，你就是英雄；烧了它，你就是共谋。",
    "choices": [
      {
        "id": "publish",
        "text": "交给邮政工会的记者",
        "base": 0.5,
        "mods": [
          {
            "src": "attr",
            "key": "CUN",
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
            "body": "头条属于你，体制抖了三抖。",
            "effects": {
              "rep": 2.5,
              "fac": {
                "press": 18,
                "establishment": -15
              },
              "flags": [
                "leaker_hero"
              ]
            }
          },
          "ok": {
            "body": "报道出炉，你声名鹊起。",
            "effects": {
              "rep": 1.25,
              "fac": {
                "press": 10,
                "establishment": -8
              }
            }
          },
          "meh": {
            "body": "报道小，你欠了人情。",
            "effects": {
              "fac": {
                "press": 4
              },
              "fav": -1
            }
          },
          "fail": {
            "body": "文件被指伪造。",
            "effects": {
              "fac": {
                "press": -8,
                "establishment": -5
              }
            }
          },
          "critfail": {
            "body": "你拿错了文件，反成泄密嫌疑。",
            "effects": {
              "fac": {
                "press": -12
              },
              "flags": [
                "investigation_open"
              ]
            }
          }
        }
      },
      {
        "id": "burn",
        "text": "烧掉，保全自己",
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
            "body": "你处理了干净，还卖了大人物人情。",
            "effects": {
              "fac": {
                "establishment": 10
              },
              "fav": 1
            }
          },
          "ok": {
            "body": "你脱身了。",
            "effects": {
              "fac": {
                "establishment": 4
              }
            }
          },
          "meh": {
            "body": "你失眠了很久。",
            "effects": {
              "attr": {
                "INTG": -3
              }
            }
          },
          "fail": {
            "body": "有人看见你烧东西。",
            "effects": {
              "flags": [
                "burn_seen"
              ],
              "fac": {
                "press": -4
              }
            }
          },
          "critfail": {
            "body": "灰烬里露出半张纸，你被牵连。",
            "effects": {
              "flags": [
                "scandal_2",
                "investigation_open"
              ],
              "fac": {
                "press": -12
              }
            }
          }
        }
      }
    ]
  },

  /* ==========================================================================
   * 以下为 1974 时代的"纵深"内容。
   * 水门之后的美国有一种特殊的政治空气：所有人都学会了怀疑录音、账目和承诺。
   * 这一批事件把 v0.4 的机制（把柄 / 人脉 / 灰产）放进那个空气里 ——
   * 1974 年的把柄是一盘磁带，1974 年的基层是一整条要被划进拆迁红线的街。
   * ======================================================================== */

  {
    id: "1974_tape", grade: "mid", valence: "bane", dyn: true, category: "scandal", era: ["1974_WATERGATE"],
    tierMin: 1, tierMax: 5, weight: 11, medium: "tv",
    title: "有人存着你两年前说错话的录音带",
    body: "总统辞职之后的第三个月，全国的人都在讨论一个很新鲜的问题：\n" +
      "说话会不会被录下来，录下来的东西会不会变成证据。\n" +
      "现在有人把一盘磁带放在你桌上。标签上是你自己的字迹，日期是两年前。\n" +
      "你甚至不记得那台录音机是谁的。\n" +
      "盒子上贴着一张小纸条：「我留了一份。等你需要的时候来找我。」",
    brief: {
      lede: "在这个国家刚刚学会害怕录音的那一年，你发现自己两年前也在某个房间里说过话。",
      known: [
        "磁带里的内容不是罪行，是三句不该在公开场合说的话。",
        "留这个盒子的人你认识，他两年前是那场会的记录员。",
        "他没有直接找你，说明他在等一个价钱，而不是在等一个道歉。",
        "这个年代的人对「录音带」这三个字有本能的反应 —— 它已经不只是证据，它是一种气氛。"
      ],
      rumor: [
        "有人说同一场会还有第二台机器在录。",
        "有人说这个人一年前拿同样的东西找过另外两位客人。"
      ],
      unknown: [
        "他想要的东西是钱、是位置，还是一个「别动我」的保证。",
        "如果你什么都不做，那盘带子会不会在某个时候自己出现。"
      ],
      terms: [
        { k: "磁带", v: "1974 年最令人不安的政治物品。它可以被剪辑、被误读，也可以被否认存在。" },
        { k: "留着", v: "这个行业里最常见的一种持有方式：不用，也不销毁。" }
      ]
    },
    choices: [
      {
        id: "buy", text: "花钱把它买回来，连那台机器一起",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        cost: { fun: 1.25 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你把带子和机器一起买了下来，当场在办公室里烧了带芯，然后把壳子留给他当纪念。他笑得很开心，而且从此替你办过三件事。", effects: { rep: 1, contact: { fixer: 12 }, fac: { establishment: 8, commercial: 5 }, flags: ["compromised"] } },
          ok: { body: "带子到手了。你把它锁进银行保险箱，钥匙放在你母亲的抽屉里。你会一直知道它在哪。", effects: { rep: 0.6, contact: { fixer: 6 }, flags: ["compromised"] } },
          meh: { body: "他只给了你一份拷贝。他说：「正本我留着自己听。」你付了钱，也没再问。", effects: { rep: 0.2, contact: { fixer: 3 } } },
          fail: { body: "你要还价。他收回了带子，说：「那我再等等。」这句话让你过了两年不太舒服的日子。", effects: { rep: -0.6, fun: -1.25, contact: { fixer: -8 } } },
          critfail: { body: "你付了钱，但你去取带子的那天下午，车里还坐着另一个人。你的每一次动作都被记下来了。", effects: { fun: -1.25, rep: -1.25, contact: { fixer: -12, fed: -6 }, fac: { press: -10 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "public", text: "自己先公开：把这三句话原原本本说出去",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "attr", key: "CHA", w: 0.25 }],
        cost: { ap: 2, rep: 0.8 },
        outcomes: {
          crit: { body: "你在一场记者会上承认了那三句话，并且解释了当时为什么那样说。三天之后，全国关于你的讨论变了：从「他会不会被爆」变成了「他是那个自己说出来的人」。", effects: { rep: 2.5, contact: { columnist: 10 }, fac: { press: 16, base: 8, establishment: 4 } } },
          ok: { body: "你公开了。受了两个星期的伤，然后这件事就过去了 —— 在 1974 年，公开承认是最快的消毒剂。", effects: { rep: 1, fac: { press: 10, base: 5 } } },
          meh: { body: "你公开了，但把那三句话讲得有点绕。听众记住了「绕」，没记住内容。", effects: { rep: 0.2, fac: { press: 3 } } },
          fail: { body: "你在记者会上多解释了两句，那两句里的一个名字现在也上了报纸。", effects: { rep: -0.8, fac: { press: -8, establishment: -6 } } },
          critfail: { body: "你公开的内容和你以为的带子内容不完全一样。对方第二天放出了完整版，而你看起来像在裁剪事实。", effects: { rep: -1.5, fac: { press: -14, base: -8, establishment: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "hold", text: "不动它。就让它待在别人的抽屉里",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        outcomes: {
          crit: { body: "你什么都没做，只是从此每年都在自己的日程里留出三个下午专门处理「这种东西」。三年后那个人搬去了另一个州，带子据说留在了他妹妹家的地下室里 —— 而你已经是另一个人了。", effects: { rep: 0.8, hp: -0.8, fac: { establishment: 5, base: 3 } } },
          ok: { body: "你没动它。他也一直没动。两个人在之后的三年里都很客气。", effects: { rep: 0.4, hp: -0.8 } },
          meh: { body: "你没动它，但你开始回避某些场合、某些人。你的日程比两年前小了一圈。", effects: { hp: -1.25, rep: -0.2 } },
          fail: { body: "你以为不理会就是处理。第三年那盘带子的内容出现在一本地方政治读物里，虽然只是脚注。", effects: { rep: -0.8, hp: -1, fac: { press: -8 } } },
          critfail: { body: "两年后你才知道，那盘带子被复制过至少四次，分别躺在四个不同的人手上。你在其中每一个人面前都是可以被拿捏的人。", effects: { rep: -1.5, hp: -1.25, fac: { press: -12, establishment: -10 }, flags: ["scandal_2", "compromised"] } }
        }
      }
    ]
  },

  {
    id: "1974_pension", grade: "mid", valence: "bane", dyn: true, category: "finance", era: ["1974_WATERGATE"],
    tierMin: 1, tierMax: 5, weight: 10,
    title: "市养老金出了缺口，逼你选怎么补",
    body: "市里的养老基金有一个缺口，数字大到没有人愿意在会议记录里写全。\n" +
      "两个方案摆在桌上：动用明年的税款补上，或者把基金的收益目标从百分之六调到百分之九，\n" +
      "然后指望市场。\n" +
      "市财政局长在会议结束后单独跟你说了一句话：\n" +
      "「第二个方案不会出事。至少不会在你任期里出事。」",
    brief: {
      lede: "1974 年的通胀是两位数。所有关于「明年」的承诺，都在被这个数字吃掉。",
      known: [
        "补缺口的钱要从明年的道路和学校预算里出，那两笔钱刚刚才被公布。",
        "调高收益目标不需要动钱，只需要七票。",
        "基金里有一万一千名退休的教师、警察和市政工人。",
        "局长今年五十七岁，他打算在第二个方案生效后的第三年退休。"
      ],
      rumor: [
        "有人说州里另外三个城市已经在用第二个方案了。",
        "有人说其中有一个城市，明年的养老金发放日已经排进了预算表的最后一行。"
      ],
      unknown: [
        "市场在 1974 年之后会不会好起来。",
        "如果七年后出事，那一年坐在这个位子上的人是谁。"
      ],
      terms: [
        { k: "收益目标", v: "基金的预期回报假设。调高它，账面上的缺口会立刻变小 —— 而钱并没有多一分。" },
        { k: "滞胀", v: "1974 年美国同时经历高通胀与经济停滞，所有长期承诺都在贬值。" }
      ]
    },
    choices: [
      {
        id: "fill", text: "补。从道路和学校的预算里挪钱",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        cost: { rep: 0.6 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你在委员会上把缺口的数字读了三遍，然后说：「我们这一届的账，我们这一届结。」七票里有五票投给了你。第二年道路没修完，但那一万一千个人的支票一张都没迟过。", effects: { rep: 2, contact: { union_boss: 10 }, fac: { labor: 16, base: 10, commercial: -8, establishment: 5 } } },
          ok: { body: "钱补上了。没有人感谢你，因为没有人知道如果不补会发生什么。这大概是这份工作里最常见的报酬。", effects: { rep: 1, fac: { labor: 10, base: 5, commercial: -5 } } },
          meh: { body: "钱补上了一部分。剩下的部分被做成了「分期」。你为这个安排投了赞成票。", effects: { rep: 0.2, fac: { labor: 4, base: 2 } } },
          fail: { body: "你提出了方案，但没能拿到七票。这件事被记成了一个「有人提过」的记录，然后就没有了。", effects: { rep: -0.4, fac: { labor: -4, establishment: -4 } } },
          critfail: { body: "你补缺口的钱挪的是三所小学的翻修预算，而那三所小学正好在你明年要拿票的那个区。", effects: { rep: -1.5, fac: { base: -12, labor: 4, civil: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "adjust", text: "调目标。把问题交给市场和时间",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.35 }],
        cost: { fun: 0.3 },
        outcomes: {
          crit: { body: "七票到手，账面上的缺口消失了。市场在那一年反弹了一成八。你在之后的四年里安然无事，并且被称作「那个解决了养老金问题的人」。", effects: { rep: 1.5, contact: { lobbyist: 10 }, fac: { commercial: 16, establishment: 10, labor: -6 } } },
          ok: { body: "方案通过了。数字好看，没有人追问。这在财政文件里是很常见的一种过关方式。", effects: { rep: 0.8, fac: { commercial: 10, establishment: 6, labor: -4 } } },
          meh: { body: "方案通过了，但它在委员会记录里留下了两页反对意见，署名的是一位年轻委员。", effects: { rep: 0.2, fac: { commercial: 6, establishment: 3 } } },
          fail: { body: "市场没有反弹。第二年基金的实际收益是负的，而你刚刚在会议记录上签过「预计百分之九」。", effects: { rep: -1, fac: { commercial: 4, labor: -12, base: -8 } } },
          critfail: { body: "七年之后这个方案爆掉了。那一年你不在这座城市，但每一份关于这件事的报道里都会提一句「一九七四年那次调整」。", effects: { rep: -1.75, fac: { labor: -18, base: -12, commercial: -10 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "ask", text: "两样都不做，先把三位退休教师请到听证席上",
        base: 0.58, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "labor", w: 0.3 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "三位退休教师在听证席上讲了四十分钟。第二天，堵住这件事的那两票自己松了。你没有提任何方案，你只是换了一种投票的空气。", effects: { rep: 1.75, contact: { preacher: 8, union_boss: 8 }, fac: { labor: 16, base: 12, establishment: 4 } } },
          ok: { body: "听证会开了，方案被推迟了一个月。一个月里你多拿到了两票。", effects: { rep: 1, fac: { labor: 10, base: 6 } } },
          meh: { body: "听证会开了，但媒体只来了一个人。方案照旧通过。", effects: { rep: 0.2, fac: { labor: 3 } } },
          fail: { body: "有人把你请退休教师到听证席这件事，说成是「拿老人当道具」。", effects: { rep: -0.6, fac: { labor: 2, base: -4, press: -6 } } },
          critfail: { body: "听证会上一位教师说到一半哭了出来，而你的对手当天下午就出现在了同一间会场，站在她旁边。", effects: { rep: -1.25, fac: { labor: -8, base: -8, press: -6 } } }
        }
      },
      {
        /* 保底选项：不花钱、不设门槛。你可以什么都不做，让这件事照原样过去。 */
        id: "abstain", text: "弃权。两个方案都不投，让委员会自己决定",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: { body: "你投了弃权，然后在会上提了一个很小的要求：把这两个方案连同全部的测算过程一起公开。公开之后，委员会自己选了第一个。你没有站任何一边，但你让那七个人没法装作看不见。", effects: { rep: 1.25, contact: { columnist: 8 }, fac: { labor: 10, base: 6, establishment: 4 } } },
          ok: { body: "你弃权了。第二个方案通过了，你没有签名。以后有人翻这份记录的时候，会发现有一个人的名字不在上面。", effects: { rep: 0.6, fac: { labor: 5, base: 3 } } },
          meh: { body: "你弃权了。这件事就这样过去了，你也没再听到关于它的消息。", effects: { rep: 0.2 } },
          fail: { body: "你弃权了，但你在弃权说明里多写了两行。那两行被读成了「有保留的支持」。", effects: { rep: -0.4, fac: { labor: -5, base: -3 } } },
          critfail: { body: "第二年基金出了一个小问题，而那份记录上写着你「知情并弃权」。这四个字在市政政治里比反对更难解释。", effects: { rep: -1, fac: { labor: -10, base: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  {
    id: "1974_block", grade: "minor", valence: "risk", dyn: true, category: "civil", era: ["1974_WATERGATE"],
    tierMin: 0, tierMax: 4, weight: 10,
    title: "一条拆迁红线要拆掉八十几户人家的街",
    body: "市规划局的地图上多了一条红线。红线以东被划进了一个叫「城市更新」的项目。\n" +
      "红线以西是一家新开的银行的办公室。\n" +
      "红线穿过的是一条有八十户人家的街：四家杂货铺、一间理发店、一座小教堂、\n" +
      "以及三十七个已经在那里住了十年以上的家庭。\n" +
      "补偿标准是去年评的，而去年到今年的物价涨了两成。",
    brief: {
      lede: "「城市更新」在这个年代是一个很好听的词，它更新的是地图，不是住在上面的人。",
      known: [
        "补偿标准按去年评估价，而今年的物价已经涨了两成。",
        "规划局的人不觉得自己在做什么坏事，他们只是在执行一份三年前批下来的计划。",
        "那家新银行的三位董事里，有一位是你的捐款人。",
        "八十户人家里有五十六户是租户，租户拿到的补偿只有业主的四分之一。"
      ],
      rumor: [
        "有人说这条红线本来应该画在更北边的一条街上，是后来改的。",
        "有人说已经有人在收购红线里的房子，价格很低。"
      ],
      unknown: [
        "你替这八十户人家说话，会让那位董事怎么想。",
        "如果你什么都不做，五年后那条街上还剩几户人。"
      ],
      terms: [
        { k: "城市更新", v: "1960-70 年代美国城市大规模拆迁与重建计划。它常被称为「黑人搬迁」(negro removal)。" },
        { k: "红线", v: "规划图上标注征收范围的线。线内线外，命运完全不同。" }
      ]
    },
    choices: [
      {
        id: "fight", text: "替他们打这场仗：要求按今年重新评估",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "civil", w: 0.3 }],
        cost: { ap: 2, rep: 0.8 }, stake: { ap: true, fav: true },
        outcomes: {
          crit: { body: "你带着七位住户代表去了三次规划局，第三次他们带上了律师。半年后评估重做了，租户的补偿标准被单独列了一栏。那条街上最后有六十一户留了下来。", effects: { rep: 4.5, contact: { preacher: 12 }, fac: { civil: 20, base: 12, church: 8, commercial: -8 } } },
          ok: { body: "评估重做了。补的钱多了一成半，但仍然按去年的房租算。有些人还是搬走了。", effects: { rep: 2.5, contact: { preacher: 7 }, fac: { civil: 12, base: 7, commercial: -5 } } },
          meh: { body: "你去开了两次会，写了一份备忘录。它被归了档。", effects: { rep: 0.8, fac: { civil: 5, base: 3 } } },
          fail: { body: "你在一次听证会上把话说得太重，规划局从此把这件事改成「内部协商」，不再通知你。", effects: { rep: -0.4, fac: { civil: 4, base: 2, establishment: -8 } } },
          critfail: { body: "你替这条街说话的方式，让那家银行的三位董事里有一位公开表示「对某些人的做事方法有保留」。同一年，你有两笔捐款没有来。", effects: { rep: -1.25, fun: -6.5, fac: { civil: 6, base: 4, commercial: -14 } } }
        }
      },
      {
        id: "deal", text: "找那家银行谈：让他们出面把价格补上",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 1.75, ap: 1 },
        outcomes: {
          crit: { body: "你跟那位董事谈了一个半小时。他最后说：「补差价的钱我们出，但不要写我们的名字。」这条街收到了补款，而那家银行拿到了一块更好的地。所有人都得到了东西，这在市政政治里叫成功。", effects: { rep: 2.75, contact: { lobbyist: 10, fixer: 8 }, fac: { civil: 12, base: 8, commercial: 12 } } },
          ok: { body: "银行补了一部分差价。不多，但足够让十几户人家不用立刻搬走。", effects: { rep: 1.5, contact: { lobbyist: 6 }, fac: { civil: 7, base: 4, commercial: 6 } } },
          meh: { body: "银行答应「研究一下」。研究到红线正式生效，也没有结果。", effects: { rep: 0.4, fac: { civil: 2, commercial: 2 } } },
          fail: { body: "那位董事把你找他的目的告诉了规划局。之后你在谈判里的每一句话都被当成「有利益关系」。", effects: { rep: -1.25, fac: { civil: 3, commercial: -6 } } },
          critfail: { body: "你替银行牵了一根线，而这条线的另一端被写进了一篇关于「谁在这块地上赚钱」的报道里。你的名字在第四段。", effects: { rep: -2.5, fac: { civil: -8, base: -6, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "away", text: "不介入。这不是你这个层级的事",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你没有出面，但你做了一件小事：你把那份补偿标准表复印了三十份，托人送到了那八十户人手上。他们没有你的名字，但他们有了那张表。", effects: { rep: 1.5, contact: { preacher: 5 }, fac: { civil: 8, base: 6 } } },
          ok: { body: "你没有介入。红线生效了，那条街上的人陆陆续续搬了。", effects: { rep: 0.4 } },
          meh: { body: "你没介入，也没有人问过你。这件事在市政厅的记录里只占半页。", effects: { rep: 0 } },
          fail: { body: "你没介入，但有一位住户代表在电视上念了一串名字，念的是「本来可以帮忙但没有帮忙的人」。", effects: { rep: -1.25, fac: { civil: -8, base: -6 } } },
          critfail: { body: "那条街被拆掉之后，两年内成了这座城市所有关于「失信」的演讲里必定被提到的例子。而你当时坐在能投票的那个位子上。", effects: { rep: -2.5, fac: { civil: -14, base: -10, church: -8 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  {
    id: "1974_local", grade: "minor", valence: "risk", dyn: true, category: "shady", era: ["1974_WATERGATE"],
    tierMin: 0, tierMax: 4, weight: 9,
    title: "市政厅六台售货机背后的一笔回扣账",
    body: "市政厅地下一层有一排自动售货机，三台咖啡、两台汽水、一台三明治。\n" +
      "它们属于一家叫「城市服务」的公司，公司登记地址是一个邮箱。\n" +
      "每一台每月上缴给市里的租金是十二块。\n" +
      "而每年通过这六台机器流过的钱，大约是四万。\n" +
      "有人把这笔账算给你看了。算账的人没有说他想做什么。",
    brief: {
      lede: "水门之后那两年，全国的小政客都在做同一件事：把每一笔小钱重新看一遍。",
      known: [
        "这类合同不需要竞标，也不需要公告，只要一个科室负责人签字。",
        "签这个合同的人已经签了九年，他有三个孩子在上大学。",
        "账是公开记录，只是从来没有记者去复印过。",
        "把这件事捅出去，你不会得到任何位置 —— 你只会得到一些人怕你。"
      ],
      rumor: [
        "有人说这家公司上面还有一层，那一层给过好几位议员钱。",
        "有人说这一层里的人，就是两年后在水门事件里替人送过钱的那批人。"
      ],
      unknown: [
        "把这件事捅出去，会不会有人替那个科长承担。",
        "如果没人捅，这笔钱明年还会不会以同样的方式流出去。"
      ],
      terms: [
        { k: "自动售货机合同", v: "美国市政腐败史上最经典的小额通道。金额小到没人查，稳定到可以持续二十年。" },
        { k: "邮箱公司", v: "登记地址只是一个邮政信箱的公司。它不需要办公室，也不需要员工。" }
      ]
    },
    choices: [
      {
        id: "expose", text: "把账号复印下来，交给一位记者",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        cost: { ap: 2, rep: 0.8 }, req: { contact: "columnist" },
        outcomes: {
          crit: { body: "记者查了六周，从那台售货机一路查到了州里。最后有两个人辞职，一份合同被重签。没有人感谢你，但你从此拥有一个很好用的名声：跟你做事不能糊弄。", effects: { rep: 4, contact: { columnist: 14, fed: 6 }, fac: { press: 16, base: 8, establishment: -6 } } },
          ok: { body: "稿子登了。合同被重签，成本降了两成。那位科长没有被追究。", effects: { rep: 2, contact: { columnist: 8 }, fac: { press: 9, base: 4, establishment: -4 } } },
          meh: { body: "他把材料收了，然后说：「这种稿子我们一年最多做两篇，我会留着。」你等了很久。", effects: { rep: 0.4, contact: { columnist: 3 }, fac: { press: 3 } } },
          fail: { body: "稿子登了，但焦点变成了「有人在利用小合同做政治文章」。你还多了一个敌人。", effects: { rep: -1.25, contact: { columnist: -4 }, fac: { press: -6, establishment: -8 } } },
          critfail: { body: "你复印账目的时候被人看见了。三个月后，一份关于「谁在查谁」的备忘录出现在了某个人的抽屉里，标题里有你的名字。", effects: { rep: -2.5, fac: { establishment: -14, agency: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "use", text: "不捅出去。用它换一个签字",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        cost: { lev: 1 },
        outcomes: {
          crit: { body: "你只跟那位科长提了一句：「您签的那份合同，我看了。」四天之后，你一直在推的那件小事签下来了 —— 一件和售货机毫无关系的事。他站起来送你出门的时候，手是凉的。", effects: { rep: 2.5, lev: 1, contact: { fixer: 10 }, fac: { establishment: 10 }, flags: ["compromised"] } },
          ok: { body: "签字拿到了。你们两个人以后在走廊里遇见会互相点头。", effects: { rep: 1.25, fac: { establishment: 6 }, flags: ["compromised"] } },
          meh: { body: "他签了，但签得很快，快到你怀疑这件事本来就要过。你损失了一份把柄，换到了一件本来会发生的事。", effects: { rep: 0.4, fac: { establishment: 2 } } },
          fail: { body: "你话没说完，他就红了眼睛，说他三个孩子都在上学。最后签字没拿到，你还欠了一句很难收回的话。", effects: { rep: -1.25, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "他当天下午就把这件事报了上去，还附了一句「有人拿旧合同说事」。你损失一份把柄，还换来了一个更难看的评价。", effects: { rep: -2.5, fac: { establishment: -14, press: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "skip", text: "把那张纸还回去。这不是我该管的事",
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "你把纸还了回去，说了一句：「要是真有问题，两年后会有别人来查。」两年后确实有人来查了，而且查它的人不是你 —— 这一点在后来的很多场合里都被证明是件好事。", effects: { rep: 2, fac: { base: 6, establishment: 5 } } },
          ok: { body: "你退出了这件事。那六台机器继续卖咖啡，一年四万。", effects: { rep: 0.8, fac: { base: 2 } } },
          meh: { body: "你还回去了。算账的人后来没有再来找你。", effects: { rep: 0.4 } },
          fail: { body: "你还回去了，但你在还之前多看了一遍。有些数字看过就忘不掉。", effects: { hp: -1 } },
          critfail: { body: "你把纸还回去的时候，被人看见你和那个算账的人在一起。于是你成了一个「知情的人」——而这件事里最难受的身份就是这个。", effects: { rep: -1.5, fac: { establishment: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  {
    id: "1974_union", grade: "mid", valence: "risk", dyn: true, category: "political", era: ["1974_WATERGATE"],
    tierMin: 1, tierMax: 5, weight: 10,
    title: "工会换届，两派都要你表态站哪边",
    body: "工会头目明年要退，现在的局面是两把椅子对着摆：\n" +
      "一把坐着他挑的接班人 —— 五十岁，管了十九年的仓库，说话慢，做事准；\n" +
      "另一把坐着一位四十岁的挑战者 —— 她在三年里把三个厂的女工组织了起来。\n" +
      "两把椅子后面都站着人。\n" +
      "而明年这场选举的结果，会决定这个城市里两万张票往哪里走。",
    brief: {
      lede: "在 1974 年，一个工会的内部选举，往往比一场市议会选举更能决定明年的工资和物价。",
      known: [
        "现任头目希望他挑的人赢，但他不愿意公开表态 —— 那会让这场选举变成他的公投。",
        "挑战者最大的本钱不是人，是她在三个厂里建立的联系方式，那是别人没有的东西。",
        "两边的候选人都会来问你同一句话：「你站哪边。」",
        "你不会因为站错边而立刻失去什么 —— 你会在三年后发现少了一些东西。"
      ],
      rumor: [
        "有人说挑战者手上有一份关于仓库安全事故的记录。",
        "有人说现任头目已经和厂方谈好了下一轮的框架，只等接班人接过去签。"
      ],
      unknown: [
        "如果你两边都不站，两边的支持者会不会同时把票投给你的对手。",
        "这场选举之后，输的那一边会去哪里。"
      ],
      terms: [
        { k: "内部选举", v: "工会的换届。它通常没有媒体报道，但它决定的是两万个家庭的明年。" },
        { k: "组织者", v: "把散落的工人变成有名单、有代表的人。这是工会里最难、也最有分量的技能。" }
      ]
    },
    choices: [
      {
        id: "incumbent", text: "跟现任的人走：这么多年没出过事",
        base: 0.62, mods: [{ src: "fac", key: "labor", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { ap: 2 }, req: { contact: "union_boss" }, stake: { ap: true, fav: true },
        outcomes: {
          crit: { body: "你只做了一件事：出现在两次仓库区的集会上，什么话都没说。但他挑的人赢了，而且赢得干净。第二年那份框架合同签下来的时候，第一页上有一句话是你加进去的。", effects: { rep: 1.5, fav: 1, contact: { union_boss: 16 }, fac: { labor: 20, establishment: 8, base: 6 }, flags: ["union_backing"] } },
          ok: { body: "他挑的人赢了。你没出什么力，但你在该出现的时候出现了。", effects: { rep: 0.8, contact: { union_boss: 9 }, fac: { labor: 10, establishment: 4 } } },
          meh: { body: "他挑的人赢了，但只赢了两百票。胜利的那一方不太记得你，失败的那一方记得很清楚。", effects: { rep: 0.2, contact: { union_boss: 3 }, fac: { labor: 3 } } },
          fail: { body: "你出现得太晚，被念成「迟到的朋友」。这种称呼在工会里是有具体含义的。", effects: { rep: -0.6, contact: { union_boss: -8 }, fac: { labor: -12 } } },
          critfail: { body: "他挑的人输了。挑战者上任后的第一次执行委员会上，你的名字被列在「上一届的朋友」那一栏。", effects: { rep: -1.25, contact: { union_boss: -12 }, fac: { labor: -20, establishment: 4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "challenger", text: "去见那位挑战者。她手上的东西更有意思",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "labor", w: 0.25 }],
        cost: { ap: 2, lev: 1 },
        outcomes: {
          crit: { body: "你见了她，看了那份安全事故记录，然后做了一件两边都没想到的事：你把记录交给了一个记者，让它在选举前两周见了报。她赢了，而且赢得不需要你。两年后她替你动员了两万张票。", effects: { rep: 2, lev: 1, contact: { columnist: 12, union_boss: -6 }, fac: { labor: 18, civil: 12, press: 12 }, flags: ["union_backing", "street_army"] } },
          ok: { body: "你见了她。她赢了。她记着你来过的这一次，但她也知道你来得有点晚。", effects: { rep: 1, contact: { preacher: 6 }, fac: { labor: 10, civil: 6 } } },
          meh: { body: "你见了她，但你没有带任何东西去。她礼貌地听完了，然后去见了下一个人。", effects: { rep: 0.2, fac: { labor: 2 } } },
          fail: { body: "你去见她这件事被现任那边知道了。她在选举里输了，而两边都知道了你的名字。", effects: { rep: -0.6, contact: { union_boss: -10 }, fac: { labor: -8, establishment: -6 } } },
          critfail: { body: "你给她的那份材料被反过来用了：有人说这是现任那边设的局，而你是那个递材料的人。她输了，你在这栋楼里也完了。", effects: { rep: -1.5, contact: { union_boss: -14 }, fac: { labor: -20, establishment: -10, civil: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "neutral", text: "两边都说同一句话：这是你们自己的事",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "你对两边说了同一句话，而且说到做到：你把两次集会的日程都抄下来，两次都没去。选举结束后，赢的那一方主动来找你谈明年的事。", effects: { rep: 1.25, contact: { union_boss: 6 }, fac: { labor: 10, base: 6, establishment: 5 } } },
          ok: { body: "你保持了中立。两边都尊重，两边都不亲近。", effects: { rep: 0.6, fac: { labor: 5, base: 3 } } },
          meh: { body: "你保持了中立，但中立的意思是这场选举跟你没有任何关系。", effects: { rep: 0.2, fac: { labor: 1 } } },
          fail: { body: "你以为你中立，但两边都认为你在等结果。这在工会里叫「算票的人」，是个不好听的说法。", effects: { rep: -0.4, fac: { labor: -8, base: -4 } } },
          critfail: { body: "选举结束后，赢的那一方公开说：「有些人一直在门外看。」这句话在半年里被引用了七次。", effects: { rep: -1, contact: { union_boss: -8 }, fac: { labor: -14, base: -8 } } }
        }
      }
    ]
  }
]);
