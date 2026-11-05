import React, { useState, useMemo, useEffect, useRef } from "react";
import Overview from "./views/Overview.jsx";
import Alerts from "./views/Alerts.jsx";
import Topics from "./views/Topics.jsx";
import Briefing from "./views/Briefing.jsx";
import Sources from "./views/Sources.jsx";
import EvidencePage from "./views/EvidencePage.jsx";
import Settings from "./views/Settings.jsx";
import { ALERTS, EVIDENCE, SOURCES0, SEV, SEVRANK, nowTime } from "./data.js";

const NAV=[["overview","Live overview"],["alerts","Alerts"],["topics","Topics"],["briefing","Daily briefing"],["sources","Sources"],["evidence","Evidence"],["preferences","Settings"]];
const TITLES={overview:"Live overview",alerts:"Alerts",topics:"Topics",briefing:"Daily briefing · Thursday, 08:00",sources:"Sources",evidence:"Evidence",preferences:"Settings"};
export default function App(){
  const fromHash=()=>{const h=location.hash.slice(1);return NAV.some(n=>n[0]===h)?h:"overview"};
  const [view,setView]=useState(fromHash);
  const [alerts,setAlerts]=useState(ALERTS);
  const [selId,setSel]=useState("a1");
  const [sources,setSources]=useState(SOURCES0);
  const [cfg,setCfg]=useState({spike:2,conf:60,review:true,narr:true});
  const [audit,setAudit]=useState([{t:"08:00",what:"Daily briefing generated",who:"System"},{t:"07:58",what:"Thresholds loaded from defaults",who:"System"}]);
  const [toast,setToast]=useState(null);
  const tt=useRef();
  const mainRef=useRef();
  useEffect(()=>{const f=()=>setView(fromHash());window.addEventListener("hashchange",f);return()=>window.removeEventListener("hashchange",f)},[]);
  useEffect(()=>{mainRef.current&&mainRef.current.scrollTo(0,0)},[view]);
  const go=v=>{location.hash=v;setView(v)};
  const say=m=>{setToast(m);clearTimeout(tt.current);tt.current=setTimeout(()=>setToast(null),2400)};
  const log=what=>setAudit(a=>[{t:nowTime(),what,who:"You (demo)"},...a]);
  const visible=useMemo(()=>alerts.filter(a=>a.spike>=cfg.spike&&a.conf>=cfg.conf).sort((a,b)=>SEVRANK[a.sev]-SEVRANK[b.sev]),[alerts,cfg]);
  const hidden=alerts.length-visible.length;
  const evidenceFor=id=>EVIDENCE.filter(e=>e.alert===id);
  const upd=(id,p)=>setAlerts(as=>as.map(a=>a.id===id?{...a,...p}:a));
  const act=(a,what)=>{
    if(what==="confirmed"){upd(a.id,{status:"confirmed"});log("Confirmed alert: "+a.title);say("Alert confirmed")}
    else if(what==="false"){upd(a.id,{status:"false"});log("Marked false alarm: "+a.title);say("Marked as false alarm")}
    else if(what==="export"){
      const txt="TrueSignal alert report (demo data)\n"+a.title+"\nRisk: "+SEV[a.sev]+" · Spike "+a.spike+"× · Confidence "+a.conf+"%\nFirst seen "+a.first+", alert fired "+a.fired+"\n\nClaim: "+a.claim+"\nSpread: "+a.spread+"\nCounter-evidence: "+a.counter+"\n\nNext steps:\n"+a.steps.map((s,i)=>(i+1)+". "+s).join("\n");
      log("Exported report: "+a.title);
      try{navigator.clipboard.writeText(txt).then(()=>say("Report copied to clipboard"),()=>say("Report ready. Copy was blocked by this browser."))}catch(e){say("Report ready. Copy was blocked by this browser.")}
    }
  };
  const assign=(a,n)=>{upd(a.id,{status:"assigned",owner:n});log("Assigned "+n+": "+a.title);say("Assigned to "+n)};
  const openAlert=id=>{setSel(id);go("alerts")};
  const toggleSrc=id=>{const s=sources.find(x=>x.id===id);setSources(ss=>ss.map(x=>x.id===id?{...x,on:!x.on}:x));log((s.on?"Paused ":"Resumed ")+s.name)};
  const highCount=alerts.filter(a=>a.sev==="hi"&&a.status!=="false"&&a.spike>=cfg.spike&&a.conf>=cfg.conf).length;
  return <div className="app">
    <nav className="side" aria-label="Main">
      <div className="logo"><i/>TrueSignal</div>
      {NAV.map(([k,n])=><button key={k} className={"nav"+(view===k?" on":"")} aria-current={view===k?"page":undefined} onClick={()=>go(k)}>{n}{k==="alerts"&&highCount>0&&<span className="badge">{highCount}</span>}</button>)}
      <div className="sidefoot"><span>Workspace: UAE (demo)</span><span>All data on this page is fictional.</span></div>
    </nav>
    <main className="main" ref={mainRef}>
      <div className="top"><h1>{TITLES[view]}</h1>
        <span className="pill">{sources.filter(s=>s.on).map(s=>s.name).join(" · ")||"No sources"}</span>
        <span className="pill">UAE (demo)</span><span className="pill demo">ILLUSTRATIVE · FICTIONAL DATA</span></div>
      {view==="overview"&&<Overview alerts={visible} hidden={hidden} openAlert={openAlert} evidenceFor={evidenceFor}/>}
      {view==="alerts"&&<Alerts alerts={visible} hidden={hidden} selId={selId} setSel={setSel} evidenceFor={evidenceFor} act={act} assign={assign}/>}
      {view==="topics"&&<Topics/>}
      {view==="briefing"&&<Briefing alerts={visible} openAlert={openAlert}/>}
      {view==="sources"&&<Sources sources={sources} toggle={toggleSrc}/>}
      {view==="evidence"&&<EvidencePage alerts={alerts}/>}
      {view==="preferences"&&<Settings cfg={cfg} setCfg={setCfg} audit={audit}/>}
    </main>
    {toast&&<div className="toast" role="status">{toast}</div>}
  </div>
}
