"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [jobs, setJobs] = useState<any[]>([]);
  const [form, setForm] = useState({ title:"", company:"", location:"Bareilly", salary:"", description:"", apply_link:"", category:"Technology" });

  useEffect(()=>{ if(auth) load(); }, [auth]);
  const load = async () => {
    const { data } = await supabase.from("jobs").select("*").order("id",{ascending:false});
    if(data) setJobs(data);
  };
  const login = () => { if(pass==="bareilly123") setAuth(true); else alert("Wrong Password"); };
  const postJob = async (e:any) => {
    e.preventDefault();
    await supabase.from("jobs").insert([form]);
    setForm({ title:"", company:"", location:"Bareilly", salary:"", description:"", apply_link:"", category:"Technology" });
    alert("Job Posted!"); load();
  };

  if(!auth){
    return <div style={{minHeight:"100vh", background:"#0a0a0a", display:"flex", justifyContent:"center", alignItems:"center"}}><div style={{background:"#18181b", padding:"30px", borderRadius:"16px", width:"350px"}}><h1 style={{color:"white", textAlign:"center", fontWeight:"900"}}>Skill<span style={{color:"yellow"}}>Bareilly</span></h1><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%", padding:"12px", marginTop:"20px", borderRadius:"8px", background:"#09090b", color:"white"}}/><button onClick={login} style={{width:"100%", background:"yellow", padding:"12px", borderRadius:"8px", fontWeight:"900", marginTop:"10px"}}>Login</button></div></div>
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
    <div style={{display:"flex", minHeight:"100vh", background:"#f1f5f9"}}>
      {/* SIDEBAR - FIXED TEXT */}
      <div style={{width:"260px", background:"#0f172a", padding:"20px", display:"flex", flexDirection:"column"}}>
        <div><h1 style={{color:"white", fontWeight:"900", fontSize:"22px", margin:0}}>SkillBareilly</h1><p style={{color:"#94a3b8", fontSize:"11px", letterSpacing:"3px", margin:0}}>JOB PORTAL</p></div>
        <div style={{display:"flex", flexDirection:"column", gap:"6px", marginTop:"30px"}}>
          {menu.map(m=>(
            <button key={m.id} onClick={()=>setTab(m.id)} style={{display:"flex", gap:"12px", padding:"12px 14px", borderRadius:"10px", border:"none", cursor:"pointer", background:tab===m.id?"#1e293b":"transparent", borderLeft:tab===m.id?"4px solid #3b82f6":"4px solid transparent", color:"white", fontSize:"15px", fontWeight:"600", width:"100%", textAlign:"left"}}><span>{m.icon}</span> {m.name}</button>
          ))}
        </div>
        <div style={{marginTop:"auto", background:"#1e293b", padding:"12px", borderRadius:"12px", display:"flex", gap:"10px", alignItems:"center"}}>
          <div style={{width:"36px", height:"36px", background:"#334155", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white"}}>A</div>
          <div><p style={{color:"white", fontSize:"13px", margin:0, fontWeight:"700"}}>Aniket</p><p style={{color:"#94a3b8", fontSize:"11px", margin:0}}>Admin</p></div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1, padding:"0", overflow:"auto"}}>
        <div style={{background:"white", borderBottom:"1px solid #e2e8f0", padding:"16px 24px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div><h1 style={{fontSize:"26px", fontWeight:"900", margin:0, textTransform:"capitalize"}}>{tab}</h1><p style={{fontSize:"13px", color:"#64748b", margin:0}}>Welcome back, Aniket — here's what's happening today</p></div>
          <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
            <div style={{background:"#f1f5f9", border:"1px solid #e2e8f0", padding:"8px 14px", borderRadius:"10px", display:"flex", gap:"8px"}}>🔍<input placeholder="Search jobs, users..." style={{border:"none", background:"transparent", outline:"none", fontSize:"13px", width:"180px"}}/></div>
            <select style={{border:"1px solid #e2e8f0", padding:"8px", borderRadius:"10px", fontSize:"13px"}}><option>Last 30 days</option></select>
            <button style={{background:"#2563eb", color:"white", padding:"10px 18px", borderRadius:"10px", fontWeight:"700", border:"none"}}>+ Post Job</button>
          </div>
        </div>

        <div style={{padding:"24px"}}>
          {/* CARDS */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px"}}>
            <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0"}}><p style={{fontSize:"13px", color:"#64748b"}}>Total Jobs</p><h2 style={{fontSize:"32px", fontWeight:"900", margin:0}}>{jobs.length}</h2><p style={{fontSize:"12px", color:"#16a34a", margin:0}}>↗ +12% from last month</p></div>
            <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0"}}><p style={{fontSize:"13px", color:"#64748b"}}>Total Users</p><h2 style={{fontSize:"32px", fontWeight:"900", margin:0}}>8532</h2><p style={{fontSize:"12px", color:"#16a34a", margin:0}}>↗ +8.2%</p></div>
            <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0"}}><p style={{fontSize:"13px", color:"#64748b"}}>Applications</p><h2 style={{fontSize:"32px", fontWeight:"900", margin:0}}>3917</h2><p style={{fontSize:"12px", color:"#16a34a", margin:0}}>↗ +15.4%</p></div>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginTop:"16px"}}>
            <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0"}}><h3 style={{margin:0}}>Applications Trend</h3><div style={{height:"100px", background:"#eff6ff", borderRadius:"10px", marginTop:"12px", display:"flex", alignItems:"end", gap:"8px", padding:"10px"}}><div style={{flex:1, background:"#2563eb", height:"30%", borderRadius:"4px"}}></div><div style={{flex:1, background:"#2563eb", height:"60%", borderRadius:"4px"}}></div><div style={{flex:1, background:"#2563eb", height:"90%", borderRadius:"4px"}}></div></div></div>
            <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0"}}><h3 style={{margin:0}}>Jobs by Category</h3><div style={{marginTop:"12px", fontSize:"13px"}}><div style={{display:"flex", justifyContent:"space-between"}}>Technology <b>420</b></div><div style={{display:"flex", justifyContent:"space-between", marginTop:"6px"}}>Healthcare <b>298</b></div><div style={{display:"flex", justifyContent:"space-between", marginTop:"6px"}}>Finance <b>212</b></div></div></div>
          </div>

          {/* RECENT APPLICATIONS */}
          <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0", marginTop:"16px"}}>
            <h3 style={{margin:0}}>Recent Applications</h3>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", gap:"10px", marginTop:"16px", fontSize:"12px", fontWeight:"700", color:"#64748b", borderBottom:"1px solid #eee", paddingBottom:"8px"}}>
              <span>Candidate</span><span>Position</span><span>Company</span><span>Status</span><span>Applied</span>
            </div>
            <div style={{fontSize:"13px"}}>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", padding:"12px 0", borderBottom:"1px solid #f1f5f9"}}><span>Rahul Sharma</span><span>Front Desk Executive</span><span>TechNova</span><span style={{background:"#dcfce7", padding:"2px 8px", borderRadius:"12px", fontSize:"11px"}}>Shortlisted</span><span>Oct 10, 2024</span></div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", padding:"12px 0"}}><span>Priya Singh</span><span>HR</span><span>DesignWorks</span><span style={{background:"#fef3c7", padding:"2px 8px", borderRadius:"12px", fontSize:"11px"}}>Pending</span><span>Oct 11, 2024</span></div>
            </div>
          </div>

          {/* POST NEW JOB */}
          <div style={{background:"white", padding:"20px", borderRadius:"16px", border:"1px solid #e2e8f0", marginTop:"16px"}}>
            <h3 style={{margin:0, marginBottom:"12px"}}>Post New Job</h3>
            <form onSubmit={postJob} style={{display:"flex", flexWrap:"wrap", gap:"8px"}}>
              <input required placeholder="Job Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px", width:"160px"}}/>
              <input required placeholder="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px", width:"140px"}}/>
              <input required placeholder="WhatsApp Apply Link" value={form.apply_link} onChange={e=>setForm({...form, apply_link:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px", width:"210px"}}/>
              <input placeholder="Bareilly" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px", width:"100px"}}/>
              <input placeholder="Salary" value={form.salary} onChange={e=>setForm({...form, salary:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px", width:"100px"}}/>
              <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px", width:"260px", height:"60px"}}></textarea>
              <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{border:"1px solid #cbd5e1", padding:"10px", borderRadius:"8px"}}><option>Technology</option><option>Healthcare</option><option>Finance</option></select>
              <div style={{width:"100%", display:"flex", gap:"10px", marginTop:"10px"}}><button type="button" style={{padding:"10px 16px", borderRadius:"8px", border:"1px solid #cbd5e1"}}>Cancel</button><button style={{background:"#2563eb", color:"white", padding:"10px 20px", borderRadius:"8px", border:"none", fontWeight:"700"}}>Post Job</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}