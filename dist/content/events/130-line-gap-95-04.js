/* ============================================================================
 * CONTENT · events/130-line-gap-95-04.js
 * 连续时间轴 · 1995—2004 定点大事「补薄」（w56 带 · Track B 预留段 130—149）。
 *
 * 本文件不重写任何年代带的 worldline（1995—1998 归 121、1999—2002 归 122、
 * 2003—2006 归 123）；只补录 4 张该窗口内尚无人钉的定点大事卡，并在末尾按年
 * 月钉进 fixed。卡与存量卡不重号、不重钉同一事件。
 *
 * 覆盖主题（每卡一条，均按史实年月钉进本文件末尾 fixed）：
 *   1995-12 联邦政府两度停摆（预算与医保/教育删减的正面对决，累计歇业约 21 天）
 *   1997-03 烟草业内部文件大批公开 + 联邦诉讼 + 各州和解框架谈判
 *   2002-10 首都圈州际公路连环狙击（三周十人死亡，恐慌被政治化）
 *   2004-08 跨党派调查委员会发布最终报告（把九一一归因于体制性失误）
 *
 * 写法铁律（见 docs/PARALLEL-CONTENT-WORK.md §4 与 CONTENT-SCHEMA §11.7）：
 *   · 不写 era —— 一律 minYear/maxYear + scoped；dyn:true，经济数值全写系数。
 *   · 每卡恰有一个保底选项：无 cost 无 req、高地板低天花板，fail 不超过冒险项一半。
 *   · 冒险项之间支出↔把握↔天花板错位，收益铺至少两根轴；主导轴互不相同。
 *   · 五档结局 crit/ok/meh/fail/critfail 全写；字符串只用「」。
 *   · 正文不出现总统/候选人以外的真人姓名：停摆双方、烟草业、枪手、白宫均以职务或泛称处理。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1995-12 · 联邦政府两度停摆 —— 预算对决把国家机器当了人质
   * ==================================================================== */
  {
    id: "ln95_shutdown", photo: "era-1995.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 1995, maxYear: 1996, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 13, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 12,
    title: "联邦政府因预算对峙两度停摆，累计歇业二十一天",
    body: "为逼医保与教育开支的删减过关，国会与白宫把预算谈崩了：联邦政府从十二月中旬再度关门，一关就是三个多星期。\n" +
      "国家博物馆闭馆、护照与移民服务停发、数十万雇员回家待命、工资停发——所谓停摆，就是预算不过关，联邦机构暂停运作。对峙双方都赌对方先撑不住。\n" +
      "有人说白宫正在悄悄起草让步文本。这笔账，要到明年的选票上才结。",
    choices: [
      {
        id: "holdline", text: "咬死删减：宁可政府停摆，也不在医保与教育上让步",
        note: "赌的是硬扛能逼白宫签字。风险：关门拖久了，选民把账算在喊停的人头上。",
        base: 0.44, stake: { fun: true }, cost: { fun: 1.5 },
        mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "白宫最后按你的口径签了字，党机器与金主把你当成「说到做到的人」，捐款电话响个不停。",
            effects: { rep: 1.5, fac: { establishment: 11, commercial: 6, base: -4 }, voters: { warm: 350 } } },
          ok: { body: "你顶住了让步的压力，上层记你一功；只是本地靠联邦饭碗过日的人开始记你的仇。",
            effects: { rep: 0.5, fac: { establishment: 6, commercial: 4, base: -3 } } },
          meh: { body: "喊强硬的人太多，你这一句没溅起水花。",
            effects: { rep: 0.05 } },
          fail: { body: "关门拖到圣诞，民调掉头，社论把「谁让博物馆关门」的答案指向了你。",
            effects: { rep: -1.75, fac: { base: -6, press: -4 } } },
          critfail: { body: "无薪雇员上了你家门前举牌，标题写着「他宁可我们饿肚子」，调查函随后就到。",
            effects: { rep: -2.6, fac: { press: -6, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "broker", text: "撮合交易：先重开政府，删减留给委员会慢慢磨",
        note: "赌的是中间多数烦透了关门。风险：两头都嫌你先眨眼，功劳与罪名一起摊。",
        base: 0.5, cost: { fav: 1 },
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "政府在你斡旋下重开，两报把你登成「那个把灯重新打开的人」，连对手都得承你这份情。",
            effects: { rep: 1.3, fac: { press: 8, establishment: 3, base: 4 }, voters: { warm: 400 } } },
          ok: { body: "门开了，各退一步——每边都松了口气，也每边都觉得你软了半分。",
            effects: { rep: 0.45, fac: { press: 4, base: 2 }, voters: { warm: 200 } } },
          meh: { body: "妥协达成了，署名却不是你的。",
            effects: { rep: 0.1 } },
          fail: { body: "交易黄了，两边反手都说是你临时变卦，你成了关门续集的替罪羊。",
            effects: { rep: -1.5, fac: { establishment: -5, base: -4 } } },
          critfail: { body: "你起草的文本被逐字泄出，谁都没落好，丑闻的帽子却扣在你一个人头上。",
            effects: { rep: -2.3, fac: { press: -5, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "helpworkers", text: "不站任何一边：替无薪雇员和办不了证的居民跑腿",
        note: "赌的是做事比喊话耐看。风险：两头都要你表态时，安静也是一种罪名。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你张罗的临时无息贷款和加急通道救了几百个家庭。风波过后复盘，本地只有一条没挨骂的措施，就是你这条。",
            effects: { rep: 1.0, fac: { base: 6, church: 5 } } },
          ok: { body: "该办的事办了，该躲的话躲开了，稳当。",
            effects: { rep: 0.5, fac: { base: 4, church: 3 } } },
          meh: { body: "你帮了不少具体的小忙，只是没人记得。",
            effects: { rep: 0.1 } },
          fail: { body: "有党部发言人说：这种时候他只会发面包，不敢就问题说一句话。",
            effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "一笔救助支出被翻出来做文章，虽小而烦人，标题却用了「作秀」。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1997-03 · 烟草业内部文件公开 —— 告到底，还是分和解的钱
   * ==================================================================== */
  {
    id: "ln97_tobacco", photo: "era-1997.jpg", grade: "mid", category: "scandal",
    valence: "risk", dyn: true,
    minYear: 1997, maxYear: 1997, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 3,
    title: "烟草业内部文件大批公开，诉讼与和解同时压顶",
    body: "诉讼强制下，烟草业积攒数十年的内部备忘录与证词被一批批放出：白纸黑字写着「制造的就是成瘾」。\n" +
      "联邦已经起诉，各州跟进，一笔大到没人敢念总数的和解正被反复磋商。律师、健康保险公司与赤字压顶的州财政全挤进谈判桌，等着分这一杯羹。\n" +
      "有人说行业想用和解金换免责。五年之后，这一纸和解是政绩还是欠条——要看你今天收了谁的钱、说了谁的话。",
    choices: [
      {
        id: "prosecute", text: "站在起诉一边：把隐瞒成瘾的整条链条告到底",
        note: "赌的是揭黑叙事一路涨。风险：行业律师团反咬，金主与商界把你列入不可谈名单。",
        base: 0.43, stake: { fun: true }, cost: { fun: 1.2 },
        mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "那些文件真把案子钉死了，你的「告到底」成了全国模仿的调门，媒体与基层同时把你登成敢碰巨头的人。",
            effects: { rep: 1.4, attr: { INT: 2 }, fac: { press: 9, base: 7, commercial: -5 } } },
          ok: { body: "你替愤怒找了个门牌号，报了名；商界的饭局从此少摆一副你的碗筷。",
            effects: { rep: 0.5, fac: { press: 5, base: 4, commercial: -3 } } },
          meh: { body: "喊追责的人很多，你排在中间。",
            effects: { rep: 0.05 } },
          fail: { body: "案子卡在程序里，行业请出的专家反证你的措辞，报上说你外行办案。",
            effects: { rep: -1.6, fac: { commercial: -6, establishment: -4 } } },
          critfail: { body: "你引用的文件被质疑来源违规，反诉传票先到你桌上，丑闻标签坐实。",
            effects: { rep: -2.5, fac: { press: -5, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "settle", text: "务实收钱：替本州争一大笔进州库、补医保窟窿",
        note: "赌的是落袋为安更实在。风险：日后被人翻出你替成瘾者定了价。",
        base: 0.5, cost: { fav: 1 },
        mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "和解落地那天，你数着进账的款项开记者会，医保缺口填上了一块，党机器认定你是「能替本州要到钱的人」。",
            effects: { rep: 1.2, fun: 2.5, fac: { establishment: 6, labor: 4 }, voters: { warm: 300 } } },
          ok: { body: "钱进来了，事办了；只是教会和反烟团体看你的眼神变了。",
            effects: { rep: 0.4, fun: 1.2, fac: { establishment: 4, base: -3 } } },
          meh: { body: "和解归和解，你的那一份没谈出多大名堂。",
            effects: { rep: 0.1 } },
          fail: { body: "和解条款被重读，「拿成瘾换预算」的标题配上你的笑脸照片。",
            effects: { rep: -1.4, fac: { base: -5, press: -4 } } },
          critfail: { body: "有材料显示你在谈判前就与行业吃过饭，「被收买」三个字贴上了。",
            effects: { rep: -2.2, fac: { press: -5, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quitcare", text: "不碰这笔账：只在本辖区做实戒烟帮助与病人救助",
        note: "赌的是不站队也能得分。风险：风头都归了喊告与分钱的人，你只是在场。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "两年后回头看，最干净的立场是你那条：谁的钱也没拿，谁的话也没替，戒烟热线的账目一清二白。",
            effects: { rep: 1.0, fac: { church: 6, base: 5 } } },
          ok: { body: "你办了实事，没沾上任何一句会被重播的话。",
            effects: { rep: 0.5, fac: { church: 4, base: 3 } } },
          meh: { body: "你做了该做的，没人夸，也没人挑。",
            effects: { rep: 0.1 } },
          fail: { body: "两头都来问你对案子的立场，你都没答，两边各送你一句「和稀泥」。",
            effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "一笔救助经手出了小纰漏，被卷入和解金去向的口水里，事后澄清，标签留下。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2002-10 · 首都圈高速连环狙击 —— 通勤路上找不到的那个人
   * ==================================================================== */
  {
    id: "ln02_sniper", photo: "era-2002.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2002, maxYear: 2002, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "internet"], month: 10,
    title: "首都圈州际公路连环狙击，三周十人死亡",
    body: "首都圈几条州际公路沿线，三周内接连响起枪声：十人死亡、多人重伤，目标像是随机的通勤者。\n" +
      "联邦探员进驻，学校接连停课，州警在高速上设卡盘查。调查的圈子已经圈定：是两名流窜作案的枪手。人人摇上车窗、绕开加油站；这场恐慌很快被问成一个政治问题——谁，能保证你安全。\n" +
      "案子哪天破、破了会不会已经太晚，没有人给你日期。",
    choices: [
      {
        id: "securitize", text: "加码安全：封锁高速、延长宵禁停课，向联邦要更多资源",
        note: "赌的是强硬能压住恐慌。风险：抓不到人时，戒严的样子比案子更招骂。",
        base: 0.42, stake: { fun: true }, cost: { fun: 1.5 },
        mods: [{ src: "fac", key: "agency", w: 0.4 }, { src: "fac", key: "military", w: 0.2 }],
        outcomes: {
          crit: { body: "高压巡逻与联合路检逼出了线索，枪手落网当晚，你把「我说过要更狠」讲成了本地安全叙事的注脚。",
            effects: { rep: 1.5, fac: { agency: 10, establishment: 6, military: 5 }, voters: { warm: 400 } } },
          ok: { body: "你喊出了最响的「加派人手」，执法系统对你印象不错，尽管案子还挂着。",
            effects: { rep: 0.5, fac: { agency: 6, establishment: 3 } } },
          meh: { body: "喊加强安保的人太多，你这句排在中段。",
            effects: { rep: 0.05 } },
          fail: { body: "封锁升级却没换来安全，一起误伤上了新闻，而你此前正替这种做法大声背书。",
            effects: { rep: -1.75, fac: { base: -6, press: -4 } } },
          critfail: { body: "一名无辜者被当枪手拦截，起诉清单排到你面前，标题写着「他催得最急」。",
            effects: { rep: -2.6, fac: { press: -6, agency: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "coordel", text: "跨辖区联合办案：统一情报、专班共享、别各抓各的",
        note: "赌的是协调比声势更管用。风险：辖区扯皮时，喊协调的人最先被甩锅。",
        base: 0.5, cost: { fav: 1 },
        mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "你搭的跨区情报专线把散落线索拼到了一起，结案后报告特意点了这一机制——媒体把你列进「早想到的人」。",
            effects: { rep: 1.3, attr: { INT: 3 }, fac: { press: 8, agency: 4 } } },
          ok: { body: "机制搭起来了，各局不情不愿地共享了数据，记者觉得你抓对了要害。",
            effects: { rep: 0.45, attr: { INT: 2 }, fac: { press: 5, agency: -2 } } },
          meh: { body: "你的协调方案卡在辖区权限上，听证开了，会还没并成。",
            effects: { rep: 0.1 } },
          fail: { body: "一桩本可避免的疏漏被归咎于协调失灵，而你是挂名的协调人。",
            effects: { rep: -1.5, fac: { establishment: -5, agency: -4 } } },
          critfail: { body: "共享平台泄了侦查细节，各局反咬你越权，调查转向了你。",
            effects: { rep: -2.3, fac: { press: -5, agency: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "watch", text: "不抢安全话语权：办邻里守望、陪家长接送、辟谣稳人心",
        note: "赌的是安抚比声势更贴心。风险：问责潮起时，安静的人会被当成缺位。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "在人人喊打喊封路的季节，你组织的接送队与信息核实热线让一个社区没有陷入歇斯底里。事后回望，这份冷静被记成了功劳。",
            effects: { rep: 1.0, fac: { base: 6, church: 4 } } },
          ok: { body: "你做了最基层的安抚活，没上头条，也没上黑名单。",
            effects: { rep: 0.5, fac: { base: 4 } } },
          meh: { body: "你在名单上做了不少事，不在任何版面上。",
            effects: { rep: 0.1 } },
          fail: { body: "有人说他连案子都不敢提一句，只顾在小学门口拍照。",
            effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "一起本可防范的事故被拿来问你：守望队为什么没看见，「在场却没管用」传开了。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2004-08 · 调查委员会最终报告 —— 大选前六周的一纸问责
   * ==================================================================== */
  {
    id: "ln04_report", photo: "era-2004.jpg", grade: "mid", category: "scandal",
    valence: "risk", dyn: true,
    minYear: 2004, maxYear: 2004, scoped: true, tierRaw: true, tierMin: 1, tierMax: 7, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 8,
    title: "跨党派调查委员会发布报告，把九一一归因于体制失误",
    body: "经过近二十个月听证，跨党派调查委员会交出最终报告，把九一一归因成一连串「本可拦住的失误」：情报各说各话，威胁分级机制形同虚设。\n" +
      "报告由两党委员联名签发，没法当成党派文件打发，在大选前六周占满头版。白宫第一反应是反击：措辞失当、误导公众。你所在的层级，明天上午被三家媒体约了「怎么看这份报告」。\n" +
      "它是问责还是选战燃料，此刻还没人摊牌——你今晚定的调，六周后要交账。",
    choices: [
      {
        id: "account", text: "跟进问责：按报告推动情报共享与威胁分级整改",
        note: "赌的是改革叙事经得起回头看。风险：白宫指你误导，联邦那条线对你关门。",
        base: 0.44, cost: { fun: 1.2 },
        mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "整改立法随后落地，引用了你在听证上的追问，媒体与安全圈都把你登记成「把报告当真的人」。",
            effects: { rep: 1.4, attr: { INT: 2 }, fac: { press: 9, agency: 5, establishment: -4 } } },
          ok: { body: "你咬住了「别再各说各话」，方向对了；白宫口径还没松口。",
            effects: { rep: 0.5, fac: { press: 5, agency: 3 } } },
          meh: { body: "你的改革呼声被淹没在两党的选举口水里。",
            effects: { rep: 0.05 } },
          fail: { body: "整改陷入机构拉锯，「趁选举抹黑安全团队」的反扑点名到你。",
            effects: { rep: -1.6, fac: { establishment: -6, agency: -5 } } },
          critfail: { body: "你引用的一条证词被指失真，反将一军的调查转向你，丑闻标签贴上。",
            effects: { rep: -2.5, fac: { establishment: -6, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "ammunition", text: "把报告当弹药：咬住白宫「误导」，六周内火力全开",
        note: "赌的是问责能变成选票。风险：选举一过，消费报告的人会被反噬。",
        base: 0.5, cost: { fav: 1 },
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你的「他们误导了我们」剪进对手广告循环播放，基层与反战选民把你当成会替他们发火的人。",
            effects: { rep: 1.3, fac: { base: 8, press: 5 }, voters: { warm: 400 } } },
          ok: { body: "你替愤怒找到了靶子，风头抢到了；建制那边把这笔账记下了。",
            effects: { rep: 0.4, voters: { warm: 200 }, fac: { base: 4, establishment: -3 } } },
          meh: { body: "蹭这口浪的人太多，你的话排在中间。",
            effects: { rep: 0.1 } },
          fail: { body: "选举过去，「消费九一一」的清算开始，你当初最响的句子被重新配音。",
            effects: { rep: -1.5, fac: { establishment: -6, press: -4 } } },
          critfail: { body: "你放的「误导」指控被证伪，报上把标题改成「谁在误导」，反咬到你头上。",
            effects: { rep: -2.3, fac: { establishment: -5, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "localfix", text: "不炒选举：只在本辖区先落实报告里的应急与情报对接",
        note: "赌的是把事办实比抢话筒耐看。风险：热闹都归了喊问责与开火的人。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "两党在为报告打口水仗时，你把本地的应急对接清单悄悄补齐了。两年后一次虚惊里，你的辖区是唯一没掉链子的那块。",
            effects: { rep: 1.0, fac: { base: 5, agency: 4 } } },
          ok: { body: "你做了查不到、也忘不掉的实事，稳当。",
            effects: { rep: 0.5, fac: { base: 4, agency: 2 } } },
          meh: { body: "你落实了你的清单，没人来查，也没人来谢。",
            effects: { rep: 0.1 } },
          fail: { body: "两边同一天问你「对报告什么看法」，你答在做事，被写成回避问题。",
            effects: { rep: -0.6, fac: { establishment: -3 } } },
          critfail: { body: "一笔应急采购被卷进党争做文章，虽小而烦人，标题挂着你的名字。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 定点锚 · 本带 4 张新卡按史实年月钉进 fixed（不动其它年代带的 worldline/fixed）。
 *   · ln95_shutdown：停摆自 1995-12 起、跨入 1996-01，钉 1995 年 12 月。
 *   · 每张只钉一次（unique），不与 121/122/123 带重复同一事件。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln95_shutdown", year: 1995, month: 12, grade: "major" },
  { event: "ln97_tobacco",  year: 1997, month: 3,  grade: "mid" },
  { event: "ln02_sniper",   year: 2002, month: 10, grade: "mid" },
  { event: "ln04_report",   year: 2004, month: 8,  grade: "mid" }
]);
