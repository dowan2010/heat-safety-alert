const LEVELS = [
  { min:38, name:"위험", color:"var(--l4)", fg:"#fff", bg:"#f3f3f3", orb:["#ee2e5d","#5a0b22","#ff8a1f"], msg:"야외활동을 멈추세요", tips:["야외활동 중단, 냉방된 실내로 이동","체육수업·행사는 취소하거나 실내로 변경","어지럼·두통·구토 시 즉시 교사에게 알리고 119"] },
  { min:35, name:"경고", color:"var(--l3)", fg:"#fff", bg:"#fff0f3", orb:["#ee2e5d","#ff8a1f","#ffb3c6"], msg:"야외활동을 최소화하세요", tips:["격렬한 운동 금지, 야외활동 최소화","20분 활동 후 10분 이상 그늘에서 휴식","15~20분마다 물 150~200mL"] },
  { min:33, name:"주의", color:"var(--l2)", fg:"#000", bg:"#fff5ea", orb:["#ff8a1f","#ffd43b","#ff6b8a"], msg:"활동 시간을 줄이세요", tips:["한낮(12~17시) 야외활동 피하기","30~40분마다 그늘에서 휴식","갈증 나기 전에 물 마시기"] },
  { min:31, name:"관심", color:"var(--l1)", fg:"#000", bg:"#fffbe6", orb:["#ffd43b","#00f0a0","#ffa94d"], msg:"물을 자주 마시세요", tips:["활동 가능, 수시로 물 마시기","컨디션 나쁜 친구는 무리하지 않기","모자·밝은 옷 착용"] },
  { min:-99, name:"안전", color:"var(--safe)", fg:"#000", bg:"#effff6", orb:["#00f0a0","#7fdcff","#c8ff9e"], msg:"평소처럼 활동해도 좋아요", tips:["일반 활동 가능","물은 평소처럼 챙기기"] }
];
const level = t => LEVELS.find(l => t >= l.min);
const PLACES = [["운동장","sun"],["교실","door"],["체육관","dumbbell"],["기숙사","bed"],["급식실","utensils"],["기타","dots"]];
const ACTS = ["체육수업","쉬는시간","수업(실내)","등하교","동아리·행사","기타"];
const G_MIN = 26, G_MAX = 42;

// 라인 아이콘 (Lucide 스타일, 24x24)
const ICONS = {
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  door:'<path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M15 12h.01"/>',
  dumbbell:'<path d="M6.5 6.5l11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7"/>',
  bed:'<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
  utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  dots:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  thermo:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 14v-4"/>',
  calc:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
  chart:'<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  note:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',
  save:'<path d="M20 6 9 17l-5-5"/>',
  check:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'
};
const icon = n => `<svg class="ico${n==="arrow"?" go":""}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const paintIcons = root => root.querySelectorAll("[data-i]:empty").forEach(el => el.innerHTML = icon(el.dataset.i));

// 기상청 여름철 체감온도: Stull 습구온도 → 체감온도
function wetBulb(Ta, RH) {
  return Ta*Math.atan(0.151977*Math.sqrt(RH+8.313659)) + Math.atan(Ta+RH) - Math.atan(RH-1.676331)
       + 0.00391838*Math.pow(RH,1.5)*Math.atan(0.023101*RH) - 4.686035;
}
function feelsLike(Ta, RH) {
  const Tw = wetBulb(Ta, RH);
  return -0.2442 + 0.55399*Tw + 0.45535*Ta - 0.0022*Tw*Tw + 0.00278*Tw*Ta + 3.0;
}

const KEY = "heatRecords.v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const save = r => { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch {} };
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad = n => String(n).padStart(2,"0");
const clampPct = t => Math.min(100, Math.max(0, (t-G_MIN)/(G_MAX-G_MIN)*100));
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const SPRING = "cubic-bezier(.34,1.56,.64,1)";

/* ---------- 정적 UI 구성 ---------- */
const F = $("f");
if (F) {
$("place").innerHTML = PLACES.map(([v,ic],i) => `<input type="radio" name="place" id="place${i}" value="${v}"${i?"":" checked"}><label for="place${i}">${icon(ic)}${v}</label>`).join("");
$("act").innerHTML = ACTS.map((v,i) => `<input type="radio" name="act" id="act${i}" value="${v}"${i?"":" checked"}><label for="act${i}">${v}</label>`).join("");

const bands = [[G_MIN,31,"var(--safe)"],[31,33,"var(--l1)"],[33,35,"var(--l2)"],[35,38,"var(--l3)"],[38,G_MAX,"var(--l4)"]];
if (F) $("gaugeBar").innerHTML = bands.map(([a,b,c]) => `<i style="flex:${b-a};background:${c}"></i>`).join("");
}
const picked = name => document.querySelector(`input[name=${name}]:checked`)?.value;
if ($("strip")) $("strip").innerHTML = [...LEVELS].reverse().map(l => `<div><i style="background:${l.color};${l.name==="위험"?"box-shadow:0 0 0 1px #555":""}"></i>
  <b>${l.min > -99 ? l.min + "℃" : "~31℃"}</b><strong>${l.name}</strong><span>${l.tips[0]}</span></div>`).join("");
paintIcons(document);

// 단어 순차 등장
document.querySelectorAll(".hero h1 .w").forEach((w,i) => w.style.animationDelay = (i*0.04) + "s");

const now = new Date();
if (F) $("dt").value = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
const tickClock = () => { const d = new Date(); if ($("clock")) $("clock").textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
tickClock(); setInterval(tickClock, 15000);

/* ---------- 히어로 오브 ---------- */
const root = document.documentElement;
function setOrb(feel, label) {
  const lv = level(feel);
  root.style.setProperty("--c1", lv.orb[0]); root.style.setProperty("--c2", lv.orb[1]); root.style.setProperty("--c3", lv.orb[2]);
  if (!$("orbFeel")) return;
  $("orbFeel").textContent = feel.toFixed(1) + "℃";
  $("orbLv").textContent = lv.name;
  if (label) $("orbLabel").textContent = label;
}
setOrb(feelsLike(33, 60), "예시 · 운동장 33℃ / 습도 60%");

/* ---------- 실시간 계산 ---------- */
let shown = null;
function readInputs() {
  const Ta = parseFloat($("ta").value), RH = parseFloat($("rh").value);
  if (isNaN(Ta) || isNaN(RH) || RH < 1 || RH > 100) return null;
  return { Ta, RH, feel: Math.round(feelsLike(Ta, RH)*10)/10 };
}
function updateLive() {
  const v = readInputs(), res = $("result");
  if (!v) {
    res.removeAttribute("data-lv"); $("big").classList.add("idle"); $("feel").textContent = "--.-";
    const p = $("lvPill"); p.textContent = "대기 중"; p.style.background = "var(--soft)"; p.style.color = "var(--muted)";
    $("lvMsg").textContent = ""; $("marker").style.opacity = 0;
    ["fTa","fRh","fDiff"].forEach(id => $(id).textContent = "–");
    $("tips").innerHTML = ""; $("idle").style.display = ""; shown = null; return;
  }
  const lv = level(v.feel);
  res.dataset.lv = lv.name; res.style.setProperty("--lv-bg", lv.bg);
  $("big").classList.remove("idle");
  tween($("feel"), shown ?? v.feel - 4, v.feel);
  shown = v.feel;
  const p = $("lvPill");
  if (p.textContent !== lv.name) {
    p.textContent = lv.name; p.style.background = lv.color; p.style.color = lv.fg;
    if (!REDUCED) p.animate([{ transform:"scale(.6)", opacity:0 }, { transform:"scale(1)", opacity:1 }], { duration:420, easing:SPRING });
    $("tips").innerHTML = lv.tips.map(t => `<li>${icon("check")}${esc(t)}</li>`).join("");
    if (!REDUCED) [...$("tips").children].forEach((li,i) => li.animate([{ opacity:0, transform:"translateY(8px)" }, { opacity:1, transform:"none" }], { duration:360, delay:i*70, easing:"ease-out", fill:"backwards" }));
  }
  $("lvMsg").textContent = lv.msg;
  const m = $("marker"); m.style.opacity = 1; m.style.left = clampPct(v.feel) + "%";
  $("fTa").textContent = v.Ta.toFixed(1) + "℃";
  $("fRh").textContent = v.RH + "%";
  const d = v.feel - v.Ta; $("fDiff").textContent = (d>=0?"+":"") + d.toFixed(1) + "℃";
  $("idle").style.display = "none";
  setOrb(v.feel, `입력 중 · ${picked("place")} ${v.Ta}℃ / 습도 ${v.RH}%`);
}
let raf;
function tween(el, from, to) {
  cancelAnimationFrame(raf);
  if (REDUCED) { el.textContent = to.toFixed(1); return; }
  const t0 = performance.now(), dur = 500;
  const step = t => { const p = Math.min(1,(t-t0)/dur), e = 1-Math.pow(1-p,3);
    el.textContent = (from + (to-from)*e).toFixed(1); if (p < 1) raf = requestAnimationFrame(step); };
  raf = requestAnimationFrame(step);
}
if (F) {
["ta","rh"].forEach(id => $(id).addEventListener("input", updateLive));
document.querySelectorAll(".num-field").forEach(f => f.addEventListener("click", e => { if (!e.target.closest("button")) f.querySelector("input").focus(); }));
document.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", () => {
  const inp = b.closest(".num-field").querySelector("input"), step = parseFloat(b.dataset.step);
  const base = isNaN(parseFloat(inp.value)) ? parseFloat(inp.placeholder) : parseFloat(inp.value);
  inp.value = Math.min(+inp.max, Math.max(+inp.min, +(base + step).toFixed(1)));
  updateLive();
}));

/* ---------- 저장 ---------- */
$("f").addEventListener("submit", e => {
  e.preventDefault();
  const v = readInputs(); if (!v) return;
  const rec = { id:Date.now(), ta:v.Ta, rh:v.RH, feel:v.feel, place:picked("place"), act:picked("act"), dt:$("dt").value };
  const all = load(); all.push(rec); save(all);
  render();
  const first = document.querySelector(".log-item");
  if (first && !REDUCED) first.animate([{ opacity:0, transform:"translateY(-10px)", background:"var(--primary)" }, { opacity:1, transform:"none", background:"transparent" }], { duration:900, easing:"ease-out" });
  flashSaved(e.submitter || $("f").querySelector("button[type=submit]"));
  growBars();
});
function flashSaved(btn) {
  const orig = btn.dataset.orig || (btn.dataset.orig = btn.innerHTML);
  clearTimeout(btn._t);
  btn.innerHTML = `${icon("check")} 저장했어요`;
  btn.style.background = "var(--primary)"; btn.style.color = "var(--ink)";
  if (!REDUCED) btn.animate([{ transform:"scale(1)" }, { transform:"scale(1.03)" }, { transform:"scale(1)" }], { duration:400, easing:SPRING });
  btn._t = setTimeout(() => { btn.innerHTML = orig; btn.style.background = ""; btn.style.color = ""; }, 1400);
}

}

/* ---------- 비교 · 기록 ---------- */
function bars(el, groups, labelFn) {
  if (!groups.length) { el.innerHTML = `<div class="empty"><span>${icon("chart")}</span>기록이 쌓이면 비교가 나타나요</div>`; return; }
  el.innerHTML = groups.map(g => { const lv = level(g.avg);
    return `<div class="bar-row"><div class="name">${esc(labelFn(g))}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(3,clampPct(g.avg))}%;background:${lv.color}"></div></div>
      <div class="val">${g.avg.toFixed(1)}<small>${g.n}회</small></div></div>`; }).join("");
}
function group(recs, keyFn) {
  const m = new Map();
  recs.forEach(r => { const k = keyFn(r); const g = m.get(k) || { k, sum:0, n:0 }; g.sum += r.feel; g.n++; m.set(k, g); });
  return [...m.values()].map(g => ({ k:g.k, n:g.n, avg:g.sum/g.n }));
}
function growBars() {
  if (REDUCED) return;
  document.querySelectorAll(".bar-fill").forEach((b,i) => b.animate([{ width:"0%" }, { width:b.style.width }], { duration:800, delay:i*60, easing:"cubic-bezier(.2,.8,.2,1)", fill:"backwards" }));
}
function render() {
  if (!$("logList")) return;
  const recs = load().sort((a,b) => b.dt.localeCompare(a.dt) || b.id - a.id);
  const byPlace = group(recs, r => r.place).sort((a,b) => b.avg-a.avg);
  bars($("places"), byPlace, g => g.k);
  bars($("hours"), group(recs, r => +r.dt.slice(11,13)).sort((a,b) => a.k-b.k), g => g.k + "시");
  $("sCount").textContent = recs.length;
  $("sPlace").textContent = byPlace[0] ? byPlace[0].k : "–";
  $("sMax").textContent = recs.length ? Math.max(...recs.map(r => r.feel)).toFixed(1) + "℃" : "–";
  $("logList").innerHTML = recs.length ? recs.map(r => { const lv = level(r.feel);
    return `<div class="log-item">
      <div class="log-feel"><i style="background:${lv.color}"></i>${r.feel.toFixed(1)}</div>
      <div class="log-main"><b>${esc(r.place)} · ${esc(r.act)}</b><div>${esc(r.dt.replace("T"," "))} · ${lv.name}</div></div>
      <div class="log-ta">기온 ${r.ta}℃ · 습도 ${r.rh}%</div>
      <button class="ghost x" data-del="${r.id}" aria-label="기록 삭제">${icon("x")}</button></div>`; }).join("")
    : `<div class="empty"><span>${icon("note")}</span>아직 기록이 없어요. <a href="measure.html">측정 페이지</a>에서 첫 측정을 저장해 보세요.</div>`;
}
if ($("logList")) $("logList").addEventListener("click", e => {
  const btn = e.target.closest("[data-del]"); if (!btn) return;
  const id = btn.dataset.del, item = btn.closest(".log-item");
  const done = () => { save(load().filter(r => String(r.id) !== id)); render(); };
  if (REDUCED) return done();
  item.animate([{ opacity:1, transform:"none", maxHeight:item.offsetHeight+"px" },
                { opacity:0, transform:"translateX(40px)", maxHeight:item.offsetHeight+"px", offset:.6 },
                { opacity:0, transform:"translateX(40px)", maxHeight:"0px", paddingTop:"0px", paddingBottom:"0px" }],
               { duration:380, easing:"cubic-bezier(.4,0,.2,1)", fill:"forwards" }).finished.then(done);
});
if ($("clear")) $("clear").addEventListener("click", () => {
  if (load().length && confirm("모든 측정 기록을 삭제할까요?")) { save([]); render(); }
});

/* ---------- 모션 ---------- */
// 누름: 눌림 + 튕김 + 물결
document.addEventListener("pointerdown", e => {
  const el = e.target.closest("button, .btn, .seg label");
  if (!el || REDUCED) return;
  el.animate([{ transform:"scale(1)" }, { transform:"scale(.95)" }], { duration:120, easing:"ease-out", fill:"forwards" });
  const r = el.getBoundingClientRect(), size = Math.max(r.width, r.height) * 2.2;
  const dot = document.createElement("span");
  dot.className = "ripple";
  dot.style.cssText = `left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;width:${size}px;height:${size}px`;
  el.appendChild(dot);
  dot.animate([{ transform:"translate(-50%,-50%) scale(0)", opacity:.28 }, { transform:"translate(-50%,-50%) scale(1)", opacity:0 }],
              { duration:550, easing:"cubic-bezier(.2,.8,.2,1)" }).finished.then(() => dot.remove());
  const release = () => {
    el.animate([{ transform:"scale(.95)" }, { transform:"scale(1)" }], { duration:420, easing:SPRING, fill:"forwards" });
    removeEventListener("pointerup", release); removeEventListener("pointercancel", release);
  };
  addEventListener("pointerup", release); addEventListener("pointercancel", release);
});
// 오브 마우스 따라 기울기
const orbWrap = document.querySelector(".orb-wrap");
if (orbWrap && !REDUCED && matchMedia("(pointer:fine)").matches) {
  document.querySelector(".hero").addEventListener("pointermove", e => {
    const r = orbWrap.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width, dy = (e.clientY - (r.top + r.height/2)) / r.height;
    orbWrap.style.transform = `translate(${dx*16}px, ${dy*16}px)`;
  });
  orbWrap.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1)";
}
// 스크롤 등장
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting && en.boundingClientRect.top > 0) return; // 빠르게 지나친 요소도 표시
  en.target.classList.add("in"); io.unobserve(en.target);
  if (en.target.classList.contains("two")) growBars();
}), { threshold:.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
// nav 경계선
const darks = [...document.querySelectorAll(".dark")];
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a:not(.btn)").forEach(a => a.classList.toggle("active", a.getAttribute("href") === here));
const onScroll = () => {
  const nav = $("nav"), y = 40; // 내비 중앙 높이
  nav.classList.toggle("scrolled", scrollY > 8);
  nav.classList.toggle("on-dark", darks.some(d => { const r = d.getBoundingClientRect(); return r.top < y && r.bottom > y; }));
};
addEventListener("scroll", onScroll, { passive:true }); onScroll();

render();
