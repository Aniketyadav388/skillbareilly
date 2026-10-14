"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function HomePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [founder, setFounder] = useState<any>(null);
  const [search, setSearch] = useState("");
  useEffect(()=>{ (async()=>{
    const { data: j } = await supabase.from("jobs").select("*").order("id",{ascending:false});
    const { data: f } = await supabase.from("admin_profile").select("*").eq("id",1).single();
    if(j) setJobs(j); if(f) setFounder(f);
  })(); },[]);
  const filtered = jobs.filter((j:any)=> j.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", padding:"16px" }}>
      <h1 style={{ fontWeight:"900", fontSize:"22px", textAlign:"center" }}>Skill<span style={{ color:"#facc15" }}>Bareilly</span></h1>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs in Bareilly..." style={{ width:"100%", padding:"14px", borderRadius:"12px", border:"1px solid #ddd", marginTop:"16px", background:"white" }} />
      <div style={{ marginTop:"16px", display:"flex", flexDirection:"column", gap:"10px" }}>
        {filtered.map((job:any)=>(<div key={job.id} style={{ background:"white", padding:"14px", borderRadius:"12px", border:"1px solid #eee" }}><h3 style={{ fontWeight:"700" }}>{job.title}</h3><p style={{ fontSize:"13px", color:"#666" }}>{job.company}</p><a href={job.apply_link} target="_blank" style={{ display:"block", background:"black", color:"white", textAlign:"center", padding:"10px", borderRadius:"8px", marginTop:"8px" }}>Apply Now</a></div>))}
      </div>
      {founder && (<div style={{ background:"black", color:"white", padding:"18px", borderRadius:"16px", marginTop:"24px", display:"flex", gap:"12px", alignItems:"center" }}><img src={founder.photo_url} style={{ width:"60px", height:"60px", borderRadius:"50%" }}/><div><h3 style={{ fontWeight:"800" }}>{founder.name}</h3><p style={{ fontSize:"12px", color:"#facc15" }}>{founder.role}</p><p style={{ fontSize:"13px", color:"#ccc", marginTop:"2px" }}>{founder.bio}</p></div></div>)}
    </div>
  );
}