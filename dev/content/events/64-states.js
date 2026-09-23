/* ============================================================================
 * CONTENT · events/64-states.js
 * 州联动事件：出生州的政治地形开始起作用。
 * 深州的逆风党（德州的民主党、纽约的共和党）、摇摆州的绞肉机、
 * 以及「反其道行之」——在深州拉拢少数派的打法。
 * 门槛用 states: [...]（engine/when.js 的州白名单）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ---- 深红州里的民主党人：少数派的生存术 ---- */
  {
    id: "state_red_minority",
    grade: "mid", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    states: ["TX", "AL"], parties: ["D"],
    tierMin: 0, tierMax: 2, weight: 20,
    brief: {
      lede: "在这个州，你的党徽是一道伤口。",
      known: [
        "本党上次赢全州职位时报纸还没彩色版；登记不到四成。",
        "县党部例会在一家餐馆后厅开，到会十七人。",
        "州里最大的拉美商会有钱有名单，缺一张能代言的脸。"
      ],
      rumor: [
        "据说全国党拨过钱给这个州，被别处截走了。",
        "有人说商会的会长自己的野心不小，扶你可能是垫脚。"
      ],
      unknown: [
        "少数派按人口曲线二十年后会变多数。",
        "在深州做少数派，全国代表席位反而便宜。"
      ],
      terms: [
        { k: "深红州", v: "共和党长期占优的州；基层职位仍可经营。" }
      ]
    },
    title: "你在深红州开会，到会只有十七个人",
    body: "你所在的是深红州，你的党在这里是长期的少数派。后厅例会到会十七人，对面的商会却握着一张越来越长的名单。少数派要怎么打？",
    choices: [
      {
        id: "coalition", text: "跟少数派社区结盟：把商会名单变成党的名单",
        note: "少数派 + 少数派 = 可能的多数。这是把二十年的人口曲线提前兑现的打法。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "两年后，县的登记选民名册上本党的数字翻了一倍。全国委员会来人问：你们是怎么做到的？", effects: { rep: 2.5, fac: { base: 14, labor: 4 }, flags: ["enclave_base"] } },
          ok: { body: "联盟立住了。十七个人的后厅换了个大点的后厅。", effects: { rep: 1.5, fac: { base: 9 } } },
          meh: { body: "商会给了你支持，也给了你议程。你从此代表的不只是你的党。", effects: { rep: 0.8, fac: { base: 6, commercial: 3 } } },
          fail: { body: "联盟谈崩在章程第二条：谁出钱、谁定调。你还是那十七个人里的一个。", effects: { rep: 0.2, fac: { base: 2 } } },
          critfail: { body: "对手把你「替外人代言」的照片做成了广告，在本地电台放了一个月。联盟没成，先背了标签。", effects: { rep: -1, fac: { base: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "maverick", text: "做「这个州的那种民主党人」：故意划清界限",
        note: "反着来的另一种：向中间靠，公开与本党全国路线切割。本党积极分子恨你，但你能拿到对面的票。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你的「独立宣言」上了州报头版。对面的跨党票在下一场地方选举里真实出现了。", effects: { rep: 1.75, fac: { base: 6, commercial: 6, establishment: -6 }, attr: { CUN: 2 } } },
          ok: { body: "你划清了界限，换来一些对面的中立。本党的电话从此打来得更少。", effects: { rep: 1, fac: { base: 4, commercial: 4, establishment: -5 } } },
          meh: { body: "两边都拿你当工具人用：需要骂本党的时候想起你，分东西的时候忘了你。", effects: { rep: 0.4, fac: { base: 2, establishment: -4 } } },
          fail: { body: "切割过了头：本党不再给你志愿资源，对面的票也没真来。两头空。", effects: { rep: -0.6, fac: { base: -6, establishment: -8 } } },
          critfail: { body: "你在访谈里骂本党领袖的那段被剪成了全国广告——不是替你宣传的那种。党内档案给你贴了「叛徒」标签。", effects: { rep: -1.25, fac: { base: -8, establishment: -12 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "grind", text: "熬：把十七个人的后厅变成一百个人",
        note: "不求奇袭，做基本盘。慢，但每一步都是真的。",
        base: 0.7,
        outcomes: {
          crit: { body: "一年跑了六十个县的筹款晚宴（平均每场十九人）。第二年，后厅换了正式的办公室。", effects: { rep: 1.25, fac: { base: 8, establishment: 4 }, attr: { INT: 1 } } },
          ok: { body: "组织在长。慢得像看草长——但草确实在长。", effects: { rep: 0.6, fac: { base: 5, establishment: 2 } } },
          meh: { body: "熬着。你开始理解「在场」本身就是少数派最大的资产。", effects: { rep: 0.4, fac: { base: 3 } } },
          fail: { body: "第六十一个县你没去成——预算和热情同时见了底。", effects: { rep: 0.2, fac: { base: 2 }, hp: -0.8 } } ,
          critfail: { body: "你熬了三年，全国风向一变，本党在这个州的登记数又掉了一截。你熬了个寂寞，但你的名字成了「坚持」的同义词——值不了钱，值一点尊敬。", effects: { rep: -0.4, fac: { base: 4, establishment: -4 }, attr: { INTG: 2 } } }
        }
      }
    ]
  },

  /* ---- 摇摆州：最后一周 ---- */
  {
    id: "state_swing_final",
    grade: "major", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    states: ["OH", "FL", "PA"], electionNote: true,
    tierMin: 1, tierMax: 4, weight: 18,
    fromYear: 1960, toYear: 2022,
    brief: {
      lede: "选前七天，全国的飞机都往你这里飞。",
      known: [
        "你的摇摆州又成全国战场：钱、代言人、广告按小时涌入。",
        "民调差距在误差内，最后七天的资源怎么用定一切。",
        "桌上三张牌：电视广告、敲门动员、和对手的挖坟。"
      ],
      rumor: [
        "据说全国委员会的最后一笔钱今晚到账，只够选两样。",
        "据说对手已经把你的旧账研究到了大学宿舍违纪记录。"
      ],
      unknown: [
        "最后七天你每个小决定都会被放大一万倍。",
        "赢了就拿到四年溢价；输了预算就去别州。"
      ],
      terms: [
        { k: "摇摆州", v: "两党基本盘接近、每票都明码标价的决战州。" },
        { k: "地面战", v: "敲门催票的基层动员：枯燥但致命。" }
      ]
    },
    title: "摇摆州选战进入最后一周",
    body: "全美国的钱、飞机和镜头都压到了你的州。误差以内的民调、七天的窗口、只够用两次的弹药。这一周会被写进多少回忆录，取决于你怎么打。",
    choices: [
      {
        id: "air", text: "空中战：把最后的钱全砸进电视广告",
        note: "声量最大化。贵、可见、且效果衰减快——但摇摆州的沉默的大多数只认电视。",
        cost: { fun: 3.5 },
        base: 0.5, mods: [{ src: "fac", key: "press", w: 0.3 }],
        outcomes: {
          crit: { body: "最后一支广告击中了：对手的回应广告仓促而难看。选举夜，你的州以一个点之差亮了你的颜色。", effects: { rep: 1.75, voters: { warm: 400 }, fac: { press: 10, base: 6 } } },
          ok: { body: "广告守住了基本盘。结果：赢了，赢得像广告里说的那样「稳步」。", effects: { rep: 1, voters: { warm: 150 }, fac: { press: 6 } } },
          meh: { body: "广告打了水漂的一半。另一半没人记得。赢是赢了，账难看。", effects: { rep: 0.6, fac: { press: 3 } } },
          fail: { body: "对手最后一周的反广告更狠。你输了两个点，输掉的预算更多。", effects: { rep: 0.2, fac: { press: 2 } } },
          critfail: { body: "广告里一个数据被查证有误，选举前两天上了新闻——新闻的版面比广告大。", effects: { rep: -0.9, fac: { press: -8, base: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "ground", text: "地面战：最后七天，十万次敲门",
        note: "枯燥、便宜（相对）、致命。摇摆州的胜负手从来在门廊上，不在电视里。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "投票率比你党的高手预估还高两个点——多出来的每一票都敲过门。选举夜的分析师连着三次说「前所未有」。", effects: { rep: 2, fac: { base: 14, labor: 6 } } },
          ok: { body: "地面机器转起来了。赢的那一个点，是从门廊上一个一个敲出来的。", effects: { rep: 1.25, fac: { base: 10 } } },
          meh: { body: "动员做了，雨也下了。投票率持平。赢了或者输了，都轮不到地面战背锅或领功。", effects: { rep: 0.6, fac: { base: 5 } } },
          fail: { body: "对手的地面战更大。你的志愿者在最后一晚收到了对面的时薪报价——有人去了。", effects: { rep: 0.2, fac: { base: 3 } } },
          critfail: { body: "催票电话名单错发了一批已故选民。选举没输，笑话输了——全国级的。", effects: { rep: -0.8, fac: { base: -6, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "oppo", text: "挖坟研究：把对手的旧账在最后 72 小时放出去",
        note: "十月惊奇。赢则大胜，败则反噬——且「脏」的标签跟人一辈子。",
        base: 0.35, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "材料是真的、时机是毒的。对手最后三天的新闻全是自证清白。你赢了五个点——多出来的四个点是「十月惊奇」的利息。", effects: { rep: 1.25, fac: { base: 6, press: 8 }, lev: 1, attr: { CUN: 2 } } },
          ok: { body: "材料放出去溅起了水花，没有海啸。够搅乱对手的节奏，不够定胜负。", effects: { rep: 0.7, fac: { press: 4 }, lev: 1 } },
          meh: { body: "媒体核实了一周才发——选举都结束了。你的「惊奇」成了马后炮。", effects: { rep: 0.3, fac: { press: 2 } } },
          fail: { body: "材料被证实掺了水分。放料的链条被查到了你的顾问——你「不知情」，但「不知情」本身成了新闻。", effects: { rep: -0.7, fac: { press: -8, base: -5 }, flags: ["scandal_2"] } },
          critfail: { body: "十月惊奇炸膛：材料是假的，造假的人是你志愿者里的一个。全国媒体复盘了一个月，标题都带你的名字。", effects: { rep: -1.5, fac: { press: -12, base: -10, establishment: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "voter_protect", text: "什么都不打：把资源全押在「保护票」上",
        note: "保底选项：不进攻，只确保每一张属于你的票都被投出来、被数进去。没人因为这个赢上头条，也没人因为这个输掉官司。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你派的监票员在三个投票站拦下了有瑕疵的计票。那些以百票定胜负的县，这就是胜负。", effects: { rep: 1, fac: { base: 6, establishment: 4 }, attr: { INT: 1 } } },
          ok: { body: "每张票都被数到了。选举的结果无论怎样，你睡得着。", effects: { rep: 0.6, fac: { base: 4 } } },
          meh: { body: "风平浪静的一周。你的谨慎没上新闻——这正是它的价值。", effects: { rep: 0.2 } },
          fail: { body: "你守住了程序，输了声量。对手的广告铺满了每个频道。", effects: { rep: 0.1, fac: { press: -3 } } },
          critfail: { body: "你的监票名单里混进了两位有前科的志愿者，被对手炒作成「干预投票」。鸡毛蒜皮，但够恶心你一个月。", effects: { rep: -0.4, fac: { press: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ---- 深蓝州的共和党人：伪装温和派 ---- */
  {
    id: "state_blue_minority",
    grade: "mid", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    states: ["NY", "MA"], parties: ["R"],
    tierMin: 0, tierMax: 2, weight: 18,
    brief: {
      lede: "在这个州，你的党徽要熨进西装内衬里。",
      known: [
        "你的党在这个州是少数派中的少数派：全州职位二十年没赢过。",
        "地方是另一回事：选民投的是人，不是党。",
        "顾问给你两条路：全国路线的本州版，或本地温和派。"
      ],
      rumor: [
        "据说全国党对深蓝州温和派有名单：拿资源也拿约束。",
        "据说本州金主偏爱输得干净的保守派。"
      ],
      unknown: [
        "深蓝州温和派是全国党的稀缺资产。",
        "稀缺也意味着：风向一转你最先被牺牲。"
      ],
      terms: [
        { k: "深蓝州", v: "民主党长期占优的州；共和党只能经营地方。" }
      ]
    },
    title: "你在深蓝州竞选，把党徽藏进西装内袋",
    body: "深蓝州的少数派政治学：竞选材料上你的党派字号比对手小三号。你要决定自己是什么——全国的版本，还是这个州的特例。",
    choices: [
      {
        id: "moderate", text: "做这个州的温和派：议题本地化",
        note: "环保、交通、财政纪律——选民要什么你谈什么，全国纲领绕着走。能赢，但全国党会持续给你压力。",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你以跨党派票赢下职位。两党的全国频道同时提到你——一边当资产，一边当叛徒素材。", effects: { rep: 2.25, fac: { base: 8, commercial: 5, establishment: -4 } } },
          ok: { body: "你赢了。竞选材料的党徽字号确实小了一号，没人提，大家都知道。", effects: { rep: 1.5, fac: { base: 5, commercial: 3 } } },
          meh: { body: "温和派的路线走通了第一步。全国委员会的电话开始打来「沟通口径」。", effects: { rep: 0.8, fac: { base: 3, establishment: -3 } } },
          fail: { body: "再温和也没用：风向年，你的党徽被大浪盖住了。你输了，输得体面。", effects: { rep: 0.4, fac: { base: 2 } } },
          critfail: { body: "你温和得太成功，初选里被本党的纯度审查者咬住：「他到底是哪边的？」你赢了普选，输了初选的下一届。", effects: { rep: -0.8, fac: { base: 4, establishment: -8 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "purist", text: "做全国的版本：党徽放大一号",
        note: "向全国路线看齐。在这个州等于弃权——但你成为全国党在东北的「存在证明」，资源与保护随之而来。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你输了选举，赢了全国名单：委员会的演讲席位、有线新闻的常驻位次、和「原则至上」的名声。", effects: { rep: 1.25, attr: { INTG: 2 }, fac: { establishment: 8, church: 5, base: -6 } } },
          ok: { body: "输了，但输得让全国党部满意。下一轮的初选资源已经在路上。", effects: { attr: { INTG: 1 }, fac: { establishment: 6, base: -4 } } },
          meh: { body: "你守住了立场，交了学费。这个州的选民礼貌地拒绝了你的党徽。", effects: { fac: { establishment: 3, base: -3 } } },
          fail: { body: "惨败。全国的「存在证明」没人在乎——证明存在的前提是存在。", effects: { rep: -0.6, fac: { base: -6 } } },
          critfail: { body: "你为全国路线站台的一段视频在本州疯传——不是支持者转的。你成了对面筹款邮件的固定反派。", effects: { rep: -1.5, fac: { base: -10, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "nonpartisan_office", text: "改走无党派职位：检察官/法官/市政经理",
        note: "把党徽整个收起来。选票上没有 D 和 R 的位置——检察官、审计、法官——是深蓝州少数党的经典活路。",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你以「法律与秩序外加账目清白」的形象赢了检察官职位。政党的部分？选票上根本没这一栏。", effects: { tier: 1, rep: 1.5, fac: { establishment: 5, base: 4 }, attr: { INT: 2 } } },
          ok: { body: "无党派职位到手。政治生涯在别处转弯，但没停车。", effects: { tier: 1, rep: 1, fac: { establishment: 3 } } },
          meh: { body: "职位到手，曝光有限。检察官的工作本身倒是货真价实的权力练习。", effects: { rep: 0.6, attr: { INT: 1 } } },
          fail: { body: "对手挖出你十年前的一次党内捐款。无党派的选票挡不住有党的过去。", effects: { rep: -0.4, fac: { base: -3 } } },
          critfail: { body: "竞选期间你任内的一桩旧案被翻出：当事人喊冤的信登了报。职位没赢，名字先上了司法版的标题。", effects: { rep: -1.25, fac: { base: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  }

]);
