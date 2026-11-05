import React from "react";

function Briefing({alerts,openAlert}){
  const live=alerts.filter(a=>a.status!=="false");
  const risks=live.filter(a=>a.sev==="hi"),watch=live.filter(a=>a.sev==="md"),opp=live.filter(a=>a.sev==="lo");
  const lead=risks.length?risks.length+" issue"+(risks.length>1?"s":"")+" need attention: "+risks.map(a=>a.title.charAt(0).toLowerCase()+a.title.slice(1)).join("; and ")+". ":"No high-risk issues overnight. ";
  const tail=(watch.length?watch.length+" topic"+(watch.length>1?"s":"")+" to watch. ":"")+(opp.length?opp.length+" positive topic"+(opp.length>1?"s are":" is")+" rising and may be an opportunity.":"");
  const kindTag=a=>a.sev==="hi"?["hi","Risk"]:a.sev==="md"?["md","Watch"]:["lo","Opportunity"];
  const short={a1:"Event cancellation claim",a2:"Phishing SMS posing as a bank",a3:"Fuel price sentiment",a4:"Unverified road closure video",a5:"New public service app",a6:"New transport line"};
  return <>
    <div className="card" style={{padding:"20px 22px"}}><div className="h"><span>In one paragraph</span></div><p style={{fontSize:19,lineHeight:1.55}}>{lead}{tail}</p></div>
    <div className="three">{live.map(a=>{const[c,l]=kindTag(a);return <div className="card" key={a.id} style={{display:"flex",flexDirection:"column",gap:10}}>
      <div><span className={"tag "+c}>{l}</span></div><h3 style={{fontSize:20}}>{short[a.id]}</h3>
      <p style={{color:"var(--soft)",lineHeight:1.5}}>{a.claim} Suggested: {a.steps[0].charAt(0).toLowerCase()+a.steps[0].slice(1)}.</p>
      <div className="quote note" style={{marginTop:"auto"}}>{a.linked} evidence items · confidence {a.conf}%</div>
      <div><button className="btn" onClick={()=>openAlert(a.id)}>Open alert</button></div></div>})}
    <div className="card"><div className="h"><span>Coverage overnight</span></div><b style={{fontSize:32}}>48.2K</b><p style={{color:"var(--soft)",marginTop:6,lineHeight:1.5}}>items analyzed from X, Reddit and 310 news sites. Every alert links to its sources.</p></div></div>
    {!live.length&&<div className="card empty">All alerts were marked as false alarms.</div>}</>
}

export default Briefing;
