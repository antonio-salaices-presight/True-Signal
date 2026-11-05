// All data in this file is fictional demo data.
export function rng(seed){let s=seed;return()=>(s=(s*9301+49297)%233280)/233280}
export function makeSeries(seed,base,fireIdx,spike){
  const r=rng(seed),peak=fireIdx+3,start=fireIdx-3,out=[];
  for(let i=0;i<24;i++){
    let f=0;
    if(i>=start&&i<=peak)f=(i-start)/(peak-start);
    else if(i>peak)f=Math.max(.45,1-(i-peak)*.06);
    out.push(Math.round(base*(1+(spike-1)*f)*(.9+r()*.2)));
  }
  return out;
}
export const T0=12*60;
export const tl=i=>{const m=T0+i*10;return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0")};
export const mins=s=>{const[a,b]=s.split(":").map(Number);return a*60+b};
export const ALERTS=[
 {id:"a1",title:"Claim that the event was cancelled spreading across X and Reddit",sev:"hi",kind:"Risk",spike:9,platforms:["X","Reddit","News"],conf:82,first:"14:12",fired:"14:20",fireIdx:14,base:22,seed:3,linked:12,sent:[18,34,48],mix:[52,30,18],
  claim:"Users say the event scheduled for Saturday has been cancelled. No official source is cited in the earliest posts.",
  spread:"Started in one Reddit thread, then picked up by accounts on X. Most posts repeat the same wording.",
  counter:"One news site quotes the organizers saying the schedule is unchanged.",
  steps:["Verify with the organizers' official channel","Prepare a short clarification for the press team","Keep monitoring and re-check in 30 minutes"]},
 {id:"a2",title:"Wave of phishing SMS posing as a bank",sev:"hi",kind:"Risk",spike:6,platforms:["X","Reddit"],conf:76,first:"13:35",fired:"13:40",fireIdx:10,base:14,seed:7,linked:41,sent:[4,20,76],mix:[61,34,5],
  claim:"Many users report the same text message with a link asking them to confirm their account with a bank.",
  spread:"Reports come from several users on X, repeating the same message and the same short link.",
  counter:"The bank's official account has not yet posted a warning.",
  steps:["Alert the bank's security team","Draft a customer warning with the real contact channels","Collect the reported link for takedown requests"]},
 {id:"a3",title:"Sentiment turning negative around new fuel prices",sev:"md",kind:"Watch",spike:3,platforms:["X","News"],conf:71,first:"12:53",fired:"13:00",fireIdx:6,base:40,seed:11,linked:27,sent:[9,31,60],mix:[44,16,40],
  claim:"Discussion moved from neutral to mostly negative within two hours of the announcement.",
  spread:"News coverage is neutral. Most negative posts come from users comparing monthly costs.",
  counter:"Several posts note the change is small compared with previous months.",
  steps:["Prepare a short Q&A on the new prices","Share the official calculation method","Re-check sentiment in two hours"]},
 {id:"a4",title:"Unverified video of a road closure circulating",sev:"md",kind:"Watch",spike:4,platforms:["X","Reddit"],conf:64,first:"14:44",fired:"14:50",fireIdx:17,base:9,seed:5,linked:9,sent:[12,52,36],mix:[70,30,0],
  claim:"A video claims a major road is closed. The location and date are not confirmed.",
  spread:"Shared on two platforms, mostly by accounts that posted the same clip within minutes.",
  counter:"No traffic authority update found yet.",
  steps:["Check the traffic authority's channel","Hold any public statement until verified","Re-check in 30 minutes"]},
 {id:"a5",title:"Rising interest in a new public service app",sev:"lo",kind:"Opportunity",spike:3,platforms:["X","Reddit","News"],conf:88,first:"12:46",fired:"12:50",fireIdx:5,base:18,seed:13,linked:15,sent:[71,24,5],mix:[48,22,30],
  claim:"Mentions of the new app are rising, mostly asking how to sign up and sharing first impressions.",
  spread:"Spread is organic and spread across many accounts.",
  counter:"A few users report a login problem.",
  steps:["Share sign-up instructions through official channels","Reply to the login question with a fix","Track sentiment over the next day"]},
 {id:"a6",title:"Positive reaction to a new transport line",sev:"lo",kind:"Opportunity",spike:2,platforms:["X","News"],conf:79,first:"13:14",fired:"13:20",fireIdx:8,base:25,seed:17,linked:18,sent:[64,30,6],mix:[58,12,30],
  claim:"Commuters post about shorter travel times on the new line.",
  spread:"Mostly first-hand posts with photos, plus two news pieces.",
  counter:"Some users ask for more frequent service at peak hours.",
  steps:["Share service updates and timetable","Collect peak-hour feedback for the operator","Re-check sentiment tomorrow"]},
].map(a=>({...a,series:makeSeries(a.seed,a.base,a.fireIdx,a.spike),detect:mins(a.fired)-mins(a.first),status:"new",owner:null}));

export const EVIDENCE=[
 ["a1","REDDIT","“Heard the whole event was cancelled, anyone confirm?”","14:12","first seen","question"],
 ["a1","X","“It's official, event cancelled. Don't go.”","14:18","no source cited","claim"],
 ["a1","REDDIT","“Same text copied in 5 other threads.”","14:30","duplicate wording","claim"],
 ["a1","X","“Anyone know if tomorrow is still on?”","14:26","question, not claim","question"],
 ["a1","NEWS","“Organizers say the schedule is unchanged.”","14:41","counter-evidence","counter"],
 ["a2","X","“Got a text from my bank asking me to confirm my account. Looks off.”","13:35","first report","report"],
 ["a2","X","“Same SMS here, same link. Don't click.”","13:44","matches first report","report"],
 ["a2","REDDIT","“Collecting screenshots of the bank SMS in this thread.”","13:58","aggregation","report"],
 ["a3","NEWS","“Ministry announces updated monthly fuel prices.”","12:50","neutral report","neutral"],
 ["a3","X","“Monthly cost is going up again, how is this fair?”","13:12","negative","claim"],
 ["a3","NEWS","“Analysts say the change is small versus recent months.”","14:05","counter-evidence","counter"],
 ["a4","X","“Video from the highway, everything is blocked.”","14:44","no location given","claim"],
 ["a4","REDDIT","“Does anyone know where this video was filmed?”","14:52","question","question"],
 ["a4","X","“Old video? Looks like last year.”","15:10","possible reuse","counter"],
 ["a5","REDDIT","“How do I sign up for the new service app?”","12:46","question","question"],
 ["a5","NEWS","“New public service app launches this week.”","12:55","launch coverage","neutral"],
 ["a6","X","“New line cut my commute by 20 minutes.”","13:14","positive","report"],
 ["a6","NEWS","“First week on the new transport line: what riders say.”","13:50","news piece","neutral"],
].map((e,i)=>({id:"e"+i,alert:e[0],src:e[1],text:e[2],time:e[3],note:e[4],stance:e[5]}));

export const TOPIC_ROWS=[
 ["Event cancellation claim","Security",3120,820,-.62],["Bank phishing SMS","Security",1840,540,-.71],["Fuel prices","Economy",5210,210,-.38],
 ["Road closure video","Traffic",760,300,-.22],["Public service app","Services",2480,190,.41],["New transport line","Transport",1930,95,.48],
 ["Heat advisory","Weather",4100,40,-.05],["Airport queues","Travel",1280,60,-.33],["School calendar","Education",2760,25,.04],
 ["Used car scams","Security",640,120,-.55],["Water outage rumor","Services",520,260,-.47],["Concert ticket resale","Events",1090,70,-.18],
].map((t,i)=>{const r=rng(i+40);const sp=Array.from({length:14},(_,j)=>Math.round(t[2]/14*(.6+r()*.5+(j>9?t[3]/400:0))));return{name:t[0],cat:t[1],mentions:t[2],change:t[3],sent:t[4],spark:sp}});

export const SOURCES0=[
 {id:"x",name:"X",access:"Official API (demo)",rate:"1,240 items / hour",notes:"Public posts matching monitored topics. Terms and rate limits apply.",on:true},
 {id:"reddit",name:"Reddit",access:"Official API (demo)",rate:"690 items / hour",notes:"Selected communities and search terms only.",on:true},
 {id:"news",name:"News",access:"Licensed feed (demo)",rate:"310 sites · 180 items / hour",notes:"Articles from approved publishers, with the original link kept.",on:true},
];
export const ANALYSTS=["Amira K.","Omar R.","Lena S."];
export const SEV={hi:"High",md:"Medium",lo:"Low"};
export const SEVRANK={hi:0,md:1,lo:2};
export const nowTime=()=>new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:false});
