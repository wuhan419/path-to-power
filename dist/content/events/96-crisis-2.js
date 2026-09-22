/* ============================================================================
 * CONTENT · events/96-crisis-2.js
 * 【危机线·二】危机是政治人物的考试：到场比表态重要，时序比立场重要。
 *
 * 这条线的三条规则：
 *   1) 到场的人拿脸熟（voters），表态的人拿剪报。灾民分得清这两种人。
 *   2) 危机里捞钱（vulture）是最快的钱，也是最久的骂名——合同签下去那天，
 *      下一轮事件的种子就种下了：谁拿到合同，账早晚有人查。
 *   3) 修得慢被骂，修得快被查账。市政府的受难日没有完美答案。
 * ==========================================================================*/

const CRI2_ERAS = Object.keys(POTUS.reg.era);

POTUS.define("event", [

  /* ==========================================================================
   * 1) 洪水 —— 到场/资源/拍照的时序学
   * ======================================================================== */
  {
    id: "cri2_flood", era: CRI2_ERAS, tierMin: 1, tierMax: 5, weight: 12,
    grade: "mid", valence: "bane", dyn: true, category: "crisis", unique: true,
    title: "水漫过铁路涵洞的那天",
    body: "河水凌晨三点漫过了铁路涵洞。选区低洼的三个街区泡在水里，教堂的钟楼成了临时的指挥点。\n" +
      "你现在站在干的高地上，面前有三条路——水里、办公室里、镜头前。",
    brief: {
      lede: "洪水把选区分成了两半：泡在水里的一半，和看着的一半。",
      known: [
        "凌晨的紧急广播点名了你的选区：低洼三个街区进水，县政府的人说救援队「最快中午到」——现在才早上六点。",
        "教堂的牧师已经把地下室开放成收容点，他托人给你带话：「你的人在这儿等着看你来不来。」上一次选举，这三个街区的票你是压倒性拿下的。",
        "县里的资源分配要靠人去争：抽水泵、沙袋、国民警卫队的卡车——都在往市里调，谁的声音大谁先拿到。"
      ],
      rumor: [
        "有人说县应急办公室的主任跟你的对手是猎友——排队名单的顺序可以「商量」。",
        "有人说已有外州的承包商的先遣车开进了县界，清理合同还没签，人已经到了。"
      ],
      unknown: [
        "水退之后，谁站在水里、谁站在镜头前，选区记得比任何竞选广告都清楚。",
        "重建的合同单会在两周内签出来——那张单子是下一轮所有故事的起点。"
      ],
      terms: [
        { k: "灾时政治", v: "危机里的三件事有先后：人到、资源到、镜头到。顺序错了，前两件都白做。" },
        { k: "清理合同", v: "灾后政府外包的 debris removal（废墟清理）合同。金额大、程序快、盯的人少——通常盯得少只有一阵子。" }
      ]
    },
    choices: [
      {
        id: "wade_in", text: "天亮前到场：先下水，再谈别的",
        note: "裤腿卷起来比任何声明有用。牧师和教堂的人会把这一天讲十年——前提是你真的帮上忙，而不是帮倒忙。",
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "你在齐膝的水里背出了第七个人的时候，县电视台的镜头刚好开机。画面没拍到你的正脸——拍到的是那家的老太太抓着你的胳膊。三个街区的人都认得这件湿透的外套。", effects: { rep: 2, fac: { base: 14, church: 6, press: 4 }, voters: { diehard: 500, warm: 1200 }, flags: ["flood_responder"] } },
          ok: { body: "你在收容点守了一整天：登记名字、分毛毯、给县里打电话抢抽水泵。没有人拍你，但被你登记过名字的人都记住了你的脸。", effects: { rep: 1.25, fac: { base: 10, church: 4 }, voters: { diehard: 300, warm: 800 }, flags: ["flood_responder"] } },
          meh: { body: "你到了，帮了半天忙，然后发现自己主要的工作是站在路边被受灾户质问保险的事。你不知道答案，但你把问题记下来了。", effects: { rep: 0.6, fac: { base: 5 }, voters: { warm: 400 }, flags: ["flood_responder"] } },
          fail: { body: "你到场的方式错了：车队、助手、半天的摆拍。有人在你身后说了一句「来照相的」，这句话比水退得慢。", effects: { rep: -0.8, fac: { base: -6, press: 3 }, voters: { oppose: 300 } } },
          critfail: { body: "你在现场指挥志愿者时和县应急的人当场吵翻，抽水泵被调去了别的选区。三个街区的积水多泡了两天——这笔账被记在了你头上。", effects: { rep: -1.5, fac: { base: -10, establishment: -5 }, voters: { oppose: 800 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "resources", text: "坐在办公室里抢资源：电话打到水泵进选区为止",
        note: "不见英雄，见抽水泵。这是不爱拍照的人的路——做成了，牧师会替你到场；做不成，你只是电话里一个推诿的声音。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "中午之前，四台抽水泵、两卡车沙袋和一队国民警卫队按你抄送的清单开进了选区。牧师在晚间祈祷里点了你的名字——不当你面点的，那种才作数。", effects: { rep: 1.5, fac: { base: 10, establishment: 8, military: 4 }, voters: { diehard: 400, warm: 1000 }, flags: ["flood_responder"] } },
          ok: { body: "资源要到了一半：水泵到了，沙袋没到。选区的低洼处第二天排干了——中不溜的地方还在滴水。", effects: { rep: 1, fac: { base: 7, establishment: 5 }, voters: { warm: 600 }, flags: ["flood_responder"] } },
          meh: { body: "你打了一上午电话，换来一句「已列入第二批」。你把这句话原样转达给了收容点——诚实，但没人爱听。", effects: { rep: 0.4, fac: { base: 3 }, voters: { warm: 200 } } },
          fail: { body: "资源被别的选区拿走了。你的人在电话里说「大家都很为难」——受灾户对着电视转述这句话的时候，用的语气不一样。", effects: { rep: -1, fac: { base: -8, establishment: -4 }, voters: { oppose: 500 } } },
          critfail: { body: "你为抢资源越过了县里的程序，直接找了州里的人。泵是来了，县应急办主任的敌意也来了——他管着下一份重建合同的初筛。", effects: { rep: 0.6, fac: { base: 5, establishment: -12 }, voters: { warm: 400, oppose: 200 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "camera", text: "带着记者去：让全县看见这三个街区",
        note: "镜头是资源的一种——报道能逼出拨款，也能逼出你的名字。前提是别让人看见你在看镜头。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "press", w: 0.3 }],
        outcomes: {
          crit: { body: "你带着记者坐了救生艇，报道上了晚间新闻的头条：镜头对准的是抱着孩子在二楼窗口等的母亲，你的声音只出现了两句。联邦救灾款的申请第二天就提速了。", effects: { rep: 1.75, fac: { press: 10, base: 8 }, voters: { warm: 900 } } },
          ok: { body: "报道登了，选区的处境全县都看见了。有受灾户说「总算有人替我们说话」，也有人在报纸照片里研究你的靴子是不是新的。", effects: { rep: 1, fac: { press: 7, base: 4 }, voters: { warm: 500 } } },
          meh: { body: "报道登在中间版面，配图选了另一条街。你的名字出现了一次，在倒数第二段。", effects: { rep: 0.4, fac: { press: 4 } } },
          fail: { body: "照片见报：你在橡皮艇上，艇是坐着六个受灾户让出来的。读者来信版的批评比报道本身长。", effects: { rep: -1.25, fac: { press: 2, base: -8 }, voters: { oppose: 600 } } },
          critfail: { body: "记者拍到了你的助手在阻止别家媒体靠近——「独家」两个字在别的台成了当晚的标题。救灾款的事没人再提，提的都是你。", effects: { rep: -2, fac: { press: -10, base: -8 }, voters: { oppose: 1000 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "contract", text: "牵线清理合同：让「懂行的人」进来，你也占一股",
        note: "水还没退，钱已经开始流动了。这是危机里最快的钱——和最久的骂名。合同是谁签的、你拿了多少，账早晚有人翻。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        req: { tier: 2 },
        stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你牵线的承包商两天内到位，清理速度全县第一，价目表只比市价高一成半。你的那份「介绍费」走了三层壳——暂时谁也看不见。暂时。", effects: { fun: 9, rep: 0.6, lev: 1, fac: { commercial: 12, base: 3 }, flags: ["vulture", "rebuild_insider", "shell"] } },
          ok: { body: "合同签了，活干得不算漂亮但也不算糟。你拿了中间人的那一份，数目体面，来路模糊。", effects: { fun: 4.5, fac: { commercial: 8, base: -2 }, flags: ["vulture", "rebuild_insider"] } },
          meh: { body: "承包商到位慢了三天，受灾户在废墟前骂了三天。你的那份钱照拿——数目没少，听的话不少。", effects: { fun: 2.5, rep: -0.6, fac: { commercial: 5, base: -6 }, voters: { oppose: 400 }, flags: ["vulture", "rebuild_insider"] } },
          fail: { body: "合同的事被县里的老承包商搅黄了——他在听证会上只问了一句「介绍人是谁」。你什么都没拿到，只拿到了一个名声的开始。", effects: { rep: -1, fac: { commercial: -8, base: -6, press: -4 }, voters: { oppose: 500 }, flags: ["vulture"] } },
          critfail: { body: "清理合同的单价比邻县高了六成，州审计厅的人把第一个电话打给了你。那笔「介绍费」成了呈堂证词的第一页。", effects: { rep: -2.5, fac: { commercial: -10, base: -12, press: -10 }, voters: { oppose: 1200 }, flags: ["vulture", "scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "donate", text: "捐一周的日程和一个月的薪水给收容点",
        note: "不抢镜头也不抢资源，出钱出力。数目不会上头条，但教堂的账本上会有一行。",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        cost: { fun: 0.2, ap: 1 },
        outcomes: {
          crit: { body: "收容点的热食线多开了一周的班。牧师在月度的聚餐上把你介绍给了整个教区委员会——那是这一带最管用的一张人脉网。", effects: { rep: 1.5, fac: { base: 8, church: 8 }, voters: { warm: 700, diehard: 200 }, contact: { preacher: 8 }, flags: ["flood_responder"] } },
          ok: { body: "钱捐了，班也排了。没人张扬，但收容点的志愿者名单上，你的名字排在第一页。", effects: { rep: 0.8, fac: { base: 5, church: 5 }, voters: { warm: 400 } } },
          meh: { body: "你捐的钱买了毯子和三明治。三天后水退了，多出来的毯子堆在教堂角落——善意的物流总是算不准。", effects: { rep: 0.4, fac: { church: 3 }, voters: { warm: 150 } } },
          fail: { body: "收容点的账目半个月后被人在报纸上问了一嘴：捐款的名单里你的名字旁边写着「（竞选账户转）」。", effects: { rep: -0.8, fac: { press: -4, church: -3 }, flags: ["scandal_1"] } },
          critfail: { body: "你捐的钱经手的采购员被查出吃了回扣。钱不是你贪的，但名单上出资人那一栏写的是你——解释和骂名一样长。", effects: { rep: -1.5, fac: { base: -6, church: -5, press: -6 }, voters: { oppose: 400 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 关厂 —— 锈带政治的开学典礼（含一年后的余波）
   * ======================================================================== */
  {
    id: "cri2_plant_closure", era: CRI2_ERAS, tierMin: 2, tierMax: 5, weight: 11,
    grade: "major", valence: "bane", dyn: true, category: "crisis", unique: true,
    title: "最大雇主的通知只给了一页纸",
    body: "选区最大的厂今早在大门贴了通告：十八个月后关停，两千三百个岗位。\n" +
      "工会的头目中午就把电话打到了你的办公室：「我们现在需要知道，你站在哪一边。」\n" +
      "总部远在千里之外，董事会的会议室里没有一把椅子是你的——但你的选区会看你怎么搬这些椅子。",
    brief: {
      lede: "一页纸通告，两千三百份人生，和你的一个下午。",
      known: [
        "这家厂养了选区两代人：你竞选时签名桌就摆在厂门口，两千三百个岗位背后是几乎一半的选票。现在总部决定把产线迁去人力便宜一半的地方。",
        "工会头目给你打电话时说得很直：他手里有八百个会去初选投票的会员，他现在需要知道你的十八个月打算干什么。",
        "县里能上桌的筹码有限：减税、基建、职业培训的钱——每一样都要向州里和联邦去要，每一样都要有人牵头，牵头的人要背负所有的期望。"
      ],
      rumor: [
        "有人说总部的决定还能谈：他们在等两个州的报价，谁给的多留谁——「拯救」这个词是有标价的。",
        "有人说厂里的地皮早就被评估过了：关厂之后那块滨水地块的价钱，比营业中的厂高。"
      ],
      unknown: [
        "十八个月后厂会关还是留，此刻连董事会自己也在算——你的动作会影响那笔账，但决定不了它。",
        "一年后的失业数据会把今天所有的豪言壮语钉在纸上：你说过的话，数字会逐字对账。"
      ],
      terms: [
        { k: "救厂包", v: "政府给留住企业开的一揽子条件：税收减免、低息贷款、基建配套。政治上叫拯救，账本上叫竞标。" },
        { k: "转岗培训", v: "用联邦和州的钱给失业工人培训新技能。真正的问题从来不是培训什么，而是本地已经没有需要那些技能的岗位。" }
      ]
    },
    choices: [
      {
        id: "save", text: "牵头救厂：把减税、贷款、承诺全押上桌",
        note: "成了你是救星，败了你是那个许了愿的人——两边的队伍都很长。救厂的钱是纳税人的，账也在纳税人手里。",
        base: 0.42, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "labor", w: 0.3 }],
        cost: { ap: 3, fav: 1 },
        outcomes: {
          crit: { body: "你凑出来的方案让总部把关停推迟了四年，附加了保留一千二百个岗位的书面条款。签字那天你站在厂门口，身后的横幅是工会自己做的。", effects: { rep: 1.5, fac: { labor: 18, base: 12, commercial: 6, establishment: 6 }, voters: { diehard: 900, warm: 1500 }, flags: ["plant_defender"] } },
          ok: { body: "厂没救成全部，但保住了仓储和物流那一块——四百个岗位。工会头目对你的评价是：「他真的去谈了。」这句话在那个圈子里值一个初选。", effects: { rep: 0.9, fac: { labor: 12, base: 7 }, voters: { diehard: 500, warm: 900 }, flags: ["plant_defender"] } },
          meh: { body: "方案交上去了，总部的回函用了很多「认真研究」和「表示感谢」。你把这封回函读了两遍——每一遍都读出同一个意思。", effects: { rep: 0.3, fac: { labor: 6, base: 2 }, voters: { warm: 400 } } },
          fail: { body: "州里的配套资金没批下来，救厂方案在委员会里散了架。你在广播里解释了三次「过程」，听众只记住了「没成」。", effects: { rep: -0.6, fac: { labor: 4, base: -8, commercial: -4 }, voters: { oppose: 700 } } },
          critfail: { body: "你许诺的减税在州议会撕破了预算，其他选区的议员公开拿你当反面教材。厂照关，税照减，你的名字成了「打水漂」的代名词。", effects: { rep: -1.25, fac: { labor: -6, base: -12, establishment: -8, commercial: -6 }, voters: { oppose: 1500 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "retrain", text: "认下关厂，把力气全押在转岗和拉新雇主上",
        note: "不救旧厂，救下一个人。这条路没有欢送会，只有一年后的就业率——它是慢药，但可能是唯一真有用的药。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "你把培训中心和社区学院缝在了一起，又亲自带队去了三场招商会。一年后新雇主的仓库动工——规模只有旧厂的四成，但那是这片街区十年来第一根往上起的钢筋。", effects: { rep: 1, fac: { base: 8, establishment: 10, labor: 6, commercial: 6 }, voters: { diehard: 400, warm: 1100 }, flags: ["plant_defender"] } },
          ok: { body: "培训中心开了起来，六百人报了名。有没有用要一年后才知道——但报名的人现在都认得你。", effects: { rep: 0.7, fac: { base: 6, establishment: 6, labor: 4 }, voters: { warm: 700 } } },
          meh: { body: "培训的钱批了，课开了，可本地没有任何一家企业在招受过训的人。毕业典礼上你鼓掌鼓得很用力。", effects: { rep: 0.3, fac: { base: 3, labor: 3 }, voters: { warm: 200 } } },
          fail: { body: "「他去谈新厂了」在酒吧里被翻译成「他不救我们的厂了」。工会的简报里没有你的名字——那本身就是态度。", effects: { rep: -0.4, fac: { labor: -12, base: -5 }, voters: { oppose: 600 } } },
          critfail: { body: "你招来的「新雇主」拿完了迁入补贴，八个月后跑了——连厂房的灯都是欠费停的。你的名字和那块空厂房钉在了一起。", effects: { rep: -1.25, fac: { base: -12, commercial: -10, labor: -8, establishment: -5 }, voters: { oppose: 1400 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "walk", text: "顺其自然：市场的决定不该由政客来翻案",
        note: "把决定还给市场，把安静留给自己。财政鹰派会赞你清醒——厂区的人只会记起你没来过。",
        base: 0.75,
        outcomes: {
          crit: { body: "你发表了一份措辞谨慎的声明，谈了结构转型和经济的长期规律。州报的社论版夸你「诚实」——诚实有时候是最省钱的选项。", effects: { rep: 0.2, fac: { establishment: 8, commercial: 6 }, voters: { oppose: 300 } } },
          ok: { body: "你什么大动作也没做。公告栏的通知褪了色，你的电话也安静了下来——安静得有点过分。", effects: { fac: { establishment: 4, labor: -8 }, voters: { oppose: 500 } } },
          meh: { body: "「他说这不该政客管」——这句话在厂门口的烟摊上传了一遍，又传回来的时候短了半句。", effects: { rep: -0.2, fac: { labor: -10, base: -4 }, voters: { oppose: 700 } } },
          fail: { body: "工会头目把你从初选的推荐名单上划掉了，用的笔比你签名的粗。两千三百个家庭的那一周，没人替他们说话——大家记住了这个。", effects: { rep: -0.7, fac: { labor: -16, base: -8 }, voters: { oppose: 1200 }, contact: { union_boss: -12 } } },
          critfail: { body: "关厂前的最后一晚，厂门口的集会上了全国新闻。镜头扫过一条手写横幅：「我们的议员在哪」。你没有出席的理由清单，比你长。", effects: { rep: -1.25, fac: { labor: -18, base: -12, press: -6 }, voters: { oppose: 1800 }, flags: ["scandal_1"], fall: 1 } }
        }
      }
    ]
  },

  {
    id: "cri2_plant_after", era: CRI2_ERAS, tierMin: 2, tierMax: 5, weight: 10,
    grade: "major", valence: "bane", dyn: true, category: "crisis", unique: true,
    after: { id: "cri2_plant_closure", minMonthsAfter: 12, maxMonthsAfter: 30 },
    title: "工厂关厂一年后，选区失业率翻了一倍上头版",
    body: "州劳工厅的季度数据出来了，本地报纸把它做成了头版：选区失业率百分之十一，比关厂前翻了一倍。\n" +
      "数字旁边配着你在那十八个月里说过的话——一句一句，像对账单。",
    brief: {
      lede: "数字不讲情面，也不讲过程。它只讲结果。",
      known: [
        "关厂距今一年多。失业率的曲线、领救济的队伍、和县里最新的法拍名单，全都可以查——你的对手已经查了。",
        "当年你在厂门口、在听证会上、在广播里说过的每一句话都有存档。竞选季的剪辑师正在机房里加班。",
        "还有两千多个家庭的信箱。他们中的一些人还在培训中心的等待名单上——另一些人已经搬走了。"
      ],
      rumor: [
        "有人说对手的下一条广告已经剪好了：你的承诺原声，配失业率的红线。",
        "有人说新雇主的二期工程真的在谈——但要在选举日之后才会官宣。"
      ],
      unknown: [
        "经济数据的变化比政治的记性慢——你种下的东西有没有发芽，要到下一份季度报告才见分晓。",
        "这一版头版怎么回应，决定你在下一场辩论里是被告还是证人。"
      ],
      terms: [
        { k: "季度失业率", v: "州劳工厅按季度公布的数字。它不区分「正在培训」和「彻底放弃」——政治的账本比它细，也比它狠。" }
      ]
    },
    choices: [
      {
        id: "own_it", text: "正面认账：把数字和自己的努力一起摊开",
        note: "不躲。承认失业率，也列出培训、招商、等待名单的每一笔——赌的是选区分得清「没做」和「没做成」。",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "attr", key: "CHA", w: 0.2 }],
        flags: ["plant_defender"],
        outcomes: {
          crit: { body: "你在镇民大会上把州数据、培训名单和招商进度全投在幕布上，讲满四十分钟。散场时有几个老工人过来跟你握手——人数不多，但他们每个人都带着家属。", effects: { rep: 1.25, fac: { base: 10, labor: 12, press: 6 }, voters: { diehard: 800, warm: 600 } } },
          ok: { body: "你认了账，也讲了过程。报纸的标题不好听但不算难看：「数字难看，账目清楚」。", effects: { rep: 0.7, fac: { base: 6, labor: 6, press: 3 }, voters: { diehard: 300, warm: 400 } } },
          meh: { body: "你的「过程说明」被对手剪成了三十秒的「借口集锦」。你澄清了两遍，第三遍的时候你自己都听出疲惫了。", effects: { rep: 0.2, fac: { base: 2, press: -3 } } },
          fail: { body: "认账会被当成认输——至少对手的广告是这么剪的。选区的怨气需要一个名字，你的名字最顺手。", effects: { rep: -0.8, fac: { base: -8, labor: -6 }, voters: { oppose: 1000 } } },
          critfail: { body: "你摊开的账目里有一笔培训经费的流向被记者当场问住——你答不上来的那三秒钟，第二天被循环播放。", effects: { rep: -1.5, fac: { base: -10, press: -10, labor: -6 }, voters: { oppose: 1500 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "pivot", text: "把矛头引向总部和州政府：该负责的人不在本选区",
        note: "愤怒是现成的，缺的是方向。给它一个方向——但箭一旦离弦，落点就由不得你了。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你在废弃厂门前开的记者会成了导火索：一周之内，「追究搬迁企业责任」的议案进了州议院的议程，你被请去做证。愤怒有了新去处——那个去处对你有利。", effects: { rep: 1, fac: { labor: 14, base: 8, commercial: -8 }, voters: { diehard: 600, warm: 800 } } },
          ok: { body: "「是总部的账、是州里的失职」——这个说法在酒吧里传开了。失业率还在，但骂你的声音小了。", effects: { rep: 0.6, fac: { labor: 8, base: 4, establishment: -4 }, voters: { warm: 600 } } },
          meh: { body: "话放出去了，总部没有回应——跨国公司的公关部门对付过比这更大的场面。你的箭钉在了空气球上。", effects: { rep: 0.2, fac: { labor: 4 } } },
          fail: { body: "对手反击了：你牵头的那份「救厂包」报价单被公开——「他两年前也想用纳税人的钱讨好同一家总部」。风向掉头了。", effects: { rep: -0.7, fac: { labor: -4, base: -8, commercial: -6 }, voters: { oppose: 900 } } },
          critfail: { body: "你指名的总部高管回了公开信，逐条列出你当年求他们留下时写的话——包括那句「选区永远记得朋友」。信被全文转载。", effects: { rep: -1.25, fac: { base: -12, labor: -8, press: -8, commercial: -8 }, voters: { oppose: 1600 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "quiet", text: "少说话，多跑腿：把每一天排进救济署和招聘会",
        note: "不上头版，上等待名单。一个个家庭的忙帮下去——慢，但每一份都记在人的身上而不是纸上。",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "四个月，你跑了三十一场招聘会，帮两百多人对上了岗位——不是全部，但每一个都是具体的名字。到初选那天，这些名字出现在了投票站。", effects: { rep: 1, fac: { base: 12, labor: 10 }, voters: { diehard: 900, warm: 700 } } },
          ok: { body: "你成了救济署和招聘会之间的常客。帮上忙的和不帮上的都在传：「他至少一直在」。", effects: { rep: 0.6, fac: { base: 8, labor: 6 }, voters: { diehard: 400, warm: 500 } } },
          meh: { body: "跑了很多腿，帮上忙的比想象中少——结构性的问题不听日程表的。但你欠下的那些人情是双向的。", effects: { rep: 0.2, fac: { base: 4, labor: 3 }, voters: { warm: 300 } } },
          fail: { body: "对手的头版广告不提你跑过的腿，只放失业率的红线——数字的音量比脚步大。", effects: { rep: -0.4, fac: { base: 2, labor: 2 }, voters: { oppose: 500 } } },
          critfail: { body: "一个你亲自推荐进仓库的工人在第三次倒班后出了工伤。他的家人没有怪你——但报纸替他们问了那个问题。", effects: { rep: -0.9, fac: { base: -8, labor: -6, press: -6 }, voters: { oppose: 900 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 流行病 —— 走廊改成隔离区的那个星期
   * ======================================================================== */
  {
    id: "cri2_epidemic", era: CRI2_ERAS, tierMin: 0, tierMax: 5, weight: 10,
    grade: "major", valence: "bane", dyn: true, category: "crisis", unique: true,
    title: "县医院的走廊改成了隔离区",
    body: "疫情是从隔壁县传过来的，现在是你的事了。医院把走廊改成了隔离区，学校停课的通告印了一半。\n" +
      "诊所在门口贴了排队规则，药房的货架下午就空了。所有人都在等一个人出来说话——大家习惯性地看向办公室里的人，哪怕是最低的那间办公室。",
    brief: {
      lede: "病看不见，恐惧看得见——恐惧的传播速度从来比病快。",
      known: [
        "县医院的医生是你的旧识：他把电话直接打给了你，因为「官方渠道还要走三天程序，病情不打算等」。他要的是隔离的配合、物资的渠道、和一个肯出面说话的人。",
        "选区的药房已经开始限购，教堂取消 了礼拜，学校董事会今晚紧急开会。信息越少，传闻越多——传闻正在替你管理这座城市。",
        "这个年代的疫情各不相同：更早的年代是脊髓灰质炎让整个夏天关闭游泳池；后来是流感大流行排队打疫苗；再后来是一种没人叫得出名字的新病毒。但政治的部分一模一样：恐慌要人管，秩序要人立，锅要人背。"
      ],
      rumor: [
        "有人说疫情被夸大了——「就是重感冒」，说这话的人自己囤了两柜子的药。",
        "有人说县里储备的物资被调去了有钱的那几个县，单子在某人的抽屉里。"
      ],
      unknown: [
        "疫情会持续多久、会死多少人，此刻连医生也只能给你一个区间——但你说的每一个数字都会被记住。",
        "恐慌结束之后，大家会忘记病毒，但不会忘记谁在货架空的那一周说了什么。"
      ],
      terms: [
        { k: "隔离", v: "切断传播最古老的办法：把人和人分开。医学上有效，政治上昂贵——被分开的人会愤怒。" },
        { k: "方剂政治", v: "疫苗和药物问世后的分配顺序。谁先打、谁后打，一张顺序表能气坏一整座城。" }
      ]
    },
    choices: [
      {
        id: "front", text: "站到最前面：每天开发布会，把知道和不知道都说出来",
        note: "恐慌最怕真空。你顶上去——赌的是诚实能换信任；赌输的话，你说错的那一句会跟着你一辈子。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "你的每日简报成了全县的定盘星：数字、措施、和一句固定的「我们不知道的还有这些」。疫情结束后，医生在纪念活动的讲台上说：「那几周，他替我们挡住了恐慌。」", effects: { rep: 1.5, fac: { base: 12, press: 8, church: 4 }, contact: { doctor: 12 }, voters: { diehard: 600, warm: 1000 } } },
          ok: { body: "简报开了六周，说的是实话。人们习惯了下午四点在收音机里听你的声音——习惯，是信任的另一个名字。", effects: { rep: 0.9, fac: { base: 9, press: 5 }, contact: { doctor: 6 }, voters: { diehard: 300, warm: 700 } } },
          meh: { body: "简报的效果一般：该信的人本来就信，不信的人说你念稿子。但你确实每天四点都在。", effects: { rep: 0.4, fac: { base: 5, press: 3 }, voters: { warm: 400 } } },
          fail: { body: "你在简报里转述的一组数字被证明是错的——错在来源，不在你，但简报是你的脸。后来你去掉了所有数字，只剩下「请大家保持冷静」。", effects: { rep: -0.6, fac: { base: -6, press: -4 }, voters: { oppose: 500 } } },
          critfail: { body: "你在第二周的简报里说「高峰已过」。第三周死了的人比前两周加起来还多。那四个字被刻在了下一场竞选的每一块广告牌上。", effects: { rep: -1.5, fac: { base: -12, press: -10 }, voters: { oppose: 1600 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "logistics", text: "扎进物资链：药房、教会、货运，一条一条打通",
        note: "不上台，上台下的活：限购的规则、教会的配送网、药房的补给线。这些事没人鼓掌——直到缺的那盒药出现在该出现的人家里。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "你把三家教会的配送网、县药房协会和一家货运公司缝成了一张网：独居的老人第二天就在门口收到了药和汤。这张网在疫情结束后还在运转——教区的人管它叫你的名字。", effects: { rep: 1.25, fac: { base: 10, church: 10, commercial: 4 }, contact: { preacher: 10, doctor: 6 }, voters: { diehard: 500, warm: 900 } } },
          ok: { body: "配送网搭起来了，覆盖了三个街区里的两个。收到药的家庭不知道那是谁协调的——教会的志愿者知道，他们也会说。", effects: { rep: 0.7, fac: { base: 7, church: 7 }, contact: { preacher: 6 }, voters: { warm: 600 } } },
          meh: { body: "网搭了，物资不够：排队名单比药多。你做了最难做的事——决定谁先谁后，然后签下自己的名字。", effects: { rep: 0.3, fac: { base: 4, church: 4 }, hp: -0.4, voters: { warm: 300 } } },
          fail: { body: "补给线被州里的统一调配打乱了——你搭的网被迫并入官方渠道，功劳归了文件，混乱归了你。", effects: { rep: -0.3, fac: { base: -4, church: -3, establishment: -4 }, voters: { oppose: 300 } } },
          critfail: { body: "你协调的一批药被查出流向了出价高的私人诊所——经手的人贪的，名单上的协调人是你。你对天发誓不知情，可「不知情」在疫情里不算辩护词。", effects: { rep: -1.25, fac: { base: -10, church: -8, press: -8 }, voters: { oppose: 1200 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "business", text: "替商户和停课的家庭奔走：补贴、缓租、留职",
        note: "病是一时的，账单是按月的。你押的是另一条命脉：撑过疫情的生意和付得起房租的家庭。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "commercial", w: 0.25 }],
        outcomes: {
          crit: { body: "你从县预算的缝里挤出了紧急小额补贴，又劝住了两个最大的房东「缓租不停约」。主街的店铺在疫情后亮着的比例，是全县最高的。店主们记得是谁在账单上画了线。", effects: { rep: 1, fac: { base: 8, commercial: 12 }, fun: 0.3, voters: { warm: 800 } } },
          ok: { body: "补贴的申请通道开了，规则是你连夜帮着改简单的。能救多少店不好说，但排队的人至少有队可排。", effects: { rep: 0.6, fac: { base: 5, commercial: 8 }, voters: { warm: 400 } } },
          meh: { body: "补贴的钱太少、程序太慢，商户的感谢和抱怨各占一半。你学会了在预算表上读人情冷暖。", effects: { rep: 0.2, fac: { commercial: 4, base: 1 } } },
          fail: { body: "补贴方案在县议会被砍掉了大半，你预先宣布过的数额成了空头数字。店主们拿着你印的宣传单来问你差额在哪。", effects: { rep: -0.7, fac: { commercial: -8, base: -6 }, voters: { oppose: 600 } } },
          critfail: { body: "补贴的发放名单被曝出有两家店跟你或你的捐助人有关——虽然流程合法，但「合法」这个词在疫情里和「不知情」一样没用。", effects: { rep: -1, fac: { commercial: -6, base: -10, press: -8 }, voters: { oppose: 1100 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "wait", text: "听卫生部门的，不多说一句",
        note: "专业的事交给专业的人。安全——除非官方的程序太慢、太多话的对手先填了安静。",
        base: 0.78,
        outcomes: {
          crit: { body: "你严格按县卫生部门的话转达，一个字不多加。疫情过去了，没人记得你做过什么——也没人记得你做错过什么。在瘟疫年里，这已经算成绩。", effects: { rep: 0.3, fac: { establishment: 6, agency: 4 } } },
          ok: { body: "你按程序办事，程序也算尽了责。平静的一页。", effects: { fac: { establishment: 4 } } },
          meh: { body: "程序的公告总是慢半拍——那半拍的空白被传闻填了。你转达的每一句官方声明，都在替传闻辟谣的路上迟到。", effects: { rep: -0.1, fac: { establishment: 2, base: -3 } } },
          fail: { body: "你的对手没有等程序。他站在教堂门口分发自己印的防疫指南——指南是对是错不重要，重要的是他的名字在上面。", effects: { rep: -0.4, fac: { base: -6, church: -3 }, voters: { oppose: 400 } } },
          critfail: { body: "「疫情期间他消失了六周」——这句话不是攻击，是居民的回忆，被对手原样印在了传单上。回忆比指控难反驳。", effects: { rep: -1, fac: { base: -10, establishment: -4 }, voters: { oppose: 1000 } } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 大停电 —— 市政府的受难日
   * ======================================================================== */
  {
    id: "cri2_grid_failure", era: CRI2_ERAS, tierMin: 2, tierMax: 5, weight: 11,
    grade: "mid", valence: "bane", dyn: true, category: "crisis", unique: true,
    title: "全城黑了四分钟之后",
    body: "晚高峰，全城黑了。红绿灯死了，电梯停了，水厂的备用泵没有自动切换——\n" +
      "公用事业公司的电话占线，应急管理办公室在等你表态：什么时候修好？钱从哪来？谁的责任？\n" +
      "这三个问题，答错任何一个都是政治车祸——而它们要的是同一个晚上的答案。",
    brief: {
      lede: "修得慢被骂，修得快被查账。这就是市政府的受难日。",
      known: [
        "停电波及全城，医院靠发电机撑着，两个水泵站的备用电源没有启动——你上周刚签批过它们的检修预算，签批单在文件柜里，也在记者的申请清单上。",
        "公用事业公司说全修好要五天和一笔紧急拨款；合同上有 「紧急加价条款」，费率是平时的一点八倍。批，是钱的问题；不批，是五天黑暗的问题。",
        "市政厅外已经聚了人。有人举着蜡烛，有人举着手机，手机拍的是黑掉的市政厅——包括你办公室那扇亮着的窗（应急线路供电）。"
      ],
      rumor: [
        "有人说检修预算去年就被挪去修市中心的路了——挪用的批文上有你的会签。",
        "有人说公用事业公司早就递交过风险报告，被两届政府连续无视——抽屉里有原件。"
      ],
      unknown: [
        "五天还是三天修好，没人真的知道——但你今晚说出的数字，明天早上就是标准答案。",
        "紧急合同的账单会在六个月后送到审计席上。今晚的每一次「快」，都是那天的一行问题。"
      ],
      terms: [
        { k: "紧急加价条款", v: "抢修合同里的费率上浮条款。应急时省时间，审计时费解释——它合法，这正是它麻烦的地方。" },
        { k: "备用电源", v: "关键设施（水厂、医院、信号塔）的第二路电。它平时唯一的用处是等待——等待被削减的预算。" }
      ]
    },
    choices: [
      {
        id: "fast", text: "五天太久：签紧急条款，四十八小时必须通",
        note: "先亮灯，再算账。城市会谢你——审计席六个月后见，加价合同一张都赖不掉。",
        base: 0.65, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "base", w: 0.2 }],
        cost: { fun: 5.5, ap: 2, fav: 1 },
        outcomes: {
          crit: { body: "四十小时后全城复电，比承诺提前了八个小时。你站在亮起来的市政厅台阶上讲话，没人提钱的事——暂时没人提。", effects: { rep: 2.5, fac: { base: 12, establishment: 6 }, voters: { diehard: 500, warm: 1100 }, flags: ["grid_fast"] } },
          ok: { body: "第五十六小时复电。你承诺的「四十八」差了八个小时，没人计较——黑暗里的人对时间的误差很宽容。", effects: { rep: 1.5, fac: { base: 8 }, voters: { warm: 700 }, flags: ["grid_fast"] } },
          meh: { body: "第三天复电——主要街区亮了，边缘街区又等了一天半。你的「四十八小时」变成了对手备忘录里的一条。", effects: { rep: 0.4, fac: { base: 3 }, voters: { warm: 300, oppose: 200 }, flags: ["grid_fast"] } },
          fail: { body: "加价合同签了、钱花了，边缘街区还是黑到了第五天。账单和黑暗一样长——两样都记在你名下。", effects: { rep: -1.25, fac: { base: -8, commercial: -4 }, voters: { oppose: 800 }, flags: ["grid_fast", "scandal_1"] } },
          critfail: { body: "复电当周，加价合同的细则上了头版：其中一家中标公司的大股东是你大学的室友。你可能真的不知道——但灯亮了，眼睛都看得见报纸。", effects: { rep: -2.5, fac: { base: -12, press: -10, commercial: -6 }, voters: { oppose: 1400 }, flags: ["grid_fast", "scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "by_book", text: "走正常招标：程序一步不缺，修好为止",
        note: "每一分钱都干净。代价是黑暗里的每一天——程序正义的账单，是用电器的夜晚支付的。",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "招标走完了程序，工期的拖延比你担心得少——第九天全城复电。审计席上你的账目是全市最干净的一份，干净本身在选举季值钱。", effects: { rep: 1.5, attr: { INTG: 2 }, fac: { establishment: 8, agency: 6, press: 5, base: -3 }, voters: { warm: 300, oppose: 200 } } },
          ok: { body: "程序走完了，第十一天复电。省下的钱是真的，多黑的两天也是真的——两笔账各记各的。", effects: { rep: 0.6, attr: { INTG: 1 }, fac: { establishment: 6, agency: 4, base: -5 }, voters: { oppose: 400 } } },
          meh: { body: "招标的公示期吃掉了四天。市政厅门口的蜡烛从抗议变成了守夜——守夜的名单上没有你的朋友。", effects: { rep: -0.2, fac: { establishment: 4, base: -6 }, voters: { oppose: 600 } } },
          fail: { body: "第十一天的头版是两张对比图：黑着的居民楼，和按程序公示着的招标文件。程序没有错——错的看起来是你。", effects: { rep: -1.5, fac: { base: -10, press: -4, establishment: 2 }, voters: { oppose: 900 } } },
          critfail: { body: "停电的第二周，一家没有备用电源的护理院出了事。家属的律师在诉状里写：「他有权限走紧急程序，他选择了流程。」这句话你没法反驳。", effects: { rep: -2.75, fac: { base: -14, press: -10, establishment: -6 }, voters: { oppose: 1600 }, flags: ["scandal_2"], fall: 1 } }
        }
      },
      {
        id: "blame", text: "把公用事业公司架上台：听证、追责、退钱",
        note: "愤怒需要一个去处，公司是最合理的那个。听证会的镜头全归你——只要没人翻你签过的检修预算。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "你主持的听证会让公司 CEO 在镜头前公开承诺：电费冻结一年、抢修不加价。愤怒有了去处，去处是你选的。报纸说这个委员会「久违地硬气了一回」。", effects: { rep: 2.25, fac: { base: 10, press: 10, commercial: -10 }, voters: { diehard: 500, warm: 800 } } },
          ok: { body: "听证会开了，承诺拿了半张：抢修费率封顶，电费冻结没谈下来。半张也够贴在竞选海报上。", effects: { rep: 1.25, fac: { base: 7, press: 6, commercial: -6 }, voters: { warm: 500 } } },
          meh: { body: "听证会进行了六个小时，公司的律师答了两百次「会后书面回复」。你挥了拳头，打在了流程上。", effects: { rep: 0.6, fac: { base: 4, press: 3, commercial: -3 } } },
          fail: { body: "公司的公关翻出了检修预算的削减记录——会签栏里有你的名字。原告席和被告席在一个下午换了人。", effects: { rep: -1.5, fac: { base: -8, press: -6, commercial: -4 }, voters: { oppose: 800 }, flags: ["scandal_2"] } },
          critfail: { body: "你在听证会上引用的一组「内部数据」被证明是误读——公司股票应声下跌，董事会的律师函第二天到了市政厅。追责变成了诽谤。", effects: { rep: -2.5, fac: { base: -10, press: -8, commercial: -10 }, voters: { oppose: 1200 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "streets", text: "先上街：挨个街区安排水站、充电点和巡逻",
        note: "修电是工程师的事，等电的人是你的事。黑暗里的五个晚上怎么过——这是市政能直接给的答案。",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.25 }, { src: "attr", key: "INT", w: 0.25 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "四十八小时里，二十七个应急水站和充电点在全城亮起来——用的是学校的发电机和教会的厨房。停电的夜里唯一亮着的名单，是市政厅出的。选民记住了那种亮。", effects: { rep: 2, fac: { base: 12, church: 6, labor: 4 }, voters: { diehard: 600, warm: 900 } } },
          ok: { body: "水站和充电点覆盖了主要的社区，独居老人的排查名单也过了一遍。灯没修好之前，人没有被忘记。", effects: { rep: 1.25, fac: { base: 8, church: 4 }, voters: { warm: 600 } } },
          meh: { body: "应急点开了一半，另一半卡在了发电机的租借上。你安慰自己：做了一半总比没做强——这句安慰不太管用。", effects: { rep: 0.6, fac: { base: 4 }, voters: { warm: 300 } } },
          fail: { body: "应急点的物资在第二天夜里被抢了两处。你在晨间广播里呼吁冷静，呼吁的时候你听见了敲门声——比喻意义上的那种。", effects: { rep: -0.8, fac: { base: -6, press: -3 }, voters: { oppose: 500 } } },
          critfail: { body: "你在应急点安排的临时巡逻队出了事：一名队员和居民冲突动了手。你想解决的问题没有发生，你制造的问题上了新闻。", effects: { rep: -1.75, fac: { base: -10, press: -8, agency: -4 }, voters: { oppose: 1000 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 5) 银行挤兑 —— 储蓄者恐慌里的领导角色（本包核心）
   * ======================================================================== */
  {
    id: "cri2_bank_run", era: ["1974_WATERGATE", "2008_CRASH"], tierMin: 1, tierMax: 5, weight: 13,
    grade: "major", valence: "bane", dyn: true, category: "crisis", unique: true,
    title: "银行门口的队伍在星期五凌晨排起来了",
    body: "先是经济版的传闻，然后是停车场里的口耳相传。星期五早上七点，选区那家银行门口排了两百人。\n" +
      "柜台后面的现金撑不过中午。恐慌这个东西，从不需要证据——它只需要一个开头，和一个没人出面的上午。",
    brief: {
      lede: "银行的死法不是破产，是谣言跑得比准备金快。",
      known: [
        "这家银行持有选区一半家庭的存款：工资户、教会的账、几家小店的周转金。挤兑的由头是一篇传闻——资产有没有问题是另一回事，队伍已经排起来了。",
        "银行经理天不亮就把电话打到你办公室：他不需要你救银行，他需要「一个大家信的人」站到大厅里说一句「我在这里存着钱」。你在这家银行有账户——这件事选区都知道。",
        "监管的救援通道存在但很慢：批文要走数道程序，而队伍每个小时都在变长。周一是发薪日——存不住钱的话，恐慌会跟着工资单再翻一倍。"
      ],
      rumor: [
        "有人说银行的投资部把存款押在了某类正在贬值的资产上——传闻的版本一天翻了三种。",
        "有人在队伍里认出了银行经理的太太——她昨天上午取了一笔钱。这条传闻最伤人，也最查不清。"
      ],
      unknown: [
        "银行的账本是好是坏，此刻连经理自己也在等上头的数字——但恐慌不会等任何数字。",
        "你在星期五下午说的每一句话，要么止住队伍，要么成为这家银行墓碑上的一行字。也可能两样同时成立。"
      ],
      terms: [
        { k: "挤兑", v: "所有储户同时要钱。银行的钱天生是借出去的——恐慌本身就足以杀死一家健康的银行。" },
        { k: "存款保险", v: "法定额度内存款由保险兜底。它治得了损失，治不了恐慌——排队的人不是不懂，是不敢懂。" },
        { k: "贴现窗口", v: "央行给银行应急输血的通道。远水——队伍是近火。" }
      ]
    },
    choices: [
      {
        id: "public_deposit", text: "站到柜台前，当众存一笔钱进去",
        note: "行动比声明响：把「我相信」变成一笔有日期、有回单的交易。你的钱和大家的钱从此同舟共济——这既是说服力，也是真的风险。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { fun: 0.8, ap: 1 },
        outcomes: {
          crit: { body: "你在大厅里把十万块的存款回单举给记者看，然后坐下来和排队的老人一个一个聊。中午前队伍散了一半。经济史的书页里，止住挤兑的从来是这种画面。", effects: { rep: 1.75, fac: { base: 14, commercial: 10, press: 8 }, voters: { diehard: 800, warm: 1200 }, flags: ["bank_calmer"] } },
          ok: { body: "你存了钱，也在门口讲了十分钟。队伍慢了下来——没有散，但不再长了。周一发薪日，这家银行还开着门。", effects: { rep: 1, fac: { base: 10, commercial: 8 }, voters: { diehard: 400, warm: 800 }, flags: ["bank_calmer"] } },
          meh: { body: "你存的钱上了本地新闻，也上了酒吧的笑话：「政客存钱，明天就能取」。队伍散得慢，散是散了。", effects: { rep: 0.4, fac: { base: 5, commercial: 4 }, voters: { warm: 500 }, flags: ["bank_calmer"] } },
          fail: { body: "你存钱的样子被解读成「做秀」——对手放出了你上个月在另一家银行开户的记录（那是为了竞选账户的合规，但没人爱听脚注）。队伍继续长。", effects: { rep: -0.6, fac: { base: -6, press: -4 }, voters: { oppose: 500 } } },
          critfail: { body: "你存进去的第二天，银行的坏账被坐实，监管接了盘。你的十万块成了泡沫，你本人成了「替烂银行背书的政客」——钱和名声一起沉了。", effects: { fun: -2, rep: -1.5, fac: { base: -12, commercial: -10, press: -8 }, voters: { oppose: 1500 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "organize", text: "组织排队的人：登记、解释保险、分批疏导",
        note: "不做英雄做管家：把恐慌的队伍变成有秩序的队伍。枯燥、琐碎——以及所有危机政治里最被低估的一招。",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "attr", key: "CHA", w: 0.2 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "你带着志愿者把队伍分成了「急用现金」和「只是害怕」两队，后者被一杯咖啡和一张存款保险的说明留在了大厅里。柜台的现金撑到了收市——周一，监管的批文到了。两个词开始跟着你：「那个人懂秩序」。", effects: { rep: 1.25, fac: { base: 12, commercial: 8, establishment: 6 }, voters: { diehard: 700, warm: 1000 }, flags: ["bank_calmer"] } },
          ok: { body: "疏导起了作用：取钱的秩序保住了，银行撑过了周五。没人在第一周的报纸上写你——写你的版面在两年后。", effects: { rep: 0.8, fac: { base: 8, commercial: 6 }, voters: { warm: 700 }, flags: ["bank_calmer"] } },
          meh: { body: "登记的桌子支起来了，解释的话说了一下午。队伍还在，只是从愤怒的队伍变成了疲惫的队伍——也算一种降温。", effects: { rep: 0.4, fac: { base: 5 }, voters: { warm: 400 } } },
          fail: { body: "你分流的方案被当成「替银行拖延」，队伍里有人喊「让他排到后面去」。你组织了一下午，收获了一个响亮的下午。", effects: { rep: -0.4, fac: { base: -6, commercial: 3 }, voters: { oppose: 500 } } },
          critfail: { body: "你在门口承诺「保险一定赔、钱一定在」——三天后赔付的限额比你说的小了一半。几十户人家的损失不明不白地记了一笔在你头上，那本账没有利息上限。", effects: { rep: -1.25, fac: { base: -14, press: -8, commercial: -6 }, voters: { oppose: 1500 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "call_favor", text: "走内线：连夜把监管和银行的总行摁在一张桌上",
        note: "前台要信心，后台要钱。你熬一个通宵去搬真正的救兵——成了是奇迹，败了你会同时被储户和体制两头责怪。",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "周六凌晨，总行的流动性支持函和监管的联合声明同时发出。周一早上银行照常开门，门口只有送报纸的。选区不知道你熬了那个通宵——总行的人知道，那种人脉的利息很高。", effects: { rep: 1.5, fac: { base: 10, commercial: 14, establishment: 12 }, contact: { lobbyist: 8 }, voters: { diehard: 500, warm: 900 }, flags: ["bank_calmer"] } },
          ok: { body: "内线起了作用：批文走完了，钱在周一到了。慢了一个周末，但到了。你在报纸上的角色是「协调者」——准确的词，不算响亮。", effects: { rep: 0.8, fac: { base: 6, commercial: 10, establishment: 8 }, voters: { warm: 700 }, flags: ["bank_calmer"] } },
          meh: { body: "桌是摁成了，函也发了——但措辞软得像没说。队伍短了三分之一，恐慌的火苗还在灰烬里。", effects: { rep: 0.3, fac: { commercial: 6, establishment: 4 }, voters: { warm: 300 } } },
          fail: { body: "监管的人礼貌地听完了你的电话，然后按程序办。程序走到了下周。你在银行门口被人问「你说的问题解决了呢」——你没有办法回答。", effects: { rep: -0.7, fac: { base: -8, establishment: -4, commercial: -4 }, voters: { oppose: 800 } } },
          critfail: { body: "你在电话里说的那句「这家银行撑得住」被泄了出去，见报时配的是两周后的接管公告。内线没走通，话先走到了——「安抚储户还是误导储户」成了听证会的题目。", effects: { rep: -1.5, fac: { base: -12, commercial: -12, press: -10, establishment: -8 }, voters: { oppose: 1400 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "vulture_buy", text: "趁乱吃进：低价接手恐慌卖家的资产和债务",
        note: "别人的恐慌是你的折价。这是秃鹫的进餐时间——钱最快，骂名最久，而且每一笔交易都有回单。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        req: { fun: 2.5 },
        stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "恐慌折价三成，你吃进了沿街六个铺面和银行的一层债权。十八个月后价格翻倍——交易结构干净合法，只是每一层干净都洗不掉「那天」这个日期。", effects: { funMul: 1.2, lev: 1, attr: { CUN: 2 }, fac: { commercial: 12, base: -8 }, flags: ["vulture", "rebuild_insider"] } },
          ok: { body: "低买高卖这一课你上得很成功。选区记性好的那几个人开始用一种新的眼神看你——像看一种鸟。", effects: { funMul: 0.6, attr: { CUN: 1 }, fac: { commercial: 8, base: -6 }, flags: ["vulture"] } },
          meh: { body: "吃进来的资产不涨不跌，趴在账上。你占住了现金，占来了名声的折扣——两边都在等。", effects: { funMul: 0.1, rep: -0.3, fac: { commercial: 4, base: -5 }, flags: ["vulture"] } },
          fail: { body: "恐慌比你想的浅，价格比你想的硬。你高位接了一手，还被记者拍到了和银行经理吃饭的照片——饭是真的，理由没人信。", effects: { funMul: -0.5, rep: -0.7, fac: { commercial: -6, base: -8, press: -6 }, voters: { oppose: 700 }, flags: ["vulture", "scandal_1"] } },
          critfail: { body: "你压价最狠的那一单来自教区的养老基金——修女们被迫卖掉铺面支付照料开支。交易合法。教会公报写了三个星期，第四周，听证会的邀请到了。", effects: { funMul: -0.2, rep: -1.5, fac: { base: -14, church: -16, press: -12, commercial: -8 }, voters: { oppose: 1800 }, flags: ["vulture", "scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "stay_out", text: "不掺和：银行的事让银行和监管去办",
        note: "你自己的账户都在这家银行里——你判断排队的人是错的。不站进去，钱是安全的，政治上另说。",
        base: 0.7,
        outcomes: {
          crit: { body: "你什么也没做。周一监管接手，存款保险兜住了所有储户——恐慌自己烧完了自己。你没有功劳，也没有责任。政治里这叫完好无损。", effects: { rep: 0.2, fac: { establishment: 4 } } },
          ok: { body: "事情按程序过去了。报纸写的是监管，不是你。你的按兵不动躲过了子弹——也躲过了镜头。", effects: { fac: { establishment: 3 } } },
          meh: { body: "银行撑过去了，但队伍里有人记得：那个星期五，办公室里没有一个人出来。不是指控——只是记得。", effects: { rep: -0.2, fac: { base: -4 }, voters: { oppose: 300 } } },
          fail: { body: "监管的动作慢了一步，取不出钱的那个周末上了全国新闻。选区记住的画面是空着的台阶——本来该有人站在那里的台阶。", effects: { rep: -0.7, fac: { base: -8 }, voters: { oppose: 700 } } },
          critfail: { body: "银行倒闭，赔付拖了一个月。工资发不出的小店关了七家——每一家的卷帘门上都贴过你的竞选贴纸。下一次市政厅会议，你回答的第一个问题就是那个星期五。", effects: { rep: -1.25, fac: { base: -14, commercial: -8 }, voters: { oppose: 1600 }, flags: ["scandal_1"] } }
        }
      }
    ]
  }

]);
