(() => {
"use strict";
gsap.registerPlugin(ScrollTrigger);
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const app = $("#app");

/* =========================================================
   ICONS
   ========================================================= */
const I = {
 arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 left:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
 right:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
 layer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
 desk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
 phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>',
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>',
 pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
 zoom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8v6M8 11h6"/></svg>',
 move:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/></svg>',
 grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16M15 4v16"/></svg>',
 fit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
 dot:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>',
 sq:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="3"/></svg>',
 tri:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5l8 14H4z"/></svg>',
 ind:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21V9l6 4V9l6 4V5h6v16z"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 pages:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="12" height="16" rx="2"/><path d="M9 21h10V7"/></svg>',
 pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
 stackI:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/></svg>'
};
const SVC=[
 ["Websites & Digital Experiences","Websites designed to communicate clearly and leave a lasting impression.",'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'],
 ["Apps & Software","Digital products and custom software built around real business needs.",'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M9.5 13.5 7.5 15.5l2 2M14.5 13.5l2 2-2 2"/>'],
 ["Business Automation","Smarter systems that simplify everyday operations and save time.",'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'],
 ["Interior Design","Thoughtfully designed spaces that balance aesthetics and functionality.",'<path d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M4 18h16M6 18v2M18 18v2M6 11V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"/>'],
 ["Financial & Tax Consulting","Practical support across accounting, taxation, and financial matters.",'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
 ["US Taxation","Tax preparation and compliance support through appropriately qualified professionals.",'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'],
 ["Legal Consulting","Guidance on legal matters through qualified legal professionals.",'<path d="M12 4v16M8 20h8M5 7h14M5 7l-2.5 6a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/>'],
 ["Trade & Exports","Connecting products, businesses, and opportunities across markets.",'<path d="M3 16h18l-2 4H5zM6 16V9h5v7M11 12h6v4M8.5 9V5"/>'],
 ["Sustainable Ventures","Exploring eco-conscious products, materials, and business opportunities.",'<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15M5 19c3-4 6-7 10-9"/>'],
 ["New Ventures","Developing new ideas and exploring opportunities across industries.",'<path d="M12 3c3 2 5 5.5 5 9.5L15 17H9l-2-4.5C7 8.5 9 5 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 17l-2 3M15 17l2 3M12 17v4"/>']
];
const svgI=(d)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const btn=(t,href,cls="btn-solid")=>`<a href="${href}" class="btn ${cls}"><span class="lbl"><span>${t}</span><span>${t}</span></span></a>`;

/* =========================================================
   SHARED FOOTER
   ========================================================= */
function footer(){
  return `<footer class="foot">
   <div class="wrap">
    <p class="eyebrow" data-up>Start something</p>
    <h2 data-blur style="margin-top:16px">Have an idea?<br><em>Let's build it.</em></h2>
    <div class="row">${btn("View work","#works","btn-ghost")}${btn("Start a project","#contact")}</div>
   </div>
   <div class="f-markbox"><div class="f-mark"><svg viewBox="0 0 100 100" fill="currentColor"><use href="#mark"/></svg></div></div>
   <div class="socials">
    ${[["Nirvon X","https://www.instagram.com/nirvon_x"],["LinkedIn","https://www.linkedin.com"]].map(([s,u])=>`<a href="${u}" target="_blank" rel="noopener"><span>${s}</span>${I.arrow}</a>`).join("")}
   </div>
   <div class="fcols">
    <div><h5>Studio</h5><a href="#about">About</a><a href="#works">Work</a><a href="#services">Services</a><a href="#contact">Contact</a></div>
    <div><h5>Services</h5><a href="#services">Brand websites</a><a href="#services">Redesigns</a><a href="#services">eCommerce</a><a href="#services">CMS builds</a></div>
    <div><h5>Resources</h5><a href="#home" data-scroll="#group">What we do</a><a href="#works">Our work</a><a href="#about">Process</a></div>
    <div><h5>Contact</h5><a href="mailto:nirvongroups@gmail.com">nirvongroups@gmail.com</a><a href="tel:+917676665428">+91 76766 65428</a><span class="muted">Based in India</span><span class="muted">Working worldwide</span></div>
   </div>
   <div class="copy"><span>© 2026 Nirvon Studio</span><span>Designed and built in-house</span></div>
  </footer>`;
}

/* =========================================================
   PAGES
   ========================================================= */
function pageHome(){
  const strip=ALL.map(({p,src})=>`<div class="shot" data-id="${p.id}"><img alt="${p.name} website" data-d="${src}" data-m="${p.m}" src="${src}"></div>`).join("");
  const cols=[0,1,2].map(ci=>`<div class="col">${[0,1,2,3].map(k=>{const a=ALL[(ci*5+k*3+ci)%ALL.length];return `<img alt="${a.p.name}" src="${a.src}">`;}).join("")}</div>`).join("");
  return `
  <section class="hero">
    <div class="hero-bg">${[.9,.55,.25,0,0,0,.25,.55,.9].map((o,i)=>`<span style="--o:${o};--d:${-i*.7}s"></span>`).join("")}</div>
    <div class="hero-inner">
      <span class="pill" data-up><i></i>AN INDEPENDENT, MULTI-SECTOR GROUP</span>
      <h1 data-blur>We build what <em>moves</em><br>business <em>forward.</em></h1>
      <p class="sub" data-up><strong>Different disciplines. A shared drive to build.</strong><br>We work across industries, bringing together ideas, expertise, and execution to create things that serve a purpose and stand the test of time.</p>
      <div class="row" data-up>${btn("Start a project","#contact")}${btn("View work","#works","btn-ghost")}</div>
    </div>
  </section>

  <section class="cv-wrap"><div class="canvas" id="canvas"><div class="cv-in">
    <div class="cv-top">
      <div class="cv-chip"><svg viewBox="0 0 100 100" fill="currentColor"><use href="#mark"/></svg>${I.right}</div>
      <div class="cv-mid">
        <div class="seg"><button class="on" data-dev="d" aria-label="Desktop preview">${I.desk}</button><button data-dev="m" aria-label="Mobile preview">${I.phone}</button></div>
        <div class="cv-read">W <b id="cvw">1440px</b> &nbsp;|&nbsp; <b id="cvz">100%</b></div>
      </div>
      <div class="avs"><span style="background:#7d6cff">AN</span><span style="background:#e2552f">RK</span></div>
    </div>
    <div class="cv-body">
      <aside class="cv-left">
        <div class="tabs"><span>Pages</span><span class="on">Layers</span><span>Assets</span></div>
        <div class="sel"><span>Home</span>${I.right}</div>
        <div class="layers" id="layers">${["Hero","Clients","Introduction","Selected work","Services","Process","Pricing","FAQs","Footer"].map((l,i)=>`<div class="${i?"":"on"}">${I.layer}${l}</div>`).join("")}</div>
      </aside>
      <div class="cv-stage" id="stage">
        <div class="strip" id="strip">${strip}${strip}</div>
        <div class="tools" id="tools">
          <button class="on" data-t="play" data-tip="Pause autoplay" aria-label="Autoplay">${I.pause}</button>
          <button data-t="zoom" data-tip="Click a shot to open it" aria-label="Open mode">${I.zoom}</button>
          <button data-t="drag" data-tip="Drag the strip" aria-label="Drag mode">${I.move}</button>
          <button data-t="speed" data-tip="Change speed" aria-label="Speed">1x</button>
          <button data-t="grid" data-tip="Show layout grid" aria-label="Grid">${I.grid}</button>
          <button data-t="fit" data-tip="Zoom out" aria-label="Fit">${I.fit}</button>
        </div>
      </div>
      <aside class="cv-right">
        <div class="al">${"<i></i>".repeat(8)}</div>
        <div class="pg"><h4>Position</h4><div class="pr">Type <b class="span2">Relative</b></div></div>
        <div class="pg"><h4>Size</h4><div class="pr">Width <b id="cvw2">1fr</b><b>Fill</b></div><div class="pr">Height <b>Auto</b><b>Fit</b></div><div class="pr">Max width <b>1320</b><b>Fixed</b></div></div>
        <div class="pg"><h4>Layout</h4><div class="pr">Direction <b>Row</b><b>Wrap</b></div><div class="pr">Gap <b>22</b><b>px</b></div><div class="pr">Align <b class="span2">Center</b></div></div>
      </aside>
    </div>
  </div></div></section>

  <div class="stack" data-stagger>
    ${[["Figma",I.dot],["Framer",I.tri],["Webflow",I.sq],["Shopify",I.dot],["Next.js",I.tri],["GSAP",I.sq],["Three.js",I.tri],["Blender",I.dot]].map(([n,i])=>`<span>${i}${n}</span>`).join("")}
  </div>

  <section class="roll-sec" id="group">
    <div class="rl-in" id="rlin">
      <div class="rl-bg" id="rlbg">${DISC.map((d,i)=>`<img class="${i?"":"on"}" src="${d.img}" alt="">`).join("")}</div>
      <div class="rl-shade"></div>
      <div class="rl-top"><span class="eyebrow">What we do</span><span class="rl-count" id="rlcount">01 / ${String(DISC.length).padStart(2,"0")}</span></div>
      <h2 class="rl-head"><span class="rl-a">We build</span><span class="rl-w" id="rlword" aria-live="polite">${DISC[0].word}.</span></h2>
      <p class="rl-desc" id="rldesc"><b id="rlname">${DISC[0].name}</b> · <span id="rltext">${DISC[0].desc}</span></p>
      <div class="rl-nav" id="rlnav">${DISC.map((d,i)=>`<button class="${i?"":"on"}" data-i="${i}">${d.name}</button>`).join("")}</div>
    </div>
  </section>

  <section class="devices" id="gallery">
    <div class="d-sticky" id="dsticky">
      <div class="d-info" id="dinfo">
        <span class="eyebrow d-eye">Selected work · <span id="didx">01 / 04</span></span>
        <h3 class="t-name d-name" id="dname" aria-live="polite"></h3>
        <p class="d-tag" id="dtag"></p>
        <p class="d-meta" id="dmeta"></p>
        <div class="row d-btns"><a id="dlink" class="btn btn-solid" href="#works">View project</a><a id="dlive" class="btn btn-ghost" href="#" target="_blank" rel="noopener">Live site ↗</a></div>
        <div class="d-dots" id="ddots">${P.map((p,i)=>`<button data-i="${i}" aria-label="Show ${p.name}"></button>`).join("")}</div>
      </div>
      <div class="g-label" id="glabel">View project</div>
      <div class="g-hint" id="ghint">Scroll to see each site live</div>
    </div>
  </section>

  <section class="sec" id="services"><div class="wrap">
    <div class="sec-head">
      <h2 data-blur>What we bring <em>to the table</em></h2>
      <div class="row">${btn("All services","#contact","btn-ghost")}${btn("Start a project","#contact")}</div>
    </div>
    <div class="svc" id="svc" data-stagger>${SVC.map(([n,t,d])=>`<div class="tile glowable">${svgI(d)}<span>${n}</span><small>${t}</small></div>`).join("")}</div>
    <div class="plat">
      <div class="plat-l"><canvas id="stars"></canvas>
        <h3 data-blur>Different disciplines.<br><em>One standard.</em></h3>
        <p data-up>Every business has different needs. We bring together the right skills, tools, and expertise to deliver thoughtful solutions across industries.</p>
        <div data-up><a href="#home" data-scroll="#group" class="btn btn-ghost"><span class="lbl"><span>See What We Do</span><span>See What We Do</span></span></a></div>
      </div>
      <div class="plat-r" data-stagger>${[["Technology","Web & App Development"],["Design","Interior Design"],["Consulting","Financial Advisory"],["Business","Trade & Exports"],["Technology","Custom Software"],["Design","Digital Experiences"],["Consulting","Taxation Services"],["Business","Sustainable Ventures"]].map(([c,n])=>`<div><small>${c}</small><span>${n}</span></div>`).join("")}</div>
    </div>
  </div></section>

  <div class="marq"><div class="marq-t" id="marq">${Array(4).fill(["Technology","Design","Consulting","Trade &amp; Exports","Sustainable Ventures","New Businesses"].map((t,i)=>`<span>${t}</span><b>✦</b>`).join("")).join("")}</div></div>

  <section class="sec"><div class="wrap">
    <div class="sec-head"><h2 data-blur>How we <em>work</em></h2><p class="muted" style="max-width:38ch" data-up>Four steps, in this order, on every project. You always know what happens next.</p></div>
    <div class="bento" data-stagger>
      <div class="bx glowable"><span class="n">01 — DISCOVER</span><h3>Start with the goal</h3><p>A short workshop to learn your audience, your offer and what success looks like in numbers.</p>
        <div class="viz notes"><span style="left:4%;top:20%;transform:rotate(-4deg)">Who visits?</span><span style="left:30%;top:52%;transform:rotate(3deg)">What should they do?</span><span style="left:58%;top:12%;transform:rotate(-2deg)">How do we measure it?</span><span style="left:66%;top:62%;transform:rotate(5deg);border-color:var(--accent)">Launch by March</span></div></div>
      <div class="bx glowable"><span class="n">02 — DESIGN</span><h3>Design in detail</h3><p>Real content in real layouts, reviewed on your phone, not in slides.</p>
        <div class="viz frames"><div style="left:0;top:10%;width:62%;height:90%"><img alt="" src="${IMG["ostrich-d1"]}"></div><div style="left:40%;top:0;width:34%;height:100%;border-color:var(--accent)"><img alt="" src="${IMG["ostrich-m0"]}"></div></div></div>
      <div class="bx glowable"><span class="n">03 — BUILD</span><h3>Build it properly</h3><p>Clean, fast code or a tidy no-code build your team can edit.</p>
        <div class="viz"><div class="code" id="code"></div></div></div>
      <div class="bx glowable"><span class="n">04 — LAUNCH</span><h3>Launch and improve</h3><p>We ship, watch the numbers for a month and tune what is not working.</p>
        <div class="viz chart"><svg viewBox="0 0 400 150" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
          <g stroke="var(--line)" stroke-width="1">${[30,70,110].map(y=>`<line x1="0" x2="400" y1="${y}" y2="${y}"/>`).join("")}</g>
          <path id="cfill" d="M0,130 C60,125 90,110 140,104 C190,98 220,70 270,58 C320,46 350,26 400,18 L400,150 L0,150Z" fill="url(#cg)"/>
          <path id="cline" d="M0,130 C60,125 90,110 140,104 C190,98 220,70 270,58 C320,46 350,26 400,18" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
          <circle cx="400" cy="18" r="5" fill="var(--accent)"/></svg></div></div>
    </div>
  </div></section>

  ${footer()}`;
}

function pageWorks(){
  return `<section class="ph">
    <h1 data-blur>Selected <em>Work</em></h1>
    <div class="chips" data-up>${CATS.map((c,i)=>`<button class="${i?"":"on"}" data-c="${c}">${c}</button>`).join("")}</div>
  </section>
  <div class="wrap"><div class="grid2" id="wgrid">${P.map(card).join("")}</div></div>
  ${footer()}`;
}
function card(p){
  return `<article class="card" data-c="${p.cat}">
    <a class="im" href="#p-${p.id}"><img alt="${p.name} website" src="${p.d[0]}"><em>View project</em></a>
    <div class="meta"><div><b>${p.name}</b><small>${p.cat} · ${p.loc}</small></div><div class="mb"><a class="btn" href="${p.url}" target="_blank" rel="noopener">Live site ↗</a><a class="btn" href="#p-${p.id}">Case study</a></div></div>
  </article>`;
}

function pageProject(id){
  const i=Math.max(0,P.findIndex(p=>p.id===id)); const p=P[i]; const next=P[(i+1)%P.length];
  const more=[1,2,3].map(k=>P[(i+k)%P.length]);
  const slides=[...p.d.slice(0,2),p.m,...p.d.slice(2)];
  return `<h1 class="pj-title" data-blur>${p.name}</h1>
  <div class="wrap">
    <div class="ov">
      <div data-up><h3>Project overview</h3><p><em class="tagq">“${p.tag}”</em> ${p.brief}</p></div>
      <div class="row" data-up>${btn("All work","#works","btn-ghost")}<a href="${p.url}" target="_blank" rel="noopener" class="btn btn-ghost"><span class="lbl"><span>Visit live site ↗</span><span>Visit live site ↗</span></span></a>${btn("Next project","#p-"+next.id)}</div>
    </div>
    <div class="metas" data-stagger>
      <div>${I.ind}<b>${p.cat}</b><small>Industry</small></div>
      <div>${I.cal}<b>${p.year}</b><small>Launched</small></div>
      <div>${I.pin}<b>${p.loc}</b><small>Location</small></div>
      <div>${I.stackI}<a href="${p.url}" target="_blank" rel="noopener" class="lnk">${p.url.replace(/^https?:\/\//,"").replace(/\/$/,"")}</a><small>Live site</small></div>
    </div>
  </div>
  <div class="car" id="car"><div class="car-t" id="cart">${slides.map(src=>`<img class="${src===p.m?"m":""}" alt="${p.name} screen" src="${src}">`).join("")}</div>
    <button class="arr l" id="cl" aria-label="Previous image">${I.left}</button><button class="arr r" id="cr" aria-label="Next image">${I.right}</button></div>
  <div class="wrap">
    <div class="trio" data-stagger>
      <div class="glowable"><span class="eyebrow">01</span><h3>The brief</h3><p>${p.brief}</p></div>
      <div class="glowable"><span class="eyebrow">02</span><h3>The approach</h3><p>${p.approach}</p></div>
      <div class="glowable"><span class="eyebrow">03</span><h3>The result</h3><p>${p.result}</p></div>
    </div>
    <div class="about">
      <div><h3 data-up>About the project</h3><div class="txt">
        <p data-words>${p.name} needed a website that felt as considered as the work behind it. ${p.approach}</p>
        <p data-up>The site is organised into ${p.list.length} parts: ${p.list.join(", ")}. Each section answers one question and points to one next step.</p>
        <p data-up>It is responsive from phone to wide desktop, and the ${(p.feat.slice(0,-1).join(", ")+" and "+p.feat.slice(-1)).toLowerCase()} were designed alongside the visuals rather than added at the end.</p>
      </div></div>
      <aside class="side"><div><h5>Pages</h5><ul>${p.list.map(x=>`<li>${x}</li>`).join("")}</ul></div><div><h5>Features</h5><ul>${p.feat.map(x=>`<li>${x}</li>`).join("")}</ul></div></aside>
    </div>
    <div class="sec-head" style="margin-top:110px;margin-bottom:28px"><h2 data-blur style="font-size:clamp(30px,3vw,44px)">More <em>projects</em></h2>${btn("All projects","#works","btn-ghost")}</div>
    <div class="grid3" style="margin-top:0" data-stagger>${more.map(card).join("")}</div>
  </div>
  ${footer()}`;
}

function pageAbout(){
  return `<section class="ph"><span class="pill" data-up><i></i>About Nirvon</span>
    <h1 data-blur style="margin-top:24px">A small studio,<br><em>big standards</em></h1></section>
  <div class="wrap">
    <p class="lead" data-words>We are designers and developers who care about the details most people never notice: how a page loads, how a button feels, how a headline lands on a phone.</p>
  </div>
  <div class="reel"><div class="reel-t">${[...ALL,...ALL].map(a=>`<img alt="${a.p.name}" src="${a.src}">`).join("")}</div></div>
  <div class="wrap">
    <div class="vals" data-stagger>
      <div class="glowable"><span class="eyebrow">Principle</span><h3>Clarity <em>first</em></h3><p>Every page has one job. If a visitor has to think about where to click, we have more work to do.</p></div>
      <div class="glowable"><span class="eyebrow">Principle</span><h3>Motion with <em>meaning</em></h3><p>Animation should guide the eye and explain what changed. It should never stand between you and the content.</p></div>
      <div class="glowable"><span class="eyebrow">Principle</span><h3>Built to <em>last</em></h3><p>We hand over sites your team can run, with clean structure, real documentation and no lock-in.</p></div>
    </div>
    <div class="testi" style="grid-template-columns:1fr;margin-top:90px">
      <div class="stats" style="flex-direction:row;flex-wrap:wrap"><div style="flex:1 1 180px;border-bottom:0;border-right:1px solid var(--line)"><b><span data-count="40">0</span><sup>+</sup></b><small>Projects shipped</small></div><div style="flex:1 1 180px;border-bottom:0;border-right:1px solid var(--line)"><b><span data-count="12">0</span></b><small>Industries served</small></div><div style="flex:1 1 180px;border-bottom:0;border-right:1px solid var(--line)"><b><span data-count="92">0</span><sup>%</sup></b><small>Clients who return</small></div><div style="flex:1 1 180px;border-bottom:0"><b><span data-count="6">0</span><sup>+</sup></b><small>Years of practice</small></div></div>
    </div>
  </div>
  ${footer()}`;
}

function pageContact(){
  return `<section class="ph"><h1 data-blur>Let's <em>talk</em></h1><p class="muted" style="margin-top:20px" data-up>Tell us a little about the project. We reply within one working day.</p></section>
  <div class="wrap"><div class="ct">
    <div class="ct-info" data-stagger>
      <div><small>Email</small><div class="val"><span id="em">nirvongroups@gmail.com</span><button data-copy="em">Copy</button></div></div>
      <div><small>Phone</small><div class="val"><span>+91 76766 65428</span></div></div>
      <div><small>Studio</small><div class="val"><span>Based in India, working worldwide</span></div></div>
      <div><small>Hours</small><div class="val"><span>Mon–Fri, 10:00–19:00 IST</span></div></div>
    </div>
    <form class="f" id="cf" data-up novalidate>
      <label for="fn">Your name<input id="fn" name="name" required placeholder="Asha Raman"></label>
      <label for="fe">Email<input id="fe" name="email" type="email" required placeholder="asha@company.com"></label>
      <label>Budget<div class="bud" id="bud">${["Under ₹50k","₹50k–1L","₹1L–2L","₹2L+"].map((b,i)=>`<button type="button" class="${i===1?"on":""}">${b}</button>`).join("")}</div></label>
      <label for="fm">Project details<textarea id="fm" name="msg" placeholder="What are you building, and when do you need it?"></textarea></label>
      <div class="row" style="justify-content:flex-start"><button class="btn btn-solid" type="submit"><span class="lbl"><span>Send enquiry</span><span>Send enquiry</span></span></button></div>
      <div id="fnote" hidden class="note"></div>
    </form>
  </div></div>
  ${footer()}`;
}

/* =========================================================
   SMOOTH SCROLL
   ========================================================= */
let lenis=null, vel=0;
if(!RM && window.Lenis){
  lenis=new Lenis({lerp:.09,smoothWheel:true});
  lenis.on("scroll",(e)=>{vel=e.velocity;ScrollTrigger.update();});
  gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);
}
const scrollTo=(target,imm)=>{ if(lenis) lenis.scrollTo(target,{immediate:!!imm,offset:typeof target==="number"?0:-90,duration:1.4}); else { if(typeof target==="number") window.scrollTo(0,target); else { const el=typeof target==="string"?$(target):target; el&&el.scrollIntoView({behavior:imm?"auto":"smooth"}); } } };

/* =========================================================
   TILE TRANSITION
   ========================================================= */
const tilesEl=$("#tiles"), loaderMark=$("#loader svg");
function buildTiles(){
  const cols=Math.ceil(innerWidth/110), rows=Math.ceil(innerHeight/110);
  tilesEl.style.gridTemplateColumns=`repeat(${cols},1fr)`;tilesEl.style.gridTemplateRows=`repeat(${rows},1fr)`;
  const vis=!tilesEl.classList.contains("off");
  tilesEl.innerHTML="";for(let i=0;i<cols*rows;i++){const d=document.createElement("div");d.style.opacity=vis?1:0;tilesEl.appendChild(d);}
}
function cover(){return new Promise(res=>{
  tilesEl.classList.remove("off");const t=tilesEl.children;
  gsap.timeline({onComplete:res})
   .to(t,{opacity:1,duration:.01,stagger:{each:RM?0:.38/t.length,from:"random"}})
   .to(loaderMark,{opacity:1,scale:1,duration:.3,ease:"power2.out"},"+=.05");
});}
function reveal(){return new Promise(res=>{
  const t=tilesEl.children;
  gsap.timeline({onComplete:()=>{tilesEl.classList.add("off");res();}})
   .to(loaderMark,{opacity:0,scale:.85,duration:.25,ease:"power2.in"},"+=.15")
   .to(t,{opacity:0,duration:.01,stagger:{each:RM?0:.5/t.length,from:"random"}});
});}

/* =========================================================
   ROUTER
   ========================================================= */
let disposers=[], busy=false, current="";
const addD=f=>disposers.push(f);
function parse(h){h=(h||"").replace(/^#\/?/,"");if(!h||h==="home")return{n:"home"};if(h.startsWith("p-"))return{n:"project",id:h.slice(2)};if(["works","about","contact"].includes(h))return{n:h};if(h==="services")return{n:"home",anchor:"#services"};return{n:"home"};}
function render(r){
  const html=r.n==="works"?pageWorks():r.n==="project"?pageProject(r.id):r.n==="about"?pageAbout():r.n==="contact"?pageContact():pageHome();
  app.innerHTML=html;
  $$(".links a").forEach(a=>a.classList.toggle("on",a.dataset.r===(r.anchor?"services":(r.n==="project"?"works":r.n))));
  current=r.n+(r.id||"");
  initCommon();
  if(r.n==="home")initHome();
  if(r.n==="works")initWorks();
  if(r.n==="project")initProject();
  if(r.n==="contact")initContact();
}
async function go(href,push=true){
  const r=parse(href);
  if(busy)return;
  if(r.n+(r.id||"")===current){ if(r.anchor)scrollTo(r.anchor); else scrollTo(0); if(push)try{history.pushState(null,"",href);}catch(e){} return; }
  busy=true; closeMenu();
  await cover();
  disposers.forEach(f=>{try{f();}catch(e){}});disposers=[];
  ScrollTrigger.getAll().forEach(s=>s.kill()); gsap.killTweensOf("*");
  if(lenis)lenis.scrollTo(0,{immediate:true,force:true}); window.scrollTo(0,0);
  render(r);
  if(push)try{history.pushState(null,"",href);}catch(e){}
  await new Promise(r2=>requestAnimationFrame(()=>requestAnimationFrame(r2)));
  ScrollTrigger.refresh();
  if(r.anchor){ const el=$(r.anchor); if(el){ const y=el.getBoundingClientRect().top+scrollY-90; if(lenis)lenis.scrollTo(y,{immediate:true,force:true}); else scrollTo(y,true);} }
  const rv=reveal(); setTimeout(intro,RM?0:420); await rv; busy=false;
}
document.addEventListener("click",e=>{
  const a=e.target.closest("a[href^='#']"); if(!a)return;
  e.preventDefault(); const href=a.getAttribute("href");
  if(a.dataset.scroll && current==="home"){ scrollTo(a.dataset.scroll); return; }
  if(a.dataset.scroll){ go(href).then(()=>setTimeout(()=>scrollTo(a.dataset.scroll),200)); return; }
  go(href);
});
addEventListener("popstate",()=>go(location.hash||"#home",false));

/* =========================================================
   COMMON ANIMATIONS
   ========================================================= */
function splitWords(el){
  const walk=n=>{[...n.childNodes].forEach(c=>{
    if(c.nodeType===3){const parts=c.textContent.split(/(\s+)/);const frag=document.createDocumentFragment();
      parts.forEach(t=>{if(!t)return;if(/^\s+$/.test(t))frag.appendChild(document.createTextNode(" "));else{const s=document.createElement("span");s.className="w";s.textContent=t;frag.appendChild(s);}});c.replaceWith(frag);}
    else if(c.nodeType===1&&c.tagName!=="BR")walk(c);});};
  walk(el);return $$(".w",el);
}
let introQueue=[];
function blurIn(words,delay=0){return gsap.fromTo(words,{opacity:0,filter:"blur(14px)",yPercent:28},{opacity:1,filter:"blur(0px)",yPercent:0,duration:1.15,ease:"power3.out",stagger:.075,delay,clearProps:"filter"});}
function initCommon(){
  introQueue=[];
  const fold=innerHeight*.92;
  $$("[data-blur]").forEach(el=>{
    const w=splitWords(el);
    if(RM)return;
    gsap.set(w,{opacity:0,filter:"blur(14px)",yPercent:28});
    if(el.getBoundingClientRect().top<fold) introQueue.push(()=>blurIn(w));
    else ScrollTrigger.create({trigger:el,start:"top 85%",once:true,onEnter:()=>blurIn(w)});
  });
  $$("[data-words]").forEach(el=>{
    const w=splitWords(el); if(RM)return;
    gsap.fromTo(w,{opacity:.16},{opacity:1,stagger:.1,ease:"none",scrollTrigger:{trigger:el,start:"top 82%",end:"bottom 50%",scrub:true}});
  });
  $$("[data-up]").forEach(el=>{
    if(RM)return;
    const from={opacity:0,y:30,filter:"blur(8px)"},to={opacity:1,y:0,filter:"blur(0px)",duration:1,ease:"power3.out",clearProps:"filter,transform"};
    gsap.set(el,from);
    if(el.getBoundingClientRect().top<fold) introQueue.push(()=>gsap.to(el,{...to,delay:.35}));
    else ScrollTrigger.create({trigger:el,start:"top 88%",once:true,onEnter:()=>gsap.to(el,to)});
  });
  $$("[data-stagger]").forEach(el=>{
    if(RM)return; const kids=[...el.children];
    gsap.set(kids,{opacity:0,y:40,filter:"blur(8px)"});
    const run=()=>gsap.to(kids,{opacity:1,y:0,filter:"blur(0px)",duration:1,ease:"power3.out",stagger:.07,clearProps:"filter,transform"});
    if(el.getBoundingClientRect().top<fold) introQueue.push(run);
    else ScrollTrigger.create({trigger:el,start:"top 88%",once:true,onEnter:run});
  });
  // footer mark rise
  const fm=$(".f-mark");
  if(fm&&!RM) gsap.fromTo(fm,{yPercent:55,opacity:.12},{yPercent:0,opacity:1,ease:"none",scrollTrigger:{trigger:".foot",start:"top 85%",end:"bottom bottom",scrub:true}});
  // cursor glow
  $$(".glowable").forEach(el=>{
    const mv=e=>{const r=el.getBoundingClientRect();el.style.setProperty("--mx",e.clientX-r.left+"px");el.style.setProperty("--my",e.clientY-r.top+"px");};
    const lv=()=>{el.style.setProperty("--mx","-999px");};
    el.addEventListener("pointermove",mv);el.addEventListener("pointerleave",lv);
  });
  // counters
  $$("[data-count]").forEach(el=>{
    const t=+el.dataset.count; if(RM){el.textContent=t;return;}
    ScrollTrigger.create({trigger:el,start:"top 90%",once:true,onEnter:()=>{const o={v:0};gsap.to(o,{v:t,duration:1.8,ease:"power2.out",onUpdate:()=>el.textContent=Math.round(o.v)});}});
  });
  // copy buttons
  $$("[data-copy]").forEach(b=>b.addEventListener("click",()=>{const txt=$("#"+b.dataset.copy).textContent;
    const ok=()=>{b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1600);};
    try{navigator.clipboard.writeText(txt).then(ok,()=>{selectText($("#"+b.dataset.copy));b.textContent="Selected";});}catch(e){selectText($("#"+b.dataset.copy));}
  }));
}
function selectText(el){const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);}
function intro(){ introQueue.forEach(f=>f()); introQueue=[]; }

/* =========================================================
   HOME
   ========================================================= */
function initHome(){
  // hero blur-out as canvas rises
  if(!RM){
    gsap.to(".hero-inner",{filter:"blur(10px)",opacity:.1,y:-80,scale:.96,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom 10%",scrub:true}});
    gsap.fromTo("#canvas",{rotateX:18,scale:.88,y:40},{rotateX:0,scale:1,y:0,ease:"none",scrollTrigger:{trigger:".cv-wrap",start:"top 100%",end:"top 12%",scrub:true}});
    $$(".intro-r .col").forEach((c,i)=>gsap.fromTo(c,{y:[60,180,110][i]},{y:[-140,-380,-240][i],ease:"none",scrollTrigger:{trigger:".intro",start:"top bottom",end:"bottom top",scrub:true}}));
  }
  initEditor(); initRolling(); initGallery(); initMarquee(); initStars(); initGlobe(); initQuotes(); initFaq(); initCode();
  // services shared glow across grid
  const svc=$("#svc"); if(svc){svc.addEventListener("pointermove",e=>{$$(".tile",svc).forEach(t=>{const r=t.getBoundingClientRect();t.style.setProperty("--mx",e.clientX-r.left+"px");t.style.setProperty("--my",e.clientY-r.top+"px");});});svc.addEventListener("pointerleave",()=>$$(".tile",svc).forEach(t=>t.style.setProperty("--mx","-999px")));}
  // chart draw
  const cl=$("#cline"); if(cl&&!RM){const L=cl.getTotalLength();gsap.fromTo(cl,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:2,ease:"power2.inOut",scrollTrigger:{trigger:cl,start:"top 85%",once:true}});}
}

function initRolling(){
  const sec=$("#group"),word=$("#rlword"); if(!sec||!word)return;
  const N=DISC.length,imgs=$$("#rlbg img"),btns=$$("#rlnav button"),count=$("#rlcount"),nameEl=$("#rlname"),textEl=$("#rltext"),desc=$("#rldesc");
  const CH="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%&/*+<>";
  let raf=0,active=0;
  // scramble the word letter by letter into the next one
  const scramble=to=>{cancelAnimationFrame(raf);const from=word.textContent,len=Math.max(from.length,to.length),t0=performance.now(),dur=RM?0:750;
    const step=t=>{const p=dur?Math.min(1,(t-t0)/dur):1;let out="";
      for(let i=0;i<len;i++){const reveal=(i/len)*.6+.4;const tc=to[i]||"";
        if(p>=reveal){out+=tc;}else if(tc===" "||from[i]===" "&&p<.2){out+=" ";}else if(i<to.length||p<reveal*.8){out+=CH[(Math.random()*CH.length)|0];}}
      word.textContent=out; if(p<1)raf=requestAnimationFrame(step);};
    raf=requestAnimationFrame(step);};
  const setActive=i=>{if(i===active)return;active=i;const d=DISC[i];
    scramble(d.word+".");
    imgs.forEach((im,k)=>{if(k===i){im.classList.remove("on");void im.offsetWidth;im.classList.add("on");}else im.classList.remove("on");});
    btns.forEach((b,k)=>b.classList.toggle("on",k===i));
    count.textContent=String(i+1).padStart(2,"0")+" / "+String(N).padStart(2,"0");
    if(RM){nameEl.textContent=d.name;textEl.textContent=d.desc;return;}
    gsap.timeline().to(desc,{opacity:0,y:-10,filter:"blur(6px)",duration:.2}).add(()=>{nameEl.textContent=d.name;textEl.textContent=d.desc;}).to(desc,{opacity:1,y:0,filter:"blur(0px)",duration:.45,ease:"power3.out"});
  };
  ScrollTrigger.create({trigger:sec,start:"top top",end:"bottom bottom",scrub:true,onUpdate:st=>setActive(Math.min(N-1,Math.floor(st.progress*N*.999)))});
  btns.forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.i;scrollTo(sec.offsetTop+(sec.offsetHeight-innerHeight)*((i+.5)/N));}));
  addD(()=>cancelAnimationFrame(raf));
}

function initEditor(){
  const stage=$("#stage"),strip=$("#strip"),tools=$("#tools"); if(!strip)return;
  let x=0,speed=1,playing=!RM,mode="none",drag=null,last=performance.now(),raf;
  const layers=$$("#layers div"); let li=0;
  const loop=t=>{const dt=Math.min(50,t-last);last=t;
    if(playing&&!drag) x-=.045*speed*dt;
    const half=strip.scrollWidth/2; if(half>0){ if(-x>=half)x+=half; if(x>0)x-=half; }
    strip.style.transform=`translate3d(${x}px,0,0)`;
    const step=(strip.firstElementChild?.offsetWidth||400)+22; const idx=Math.floor(-x/step)%layers.length;
    if(idx!==li&&idx>=0){layers[li]?.classList.remove("on");li=idx;layers[li]?.classList.add("on");}
    raf=requestAnimationFrame(loop);};
  raf=requestAnimationFrame(loop); addD(()=>cancelAnimationFrame(raf));
  const setPlay=v=>{playing=v;const b=$("[data-t=play]",tools);b.classList.toggle("on",v);b.innerHTML=v?I.pause:I.play;b.dataset.tip=v?"Pause autoplay":"Play autoplay";};
  setPlay(playing);
  tools.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const t=b.dataset.t;
    if(t==="play")setPlay(!playing);
    if(t==="zoom"||t==="drag"){mode=mode===t?"none":t;stage.classList.toggle("zoom",mode==="zoom");stage.classList.toggle("drag",mode==="drag");$$("[data-t=zoom],[data-t=drag]",tools).forEach(x=>x.classList.toggle("on",x.dataset.t===mode));}
    if(t==="speed"){speed=speed===1?2:speed===2?.5:1;b.textContent=speed===.5?".5x":speed+"x";}
    if(t==="grid"){stage.classList.toggle("grid");b.classList.toggle("on");}
    if(t==="fit"){const on=b.classList.toggle("on");gsap.to(strip,{scale:on?.78:1,transformOrigin:"0% 50%",duration:.6,ease:"power3.inOut"});$("#cvz").textContent=on?"78%":"100%";b.dataset.tip=on?"Zoom in":"Zoom out";}
  });
  $$(".seg button").forEach(b=>b.addEventListener("click",()=>{
    $$(".seg button").forEach(x=>x.classList.toggle("on",x===b));const m=b.dataset.dev==="m";
    strip.classList.toggle("mobile",m);$$("img",strip).forEach(im=>im.src=m?im.dataset.m:im.dataset.d);
    $("#cvw").textContent=m?"390px":"1440px";
  }));
  stage.addEventListener("click",e=>{const s=e.target.closest(".shot");if(s&&mode==="zoom"&&!stage.dataset.moved)go("#p-"+s.dataset.id);});
  stage.addEventListener("pointerdown",e=>{if(mode!=="drag")return;drag={sx:e.clientX,x0:x};stage.dataset.moved="";stage.classList.add("dragging");stage.setPointerCapture(e.pointerId);});
  stage.addEventListener("pointermove",e=>{if(!drag)return;x=drag.x0+(e.clientX-drag.sx);if(Math.abs(e.clientX-drag.sx)>4)stage.dataset.moved="1";});
  const up=()=>{drag=null;stage.classList.remove("dragging");setTimeout(()=>stage.dataset.moved="",50);};
  stage.addEventListener("pointerup",up);stage.addEventListener("pointercancel",up);
}

function initMarquee(){
  const m=$("#marq"); if(!m)return; let x=0,dir=1,raf;
  const loop=()=>{ if(vel)dir=vel>0?1:-1; const sp=(RM?0:.6)+Math.min(Math.abs(vel)*.35,14); x-=sp*dir; const half=m.scrollWidth/2; if(-x>=half)x+=half; if(x>0)x-=half; m.style.transform=`translate3d(${x}px,0,0)`; vel*=.9; raf=requestAnimationFrame(loop); };
  raf=requestAnimationFrame(loop); addD(()=>cancelAnimationFrame(raf));
}

function initStars(){
  const cv=$("#stars"); if(!cv)return; const ctx=cv.getContext("2d"); let raf,st=[];
  const size=()=>{cv.width=cv.offsetWidth*devicePixelRatio;cv.height=cv.offsetHeight*devicePixelRatio;st=Array.from({length:120},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.3*devicePixelRatio+.3,p:Math.random()*6}));};
  size(); const ro=new ResizeObserver(size);ro.observe(cv);
  const col=()=>getComputedStyle(document.documentElement).getPropertyValue("--fg").trim()||"#fff";
  const loop=t=>{ctx.clearRect(0,0,cv.width,cv.height);ctx.fillStyle=col();st.forEach(s=>{ctx.globalAlpha=.25+.5*Math.abs(Math.sin(t/1400+s.p));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill();});ctx.globalAlpha=1;raf=requestAnimationFrame(loop);};
  raf=requestAnimationFrame(loop); addD(()=>{cancelAnimationFrame(raf);ro.disconnect();});
}

function initGlobe(){
  const cv=$("#globe"); if(!cv)return; const ctx=cv.getContext("2d"); let raf;
  const N=1100,pts=[];const ga=Math.PI*(3-Math.sqrt(5));
  for(let i=0;i<N;i++){const y=1-i/(N-1)*2,r=Math.sqrt(1-y*y),th=ga*i;pts.push([Math.cos(th)*r,y,Math.sin(th)*r]);}
  const size=()=>{cv.width=cv.offsetWidth*devicePixelRatio;cv.height=cv.offsetHeight*devicePixelRatio;}; size();
  const ro=new ResizeObserver(size);ro.observe(cv);
  let vis=false;const io=new IntersectionObserver(e=>vis=e[0].isIntersecting);io.observe(cv);
  const loop=t=>{raf=requestAnimationFrame(loop);if(!vis)return;const W=cv.width,H=cv.height,R=Math.min(W,H)*.46,a=t*.00012,tilt=.35;
    ctx.clearRect(0,0,W,H);const acc=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#7d6cff";ctx.fillStyle=acc;
    for(const [x,y,z] of pts){const xr=x*Math.cos(a)-z*Math.sin(a),zr=x*Math.sin(a)+z*Math.cos(a);const yr=y*Math.cos(tilt)-zr*Math.sin(tilt),zz=y*Math.sin(tilt)+zr*Math.cos(tilt);
      if(zz<-.15)continue;ctx.globalAlpha=Math.max(0,(zz+.15))*.55;ctx.beginPath();ctx.arc(W/2+xr*R,H/2+yr*R,devicePixelRatio*1.1,0,7);ctx.fill();}
    ctx.globalAlpha=1;};
  raf=requestAnimationFrame(loop); addD(()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();});
}

function initQuotes(){
  const Q=[["Replace this with a real quote from a client. One or two sentences about what changed for their business works best.","Client name","Role, Company"],
           ["A second testimonial goes here. Specific results, such as more bookings or a faster site, read as more believable than praise.","Client name","Role, Company"],
           ["Add a third client quote here, or delete this one. Ask clients for permission before you publish their words.","Client name","Role, Company"]];
  const qt=$("#qt"); if(!qt)return; let i=0;
  const set=()=>{const [t,n,r]=Q[i];qt.textContent="“"+t+"”";$("#qn").textContent=n;$("#qr").textContent=r;$("#qi").textContent=n.split(" ").map(s=>s[0]).join("");};
  set();
  const swap=d=>{i=(i+d+Q.length)%Q.length;gsap.timeline().to("#qt,.who",{opacity:0,filter:"blur(8px)",y:-8,duration:.3}).add(set).to("#qt,.who",{opacity:1,filter:"blur(0px)",y:0,duration:.5,clearProps:"filter"});};
  $("#qp").onclick=()=>swap(-1);$("#qnx").onclick=()=>swap(1);
}
function initFaq(){
  $$(".qa").forEach(q=>{const b=$("button",q),a=$(".ans",q);b.addEventListener("click",()=>{
    const open=!q.classList.contains("open");
    $$(".qa.open").forEach(o=>{if(o!==q){o.classList.remove("open");$("button",o).setAttribute("aria-expanded","false");gsap.to($(".ans",o),{height:0,duration:.5,ease:"power3.inOut"});}});
    q.classList.toggle("open",open);b.setAttribute("aria-expanded",open);gsap.to(a,{height:open?"auto":0,duration:.55,ease:"power3.inOut",onComplete:()=>ScrollTrigger.refresh()});
  });});
}
function initCode(){
  const el=$("#code"); if(!el)return;
  const lines=['<span class="k">export</span> <span class="k">default</span> <span class="s">Hero</span>() {','  <span class="k">const</span> intro = useBlurIn(<span class="s">".title"</span>);','  <span class="k">return</span> &lt;<span class="s">Section</span> pin scrub&gt;','    &lt;<span class="s">Title</span> ref={intro}/&gt;','  &lt;/<span class="s">Section</span>&gt;;','}'];
  let n=0,c=0,raf,lastT=0;
  const tick=t=>{raf=requestAnimationFrame(tick);if(t-lastT<45)return;lastT=t;
    const plain=lines.map(l=>l.replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">"));
    if(n>=lines.length){if(t%4000<50){n=0;c=0;}return;}
    c++; if(c>plain[n].length){n++;c=0;}
    const out=lines.slice(0,n).join("<br>")+(n<lines.length?(n?"<br>":"")+escapeHtml(plain[n].slice(0,c)):"")+'<span class="cur"></span>';
    el.innerHTML=out;};
  ScrollTrigger.create({trigger:el,start:"top 90%",once:true,onEnter:()=>{raf=requestAnimationFrame(tick);}});
  addD(()=>cancelAnimationFrame(raf));
}
const escapeHtml=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

/* =========================================================
   LAPTOP + PHONE SHOWCASE (three.js, live site recordings)
   Videos live in assets/videos/<project>-d.mp4 and -m.mp4
   ========================================================= */
function initGallery(){
  const host=$("#dsticky"), sec=$("#gallery"); if(!host||!window.THREE)return;
  const T=THREE, N=P.length, disp=[], K=o=>(disp.push(o),o);
  const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputEncoding=T.sRGBEncoding;
  renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=1.05;
  host.prepend(renderer.domElement);
  const scene=new T.Scene(), cam=new T.PerspectiveCamera(30,1,.1,100);
  scene.add(new T.HemisphereLight(0xc9ccff,0x0a0814,.7));
  const key=new T.DirectionalLight(0xffffff,1.4); key.position.set(-5,9,7); scene.add(key);
  const rim=new T.PointLight(0x7d6cff,3,26); rim.position.set(5,4.5,-4.5); scene.add(rim);
  const rim2=new T.PointLight(0x5ad1ff,1.1,26); rim2.position.set(-7,2,-3); scene.add(rim2);
  const front=new T.PointLight(0xffffff,.5,30); front.position.set(2,3,9); scene.add(front);
  // geometry helpers
  const rshape=(w,h,r)=>{const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;};
  const rplane=(w,h,r)=>{const g=new T.ShapeGeometry(rshape(w,h,r),16),p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+w/2)/w,(p.getY(i)+h/2)/h);uv.needsUpdate=true;return K(g);};
  const rslab=(w,h,r,d)=>{const g=new T.ExtrudeGeometry(rshape(w,h,r),{depth:d,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:4,curveSegments:16});g.translate(0,0,-d/2);g.computeVertexNormals();return K(g);};
  const metal=K(new T.MeshStandardMaterial({color:0xa7a5b2,metalness:.6,roughness:.3}));
  const graphite=K(new T.MeshStandardMaterial({color:0x34333d,metalness:.65,roughness:.28}));
  const black=K(new T.MeshBasicMaterial({color:0x030305}));
  const rig=new T.Group(); scene.add(rig);
  // ---- laptop
  const laptop=new T.Group(); rig.add(laptop);
  const LW=6.4,LD=4.3,BT=.16,LH=4.12;
  const base=new T.Mesh(rslab(LW,LD,.3,BT),metal); base.rotation.x=-Math.PI/2; base.position.y=BT/2; laptop.add(base);
  const kc=document.createElement("canvas");kc.width=1024;kc.height=690;const k=kc.getContext("2d");
  k.fillStyle="#8a8896";k.fillRect(0,0,1024,690);k.fillStyle="#17161d";
  for(let r=0;r<6;r++)for(let c=0;c<14;c++){const kw=r===5&&c>3&&c<10?0:52;if(r===5&&c===4){rr(k,92+4*60,58+r*58,6*60-8,48,7);k.fill();continue;}if(!kw)continue;rr(k,92+c*60,58+r*58,kw,48,7);k.fill();}
  k.fillStyle="#9a98a6";rr(k,352,430,320,215,18);k.fill();k.strokeStyle="rgba(0,0,0,.25)";k.lineWidth=2;k.stroke();
  const deckTex=K(new T.CanvasTexture(kc));deckTex.encoding=T.sRGBEncoding;
  const deck=new T.Mesh(rplane(LW-.34,LD-.34,.22),K(new T.MeshStandardMaterial({map:deckTex,metalness:.45,roughness:.42})));
  deck.rotation.x=-Math.PI/2; deck.position.y=BT+.04; laptop.add(deck);
  const lid=new T.Group(); lid.position.set(0,BT+.02,-LD/2+.08); laptop.add(lid);
  const lidBody=new T.Mesh(rslab(LW,LH,.3,.11),metal); lidBody.position.set(0,LH/2,-.1); lid.add(lidBody);
  const bezel=new T.Mesh(rplane(LW-.06,LH-.06,.27),black); bezel.position.set(0,LH/2,.0); lid.add(bezel);
  const SW=5.9,SH=SW/1.6;
  const scrMat=K(new T.MeshBasicMaterial({color:0xffffff,toneMapped:false}));
  const scr=new T.Mesh(rplane(SW,SH,.05),scrMat); scr.position.set(0,LH/2+.07,.004); lid.add(scr);
  const gc=document.createElement("canvas");gc.width=256;gc.height=256;const gx=gc.getContext("2d");const gg=gx.createLinearGradient(0,0,256,256);gg.addColorStop(0,"rgba(255,255,255,.16)");gg.addColorStop(.45,"rgba(255,255,255,0)");gg.addColorStop(1,"rgba(255,255,255,.03)");gx.fillStyle=gg;gx.fillRect(0,0,256,256);
  const glassTex=K(new T.CanvasTexture(gc));
  const glass=new T.Mesh(rplane(SW,SH,.05),K(new T.MeshBasicMaterial({map:glassTex,transparent:true,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false})));glass.position.set(0,LH/2+.07,.008);lid.add(glass);
  // ---- phone
  const phone=new T.Group(); rig.add(phone);
  const PW=1.56,PH=3.26,PSW=1.43,PSH=PSW/(360/780);
  const pbody=new T.Mesh(rslab(PW,PH,.25,.15),graphite); pbody.position.z=-.115; phone.add(pbody);
  const pbez=new T.Mesh(rplane(PW-.04,PH-.04,.23),black); pbez.position.z=.0; phone.add(pbez);
  const pMat=K(new T.MeshBasicMaterial({color:0xffffff,toneMapped:false}));
  const pscr=new T.Mesh(rplane(PSW,PSH,.19),pMat); pscr.position.z=.004; phone.add(pscr);
  const isl=new T.Mesh(rplane(.42,.13,.065),black); isl.position.set(0,PSH/2-.13,.008); phone.add(isl);
  const pglass=new T.Mesh(rplane(PSW,PSH,.19),glass.material); pglass.position.z=.01; phone.add(pglass);
  // ---- soft floor shadow
  const sh=document.createElement("canvas");sh.width=sh.height=256;const sx=sh.getContext("2d");const sg=sx.createRadialGradient(128,128,0,128,128,128);sg.addColorStop(0,"rgba(0,0,0,.7)");sg.addColorStop(1,"rgba(0,0,0,0)");sx.fillStyle=sg;sx.fillRect(0,0,256,256);
  const shadow=new T.Mesh(K(new T.PlaneGeometry(11,6)),K(new T.MeshBasicMaterial({map:K(new T.CanvasTexture(sh)),transparent:true,depthWrite:false})));shadow.rotation.x=-Math.PI/2;shadow.position.y=-.01;rig.add(shadow);
  laptop.position.set(-1.05,0,0);
  phone.position.set(3.75,PH/2+.02,2.35); phone.rotation.set(-.04,-.5,0);
  // ---- media: posters first, live video when it plays
  const posterTex=src=>{const t=new T.Texture();t.encoding=T.sRGBEncoding;loadImg(src).then(im=>{if(im){t.image=im;t.needsUpdate=true;}});return K(t);};
  const media=P.map(p=>["d","m"].map(m=>{
    const v=document.createElement("video");v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute("playsinline","");v.setAttribute("muted","");v.preload="metadata";
    v.src=`assets/videos/${p.id}-${m}.mp4`;
    const tex=K(new T.VideoTexture(v));tex.encoding=T.sRGBEncoding;tex.minFilter=T.LinearFilter;
    return {v,tex,poster:posterTex(m==="d"?p.d[0]:p.m)};
  }));
  scrMat.map=media[0][0].poster; pMat.map=media[0][1].poster; scrMat.needsUpdate=pMat.needsUpdate=true;
  let vis=false, active=-1;
  const playActive=()=>{media.forEach((pair,i)=>pair.forEach(o=>{if(i===active&&vis){o.v.play().catch(()=>{});}else if(!o.v.paused)o.v.pause();}));};
  // ---- text
  const dname=$("#dname"),dtag=$("#dtag"),dmeta=$("#dmeta"),didx=$("#didx"),dlink=$("#dlink"),dlive=$("#dlive"),dots=$$("#ddots button"),label=$("#glabel"),hint=$("#ghint");
  const setActive=i=>{ if(i===active)return; active=i; const p=P[i];
    media[i].forEach(o=>{try{o.v.preload="auto";o.v.currentTime=0;}catch(e){}});
    playActive();
    didx.textContent=String(i+1).padStart(2,"0")+" / "+String(N).padStart(2,"0");
    dname.innerHTML=p.name.split(" ").map(w=>`<span class="wd">${w.split("").map(c=>`<span class="ch">${c}</span>`).join("")}</span>`).join(" ");
    dtag.textContent="“"+p.tag+"”"; dmeta.textContent=p.cat+" · "+p.loc+". "+p.brief.split(". ")[0]+".";
    dlink.setAttribute("href","#p-"+p.id); dlive.setAttribute("href",p.url);
    dots.forEach((d,k)=>d.classList.toggle("on",k===i));
    if(!RM){gsap.fromTo($$(".ch",dname),{opacity:0,filter:"blur(16px)",yPercent:50},{opacity:1,filter:"blur(0px)",yPercent:0,duration:.85,stagger:.026,ease:"power3.out"});
      gsap.fromTo([dtag,dmeta,dlink.parentNode],{opacity:0,y:16,filter:"blur(6px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.7,stagger:.07,delay:.12,ease:"power3.out"});}
  };
  dots.forEach(d=>d.addEventListener("click",()=>{const i=+d.dataset.i;const y=sec.offsetTop+(sec.offsetHeight-innerHeight)*((i+.45)/N);scrollTo(y);}));
  // ---- sizing
  let mob=false;
  const resize=()=>{const W=host.clientWidth,H=host.clientHeight;renderer.setSize(W,H,false);cam.aspect=W/H;mob=W/H<.9;
    cam.fov=mob?38:30;cam.updateProjectionMatrix();};
  resize(); addEventListener("resize",resize); addD(()=>removeEventListener("resize",resize));
  // ---- scroll + pointer
  let prog=0,enter=0,mx=0,my=0,tmx=0,tmy=0,hover=false;
  const st=ScrollTrigger.create({trigger:sec,start:"top top",end:"bottom bottom",scrub:true,onUpdate:s=>prog=s.progress});
  const st2=ScrollTrigger.create({trigger:sec,start:"top 85%",end:"top top",scrub:true,onUpdate:s=>enter=s.progress});
  const io=new IntersectionObserver(e=>{vis=e[0].isIntersecting;playActive();},{rootMargin:"80px"});io.observe(host);
  const ray=new T.Raycaster(),ptr=new T.Vector2(9,9),hits=[scr,pscr,lidBody,base,pbody,deck];
  host.addEventListener("pointermove",e=>{const r=host.getBoundingClientRect();tmx=(e.clientX-r.left)/r.width*2-1;tmy=(e.clientY-r.top)/r.height*2-1;ptr.set(tmx,-tmy);label.style.left=e.clientX-r.left+"px";label.style.top=e.clientY-r.top+"px";});
  host.addEventListener("pointerleave",()=>{tmx=tmy=0;ptr.set(9,9);});
  host.addEventListener("click",e=>{if(e.target.closest("a,button"))return;if(hover&&active>=0)go("#p-"+P[active].id);});
  const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);};
  const mix=(a,b,t)=>a+(b-a)*t;
  let raf,t0=performance.now(),pos=0;
  setActive(0);
  const loop=t=>{raf=requestAnimationFrame(loop);if(!vis)return;const time=(t-t0)/1000;
    mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;
    pos+=(Math.min(prog*N,N-.0001)-pos)*.14;
    const i=Math.min(N-1,Math.floor(pos)), f=pos-i;
    const outC=i<N-1?sm(.8,1,f):0, inC=i>0?1-sm(0,.2,f):0, c=Math.max(outC,inC);
    const ent=sm(0,1,enter), lidC=Math.max(c,1-ent);
    setActive(i);
    // swap to live video once it has frames
    const [dm,mm]=media[i];
    const dmap=dm.v.readyState>=2?dm.tex:dm.poster, mmap=mm.v.readyState>=2?mm.tex:mm.poster;
    if(scrMat.map!==dmap)scrMat.map=dmap; if(pMat.map!==mmap)pMat.map=mmap;
    // laptop lid + phone spin between projects
    lid.rotation.x=mix(-.3,1.5,lidC);
    const scrDim=1-sm(.35,.95,lidC)*.9; scrMat.color.setScalar(scrDim);
    laptop.position.y=c*.18;
    phone.rotation.y=-.5+Math.PI*2*(i+sm(.8,1,f))*(i<N-1||f<.8?1:1)+ (1-ent)*-1.4;
    phone.position.y=PH/2+.02+c*.5+(1-ent)*.6;
    pMat.color.setScalar(1-c*.6);
    // rig drift + framing
    rig.rotation.y=-.34+.16*Math.sin(pos*Math.PI-1.57)+mx*.14+(1-ent)*.5;
    rig.rotation.x=my*.04;
    if(mob){rig.scale.setScalar(.56);rig.position.set(.15,1.25+Math.sin(time*.8)*.04,0);cam.position.set(0,3.4,13.5);cam.lookAt(0,1.3,0);}
    else{rig.scale.setScalar(.82);rig.position.set(1.75,Math.sin(time*.8)*.05,0);cam.position.set(mx*.3,3.5-my*.2,13);cam.lookAt(.75,1.45,0);}
    hint.style.opacity=Math.max(0,1-prog*14)*.85;
    ray.setFromCamera(ptr,cam);const h=ray.intersectObjects(hits).length>0;
    if(h!==hover){hover=h;host.style.cursor=h?"pointer":"";label.style.opacity=h?1:0;if(h)label.textContent="View "+P[active].name;}
    renderer.render(scene,cam);
  };
  raf=requestAnimationFrame(loop);
  addD(()=>{cancelAnimationFrame(raf);io.disconnect();st.kill();st2.kill();media.forEach(pair=>pair.forEach(o=>{o.v.pause();o.v.removeAttribute("src");o.v.load();}));disp.forEach(x=>x.dispose&&x.dispose());renderer.dispose();renderer.forceContextLoss&&renderer.forceContextLoss();});
}

/* =========================================================
   WORKS / PROJECT / CONTACT
   ========================================================= */
function initWorks(){
  const grid=$("#wgrid");
  $$(".chips button").forEach(b=>b.addEventListener("click",()=>{
    $$(".chips button").forEach(x=>x.classList.toggle("on",x===b));const c=b.dataset.c;
    const cards=$$(".card",grid);
    gsap.to(cards,{opacity:0,y:20,filter:"blur(8px)",duration:.3,stagger:.02,onComplete:()=>{
      const show=cards.filter(el=>c==="All"||el.dataset.c===c); cards.forEach(el=>el.hidden=!show.includes(el));
      gsap.fromTo(show,{opacity:0,y:30,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.7,stagger:.06,ease:"power3.out",clearProps:"filter,transform",onComplete:()=>ScrollTrigger.refresh()});
    }});
  }));
  if(!RM) ScrollTrigger.batch($$(".card",grid),{start:"top 92%",onEnter:b=>gsap.fromTo(b,{opacity:0,y:50,filter:"blur(10px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1,stagger:.08,ease:"power3.out",clearProps:"filter,transform"})});
}
function initProject(){
  const car=$("#car"),tr=$("#cart"); if(!car)return; let x=0,drag=null;
  const max=()=>Math.max(0,tr.scrollWidth-car.clientWidth);
  const set=(v,anim=true)=>{x=gsap.utils.clamp(-max(),0,v);gsap.to(tr,{x,duration:anim?.8:0,ease:"power3.out"});};
  const step=()=>(tr.children[0].offsetWidth+16);
  $("#cl").onclick=()=>set(x+step());$("#cr").onclick=()=>set(x-step());
  car.addEventListener("pointerdown",e=>{if(e.target.closest(".arr"))return;drag={sx:e.clientX,x0:x};car.classList.add("dragging");car.setPointerCapture(e.pointerId);});
  car.addEventListener("pointermove",e=>{if(drag)set(drag.x0+(e.clientX-drag.sx)*1.2,false);});
  const up=()=>{drag=null;car.classList.remove("dragging");};car.addEventListener("pointerup",up);car.addEventListener("pointercancel",up);
  if(!RM){gsap.fromTo(tr,{x:160},{x:0,duration:1.4,ease:"power3.out",delay:.5});gsap.to(".pj-title",{filter:"blur(8px)",opacity:.2,yPercent:-20,ease:"none",scrollTrigger:{trigger:".pj-title",start:"top top",end:"bottom top",scrub:true}});}
}
function initContact(){
  $$("#bud button").forEach(b=>b.addEventListener("click",()=>$$("#bud button").forEach(x=>x.classList.toggle("on",x===b))));
  $("#cf").addEventListener("submit",e=>{e.preventDefault();const n=$("#fn").value.trim(),em=$("#fe").value.trim();const note=$("#fnote");
    note.hidden=false;
    if(!n||!/^\S+@\S+\.\S+$/.test(em)){note.textContent="Add your name and a valid email address so we can reply.";return;}
    note.textContent=`Thanks, ${n}. This form is a preview and does not send messages yet. Please email nirvongroups@gmail.com and we will reply within one working day.`;
    gsap.fromTo(note,{opacity:0,y:8},{opacity:1,y:0,duration:.5});});
}

/* =========================================================
   NAV, THEME, MENU
   ========================================================= */
const nav=$("#nav");
const onScroll=()=>nav.classList.toggle("compact",(lenis?lenis.scroll:scrollY)>40);
if(lenis)lenis.on("scroll",onScroll);else addEventListener("scroll",onScroll,{passive:true});
$("#tog").addEventListener("click",()=>{
  const root=document.documentElement;const cur=root.dataset.theme||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
  root.dataset.theme=cur==="light"?"dark":"light";
});
const menu=$("#mmenu");let menuOpen=false;
function closeMenu(){if(!menuOpen)return;menuOpen=false;document.body.classList.remove("menu-open");gsap.to(menu,{autoAlpha:0,duration:.3});menu.setAttribute("aria-hidden","true");lenis&&lenis.start();}
$("#burger").addEventListener("click",()=>{
  if(menuOpen){closeMenu();return;}menuOpen=true;document.body.classList.add("menu-open");menu.setAttribute("aria-hidden","false");lenis&&lenis.stop();
  gsap.to(menu,{autoAlpha:1,duration:.3});gsap.fromTo($$("a",menu),{opacity:0,y:30,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",stagger:.06,duration:.6,ease:"power3.out"});
});
addEventListener("resize",()=>{buildTiles();ScrollTrigger.refresh();});

/* =========================================================
   BOOT
   ========================================================= */
buildTiles();
(async()=>{
  gsap.to(loaderMark,{opacity:1,duration:.4});
  try{await Promise.race([Promise.all([document.fonts.load('600 40px "Instrument Sans"'),document.fonts.load('700 40px "Instrument Sans"'),document.fonts.load('italic 400 40px "Instrument Serif"')]),new Promise(r=>setTimeout(r,2500))]);}catch(e){}
  const r=parse(location.hash);
  render(r);
  await new Promise(r2=>requestAnimationFrame(()=>requestAnimationFrame(r2)));
  ScrollTrigger.refresh();
  if(r.anchor){const el=$(r.anchor);if(el)scrollTo(el,true);}
  gsap.from(".brand,.links a,.nav-r>*",{opacity:0,y:-10,duration:.8,stagger:.05,delay:.55,ease:"power3.out",clearProps:"all"});
  const rv=reveal(); setTimeout(intro,RM?0:420); await rv; onScroll();
})();
})();
