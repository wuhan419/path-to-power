/* ============================================================================
 * CONTENT · events/120-line-1991-94.js
 * 连续时间轴 · 1991—1994 定点大事件（w01 / Track B · B1 带）。
 *
 * 形制照 events/110-line-1980s.js（见 docs/PARALLEL-CONTENT-WORK.md §4）：
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped。
 *   · 到点必发 —— 本文件末尾 POTUS.define("fixed", …) 钉死年月量级；
 *     1991—1993 已有的海湾卡（gulf91_storm / gulf91_peace / gulf92_economy /
 *     gulf93_talkradio，见 106-era-1990.js）只追加锚点、不重写。
 *   · 世界线 —— 1991—1994 每年的 pressure / brief / outlets 随本文件自带。
 *
 * 铁律：字符串只用「」；每卡一个无 cost 无 req 的保底选项（高地板低天花板、
 *   ok 为正小额、fail 幅度 ≤ 冒险项一半、不埋负面 flag）；冒险项之间
 *   支出↔把握↔天花板错位，收益铺 ≥2 根轴，同卡 base 极差 ≥0.10。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1991-12 · 苏联解体 —— 对手从版图上消失（机遇面，低层级可撞）
   * ==================================================================== */
  {
    id: "ln91_ussr", grade: "major", category: "foreign",
    valence: "boon", dyn: true,
    minYear: 1991, maxYear: 1991, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 12,
    title: "克里姆林宫上空的红旗降了下来",
    body: "戈尔巴乔夫在电视上辞职，苏联在一份文件里停止了存在。四十年的对峙，一夜销账；「历史终结」的说法登上所有周刊封面。\n" +
      "可本地的加油站还在排队，工厂还在往外搬。电视台在全美找「回应胜利」的面孔，东欧裔社区想办一场感恩集会——他们都想到了你。\n" +
      "有人说莫斯科的强硬派随时会翻回来；这张胜利支票五年后还兑不兑得现，没人给你担保。",
    choices: [
      {
        id: "victory", text: "把镜头全部接过来，发表「自由赢了」的全国讲话",
        note: "赌的是胜利叙事能罩住你很多年。风险：话说满了，日后的麻烦都算你预言过。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的讲话被剪进年终盘点，人们把这个伟大时刻和你的脸放在一起。一年后的空缺里，有人第一个想到你。", effects: { rep: 1.4, tier: 1, fac: { establishment: 8, press: 6 } } },
          ok: { body: "你说得体又记得住，评论圈开始把你当「会讲大场面的人」。", effects: { rep: 0.7, fac: { establishment: 4 } } },
          meh: { body: "全国都在放同一句胜利宣言，你的那份混在里面，没人听清。", effects: { rep: 0.2 } },
          fail: { body: "你的讲话被嫌「沾沾自喜」，可风头太大，没人真往心里去。", effects: { rep: 0.1 } },
          critfail: { body: "你把庆祝讲成了自己的功劳册，现场有人小声嘀咕「他做过什么」。好在没人接话。", effects: { rep: 0.05 } }
        }
      },
      {
        id: "dividend", text: "顺着「和平红利」喊话：把军费换成本地的学校和岗位",
        note: "赌的是红利民心。风险：说早了会被军方和承包商连本带利讨回来。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你把「敌人没了，账单还在」讲成了街头共识，基层与工会一起替你背书。", effects: { rep: 1.0, fac: { base: 10, labor: 8 }, voters: { warm: 900 }, flags: ["peace_dividend"] } },
          ok: { body: "红利的说法被你带了起来，选民点头，军工皱眉。", effects: { rep: 0.5, fac: { base: 5 }, voters: { warm: 250 } } },
          meh: { body: "你喊了红利，可大家都忙着庆祝，没人注意钱的事。", effects: { rep: 0.15, voters: { warm: 50 } } },
          fail: { body: "承包商游说团把你登记进「不友好名单」，好在风头正劲，无人理会。", effects: { rep: 0.05 } },
          critfail: { body: "你的砍军费提案被当地报纸嘲讽为「解散胜利」。疼一下，仅此而已。", effects: { rep: 0.05, fac: { base: 2 } } }
        }
      },
      {
        id: "vigil", text: "只去东欧裔社区的守夜集会，和他们一起念亲人的名字",
        note: "最稳的一步：不抢镜头、不赌判断，社区记你这份到场的情。",
        base: 0.65, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "church", w: 0.25 }],
        outcomes: {
          crit: { body: "你在念名单时停下来，用母语跟着念了一句。教堂和社区都记住了这个细节。", effects: { rep: 0.5, fac: { church: 8, base: 5 } } },
          ok: { body: "你安静地站到了最后，得体，也够了。", effects: { rep: 0.25, fac: { church: 3 } } },
          meh: { body: "你去了，人群太满，没人特别认出你。", effects: { rep: 0.1 } },
          fail: { body: "你在人群里显得有点不合拍，没人挑你的错，也没人记住你。", effects: { rep: 0.05 } },
          critfail: { body: "一夜平安无事——这场守夜本来就出不了错。", effects: {} }
        }
      }
    ]
  },

  /* ======================================================================
   * 1992-04 · 洛杉矶暴动 —— 判决宣读后的六天火（威胁面）
   * ==================================================================== */
  {
    id: "ln92_riots", grade: "major", category: "civil",
    valence: "bane", dyn: true,
    minYear: 1992, maxYear: 1992, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 4,
    title: "殴打黑衣人的警察被判无罪，洛杉矶烧了六天",
    body: "当街殴打一名黑人男子的四名警察全数无罪，判决宣读几小时后，洛杉矶炸开。六天、五十多条人命、十亿美元的火，国民警卫队的装甲车开上大道。\n" +
      "镜头把整座城市在燃烧的画面递进每一间客厅。你所在的城市没有着火，但每一条街都在等一个说法——你的。\n" +
      "有人说店主们已经自组巡逻队。街区的怨气正等一个流向，你第一句话值多少票，没人当场报得出价。",
    choices: [
      {
        id: "march", text: "公开谴责判决，走上街头与愤怒的社区站在一起",
        note: "赌的是街头信你这个人。风险：一旦失控，火会掉头烧到你。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你站在人群前替他们把话说圆了，街区的怒气没冲着镜头来。人们记住了这个白人面孔里敢来的那个。", effects: { rep: 1.4, fac: { base: 12, church: 8 }, voters: { warm: 900 }, flags: ["minority_guard"] } },
          ok: { body: "你到场了、开口了，社区领情，主流那边多了几分嘀咕。", effects: { rep: 0.4, fac: { base: 6 }, voters: { warm: 200 } } },
          meh: { body: "你说了公道话，人群太吵，你的话没传出去多远。", effects: { rep: -0.2, fac: { base: -2 } } },
          fail: { body: "你到场那晚正巧有商店被烧，有人指着你说「就是他煽起来的」。", effects: { rep: -1.5, fac: { establishment: -8, commercial: -6 } } },
          critfail: { body: "你在火光前的某句话被剪成「煽动暴乱」的样本，联邦调查开始约人谈话。", effects: { rep: -2.5, fac: { press: -8, base: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "order", text: "挺秩序：声援商户与国民警卫队，先熄火再谈判决",
        note: "赌的是选民怕乱多于怕冤。风险：社区的门从此对你关上。",
        base: 0.5, mods: [{ src: "fac", key: "commercial", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你替惊魂未定的店主们说了话，商会和郊区政府把你当自己人，捐款电话排着打来。", effects: { rep: 1.1, fac: { commercial: 10, establishment: 8, military: 6 } } },
          ok: { body: "你站了秩序一边，商户安心，街头骂你「只看见烧的店」。", effects: { rep: 0.5, fac: { commercial: 6, establishment: 4 } } },
          meh: { body: "你的喊话不痛不痒，两头都觉得你没说到位。", effects: { rep: -0.1, fac: { base: -3 } } },
          fail: { body: "在还有人没从楼里出来的时候，你惦记的是店——教堂和社区一起把这句话记下了。", effects: { rep: -1.4, fac: { base: -12, church: -6 } } },
          critfail: { body: "你呼吁「让军队进城清场」的录音在黑人电台反复播放，本地选举一夜之间把你归了类。", effects: { rep: -2.2, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "relief", text: "不谈判决也不谈纵火，只替街区办互助与重建",
        note: "两边都不着地的一条路：事情办得成，风头轮不到你。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你的救灾协调处连开了六天，断货的补上、没床的有了安置点——两头都挑不出你的错。", effects: { rep: 0.3, fac: { base: 6, labor: 3 } } },
          ok: { body: "你做了实事，火场边的志愿者记得你搬过几箱水。", effects: { rep: 0.15, fac: { base: 3 } } },
          meh: { body: "你忙着发物资，历史的大词轮不到你，你也不在乎。", effects: { rep: 0.05 } },
          fail: { body: "重建钱到得太慢，有人骂「光会发毯子」。", effects: { rep: -0.2 } },
          critfail: { body: "物资发放出了纰漏，报纸批评你「只做事不做人」，仅此而已。", effects: { rep: -0.35 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1993-02 · 世贸中心爆炸 —— 第一声警告枪（威胁面）
   * ==================================================================== */
  {
    id: "ln93_wtc", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 1993, maxYear: 1993, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 2,
    title: "一辆黄色货车把世贸中心北塔的底炸穿了",
    body: "一辆租来的黄色货车装着炸药开进世贸中心地下车库，在预定时刻起爆。好几层楼板被掀穿，六人丧生、上千人进医院，曼哈顿的空气中全是粉尘味。\n" +
      "这是恐怖主义第一次摸到美国商业的心脏。举国愕然之余，本地的阿拉伯裔与南亚裔商铺一夜之间成了被盯上的人——他们想看看你会不会说话。\n" +
      "同案嫌犯仍在逃，各地都在倒查租车记录。有人说城外还有一辆装满炸药的货车——这一声，未必是最后一声。",
    choices: [
      {
        id: "harden", text: "打安全牌：要求更大执法权、盯紧「可疑社区」",
        note: "赌的是恐惧会替你拉票。风险：日后有人拿你归的类算总账。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "你的一套「零容忍」成了本地头条，上面把你当成「懂安全的人」，请帖与提名一起在路上。", effects: { rep: 1.2, fac: { establishment: 8, press: 5, military: 4 } } },
          ok: { body: "你顺着不安的情绪讲了硬话，多数人点头，少数人记下了你的脸。", effects: { rep: 0.5, fac: { establishment: 5 } } },
          meh: { body: "安全议题太吵，你的那份声音被更大的吞掉了。", effects: { rep: -0.1 } },
          fail: { body: "你点的「重点监视对象」里有个本地店主，最后证实纯属误会——他把你的名字告到了全美的听证席。", effects: { rep: -1.5, fac: { press: -6, church: -5 } } },
          critfail: { body: "你的名单式言论被做成「他支持种族清查」的广告，连建制派都急着与你切割。", effects: { rep: -2.5, fac: { base: -10, church: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "shield", text: "替被怀疑的社区出头：开联谊会，把罢市的火压下去",
        note: "赌的是人心记得谁护过谁。风险：这会被剪成「他怀疑美国」。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "church", w: 0.3 }],
        outcomes: {
          crit: { body: "你在联谊会上被一群店主围着道谢，那个画面上了晚报头版——「这才是美国小镇」。", effects: { rep: 1.3, fac: { church: 10, base: 8 }, voters: { warm: 600 }, flags: ["minority_guard"] } },
          ok: { body: "你护住了本地商户，他们记你的情；主流舆论对你多了一点嘀咕。", effects: { rep: 0.6, fac: { base: 5, church: 4 }, voters: { warm: 150 } } },
          meh: { body: "会开了，茶凉了，谁都没亏着谁。", effects: { rep: 0.1 } },
          fail: { body: "你替「被怀疑的人」说话被反剪成「他在替谁说话」，退伍军人群体的信寄到了你办公室。", effects: { rep: -1.4, fac: { military: -6, establishment: -5 } } },
          critfail: { body: "联谊会的合影被做成传单：恐怖分子的朋友。你的电话被打爆了两星期。", effects: { rep: -2.4, fac: { press: -6, base: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "drill", text: "哪头都不站：只推本地应急演练与港口巡查",
        note: "把议题从身份拉回技术：做事最稳，也最没人替你记功。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你那份「不问来路、先查入口」的技术方案被州里照抄，专家圈开始知道有个懂行的民选官。", effects: { rep: 0.3, attr: { INT: 2 }, fac: { establishment: 4 } } },
          ok: { body: "你推动了演习和巡查，没上头条，也没上黑名单。", effects: { rep: 0.2 } },
          meh: { body: "你的报告安静地躺进档案柜，世界继续紧张。", effects: { rep: 0.05 } },
          fail: { body: "再没爆炸，再没新闻——人们觉得你「小题大做花了冤枉钱」。", effects: { rep: -0.2, fac: { commercial: -2 } } },
          critfail: { body: "预算审计翻出演练采购的猫腻，你被问了一句「钱去哪了」。不疼，但脏。", effects: { rep: -0.3, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1993-04 · 韦科惨案 —— 联邦的火光（风险面）
   * ==================================================================== */
  {
    id: "ln93_waco", grade: "mid", category: "crisis",
    valence: "risk", dyn: true,
    minYear: 1993, maxYear: 1993, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 4,
    title: "韦科的教派庄园在凌晨的大火里烧成白地",
    body: "德州中部一座宗教庄园与联邦探员对峙了五十多天。枪战、催泪气、谈判破裂——四月十九日凌晨，大火把整片建筑吞了，七十多具遗体，其中有二十多个孩子。\n" +
      "谈话电台为此吵了整整两周，司法部长的听证会排期出炉。每一个民选官都被问同一道题：这是执法的悲剧，还是政府的罪过？\n" +
      "幸存者证词与官方说法对不上，档案还不公开；追悼会与挺执法集会排在同一周，都请你出席。你今日站的队，日后要按成色算账。",
    choices: [
      {
        id: "probe", text: "要求独立调查：点名执法链上的每一环",
        note: "赌的是民意正嫌政府手重。风险：你从此是「跟自己的执法机关过不去的人」。",
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: { body: "你抽丝剥茧的质询被全国转播，「那个会问问题的」成了你的标签，调查委员会的座位给你留着。", effects: { rep: 1.3, attr: { INT: 2 }, fac: { press: 8, base: 5, establishment: -5 } } },
          ok: { body: "你把程序问题问出了声量，司法部门讨厌你，媒体喜欢你。", effects: { rep: 0.5, attr: { INT: 1 }, fac: { press: 5 } } },
          meh: { body: "你递了调查申请，被当成又一个刷存在感的，压在下头没批。", effects: { rep: -0.3, fac: { establishment: -3 } } },
          fail: { body: "你的质询被司法部反手钉成「外行抹黑执法」，同僚开始躲着你走。", effects: { rep: -1.6, fac: { establishment: -8, military: -4 } } },
          critfail: { body: "你引为证据的一份材料被证伪，你从质询者变成了被质询者。", effects: { rep: -2.6, fac: { press: -8, establishment: -10 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "shield", text: "挺到底：咬定是教派自毁，联邦人员不该被审判",
        note: "赌的是建制与军警系统的回馈。风险：替一把还在冒烟的火背书。",
        base: 0.52, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你在听证会上为执法部门挡住了话筒，部门内部把你写进了「自己人」的备忘。", effects: { rep: 1.1, fac: { establishment: 10, military: 6 } } },
          ok: { body: "你站了机关一边，上层满意，愤怒的民意把你上了对比海报。", effects: { rep: 0.4, fac: { establishment: 6 } } },
          meh: { body: "你的声援像官方通稿，机关没记住，民众先烦了。", effects: { rep: -0.2, fac: { press: -2 } } },
          fail: { body: "新的档案照片公布，你的「挺到底」正好被钉在最难看的时刻上。", effects: { rep: -1.4, fac: { base: -10, press: -5 } } },
          critfail: { body: "「烧死孩子的时候他在鼓掌」——这句话跟着你进了下一次投票站。", effects: { rep: -2.4, fac: { base: -12, church: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "mourn", text: "机构是非一句不提，只在追悼会上说安魂",
        note: "不接这题的最稳走法：不出错，也不攒下什么。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你在追悼会上念了遇难孩子的名字，没说一句是非。两边都觉得你得体。", effects: { rep: 0.2, fac: { church: 4 } } },
          ok: { body: "你送了花圈、讲了悼词，安静过关。", effects: { rep: 0.2 } },
          meh: { body: "你出席又离场，新闻画面里没有你。", effects: {} },
          fail: { body: "有人说这种时候只肯念名字，等于什么都没做。", effects: { rep: -0.2 } },
          critfail: { body: "你把追悼走成了拜票，被家属请出了前排。难堪一阵，不伤筋骨。", effects: { rep: -0.2, fac: { base: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1993-10 · 摩加迪沙黑鹰坠落 —— 直播里的灵柩（威胁面）
   * ==================================================================== */
  {
    id: "ln93_somalia", grade: "major", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 1993, maxYear: 1993, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 10,
    title: "两架黑鹰直升机坠在摩加迪沙的街头",
    body: "抓捕某军阀的突击在天黑后打成一整夜的巷战：两架黑鹰被火箭弹打下来，部队抬着伤亡突围。被拖行的士兵画面上了全球电视，十八名年轻人再没回家。\n" +
      "一年前所有人还在问「不介入，哪里是底线」；今天所有人都在问「他们为什么死在那里」。这些问题，正往每个民选官头上落。\n" +
      "选区征兵处的电话半夜响过，两户军属的消息就压在你桌上。你今天说的话，明天会被原样引用回来。",
    choices: [
      {
        id: "bring", text: "要求立刻全线撤出：结束了「国家建设」这场生意",
        note: "赌的是厌战民意。风险：下次出事，「不敢打」的账算你一份。",
        base: 0.5, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你一句「把孩子们带回家」成了反干预阵营的口号，军属与街区的票一起汇过来。", effects: { rep: 1.3, fac: { base: 10, military: 4, foreign: -6 }, voters: { warm: 900 }, flags: ["old_school"] } },
          ok: { body: "你主张撤军，说得恳切。反战者满意，鹰派记你一账。", effects: { rep: 0.6, fac: { base: 6 }, voters: { warm: 200 } } },
          meh: { body: "你喊了撤军，可政策自己就在往那边滑，轮不到你领功。", effects: { rep: -0.1 } },
          fail: { body: "对手把你剪成「在士兵尸体前谈投降」，退伍军人群体第一次公开反你。", effects: { rep: -1.4, fac: { military: -8, establishment: -6 } } },
          critfail: { body: "撤军辩论正酣，又一支小队遇袭。舆论需要一个出气筒，你抢到了。", effects: { rep: -2.4, fac: { military: -10, press: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hold", text: "挺到底：任务不能改，撤走等于让他们白死",
        note: "赌的是「不能示弱」这套老语法还灵。风险：民调已经不灵了。",
        base: 0.47, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你在一片撤军声里硬撑住了调门，鹰派与五角大楼系统把你的名字记进「可用之人」。", effects: { rep: 1.1, fac: { military: 10, establishment: 6, foreign: 4 } } },
          ok: { body: "你站了强硬一边，上层点头，电视观众嘘你。", effects: { rep: 0.4, fac: { military: 6, establishment: 4 } } },
          meh: { body: "你说了狠话，可全国已经不想再听关于索马里的任何话。", effects: { rep: -0.2 } },
          fail: { body: "民意一边倒要撤，你的坚持被读成「拿别人的儿子撑自己的场面」。", effects: { rep: -1.5, fac: { base: -8, press: -4 } } },
          critfail: { body: "又一名士兵被抬上归国的运输机，摄像机正对着你的「不撤」。", effects: { rep: -2.5, fac: { base: -10, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "home", text: "不辩国策：先把本选区那两户军属的事办妥",
        note: "把国难的题换成家事的答：不会错，也算不上勇敢。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "military", w: 0.2 }],
        outcomes: {
          crit: { body: "你连夜协调了葬礼、抚恤和孩子的学费，那两家人在追悼会上替你握了别人的手。", effects: { rep: 0.3, fac: { base: 4, military: 3 } } },
          ok: { body: "你该到的场到了，该办的事办了。军属社区记着你。", effects: { rep: 0.2 } },
          meh: { body: "你在办事，镜头在拍别人，安静无事。", effects: { rep: 0.05 } },
          fail: { body: "有一户人家觉得你来得太晚，话传开了：「他只关心投票的死人」。", effects: { rep: -0.2 } },
          critfail: { body: "抚恤表格卡在官僚流程里，家属在报上点了你的名字。不冤枉，但疼。", effects: { rep: -0.3, fac: { military: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1994-01 · 北岭地震 —— 塌下来的不只是桥（风险面）
   * ==================================================================== */
  {
    id: "ln94_northridge", grade: "mid", category: "crisis",
    valence: "risk", dyn: true,
    minYear: 1994, maxYear: 1994, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 1,
    title: "凌晨四点，洛杉矶都会区的高速路桥塌了",
    body: "六点七级的地震在周一凌晨把北岭一带摇出裂口：高架桥整段坠落，医院外墙开裂，五十多人遇难，财产损失奔着几百亿美元去。保险业随后干脆把地震险从整个州抽走。\n" +
      "救灾的钱、保险的洞、「下一场大的还在路上」的警告，一夜之间全摆上桌面。\n" +
      "联邦救灾款在批，可程序长；你治下的安置点缺人、缺水、缺工程队。有人说这次只是前震，主震还没来。",
    choices: [
      {
        id: "build", text: "抢重建：亲自督办应急包，把工程岗位落回选区",
        note: "赌的是钱花在人看得见的项目上。风险：工地的账本迟早被人翻。",
        base: 0.5, cost: { fun: 1 }, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "labor", w: 0.3 }],
        outcomes: {
          crit: { body: "塌掉的桥比你上任还快就重修了，你在剪彩台上成了「能把事办成的人」，工程圈的钱和名一起到位。", effects: { rep: 1.4, fun: 4, fac: { commercial: 8, base: 6, labor: 5 }, voters: { warm: 700 } } },
          ok: { body: "重建款顺到你的人头上，本地有活干，选民有工看。钱花了，回来了七成。", effects: { rep: 0.7, fun: 1.5, fac: { base: 5 }, voters: { warm: 200 } } },
          meh: { body: "你跑前跑后，款子却卡在州里，你的开销打了水漂。", effects: { rep: 0.1, fun: -1 } },
          fail: { body: "有承包商在报上捅出你和重建合同的饭局，「发国难财」四个字第一次挂到你名下。", effects: { rep: -1.5, fun: -1, fac: { press: -6, labor: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "检察方调走了应急合同，你的名字圈在第一批名单里。", effects: { rep: -2.5, fun: -1.5, fac: { press: -8, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "insure", text: "立法硬仗：逼保险业回来，给全州地震险立个基金",
        note: "赌的是业主的怨气够大。风险：金主们的支票也会跟着变大方向。",
        base: 0.47, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "base", w: 0.25 }],
        outcomes: {
          crit: { body: "你起草的地震基金成了立法样本，「那个敢跟保险公司拍桌子的」上了全州媒体。", effects: { rep: 1.2, attr: { INT: 3 }, fac: { base: 8, labor: 4, commercial: -6 } } },
          ok: { body: "法案过了初审，保险业开始雇游说客盯着你。", effects: { rep: 0.5, attr: { INT: 1 }, fac: { base: 4, commercial: -3 } } },
          meh: { body: "你的草案被塞进委员会抽屉，没人反对，也没人推进。", effects: { rep: -0.3 } },
          fail: { body: "保险游说团把你打成「不懂经济的民粹」，连本党金主都打了哈哈。", effects: { rep: -1.4, fun: -0.5, fac: { commercial: -10, establishment: -5 } } },
          critfail: { body: "基金草案被查出「另有蹊跷的设计」，两头都说你拿了另一头的钱。", effects: { rep: -2.4, fac: { commercial: -8, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "helper", text: "不谈钱也不谈险：动员志愿队直接进安置点",
        note: "把政绩押在出力上：稳，但天花板也就到这了。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的志愿队撑过了最难的第一周，小报照片里你和灾民一起排队领咖啡。", effects: { rep: 0.2, fac: { base: 4 } } },
          ok: { body: "帐篷、毯子、翻译志愿者——你一样样凑齐了。", effects: { rep: 0.2 } },
          meh: { body: "出了力，留不下痕迹，也就这样。", effects: {} },
          fail: { body: "有志愿者在工地受了伤，有人问你有没有保险——你还真没有。", effects: { rep: -0.2 } },
          critfail: { body: "安置点出了卫生事故，报纸批评你「热情代替专业」。", effects: { rep: -0.2, fac: { base: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1994-04 · 卢旺达 —— 一百天里没人愿意听（威胁面）
   * ==================================================================== */
  {
    id: "ln94_rwanda", grade: "mid", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 1994, maxYear: 1994, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 4,
    title: "卢旺达的一百天：电报里全是名单，没发出去的电",
    body: "一个总统的飞机被击落之后，卢旺达在一百天里死了近八十万图西族与温和派胡图族——用的大多是砍刀。影像就在各家新闻编辑室里，白宫却在辩论能不能说出「种族灭绝」这个词。\n" +
      "摩加迪沙的阴影下，没有人想再派一个兵。本地的救援组织和难民家庭在敲你的门，请你替没有护照的人说一句话。\n" +
      "联名信已经递到手上，只差一个签名。有人说屠杀是按公开名单逐名清账的——这笔账，日后也会来对你的名字。",
    choices: [
      {
        id: "word", text: "公开说出那个词：这是种族灭绝，要求干预",
        note: "赌的是历史站在你这边。风险：当下的政治账当场结给你看。",
        base: 0.48, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "church", w: 0.3 }],
        outcomes: {
          crit: { body: "你是少数把那个词说上台面的人，教区与学院派把你传为样板。多年后回望，这页是你的勋章。", effects: { rep: 1.5, attr: { INTG: 2 }, fac: { church: 10, press: 5, establishment: -6 }, flags: ["old_school"] } },
          ok: { body: "你用了那个词，也被扣了「不懂外交」的帽子，两边各骂一半。", effects: { rep: 0.7, fac: { church: 6, establishment: -4 } } },
          meh: { body: "你的声明上了内页，决策圈纹丝不动。", effects: { rep: -0.3, fac: { establishment: -2 } } },
          fail: { body: "「索马里还没走干净，你又要往非洲送兵？」对手把这句话做成了广告脚本。", effects: { rep: -1.4, fac: { base: -6, military: -5 } } },
          critfail: { body: "你推动的制裁议案殃及本地港口就业，被点名成「为外国人的尸体砸美国人的饭碗」。", effects: { rep: -2.4, fac: { labor: -8, base: -6, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "relief", text: "谈人道不谈出兵：捐款、收容难民，把能做的做尽",
        note: "花人情办实事：救不了全局，但救得了一批人——账面上两边都不欠。",
        base: 0.55, cost: { fav: 1 }, mods: [{ src: "fac", key: "church", w: 0.35 }],
        outcomes: {
          crit: { body: "你募来的款和担保的签证救出了一个镇的人，教会和慈善圈把你当成「关键时刻能开口的人」。", effects: { rep: 1.2, fav: 1, fac: { church: 8, base: 5 } } },
          ok: { body: "收容站办起来了，钱募到一半，各方都夸了一半。", effects: { rep: 0.5, fac: { church: 4 } } },
          meh: { body: "你跑了几个场子，捐款袋里叮当作响，不多，不少。", effects: { rep: -0.2, fav: -1 } },
          fail: { body: "难民安置在本地卡了壳，你借出的人情两头不落好。", effects: { rep: -1.3, fac: { base: -5, church: -3 } } },
          critfail: { body: "一名收容对象牵连进一桩旧案，你的「善举」被重写成「引狼入室」。", effects: { rep: -2.2, fac: { press: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "silent", text: "写一封措辞温和的吊唁信，别的不碰",
        note: "最便宜的一张牌：不出声也是一种决定，只是没人替你记。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你的信被教会刊登出来，措辞恰好。什么都没发生，也没事发生。", effects: { rep: 0.3 } },
          ok: { body: "吊唁信发出去了，存档一份，无人提起。", effects: { rep: 0.2 } },
          meh: { body: "你连信都没写完，反正也没人催。", effects: {} },
          fail: { body: "难民团体想要一句更硬的话，你的温和被当面对质。", effects: { rep: -0.2, fac: { church: -3 } } },
          critfail: { body: "有记者翻出你这几个月的全部记录：空白。标题是「他当时在忙什么」。", effects: { rep: -0.3, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1994-11 · 「共和党革命」—— 四十年来在野一夜翻盘（风险面）
   * ==================================================================== */
  {
    id: "ln94_contract", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 1994, maxYear: 1994, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 11,
    title: "「与美国的契约」：中期选举一夜改朝",
    body: "反对党把一份百日立法纲领装订成册，冠以「与美国的契约」，顺着税怨与丑闻的余波横扫中期选举：执掌众院几十年的那一方，一夜丢掉多数党地位，参院也翻了色。\n" +
      "浪潮要么递给你一把椅子，要么把你埋进新多数的议程里。同一个票箱，你的名字也印在上面。\n" +
      "订契约的人若百日办不成事，账单会回摆到签名的人头上。",
    choices: [
      {
        id: "ride", text: "公开搭上「契约」：签承诺书，替新多数摇旗",
        note: "赌的是这浪会留下人。风险：潮水退了，名字在浪头上的最先渴死。",
        base: 0.52, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "你站上了新多数的名单，庆功会上你的座位在前排——下一次分配时，有人替你留了位子。", effects: { rep: 1.3, tier: 1, fac: { establishment: 8 } } },
          ok: { body: "你及时贴上浪潮，新班底记住了你的签名。", effects: { rep: 0.6, fac: { establishment: 5 } } },
          meh: { body: "签的人太多，你的名字混在一百页名单里。", effects: { rep: 0.1 } },
          fail: { body: "浪潮在本地翻了车，你签的承诺书被对手裱进广告，老同僚笑你「赌输了还倒贴」。", effects: { rep: -1.3, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "新多数百日无一事通过，你的签名成了「只会跟风」的证据，两头都记你一笔。", effects: { rep: -2.3, fac: { press: -6, establishment: -8 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "hold", text: "反过来：站到受冲击的那边，护住你的同僚与队伍",
        note: "赌的是败者记得谁没跑。风险：你押的是这条街上正在输的一方。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "败局里你没松手，幸存的同事和基层把你当「没跑的那个」。清算那天，名单上没你。", effects: { rep: 1.5, fac: { base: 12, establishment: 5 }, voters: { warm: 800 }, flags: ["loyal"] } },
          ok: { body: "你守住了队伍，虽然队伍正在缩小。", effects: { rep: 0.6, fac: { base: 6 }, voters: { warm: 200 }, flags: ["loyal"] } },
          meh: { body: "你留下了，没人当面谢你，也没人记得你留过。", effects: { rep: -0.1 } },
          fail: { body: "你护的是输的一方，资源从此绕着你走，连你的老选区都有人换台。", effects: { rep: -1.6, fac: { establishment: -5, base: -6 } } },
          critfail: { body: "浪潮把你也一起冲了：守旧的人两头不讨好，你的位子最先被「改革」掉。", effects: { rep: -2.5, fac: { base: -8, establishment: -8 }, fall: 1 } }
        }
      },
      {
        id: "fund", text: "两边都不押：自掏腰包把本地委员会建成独立山头",
        note: "钱开门：局外人也有牌桌。风险：钱见了底，牌桌上还没你的杯。",
        base: 0.5, cost: { fun: 2 }, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: { body: "两拨清算的人马都来敲门拉你——你那台独立机器，成了本地谁都绕不开的中间人。", effects: { rep: 1.4, fun: 3, fac: { commercial: 8, establishment: 4, base: 4 } } },
          ok: { body: "机器搭起来了，出价的人开始排队。钱花出去了，位置买回来一半。", effects: { rep: 0.5, fun: 1, fac: { commercial: 4 } } },
          meh: { body: "委员会挂牌，电话比从前多，支票比从前少。", effects: { rep: 0.1, fun: -2 } },
          fail: { body: "你两头下注两头不沾，钱烧完了，胜选的那头懒得谢你。", effects: { rep: -1.2, fun: -2.5, fac: { establishment: -4 } } },
          critfail: { body: "委员会的账目被翻出来做「独立山头」的丑闻文章，两头一起动手踩你。", effects: { rep: -2.2, fun: -3, fac: { press: -6, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "local", text: "不押全国赌注：守好自己这一亩三分地的议程",
        note: "浪不浪的与你无关：做小事实，攒小名声。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "潮退之后你还在岸上：本地的事一件件办完，谁当家都得跟你谈。", effects: { rep: 0.2, fac: { base: 3 } } },
          ok: { body: "你没蹭上风，也没吃浪花。安稳一年。", effects: { rep: 0.2 } },
          meh: { body: "全国在改朝换代，你在修水渠。谁都没想起你。", effects: { rep: 0.05 } },
          fail: { body: "新多数把本地项目列为「浪费样本」，你被点了名，好在没人真在乎。", effects: { rep: -0.2 } },
          critfail: { body: "你没站队也没做事，风头过后，两头都把你忘在名单末尾。", effects: { rep: -0.2, fac: { establishment: -2 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线按年条目 · 1991—1994（w01 名下年份；core.js 按字段深合并）
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "1991": 4,   // 海湾地面战与速胜、衰退回头、苏联解体
    "1992": 4,   // 洛杉矶暴动、大选年、经济怨气与第三党搅局
    "1993": 3,   // 新政府开局、世贸爆炸、韦科与摩加迪沙的连续挫败感
    "1994": 3    // 中期选举年（≥3）、北岭地震、卢旺达的沉默
  },
  brief: {
    "1991": "一场短而确定的战争，一个忽然消失的对手：胜利的气味弥漫，可加油站的队伍提醒每个人，繁荣的账单还没结清。",
    "1992": "旗子收起来了，钱包打开了：街上在烧、票箱在算账，每个客厅的电视里都站着一张新面孔。",
    "1993": "新总统带着一身答案进屋，发现屋子比计划大：爆炸、火光与坠机连着来，耐心比财政赤字先见底。",
    "1994": "街面恢复了平静，怒气汇进票箱：一个时代在地壳下移动，在一夜中期选举里见了底。"
  },
  outlets: {
    "1991": ["今日美国", "纽约时报", "华尔街日报", "有线电视新闻网", "哥伦比亚广播公司", "全国广播"],
    "1992": ["今日美国", "华盛顿邮报", "有线电视新闻网", "美国广播", "时代周刊", "新闻周刊"],
    "1993": ["今日美国", "纽约时报", "有线电视新闻网", "哥伦比亚广播公司", "华尔街日报"],
    "1994": ["今日美国", "彭博电视", "有线电视新闻网", "华盛顿邮报", "全国广播", "时代周刊"]
  }
});

/* ============================================================================
 * 定点锚 · 1991—1994（8 张新卡 + 复用的海湾存量卡，共 12 个定点）
 *   major 4 / mid 7 / minor 1 ≈ 1/3 大事件，约 3 个/年。
 * ==========================================================================*/
POTUS.define("fixed", [
  /* —— 1991 —— */
  { event: "gulf91_storm", year: 1991, month: 1, grade: "major" },     // 沙漠风暴开打（史实 1991-01）
  { event: "ln91_ussr", year: 1991, month: 12, grade: "major" },       // 苏联解体（1991-12）
  /* —— 1992 —— */
  { event: "gulf91_peace", year: 1992, month: 1, grade: "mid" },       // 和平红利之争（后冷战第一年）
  { event: "ln92_riots", year: 1992, month: 4, grade: "major" },       // 洛杉矶暴动（1992-04）
  { event: "gulf92_economy", year: 1992, month: 6, grade: "mid" },     // 经济与第三党搅局（1992 大选前哨）
  /* —— 1993 —— */
  { event: "ln93_wtc", year: 1993, month: 2, grade: "mid" },           // 世贸中心爆炸（1993-02）
  { event: "ln93_waco", year: 1993, month: 4, grade: "mid" },          // 韦科大火（1993-04）
  { event: "gulf93_talkradio", year: 1993, month: 9, grade: "minor" }, // 谈话电台的兴起（风味锚）
  { event: "ln93_somalia", year: 1993, month: 10, grade: "major" },    // 摩加迪沙黑鹰坠落（1993-10）
  /* —— 1994 —— */
  { event: "ln94_northridge", year: 1994, month: 1, grade: "mid" },    // 北岭地震（1994-01）
  { event: "ln94_rwanda", year: 1994, month: 4, grade: "mid" },        // 卢旺达大屠杀开始（1994-04）
  { event: "ln94_contract", year: 1994, month: 11, grade: "major" }    // 中期选举「共和党革命」（1994-11）
]);
