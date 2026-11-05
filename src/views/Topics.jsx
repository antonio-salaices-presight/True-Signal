import React, { useState } from "react";
import { Spark, Sentiment } from "../components.jsx";
import { TOPIC_ROWS } from "../data.js";

function Topics(){
  const [sort,setSort]=useState({k:"change",d:-1});
  const rows=[...TOPIC_ROWS].sort((a,b)=>{const x=a[sort.k],y=b[sort.k];return (typeof x==="string"?x.localeCompare(y):x-y)*sort.d});
  const th=(k,label,cls)=><th className={cls} aria-sort={sort.k===k?(sort.d>0?"ascending":"descending"):"none"}><button onClick={()=>setSort(s=>({k,d:s.k===k?-s.d:-1}))}>{label}{sort.k===k?(sort.d>0?" ↑":" ↓"):""}</button></th>;
  const sl=s=>s>.15?["lo","Positive"]:s<-.15?["hi","Negative"]:["plain","Neutral"];
  return <div className="card"><div className="h"><span>Emerging topics · last 24 hours</span><span>{rows.length} topics</span></div>
    <div className="tablewrap"><table><thead><tr>{th("name","Topic")}{th("cat","Category")}{th("mentions","Mentions","num")}{th("change","Growth","num")}{th("sent","Sentiment")}<th>Trend</th></tr></thead>
    <tbody>{rows.map(t=>{const[c,l]=sl(t.sent);return <tr key={t.name}><td style={{fontWeight:600}}>{t.name}</td><td>{t.cat}</td><td className="num">{t.mentions.toLocaleString("en-US")}</td><td className="num" style={{color:"var(--accent)"}}>+{t.change}%</td><td><span className={"tag "+c}>{l}</span></td><td><Spark data={t.spark}/></td></tr>})}</tbody></table></div>
    <p className="note" style={{marginTop:12}}>Growth compares the last 24 hours with each topic's own usual level.</p></div>
}

export default Topics;
