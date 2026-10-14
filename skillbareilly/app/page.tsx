"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Page(){
  const [jobs,setJobs]=useState<any[]>([]);
  const [s,setS]=useState("");
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    (async()=>{
      const {data}=await supabase.from("jobs").select("*").order("created_at",{ascending:false});
      if(data) setJobs(data);
      setLoading(false);
    })();
  },[]);

  const list = jobs.filter((j:any)=> j.title?.toLowerCase().includes(s.toLowerCase()) || j.company?.toLowerCase().includes(s.toLowerCase()));

  return(
    <div style={{background:"#f6f8fb", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <div style={{background:"#fff", padding:"12px 18px", borderBottom:"1px solid #ddd", display:"flex", justifyContent:"space-between"}}>
        <b>Skill<span style={{color:"blue"}}>Bareilly</span></b>
        <a href="/admin" style={{background:"black", color:"white", padding:"6px 12px", borderRadius:"7px", textDecoration:"none", fontSize:"13px"}}>Admin</a>
      </div>
      <div style={{background:"#fff", padding:"28px 16px", textAlign:"center"}}>
        <h2 style={{margin:0}}>Bareilly ki Jobs, Ek Jagah</h2>
        <p style={{color:"gray", fontSize:"13px", marginTop:"6px"}}>Direct WhatsApp Apply - No Fake Jobs</p>
        <input value={s} onChange={e=>setS(e.target.value)} placeholder="Search job ya company..." style={{marginTop:"16px", width:"100%", maxWidth:"420px", padding:"11px", borderRadius:"9px", border:"1px solid #ccc"}} />
      </div>
      <div style={{maxWidth:"700px", margin:"16px auto", padding:"0 12px"}}>
        {loading && <p style={{textAlign:"center"}}>Loading jobs...</p>}
        {list.map((j:any)=>(
          <div key={j.id} style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:"10px", padding:"14px", marginBottom:"10px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div><b style={{fontSize:"15px"}}>{j.title}</b><div style={{fontSize:"12px", color:"gray"}}>{j.company} • {j.location} • {j.salary}</div></div>
            <a href={j.apply_link} target="_blank" style={{background:"#25D366", color:"#fff", padding:"8px 12px", borderRadius:"7px", textDecoration:"none", fontSize:"13px", fontWeight:"bold"}}>Apply</a>
          </div>
        ))}
        {list.length==0 && !loading && <div style={{background:"#fff", padding:"20px", textAlign:"center", borderRadius:"10px"}}>Koi job nahi mili</div>}
      </div>
    </div>
  )
}