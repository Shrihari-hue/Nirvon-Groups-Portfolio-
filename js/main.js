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

  <section class="morph" id="morph">
    <div class="mo-in">
      <div class="mo-copy">
        <span class="eyebrow">One mark. Every discipline.</span>
        <div class="mo-active" aria-live="polite">
          <span class="mo-idx" id="moidx"></span>
          <h2 class="mo-name" id="moname"></h2>
          <p class="mo-desc" id="modesc"></p>
          <a class="mo-link" id="molink" href="#about"><span>About the group</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        </div>
        <div class="mo-ticks" id="moticks"></div>
      </div>
      <div class="mo-stage"><canvas id="mocv" aria-label="The Nirvon mark breaking apart into each discipline"></canvas><span class="mo-hint" id="mohint"><i></i>Scroll to watch it take shape · Tap to scatter</span><button class="mo-sound" id="mosound" aria-pressed="false" aria-label="Turn sound on"><svg class="s-off" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l4 6M21 9l-4 6"/></svg><svg class="s-on" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg></button></div>
    </div>
  </section>

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
      <div class="stats" style="flex-direction:row;flex-wrap:wrap"><div style="flex:1 1 180px;border-bottom:0;border-right:1px solid var(--line)"><b><span data-count="4">0</span></b><small>Projects shipped</small></div><div style="flex:1 1 180px;border-bottom:0;border-right:1px solid var(--line)"><b><span data-count="15">0</span></b><small>Ongoing projects</small></div><div style="flex:1 1 180px;border-bottom:0;border-right:1px solid var(--line)"><b><span data-count="3">0</span></b><small>Industries served</small></div><div style="flex:1 1 180px;border-bottom:0"><b><span data-count="1">0</span></b><small>Year of practice</small></div></div>
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
    $$(".intro-r .col").forEach((c,i)=>gsap.fromTo(c,{y:[60,180,110][i]},{y:[-140,-380,-240][i],ease:"none",scrollTrigger:{trigger:".intro",start:"top bottom",end:"bottom top",scrub:true}}));
  }
  initMorph(); initRolling(); initGallery(); initMarquee(); initStars(); initGlobe(); initQuotes(); initFaq(); initCode();
  // services shared glow across grid
  const svc=$("#svc"); if(svc){svc.addEventListener("pointermove",e=>{$$(".tile",svc).forEach(t=>{const r=t.getBoundingClientRect();t.style.setProperty("--mx",e.clientX-r.left+"px");t.style.setProperty("--my",e.clientY-r.top+"px");});});svc.addEventListener("pointerleave",()=>$$(".tile",svc).forEach(t=>t.style.setProperty("--mx","-999px")));}
  // chart draw
  const cl=$("#cline"); if(cl&&!RM){const L=cl.getTotalLength();gsap.fromTo(cl,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:2,ease:"power2.inOut",scrollTrigger:{trigger:cl,start:"top 85%",once:true}});}
}

/* =========================================================
   THE MARK BUILDS EVERYTHING
   The Nirvon mark breaks into particles that rebuild into each
   discipline, then lock back into the mark. Shapes live in MORPH.
   ========================================================= */
const MORPH=[
 {move:"burst",img:null,link:"#about",linkText:"About the group",name:"One mark.",           desc:"Every Nirvon business grows from the same standard of care, craft and follow-through. Keep scrolling to see what it builds.", draw:c=>{[[6,94,6,27,25,8,25,94],[31,8,47,8,72,94,56,94],[75,6,94,6,94,73,75,92]].forEach(p=>{c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.closePath();c.fill();});}},
 {move:"rain",img:"realestate",link:"#contact",linkText:"Talk to us",name:"Real Estate",         desc:"Property developed and managed to hold value.", draw:c=>{c.fillRect(8,46,18,48);c.fillRect(30,14,22,80);c.fillRect(56,30,17,64);c.fillRect(77,54,15,40);c.fillRect(39,6,4,8);c.globalCompositeOperation="destination-out";for(let y=20;y<88;y+=9)for(let x=34;x<50;x+=7)c.fillRect(x,y,3.4,4.6);for(let y=36;y<88;y+=9)for(let x=60;x<71;x+=6)c.fillRect(x,y,3,4.6);c.globalCompositeOperation="source-over";}},
 {move:"whirl",img:"exports",link:"#contact",linkText:"Talk to us",name:"Trade & Exports",     desc:"Connecting products and businesses across markets.", draw:c=>{c.beginPath();c.moveTo(4,62);c.lineTo(96,62);c.lineTo(86,82);c.lineTo(14,82);c.closePath();c.fill();[[16,48],[30,48],[44,48],[58,48],[22,34],[36,34],[50,34]].forEach(([x,y])=>c.fillRect(x,y,12.5,12));c.fillRect(74,30,9,32);c.fillRect(72,26,13,6);}},
 {move:"sweep",img:"interior",link:"#p-ostrich",linkText:"See OST-RICH Interiors",name:"Interior Design",     desc:"Spaces that balance aesthetics and function.", draw:c=>{c.beginPath();c.roundRect(18,24,64,34,10);c.fill();c.beginPath();c.roundRect(8,46,18,34,7);c.fill();c.beginPath();c.roundRect(74,46,18,34,7);c.fill();c.beginPath();c.roundRect(22,56,56,20,5);c.fill();c.fillRect(14,80,6,12);c.fillRect(80,80,6,12);}},
 {move:"pixel",img:"technology",link:"#p-xenovia",linkText:"See Xenovia",name:"Technology",          desc:"Websites, apps and custom software.", draw:c=>{c.beginPath();c.roundRect(14,16,72,48,4);c.fill();c.globalCompositeOperation="destination-out";c.beginPath();c.roundRect(18.5,20.5,63,39,1.5);c.fill();c.globalCompositeOperation="source-over";c.fillRect(23,25,30,3.2);c.fillRect(23,31,20,3.2);c.beginPath();c.roundRect(23,38,24,16,1.5);c.fill();c.beginPath();c.roundRect(51,38,26,16,1.5);c.fill();c.beginPath();c.moveTo(4,66);c.lineTo(96,66);c.lineTo(92,73);c.quadraticCurveTo(91,74.5,89,74.5);c.lineTo(11,74.5);c.quadraticCurveTo(9,74.5,8,73);c.closePath();c.fill();c.globalCompositeOperation="destination-out";c.beginPath();c.roundRect(42,66,16,2.4,1.2);c.fill();c.globalCompositeOperation="source-over";c.fillRect(16,63.5,68,2.5);}},
 {move:"spiral",img:"eco",link:"#p-thathvah",linkText:"See Thathvah",name:"Sustainable Ventures",desc:"Eco-conscious products, materials and ideas.", draw:c=>{c.beginPath();c.moveTo(22,80);c.bezierCurveTo(14,52,34,22,84,14);c.bezierCurveTo(88,48,66,78,22,80);c.closePath();c.fill();c.globalCompositeOperation="destination-out";c.lineCap="round";c.lineWidth=2.6;c.beginPath();c.moveTo(25,77);c.bezierCurveTo(42,58,60,38,80,18);c.stroke();c.lineWidth=1.6;[[34,66,30,52],[42,57,40,41],[51,48,51,32],[60,39,63,26],[38,63,52,66],[47,54,62,56],[56,45,70,45],[65,35,76,33]].forEach(([x1,y1,x2,y2])=>{c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2+(y2-y1)*.12,(y1+y2)/2,x2,y2);c.stroke();});c.globalCompositeOperation="source-over";c.lineWidth=2.6;c.lineCap="round";c.beginPath();c.moveTo(24,78);c.quadraticCurveTo(18,86,12,90);c.stroke();}},
 {move:"rise",img:"finance",link:"#contact",linkText:"Talk to us",name:"Finance & Advisory",  desc:"Accounting, taxation and financial guidance.", draw:c=>{[[10,64,14,30],[30,50,14,44],[50,56,14,38],[70,30,14,64]].forEach(([x,y,w,h])=>c.fillRect(x,y,w,h));c.lineWidth=4.5;c.lineCap="round";c.lineJoin="round";c.beginPath();c.moveTo(10,46);c.lineTo(34,30);c.lineTo(54,38);c.lineTo(84,10);c.stroke();c.beginPath();c.moveTo(72,10);c.lineTo(86,8);c.lineTo(84,22);c.stroke();}},
 {move:"converge",img:null,link:"#works",linkText:"See our work",name:"One Nirvon.",         desc:"Different disciplines. One shared drive.", draw:null}
];
function initMorph(){
  const cv=$("#mocv"),sec=$("#morph"); if(!cv||!sec)return;
  MORPH[MORPH.length-1].draw=MORPH[0].draw;
  const mob=matchMedia("(max-width:860px)").matches;
  const ctx=cv.getContext("2d"),S=MORPH.length,N=mob?1400:2600;
  const idxEl=$("#moidx"),nameEl=$("#moname"),descEl=$("#modesc"),linkEl=$("#molink"),ticks=$("#moticks"),hint=$("#mohint"),soundBtn=$("#mosound");
  ticks.innerHTML=MORPH.slice(0,-1).map((m,i)=>`<button data-i="${i}" aria-label="Show ${m.name}"></button>`).join("");
  const tb=$$("button",ticks);
  const sm=t=>t*t*(3-2*t),cl=t=>t<0?0:t>1?1:t,eo=t=>1-Math.pow(1-t,4),ei=t=>t*t*t;
  // ---- shape sampling (even + edge-weighted)
  const R=260,off=document.createElement("canvas");off.width=off.height=R;const oc=off.getContext("2d",{willReadFrequently:true});
  const sample=draw=>{oc.setTransform(1,0,0,1,0,0);oc.clearRect(0,0,R,R);oc.setTransform(R/100,0,0,R/100,0,0);oc.fillStyle="#000";oc.strokeStyle="#000";oc.globalCompositeOperation="source-over";draw(oc);
    const d=oc.getImageData(0,0,R,R).data,on=(x,y)=>x>=0&&y>=0&&x<R&&y<R&&d[(y*R+x)*4+3]>140;
    const fill=[],edge=[];for(let y=0;y<R;y++)for(let x=0;x<R;x++)if(on(x,y)){(on(x-2,y)&&on(x+2,y)&&on(x,y-2)&&on(x,y+2)?fill:edge).push([x,y]);}
    const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];}return a;};
    shuffle(fill);shuffle(edge);
    const nEdge=Math.min(edge.length,Math.round(N*.32)),pick=[...edge.slice(0,nEdge)];
    while(pick.length<N)pick.push(fill.length?fill[pick.length%fill.length]:edge[pick.length%edge.length]);
    const out=pick.map(([x,y],i)=>[x/R*100+(Math.random()-.5)*.35,y/R*100+(Math.random()-.5)*.35,i<nEdge]);
    out.sort((a,b)=>(a[1]*.6+a[0])-(b[1]*.6+b[0]));return out;};
  const shapes=MORPH.map(m=>sample(m.draw));
  const parts=Array.from({length:N},()=>({d:Math.random()*.3,a:Math.random()*Math.PI*2,r:.7+Math.random()*1.2,s:Math.random(),acc:Math.random()<.16,acc2:Math.random()<.34,glow:Math.random()<.09,
    sx:Math.random()*140-20,sy:Math.random()*140-20,tw:Math.random()*6.28,px:0,py:0,ex:0,ey:0}));
  // ---- movement styles for each change (keyed by the shape being built)
  const polar=(x,y,cx,cy)=>[Math.atan2(y-cy,x-cx),Math.hypot(x-cx,y-cy)];
  const MOVES={
    burst:(a,b,u,p)=>{const k=Math.sin(u*Math.PI)*(14+p.s*22);return [a[0]+(b[0]-a[0])*u+Math.cos(p.a)*k,a[1]+(b[1]-a[1])*u+Math.sin(p.a)*k];},
    rain:(a,b,u,p)=>{const x=a[0]+(b[0]-a[0])*sm(cl(u*1.4-.2));if(u<.42){const v=sm(u/.42);return [x,a[1]+(-40-p.s*30-a[1])*v];}
      const v=(u-.42)/.58,top=-40-p.s*30;return [x,top+(b[1]-top)*(1-Math.pow(1-v,2.2))+Math.sin(v*Math.PI)*0];},
    whirl:(a,b,u,p)=>{const cx=50,cy=60,[aa,ar]=polar(a[0],a[1],cx,cy),[ba,br]=polar(b[0],b[1],cx,cy);let da=ba-aa;da=Math.atan2(Math.sin(da),Math.cos(da));
      const ang=aa+da*u+Math.PI*2.4*sm(u),rad=(ar+(br-ar)*u)*(1-.42*Math.sin(u*Math.PI))+Math.sin(u*Math.PI)*(p.s-.3)*14;return [cx+Math.cos(ang)*rad,cy+Math.sin(ang)*rad*.55+(1-.55)*(a[1]+(b[1]-a[1])*u-cy)*0];},
    sweep:(a,b,u,p)=>{const m=Math.sin(u*Math.PI),x=a[0]+(b[0]-a[0])*u-m*(55+p.s*35),y=a[1]+(b[1]-a[1])*u+Math.sin(u*Math.PI*2+p.a)*m*10;return [x,y];},
    pixel:(a,b,u,p)=>{const m=Math.sin(u*Math.PI),x=a[0]+(b[0]-a[0])*u,y=a[1]+(b[1]-a[1])*u,g=7;
      const gx=Math.round(x/g)*g+(p.s-.5)*2,gy=Math.round(y/g)*g+(p.a/6.28-.5)*2;return [x+(gx-x)*m+(x-50)*m*.35,y+(gy-y)*m+(y-50)*m*.35];},
    spiral:(a,b,u,p)=>{const cy=104-u*58,cx=50,[aa,ar]=polar(a[0],a[1],50,50),[ba,br]=polar(b[0],b[1],50,50);
      const ang=aa+(ba-aa)*u+Math.PI*3*sm(u),rad=(ar+(br-ar)*u)*(1-.4*Math.sin(u*Math.PI))+Math.sin(u*Math.PI)*(p.s-.3)*12;
      const sx=50+Math.cos(ang)*rad,sy=50+Math.sin(ang)*rad,m=Math.sin(u*Math.PI);return [sx,sy*(1-m)+(cy+Math.sin(ang)*rad*.35)*m];},
    rise:(a,b,u,p)=>{const x=a[0]+(b[0]-a[0])*sm(cl(u*1.3));if(u<.4){const v=sm(u/.4);return [x,a[1]+(100-a[1])*v];}const v=(u-.4)/.6;return [x,100+(b[1]-100)*eo(cl(v*1.1-p.s*.1))];},
    converge:(a,b,u,p)=>{const m=Math.sin(u*Math.PI),x=a[0]+(b[0]-a[0])*u,y=a[1]+(b[1]-a[1])*u,k=Math.pow(m,.6);return [x+(50-x)*k*.92+Math.cos(p.a)*k*3,y+(50-y)*k*.92+Math.sin(p.a)*k*3];}
  };
  // ---- glow sprite + colours
  const gs=document.createElement("canvas");gs.width=gs.height=32;const gx=gs.getContext("2d");
  const mkGlow=c=>{gx.clearRect(0,0,32,32);const g=gx.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,c);g.addColorStop(.3,c+"88");g.addColorStop(1,c+"00");gx.fillStyle=g;gx.fillRect(0,0,32,32);};
  let dark=true,colors=["#fff","#7d6cff"],rebuildMasks=null;const INK="#1d1840";
  const col=()=>{const cs=getComputedStyle(document.documentElement);colors=[cs.getPropertyValue("--fg").trim()||"#fff",cs.getPropertyValue("--accent").trim()||"#7d6cff"];
    const bg=cs.getPropertyValue("--bg").trim();dark=!/^#f|^#e/i.test(bg);mkGlow(colors[1].length===7?colors[1]:"#7d6cff");if(rebuildMasks)rebuildMasks();};
  col();const mo=new MutationObserver(col);mo.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  const mq=matchMedia("(prefers-color-scheme: dark)");mq.addEventListener("change",col);
  // ---- photos masked to each silhouette
  const imgs=MORPH.map(m=>{if(!m.img)return null;const im=new Image();im.src="assets/web/d-"+m.img+".jpg";im.onload=()=>buildMasks();return im;});
  let masks=[];
  const buildMasks=()=>{if(!box)return;const px=Math.round(box*dpr);masks=MORPH.map((m,i)=>{const im=imgs[i];if(!im||!im.complete||!im.naturalWidth)return null;
    const c=document.createElement("canvas");c.width=c.height=px;const x=c.getContext("2d");x.setTransform(px/100,0,0,px/100,0,0);x.fillStyle="#000";x.strokeStyle="#000";m.draw(x);
    x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation="source-in";const sc=Math.max(px/im.naturalWidth,px/im.naturalHeight),w=im.naturalWidth*sc,h=im.naturalHeight*sc;
    x.filter="grayscale(1) contrast(1.25) brightness("+(dark?.9:1.15)+")";x.drawImage(im,(px-w)/2,(px-h)/2,w,h);x.filter="none";
    // duotone in the brand purple so the photo reads as texture, not a sticker
    x.globalCompositeOperation="color";x.fillStyle=colors[1];x.fillRect(0,0,px,px);
    x.globalCompositeOperation="destination-in";x.setTransform(px/100,0,0,px/100,0,0);x.fillStyle="#000";x.strokeStyle="#000";m.draw(x);x.setTransform(1,0,0,1,0,0);
    x.globalCompositeOperation="destination-in";const g=x.createRadialGradient(px/2,px/2,px*.1,px/2,px/2,px*.62);g.addColorStop(0,"rgba(0,0,0,1)");g.addColorStop(1,"rgba(0,0,0,.55)");x.fillStyle=g;x.fillRect(0,0,px,px);return c;});};
  rebuildMasks=()=>buildMasks();
  // ---- sizing
  let W=0,H=0,dpr=1,box=0,ox=0,oy=0;
  const size=()=>{dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;box=Math.min(W,H)*.78;ox=(W-box)/2;oy=(H-box)/2;buildMasks();};
  size();const ro=new ResizeObserver(size);ro.observe(cv);
  // ---- optional sound (off by default)
  let ac=null,soundOn=false;
  const noise=()=>{const b=ac.createBuffer(1,ac.sampleRate*.9,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b;};
  const whoosh=()=>{if(!soundOn)return;const t=ac.currentTime,s=ac.createBufferSource();s.buffer=noise();const f=ac.createBiquadFilter();f.type="bandpass";f.Q.value=1.2;f.frequency.setValueAtTime(300,t);f.frequency.exponentialRampToValueAtTime(2400,t+.45);f.frequency.exponentialRampToValueAtTime(500,t+.85);
    const g=ac.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+.25);g.gain.exponentialRampToValueAtTime(.001,t+.85);s.connect(f).connect(g).connect(ac.destination);s.start(t);s.stop(t+.9);};
  const chime=(hi)=>{if(!soundOn)return;const t=ac.currentTime;[[hi?784:659,.09],[hi?1175:988,.05],[hi?1568:1319,.03]].forEach(([fq,v],k)=>{const o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.value=fq;
    g.gain.setValueAtTime(0,t+k*.03);g.gain.linearRampToValueAtTime(v,t+k*.03+.01);g.gain.exponentialRampToValueAtTime(.0005,t+k*.03+1.4);o.connect(g).connect(ac.destination);o.start(t+k*.03);o.stop(t+k*.03+1.5);});};
  const pop=()=>{if(!soundOn)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type="triangle";o.frequency.setValueAtTime(420,t);o.frequency.exponentialRampToValueAtTime(70,t+.25);
    g.gain.setValueAtTime(.22,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.32);whoosh();};
  soundBtn.addEventListener("click",()=>{soundOn=!soundOn;if(soundOn){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();}catch(e){soundOn=false;}}
    soundBtn.setAttribute("aria-pressed",soundOn);soundBtn.classList.toggle("on",soundOn);soundBtn.setAttribute("aria-label",soundOn?"Turn sound off":"Turn sound on");if(soundOn)chime(true);});
  // ---- text
  let active=-1;
  const setActive=i=>{if(i===active)return;active=i;const m=MORPH[i];
    idxEl.textContent=i===0||i===S-1?"The Nirvon Group":String(i).padStart(2,"0")+" / "+String(S-2).padStart(2,"0");
    tb.forEach((b,k)=>b.classList.toggle("on",k===Math.min(i,S-2)));
    sec.classList.toggle("at-mark",i===0||i===S-1);
    const apply=()=>{nameEl.textContent=m.name;descEl.textContent=m.desc;linkEl.setAttribute("href",m.link);linkEl.querySelector("span").textContent=m.linkText;};
    if(RM){apply();return;}
    gsap.timeline().to([nameEl,descEl,linkEl],{opacity:0,y:-12,filter:"blur(8px)",duration:.2,stagger:.03}).add(apply)
      .fromTo([nameEl,descEl,linkEl],{opacity:0,y:16,filter:"blur(10px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.5,stagger:.06,ease:"power3.out"});};
  setActive(0);
  // ---- scroll, intro, pointer, click-to-explode
  let prog=0,shown=0,vis=false,raf,intro=RM?1:0,introStart=0,mx=-999,my=-999;
  ScrollTrigger.create({trigger:sec,start:"top top",end:"bottom bottom",scrub:true,onUpdate:st=>{prog=st.progress;hint.style.opacity=Math.max(0,1-prog*14);}});
  ScrollTrigger.create({trigger:sec,start:"top 75%",once:true,onEnter:()=>{introStart=performance.now();}});
  tb.forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.i;scrollTo(sec.offsetTop+(sec.offsetHeight-innerHeight)*(i/(S-1))+2);}));
  const io=new IntersectionObserver(e=>vis=e[0].isIntersecting);io.observe(sec);
  cv.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  cv.addEventListener("pointerleave",()=>{mx=my=-999;});
  let boomT=-9,bx=0,by=0;
  cv.addEventListener("click",e=>{const r=cv.getBoundingClientRect();bx=e.clientX-r.left;by=e.clientY-r.top;boomT=performance.now()/1000;imgA=0;pop();
    for(const p of parts){p.ea=Math.random()*.6+.7;}});
  // ---- landing (snap flash + ripple + photo reveal)
  let landed=0,snapT=-9,imgA=0,imgIdx=-1,lastSettled=0;
  const loop=now=>{raf=requestAnimationFrame(loop);if(!vis)return;const time=now/1000;
    if(introStart&&intro<1)intro=cl((now-introStart)/2200);
    shown+=(prog*(S-1)-shown)*.12;
    const seg=Math.min(S-2,Math.floor(shown)),t=shown-seg;
    setActive(t>.62?seg+1:seg);
    const settled=t>.9?seg+1:(t<.08?seg:-1);
    if(settled!==-1&&settled!==landed&&intro>=1){landed=settled;snapT=time;imgIdx=settled;chime(settled===0||settled===S-1);}
    if(settled===-1&&lastSettled!==-1)whoosh();
    lastSettled=settled;
    // photo reveal: fade in after the snap, hold, then dissolve back to particles
    const since=time-snapT,want=(settled===imgIdx&&masks[imgIdx]&&since>.35&&since<3.4&&time-boomT>1.4)?1:0;
    imgA+=(want-imgA)*(want?.05:(settled===-1?.3:.12));
    const A=shapes[seg],B=shapes[seg+1],k=box/100,move=MOVES[MORPH[seg+1].move]||MOVES.burst;
    const rest=settled===0||settled===S-1;
    const sweep=((time*.32)%1.6)-.3;
    const flash=Math.max(0,1-since/.45),ripR=since*95,boom=time-boomT;
    const boomAmp=boom<0||boom>2.6?0:(boom<.12?boom/.12:Math.exp(-(boom-.12)*2.2))*box*.55;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
    if(imgA>.01&&masks[imgIdx]){ctx.globalCompositeOperation="source-over";ctx.globalAlpha=imgA*(dark?.85:.7);ctx.drawImage(masks[imgIdx],ox,oy,box,box);}
    ctx.globalCompositeOperation=dark?"lighter":"source-over";
    const R2=(box*.12)**2,dim=1-imgA*.12;
    for(let i=0;i<N;i++){const p=parts[i],a=A[i],b=B[i];
      const u=RM?(t>.5?1:0):sm(cl((t-.18-p.d)/.5));
      let [x,y]=move(a,b,u,p);
      const iu=eo(cl(intro*1.25-p.d*.8)); x=p.sx+(x-p.sx)*iu; y=p.sy+(y-p.sy)*iu;
      x+=Math.sin(time*1.3+p.a*3)*.28; y+=Math.cos(time*1.1+p.a)*.28;
      let X=ox+x*k,Y=oy+y*k;
      // click explosion
      if(boomAmp>0){const dx=X-bx,dy=Y-by,l=Math.hypot(dx,dy)||1,f=boomAmp*(p.ea||1)*Math.min(1.4,90/(l*.35+40));X+=dx/l*f+Math.cos(p.a)*f*.25;Y+=dy/l*f+Math.sin(p.a)*f*.25;}
      // cursor push
      const dx=X-mx,dy=Y-my,dd=dx*dx+dy*dy;
      if(dd<R2){const f=(1-dd/R2)*box*.06,l=Math.sqrt(dd)||1;p.px+=(dx/l*f-p.px)*.2;p.py+=(dy/l*f-p.py)*.2;}else{p.px*=.9;p.py*=.9;}
      X+=p.px;Y+=p.py;
      const edge=(u<.5?a[2]:b[2]);
      const band=rest?Math.max(0,1-Math.abs((x+y)/200-sweep)*9):0;
      const rip=since<1.3?Math.max(0,1-Math.abs(Math.hypot(x-50,y-50)-ripR)/7)*(1-since/1.3):0;
      const lit=Math.max(band,rip)+flash*.8;
      let al=dark?(.42+.3*Math.sin(time*2+p.tw)*.5+(edge?.28:0)+lit*.6):(.62+.18*Math.sin(time*2+p.tw)+(edge?.25:0)+lit*.4);
      al*=(.35+.65*iu)*(1-Math.sin(u*Math.PI)*(dark?.6:.35))*(edge?Math.max(dim,.55):dim);
      const r=p.r*(box/560+.55)*(dark?1:1.3)*(1+lit*.6);
      ctx.globalAlpha=Math.min(1,al);
      ctx.fillStyle=dark?(p.acc||lit>.5?colors[1]:colors[0]):(p.acc2||lit>.5?colors[1]:INK);
      if(dark)ctx.fillRect(X-r/2,Y-r/2,r,r);else{ctx.beginPath();ctx.arc(X,Y,r*.55,0,6.283);ctx.fill();}
      if(p.glow||rip>.75){const gr=r*(dark?7:6)*(1+lit);ctx.globalAlpha=Math.min(1,al*(dark?.55:.32));ctx.drawImage(gs,X-gr/2,Y-gr/2,gr,gr);}
    }
    ctx.globalAlpha=1;ctx.globalCompositeOperation="source-over";
  };
  raf=requestAnimationFrame(loop);
  addD(()=>{cancelAnimationFrame(raf);ro.disconnect();mo.disconnect();io.disconnect();mq.removeEventListener("change",col);if(ac)try{ac.close();}catch(e){}});
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
  scene.add(new T.HemisphereLight(0xdcdde4,0x0a0814,.55));
  const key=new T.DirectionalLight(0xffffff,1.4); key.position.set(-5,9,7); scene.add(key);
  const rim=new T.PointLight(0x7d6cff,.9,26); rim.position.set(5,4.5,-4.5); scene.add(rim);
  const rim2=new T.PointLight(0x5ad1ff,1.1,26); rim2.position.set(-7,2,-3); scene.add(rim2);
  const front=new T.PointLight(0xffffff,.5,30); front.position.set(2,3,9); scene.add(front);
  // geometry helpers
  const rshape=(w,h,r)=>{const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;};
  const rplane=(w,h,r)=>{const g=new T.ShapeGeometry(rshape(w,h,r),16),p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+w/2)/w,(p.getY(i)+h/2)/h);uv.needsUpdate=true;return K(g);};
  const rslab=(w,h,r,d)=>{const g=new T.ExtrudeGeometry(rshape(w,h,r),{depth:d,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:4,curveSegments:16});g.translate(0,0,-d/2);g.computeVertexNormals();return K(g);};
  const metal=K(new T.MeshStandardMaterial({color:0x1a1a1e,metalness:.5,roughness:.55}));
  const graphite=K(new T.MeshStandardMaterial({color:0x34333d,metalness:.65,roughness:.28}));
  const black=K(new T.MeshBasicMaterial({color:0x030305}));
  const rig=new T.Group(); scene.add(rig);
  // ---- laptop
  const laptop=new T.Group(); rig.add(laptop);
  const LW=6.4,LD=4.3,BT=.12,LH=4.13,TAPER=.45;
  const baseG=rslab(LW,LD,.3,BT);{const bp=baseG.attributes.position,z0=-BT/2-.035,H=BT+.07;for(let i=0;i<bp.count;i++){const f=1-(1-TAPER)*(LD/2-bp.getY(i))/LD;bp.setZ(i,z0+(bp.getZ(i)-z0)*f);}bp.needsUpdate=true;baseG.computeVertexNormals();}
  const base=new T.Mesh(baseG,metal); base.rotation.x=-Math.PI/2; base.position.y=BT/2; laptop.add(base);
  const kc=document.createElement("canvas");kc.width=1024;kc.height=690;const k=kc.getContext("2d");
  k.fillStyle="#8e8e96";k.fillRect(0,0,1024,690);
  const KX=151,KY=84,KP=52,KS=46,KR=50,KH=42;k.fillStyle="#5c5c64";rr(k,KX-10,KY-10,13*KP+KS+20,5*KR+KH+20,12);k.fill();k.fillStyle="#0b0b0e";
  for(let r=0;r<6;r++)for(let c=0;c<14;c++){if(r===5&&c===4){rr(k,KX+4*KP,KY+r*KR,6*KP-6,KH,6);k.fill();continue;}if(r===5&&c>4&&c<10)continue;rr(k,KX+c*KP,KY+r*KR,KS,KH,6);k.fill();}
  k.fillStyle="#9c9ca4";rr(k,302,424,420,232,14);k.fill();k.strokeStyle="rgba(255,255,255,.22)";k.lineWidth=3;k.stroke();
  const deckTex=K(new T.CanvasTexture(kc));deckTex.encoding=T.sRGBEncoding;deckTex.anisotropy=renderer.capabilities.getMaxAnisotropy();
  const deck=new T.Mesh(rplane(LW-.34,LD-.34,.22),K(new T.MeshStandardMaterial({map:deckTex,color:0x34343a,metalness:.2,roughness:.75})));
  const DROP=(BT+.07)*(1-TAPER);deck.rotation.x=-Math.PI/2+Math.atan(DROP/LD); deck.position.y=BT+.035-DROP/2+.006; laptop.add(deck);
  const lid=new T.Group(); lid.position.set(0,BT+.05,-LD/2+.08); laptop.add(lid);
  {const hg=new T.Mesh(K(new T.CylinderGeometry(.055,.055,LW-1.3,24)),graphite);hg.rotation.z=Math.PI/2;hg.position.set(0,BT+.03,-LD/2+.02);laptop.add(hg);}
  const lidBody=new T.Mesh(rslab(LW,LH,.3,.07),metal); lidBody.position.set(0,LH/2,-.07); lid.add(lidBody);
  const bezel=new T.Mesh(rplane(LW-.06,LH-.06,.27),black); bezel.position.set(0,LH/2,.002); lid.add(bezel);
  const SW=6.06,SH=SW/1.6;
  const scrMat=K(new T.MeshBasicMaterial({color:0xffffff,toneMapped:false}));
  const scr=new T.Mesh(rplane(SW,SH,.05),scrMat); scr.position.set(0,LH/2,.006); lid.add(scr);
  const gc=document.createElement("canvas");gc.width=256;gc.height=256;const gx=gc.getContext("2d");const gg=gx.createLinearGradient(0,0,256,256);gg.addColorStop(0,"rgba(255,255,255,.16)");gg.addColorStop(.45,"rgba(255,255,255,0)");gg.addColorStop(1,"rgba(255,255,255,.03)");gx.fillStyle=gg;gx.fillRect(0,0,256,256);
  const glassTex=K(new T.CanvasTexture(gc));
  const glass=new T.Mesh(rplane(SW,SH,.05),K(new T.MeshBasicMaterial({map:glassTex,transparent:true,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false})));glass.position.set(0,LH/2,.01);lid.add(glass);
  // ---- phone
  const phone=new T.Group(); rig.add(phone);
  const PW=1.56,PH=3.26,PSW=1.43,PSH=PSW/(360/780);
  const PD=.07,PZB=-.006-(PD+.07);
  const pAlu=K(new T.MeshStandardMaterial({color:0x1a1a1e,metalness:.55,roughness:.42}));
  const pbody=new T.Mesh(rslab(PW,PH,.25,PD),pAlu); pbody.position.z=-.006-(PD+.07)/2; phone.add(pbody);
  // back: frosted glass panel, camera module, subtle brand mark (all face -z)
  const back=new T.Group(); back.rotation.y=Math.PI; back.position.z=PZB-.002; phone.add(back);
  back.add(new T.Mesh(rplane(PW-.1,PH-.1,.21),K(new T.MeshStandardMaterial({color:0x0d0d10,metalness:.25,roughness:.7}))));
  const camMod=new T.Group(); camMod.position.set(-(PW/2-.3),PH/2-.52,0); back.add(camMod);
  const camBody=new T.Mesh(rslab(.36,.78,.17,.012),K(new T.MeshStandardMaterial({color:0x121216,metalness:.4,roughness:.38}))); camBody.position.z=.04; camMod.add(camBody);
  const ringM=K(new T.MeshStandardMaterial({color:0x3a3a42,metalness:.85,roughness:.25})), lensM=K(new T.MeshStandardMaterial({color:0x020204,metalness:.2,roughness:.08}));
  const lens=(x,y)=>{const r=new T.Mesh(K(new T.CylinderGeometry(.115,.12,.05,32)),ringM);r.rotation.x=Math.PI/2;r.position.set(x,y,.1);camMod.add(r);const l=new T.Mesh(K(new T.CylinderGeometry(.082,.082,.02,32)),lensM);l.rotation.x=Math.PI/2;l.position.set(x,y,.127);camMod.add(l);};
  lens(0,.19); lens(0,-.19);
  const flash=new T.Mesh(K(new T.CylinderGeometry(.045,.045,.02,24)),K(new T.MeshStandardMaterial({color:0xe9e3d2,emissive:0x2a2720,roughness:.4})));flash.rotation.x=Math.PI/2;flash.position.set(.34,.24,.0);camMod.add(flash);
  const mic=new T.Mesh(K(new T.CylinderGeometry(.022,.022,.02,16)),lensM);mic.rotation.x=Math.PI/2;mic.position.set(.34,.08,.0);camMod.add(mic);
  {const ms=[[[6,94],[6,27],[25,8],[25,94]],[[31,8],[47,8],[72,94],[56,94]],[[75,6],[94,6],[94,73],[75,92]]].map(pts=>{const sh=new T.Shape();pts.forEach(([x,y],i)=>{const X=(x-50)/100*.42,Y=-(y-50)/100*.42;i?sh.lineTo(X,Y):sh.moveTo(X,Y);});return sh;});
   const mark=new T.Mesh(K(new T.ShapeGeometry(ms)),K(new T.MeshStandardMaterial({color:0x2a2a31,metalness:.9,roughness:.3})));mark.position.set(0,-.1,.003);back.add(mark);}
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
