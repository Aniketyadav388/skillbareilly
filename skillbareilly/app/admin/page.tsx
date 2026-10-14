"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(()=>{ if(auth) load(); }, [auth]);
  const load = async () => {
    const { data } = await supabase.from("jobs").select("*").order("id",{ascending:false});
    if(data) setJobs(data);
  };
  const login = () => { if(pass==="bareilly123") setAuth(true); else alert("Wrong"); };

  if(!auth){
    return <div style={{minHeight:"100vh", background:"#0a0a0a", display:"flex", justifyContent:"center", alignItems:"center"}}><div style={{background:"#18181b", padding:"30px", borderRadius:"16px", width:"350px"}}><h1 style={{color:"white", textAlign:"center", fontWeight:"900"}}>Skill<span style={{color:"yellow"}}>Bareilly</span></h1><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%", padding:"12px", marginTop:"20px", borderRadius:"8px"}}/><button onClick={login} style={{width:"100%", background:"yellow", padding:"12px", borderRadius:"8px", fontWeight:"900", marginTop:"10px"}}>Login</button></div></div>
  }

  const menu = [
    { id:"dashboard", icon:"📊", name:"Dashboard" },
    { id:"profile", icon:"👤", name:"My Profile" },
    { id:"jobs", icon:"💼", name:"Jobs" },
    { id:"users", icon:"👥", name:"Users" },
    { id:"apps", icon:"📩", name:"Applications" },
    { id:"companies", icon:"🏢", name:"Companies" },
    { id:"analytics", icon:"📈", name:"Analytics" },
    { id:"settings", icon:"⚙️", name:"Settings" },
  ];

  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#f8fafc"}}>
      {/* SIDEBAR - AB TEXT PAKKA DIKHEGA */}
      <div style={{width:"260px", background:"#0f172a", padding:"20px", flexShrink:0}}>
        <div style={{marginBottom:"30px"}}>
          <h1 style={{color:"white", fontWeight:"900", fontSize:"22px", margin:0}}>SkillBareilly</h1>
          <p style={{color:"#94a3b8", fontSize:"11px", letterSpacing:"3px", margin:0, marginTop:"2px"}}>JOB PORTAL</p>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
          {menu.map(m => (
            <button
              key={m.id}
              onClick={()=>setTab(m.id)}
              style={{
                display:"flex",
                alignItems:"center",
                gap:"12px",
                textAlign:"left",
                padding:"13px 16px",
                borderRadius:"10px",
                border:"none",
                cursor:"pointer",
                background:tab===m.id? "#1e293b" : "transparent",
                borderLeft: tab===m.id? "4px solid #3b82f6" : "4px solid transparent",
                color: tab===m.id? "white" : "#cbd5e1",
                fontSize:"15px",
                fontWeight: tab===m.id? "700" : "500",
                width:"100%"
              }}
            >
              <span style={{fontSize:"18px"}}>{m.icon}</span>
              <span style={{color:"white"}}>{m.name}</span>
            </button>
          ))}
        </div>

        <div style={{marginTop:"60px", background:"#1e293b", padding:"12px", borderRadius:"12px", display:"flex", gap:"10px", alignItems:"center"}}>
          <div style={{width:"38px", height:"38px", background:"#334155", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white"}}>A</div>
          <div>
            <p style={{color:"white", fontSize:"14px", fontWeight:"700", margin:0}}>Aniket</p>
            <p style={{color:"#94a3b8", fontSize:"12px", margin:0}}>Admin</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1, padding:"24px", overflow:"auto"}}>
        <h1 style={{fontSize:"28px", fontWeight:"900", margin:0, textTransform:"capitalize"}}>{tab}</h1>
        <p style={{color:"#64748b", fontSize:"13px", marginTop:"4px"}}>Welcome back, Aniket — here's what's happening today</p>

        <div style={{background:"white", padding:"20px", borderRadius:"12px", border:"1px solid #e2e8f0", marginTop:"20px"}}>
          <h3>Recent Applications</h3>
          <p style={{marginTop:"10px", fontSize:"14px"}}>Total Jobs: {jobs.length} • Ye wala dashboard ab sahi dikh raha hai na?</p>
        </div>
      </div>
    </div>
  );
}