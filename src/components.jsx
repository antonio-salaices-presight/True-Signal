import React from "react";
import { tl, SEV } from "./data.js";

export function Tag({sev,children}){return <span className={"tag "+sev}>{children||SEV[sev]}</span>}
export function niceMax(v){const p=Math.pow(10,Math.floor(Math.log10(v)));for(const m of[1,2,2.5,5,10]){if(m*p>=v)return m*p}return v}
export function Chart({series,fireIdx,height=300}){
  const W=760,H=height,L=44,R=12,Tp=14,B=26;
  const base=Math.round(series.slice(0,Math.max(1,fireIdx-3)).reduce((a,b)=>a+b,0)/Math.max(1,fireIdx-3));
  const max=niceMax(Math.max(...series)*1.05),step=max/4;
  const x=i=>L+(W-L-R)*i/(series.length-1),y=v=>Tp+(H-Tp-B)*(1-v/max);
  const pts=series.map((v,i)=>x(i)+","+y(v)).join(" ");
  const area="M"+x(0)+","+y(0)+" L"+pts.replace(/ /g," L")+" L"+x(series.length-1)+","+y(0)+" Z";
  const fv=series[fireIdx];
    return(
  <svg className="chart" viewBox={"0 0 "+W+" "+H} width="100%" role="img" aria-label={"Mentions over time. Normal level about "+base+" per 10 minutes, peak "+Math.max(...series)+"."}>
    {[0,1,2,3,4].map(k=>{const v=step*k;return <g key={k}><line className="grid" x1={L} x2={W-R} y1={y(v)} y2={y(v)}/><text x={L-8} y={y(v)+4} textAnchor="end">{Math.round(v)}</text></g>})}
    {[0,4,8,12,16,20,23].map(i=><text key={i} x={x(i)} y={H-6} textAnchor={i===23?"end":"middle"}>{tl(i)}</text>)}
    <line x1={L} x2={W-R} y1={y(base)} y2={y(base)} style={{stroke:"var(--muted)"}} strokeWidth="1.5" strokeDasharray="6 5"/>
    <text x={L+6} y={y(base)-6}>normal level</text>
    <path d={area} style={{fill:"var(--accent)"}} opacity=".18"/>
    <polyline points={pts} fill="none" style={{stroke:"var(--accent)"}} strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx={x(fireIdx)} cy={y(fv)} r="7" style={{fill:"var(--md)"}}/>
    <text x={x(fireIdx)-12} y={y(fv)-12} textAnchor="end" style={{fill:"var(--md)",fontWeight:700}}>alert fired {tl(fireIdx)}</text>
  </svg>);
}
export function Spark({data,w=96,h=28}){
  const max=Math.max(...data),min=Math.min(...data);
  const pts=data.map((v,i)=>(i*(w-4)/(data.length-1)+2)+","+(h-3-(h-6)*(v-min)/(max-min||1))).join(" ");
  return <svg width={w} height={h} viewBox={"0 0 "+w+" "+h} aria-hidden="true"><polyline points={pts} fill="none" style={{stroke:"var(--accent)"}} strokeWidth="2" strokeLinejoin="round"/></svg>
}
export function Bar({parts,colors}){return <div className="bar" role="img">{parts.map((p,i)=>p>0&&<div key={i} style={{width:p+"%",background:colors[i]}}/>)}</div>}
export const SENT_COL=["var(--accent)","var(--neu)","var(--hi)"];
export function Sentiment({a}){return <div className="card"><div className="h"><span>Sentiment</span></div>
  <Bar parts={a.sent} colors={SENT_COL}/>
  <div className="leg">{["Positive","Neutral","Negative"].map((n,i)=><span key={n}><i className="sw" style={{background:SENT_COL[i]}}/>{n} {a.sent[i]}%</span>)}</div></div>}
export const MIX_COL=["var(--accent)","var(--md)","var(--muted)"];
export function Mix({a}){return <div className="card"><div className="h"><span>Source mix</span></div>
  <Bar parts={a.mix} colors={MIX_COL}/>
  <div className="leg">{["X","Reddit","News"].map((n,i)=><span key={n}><i className="sw" style={{background:MIX_COL[i]}}/>{n} {a.mix[i]}%</span>)}</div></div>}
export function StatusLabel({a}){
  const m={new:"New",confirmed:"Confirmed",false:"False alarm",assigned:"Assigned to "+a.owner};
  return <span className="status">{m[a.status]}</span>
}
export function EvidenceRow({e}){
  const col=e.stance==="counter"?"lo":e.stance==="claim"?"hi":null;
  return <div className="ev"><span className="src">{e.src}</span><div style={{minWidth:0}}><p>{e.text}</p>
    <span className="meta">{e.time} · {e.note}{col&&<> · <span className={"tag "+col} style={{marginLeft:2}}>{e.stance==="counter"?"counter-evidence":"claim"}</span></>}</span></div></div>
}
export function AlertButton({a,on,onClick}){
  return <button className={"alert"+(on?" on":"")} onClick={onClick}>
    <Tag sev={a.sev}/><div style={{minWidth:0,flex:1}}><p>{a.title}</p>
    <em>{a.kind==="Opportunity"?"Opportunity":"Spike "+a.spike+"×"} · {a.platforms.length} platforms · confidence {a.conf}%</em></div>
    {a.status!=="new"&&<StatusLabel a={a}/>}</button>
}
