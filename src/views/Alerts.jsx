import React, { useState } from "react";
import { AlertButton, Chart, EvidenceRow, StatusLabel, Tag } from "../components.jsx";
import { ANALYSTS, SEV } from "../data.js";

function AlertDetail({a,evidence,act,assign}){
  const [assigning,setAssigning]=useState(false);
  return <div className="col">
    <div className="card"><div className="line" style={{alignItems:"flex-start",flexWrap:"wrap"}}>
      <div style={{minWidth:0,flex:1}}><div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}><Tag sev={a.sev}>{SEV[a.sev]+" risk"}</Tag><span className="tag plain">{a.kind}</span>{a.status!=="new"&&<StatusLabel a={a}/>}</div>
      <h2 style={{fontSize:21,lineHeight:1.25,textWrap:"balance"}}>{a.title}</h2></div></div></div>
    <div className="kpis">
      <div className="card k"><small>Spike</small><b>{a.spike}×</b><span>vs. normal level</span></div>
      <div className="card k"><small>Platforms</small><b>{a.platforms.length}</b><span>{a.platforms.join(" · ")}</span></div>
      <div className="card k"><small>Confidence</small><b>{a.conf}%</b><span>model estimate</span></div>
      <div className="card k"><small>First seen</small><b className="mono" style={{fontSize:28}}>{a.first}</b><span>alert fired {a.fired}</span></div>
    </div>
    <div className="row">
      <div className="col">
        <div className="card"><div className="h"><span>What is being said · AI summary</span><span>needs analyst review</span></div>
          <div className="sec"><h3>Claim</h3><p>{a.claim}</p></div>
          <div className="sec"><h3>Spread</h3><p>{a.spread}</p></div>
          <div className="sec"><h3>Counter-evidence</h3><p>{a.counter}</p></div></div>
        <div className="card"><div className="h"><span>Mentions over time</span></div><Chart series={a.series} fireIdx={a.fireIdx} height={260}/></div>
        <div className="card"><div className="h"><span>Suggested next steps</span></div>
          {a.steps.map((s,i)=><div className="step" key={i}><b>{i+1}</b><span>{s}</span></div>)}</div>
      </div>
      <div className="col">
        <div className="card"><div className="h"><span>Evidence</span><span>showing {evidence.length} of {a.linked}</span></div>
          {evidence.map(e=><EvidenceRow key={e.id} e={e}/>)}</div>
        <div className="card"><div className="h"><span>Analyst actions</span></div>
          <div className="actions">
            <button className="btn p" disabled={a.status==="confirmed"} onClick={()=>act(a,"confirmed")}>Confirm alert</button>
            <button className="btn" disabled={a.status==="false"} onClick={()=>act(a,"false")}>Mark false alarm</button>
            <button className="btn" onClick={()=>act(a,"export")}>Export report</button>
            <button className="btn" aria-expanded={assigning} onClick={()=>setAssigning(!assigning)}>Assign</button>
          </div>
          {assigning&&<div className="chips" style={{marginTop:12}}>{ANALYSTS.map(n=><button key={n} className="chip" onClick={()=>{assign(a,n);setAssigning(false)}}>{n}</button>)}</div>}
          <p className="note" style={{marginTop:12}}>Every action is recorded in the audit log. Analyst names are examples.</p></div>
      </div>
    </div></div>
}

function Alerts({alerts,hidden,selId,setSel,evidenceFor,act,assign}){
  const [f,setF]=useState("all");
  const list=alerts.filter(a=>f==="all"||a.sev===f);
  const a=alerts.find(x=>x.id===selId)||list[0]||alerts[0];
  if(!a)return <div className="card empty">No alerts match the current thresholds. Lower them in Settings.</div>;
  return <div className="row" style={{gridTemplateColumns:"minmax(0,330px) minmax(0,1fr)"}} data-alerts>
    <div className="card" style={{padding:12}}>
      <div className="chips" style={{padding:"4px 6px 10px"}}>{[["all","All"],["hi","High"],["md","Medium"],["lo","Low"]].map(([k,n])=><button key={k} className={"chip"+(f===k?" on":"")} onClick={()=>setF(k)}>{n}</button>)}</div>
      {list.length?list.map(x=><AlertButton key={x.id} a={x} on={x.id===a.id} onClick={()=>setSel(x.id)}/>):<div className="empty">No alerts at this level.</div>}
      {hidden>0&&<p className="note" style={{padding:"10px 12px 2px"}}>{hidden} alert{hidden>1?"s":""} hidden by your thresholds.</p>}
    </div>
    <AlertDetail a={a} evidence={evidenceFor(a.id)} act={act} assign={assign}/>
  </div>
}

export default Alerts;
