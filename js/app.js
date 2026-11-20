(function () {
  "use strict";

  /* ================= 데이터 ================= */
  var MIN = { 2026: 10320, 2027: 10700 };
  var GOALS = {
    "여행":   { e: "✈️", d: "가고 싶은 곳이 있어", ex: "오사카 3박 4일",
               items: [["교통·항공","✈️"],["숙소","🏨"],["식비","🍜"],["쇼핑","🛍️"],["액티비티","🎡"],["카페·간식","🍦"]] },
    "쇼핑":   { e: "🛍️", d: "갖고 싶은 게 있어", ex: "새 노트북",
               items: [["패션","👟"],["전자기기","💻"],["뷰티","💄"],["선물","🎁"],["인테리어","🪴"],["액세서리","💍"]] },
    "취미":   { e: "🎨", d: "좋아하는 걸 더 오래", ex: "나의 취미",
               subs: {
                 "운동":      { e: "🏋️", ex: "헬스 3개월", items: [["회원권·이용료","🎫"],["레슨·PT","🧑‍🏫"],["운동복·신발","👟"],["장비·용품","🏸"],["대회·참가비","🏅"],["간식·보충제","🥤"]] },
                 "음악·악기": { e: "🎸", ex: "기타 배우기", items: [["악기 구입","🎸"],["레슨비","🧑‍🏫"],["음향 장비","🎧"],["악보·교재","📒"],["연습실 대여","🎙️"],["공연 참가비","🎤"]] },
                 "미술·공예": { e: "🎨", ex: "도자기 클래스", items: [["재료비","🎨"],["도구","🧰"],["클래스 수강료","🧑‍🏫"],["작업 공간","🏠"],["전시 관람","🖼️"],["포장·배송","📦"]] },
                 "공연·전시": { e: "🎫", ex: "콘서트 보러 가기", items: [["티켓","🎫"],["교통비","🚌"],["숙소","🏨"],["굿즈·앨범","🛍️"],["식비","🍔"],["기념품","📸"]] },
                 "사진·영상": { e: "📸", ex: "카메라 장만", items: [["카메라·렌즈","📷"],["촬영 장비","🧳"],["편집 프로그램","🖥️"],["저장장치","💾"],["클래스","🧑‍🏫"],["출사 교통비","🚌"]] },
                 "게임·콘텐츠": { e: "🎮", ex: "새 게임 사기", items: [["게임 구매","🎮"],["인게임 결제","💎"],["기기·주변기기","🕹️"],["헤드셋·장비","🎧"],["구독 서비스","📺"],["굿즈","🛍️"]] },
                 "독서·공부": { e: "📚", ex: "자격증 공부", items: [["책·교재","📚"],["강의·클래스","🧑‍🏫"],["시험 응시료","📝"],["스터디카페","☕"],["학습 구독","💻"],["문구","✏️"]] },
                 "그 밖의 취미": { e: "✨", ex: "나의 취미", items: [["수강료","🧑‍🏫"],["장비·도구","🧰"],["재료·소모품","🎨"],["이용권","🎫"],["교통비","🚌"],["굿즈·기념품","🛍️"]] }
               } },
    "생활비": { e: "🏠", d: "매달 쓸 돈이 필요해", ex: "한 달 생활비",
               items: [["월세·관리비","🏠"],["식비","🍚"],["교통비","🚌"],["통신비","📱"],["구독","📺"],["용돈","☕"]] },
    "저축":   { e: "🐷", d: "일단 모아 두고 싶어", ex: "비상금 모으기",
               items: [["비상금","🚨"],["등록금·학비","🎓"],["자격증·면허","🪪"],["독립 자금","🔑"],["여행 자금","✈️"],["사고 싶은 것","🎁"]] },
    "기타":   { e: "✨", d: "나만의 새로운 목표", ex: "나의 목표",
               items: [["필요한 물건","🛒"],["이용료·수강료","🎫"],["교통비","🚌"],["식비","🍚"],["선물","💝"],["수수료·예비비","🧾"]] }
  };
  var GOAL_ORDER = ["여행", "쇼핑", "취미", "생활비", "저축", "기타"];
  var CARD = {
    "여행":   { eng: "TRAVEL",   bg: "linear-gradient(140deg,#FFCEA8,#FFE9D9)", p: "M3 12h18M5 12l5-7 2 4 2-4 5 7M6 12l-2 6h16l-2-6M9 18v-3m6 3v-3" },
    "쇼핑":   { eng: "SHOPPING", bg: "linear-gradient(140deg,#E8D9FF,#F6EAFE)", p: "M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2" },
    "취미":   { eng: "HOBBY",    bg: "linear-gradient(140deg,#D4F1E7,#EFF9E9)", p: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" },
    "생활비": { eng: "DAILY",    bg: "linear-gradient(140deg,#FFEFD0,#FFF8E3)", p: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" },
    "저축":   { eng: "SAVINGS",  bg: "linear-gradient(140deg,#DBEAFF,#EFF4FF)", p: "M5 10c1-3 4-5 8-5 4 0 7 3 7 7v4a6 6 0 0 1-6 6H8a6 6 0 0 1-5-6v-4h2zm10-3V4h4M7 14h.01M12 10h4" },
    "기타":   { eng: "OTHER",    bg: "linear-gradient(140deg,#FFDCE6,#FFF0EF)", p: "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" }
  };
  function mcard(k, on) {
    var c = CARD[k];
    return '<button type="button" class="mcard" data-goal="' + k + '" aria-pressed="' + (on ? "true" : "false") + '" style="--card:' + c.bg + '">' +
      '<span class="eng">' + c.eng + '</span><span class="art"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + c.p + '"/></svg></span>' +
      '<span class="meta"><span><b>' + k + "</b><small>" + GOALS[k].d + '</small></span><span class="go">→</span></span></button>';
  }
  var GROUPS = [
    { k: "talk",   e: "💬", t: "사람 만나는 일", d: "대화하고 도와주는 게 즐거워", why: "사람 만나는 걸 좋아하는",
      jobs: [["카페·음료","☕","음료 제조, 주문 받기","카페"],["매장 판매","🛍️","의류·화장품 매장 응대","매장 판매"],["음식점 서빙","🍽️","서빙, 손님 응대","서빙"]] },
    { k: "focus",  e: "🎧", t: "혼자 집중하는 일", d: "조용히 내 할 일에 집중하는 편", why: "집중하는 걸 좋아하는",
      jobs: [["편의점","🏪","계산, 진열, 재고 정리","편의점"],["사무보조","🗂️","문서 정리, 데이터 입력","사무보조"],["학원 보조","📚","수업 보조, 채점","학원 보조"]] },
    { k: "active", e: "⚡", t: "몸 쓰는 일", d: "가만히 있는 것보다 움직이는 게 좋아", why: "활동적인",
      jobs: [["물류·상하차","📦","분류·포장, 체력 필요","물류"],["행사 스태프","🎪","공연·축제 진행, 단기","행사 스태프"],["주방 보조","🍳","조리 보조, 설거지","주방보조"]] }
  ];
  var MIX = { k: "mix", e: "🎲", t: "아직 잘 모르겠어", d: "해 보면서 찾고 싶어" };
  var REGIONS = ["서울","경기","인천","부산","대구","광주","대전","울산","세종","강원","충북","충남","전북","전남","경북","경남","제주"];
  var WAGES = [
    { k: "m26", t: "2026 최저", v: MIN[2026] }, { k: "m27", t: "2027 최저", v: MIN[2027] },
    { k: "w11", t: "11,000원", v: 11000 }, { k: "w12", t: "12,000원", v: 12000 }, { k: "custom", t: "직접 입력" }
  ];
  var DEDUCT = [
    { k: "none", t: "안 뗌", s: "세전 그대로", r: 0 },
    { k: "biz",  t: "3.3%", s: "사업소득", r: 0.033 },
    { k: "ins",  t: "4대보험", s: "약 9.7%", r: 0.097 }
  ];
  var IOS = "https://apps.apple.com/kr/app/id382535825";
  var AOS = "https://play.google.com/store/search?q=%EC%95%8C%EB%B0%94%EB%AA%AC&c=apps";

  /* ================= 상태 ================= */
  function fresh() {
    return {
      goals: [], draft: null, editIdx: -1,
      style: "", jobs: [], region: "", days: 0, hours: 0,
      wage: new Date().getFullYear() >= 2027 ? "m27" : "m26", custom: 11000, deduct: "none", juhyu: true,
      no: String(Math.floor(1000 + Math.random() * 9000)), issued: new Date(), active: "r2", lastHours: null
    };
  }
  var S = fresh();
  var view = "cover";
  var FLOW1 = ["g-type", "g-amount", "g-split"];
  var FLOW2 = ["s2-style", "s2-jobs", "s2-region", "s2-time"];

  /* ================= 도구 ================= */
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return Math.round(n).toLocaleString("ko-KR"); };
  var won = function (n) { return fmt(n) + "원"; };
  var num = function (s) { var v = parseInt(String(s).replace(/[^0-9]/g, ""), 10); return isNaN(v) ? 0 : v; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  function ymd(d) { return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0"); }
  function hm(d) { return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function track(n, p) { try { if (window.GA_ID) gtag("event", n, p || {}); } catch (e) {} }
  function toast(msg) { var t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2500); }
  function sumItems(g) { return g.items.reduce(function (a, it) { return a + (it.amount || 0); }, 0); }
  function total() { return S.goals.reduce(function (a, g) { return a + g.amount; }, 0); }
  function subOf(g) { var G = GOALS[g.type]; return G.subs ? G.subs[g.sub] : null; }
  function presetFor(g) { var sb = subOf(g); return sb ? sb.items : (GOALS[g.type].subs ? GOALS[g.type].subs["그 밖의 취미"].items : GOALS[g.type].items); }
  function exOf(g) { var sb = subOf(g); return sb ? sb.ex : GOALS[g.type].ex; }
  function typeLabel(g) { return g.type + (g.sub ? " · " + g.sub : ""); }
  function goalLabel(g) { return g.name || exOf(g); }
  function allJobs() { var a = []; GROUPS.forEach(function (g) { g.jobs.forEach(function (j) { a.push(j); }); }); return a; }
  function jobInfo(name) { return allJobs().filter(function (j) { return j[0] === name; })[0]; }
  function minHours(amount) { return Math.ceil(amount / MIN[2026]); }
  function txNo() { return ymd(S.issued).replace(/\./g, "") + "-" + S.no; }

  /* ================= 계산 ================= */
  function wageVal() { if (S.wage === "custom") return Math.max(1000, S.custom || 0); return WAGES.filter(function (w) { return w.k === S.wage; })[0].v; }
  function wageName() { var w = WAGES.filter(function (x) { return x.k === S.wage; })[0]; return S.wage === "custom" ? "직접 입력" : (S.wage.charAt(0) === "m" ? w.t + "임금" : "희망 시급"); }
  function calc() {
    var base = wageVal(), weekly = S.days * S.hours;
    var juhyuOk = weekly >= 15;
    var holiday = (S.juhyu && juhyuOk) ? Math.min(weekly, 40) / 40 * 8 : 0;
    var gross = weekly ? base * (weekly + holiday) / weekly : base;
    var rate = DEDUCT.filter(function (d) { return d.k === S.deduct; })[0].r;
    var net = gross * (1 - rate);
    var tot = total();
    var hours = Math.ceil(tot / net);
    var weeks = weekly ? Math.ceil(hours / weekly) : 0;
    var end = new Date(); end.setDate(end.getDate() + weeks * 7);
    return { base: base, weekly: weekly, juhyuOk: juhyuOk, holiday: holiday, plusHr: gross - base, gross: gross, rate: rate, minusHr: gross * rate,
             net: net, total: tot, hours: hours, weeks: weeks, months: Math.max(0.1, Math.round(weeks / 4.345 * 10) / 10), end: end,
             monthly: net * weekly * 4.345 };
  }
  function albamonUrl(job) {
    var w = [S.region]; var ji = job && jobInfo(job); if (ji) w.push(ji[3]);
    return "https://www.albamon.com/total-search?keyword=" + encodeURIComponent(w.join(" ").trim());
  }

  /* ================= 바코드 SVG ================= */
  function barcode(seed) {
    var h = 0, s = String(seed); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    var x = 0, bars = "", W = 300;
    bars += '<rect x="0" y="0" width="2" height="56"/><rect x="4" y="0" width="2" height="56"/>'; x = 9;
    while (x < W - 10) {
      h = (h * 1103515245 + 12345) >>> 0;
      var w = 1 + (h >>> 8) % 3, gap = 1 + (h >>> 12) % 3;
      bars += '<rect x="' + x + '" y="0" width="' + w + '" height="56"/>'; x += w + gap;
    }
    bars += '<rect x="' + (W - 6) + '" y="0" width="2" height="56"/><rect x="' + (W - 2) + '" y="0" width="2" height="56"/>';
    return '<svg viewBox="0 0 300 56" preserveAspectRatio="none" fill="#16171B" aria-hidden="true">' + bars + "</svg>";
  }

  /* ================= 공통 조각 ================= */
  function qhead(flow, part) {
    var i = flow.indexOf(view), bars = "";
    for (var k = 0; k < flow.length; k++) bars += '<i class="' + (k < i ? "on" : k === i ? "now" : "") + '"></i>';
    return '<div class="qtop"><span class="part ' + (part === 2 ? "p2" : "") + '">' + (part === 1 ? "🧾 PART 1 · 목표 담기" : "🗓️ PART 2 · 알바 계획") + '</span>' +
      '<span class="qnum"><b>' + String(i + 1).padStart(2, "0") + "</b> / " + String(flow.length).padStart(2, "0") + "</span></div>" +
      '<div class="bars">' + bars + "</div>";
  }
  function qhero(emoji, q, sub) {
    return '<div class="qhero"><div class="q-emoji">' + emoji + '</div><h1 class="question">' + q + "</h1>" + (sub ? '<p class="sub">' + sub + "</p>" : "") + "</div>";
  }
  function opt(attr, val, emoji, title, desc, on) {
    return '<button type="button" class="opt" data-' + attr + '="' + esc(val) + '" aria-pressed="' + (on ? "true" : "false") + '">' +
      '<span class="ico">' + emoji + '</span><span class="tx"><b>' + esc(title) + "</b>" + (desc ? "<small>" + esc(desc) + "</small>" : "") +
      '</span><span class="rd">' + (on ? "✓" : "") + "</span></button>";
  }
  function dock(nextLabel, ok, opts) {
    opts = opts || {};
    $("dock").innerHTML = '<div class="dock">' + (opts.noBack ? "" : '<button type="button" class="back" data-act="prev" aria-label="이전">←</button>') +
      '<button type="button" class="next" data-act="next" ' + (ok ? "" : "disabled") + "><span>" + nextLabel + '</span><span class="ar">→</span></button></div>';
  }
  function setNext(ok) { var n = document.querySelector(".dock .next"); if (n) n.disabled = !ok; }
  function doneHead(title, sub) {
    return '<div class="done"><div class="chk"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg></div><h2>' + title + "</h2><p>" + sub + "</p></div>";
  }
  function slider(id, badge, emoji, title, sub, amount, q, label) {
    return '<div class="slide-card"><span class="sc-badge">✓ ' + badge + "</span>" +
      '<div class="sc-row"><span class="e">' + emoji + '</span><span class="tx"><b>' + esc(title) + "</b><small>" + esc(sub) + '</small></span><span class="amt">' + amount + "</span></div>" +
      '<div class="sc-hr"></div><p class="sc-q">' + q + "</p>" +
      '<div class="slider" data-slider="' + id + '"><div class="fill"></div><button type="button" class="knob" aria-label="' + esc(label) + '">»</button><span class="lab"><span class="shine">' + label + "</span></span></div>";
  }
  function stores(dark) {
    var apple = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><rect x="10" y="18" width="4" height="1.6" rx=".8" fill="#fff"/></svg>';
    var play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5v17l9-8.5z" fill="#FF8F45"/><path d="M5 3.5l12 7-3 2z" fill="#16171B"/><path d="M5 20.5l12-7-3-2z" fill="#E9520A"/><path d="M17 10.5l3 1.5-3 1.5-3-1.5z" fill="#FFB27A"/></svg>';
    return '<div class="stores">' +
      '<a class="store" href="' + IOS + '" target="_blank" rel="noopener" data-track="app_ios">' + apple + "<span><small>iPhone에서 받기</small><b>App Store</b></span></a>" +
      '<a class="store" href="' + AOS + '" target="_blank" rel="noopener" data-track="app_aos">' + play + "<span><small>Android에서 받기</small><b>Google Play</b></span></a></div>";
  }
  function footer() {
    return '<div class="foot">' +
      "대학 팀 프로젝트로 만든 체험용 사이트이며, 알바몬 공식 서비스가 아니에요.<br>계산은 단순 예상치예요. 실제 급여와 공제는 근로계약에 따라 달라요.</div>";
  }

  /* ================= 화면 ================= */
  function render() {
    var el = $("screen");
    $("dock").innerHTML = ""; $("topRight").innerHTML = "";
    document.body.dataset.bg = view === "cover" ? "cover" : (FLOW1.indexOf(view) > -1 || view === "cart" || view === "r1") ? "s1" : FLOW2.indexOf(view) > -1 ? "s2" : "final";
    el.className = ""; void el.offsetWidth; el.className = "screen";
    var fn = VIEWS[view];
    try { el.innerHTML = fn(); } catch (err) { if (window.__showErr) window.__showErr("화면(" + view + ") 그리기 실패: " + err.message); throw err; }
    window.scrollTo(0, 0);
    if (AFTER[view]) AFTER[view]();
    shownVisits = 0; showVisits(view === "cover");
  }
  var VIEWS = {}, AFTER = {};

  /* --- 시작 --- */
  VIEWS.cover = function () {
    
    return '<section class="hero">' +
      '<div class="kicker">내 목표의 가격은</div><div class="bigword">몇 시간?</div>' +
      '<div class="stage">' +
        '<div class="paper-3d"><div class="t">알바 영수증</div>' +
          '<div class="l"><span>✈️ 오사카 여행</span><span>800,000</span></div><div class="l s"><span>항공·숙소</span><span>520,000</span></div><div class="l s"><span>먹방·쇼핑</span><span>280,000</span></div>' +
          '<div class="l"><span>🎧 헤드폰</span><span>359,000</span></div>' +
          '<hr><div class="tot"><span>결제 수단: 시간</span><b>113h</b></div><div class="bc"></div></div>' +
        '<div class="stat st1 dark"><span class="si">⏱</span><b>113시간</b><small>최저시급 기준</small></div>' +
        '<div class="stat st2"><span class="si">🧾</span><b>2장</b><small>목표 + 계획 영수증</small></div>' +
        '<span class="sticker" style="right:22px;top:6px">🪙</span><span class="sticker" style="left:30px;bottom:26px;animation-delay:.6s">👟</span><span class="sticker" style="right:46px;bottom:4px;animation-delay:1.1s">☕</span>' +
      "</div>" +
      '<h1>사고 싶은 것, 가고 싶은 곳<br><span class="u">알바 몇 시간</span>이면 될까?</h1>' +
      "<p>목표를 장바구니에 담으면 영수증이 나와요.<br>결제는 돈 대신 <b>내 시간</b>으로 계산해 드려요.</p>" + stores() +
      "</section>" +
      '<div class="dock dock-inline"><button type="button" class="next" data-act="next"><span>영수증 뽑으러 가기</span><span class="ar">→</span></button></div>' +
      '<div class="people"><span class="pl">참여자 수</span><b><span id="peopleNum">' + (visits == null ? "···" : fmt(visits)) + '</span><small>명</small></b><span class="ps">지금까지 영수증을 뽑으러 온 사람</span></div>' +
      '<div class="howto"><div class="glass"><span>🛒</span>목표 담기</div><div class="glass"><span>🧾</span>영수증 받기</div><div class="glass"><span>🗓️</span>알바 계획</div></div>' +
      footer();
  };

  /* --- PART1 Q1 목표 종류 --- */
  VIEWS["g-type"] = function () {
    if (!S.draft) S.draft = { type: "", sub: "", name: "", amount: 0, items: [] };
    dock("다음", !!S.draft.type);
    var multi = S.goals.length ? '<p class="sub">지금 담은 목표 ' + S.goals.length + "개 · 하나 더 골라 주세요</p>" : "";
    return '<div class="qwrap">' + qhead(FLOW1, 1) + qhero("🛒", S.goals.length ? "다음으로 담을<br><span class=\"hl\">목표</span>는 뭐야?" : "알바해서 제일<br><span class=\"hl\">하고 싶은 건</span> 뭐야?", "") + multi.replace('class="sub"', 'class="sub" style="text-align:center;margin:-12px 0 14px"') +
      '<div class="market' + (S.draft.type ? " has-pick" : "") + '">' + GOAL_ORDER.map(function (k) { return mcard(k, S.draft.type === k); }).join("") + "</div></div>";
  };

  /* --- PART1 Q2 금액 --- */
  VIEWS["g-amount"] = function () {
    var g = S.draft, G = GOALS[g.type];
    dock("다음", amountOk());
    var subs = G.subs ? '<div class="field" style="margin-bottom:12px"><label>어떤 취미야?</label><div class="cgrid">' + Object.keys(G.subs).map(function (k) {
        return '<button type="button" class="chip o" data-sub="' + esc(k) + '" aria-pressed="' + (g.sub === k) + '" style="padding:9px 2px;font-size:12px;display:grid;gap:1px"><span style="font-size:20px">' + G.subs[k].e + "</span>" + esc(k) + "</button>"; }).join("") + "</div></div>" : "";
    return '<div class="qwrap">' + qhead(FLOW1, 1) + qhero(G.e, "그 " + g.type + ", <span class=\"hl\">얼마</span>면 될까?", G.subs ? "취미 종류를 고르면 거기에 맞는 쓸 곳을 보여줄게요" : "대충이라도 괜찮아요. 나중에 바꿀 수 있어요") + subs +
      '<div class="field" style="margin-bottom:10px"><label for="gName">목표 이름 <span style="color:var(--muted);font-weight:500">(선택)</span></label><input class="inp" id="gName" maxlength="20" placeholder="예: ' + esc(exOf(g)) + '" value="' + esc(g.name) + '"></div>' +
      '<div class="glass bigmoney"><span class="cap">필요한 금액</span><div class="row"><input id="gAmt" inputmode="numeric" autocomplete="off" placeholder="0" value="' + (g.amount ? fmt(g.amount) : "") + '" aria-label="필요한 금액"><span class="won">원</span></div>' +
      '<span class="tag-o" id="amtHint">' + amtHint(g.amount) + "</span></div>" +
      '<div class="chips" style="justify-content:center;margin-top:12px">' +
        [["+1만", 10000], ["+5만", 50000], ["+10만", 100000], ["+50만", 500000]].map(function (c) { return '<button type="button" class="chip" data-add="' + c[1] + '">' + c[0] + "</button>"; }).join("") +
        '<button type="button" class="chip" data-add="0">↺</button></div></div>';
  };
  function amountOk() { var g = S.draft; return g.amount > 0 && (!GOALS[g.type].subs || !!g.sub); }
  function amtHint(a) { return a > 0 ? "⏱ 최저시급이면 약 " + fmt(minHours(a)) + "시간어치" : "💡 금액을 넣으면 몇 시간어치인지 알려 줄게요"; }
  AFTER["g-amount"] = function () { var i = $("gAmt"); if (i && !S.draft.amount) try { i.focus({ preventScroll: true }); } catch (e) {} };

  /* --- PART1 Q3 세부 계획 쪼개기 --- */
  VIEWS["g-split"] = function () {
    var g = S.draft, G = GOALS[g.type];
    dock("장바구니에 담기", sumItems(g) <= g.amount);
    return qhead(FLOW1, 1) + qhero("🧩", "<span class=\"hl\">" + esc(g.amount ? won(g.amount) : "") + "</span>,<br>어디에 쓸 거야?", "쓸 곳을 골라 금액을 나눠 보세요. 안 정한 돈은 '기타'로 남겨 둬요") +
      '<div class="glass split-head"><div class="sh-row"><span class="ico">' + G.e + '</span><span><b>' + esc(goalLabel(g)) + "</b><small>" + esc(typeLabel(g)) + '</small></span><span class="amt">' + won(g.amount) + "</span></div>" +
      '<div class="alloc" id="alloc"></div><div class="alloc-legend" id="allocLegend"></div></div>' +
      '<div class="sec-label">쓸 곳 고르기 <small>여러 개 골라도 돼요</small></div>' +
      '<div class="preset">' + presetFor(g).map(function (it) {
        var on = g.items.some(function (x) { return x.label === it[0]; });
        return '<button type="button" class="chip o" data-preset="' + esc(it[0]) + '" data-emoji="' + it[1] + '" aria-pressed="' + on + '"><span class="e">' + it[1] + "</span>" + esc(it[0]) + "</button>";
      }).join("") + "</div>" +
      '<div class="sec-label">금액 나누기 <small>목표 금액 안에서 쪼개요</small></div>' +
      '<div class="items" id="items"></div>' +
      '<button type="button" class="chip" data-act="custom-item" style="margin-top:10px;width:100%;border-style:dashed">＋ 직접 추가하기</button>' +
      '<div id="warnBox" style="margin-top:10px"></div>';
  };
  AFTER["g-split"] = function () { drawItems(); };
  var PALETTE = ["#FF6B1A", "#FF8F45", "#FFB27A", "#E9520A", "#FFCFA8", "#C9440A", "#FFA060"];
  function drawItems() {
    var g = S.draft, box = $("items"); if (!box) return;
    box.innerHTML = g.items.map(function (it, i) {
      return '<div class="item" data-i="' + i + '"><span class="e">' + it.emoji + '</span><input class="nm" data-k="label" value="' + esc(it.label) + '" maxlength="14" aria-label="항목 이름" placeholder="항목 이름">' +
        '<span class="mi"><input data-k="amount" inputmode="numeric" placeholder="0" value="' + (it.amount ? fmt(it.amount) : "") + '" aria-label="' + esc(it.label) + ' 금액"><span>원</span></span>' +
        '<button type="button" class="x" data-rm="' + i + '" aria-label="삭제">×</button></div>';
    }).join("") + '<div class="item etc"><span class="e">📦</span><span class="nm">기타 (아직 안 정한 돈)</span><span class="val" id="etcVal"></span></div>';
    updateAlloc();
  }
  function updateAlloc() {
    var g = S.draft, used = sumItems(g), left = g.amount - used;
    var bar = g.items.map(function (it, i) { return it.amount ? '<span style="width:' + (it.amount / Math.max(g.amount, used) * 100) + "%;background:" + PALETTE[i % PALETTE.length] + '"></span>' : ""; }).join("");
    $("alloc").innerHTML = bar;
    $("allocLegend").innerHTML = "<span>나눈 돈 <b>" + won(used) + '</b></span><span class="left">' + (left >= 0 ? "기타로 남는 돈 <b>" + won(left) + "</b>" : '<b style="color:var(--red)">' + won(-left) + " 초과</b>") + "</span>";
    $("etcVal").textContent = left >= 0 ? won(left) : "0원";
    $("warnBox").innerHTML = left < 0 ? '<div class="warn"><span>목표 금액보다 ' + won(-left) + " 많아요</span><button type=\"button\" data-act=\"raise\">목표를 " + won(used) + "으로</button></div>" : "";
    setNext(left >= 0);
  }

  /* --- 장바구니 --- */
  VIEWS.cart = function () {
    dock("영수증 발행하기", S.goals.length > 0, { noBack: true });
    var t = total();
    return '<div class="qtop"><span class="part">🛒 내 목표 장바구니</span><span class="qnum"><b>' + S.goals.length + "</b> / 03</span></div>" +
      qhero("🛒", "장바구니에 <span class=\"hl\">담겼어요!</span>", "목표를 더 담으면 영수증에 대분류가 하나씩 늘어나요") +
      '<div class="cart">' + S.goals.map(function (g, i) {
        var G = GOALS[g.type], left = g.amount - sumItems(g);
        var det = g.items.length ? "세부 " + g.items.length + "개" + (left > 0 ? " · 기타 " + won(left) : "") : "세부 항목 없음 · 전부 기타";
        return '<div class="glass cart-item"><span class="ico">' + G.e + '</span><span class="tx"><b>' + esc(goalLabel(g)) + "</b><small>" + esc(typeLabel(g)) + " · " + det + "</small></span>" +
          '<span><div class="amt">' + won(g.amount) + '</div><div class="acts"><button type="button" class="mini" data-edit="' + i + '">수정</button><button type="button" class="mini del" data-del="' + i + '">삭제</button></div></span></div>';
      }).join("") +
      '<button type="button" class="add-goal" data-act="add-goal" ' + (S.goals.length >= 3 ? "disabled" : "") + ">" + (S.goals.length >= 3 ? "목표는 3개까지 담을 수 있어요" : "＋ 목표 더 담기") + "</button>" +
      (S.goals.length ? '<div class="cart-total"><span><small>합계 · 최저시급이면</small>약 ' + fmt(minHours(t)) + '시간어치</span><b>' + won(t) + "</b></div>" : "") + "</div>";
  };

  /* --- 영수증 1: 목표 주문서 --- */
  function receipt1(print) {
    var t = total();
    return '<div class="receipt' + (print ? " print" : "") + '" id="rc1">' +
      '<div class="rc-head"><div class="logo">🧾 알바 <em>영수증</em></div><span class="kind">목표 주문서</span><span class="meta2">No. ' + txNo() + " · " + ymd(S.issued) + " " + hm(S.issued) + "</span></div>" +
      '<hr class="rc-dash"><div class="rc-sec">ITEMS · 담은 목표 ' + S.goals.length + "개</div>" +
      S.goals.map(function (g) {
        var left = g.amount - sumItems(g);
        return '<div class="rc-goal"><div class="main"><b>' + GOALS[g.type].e + " " + g.type + '</b><span class="p">' + fmt(g.amount) + "</span></div>" +
          '<div class="nm">' + esc(goalLabel(g)) + (g.sub ? " · " + esc(g.sub) : "") + "</div>" +
          g.items.filter(function (it) { return it.amount > 0; }).map(function (it) { return '<div class="rc-opt"><span>' + it.emoji + " " + esc(it.label) + "</span><span>" + fmt(it.amount) + "</span></div>"; }).join("") +
          (left > 0 && g.items.some(function (it) { return it.amount > 0; }) ? '<div class="rc-opt etc"><span>📦 기타(미정)</span><span>' + fmt(left) + "</span></div>" : "") + "</div>";
      }).join("") +
      '<hr class="rc-dash"><div class="rc-line"><span>목표 수</span><span>' + S.goals.length + "개</span></div>" +
      '<div class="rc-total"><span>합계</span><b>' + won(t) + "</b></div>" +
      '<div class="rc-convert"><span>💡 ' + "2026 최저시급(" + fmt(MIN[2026]) + "원)으로 계산하면</span><b>약 " + fmt(minHours(t)) + "시간</b></div>" +
      '<button type="button" class="barcode-btn" data-act="barcode" data-r="1" aria-label="바코드 서비스 열기">' + barcode(txNo() + "A") + '<span class="num">' + txNo().replace("-", " ") + ' A</span><span class="hint">👆 바코드를 눌러 보세요 · 환불·교환 가능</span></button>' +
      '<div class="rc-foot">결제 수단: 아직 미정 → PART 2에서 결정<br>THANK YOU · 이 영수증은 목표 달성까지 보관하세요</div></div>';
  }
  VIEWS.r1 = function () {
    var t = total(), first = S.goals[0];
    return doneHead("목표 영수증이 발행됐어요!", "목표 " + S.goals.length + "개 · 합계 " + won(t)) +
      '<div class="printer"></div><div class="feed">' + receipt1(true) + "</div>" +
      slider("plan", "목표 주문 완료", GOALS[first.type].e, S.goals.length > 1 ? goalLabel(first) + " 외 " + (S.goals.length - 1) + "개" : goalLabel(first), "결제 대기 중 · 약 " + fmt(minHours(t)) + "시간", won(t),
        "이 영수증, <b>어떻게 일해서</b> 결제할까?", "밀어서 알바 계획 세우기") + "</div>" +
      '<button type="button" class="edit-link" data-act="to-cart">목표 수정하기</button>';
  };

  /* --- PART2 Q1 일하는 방식 --- */
  VIEWS["s2-style"] = function () {
    dock("다음", !!S.style);
    return '<div class="qwrap">' + qhead(FLOW2, 2) + qhero("🤔", "일할 때 어떤 쪽이<br><span class=\"hl\">더 끌려?</span>", "잘하는 일을 몰라도 괜찮아요. 끌리는 쪽이면 돼요") +
      '<div class="olist">' + GROUPS.concat([MIX]).map(function (g) { return opt("style", g.k, g.e, g.t, g.d, S.style === g.k); }).join("") + "</div></div>";
  };

  /* --- PART2 Q2 직종 (추천 묶음 강조) --- */
  VIEWS["s2-jobs"] = function () {
    dock("다음", S.jobs.length > 0);
    var rec = GROUPS.filter(function (g) { return g.k === S.style; })[0];
    var others = GROUPS.filter(function (g) { return g !== rec; });
    function jobBtns(g) { return g.jobs.map(function (j) { return opt("job", j[0], j[1], j[0], j[2], S.jobs.indexOf(j[0]) > -1); }).join(""); }
    var h = '<div class="qwrap" style="justify-content:flex-start">' + qhead(FLOW2, 2) + qhero("🔎", "해 보고 싶은 일을<br><span class=\"hl\">골라 줘</span>", "최대 3개까지 고를 수 있어요 · <b id=\"jobCnt\">" + S.jobs.length + "</b>/3");
    if (rec) {
      h += '<div class="rec-box" style="border-radius:28px;padding:3px;background:linear-gradient(135deg,var(--o2),#FFC48F,var(--o-deep));box-shadow:0 20px 40px -24px rgba(233,82,10,.8)">' +
        '<div style="background:rgba(255,248,242,.96);border-radius:25px;padding:14px 12px 12px">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin:0 4px 10px"><b style="font-size:15px">' + rec.e + " " + rec.t + '</b><span class="tag-o">★ 너한테 추천</span></div>' +
        '<p class="sub" style="margin:-4px 4px 10px;font-size:12.5px">' + rec.why + " 너라서 이 묶음을 먼저 보여줄게요</p>" +
        '<div class="olist">' + jobBtns(rec) + "</div></div></div>";
    }
    h += '<div class="sec-label" style="margin-top:20px">' + (rec ? "다른 일도 구경하기" : "세 가지 묶음 중에서 골라 보세요") + " <small>탭해서 펼치기</small></div>";
    h += others.map(function (g) {
      var picked = g.jobs.filter(function (j) { return S.jobs.indexOf(j[0]) > -1; }).length;
      var open = !rec || picked > 0;
      return '<details class="glass" style="margin-bottom:10px;padding:4px 10px" ' + (open ? "open" : "") + '><summary style="list-style:none;display:flex;align-items:center;justify-content:space-between;padding:12px 6px;cursor:pointer;font-weight:900">' +
        "<span>" + g.e + " " + g.t + '</span><span style="font-size:12px;color:var(--muted);font-weight:700">' + (picked ? picked + "개 선택 · " : "") + "3개 ⌄</span></summary>" +
        '<div class="olist" style="padding:0 0 10px">' + jobBtns(g) + "</div></details>";
    }).join("");
    h += '<button type="button" class="chip" data-job="__any" aria-pressed="' + (S.jobs[0] === "__any") + '" style="width:100%;margin-top:4px;padding:12px">🎲 아무 일이나 좋아요</button></div>';
    return h;
  };

  /* --- PART2 Q3 지역 --- */
  VIEWS["s2-region"] = function () {
    dock("다음", !!S.region);
    return '<div class="qwrap">' + qhead(FLOW2, 2) + qhero("📍", "어디서<br><span class=\"hl\">일하고 싶어?</span>", "고른 지역으로 알바몬 공고를 바로 찾아 줄게요") +
      '<div class="cgrid">' + REGIONS.map(function (r) { return '<button type="button" class="chip o" data-region="' + r + '" aria-pressed="' + (S.region === r) + '">' + r + "</button>"; }).join("") + "</div></div>";
  };

  /* --- PART2 Q4 근무 일정 --- */
  VIEWS["s2-time"] = function () {
    dock("계획 영수증 발행", S.days && S.hours);
    return '<div class="qwrap">' + qhead(FLOW2, 2) + qhero("🗓️", "일주일에 <span class=\"hl\">얼마나</span><br>일할 수 있어?", "대략적인 계획이면 충분해요") +
      '<div class="glass" style="padding:16px 14px">' +
        '<div class="sec-label" style="margin-top:0">일주일에 며칠?</div><div class="cgrid c7">' + [1, 2, 3, 4, 5, 6, 7].map(function (d) { return '<button type="button" class="chip o" data-days="' + d + '" aria-pressed="' + (S.days === d) + '">' + d + "일</button>"; }).join("") + "</div>" +
        '<div class="sec-label">하루에 몇 시간?</div><div class="cgrid">' + [3, 4, 5, 6, 7, 8, 9, 10].map(function (x) { return '<button type="button" class="chip o" data-hours="' + x + '" aria-pressed="' + (S.hours === x) + '">' + x + "시간</button>"; }).join("") + "</div>" +
      "</div>" + '<div id="weekHint" style="text-align:center;margin-top:14px"></div></div>';
  };
  AFTER["s2-time"] = function () { weekHint(); };
  function weekHint() {
    var w = S.days * S.hours, el = $("weekHint"); if (!el) return;
    el.innerHTML = !w ? '<span class="tag-o">💡 둘 다 고르면 일주일 근무시간이 나와요</span>' :
      w >= 15 ? '<span class="tag-g">✓ 주 ' + w + "시간 · 주휴수당 조건(주 15시간 이상) 충족!</span>" :
      '<span class="tag-o">주 ' + w + "시간 · 15시간 이상이면 주휴수당도 받을 수 있어요</span>";
  }

  /* --- 영수증 2: 알바 계획 --- */
  function receipt2() {
    var c = calc(), dname = DEDUCT.filter(function (d) { return d.k === S.deduct; })[0];
    var jobs = S.jobs[0] === "__any" ? ["아무 일이나"] : S.jobs;
    var maxH = Math.max.apply(null, S.goals.map(function (g) { return Math.ceil(g.amount / c.net); }));
    return '<div class="receipt" id="rc2">' +
      '<div class="rc-head"><div class="logo">🧾 알바 <em>영수증</em></div><span class="kind" style="background:var(--ink);color:#fff">알바 계획서</span><span class="meta2">No. ' + txNo() + " · " + ymd(new Date()) + "</span></div>" +
      '<hr class="rc-dash"><div class="rc-sec">WORK · 근무 조건</div>' +
      '<div class="rc-line"><span>지역</span><span>' + esc(S.region) + "</span></div>" +
      '<div class="rc-line"><span>직종</span><span class="rc-tags">' + jobs.map(function (j) { return "<span>" + esc(j) + "</span>"; }).join("") + "</span></div>" +
      '<div class="rc-line strong"><span>일정</span><span>주 ' + S.days + "일 × " + S.hours + "시간 = 주 " + c.weekly + "시간</span></div>" +
      '<hr class="rc-dash"><div class="rc-sec">PAY · 시급 정산</div>' +
      '<div class="rc-line" data-f="base"><span>기준 시급 (' + esc(wageName()) + ")</span><span>" + won(c.base) + "</span></div>" +
      '<div class="rc-line plus" data-f="juhyu"><span>+ 주휴수당 환산</span><span>' + (!c.juhyuOk ? '<span style="color:var(--muted)">해당 없음(주 15h 미만)</span>' : S.juhyu ? "+" + won(c.plusHr) : '<span style="color:var(--muted)">미포함</span>') + "</span></div>" +
      '<div class="rc-line minus" data-f="tax"><span>− 공제 (' + dname.t + ")</span><span>" + (c.rate ? "−" + won(c.minusHr) : '<span style="color:var(--muted)">없음</span>') + "</span></div>" +
      '<div class="rc-line net" data-f="net"><span>= 실제 손에 쥐는 시급</span><span>' + won(c.net) + "</span></div>" +
      '<hr class="rc-dash"><div class="rc-sec">CHECKOUT · 목표 결제</div>' +
      S.goals.map(function (g) {
        var h = Math.ceil(g.amount / c.net);
        return '<div class="hb"><span class="n">' + GOALS[g.type].e + " " + esc(goalLabel(g)) + '</span><span class="bar"><i style="width:' + (h / maxH * 100) + '%"></i></span><span class="h">' + fmt(h) + "h</span></div>";
      }).join("") +
      '<div class="rc-line strong" style="margin-top:6px"><span>목표 합계</span><span>' + won(c.total) + "</span></div>" +
      '<div class="rc-big" data-f="hours"><small>목표까지 필요한 근무시간</small><b>' + fmt(c.hours) + "<span>시간</span></b></div>" +
      '<div class="rc-line strong" data-f="weeks"><span>예상 기간</span><span>' + c.weeks + "주 (약 " + c.months + "개월)</span></div>" +
      '<div class="rc-line strong" data-f="end"><span>달성 예상일</span><span style="color:var(--o-deep)">' + ymd(c.end) + "</span></div>" +
      '<div class="rc-line" data-f="monthly"><span>한 달 예상 수입</span><span>약 ' + won(Math.round(c.monthly / 1000) * 1000) + "</span></div>" +
      '<button type="button" class="barcode-btn" data-act="barcode" data-r="2" aria-label="바코드 서비스 열기">' + barcode(txNo() + "B") + '<span class="num">' + txNo().replace("-", " ") + ' B</span><span class="hint">👆 바코드를 눌러 보세요 · 교환·구매 확인</span></button>' +
      '<div class="rc-foot">결제 수단: 내 시간 ⏱ · 잔돈은 저축으로<br>※ 단순 예상치예요. 공제·주휴수당은 근로 조건에 따라 달라요</div></div>';
  }
  function walletTab(which) {
    var t = total(), c = calc();
    return which === "r1" ? '<button type="button" class="w-tab" data-act="wswap"><span class="e">🛒</span><span><b>목표 주문서</b><small>목표 ' + S.goals.length + "개 · " + won(t) + '</small></span><span class="go">탭해서 넘기기 ⌄</span></button>'
      : '<button type="button" class="w-tab" data-act="wswap"><span class="e">🗓️</span><span><b>알바 계획서</b><small>' + fmt(c.hours) + "시간 · " + c.weeks + '주</small></span><span class="go">탭해서 넘기기 ⌄</span></button>';
  }
  function walletHTML(anim) {
    var a = S.active, other = a === "r2" ? "r1" : "r2";
    return walletTab(other) + '<div class="w-card ' + (anim || "") + '" id="wcard"><div class="grip" data-grip><i></i></div>' + (a === "r2" ? receipt2() : receipt1(false)) + "</div>" +
      '<div class="w-dots"><i class="' + (a === "r1" ? "on" : "") + '"></i><i class="' + (a === "r2" ? "on" : "") + '"></i></div>';
  }
  VIEWS.final = function () {
    var c = calc(); S.lastHours = c.hours;
    var first = (S.jobs[0] && S.jobs[0] !== "__any") ? S.jobs[0] : "";
    return doneHead("알바 계획 영수증까지 발행 완료!", "이제 결제만 남았어요. 돈 대신 <b>시간</b>으로요 ⏱") +
      '<div class="glass f-hero"><div class="cap">목표 ' + won(c.total) + "까지</div>" +
      '<div class="num" id="heroNum">' + fmt(c.hours) + "<span>시간</span></div>" +
      '<div class="sub2"><span class="delta" id="heroDelta">옵션을 바꿔 보세요</span><span class="tag-o" id="heroWeeks">주 ' + c.weekly + "시간씩 " + c.weeks + "주</span></div></div>" +
      '<div class="glass opts"><h3>⚙️ 옵션 바꿔 보기 <small>누르면 시간이 바로 바뀌어요</small></h3>' +
        '<div class="orow"><span class="ol">시급<small id="wageNote"></small></span><div class="seg">' + WAGES.map(function (w) {
          return '<button type="button" class="chip o" data-wage="' + w.k + '" aria-pressed="' + (S.wage === w.k) + '">' + w.t + (w.v ? "<small>" + fmt(w.v) + "원</small>" : "<small>내 공고 시급</small>") + "</button>"; }).join("") + "</div>" +
          '<div class="cw ' + (S.wage === "custom" ? "show" : "") + '" id="cw"><input id="customWage" inputmode="numeric" value="' + fmt(S.custom) + '" aria-label="직접 입력 시급"><small>원 / 시간</small></div></div>' +
        '<div class="orow"><span class="ol">세금·보험 공제<small>알바 계약 형태에 따라 달라요</small></span><div class="seg">' + DEDUCT.map(function (d) {
          return '<button type="button" class="chip o" data-deduct="' + d.k + '" aria-pressed="' + (S.deduct === d.k) + '">' + d.t + "<small>" + d.s + "</small></button>"; }).join("") + "</div></div>" +
        '<div class="orow"><span class="ol">주휴수당<small>' + (c.juhyuOk ? "주 15시간 이상이라 받을 수 있어요" : "주 15시간 미만이라 해당 없어요") + '</small></span><div class="seg">' +
          '<button type="button" class="chip o" data-juhyu="1" aria-pressed="' + (S.juhyu && c.juhyuOk) + '" ' + (c.juhyuOk ? "" : "disabled") + ">포함</button>" +
          '<button type="button" class="chip o" data-juhyu="0" aria-pressed="' + (!S.juhyu || !c.juhyuOk) + '">미포함</button></div></div>' +
      "</div>" +
      '<div class="wallet" id="wallet">' + walletHTML("") + "</div>" +
      slider("albamon", "알바 계획 확인 완료", "📍", S.region + (first ? " · " + first : ""), "결제할 시간 " + fmt(c.hours) + "시간", c.weeks + "주",
        "이제 <b>" + esc(S.region) + "</b>에서 결제할 알바를 찾아볼까?", "밀어서 " + S.region + "에서 알바 찾아보기") +
        '<div class="go-links" id="goLinks"><a class="go-main" id="goMain" href="' + albamonUrl(first) + '" target="_blank" rel="noopener" data-track="albamon_main"><span>' + esc(S.region) + (first ? " " + esc(first) : "") + " 공고 열기</span><span>↗</span></a>" +
        (S.jobs.length > 1 && S.jobs[0] !== "__any" ? '<div class="go-more">' + S.jobs.slice(1).map(function (j) { return '<a href="' + albamonUrl(j) + '" target="_blank" rel="noopener" data-track="albamon_more">' + esc(j) + " 공고도 보기 ↗</a>"; }).join("") + "</div>" : "") +
        "</div></div>" +
      '<div class="act-row"><button type="button" class="act light" data-act="save">📥 이미지로 저장</button><button type="button" class="act dark" data-act="share">💌 친구에게 공유</button></div>' +
      '<button type="button" class="restart" data-act="barcode" data-r="2">🔁 다시 하고 싶다면? 바코드로 환불·교환하기</button>' +
      '<div class="app-block"><p>공고 지원·알림은 <b>알바몬 앱</b>이 더 편해요</p>' + stores() + "</div>" + footer();
  };

  /* ================= 최종 화면 갱신 (전체를 다시 그리지 않음) ================= */
  function refreshFinal() {
    var c = calc(), prev = S.lastHours;
    var hn = $("heroNum"); if (!hn) return;
    countTo(hn, prev, c.hours);
    var d = $("heroDelta"), diff = c.hours - prev;
    if (diff) { d.className = "delta " + (diff > 0 ? "up" : "down"); d.textContent = (diff > 0 ? "▲ " : "▼ ") + fmt(Math.abs(diff)) + "시간 " + (diff > 0 ? "늘었어요" : "줄었어요"); }
    $("heroWeeks").textContent = "주 " + c.weekly + "시간씩 " + c.weeks + "주";
    var sc = document.querySelector('[data-slider="albamon"]'); if (sc) { var card = sc.closest(".slide-card"); card.querySelector(".sc-row small").textContent = "결제할 시간 " + fmt(c.hours) + "시간"; card.querySelector(".sc-row .amt").textContent = c.weeks + "주"; }
    S.lastHours = c.hours;
    if (S.active === "r2") {
      var old = {}; document.querySelectorAll("#rc2 [data-f]").forEach(function (e) { old[e.dataset.f] = e.textContent; });
      $("wallet").innerHTML = walletHTML("");
      document.querySelectorAll("#rc2 [data-f]").forEach(function (e) { if (old[e.dataset.f] !== e.textContent) e.classList.add("flash"); });
    } else { $("wallet").innerHTML = walletHTML(""); }
    bindGrip();
    document.querySelectorAll("[data-juhyu]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.juhyu === "1" ? (S.juhyu && c.juhyuOk) : (!S.juhyu || !c.juhyuOk))); });
  }
  function countTo(el, from, to) {
    var t0 = (window.performance && performance.now) ? performance.now() : Date.now(), dur = 450;
    function step(t) { var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.innerHTML = fmt(from + (to - from) * e) + "<span>시간</span>"; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  /* ================= 지갑 넘기기 ================= */
  function swapWallet() {
    var card = $("wcard"); if (!card) return;
    card.classList.add("out");
    setTimeout(function () { S.active = S.active === "r2" ? "r1" : "r2"; $("wallet").innerHTML = walletHTML("in"); bindGrip(); }, 260);
  }
  function bindGrip() {
    var card = $("wcard"); if (!card) return;
    var grip = card.querySelector("[data-grip]"), sy = 0, dy = 0, on = false;
    grip.addEventListener("pointerdown", function (e) { on = true; sy = e.clientY; dy = 0; try { grip.setPointerCapture(e.pointerId); } catch (er) {} card.style.transition = "none"; });
    grip.addEventListener("pointermove", function (e) { if (!on) return; dy = Math.max(0, e.clientY - sy); card.style.transform = "translateY(" + dy * 0.6 + "px) rotate(" + dy * 0.01 + "deg)"; });
    function end() { if (!on) return; on = false; card.style.transition = "transform .25s ease"; card.style.transform = ""; if (dy > 70) swapWallet(); else if (dy < 4) swapWallet(); }
    grip.addEventListener("pointerup", end); grip.addEventListener("pointercancel", end);
    grip.title = "아래로 밀어서 다음 영수증";
  }
  AFTER.final = function () { bindGrip(); bindSliders(); };
  AFTER.r1 = function () { bindSliders(); };

  /* ================= 슬라이드 결제 ================= */
  function bindSliders() {
    document.querySelectorAll("[data-slider]").forEach(function (sl) {
      var knob = sl.querySelector(".knob"), fill = sl.querySelector(".fill"), lab = sl.querySelector(".lab");
      var sx = 0, x = 0, max = 0, on = false, done = false;
      function set(v) { x = Math.max(0, Math.min(max, v)); knob.style.transform = "translateX(" + x + "px)"; fill.style.width = (x + 87) + "px"; lab.style.opacity = String(1 - x / max * 1.3); }
      knob.addEventListener("pointerdown", function (e) { if (done) return; on = true; max = sl.clientWidth - knob.offsetWidth - 10; sx = e.clientX - x; sl.classList.add("drag"); try { knob.setPointerCapture(e.pointerId); } catch (er) {} });
      knob.addEventListener("pointermove", function (e) { if (on) set(e.clientX - sx); });
      function up() {
        if (!on) return; on = false; sl.classList.remove("drag");
        if (x >= max * 0.86) { done = true; set(max); sl.classList.add("ok"); knob.textContent = "✓"; complete(sl.dataset.slider); }
        else if (x < 4) { set(18); setTimeout(function () { set(0); }, 260); }
        else set(0);
      }
      knob.addEventListener("pointerup", up); knob.addEventListener("pointercancel", up);
      sl._reset = function () { done = false; on = false; sl.classList.remove("ok", "drag"); knob.textContent = "»"; max = sl.clientWidth - knob.offsetWidth - 10; x = 0; knob.style.transform = ""; fill.style.width = ""; lab.style.opacity = ""; };
      knob.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && !done) { e.preventDefault(); max = sl.clientWidth - knob.offsetWidth - 10; done = true; set(max); sl.classList.add("ok"); knob.textContent = "✓"; complete(sl.dataset.slider); } });
    });
  }
  function complete(id) {
    if (id === "plan") {
      track("receipt1_slide", {});
      var pop = document.createElement("div"); pop.className = "part-pop"; pop.innerHTML = "<div><b>PART 2</b><span>이제 어떻게 벌지 계획해 볼까요?</span></div>";
      document.body.appendChild(pop); setTimeout(function () { view = "s2-style"; render(); }, 600); setTimeout(function () { pop.remove(); }, 1500);
    } else if (id === "albamon") {
      track("albamon_slide", { region: S.region, jobs: S.jobs.join(",") });
      $("goLinks").classList.add("show");
      try { $("goMain").click(); } catch (e) {}
    }
  }

  /* ================= 바코드 서비스 시트 ================= */
  function openBarcode(r) {
    var final = view === "final";
    var c = final ? calc() : null;
    var html = '<div class="backdrop" data-act="close-layer"><div class="sheet" role="dialog" aria-label="영수증 서비스"><div class="handle"></div>' +
      '<div class="scan">' + barcode(txNo() + (r === "1" ? "A" : "B")) + '<div class="laser"></div><div class="res">거래번호 ' + txNo() + (r === "1" ? " A" : " B") + '</div><div class="ok">✓ 삑! 거래 내역을 찾았어요</div></div>' +
      "<h3>🧾 영수증 서비스 데스크</h3><p class=\"lead\">영수증이 있어야 환불·교환이 되죠? 원하는 걸 골라 주세요.</p><div class=\"svc\">" +
      '<button type="button" class="svc-item" data-act="exchange-goal"><span class="e">🔄</span><span class="tx"><b>교환 · 목표 바꾸기</b><small>담은 목표나 금액만 고치고 나머진 그대로</small></span><span class="ar">›</span></button>' +
      (final ? '<button type="button" class="svc-item" data-act="exchange-plan"><span class="e">🗓️</span><span class="tx"><b>교환 · 계획만 다시 짜기</b><small>목표는 두고 PART 2부터 다시</small></span><span class="ar">›</span></button>' +
        '<a class="svc-item" href="' + albamonUrl(S.jobs[0] !== "__any" ? S.jobs[0] : "") + '" target="_blank" rel="noopener" data-track="albamon_barcode"><span class="e">✅</span><span class="tx"><b>구매 확인 · 알바몬에서 확인</b><small>' + esc(S.region) + " 공고로 이 계획이 진짜 가능한지 확인</small></span><span class=\"ar\">↗</span></a>" +
        '<button type="button" class="svc-item" data-act="save"><span class="e">🎟️</span><span class="tx"><b>적립 · 영수증 보관하기</b><small>이미지로 저장해 두고 목표 달성까지 체크</small></span><span class="ar">›</span></button>' : "") +
      '<button type="button" class="svc-item danger" data-act="refund"><span class="e">💸</span><span class="tx"><b>환불 · 처음부터 다시</b><small>모든 목표와 계획을 지우고 새로 시작</small></span><span class="ar">›</span></button>' +
      '</div><button type="button" class="close" data-act="close-layer">닫기</button></div></div>';
    $("layer").innerHTML = html;
    track("barcode_open", { receipt: r });
  }
  function closeLayer() { $("layer").innerHTML = ""; }

  /* ================= 이미지 저장 (캔버스로 직접 그림) ================= */
  function drawImage() {
    var c = calc(), W = 720, pad = 56, lines = [];
    S.goals.forEach(function (g) {
      lines.push({ t: "goal", a: GOALS[g.type].e + " " + g.type + " · " + goalLabel(g), b: fmt(g.amount) });
      g.items.forEach(function (it) { if (it.amount) lines.push({ t: "opt", a: "└ " + it.label, b: fmt(it.amount) }); });
      var left = g.amount - sumItems(g); if (left > 0 && g.items.length) lines.push({ t: "opt", a: "└ 기타(미정)", b: fmt(left) });
    });
    var H = 560 + lines.length * 40 + 380;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H; var x = cv.getContext("2d");
    var bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#FF9A55"); bg.addColorStop(.55, "#FF6B1A"); bg.addColorStop(1, "#E2500B");
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    x.fillStyle = "rgba(255,255,255,.16)"; x.font = "120px 'Black Han Sans'"; x.textAlign = "center"; x.fillText("몇 시간?", W / 2, 150);
    var px = 60, pw = W - 120, py = 190, ph = H - 250;
    x.save(); x.shadowColor = "rgba(90,25,0,.35)"; x.shadowBlur = 40; x.shadowOffsetY = 16; x.fillStyle = "#fff";
    x.beginPath(); x.moveTo(px, py); x.lineTo(px + pw, py); x.lineTo(px + pw, py + ph);
    for (var zx = px + pw; zx > px; zx -= 20) { x.lineTo(zx - 10, py + ph - 10); x.lineTo(zx - 20, py + ph); }
    x.closePath(); x.fill(); x.restore();
    var y = py + 64, L = px + pad - 16, R = px + pw - pad + 16;
    x.textAlign = "center"; x.fillStyle = "#16171B"; x.font = "40px 'Black Han Sans'"; x.fillText("🧾 알바 영수증", W / 2, y);
    y += 36; x.font = "bold 20px 'Noto Sans KR'"; x.fillStyle = "#7B7E88"; x.fillText("No. " + txNo() + " · " + ymd(new Date()), W / 2, y);
    function dash() { y += 26; x.strokeStyle = "#CDCDD3"; x.setLineDash([8, 6]); x.lineWidth = 2; x.beginPath(); x.moveTo(L, y); x.lineTo(R, y); x.stroke(); x.setLineDash([]); y += 34; }
    function row(a, b, font, color, bcolor) { x.font = font; x.fillStyle = color; x.textAlign = "left"; x.fillText(a, L, y); x.textAlign = "right"; x.fillStyle = bcolor || color; x.fillText(b, R, y); }
    dash();
    lines.forEach(function (l) { if (l.t === "goal") { y += 6; row(l.a, l.b, "900 26px 'Noto Sans KR'", "#16171B"); } else row("   " + l.a, l.b, "22px 'Nanum Gothic Coding'", "#55585F"); y += 40; });
    y -= 10; dash();
    row("합계", won(c.total), "900 30px 'Noto Sans KR'", "#16171B", "#FF6B1A"); y += 46;
    row(S.region + " · 주 " + S.days + "일 × " + S.hours + "시간", "", "bold 22px 'Noto Sans KR'", "#55585F"); y += 34;
    row("실수령 시급 (" + DEDUCT.filter(function (d) { return d.k === S.deduct; })[0].t + (S.juhyu && c.juhyuOk ? " · 주휴 포함" : "") + ")", won(c.net), "bold 22px 'Noto Sans KR'", "#55585F", "#16171B");
    dash();
    x.textAlign = "center"; x.fillStyle = "#7B7E88"; x.font = "bold 22px 'Noto Sans KR'"; x.fillText("목표까지 필요한 근무시간", W / 2, y);
    y += 88; x.fillStyle = "#FF6B1A"; x.font = "900 96px 'Noto Sans KR'"; x.fillText(fmt(c.hours) + "시간", W / 2, y);
    y += 46; x.fillStyle = "#16171B"; x.font = "bold 24px 'Noto Sans KR'"; x.fillText(c.weeks + "주 · " + ymd(c.end) + " 달성 예상", W / 2, y);
    y += 40; var bx = L + 40; x.fillStyle = "#16171B";
    var h = 0, s = txNo(); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    while (bx < R - 40) { h = (h * 1103515245 + 12345) >>> 0; var w = 2 + (h >>> 8) % 4; x.fillRect(bx, y, w, 70); bx += w + 2 + (h >>> 12) % 4; }
    y += 104; x.fillStyle = "#7B7E88"; x.font = "18px 'Nanum Gothic Coding'"; x.fillText("결제 수단: 내 시간 · THANK YOU", W / 2, y);
    x.fillStyle = "rgba(255,255,255,.95)"; x.font = "bold 22px 'Noto Sans KR'"; x.fillText("나도 내 목표 영수증 뽑아보기 → " + location.host, W / 2, H - 22);
    return cv;
  }
  function saveImage() {
    var cv = drawImage(), url = cv.toDataURL("image/png"), name = "알바영수증_" + txNo() + ".png";
    track("save_image", {});
    var tried = false;
    if (window.claude && window.claude.use) {
      tried = true;
      window.claude.use("downloads").then(function (dl) {
        if (!dl) return showImg(url, name);
        cv.toBlob(function (blob) { dl.save({ filename: name, data: blob }).then(function () { toast("이미지를 저장했어요 📥"); }, function () { showImg(url, name); }); });
      }, function () { showImg(url, name); });
    }
    if (!tried) showImg(url, name);
  }
  function showImg(url, name) {
    $("layer").innerHTML = '<div class="backdrop center" data-act="close-layer"><div class="img-pop"><img src="' + url + '" alt="내 알바 영수증 이미지"><p>📱 휴대폰: 이미지를 <b>꾹 눌러서</b> 저장 · 💻 PC: 우클릭 → 이미지 저장</p>' +
      '<a class="go-main" href="' + url + '" download="' + name + '" style="justify-content:center">파일로 받기</a><button type="button" class="close" data-act="close-layer" style="width:100%;margin-top:8px;height:48px;border:0;border-radius:16px;background:rgba(22,23,27,.06);font-weight:700">닫기</button></div></div>';
  }
  function share() {
    var c = calc();
    var text = "🧾 내 알바 영수증\n" + S.goals.map(function (g) { return GOALS[g.type].e + " " + goalLabel(g) + " " + won(g.amount); }).join("\n") +
      "\n합계 " + won(c.total) + " = 알바 " + fmt(c.hours) + "시간 (" + c.weeks + "주)\n너의 목표는 몇 시간짜리야? 👉 " + location.href.split("#")[0];
    track("share", {});
    var copy = function () {
      try { navigator.clipboard.writeText(text).then(function () { toast("복사했어요! 친구에게 붙여넣기 하세요 💌"); }, fallback); } catch (e) { fallback(); }
    };
    var fallback = function () {
      $("layer").innerHTML = '<div class="backdrop center" data-act="close-layer"><div class="img-pop" style="text-align:left"><p style="font-weight:900;color:var(--ink)">아래 내용을 복사해서 보내 주세요</p><textarea readonly style="width:100%;height:170px;border-radius:14px;border:1.5px solid var(--line);padding:12px;font:13px var(--body)">' + esc(text) + '</textarea><button type="button" class="close" data-act="close-layer" style="width:100%;margin-top:8px;height:48px;border:0;border-radius:16px;background:rgba(22,23,27,.06);font-weight:700">닫기</button></div></div>';
    };
    if (navigator.share) { navigator.share({ title: "알바 영수증", text: text }).catch(function (e) { if (!e || e.name !== "AbortError") copy(); }); }
    else copy();
  }

  /* ================= 참여자(방문자) 수 =================
     - 브라우저 창을 처음 열 때 1번만 +1 (새로고침은 다시 세지 않음)
     - 숫자는 무료 카운터 서비스에 저장돼서 새로고침·다른 기기에서도 그대로 유지
     - 서비스에 연결이 안 되면 마지막으로 받은 숫자를 보여줌 */
  var visits = null;
  function counterUrls(mode) {
    var ns = encodeURIComponent(window.COUNTER_NS || "alba-receipt"), key = encodeURIComponent(window.COUNTER_KEY || "participants");
    return [
      { url: "https://abacus.jasoncameron.dev/" + (mode === "hit" ? "hit" : "get") + "/" + ns + "/" + key, pick: function (j) { return j.value; } },
      { url: "https://api.counterapi.dev/v1/" + ns + "/" + key + (mode === "hit" ? "/up" : "/"), pick: function (j) { return j.count; } }
    ];
  }
  function store(k, v) { try { if (v === undefined) return window.sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function keep(k, v) { try { if (v === undefined) return window.localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function tryFetch(list, i) {
    if (i >= list.length || !window.fetch) return Promise.reject(new Error("counter unavailable"));
    var ctl = window.AbortController ? new AbortController() : null, timer = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
    return fetch(list[i].url, ctl ? { signal: ctl.signal, cache: "no-store" } : { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { clearTimeout(timer); var v = +list[i].pick(j); if (!isFinite(v)) throw new Error("bad"); return v; })
      .catch(function () { clearTimeout(timer); return tryFetch(list, i + 1); });
  }
  function countVisit() {
    var cached = +keep("alba_people_last");
    if (cached) { visits = cached; showVisits(false); }
    var counted = store("alba_people_counted") === "1";
    tryFetch(counterUrls(counted ? "get" : "hit"), 0).then(function (v) {
      if (!counted) store("alba_people_counted", "1");
      visits = v + (+window.COUNTER_BASE || 0); keep("alba_people_last", visits); showVisits(true);
    }, function () {
      if (visits == null) { var n = (+keep("alba_people_local") || 0) + (counted ? 0 : 1); keep("alba_people_local", n); store("alba_people_counted", "1"); visits = n + (+window.COUNTER_BASE || 0); }
      showVisits(false);
    });
  }
  var shownVisits = 0;
  function showVisits(anim) {
    var n = $("peopleNum"); if (!n || visits == null) return;
    if (anim && shownVisits !== visits) {
      var from = shownVisits || Math.max(0, visits - Math.min(visits, 60)), to = visits, t0 = Date.now();
      (function step() { var p = Math.min(1, (Date.now() - t0) / 900), e = 1 - Math.pow(1 - p, 3); n.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); })();
    } else n.textContent = fmt(visits);
    shownVisits = visits;
  }

  /* ================= 이동 ================= */
  function next() {
    if (view === "cover") { track("start", {}); S.draft = null; view = "g-type"; }
    else if (view === "g-type") view = "g-amount";
    else if (view === "g-amount") view = "g-split";
    else if (view === "g-split") {
      S.draft.items = S.draft.items.filter(function (it) { return it.label.trim(); });
      if (S.editIdx > -1) S.goals[S.editIdx] = S.draft; else S.goals.push(S.draft);
      S.draft = null; S.editIdx = -1; view = "cart";
    }
    else if (view === "cart") { S.issued = new Date(); track("receipt1", { goals: S.goals.length, total: total() }); view = "r1"; }
    else if (view === "s2-style") view = "s2-jobs";
    else if (view === "s2-jobs") view = "s2-region";
    else if (view === "s2-region") view = "s2-time";
    else if (view === "s2-time") { S.active = "r2"; track("receipt2", { region: S.region, weekly: S.days * S.hours }); view = "final"; }
    render();
  }
  function prev() {
    var map = { "g-type": S.goals.length ? "cart" : "cover", "g-amount": "g-type", "g-split": "g-amount", "s2-style": "r1", "s2-jobs": "s2-style", "s2-region": "s2-jobs", "s2-time": "s2-region" };
    if (view === "g-type" && S.goals.length) { S.draft = null; S.editIdx = -1; }
    view = map[view] || "cover"; render();
  }

  /* ================= 이벤트 ================= */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-track]"); if (a) { track(a.dataset.track, { href: a.href }); return; }
    var t = e.target.closest("button, .backdrop"); if (!t) return;
    if (t.classList.contains("backdrop") && e.target !== t) return;
    var act = t.dataset.act, d = t.dataset;
    if (act === "next") return next();
    if (act === "prev") return prev();
    if (act === "home") { view = "cover"; render(); return; }
    if (d.goal) {
      if (S.draft.type !== d.goal) { S.draft.type = d.goal; S.draft.sub = ""; S.draft.items = []; }
      document.querySelectorAll("[data-goal]").forEach(function (b) { press(b, b === t); }); var mk = document.querySelector(".market"); if (mk) mk.classList.add("has-pick"); setNext(true); return;
    }
    if (d.sub) {
      if (S.draft.sub !== d.sub) { S.draft.sub = d.sub; S.draft.items = []; }
      document.querySelectorAll("[data-sub]").forEach(function (b) { press(b, b === t); });
      var gn = $("gName"); if (gn) gn.placeholder = "예: " + exOf(S.draft); setNext(amountOk()); return;
    }
    if (d.add !== undefined) {
      S.draft.amount = +d.add === 0 ? 0 : Math.min(99999999, S.draft.amount + (+d.add));
      $("gAmt").value = S.draft.amount ? fmt(S.draft.amount) : ""; $("amtHint").textContent = amtHint(S.draft.amount); setNext(amountOk()); return;
    }
    if (d.preset) {
      var g = S.draft, idx = -1; g.items.forEach(function (it, i) { if (it.label === d.preset) idx = i; });
      if (idx > -1) g.items.splice(idx, 1); else g.items.push({ label: d.preset, emoji: d.emoji, amount: 0 });
      press(t, idx === -1); drawItems();
      if (idx === -1) { var ins = document.querySelectorAll("#items .item:not(.etc) .mi input"); var last = ins[ins.length - 1]; if (last) try { last.focus({ preventScroll: true }); } catch (er) {} }
      return;
    }
    if (act === "custom-item") { S.draft.items.push({ label: "", emoji: "🏷️", amount: 0 }); drawItems(); var nms = document.querySelectorAll("#items .nm"); try { nms[nms.length - 2].focus(); } catch (er) {} return; }
    if (d.rm !== undefined) {
      var rmLabel = S.draft.items[+d.rm].label; S.draft.items.splice(+d.rm, 1);
      document.querySelectorAll("[data-preset]").forEach(function (b) { if (b.dataset.preset === rmLabel) press(b, false); }); drawItems(); return;
    }
    if (act === "raise") { S.draft.amount = sumItems(S.draft); render(); toast("목표 금액을 " + won(S.draft.amount) + "으로 올렸어요"); return; }
    if (act === "add-goal") { S.draft = null; S.editIdx = -1; view = "g-type"; render(); return; }
    if (d.edit !== undefined) { S.editIdx = +d.edit; S.draft = JSON.parse(JSON.stringify(S.goals[+d.edit])); view = "g-amount"; render(); return; }
    if (d.del !== undefined) { S.goals.splice(+d.del, 1); if (!S.goals.length) { view = "g-type"; S.draft = null; } render(); return; }
    if (act === "to-cart") { view = "cart"; render(); return; }
    if (d.style) {
      if (S.style !== d.style) S.jobs = [];
      S.style = d.style; document.querySelectorAll("[data-style]").forEach(function (b) { press(b, b === t); }); setNext(true); return;
    }
    if (d.job) {
      if (d.job === "__any") S.jobs = S.jobs[0] === "__any" ? [] : ["__any"];
      else {
        S.jobs = S.jobs.filter(function (j) { return j !== "__any"; });
        var ji = S.jobs.indexOf(d.job);
        if (ji > -1) S.jobs.splice(ji, 1); else if (S.jobs.length < 3) S.jobs.push(d.job); else toast("최대 3개까지 고를 수 있어요");
      }
      document.querySelectorAll("[data-job]").forEach(function (b) { press(b, S.jobs.indexOf(b.dataset.job) > -1); });
      var jc = $("jobCnt"); if (jc) jc.textContent = S.jobs[0] === "__any" ? "아무거나" : S.jobs.length;
      setNext(S.jobs.length > 0); return;
    }
    if (d.region) { S.region = d.region; document.querySelectorAll("[data-region]").forEach(function (b) { press(b, b === t); }); setNext(true); return; }
    if (d.days) { S.days = +d.days; document.querySelectorAll("[data-days]").forEach(function (b) { press(b, b === t); }); weekHint(); setNext(S.days && S.hours); return; }
    if (d.hours) { S.hours = +d.hours; document.querySelectorAll("[data-hours]").forEach(function (b) { press(b, b === t); }); weekHint(); setNext(S.days && S.hours); return; }
    if (d.wage) {
      S.wage = d.wage; document.querySelectorAll("[data-wage]").forEach(function (b) { press(b, b === t); });
      $("cw").classList.toggle("show", S.wage === "custom"); if (S.wage === "custom") try { $("customWage").focus(); } catch (er) {}
      track("option_wage", { wage: S.wage }); refreshFinal(); return;
    }
    if (d.deduct) { S.deduct = d.deduct; document.querySelectorAll("[data-deduct]").forEach(function (b) { press(b, b === t); }); track("option_deduct", { deduct: S.deduct }); refreshFinal(); return; }
    if (d.juhyu) { S.juhyu = d.juhyu === "1"; refreshFinal(); return; }
    if (act === "wswap") return swapWallet();
    if (act === "barcode") return openBarcode(d.r);
    if (act === "close-layer") return closeLayer();
    if (act === "exchange-goal") { closeLayer(); view = "cart"; render(); toast("🔄 교환 접수! 목표를 바꿔 보세요"); return; }
    if (act === "exchange-plan") { closeLayer(); view = "s2-style"; render(); toast("🗓️ 계획만 다시 짜요"); return; }
    if (act === "refund") {
      if (!t.classList.contains("armed")) { t.classList.add("armed"); t.querySelector("b").textContent = "정말 환불할까요? 한 번 더 누르면 초기화"; return; }
      track("refund", {}); closeLayer(); S = fresh(); view = "cover"; render(); toast("💸 환불 완료! 새 영수증을 뽑아 볼까요?"); return;
    }
    if (act === "save") { closeLayer(); return saveImage(); }
    if (act === "share") return share();
  });
  function press(b, on) { b.setAttribute("aria-pressed", on ? "true" : "false"); var r = b.querySelector(".rd"); if (r) r.textContent = on ? "✓" : ""; }

  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.id === "gName") S.draft.name = el.value;
    else if (el.id === "gAmt") { S.draft.amount = Math.min(99999999, num(el.value)); el.value = S.draft.amount ? fmt(S.draft.amount) : ""; $("amtHint").textContent = amtHint(S.draft.amount); setNext(amountOk()); }
    else if (el.id === "customWage") { S.custom = Math.min(100000, num(el.value)); el.value = S.custom ? fmt(S.custom) : ""; if (S.custom >= 1000) refreshFinal(); var n = $("wageNote"); if (n) n.textContent = S.custom && S.custom < wageMinNow() ? "⚠️ 최저시급보다 낮아요" : ""; }
    else if (el.dataset && el.dataset.k) {
      var row = el.closest(".item"); if (!row) return; var it = S.draft.items[+row.dataset.i];
      if (el.dataset.k === "amount") { it.amount = Math.min(99999999, num(el.value)); el.value = it.amount ? fmt(it.amount) : ""; updateAlloc(); }
      else it.label = el.value;
    }
  });
  function wageMinNow() { return new Date().getFullYear() >= 2027 ? MIN[2027] : MIN[2026]; }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLayer();
    if (e.key === "Enter" && e.target.id === "gAmt" && amountOk()) next();
  });

  /* 알바몬에 갔다가 돌아오면 슬라이드를 처음 상태로 */
  function resetDoneSliders() { document.querySelectorAll('[data-slider="albamon"]').forEach(function (sl) { if (sl._reset && sl.classList.contains("ok")) sl._reset(); }); }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") resetDoneSliders(); });
  window.addEventListener("focus", resetDoneSliders);
  window.addEventListener("pageshow", resetDoneSliders);

  countVisit();
  render();
})();
