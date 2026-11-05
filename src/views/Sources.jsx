import React from "react";

function Sources({sources,toggle}){
  return <><div className="srcgrid">{sources.map(s=><div className="card" key={s.id} style={{display:"flex",flexDirection:"column",gap:10}}>
    <div className="line"><h3 style={{fontSize:20}}>{s.name}</h3><button className="sw-toggle" role="switch" aria-checked={s.on} aria-label={"Use "+s.name} onClick={()=>toggle(s.id)}/></div>
    <span className={"tag "+(s.on?"lo":"plain")} style={{alignSelf:"flex-start"}}>{s.on?"Connected":"Paused"}</span>
    <div><div className="lab">Access</div><div className="meta" style={{marginTop:2}}>{s.access}</div></div>
    <div><div className="lab">Volume</div><div className="meta mono" style={{marginTop:2}}>{s.on?s.rate:"Paused"}</div></div>
    <p className="note">{s.notes}</p></div>)}</div>
    <div className="card"><div className="h"><span>Data routes</span></div><p className="note" style={{fontSize:14}}>This demo uses only official APIs and licensed feeds. Scraping is not used because many platforms restrict it in their terms. Any production source goes through a terms and security review first.</p></div></>
}

export default Sources;
