import React from "react";

function Settings({cfg,setCfg,audit}){
  const tog=(k)=><button className="sw-toggle" role="switch" aria-checked={cfg[k]} aria-label={k} onClick={()=>setCfg({...cfg,[k]:!cfg[k]})}/>;
  return <div className="two">
    <div className="col">
      <div className="card"><div className="h"><span>Detection</span></div>
        <div className="field" style={{marginBottom:18}}><div className="line"><label htmlFor="th-spike">Minimum spike</label><span className="mono">{cfg.spike}× normal</span></div>
          <input id="th-spike" type="range" min="1.5" max="10" step="0.5" value={cfg.spike} onChange={e=>setCfg({...cfg,spike:+e.target.value})}/></div>
        <div className="field"><div className="line"><label htmlFor="th-conf">Minimum confidence</label><span className="mono">{cfg.conf}%</span></div>
          <input id="th-conf" type="range" min="50" max="95" step="1" value={cfg.conf} onChange={e=>setCfg({...cfg,conf:+e.target.value})}/></div>
        <p className="note" style={{marginTop:12}}>Alerts below these levels are hidden from the overview, alerts and briefing.</p></div>
      <div className="card"><div className="h"><span>Governance</span></div>
        <div className="line" style={{marginBottom:14}}><div><div className="lab">Analyst review before sharing</div><div className="note">Alerts stay internal until an analyst confirms them.</div></div>{tog("review")}</div>
        <div className="line"><div><div className="lab">Analyze narratives, not people</div><div className="note">Alerts group topics and claims. Profiles of individuals are not built.</div></div>{tog("narr")}</div></div>
      <div className="card"><div className="h"><span>Access roles</span></div>
        <div className="tablewrap"><table><thead><tr><th>Person</th><th>Role</th></tr></thead><tbody>
          <tr><td>Amira K.</td><td>Admin</td></tr><tr><td>Omar R.</td><td>Analyst</td></tr><tr><td>Lena S.</td><td>Viewer</td></tr></tbody></table></div>
        <p className="note" style={{marginTop:10}}>Example roles. Production uses role-based access and single sign-on.</p></div>
    </div>
    <div className="card" style={{alignSelf:"start"}}><div className="h"><span>Audit log</span><span>this session</span></div>
      {audit.map((a,i)=><div className="ev" key={i}><span className="src mono">{a.t}</span><div><p>{a.what}</p><span className="meta">{a.who}</span></div></div>)}</div>
  </div>
}

export default Settings;
