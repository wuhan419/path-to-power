/* ============================================================================
 * POTUS ENGINE · social.js
 * 赞助与反馈入口（纯静态、零依赖）。
 * 游戏本体完全离线、免费、无广告；这里只是给愿意支持作者的人留一个
 * 不挡路的通道：两张收款码 + 一个反馈邮箱。
 * 文案原则：客气、非强制——打赏与否，喜欢这个游戏本身就已经是最好的支持。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 反馈邮箱：主页与赞助弹窗共用这一个出口。 */
  P.SUPPORT_EMAIL = "contact-via-issues";

  /* 收款码随仓库分发在 assets/donate/ 下。金额随意，1 / 5 / 10 元都好。 */
  const QR = [
    { src: "assets/donate/alipay.jpg", label: "支付宝" },
    { src: "assets/donate/wechat.png", label: "微信支付" }
  ];

  /* 一个低调的按钮：主页与游玩页的操作栏都用它唤起赞助弹窗。 */
  P.supportButtonHTML = function () {
    return '<button class="btn btn-support" onclick="POTUS.openSupport()">支持作者</button>';
  };

  /* 赞助 / 反馈弹窗：复用通用 .modal 版式，两张收款码 + 客气话 + 反馈邮箱。 */
  P.openSupport = function () {
    P.closeModal();
    if (typeof document === "undefined" || !document.body) return;
    const cards = QR.map(function (q) {
      return '<figure class="qrcard"><img class="qr-zoom" src="' + q.src + '" alt="' + q.label + '收款码" loading="lazy" ' +
        'title="点击放大" onclick="POTUS.zoomQR(\'' + q.src + '\',\'' + q.label + '\')">' +
        '<figcaption class="qr-cap">' + q.label + ' · 点击放大</figcaption></figure>';
    }).join("");
    const mask = document.createElement("div");
    mask.className = "modal donatebox";
    mask.id = "supportModal";
    mask.setAttribute("onclick", "if(event.target===this)POTUS.closeModal()");
    mask.innerHTML = '<div class="box">' +
      '<h3>支持作者</h3>' +
      '<p class="donate-lede">这是一份免费的文字模拟游戏，没有广告、也不需要联网。' +
      '如果它给了你几个还不错的下午，可以扫下面的码打赏一杯咖啡——1 元、5 元、10 元都好，全凭自愿。' +
      '<b>不打赏也完全没关系，你喜欢这个游戏，就已经是最好的支持了。</b></p>' +
      '<div class="qrgrid">' + cards + "</div>" +
      '<p class="donate-email">遇到问题、想聊剧情或报 bug，欢迎写信到 ' +
      '<a class="link" href="mailto:' + P.SUPPORT_EMAIL + '">' + P.SUPPORT_EMAIL + "</a>。</p>" +
      '<div class="donate-foot"><button class="btn" onclick="POTUS.closeModal()">关闭</button></div>' +
      "</div>";
    document.body.appendChild(mask);
  };

  /* 点开收款码：放大到接近原始尺寸的灯箱，方便手机对准或长按保存后扫码。 */
  P.zoomQR = function (src, label) {
    if (typeof document === "undefined" || !document.body) return;
    P.closeZoom();
    const box = document.createElement("div");
    box.className = "modal qrzoom";
    box.id = "qrZoom";
    box.setAttribute("onclick", "POTUS.closeZoom()");
    box.innerHTML = '<div class="qrzoom-inner">' +
      '<img src="' + src + '" alt="' + label + '收款码（大图）">' +
      '<div class="qrzoom-cap">' + label + ' · 长按图片或截图后即可扫码 · 点击任意处关闭</div>' +
      "</div>";
    document.body.appendChild(box);
  };
  P.closeZoom = function () {
    if (typeof document === "undefined" || !document.getElementById) return;
    const m = document.getElementById("qrZoom");
    if (m && m.parentNode) m.parentNode.removeChild(m);
  };

  /* 关掉当前弹窗。赞助框优先按 id 关闭，退回关闭页面上任何一个 .modal。 */
  P.closeModal = function () {
    if (typeof document === "undefined" || !document.querySelector) return;
    let m = document.getElementById("supportModal");
    if (!m) m = document.querySelector(".modal");
    if (m && m.parentNode) m.parentNode.removeChild(m);
  };
})();
