/* 오류가 나면 화면에 원인을 보여줌 (폰에서 원인 확인용) + 구형 브라우저 보조 */
  (function(){
    if(!String.prototype.padStart){String.prototype.padStart=function(n,c){var s=String(this);c=c||" ";while(s.length<n)s=c+s;return s.slice(-Math.max(n,String(this).length));};}
    if(window.Element&&!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;}
    if(window.Element&&!Element.prototype.closest){Element.prototype.closest=function(sel){var el=this;while(el&&el.nodeType===1){if(el.matches(sel))return el;el=el.parentElement;}return null;};}
    if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=Array.prototype.forEach;}
    function show(msg){try{var b=document.getElementById("errBox");if(!b){b=document.createElement("div");b.id="errBox";b.style.cssText="position:fixed;left:12px;right:12px;top:12px;z-index:9999;background:#fff;border:2px solid #E5484D;border-radius:14px;padding:12px 14px;font:13px/1.5 sans-serif;color:#B42318;box-shadow:0 10px 30px rgba(0,0,0,.2);word-break:break-all";(document.body||document.documentElement).appendChild(b);}b.innerHTML="<b>⚠️ 오류가 났어요 (이 화면을 캡처해서 보내 주세요)</b><br>"+String(msg).replace(/</g,"&lt;")+"<br><small>"+navigator.userAgent.replace(/</g,"&lt;")+"</small>";}catch(e){}}
    window.addEventListener("error",function(e){show((e.message||"알 수 없는 오류")+(e.lineno?" (줄 "+e.lineno+":"+e.colno+")":""));});
    window.addEventListener("unhandledrejection",function(e){show("비동기 오류: "+(e.reason&&e.reason.message||e.reason));});
    window.__showErr=show;
  })();
