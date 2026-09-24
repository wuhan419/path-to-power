/* ============================================================================
 * CONTENT · events/140-reckoning.js
 * 【清算包 · 树敌与报复】roguelike 政治生存的核心张力：
 *   大收益选项往 G.counters["wrath_<组>"] 里攒恨（见 01-config.js 的 wrath 登记表）→
 *   恨攒到 25 出「前哨战」（本包 warn 幕，给出泄压阀：低头/交钱/示好可以削恨）→
 *   恨攒到 55 出「清算」（major 幕）——赌赢了你踩着尸体上位，赌输了就领一个
 *   黑色幽默成就（hardEnd 理由：assassinated / framed / ruined / purged，
 *   成就文案在 40-endings.js）。失败即死，无保底；仇恨永不衰减。
 *
 * 为什么不设安全选项：安全选项存在（缴械/不出头），但每一条都有实打实的政治代价 ——
 *   生存率是拿升官速度换的。这正是人生模拟器式劝退快感的来源。
 *
 * 真实原型（每条事件的报复手段都有出处）：
 *   reck_press_dossier   —— 1992 小报付费采访围猎（Gennifer Bills 案）：报纸买断丑闻首发权
 *   reck_press_crusade   —— 1890s 赫斯特报业战争 / 1987 加里·哈特「跟踪我啊」48 小时报废
 *   reck_est_summons     —— 1947 众议院非美活动委员会（HUAC）听证：「你现在还是不是……」
 *   reck_est_blacklist   —— 好莱坞黑名单 + 1954 陆军-麦卡锡听证：机器碾掉不听话的人
 *   reck_money_cold      —— 金主冷处理：晚宴不再请你，钱开始「重新评估」
 *   reck_money_bounty    —— 金主直接收购反对派：2014 坎托被无名者掀翻（钱在背后）
 *   reck_oppo_list       —— 1971 尼克鲍「敌人名单」（白宫 plumbers 的出处）
 *   reck_oppo_gun        —— 1963 达拉斯 / 1968 大使酒店 / 1981 希尔顿门外（欣克利六枪）
 *   reck_agy_file        —— 1975 丘奇委员会揭出的 COINTELPRO：「用档案毁掉一个活动家」
 *   reck_agy_frame       —— 伪造起诉书与「不存在的线人」：把桩没发生过的案钉在你身上
 *
 * 档位写法：本包是新内容，tierMin 一律 tierRaw:true 按 10 级空间直写，不走旧档映射。
 * ==========================================================================*/
"use strict";
(function () {
  const ERAS = Object.keys(POTUS.reg.era);

  function out(body, effects) { return { body: body, effects: effects || {} }; }
  /* 低头认怂的统一手感：高成功率、削一大块恨、但声望和派系都得吐一点出来 */
  function bow(group, amount) {
    return { count: (function (o) { o["wrath_" + group] = amount; return o; })({}) };
  }

  POTUS.define("event", [

    /* ==================================================================
     * 一、新闻界（wrath_press）
     * ================================================================== */

    /* ------------------------------------------------------------------
     * 1.1 前哨战：记者开始翻你的旧账（wrath_press ≥ 25）
     * ------------------------------------------------------------------ */
    {
      id: "reck_press_dossier", era: ERAS, tierRaw: true, tierMin: 1,
      countMin: { wrath_press: 25 },
      weight: 12, grade: "mid", valence: "bane", dyn: true, category: "media",
      brief: {
        lede: "两家互不往来的报社，同一周都在查同一件旧事。这不是巧合。",
        known: [
          "有个记者约你「聊聊过去」，问的全是你以为没人记得的细节。",
          "你在公开场合怼过的那位专栏作家，最近写你写得格外勤。",
          "编辑部在等你这次怎么回应——回应的方式本身就是素材。"
        ],
        rumor: [
          "有人在饭局上说过：「他的那些事，攒一攒够出一本书。」",
          "你的旧同事已经被约稿了——写回忆录的那种约稿。"
        ],
        unknown: [
          "他们手里到底有实货，还是只想吓你开口解释。",
          "这次是试探，还是围剿的开幕。"
        ]
      },
      title: "两名记者同时在查你的旧账",
      body: "电话打到办公室，问话客气，问题不客气。\\n你怼过新闻界太多次——现在他们在拼一份关于你的档案。",
      choices: [
        {
          id: "appease", text: "递独家：给头牌记者一个专访，把话头喂饱",
          note: "泄压阀。笔伐变访谈，恨 -18。代价：你把刀柄递了出去，以后他随时能再写你。",
          base: 0.72, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
          outcomes: {
            crit: out("专访做了三个小时，你第一次完整讲了那段往事。见报那天，报道的题目是「一个政治人物的自白」——很难看，但是很难被引用。", Object.assign({ rep: 0.3, fac: { press: 8 } }, bow("press", -18))),
            ok: out("独家给了，笔锋收了。编辑部的老关系们心照不宣：你懂事。", Object.assign({ fac: { press: 5 } }, bow("press", -18))),
            meh: out("专访发了，问题还是那些问题——只是换个问法再问一遍。你把话喂给了他们，他们也没打算省着嚼。", bow("press", -10)),
            fail: out("专访被剪成问答集锦，最要命的那句是你亲口说的。「他主动交代了」——这比被查出来还难堪。", Object.assign({ rep: -0.5, fac: { press: -4 } }, bow("press", -6))),
            critfail: out("记者拿着你的「独家」回去交叉核对了三个月。你亲口讲的故事，成了那份档案的第一页。", Object.assign({ rep: -1, flags: ["press_dossier"] }, bow("press", -4)))
          }
        },
        {
          id: "defy", text: "公开硬刚：开记者会骂这是「猎巫」",
          note: "赌你的支持者比记者更饿。赢了他们缩回去，输了恨 +8，直接给清算铺路。",
          base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
          outcomes: {
            crit: out("你把记者会开成了控诉大会，「猎巫」两个字上了当天头条。第二天起，约稿信少了一半——他们要挑更硬的目标。", { rep: 0.9, voters: { diehard: 250 }, fac: { press: -6 }, count: { wrath_press: -8 } }),
            ok: out("你骂得很解气。报社发了篇措辞克制的回应，暂时消停了。消停不等于算了。", { rep: 0.4, count: { wrath_press: -3 } }),
            meh: out("记者会和记者们打了平手：各说各话，谁也没抓住谁的错处。", {}),
            fail: out("你的「猎巫」指控被逐条打脸——他们查到的每样东西都是真的。撒谎护短，比旧账本身更好写。", Object.assign({ rep: -0.8, fac: { press: -8 } }, { count: { wrath_press: 8 } })),
            critfail: out("你在记者会上说「跟踪我啊」。四天之后，他们真的跟踪出了新东西。这句狂言会被引用到你退休。", Object.assign({ rep: -1.5, fac: { press: -12 }, flags: ["scandal_1"] }, { count: { wrath_press: 12 } }))
          }
        },
        {
          id: "dig", text: "背调记者：查查他抽屉里有什么",
          note: "以灰制灰。成了能止咬，败了坐实「打压新闻自由」——那是新闻界最爱的题材。",
          base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
          cost: { fav: 1 },
          outcomes: {
            crit: out("你把对方的几笔烂账「匿名提供」给了另一家报社。两家互相拆台，你的旧账在混战里沉了底。", { attr: { CUN: 3 }, fac: { press: -2 }, count: { wrath_press: -8 } }),
            ok: out("记者的编辑收到「提醒」，查你的线暂住了。所有人都知道为什么，所有人都不会写出来。", { count: { wrath_press: -6 } }),
            meh: out("你查到一半发现对方也查到你了。互相有对方的料——这种僵局谈不上安全。", { flags: ["leaker_suspect"] }),
            fail: out("你的背调被对方抓了个正着。下周的头版就是他们的新题材：「他派人查记者」。", { rep: -0.8, fac: { press: -10 }, flags: ["leaker_suspect"], count: { wrath_press: 10 } }),
            critfail: out("你雇的人被拍到了。报道标题起得很省字：「打压新闻」。这两个词以后就是你的标签。", { rep: -1.5, fac: { press: -14, base: -6 }, flags: ["scandal_2", "leaker_suspect"], count: { wrath_press: 14 } })
          }
        }
      ]
    },

    /* ------------------------------------------------------------------
     * 1.2 清算：报业围剿（wrath_press ≥ 55）
     * ------------------------------------------------------------------ */
    {
      id: "reck_press_crusade", era: ERAS, tierRaw: true, tierMin: 2,
      countMin: { wrath_press: 55 },
      weight: 10, grade: "major", valence: "bane", dyn: true, unique: true, category: "media",
      brief: {
        lede: "周一，三家的头版是同一天、同一个主题。这是约好的。",
        known: [
          "一份连更四周的调查系列已经排好了版面，你的名字是第一集。",
          "报社老板在行业聚会上放话：「要把他这一页翻掉。」",
          "广告商已经开始撤你的关联项目——风比稿子跑得还快。"
        ],
        rumor: [
          "系列稿的最后一集压着一份你从没见过的文件。",
          "有人在编辑部里说：这次不是报道，是处决。"
        ],
        unknown: [
          "硬刚赢了是殉道，输了是认罪书——差的就是那几个点的运气。",
          "沉默能不能等到下一个新闻周期。这个国家的故事从来不缺新的。"
        ]
      },
      title: "新闻界发动了围剿：连投四周的「终结他」系列",
      body: "这不是一篇稿子，是一场战役：版面统一、口径统一、火力翻倍。\\n他们不是在报道你——他们是在收尾。",
      choices: [
        {
          id: "fight", text: "应战：逐篇反驳，把他们每一张牌都打掉",
          note: "赌局。赢 = 打退围剿、声望暴涨；roll 输 = 社死退场，无保底。",
          base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "attr", key: "CHA", w: 0.3 }],
          cost: { ap: 2 },
          outcomes: {
            crit: out("你逐条拆了四周，拆到第三周他们开始自己查自己。系列稿烂尾，两家报社的编委引咎改组——你成了媒体圈公开的行业笑话，政治圈公开的英雄。", { rep: 2, attr: { INT: 3 }, voters: { diehard: 600, warm: 800 }, fac: { press: -10, base: 10 }, count: { wrath_press: -30 } }),
            ok: out("你的反驳稿篇篇扎实。系列稿失去了节奏， editors 自己先泄了气。围剿不了了之——在新闻界，不了了之就是胜利。", { rep: 0.9, voters: { diehard: 250 }, count: { wrath_press: -22 } }),
            meh: out("打成消耗战。他们没打死你，你也没让他们出血。你的头一周不再是头条——勉强算赢。", { rep: -0.3, count: { wrath_press: -8 } }),
            fail: out("第三周，他们放出了那份文件。你的逐条反驳被一份原始记录整体打穿。「他撒谎」不再需要推理，只需要截图。你的名字从政治版挪到了社会版——那里不撤版。", { hardEnd: "ruined" }),
            critfail: out("那份文件是你自己签的字。你当着全国媒体否认了三次，三次都有录像。围剿的收官报道最好写：「他到最后一刻还在撒谎」。", { hardEnd: "ruined" })
          }
        },
        {
          id: "buyout", text: "拆弹药：把独家卖给对手报纸，让行业内讧",
          note: "花钱买活路。报社会分赃，围剿会变成内斗——前提是你出得起价。",
          base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
          cost: { fun: 3 },
          outcomes: {
            crit: out("两家大报为了独家打了起来，谁发对方的稿子谁输——围剿在版权战争里胎死腹中。你买了个便宜的结局。", Object.assign({ attr: { CUN: 2 }, fac: { press: 4 } }, bow("press", -25))),
            ok: out("对手报纸收了独家，首发那家愤而撤了系列稿的后两集。媒体人最恨的从来不是政客，是抢headline的同业。", Object.assign({ fac: { press: -3, commercial: 2 } }, bow("press", -25))),
            meh: out("独家卖了，围剿只拆了一半——「反正素材已经给他了」，另两家接着写。", Object.assign({ rep: -0.3 }, bow("press", -10))),
            fail: out("收钱的那家把独家和「他试图买断报道」一起发了。围剿升级成丑闻：行贿媒体。这词在你们这行只有一个写法。", Object.assign({ rep: -1.2, fac: { press: -14, base: -6 }, flags: ["scandal_3"] }, { count: { wrath_press: 10 } })),
            critfail: out("付款的转账记录进了他们正在做的那篇稿子。标题省掉了「试图」两个字。", Object.assign({ rep: -1.8, flags: ["scandal_4", "investigation_open"] }, { count: { wrath_press: 12 }, hardEnd: "ruined" }))
          }
        },
        {
          id: "sitout", text: "扛住：一句不回应，熬到新闻周期换人",
          note: "保底。恨不清零，人先缩水——赌他们的耐心比你的支持度短。",
          base: 0.7, mods: [{ src: "attr", key: "INT", w: 0.25 }],
          outcomes: {
            crit: out("第三周，另一桩更大的丑闻爆了出来。围剿烂尾，你一个字没说过。政治史上沉默胜率最高的一役。", { rep: 0.3, count: { wrath_press: -6 } }),
            ok: out("你顶住了四周。没有回音的炮火最难坚持——他们先撤了。你的名声蒙了灰，但招牌还在。", { rep: -0.2, count: { wrath_press: -4 } }),
            meh: out("系列稿按计划完结，你一个字没接。灰头土脸，但活下来了——这个行当里活着就是资格。", { rep: -0.6 }),
            fail: out("你扛住了稿子，没扛住后果：金主「暂缓合作」、党内「重新评估」——新闻界的子弹打完了，别人的子弹刚开始上膛。", { rep: -1.2, fac: { establishment: -6, commercial: -6 }, flags: ["scandal_2"] }),
            critfail: out("四周里每一天都有新料。完结那天，一家有分量的报纸替同行做了总结社论：「这样的人不该再被认真对待。」这句话会跟你的整个余生。", { rep: -1.8, fac: { establishment: -8, base: -6 }, flags: ["scandal_3"], fall: 1 })
          }
        }
      ]
    },

    /* ==================================================================
     * 二、党建制派（wrath_establishment）
     * ================================================================== */

    /* ------------------------------------------------------------------
     * 2.1 前哨战：委员会的传票（wrath_establishment ≥ 25）
     * ------------------------------------------------------------------ */
    {
      id: "reck_est_summons", era: ERAS, tierRaw: true, tierMin: 1,
      countMin: { wrath_establishment: 25 },
      weight: 12, grade: "mid", valence: "bane", dyn: true, category: "political",
      brief: {
        lede: "党团早餐会上，主席当众喊错了你的名字——全桌人都听懂了。",
        known: [
          "一纸「自愿出席」的听证邀请到了：议题是你的「不当影响」。",
          "两位老资格公开说「该有人管管他了」，没点名，说的就是你。",
          "下次拨款/提名，你的位子往后排了三排。"
        ],
        rumor: [
          "听证不是为你开的，是给你递个话：党还容得下你，得懂事。",
          "有人已经在替你物色「退下来去哪」了。"
        ],
        unknown: [
          "这代建制派是要收服你，还是要除掉你。",
          "低头换来的只是缓刑，还是真能重新入列。"
        ]
      },
      title: "党给你寄了一张听证会的传票",
      body: "议题叫「不当影响」，范围没有边界，时间由他们定。\\n主席秘书好意提醒你：出席时「态度比证词有用」。",
      choices: [
        {
          id: "heel", text: "进组低头：听证会上认错，回来投票看党意",
          note: "泄压阀。恨 -18 换回椅子——从此你的投票记录不完全是你自己的。",
          base: 0.75, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
          outcomes: {
            crit: out("你在听证会上把姿态放得极低，认错认得像检讨，散会前已经和主席约好了下次立法合作。党内通讯的措辞从「问题人物」变成了「回归团队」。", Object.assign({ rep: -0.2, fac: { establishment: 12 } }, bow("establishment", -18))),
            ok: out("你道了歉，党收下了。委员会报告写得像调解书——两造握手，记者失望。", Object.assign({ fac: { establishment: 8 } }, bow("establishment", -18))),
            meh: out("低头低得不情不愿，主席看在眼里。账先记着——建制派最不缺的就是耐心。", Object.assign({ fac: { establishment: 3 } }, bow("establishment", -8))),
            fail: out("你在听证席上的认错被听出了嘲讽味。老资格们交换眼色的速度，比你的辩才快。", Object.assign({ rep: -0.5, fac: { establishment: -8 } }, { count: { wrath_establishment: 8 } })),
            critfail: out("听证会尾声，主席当着镜头问：「你是不是觉得我们都不懂规则？」你回答得太快了。这句话会被回放很多年。", Object.assign({ rep: -1, fac: { establishment: -12 } }, { count: { wrath_establishment: 12 }, flags: ["party_traitor"] }))
          }
        },
        {
          id: "ally", text: "找保人：请党内元老出面说情",
          note: "人情是硬通货。请得动谁，决定你在他们的账本上记哪一页。",
          base: 0.55, mods: [{ src: "fac", key: "establishment", w: 0.35 }],
          cost: { fav: 1 },
          outcomes: {
            crit: out("两位元老联名为你说话，听证会改成了「闭门交流」。你欠了大人情，但椅子还是你的。", { fav: 1, fac: { establishment: 5 }, count: { wrath_establishment: -12 } }),
            ok: out("一位元老出面，火候拿捏得刚好：党要的面子有了，你要的里子保住了。", { count: { wrath_establishment: -10 } }),
            meh: out("出面的人级别不够，说情变成了「和稀泥」。听证照开，只是词缓和了一点。", { count: { wrath_establishment: -3 } }),
            fail: out("替你说话的人被顺带教训了一顿。建制派最擅长的是：让救援本身变成站队证据。", Object.assign({ fac: { establishment: -6, base: -4 } }, { count: { wrath_establishment: 8 } })),
            critfail: out("保人听完你的请求沉默了十秒，然后把电话挂在了你面前。那十秒里你已经知道答案了。", Object.assign({ rep: -0.8 }, { count: { wrath_establishment: 10 } }))
          }
        },
        {
          id: "defy", text: "不去：公开拒绝配合「政治表演」",
          note: "强硬路线。基层会为你欢呼，机器会替你记账。",
          base: 0.4, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
          outcomes: {
            crit: out("你的拒绝声明被基层当成战斗檄文转发。委员会权衡了两天，把听证议题改成了「程序优化研究」。机器第一次让了步。", { rep: 0.8, voters: { diehard: 400 }, fac: { base: 8, establishment: -6 }, count: { wrath_establishment: -5 } }),
            ok: out("你没去，他们没辙——缺席的听证会变成你的记者会。建制派把这笔账压进了更深的抽屉。", { rep: 0.4, voters: { warm: 300 } }),
            meh: out("听证会照开，只是主角换成了对你的指控。你赢了一半舆论，输了一半程序。", { count: { wrath_establishment: 4 } }),
            fail: out("拒绝配合被写进报告：「不尊重制度」。这行字在党内的杀伤力，比任何丑闻都耐久。", Object.assign({ rep: -0.6, fac: { establishment: -10 } }, { count: { wrath_establishment: 10 } })),
            critfail: out("你缺席那天，委员会公布了一批你没见过的材料。「无视程序 + 隐瞒事实」——两个罪名互相作证。你的「强硬」第一次显得像「心虚」。", Object.assign({ rep: -1.2, fac: { establishment: -14 }, flags: ["scandal_2"] }, { count: { wrath_establishment: 14 } }))
          }
        }
      ]
    },

    /* ------------------------------------------------------------------
     * 2.2 清算：黑名单（wrath_establishment ≥ 55）
     * ------------------------------------------------------------------ */
    {
      id: "reck_est_blacklist", era: ERAS, tierRaw: true, tierMin: 2,
      countMin: { wrath_establishment: 55 },
      weight: 10, grade: "major", valence: "bane", dyn: true, unique: true, category: "political",
      brief: {
        lede: "党内名单在流传——标题是「下一轮不能留的人」。名单不很长，你在第二个。",
        known: [
          "你的办公室从主楼挪到了租赁楼层——手续齐全，理由「装修」。",
          "三笔在谈的资源同时「流程暂停」。单独看都巧，合起来看是部署。",
          "一位年轻「明日之星」开始到处替你选区的旧选民「代言」。"
        ],
        rumor: [
          "名单是外部顾问做的 PPT——他们管这叫「结构性调整」。",
          "党主席的原话：「先让他知道没有我们的日子什么样。」"
        ],
        unknown: [
          "这套机器的耐心比你能想到的多。",
          "硬顶是殉道还是自毁——取决于你的选民还认不认你。"
        ]
      },
      title: "党建制派把你们这些不听话的人列进了黑名单",
      body: "没有红头文件，没有正式通知——但整个党都在传阅同一份名单。\\n机器碾人不点火，只关闸：钱、门路、排期，一夜之间全部「流程中」。",
      choices: [
        {
          id: "break", text: "硬顶：把这清洗当成初选预告，直接找选民",
          note: "生死赌局。你的底盘够不够硬，今天见分晓；不够，就永远见不到明天的分晓。",
          base: 0.42, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
          cost: { ap: 2 },
          outcomes: {
            crit: out("你把党的名单捅到了阳光下，开着一辆大巴绕遍全境。基层小额捐款把机器掐灭的每个火苗都重新点燃。第二年选举夜，被你「预定要让位」的那个年轻人输得很难看。", { rep: 2, attr: { CUN: 2 }, voters: { diehard: 900, warm: 1200 }, fac: { establishment: -20, base: 15 }, fun: 3, count: { wrath_establishment: -30 } }),
            ok: out("清洗撞上了你的支持度：两个被安排来顶你的「人选」自己退出了。党第一次发现，名单上那个名字比名单难办。", { rep: 1, voters: { diehard: 500 }, fac: { establishment: -10 }, count: { wrath_establishment: -20 } }),
            meh: out("你顶住了，但每场胜利都更贵：钱更紧、门更少、盟友更沉默。机器不跟你打——机器耗你。", { rep: 0.2, count: { wrath_establishment: -5 } }),
            fail: out("机器先动了初选程序：选区重划、登记风波、「技术性」提名障碍。你在规则之内输掉了规则之外的一切都救不了的那场选举。", { hardEnd: "purged" }),
            critfail: out("他们连罪名都替你想好了：「阻挠议事、挟民意自重」。清洗你的文件在党内传阅，标题措辞严谨，像处理一台故障设备。", { hardEnd: "purged" })
          }
        },
        {
          id: "submit", text: "体面入列：公开道歉，接受「回来排队」",
          note: "活路，也是最贵的一条：从此你每句话后面都有人问「党怎么看」。",
          base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.35 }],
          outcomes: {
            crit: out("你的道歉声明由主席「亲自审阅后认可」发布。名单上你的名字被划掉——用铅笔，这很重要：你知道还能再写上，他们也这么想。但至少今天，你回到了组织。", Object.assign({ fac: { establishment: 14, base: -8 }, rep: -0.3 }, bow("establishment", -28))),
            ok: out("低头的姿势标准，流程走完了。恢复党团午餐资格那天，没人提名单的事——建制派的记忆是按议题分栏的。", Object.assign({ fac: { establishment: 10, base: -5 } }, bow("establishment", -25))),
            meh: out("你道了歉，名单上还有你的名字——「观察期」。在机器的语言里，观察期就是缓刑，缓刑也是刑。", Object.assign({ fac: { establishment: 2, base: -4 } }, bow("establishment", -10))),
            fail: out("你的道歉被评价为「没有诚意」。党要的不是低头，是膝盖。你半跪的样子，两边都看见了。", Object.assign({ rep: -0.8, fac: { establishment: -6, base: -6 } }, { count: { wrath_establishment: 8 } })),
            critfail: out("你道歉的信稿被泄露，附赠一份你私下吐槽主席的录音——递交降书的同时被人翻出了暗账。「两头下注」，机器最恨的就是这个。", Object.assign({ rep: -1.4, fac: { establishment: -12 }, flags: ["party_traitor", "scandal_2"] }, { count: { wrath_establishment: 12 }, fall: 1 }))
          }
        },
        {
          id: "third", text: "找中间人：让党内大佬组一个「和解饭局」",
          note: "骑墙术。饭局开得成是台阶，开不成是批斗预备会。",
          base: 0.5, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CHA", w: 0.3 }],
          cost: { fav: 1 },
          outcomes: {
            crit: out("饭局吃了三小时，出来时主席的手搭在你肩上拍了一张照。那张照上了地方报，配文「团结」。名单从此没人再提——提就是不给照片上两个人面子。", Object.assign({ rep: 0.5, fac: { establishment: 8 } }, bow("establishment", -22))),
            ok: out("中间人把话说圆了：你收回一半，党忘掉一半。交易达成。政治记忆能到这个成交量，已是丰收。", Object.assign({ fac: { establishment: 5 } }, bow("establishment", -18))),
            meh: out("饭局吃成了商务宴请：谁都没提名单，谁都没翻篇。你保住了体面，仅此而已。", bow("establishment", -6)),
            fail: out("中间人收了你的礼，转头把你的诉求原样转述给了主席——加了一句自己的点评。你的「和解方案」成了新一轮定罪材料。", Object.assign({ rep: -0.7, fac: { establishment: -8 } }, { count: { wrath_establishment: 10 } })),
            critfail: out("饭局上谈崩了。散席时主席只留下一句：「名单是清单的初稿。」这句话不需要解释，从此每次人事会议都会被想起。", Object.assign({ rep: -1.2, fac: { establishment: -12 } }, { count: { wrath_establishment: 15 } }))
          }
        }
      ]
    },

    /* ==================================================================
     * 三、金主（wrath_money）
     * ================================================================== */

    /* ------------------------------------------------------------------
     * 3.1 前哨战：晚宴不再请你（wrath_money ≥ 25）
     * ------------------------------------------------------------------ */
    {
      id: "reck_money_cold", era: ERAS, tierRaw: true, tierMin: 1,
      countMin: { wrath_money: 25 },
      weight: 12, grade: "mid", valence: "bane", dyn: true, category: "finance",
      brief: {
        lede: "筹款季的日程表很干净：干净得像被人擦过。",
        known: [
          "往年必邀你的三场晚宴，今年一封邀请函都没来。",
          "银行家群里传一句话：「他的项目再评估评估」——三个词都是客气。",
          "你的政治行动委员会续约谈判，对方要求「先看看年底的民调」。"
        ],
        rumor: [
          "有位金主在饭局上说：「我不是说他坏话——我先不说他。」",
          "有人在替一个「更稳的人选」试探捐款池。名字起得很像你的继任者。"
        ],
        unknown: [
          "钱缩回去只是观望，还是已经在给对手上膛。",
          "金主的记忆比选民的短，耐心比选民的长。"
        ]
      },
      title: "金主开始冷着你：晚宴没请、续约暂停",
      body: "钱没有说要抛弃你，钱只是开始「重新评估」。\\n在华盛顿，这两种说法是同一句话。",
      choices: [
        {
          id: "makeup", text: "上门认错：把「过去的冒犯」重新谈成「未来的合作」",
          note: "泄压阀。金主要的是被需要的感觉。恨 -18，但你得听一晚上生意经。",
          base: 0.7, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
          outcomes: {
            crit: out("你飞了三城、听了七小时创业故事、附和了两次你完全不懂的宏观判断。收效显著：晚宴邀请函回来了，还附了一句「下次带夫人」。", Object.assign({ fun: 1.2, fac: { commercial: 8 } }, bow("money", -18))),
            ok: out("和解饭吃完了。金主们达成谅解：「他变了。」——在捐款人语言里，这是最高褒奖。", Object.assign({ fun: 0.7, fac: { commercial: 5 } }, bow("money", -18))),
            meh: out("你低了头，钱回了半个身位：续约谈判重启，晚宴名单照旧没有你。", Object.assign({ fun: 0.3 }, bow("money", -8))),
            fail: out("你飞了三城，坐在最后一排听了两场别人的产品发布。散场时没人跟你抢着握手——那种不抢，就是答案。", { fun: -0.3, fac: { commercial: -4 }, count: { wrath_money: 6 } }),
            critfail: out("一位大捐款人当着满桌人给你上课：「你知道钱最喜欢什么样的政客吗？听话的。」这桌人今天都在看你怎么回答——这题你答什么都是错的。", { rep: -0.6, fac: { commercial: -6 } , count: { wrath_money: 10 } })
          }
        },
        {
          id: "small", text: "不看了：转向小额捐款和基层筹款",
          note: "绕开金主走草根路线。钱少但干净——建制和金主会把这视为新的冒犯。",
          base: 0.5, mods: [{ src: "fac", key: "base", w: 0.4 }],
          outcomes: {
            crit: out("你的小额捐款单跑赢了往年金主晚宴的总额。捐款人名单第一次姓「选民」。金主圈酸溜溜地传阅这份报表——酸，说明怕了。", { fun: 1.5, voters: { diehard: 300 }, fac: { base: 8, commercial: -5 }, count: { wrath_money: -6 } }),
            ok: out("草根筹款补上了窟窿。钱是有规模的：少，但是站着挣的。", { fun: 0.8, fac: { base: 4 } }),
            meh: out("小额捐款够开销不够扩张。你的电够点亮灯，不够烧别人。", { fun: 0.3 }),
            fail: out("小额筹款起势太慢，晚宴那边你也没去成。青黄不接——账房用最古老的词形容这个月：紧。", Object.assign({ fun: -0.5 }, { count: { wrath_money: 6 } })),
            critfail: out("你的「草根运动」第三个月没钱续服务器了。金主们看着这份狼狈的结案报告互相确认：离开他，是对的。", { fun: -1, rep: -0.4, fac: { base: -4 }, count: { wrath_money: 10 } })
          }
        },
        {
          id: "pressure", text: "亮手腕：暗示你的连任对他们「很重要」",
          note: "威胁金主是刀尖生意——他们评估过太多人的价值，不怕你说狠话。",
          base: 0.35, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
          outcomes: {
            crit: out("你把两份「只有你办得成」的项目文件「不小心」落在了饭局上。三天后续约全额通过——威胁的文明写法叫利益重申。", { fun: 1, attr: { CUN: 3 }, count: { wrath_money: -8 } }),
            ok: out("金主们听懂了，也咽下了：面上赔笑，账上打款。钱记住了这一笔——钱的记账方式比人持久。", { fun: 0.6, count: { wrath_money: -3 } }),
            meh: out("你的暗示被翻译成了「沟通风格问题」。款没断，情分薄了一层。", {}),
            fail: out("你先祖们经营这门生意两百年了，你猜他们怕不怕被教育？第二天，最后两家还在谈的赞助商同步「暂停」。", Object.assign({ fun: -0.8, fac: { commercial: -8 } }, { count: { wrath_money: 10 } })),
            critfail: out("你威胁错了人——这位和监管系统沾亲。两周后你被约谈的事项清单上，第一条就是「竞选资金合规」。", Object.assign({ fun: -0.5, flags: ["investigation_open"], fac: { commercial: -10 } }, { count: { wrath_money: 14 } }))
          }
        }
      ]
    },

    /* ------------------------------------------------------------------
     * 3.2 清算：钱雇人抬你（wrath_money ≥ 55）
     * 金主线不出人命——它做它更擅长的事：买断你的退路。
     * ------------------------------------------------------------------ */
    {
      id: "reck_money_bounty", era: ERAS, tierRaw: true, tierMin: 2,
      countMin: { wrath_money: 55 },
      weight: 10, grade: "major", valence: "bane", dyn: true, unique: true, category: "finance",
      brief: {
        lede: "一个你从没听过的人宣布参选，竞选纲领抄你的，经费是你的三倍。",
        known: [
          "三位大金主同季度出手，款都汇向同一个方向的选举机器。",
          "一家「独立研究机构」开始发布针对你的系列报告——标题一个比一个短，封面一个比一个厚。",
          "银行同意给你的对手「授信额度」，你的续约利率上浮了一个点。"
        ],
        rumor: [
          "有人在闭门会上讲过一句话：「他值多少钱，我们就出多少钱——买他下桌。」",
          "那位新人选的政治顾问，刚从你前任团队跳槽。"
        ],
        unknown: [
          "这是围猎，还是分手费谈判。",
          "钱能买到的东西里，没有「体面」，但能买到体面的包装。"
        ]
      },
      title: "金主出钱立了个「替代品」，专门用来抬走你",
      body: "新的竞选者、新的报告、新的银行额度——他们不是不投你，是投了你的替身。\\n钱不说绝话，钱只做预算。你的政治生涯被做成了预算科目。",
      choices: [
        {
          id: "counter", text: "对垒：拉出草根与旧盟友，跟钱正面打一场",
          note: "生死赌局。历史上赢过钱的都是疯子或天才——两种人都得先活过选举夜。",
          base: 0.4, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
          cost: { ap: 2 },
          outcomes: {
            crit: out("选举夜，你的「买不起广告牌」的对手在你的城镇里一票未得——他们算错了一件事：有些钱在选举夜之前就该付，而有些选民早就把票付给了你。你赢了这一局，整个金主圈半夜开会复盘。", { rep: 2, fun: 2, voters: { diehard: 900, warm: 1000 }, fac: { base: 15, commercial: -12 }, count: { wrath_money: -30 } }),
            ok: out("你的对手拿着三倍的钱，输在半倍 turnout。金主们第一次怀疑「钱不是万能的」——这个怀疑值钱，因为它让他们以后不敢再用钱吓你。", { rep: 1, voters: { diehard: 400 }, count: { wrath_money: -20 } }),
            meh: out("你赢了，赢得心疼：金主被斩了一半，借口的钱打满全仓。下一场这样的仗，你的账本不允许。", { rep: 0.3, fun: -1.5, count: { wrath_money: -6 } }),
            fail: out("钱把每一件事都做对了：广告、动员、律师、民调。你把能赢的都赢了，赢不了的那部分叫预算。初选夜，替代品踩着你出线。", { hardEnd: "purged" }),
            critfail: out("不仅输了，还被审计出筹款缺口——金主们把「他连账都做不平」写进了给媒体的背景材料。政治死亡证明的措辞很职业：「不再具竞争力」。", { hardEnd: "ruined" })
          }
        },
        {
          id: "terms", text: "谈价码：承认现实，让他们「入股」而不是「清仓」",
          note: "卖身契式活路：让出议题否决权，换预算不断供。",
          base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.35 }],
          outcomes: {
            crit: out("谈判桌比战场好认：你让出两个不重要议题的否决权，他们收回替代品。签字时金主代表说：「早这样，省多少竞选经费。」", { fun: 2, fac: { commercial: 8 }, count: { wrath_money: -25 } }),
            ok: out("停火达成。替代品「因个人原因」退选，你的续约恢复原价。政治里大部分和平都是用「以后再说」签的。", { fun: 1, count: { wrath_money: -20 } }),
            meh: out("停火只停了火：钱没回来，人退了一半。你保住了候选人资格，保住了一个「待定」。", { count: { wrath_money: -8 } }),
            fail: out("你派谈判的人被当成传话的。金主要的是「换人」，你带去的条件是「换个谈法」——不在一个议题上。", Object.assign({ fun: -0.8, rep: -0.4 }, { count: { wrath_money: 8 } })),
            critfail: out("你的「让步方案」被做成对比海报：左边是你三年前的承诺，右边是你今天的价码。替代品第一次有了比你更值钱的卖点：「他至少没讨价还价过」。", { rep: -1.5, voters: { warm: -600 }, fall: 1, count: { wrath_money: 12 } })
          }
        },
        {
          id: "expose", text: "掀桌：公开金主「买候选人」的操作，把丑闻变成议题",
          note: "同归于尽的合法版本。赌公众愤怒烧得比他们的钱快。",
          base: 0.35, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
          outcomes: {
            crit: out("你把资金链画成了一张关系图，配上「他们买你，我告你」。一周内三家媒体跟进，两位金主紧急撤资撇清。你从「被清仓的人」变成了「金主的麻烦」——这位置谁坐谁明白，比候选人硬气。", { rep: 1.8, attr: { INT: 2 }, voters: { diehard: 600, warm: 800 }, fac: { commercial: -18, base: 10 }, count: { wrath_money: -25 } }),
            ok: out("关系图上了头版。金主们「暂缓」了对替代品的支持——钱的尊严被公开处刑后，钱也会缩回去。", { rep: 0.8, voters: { warm: 400 }, fac: { commercial: -10 }, count: { wrath_money: -15 } }),
            meh: out("你捅出去了，舆论响了三小时。钱的系统比你想象的厚：它甚至不需要回应你，只需要让下一个议题盖过你。", { rep: -0.2, count: { wrath_money: 5 } }),
            fail: out("「没有证据的指控」被他们做成了新弹药：起诉你诽谤的反面报道连投一周。现在你的名字前面多了定语：「输红了眼的那个人」。", Object.assign({ rep: -1.2, fac: { commercial: -12, establishment: -6 } }, { count: { wrath_money: 12 }, fall: 1 })),
            critfail: out("关系图里最粗的那条线，最后查出来通向你自己的 PAC。掀桌掀到了自己头上，金主们付了这笔史上最贵的公关费：「我们也是受害者。」", { rep: -2, flags: ["scandal_3", "investigation_open"], hardEnd: "ruined" })
          }
        }
      ]
    },

    /* ==================================================================
     * 四、政敌（wrath_opposition）
     * ================================================================== */

    /* ------------------------------------------------------------------
     * 4.1 前哨战：仇家名单（wrath_opposition ≥ 25）
     * ------------------------------------------------------------------ */
    {
      id: "reck_oppo_list", era: ERAS, tierRaw: true, tierMin: 1,
      countMin: { wrath_opposition: 25 },
      weight: 12, grade: "mid", valence: "bane", dyn: true, category: "political",
      brief: {
        lede: "你的办公室被「例行检修」第二次了。第一次是在你说了狠话之后。",
        known: [
          "对手的幕僚长放话：「对付某某（你的名字），得用非常规办法。」",
          "你的助理报告：停车时被人拍照，两个晚上，不同角度的同一部车。",
          "一份「重点对象清单」在对手阵营内部流出——你在前五。"
        ],
        rumor: [
          "清单旁边有一栏备注，标题是「可用资源」——写的都是不体面的渠道。",
          "他们请了一个以脏活出名的顾问，头衔印在名片上却只写「咨询」。"
        ],
        unknown: [
          "政治陷害的筹备周期有多长——你想知道，但不想知道得太晚。",
          "这份名单是威胁清单，还是任务清单。"
        ]
      },
      title: "对手正在整理一份「对付你」的名单",
      body: "暗账、跟拍、假旗提案——政敌的情报部门成立了，虽然没人给它发编制。\\n名单的第一页只有一行字：他怎么倒，我们挑哪个。",
      choices: [
        {
          id: "truce", text: "递话：约对手私下摊牌，约定「各打各的选战」",
          note: "泄压阀。政治是轮流坐庄的艺术——今天握手，比今天握手被拍更好。",
          base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "CUN", w: 0.3 }],
          outcomes: {
            crit: out("那顿秘密午饭吃了两小时，出来时两个人都笑着骂记者天真。名单的事没人再提——政治人物最默契的时刻，是双方同时决定不去看对方抽屉里有什么。", { rep: 0.4, fac: { establishment: 4 }, count: { wrath_opposition: -18 } }),
            ok: out("摊牌达成：下届选举，双方「只谈政策」。这种口头停战的有效期约等于下一次危机，但今天算数。", { count: { wrath_opposition: -15 } }),
            meh: out("午饭吃了，话递了，名单上你的名字还在——只是后面的优先级从 A 调到了 B。", { count: { wrath_opposition: -5 } }),
            fail: out("你的「和解邀约」被对手录了音，剪成一支广告：「他先坐不住了。」你想停战，他想战俘。", Object.assign({ rep: -0.7, voters: { warm: -300 } }, { count: { wrath_opposition: 8 } })),
            critfail: out("饭局散场两小时，「密会照片」全网流传，标题是「他们早就是一伙的」。你想停火，结果给两边都点了一把火。", { rep: -1.2, voters: { oppose: 400 }, fac: { base: -6 }, count: { wrath_opposition: 10 } })
          }
        },
        {
          id: "warn", text: "示警：把跟拍照片匿名捅给媒体，点一句「谁在做这种事」",
          note: "把暗战拉回阳光下。成了他们收手；败了坐实「贼喊捉贼」。",
          base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
          outcomes: {
            crit: out("报道发出第二天，那部跟踪车撤了。政治陷害最怕的不是受害者报警——是受害者会发稿。", { rep: 0.5, attr: { CUN: 2 }, count: { wrath_opposition: -10 } }),
            ok: out("你的「料」在报章激起一轮讨论。对手公开否认，暗地收手一个周期。", { count: { wrath_opposition: -6 } }),
            meh: out("稿子发了，没起水花——跟踪这件事，不拍到人脸就等于没发生。", {}),
            fail: out("对手比你先一步「自曝」：他们召开记者会，痛斥「职业受害者」的构陷套路——先发制人是陷害学的第一课。", Object.assign({ rep: -0.8, fac: { press: -4 } }, { count: { wrath_opposition: 8 } })),
            critfail: out("你捅出去的照片被反查出拍摄者是「你的」安保顾问。跟踪你的和跟踪别人的，是一个办公室批的预算。", Object.assign({ rep: -1.4, flags: ["scandal_2"] }, { count: { wrath_opposition: 12 } }))
          }
        },
        {
          id: "preempt", text: "反制：用他们的手法，给他们做一个「可用资源」清单",
          note: "以暗制暗。这条路每走一次，你就越像他们——仇恨 +8 起，不封顶。",
          base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
          cost: { fav: 1 },
          outcomes: {
            crit: out("你送出的「料」让对手内部查了三个月内鬼，自我消耗干净。他们尝过了：名单第一个位置空着——那是留给他们的。", { attr: { CUN: 4 }, count: { wrath_opposition: 8 } }),
            ok: out("互相掐住对方命门的停火，是华盛顿最可靠的停火。名单上你的名字后面多了两个字：「对等」。", { count: { wrath_opposition: 6 } }),
            meh: out("你的清单质量不如对面的专业。他们看了，笑了笑，继续干活。", { count: { wrath_opposition: 8 } }),
            fail: out("行动搞砸了：经手人被当场拿获。你的「反制」成了对手的竞选主题曲：「看看他们做了什么。」", Object.assign({ rep: -1, fac: { press: -6, base: -5 }, flags: ["launder"] }, { count: { wrath_opposition: 14 } })),
            critfail: out("你派去的人带了真家伙。这个细节在法庭上被读出来的时候，旁听席上连你的人都往后坐了半排。", Object.assign({ rep: -1.6, flags: ["scandal_3", "investigation_open"] }, { count: { wrath_opposition: 18 } }))
          }
        }
      ]
    },

    /* ------------------------------------------------------------------
     * 4.2 清算：枪（wrath_opposition ≥ 55）
     * 本包唯一的即时死亡线——三个历史锚点：达拉斯 1963 / 大使酒店 1968 / 华盛顿希尔顿 1981。
     * ------------------------------------------------------------------ */
    {
      id: "reck_oppo_gun", era: ERAS, tierRaw: true, tierMin: 3,
      countMin: { wrath_opposition: 55 },
      weight: 10, grade: "major", valence: "bane", dyn: true, unique: true, category: "crisis",
      brief: {
        lede: "安保简报的第三页写着：「收到针对公众人物的可信威胁」。你的名字在附件里。",
        known: [
          "一场已经公布两周的集会：场地开放、动线公开、名单外泄。",
          "安保主管问你去不去——他把「建议取消」说得很轻，像在替你说。",
          "对手阵营里有人在私下讨论「出事谁来接任」——接手的人选都替你想好了。"
        ],
        rumor: [
          "威胁的源头查到一个名字，就断在一次「信息不足」之后。",
          "有人出钱，有人递话，有人买票——三种人可能互不相识。"
        ],
        unknown: [
          "取消集会只保你一次，去不去决定的是：从此以后，你怕不怕。",
          "枪响之后发生什么，取决于第一枪打中的是谁。"
        ]
      },
      title: "暗杀威胁摆上桌面：那场集会，你还去不去",
      body: "一场不能不去的集会，一条人人都知道的动线，一句「可信威胁」。\\n政治暗杀是这个国家的传统艺能——它只在有人决定试一试的时候才叫意外。",
      choices: [
        {
          id: "rally", text: "照去：场地不动、时间不改、一个字不删",
          note: "生死豪赌。活下来的那种人会赢下接下来十年；没活下来的会被写进教科书注脚。",
          base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.25 }],
          outcomes: {
            crit: out("有人开了枪——打飞的，因为你临时改了动线去握后排的手。你被按下的瞬间人群先制服了枪手。第二天的头条：「他没退。」你活着回来了，还带回了整场选举。", { rep: 2.5, attr: { CHA: 3 }, voters: { diehard: 1200, warm: 1500 }, fun: 2, fac: { base: 15 }, count: { wrath_opposition: -30 }, flags: ["survivor"] }),
            ok: out("集会顺利得近乎无聊——只有散场时安保车里那个「可疑包裹」让所有人多吃了一嘴指甲。威胁被坐实，也被解除：他们知道你要站在光里，而光里有太多枪口够不着的位置。", { rep: 1, voters: { diehard: 500 }, count: { wrath_opposition: -22 } }),
            meh: out("你站着讲完了全场。散场时，安保在你身后的台阶上多垫了一块防滑垫——没人解释为什么，你也学会了不问。", { rep: 0.4, count: { wrath_opposition: -8 } }),
            fail: out("讲台左侧第三排，一个不属于任何邀请函的座位。你的演讲还剩四分钟——它停在了第 58 秒。这个国家又有了一个用枪声标点句子的下午。", { hardEnd: "assassinated" }),
            critfail: out("两声枪响之间你听到了第三声——那是你自己的安保和对方一起开的火，乱得连悼词都没法写体面。历史课本处理你的方式很干脆：脚注一行，照片一张。", { hardEnd: "assassinated" })
          }
        },
        {
          id: "harden", text: "照去，但换动线、加便衣、封侧区——把命买回到及格线",
          note: "花钱续命。枪打不中防御，但你的预算打不中子弹——fail 依然可能见血。",
          base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.3 }],
          cost: { fun: 2 },
          outcomes: {
            crit: out("枪手出现在你新动线的死角，却被死角里的便衣按住——两张节目单在他口袋里揉皱了。事后你只在记者面前提了一句：「那天人很多。」安保公司送你一面锦旗。", { rep: 1.2, attr: { INT: 2 }, count: { wrath_opposition: -20 } }),
            ok: out("三层安检走完，集会顺利。威胁没来，或者来了没挤进来——在你的账本上这两件事一样值钱。", { rep: 0.5, flags: ["detail"], count: { wrath_opposition: -14 } }),
            meh: out("散场时有人隔着警戒线举了一下手，被便衣按了下去。你事后才听说，那天晚上你的车队绕了四圈才进地库。", { rep: 0.2, count: { wrath_opposition: -6 } }),
            fail: out("子弹从侧区没封严的消防廊进来——擦过耳廓，打飞了讲台上的水。你被架出去时听到了两样声音：枪声的余音和自己耳鸣。人活着，耳朵里从此住了那两声枪响。", { rep: 0.6, flags: ["wounded", "scandal_1"], count: { wrath_opposition: 6 } }),
            critfail: out("安保方案花了两千块，执行的时候省了两千步——枪手站在被「封」过却又因为「人流太大」而没人盘查的位置上。你的私人安保最后报销的是救护车发票。", { hardEnd: "assassinated" })
          }
        },
        {
          id: "cancel", text: "取消集会：发声明「不屈服于暴力」，人不出门",
          note: "保底。活下来，但要付「胆小」这两个字——在初选里它能买断你的整个未来。",
          base: 0.9, mods: [],
          outcomes: {
            crit: out("你取消了那场集会，然后换了一种出场方式：一场全网直播的「照常办公」。第二天威胁解除——他们要的是你怕的镜头，你给他们的是你不在乎的镜头。", { rep: 0.6, count: { wrath_opposition: -5 } }),
            ok: out("声明发了，集会取消，安保升级。你活得很稳，只是每次看到「勇气」这个词都会想起这一周。", {}),
            meh: out("你躲过了一个礼拜。对手阵营的民调组在内部备忘录里给你写了一行字：「他是会缩的人。」这一行字会在每一场选战里被反复引用。", { rep: -0.3 }),
            fail: out("取消集会的照片传遍全网：空讲台、你的声明、一行小字「安全第一」。对手在演讲里提到你，用的词是「那个没来的人」。", { rep: -0.8, voters: { warm: -400 }, count: { wrath_opposition: 5 } }),
            critfail: out("你取消了那场，躲过了那颗——但「怕死」的标签贴了一届任期。下次初选夜，对手拿这个标签做投票率模型，误差不超过两个点。", { rep: -1.2, voters: { warm: -600, oppose: 400 }, count: { wrath_opposition: 8 } })
          }
        }
      ]
    },

    /* ==================================================================
     * 五、情报/执法系统（wrath_agency）
     * ================================================================== */

    /* ------------------------------------------------------------------
     * 5.1 前哨战：档案里多了一个你（wrath_agency ≥ 25）
     * ------------------------------------------------------------------ */
    {
      id: "reck_agy_file", era: ERAS, tierRaw: true, tierMin: 1,
      countMin: { wrath_agency: 25 },
      weight: 12, grade: "mid", valence: "bane", dyn: true, category: "govt",
      brief: {
        lede: "你的安全审查被「重新启动」。你上一次通过它，是在这个系统还没怀疑你之前。",
        known: [
          "一位老下属被两个「做背景研究的人」约谈，回来时说不上紧张，但记住了每句话的原文。",
          "你的办公室电话总机被人换过——换设备的工单写着「例行」。",
          "安全审查的表格新增一栏：「境外接触申报」。申报栏大小够写三行。"
        ],
        rumor: [
          "系统内部流传一份「风险人物」清单——你在那上面，评语四个字：「可利用/可摧毁」。",
          "一个从没见过的「线人编号」在替某份报告描述你的行程。"
        ],
        unknown: [
          "档案什么时候开始存在——比里面有什么更要命。",
          "这份档案是为保护你而写的，还是为摧毁你准备的——系统懒得区分这两件事。"
        ]
      },
      title: "有人把你的名字写进了一份内部档案",
      body: "审查重启、电话换机、旧部被约谈——不是查案，是建档。\\n系统的笔比政敌的刀慢，但笔一旦写完，刀就有了坐标。",
      choices: [
        {
          id: "comply", text: "全申报：把审查表填到第三页，主动「配合了解」",
          note: "泄压阀。把档案的更新权抓在自己手里——恨 -18，代价是以后每次露面都有人翻你那张表。",
          base: 0.75, mods: [{ src: "attr", key: "INT", w: 0.25 }],
          outcomes: {
            crit: out("你的申报表填得比审计模板还规范。审查官合上文件夹时说了一句「清楚了」——系统内部对「配合且体面」的人有一种懒政式的敬意。", Object.assign({ attr: { INT: 1 }, fac: { agency: 6 } }, bow("agency", -18))),
            ok: out("申报交上去，电话换回了原型号。系统暂时把你归档为「透明」。", Object.assign({ fac: { agency: 4 } }, bow("agency", -18))),
            meh: out("申报做完了，审查也继续着。你成了那种「每季度被礼貌回访一次」的人。", bow("agency", -6)),
            fail: out("你的申报表里有一句实话写得不太圆——它被用红笔圈了出来，圈注写着：「请说明。」档案从此有了目录。", Object.assign({ rep: -0.3, fac: { agency: -4 } }, { count: { wrath_agency: 6 } })),
            critfail: out("「配合了解」那天，谈话员把两张照片推过桌面：一张是你，另一张时间地点都不该和你同框。你解释了半小时，对面只记了半页。", Object.assign({ flags: ["filed"] }, { count: { wrath_agency: 10 } }))
          }
        },
        {
          id: "ally_in", text: "找系统里的人：托老关系把档案「升个级别」——升到没人懒得看的那种",
          note: "在系统内部找保人：赌的是老面孔比新仇人耐用。",
          base: 0.5, mods: [{ src: "fac", key: "agency", w: 0.4 }],
          cost: { fav: 1 },
          outcomes: {
            crit: out("老关系把你的档案从「风险」改成「观察-长期-低优先」。这三个词的含金量，只有写过档案的人知道。", { fac: { agency: 5 }, count: { wrath_agency: -15 } }),
            ok: out("有人肯在这份档案的流转单上签字——这个动作本身就是护身符。", { count: { wrath_agency: -12 } }),
            meh: out("帮忙的人只肯改措辞，不肯改定性。档案还是那份档案，只是形容词温和了。", { count: { wrath_agency: -4 } }),
            fail: out("帮你递话的人被内部约谈了。你的档案因此追加了一页：「社会关系」。系统写档案从来不只写一个人。", Object.assign({ fac: { agency: -6 } }, { count: { wrath_agency: 10 } })),
            critfail: out("内部开始查「谁在替他说情」。你的名字和三个熟人出现在同一份新档案里——系统给你升级了待遇：从「对象」变成了「网络」。", Object.assign({ flags: ["filed", "investigation_open"] }, { count: { wrath_agency: 14 } }))
          }
        },
        {
          id: "public", text: "掀出去：推动「监督监听与档案滥用」的公开议程",
          note: "把私档变成公题。系统最讨厌被讨论——但讨论它的人，通常也会被它讨论。",
          base: 0.4, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
          outcomes: {
            crit: out("你牵头提的「档案透明法案」意外点燃舆论，系统被迫公开了一批旧例——其中没有你那份。被阳光晒过的档案最不敢见光：你的那页纸从此没人再提。", { rep: 1.2, attr: { INTG: 3 }, fac: { base: 8, agency: -6 }, count: { wrath_agency: -12 } }),
            ok: out("议题立住了。你的档案进了「程序性封存」——系统的礼貌：不动你，也别再来。", { rep: 0.5, count: { wrath_agency: -8 } }),
            meh: out("你的提案被改成「成立研究小组」。小组名单里没有你，档案名单里有。", { count: { wrath_agency: 3 } }),
            fail: out("听证会上你的措辞太具体了——具体到像在念自己那份档案。第二天的审查通知标题多了一行：「涉嫌披露内部信息」。", Object.assign({ rep: -0.7, flags: ["investigation_open"] }, { count: { wrath_agency: 10 } })),
            critfail: out("系统罕见地公开回应了你的指控：用一份盖着「解密」章的节选。那份节选里全是你没说过的话——但字体是真的，公章也是真的。", Object.assign({ rep: -1.4, fac: { press: -6, base: -4 }, flags: ["filed"] }, { count: { wrath_agency: 14 } }))
          }
        }
      ]
    },

    /* ------------------------------------------------------------------
     * 5.2 清算：有人替你写好了罪状（wrath_agency ≥ 55）
     * ------------------------------------------------------------------ */
    {
      id: "reck_agy_frame", era: ERAS, tierRaw: true, tierMin: 2,
      countMin: { wrath_agency: 55 },
      weight: 10, grade: "major", valence: "bane", dyn: true, unique: true, category: "scandal",
      brief: {
        lede: "一份你从没见过的起诉书草稿在走廊里流传——案号是空的，罪名是全的。",
        known: [
          "一位「线人」描述了你参与的三场从没发生过的会面，细节准得可怕。",
          "两名你认识的工作人员被分别带走「协助了解」——分开问，问题一样。",
          "你的行程记录被人整理成对照表：每格「未见异常」，整体「高度吻合」。"
        ],
        rumor: [
          "案卷管理系统里多了一份电子卷宗。创建人栏位写着：「补录」。",
          "有人用「未具名执法人士」向两家媒体透了风——罪名还没定，报道先发了。"
        ],
        unknown: [
          "桩这种案子，证明它不存在需要的不是清白，是权限。",
          "系统的错误可以纠正，系统的决定不行——你现在要分辨自己遇上的是哪一种。"
        ]
      },
      title: "有人把一桩没发生过的案子，钉到了你名下",
      body: "线人有编号，细节有时间戳，卷宗在等一个签名——你的。\\n诬告最高级的形态，是把「莫须有」写成符合全部流程的样子。",
      choices: [
        {
          id: "fight", text: "应讼：请最好的律师，把伪造链一环一环撕开",
          note: "生死赌局。撕开 = 绝地翻盘；撕不开 = 案卷合上，你的名字后面永远跟着「涉案」。",
          base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "INTG", w: 0.25 }],
          cost: { fun: 2 },
          outcomes: {
            crit: out("法庭排的那条「铁证」时间戳，被你的辩方律师用一份公证处的原始日志钉死——伪造链从最粗的那一环断起，一路断到创建人栏位。检方在结案陈词前撤了全部指控。你走出法院时对记者说了一句话，成为当晚全部头条：「系统可以被滥用，但今晚它被检查了。」", { rep: 2.5, attr: { INT: 3, INTG: 2 }, voters: { diehard: 1000, warm: 1200 }, fac: { agency: -8, base: 12 }, count: { wrath_agency: -30 }, flags: ["vindicated"] }),
            ok: out("漏洞太多，卷宗自己绊倒了自己：「证据保全不当」——程序性撤销。你清白了，清白的程度刚好够你以后每次说话都补一句「但我经历过的你们不知道」。", { rep: 0.8, voters: { diehard: 300 }, count: { wrath_agency: -20 } }),
            meh: out("案子拖着，罪名挂着，调查像钝刀。你没事，也没人敢用你——「在查」这三个字比「有罪」更便宜，也更难洗。", { rep: -0.4, flags: ["investigation_open"], count: { wrath_agency: -5 } }),
            fail: out("你的律师很强，但案卷里那套「交叉印证」是拿真权限做的假材料：三场会面里有一场真实发生过，日期对不上，但地点、人和理由全都「可以解释」。解释得通。案子起诉了。", { hardEnd: "framed" }),
            critfail: out("你赢下了每一个技术性质证，输掉了那个从不举证的陪审席。判决朗读时，你听见自己的名字和「认定」连在一起——这个词组以后就是你的全部履历。", { hardEnd: "framed" })
          }
        },
        {
          id: "leakback", text: "反向泄密：把「伪造链」整理成料，喂给信得过的记者",
          note: "用舆论的刀挡档案的刀。成了是掀盖，败了是「干扰执法」。",
          base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
          outcomes: {
            crit: out("报道刊出当天，议会司法委员会宣布「关注」——系统最怕的就是被公开引用。卷宗被封存，你上了杂志封面：「他先开口了。」", { rep: 1.6, attr: { CUN: 3 }, fac: { press: 8, agency: -10 }, count: { wrath_agency: -25 } }),
            ok: out("报道引发了持续一周的追问。案子没撤，但再没人敢给它签字——它被冻在了「待补证」那一格。冻结也是一种翻案。", { rep: 0.6, count: { wrath_agency: -15 } }),
            meh: out("报道发了，热度两天。系统的文档不像报纸，不需要人读——它只需要存在。", { count: { wrath_agency: -3 } }),
            fail: out("你的爆料被定性为「泄密调查方向」——这句话翻译过来是：妨碍执法。新的案卷加了第二本，专门装这件事。", Object.assign({ rep: -0.9, flags: ["leaker_suspect", "investigation_open"] }, { count: { wrath_agency: 12 } })),
            critfail: out("更糟的事发生了：报道里那份「伪造证据清单」被证明有一部分是真的从你办公室流出来的——检方据此给你的案卷追加了一栏：「涉嫌接触案卷」。桩没发生的案子，从此有了真实的部分。", { rep: -1.6, flags: ["scandal_3"], hardEnd: "framed" })
          }
        },
        {
          id: "stand", text: "站着不动：不抗辩、不解释，公开照常履职",
          note: "赌「时间戳会发霉」。系统的耐心比人的记忆长——赌你记得住，别人记不住。",
          base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
          outcomes: {
            crit: out("三个月后，做案的人自己漏了：那位「线人」在另一桩案子里用了同一段证词——同一句假话不能同时卖给两个买家。你的卷宗因「关联造假」被整体撤下。你没说过一句话，系统替你做了无罪声明。", { rep: 1.8, attr: { INTG: 3 }, voters: { diehard: 500 }, count: { wrath_agency: -25 } }),
            ok: out("你照常上班、照常演讲，案卷照常挂着。一年后，再没人记得「那个案子」——除了你。系统的胜利不在于判了你，在于它知道你会先累。", { rep: -0.2, count: { wrath_agency: -8 } }),
            meh: out("案子在，名声也在——只是每次出现新报道，你的名字后面都要加一句「曾被调查」。这行定语，你以后会习惯的。不会。", { rep: -0.5 }),
            fail: out("「沉默 = 默认」的社论出现在两家大报。党内开始有人转发「他为什么不解释」。你的不辩解被录成了口供——最完美的口供。", Object.assign({ rep: -1, fac: { establishment: -6 } }, { count: { wrath_agency: 6 } })),
            critfail: out("你沉默到第 40 天，案卷等到了一个自愿来「补充情况」的证人——你办公室的人。从此沉默有了新的罪名：「串供前科」。", Object.assign({ flags: ["investigation_open"] }, { hardEnd: "framed" }))
          }
        }
      ]
    }
  ]);
})();
