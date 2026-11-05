import React, { useState } from "react";
import { Chart, Sentiment, Mix, EvidenceRow, AlertButton } from "../components.jsx";
import { TOPIC_ROWS } from "../data.js";

function Overview({alerts,hidden,openAlert,evidenceFor}){
  const [sel,setSel]=useState(null);
  const top=alerts.find(a=>a.id===sel)||alerts[0];
  if(!top)return <div className="card empty">No alerts match the current thresholds. Lower them in Settings.</div>;
  const active=alerts.filter(a=>a.status!=="false");
  const avg=Math.round(alerts.reduce((s,a)=>s+a.detect,0)/alerts.length);
  const topics=TOPIC_ROWS.length;
  return <>
  <div className="kpis">
    <div className="card k"><small>Active alerts</small><b>{active.length}</b><span>{active.filter(a=>a.sev==="hi").length} high risk{hidden>0&&" · "+hidden+" hidden by thresholds"}</span></div>
    <div className="card k"><small>Emerging topics</small><b>{topics}</b><span>3 new this hour</span></div>
    <div className="card k"><small>Items analyzed</small><b>48.2K</b><span>X, Reddit, 310 news sites</span></div>
    <div className="card k"><small>Avg. detection time</small><b>{avg} min</b><span>from first post to alert</span></div>
  </div>
  <div className="row">
    <div className="col">
      <div className="card"><div className="h"><span>Mentions · {top.title.length>46?top.title.slice(0,44)+"…":top.title}</span><span style={{color:"var(--md)"}}>Spike detected {top.fired}</span></div>
        <Chart series={top.series} fireIdx={top.fireIdx} height={300}/>
        <p className="note" style={{marginTop:6}}>Mentions per 10 minutes, today. The dashed line is the topic's normal level.</p></div>
      <div className="two"><Sentiment a={top}/><Mix a={top}/></div>
    </div>
    <div className="col">
      <div className="card"><div className="h"><span>Alerts</span><span>sorted by risk</span></div>
        <div>{alerts.map(a=><AlertButton key={a.id} a={a} on={a.id===top.id} onClick={()=>setSel(a.id)}/>)}</div></div>
      <div className="card"><div className="h"><span>Evidence · selected alert</span><span>{top.linked} linked items</span></div>
        {evidenceFor(top.id).slice(0,2).map(e=><EvidenceRow key={e.id} e={e}/>)}
        <div className="actions" style={{marginTop:12}}><button className="btn p" onClick={()=>openAlert(top.id)}>Open alert</button></div></div>
    </div>
  </div></>
}

export default Overview;
