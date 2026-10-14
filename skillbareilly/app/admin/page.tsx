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
    return (
      <div style={{minHeight:"100vh", background:"#0a0a0a", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div style={{background:"#18181b", padding:"30px", borderRadius:"16px", width:"350px", border:"1px solid #333"}}>
          <h1 style={{color:"white", textAlign:"center", fontWeight:"900"}}>Skill<span style={{color:"yellow"}}>Bareilly</span></h1>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%", padding:"12px", marginTop:"20px", borderRadius:"8px", background:"#09090b", color:"white", border:"1px solid #444"}}/>
          <button onClick={login} style={{width:"100%", background:"yellow", color:"black", padding:"12px", borderRadius:"8px", fontWeight:"900", marginTop:"10px"}}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{display:"flex", minHeight:"100vh"}}>
      {/* SIDEBAR */}
      <div style={{width:"240px", background:"#0f172a", color:"white", padding:"16px", display:"flex", flexDirection:"column"}}>
        <h1 style={{fontWeight:"900", fontSize:"20px"}}>SkillBareilly<br/><span style={{fontSize:"10px", letterSpacing:"2px", color:"#94a3b8"}}>JOB PORTAL</span></h1>
        <div style={{marginTop:"30px", display:"flex", flexDirection:"column", gap:"8px"}}>
          <button onClick={()=>setTab("dashboard")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="dashboard"?"#1e293b":"transparent", borderLeft:tab==="dashboard"?"4px solid #2563eb":"none"}}>📊 Dashboard</button>
          <button onClick={()=>setTab("profile")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="profile"?"#1e293b":"transparent"}}>👤 My Profile</button>
          <button onClick={()=>setTab("jobs")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="jobs"?"#1e293b":"transparent"}}>💼 Jobs</button>
          <button onClick={()=>setTab("users")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="users"?"#1e293b":"transparent"}}>👥 Users</button>
          <button onClick={()=>setTab("apps")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="apps"?"#1e293b":"transparent"}}>📩 Applications</button>
          <button onClick={()=>setTab("companies")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="companies"?"#1e293b":"transparent"}}>🏢 Companies</button>
          <button onClick={()=>setTab("analytics")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="analytics"?"#1e293b":"transparent"}}>📈 Analytics</button>
          <button onClick={()=>setTab("settings")} style={{textAlign:"left", padding:"10px", borderRadius:"8px", background:tab==="settings"?"#1e293b":"transparent"}}>⚙️ Settings</button>
        </div>
        <div style={{marginTop:"auto", background:"#1e293b", padding:"10px", borderRadius:"10px", display:"flex", gap:"10px"}}>
          <div style={{width:"35px", height:"35px", background:"gray", borderRadius:"50%"}}></div>
          <div><p style={{fontSize:"13px", fontWeight:"700"}}>Aniket</p><p style={{fontSize:"11px", color:"#94a3b8"}}>Admin</p></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{flex:1, background:"#f8fafc", padding:"20px"}}>
        {tab==="dashboard" && (
          <>
            <h1 style={{fontSize:"24px", fontWeight:"900"}}>dashboard</h1>
            <p style={{fontSize:"13px", color:"#64748b"}}>Welcome back, Aniket — here's what's happening today</p>

            <div style={{display:"flex", gap:"10px", marginTop:"16px"}}>
              <div style={{background:"white", border:"1px solid #e2e8f0", padding:"10px 14px", borderRadius:"10px", display:"flex", gap:"8px"}}>🔍<input placeholder="Search jobs..." style={{border:"none", outline:"none", fontSize:"13px"}}/></div>
              <select style={{border:"1px solid #e2e8f0", padding:"8px", borderRadius:"10px", fontSize:"13px"}}><option>Last 30 days</option></select>
              <button style={{background:"#2563eb", color:"white", padding:"8px 16px", borderRadius:"10px", fontSize:"13px", fontWeight:"700"}}>+ Post Job</button>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px", marginTop:"20px"}}>
              <div style={{background:"white", padding:"20px", borderRadius:"12px", border:"1px solid #e2e8f0"}}><p style={{fontSize:"12px", color:"gray"}}>Total Jobs</p><h2 style={{fontSize:"28px", fontWeight:"900"}}>{jobs.length}</h2></div>
              <div style={{background:"white", padding:"20px", borderRadius:"12px", border:"1px solid #e2e8f0"}}><p style={{fontSize:"12px", color:"gray"}}>Total Users</p><h2 style={{fontSize:"28px", fontWeight:"900"}}>8532</h2></div>
              <div style={{background:"white", padding:"20px", borderRadius:"12px", border:"1px solid #e2e8f0"}}><p style={{fontSize:"12px", color:"gray"}}>Applications</p><h2 style={{fontSize:"28px", fontWeight:"900"}}>3917</h2></div>
            </div>

            <div style={{background:"white", padding:"20px", borderRadius:"12px", border:"1px solid #e2e8f0", marginTop:"16px"}}>
              <h3 style={{fontWeight:"700"}}>Recent Applications</h3>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", gap:"10px", marginTop:"12px", fontSize:"12px", fontWeight:"700", color:"gray", borderBottom:"1px solid #eee", paddingBottom:"8px"}}>
                <span>Candidate</span><span>Position</span><span>Company</span><span>Status</span><span>Applied</span>
              </div>
              <div style={{fontSize:"13px", marginTop:"8px"}}>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", padding:"10px 0", borderBottom:"1px solid #f1f5f9"}}><span>Rahul Sharma</span><span>Front Desk Executive</span><span>TechNova</span><span style={{background:"#dcfce7", padding:"2px 8px", borderRadius:"12px", fontSize:"11px"}}>Shortlisted</span><span>Oct 10, 2024</span></div>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", padding:"10px 0"}}><span>Priya Singh</span><span>HR</span><span>DesignWorks</span><span style={{background:"#fef3c7", padding:"2px 8px", borderRadius:"12px", fontSize:"11px"}}>Pending</span><span>Oct 11, 2024</span></div>
              </div>
            </div>

            <div style={{background:"white", padding:"20px", borderRadius:"12px", border:"1px solid #e2e8f0", marginTop:"16px"}}>
              <h3 style={{fontWeight:"700", marginBottom:"12px"}}>Post New Job</h3>
              <form onSubmit={postJob} style={{display:"flex", flexWrap:"wrap", gap:"8px"}}>
                <input required placeholder="Job Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{border:"1px solid #ccc", padding:"8px", width:"150px"}}/>
                <input required placeholder="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} style={{border:"1px solid #ccc", padding:"8px", width:"150px"}}/>
                <input required placeholder="WhatsApp Apply Link" value={form.apply_link} onChange={e=>setForm({...form, apply_link:e.target.value})} style={{border:"1px solid #ccc", padding:"8px", width:"200px"}}/>
                <input placeholder="Bareilly" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} style={{border:"1px solid #ccc", padding:"8px", width:"100px"}}/>
                <input placeholder="Salary" value={form.salary} onChange={e=>setForm({...form, salary:e.target.value})} style={{border:"1px solid #ccc", padding:"8px", width:"100px"}}/>
                <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{border:"1px solid #ccc", padding:"8px", width:"200px", height:"60px"}}></textarea>
                <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{border:"1px solid #ccc", padding:"8px"}}><option>Technology</option><option>Healthcare</option><option>Finance</option><option>Education</option><option>Marketing</option></select>
                <div style={{width:"100%", display:"flex", gap:"8px", marginTop:"8px"}}>
                  <button type="button" style={{border:"1px solid #ccc", padding:"6px 12px", borderRadius:"6px"}}>Cancel</button>
                  <button style={{background:"#2563eb", color:"white", padding:"6px 16px", borderRadius:"6px", fontWeight:"700"}}>Post Job</button>
                </div>
              </form>
            </div>
          </>
        )}
        {tab!=="dashboard" && <h1 style={{fontSize:"24px", fontWeight:"900"}}>{tab} - Coming Soon (Jobs count: {jobs.length})</h1>}
      </div>
    </div>
  );
}