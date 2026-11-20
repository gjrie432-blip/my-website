/* ===== 설정 =====
     GA_ID      : GA4 측정 ID(G-로 시작). 비워 두면 통계를 보내지 않아요.
     COUNTER_NS / COUNTER_KEY: 참여자 수 카운터 이름. 무료 카운터 서비스(Abacus)에 이 이름으로 숫자가 저장돼요.
                  다른 사이트와 겹치지 않게 팀만의 이름을 쓰세요. 이름을 바꾸면 0부터 다시 세요.
     COUNTER_BASE: 화면에 더해서 보여줄 시작 숫자(보통 0). */
  window.GA_ID = "";
  window.COUNTER_NS = "alba-receipt-goal-team2026";
  window.COUNTER_KEY = "participants";
  window.COUNTER_BASE = 0;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  if (window.GA_ID) {
    var gs = document.createElement("script"); gs.async = true;
    gs.src = "https://www.googletagmanager.com/gtag/js?id=" + window.GA_ID;
    document.head.appendChild(gs); gtag("js", new Date()); gtag("config", window.GA_ID);
  }
