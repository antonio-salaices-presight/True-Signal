import React, { useState } from "react";
import { EVIDENCE } from "../data.js";

function EvidencePage({alerts}){
  const [src,setSrc]=useState("ALL"),[q,setQ]=useState("");
  const rows=EVIDENCE.filter(e=>(src==="ALL"||e.src===src)&&(!q||e.text.toLowerCase().includes(q.toLowerCase())));
  const title=id=>alerts.find(a=>a.id===id)?.title||"";
  return <div className="card"><div className="line" style={{flexWrap:"wrap",marginBottom:12}}>
    <div className="chips">{["ALL","X","REDDIT","NEWS"].map(s=><button key={s} className={"chip"+(src===s?" on":"")} onClick={()=>setSrc(s)}>{s==="ALL"?"All sources":s}</button>)}</div>
    <input id="ev-search" type="search" placeholder="Search evidence" aria-label="Search evidence" value={q} onChange={e=>setQ(e.target.value)} style={{flex:"1 1 200px",maxWidth:320}}/></div>
    <div className="tablewrap"><table><thead><tr><th>Source</th><th>Item</th><th>Time</th><th>Alert</th></tr></thead>
    <tbody>{rows.map(e=><tr key={e.id}><td><span className="src">{e.src}</span></td><td style={{minWidth:240}}>{e.text}<span className="meta">{e.note}</span></td><td className="mono">{e.time}</td><td className="note" style={{minWidth:180}}>{title(e.alert)}</td></tr>)}</tbody></table></div>
    {!rows.length&&<div className="empty">No evidence matches.</div>}</div>
}

export default EvidencePage;
