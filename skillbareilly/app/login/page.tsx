"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const { data } = await supabase.from("jobs").select("*").order("id", { ascending: false });
    if (data) setJobs(data);
    setLoading(false);
  };

  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{background:"#f8fafc", minHeight:"100vh"}}>
      {/* Header */}
      <div style={{background:"white", borderBottom:"1px solid #e5e7eb", padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1 style={{fontWeight:"900", fontSize:"20px", margin:0}}>Skill<span style={{color:"#2563eb"}}>Bareilly</span></h1>
        <a href="/admin" style={{fontSize:"13px", background:"#0f172a", color:"white", padding:"8px 14px", borderRadius:"8px", textDecoration:"none"}}>Admin Login</a>
      </div>

      {/* Hero */}
      <div style={{padding:"30px 20px", textAlign:"center", background:"white"}}>
        <h1 style={{fontSize:"28px", fontWeight:"900", margin:0}}>Bareilly ki Jobs, Ek Jagah</h1>
        <p style={{color:"#64748b", fontSize:"14px", marginTop:"6px"}}>Verified jobs - Direct WhatsApp Apply</p>
        
        <div style={{maxWidth:"500px", margin:"20px auto 0", display:"flex", gap:"8px"}}>
          <input 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search job, company..."
            style={{flex:1, padding:"12px 16px", borderRadius:"10px", border:"1px solid #cbd5e1", outline:"none"}}
          />
          <button style={{background:"#2563eb", color:"white", padding:"12px 20px", borderRadius:"10px", border:"none", fontWeight:"700"}}>Search</button>
        </div>
      </div>

      {/* Jobs List */}
      <div style={{maxWidth:"800px", margin:"20px auto", padding:"0 16px"}}>
        {loading ? <p style={{textAlign:"center"}}>Loading jobs...</p> : null}
        
        {filtered.length === 0 && !loading ? (
          <div style={{background:"white", padding:"30px", borderRadius:"12px", textAlign:"center", border:"1px solid #e2e8f0"}}>
            <p>No jobs found. Admin se job post karo.</p>
          </div>
        ) : null}

        <div style={{display:"flex", flexDirection:"column", gap:"12px"}}>
          {filtered.map((job:any) => (
            <div key={job.id} style={{background:"white", padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div>
                <h3 style={{margin:0, fontSize:"16px", fontWeight:"700"}}>{job.title}</h3>
                <p style={{margin:"4px 0 0", fontSize:"13px", color:"#64748b"}}>{job.company} • {job.location} • {job.salary || "Not Disclosed"}</p>
                <p style={{margin:"6px 0 0", fontSize:"12px", color:"#475569", maxWidth:"400px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{job.description}</p>
                <span style={{fontSize:"11px", background:"#eff6ff", color:"#2563eb", padding:"3px 8px", borderRadius:"20px", marginTop:"6px", display:"inline-block"}}>{job.category}</span>
              </div>
              <div>
                <a 
                  href={job.apply_link} 
                  target="_blank"
                  style={{background:"#25D366", color:"white", padding:"10px 18px", borderRadius:"8px", textDecoration:"none", fontSize:"13px", fontWeight:"700", display:"inline-block"}}
                >
                  WhatsApp Apply
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center", padding:"20px", fontSize:"12px", color:"#94a3b8"}}>
        SkillBareilly - Made for Bareilly • {jobs.length} jobs posted
      </div>
    </div>
  );
}