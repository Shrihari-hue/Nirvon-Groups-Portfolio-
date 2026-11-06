"use strict";
/* =========================================================
   PROJECTS — edit your portfolio projects here.
   Screenshots: assets/web/   Videos: assets/videos/<id>-d.mp4 (laptop) and <id>-m.mp4 (phone)
   ========================================================= */
const IMG = {
  "nirvongroups-d0": "assets/web/nirvongroups-d0.jpg",
  "nirvongroups-d1": "assets/web/nirvongroups-d1.jpg",
  "nirvongroups-d2": "assets/web/nirvongroups-d2.jpg",
  "nirvongroups-d3": "assets/web/nirvongroups-d3.jpg",
  "nirvongroups-m0": "assets/web/nirvongroups-m0.jpg",
  "ostrich-d0": "assets/web/ostrich-d0.jpg",
  "ostrich-d1": "assets/web/ostrich-d1.jpg",
  "ostrich-d2": "assets/web/ostrich-d2.jpg",
  "ostrich-d3": "assets/web/ostrich-d3.jpg",
  "ostrich-m0": "assets/web/ostrich-m0.jpg",
  "thathvah-d1": "assets/web/thathvah-d1.jpg",
  "thathvah-m0": "assets/web/thathvah-m0.jpg",
  "thathvah-w0": "assets/web/thathvah-w0.jpg",
  "thathvah-w3": "assets/web/thathvah-w3.jpg",
  "thathvah-w4": "assets/web/thathvah-w4.jpg",
  "xenovia-d0": "assets/web/xenovia-d0.jpg",
  "xenovia-m0": "assets/web/xenovia-m0.jpg",
  "xenovia-s0": "assets/web/xenovia-s0.jpg"
};
const P = [
 {id:"xenovia",name:"Xenovia",cat:"Fintech SaaS",year:2026,loc:"India",url:"https://xenovia.in/",tag:"Control. Connect. Grow.",
  shots:["xenovia-d0","xenovia-s0"],mobile:"xenovia-m0",
  brief:"Xenovia is a cloud operating system for Chartered Accountant firms and finance teams in India. The site had to speak to accountants in their own language and make a dense platform feel calm.",
  approach:"The site opens with Tax season: nine short games for people who know their GSTR-2B from their 26AS. Behind the games sits the platform story, set in deep forest green with gold serif type.",
  result:"Visitors play a round, then move straight into the platform: workflow tracking, a document vault, billing and recovery, a deadline calendar, GST, Income Tax and TDS tools, the Auditron AI assistant and three pricing tiers.",
  list:["Tax games","Platform","How it works","Taxation","Auditron","Pricing"],feat:["Interactive games","Sound design","Pricing table","Animation"]},
 {id:"thathvah",name:"Thathvah",cat:"Agriculture",year:2026,loc:"Beltangadi, Karnataka",url:"https://thathvah.com/",tag:"Nature's Intuition",
  shots:["thathvah-d1","thathvah-w0","thathvah-w3","thathvah-w4"],mobile:"thathvah-m0",
  brief:"Thathvah Consultants is a small Karnataka-based consultancy that distributes two things it believes in: natural herbal produce and organic inputs for the land.",
  approach:"Misty forest footage, quiet serif type and vertical section labels set a slow, earthy pace. Each product, soursop and Fish Amino Acid, gets its own chapter with studio photography.",
  result:"A short, atmospheric site that explains both products and ends on direct call buttons, so farmers and buyers can reach the team in one tap.",
  list:["Home","Soursop","Fish Amino Acid","Contact"],feat:["Video backgrounds","Scroll storytelling","Click-to-call"]},
 {id:"ostrich",name:"OST-RICH Interiors",cat:"Interior Design",year:2026,loc:"Bangalore",url:"https://ostrichinteriors.com/",tag:"Where emotion becomes architecture.",
  shots:["ostrich-d0","ostrich-d1","ostrich-d2","ostrich-d3"],mobile:"ostrich-m0",
  brief:"OST-RICH is a Bangalore interior design studio for luxury residences and hospitality spaces. Their belief is that luxury should feel enveloping, not performative.",
  approach:"A full-screen hero video carousel leads into a light, gallery-calm layout with generous whitespace, an elegant serif and bronze accents that echo the studio's materials.",
  result:"The site walks visitors through the studio, its three co-founders, signature projects such as LemonTree Coorg, four areas of expertise and a three-step process, ending in a consultation enquiry.",
  list:["About","Leadership","Projects","Expertise","Process","Contact"],feat:["Video carousel","Project slider","Consultation form","Ambient audio"]},
 {id:"nirvongroups",name:"Nirvon Groups",cat:"Conglomerate",year:2026,loc:"India",url:"https://nirvon-groups-production.up.railway.app/",tag:"Eight disciplines. One conviction.",
  shots:["nirvongroups-d0","nirvongroups-d1","nirvongroups-d2","nirvongroups-d3"],mobile:"nirvongroups-m0",
  brief:"Nirvon Groups is a multi-industry house that builds and invests across technology, interior design, exports, finance, consultancy, sustainability, real estate and digital marketing.",
  approach:"Each discipline gets a full-screen cinematic chapter with its own film and a one-line promise, such as Spaces, considered. and Attention, engineered., set in a refined serif on deep tones.",
  result:"Visitors scroll the eight disciplines as one story, open any vertical, read the group's perspective and send an enquiry routed to the right discipline.",
  list:["Home","Disciplines","Our Perspective","Contact"],feat:["Video storytelling","Section index","Enquiry form"]}
];
P.forEach(p=>{p.d=p.shots.map(k=>IMG[k]);p.m=IMG[p.mobile];});
const ALL = P.flatMap(p=>p.d.map(src=>({p,src})));
const CATS = ["All", ...new Set(P.map(p => p.cat))];

/* =========================================================
   DISCIPLINES — used by the "We build ___" rolling headline.
   word = the word that appears after "We build".
   Images: assets/web/d-<id>.jpg
   ========================================================= */
const DISC = [
 {id:"technology", word:"technology", name:"Technology",        desc:"Software, platforms and digital products built to scale."},
 {id:"interior",   word:"spaces",      name:"Interior Design",   desc:"Residential and hospitality spaces, from concept to final finish."},
 {id:"exports",    word:"trade routes", name:"Exports",          desc:"Sourcing, trade and logistics that connect India to the world."},
 {id:"finance",    word:"capital",     name:"Finance",           desc:"Capital, advisory and wealth management for long-term growth."},
 {id:"consultancy",word:"clarity",     name:"Consultancy",       desc:"Chartered accountancy, taxation and corporate law under one roof."},
 {id:"eco",        word:"greener futures", name:"Eco Projects",  desc:"Sustainability work that leaves people and places better off."},
 {id:"realestate", word:"landmarks",   name:"Real Estate",       desc:"Development and management of property built to hold value."},
 {id:"marketing",  word:"attention",   name:"Digital Marketing", desc:"Performance, brand and content systems built to compound."}
];
DISC.forEach(d => d.img = "assets/web/d-" + d.id + ".jpg");
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
const loadImg=src=>new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src=src;});
