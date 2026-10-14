"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [jobs, setJobs] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({ name: "", role: "", bio: "", photo_url: "" });
  const [form, setForm] = useState({ title: "", company: "", location: "Bareilly", job_type: "Full Time", salary: "", description: "", apply_link: "" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => { if(auth) load(); }, [auth]);
  const login = () => { if(pass==="bareilly123"){ setAuth(true); } else alert("Galat Password"); };
  const load = async () => {
    const { data: j } = await supabase.from("jobs").select("*").order("id", { ascending: false });
    const { data: p } = await supabase.from("admin_profile").select("*").eq("id",1).single();
    if(j) setJobs(j); if(p) setProfile(p);
  };
  const uploadPhoto = async (e:any) => {
    const file = e.target.files[0]; if(!file) return;
    const { data } = await supabase.storage.from("profiles").upload(`founder-${Date.now()}.png`, file);
    if(data){ const { data: url } = supabase.storage.from("profiles").getPublicUrl(data.path); setProfile({...profile, photo_url: url.publicUrl}); }
  };
  const saveProfile = async () => { await supabase.from("admin_profile").update(profile).eq("id",1); alert("Profile Save Ho Gaya"); };
  const saveJob = async (e:any) => {
    e.preventDefault();
    if(editId) await supabase.from("jobs").update(form).eq("id", editId);
    else await supabase.from("jobs").insert([form]);
    setForm({ title:"", company:"", location:"Bareilly", job_type:"Full Time", salary:"", description:"", apply_link:"" }); setEditId(null); load();
  };
  const s = { width:"100%", padding:"12px", borderRadius:"10px", border:"1px solid #333", background:"#000", color:"white" };

  if(!auth) return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ background:"#18181b", border:"1px solid #27272a", padding:"32px", borderRadius:"24px", width:"360px" }}>
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <h1 style={{ fontWeight:"900", fontSize:"24px", color:"white" }}>Skill<span style={{ color:"#facc15" }}>Bareilly</span></h1>
          <p style={{ color:"#71717a", fontSize:"11px", marginTop:"6px", letterSpacing:"2px" }}>ADMIN PANEL</p>
        </div>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{ width:"100%", padding:"14px", borderRadius:"10px", border:"1px solid #3f3f46", background:"#09090b", color:"white" }}/>
        <button onClick={login} style={{ width:"100%", background:"#facc15", color:"black", padding:"14px", borderRadius:"10px", fontWeight:"900", marginTop:"14px" }}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f5f5f5", color:"black", display:"flex" }}>
      <div style={{ width:"220px", background:"black", color:"white", padding:"16px", display:"flex", flexDirection:"column", gap:"8px" }}>
        <h1 style={{ fontWeight:"900" }}>SkillBareilly</h1>
        <button onClick={()=>setTab("dashboard")} style={{ padding:"10px", borderRadius:"8px", background:tab==="dashboard"?"#facc15":"#222", color:tab==="dashboard"?"black":"white", textAlign:"left" }}>📊 Dashboard</button>
        <button onClick={()=>setTab("profile")} style={{ padding:"10px", borderRadius:"8px", background:tab==="profile"?"#facc15":"#222", color:tab==="profile"?"black":"white", textAlign:"left" }}>👤 My Profile</button>
        <button onClick={()=>setTab("jobs")} style={{ padding:"10px", borderRadius:"8px", background:tab==="jobs"?"#facc15":"#222", color:tab==="jobs"?"black":"white", textAlign:"left" }}>💼 Jobs</button>
      </div>
      <div style={{ flex:1, padding:"24px" }}>
        {tab==="dashboard" && <h1 style={{ fontSize:"24px", fontWeight:"800" }}>Welcome Aniket, Total Jobs: {jobs.length}</h1>}
        {tab==="profile" && (<div style={{ maxWidth:"500px", background:"white", padding:"20px", borderRadius:"16px", display:"flex", flexDirection:"column", gap:"12px" }}><h2 style={{ fontWeight:"800" }}>My Profile</h2>{profile.photo_url && <img src={profile.photo_url} style={{ width:"80px", height:"80px", borderRadius:"50%" }} />}<input type="file" onChange={uploadPhoto} /><input value={profile.name||""} onChange={e=>setProfile({...profile, name:e.target.value})} placeholder="Name" style={{...s, background:"white", color:"black", border:"1px solid #ddd"}} /><input value={profile.role||""} onChange={e=>setProfile({...profile, role:e.target.value})} placeholder="Role - Ex: Founder" style={{...s, background:"white", color:"black", border:"1px solid #ddd"}} /><textarea value={profile.bio||""} onChange={e=>setProfile({...profile, bio:e.target.value})} placeholder="Your Bio" style={{...s, background:"white", color:"black", border:"1px solid #ddd"}} rows={3}></textarea><button onClick={saveProfile} style={{ background:"black", color:"white", padding:"12px", borderRadius:"10px", fontWeight:"700" }}>Save</button></div>)}
        {tab==="jobs" && (<div><h2 style={{ fontWeight:"800" }}>Add New Job</h2><br/><form onSubmit={saveJob} style={{ background:"white", padding:"16px", borderRadius:"14px", display:"flex", flexDirection:"column", gap:"10px", maxWidth:"600px" }}><input required placeholder="Job Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{...s, background:"white", color:"black", border:"1px solid #ddd"}} /><input required placeholder="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} style={{...s, background:"white", color:"black", border:"1px solid #ddd"}} /><input required placeholder="WhatsApp Link" value={form.apply_link} onChange={e=>setForm({...form, apply_link:e.target.value})} style={{...s, background:"white", color:"black", border:"1px solid #ddd"}} /><button style={{ background:"black", color:"white", padding:"12px", borderRadius:"10px" }}>{editId?"Update Job":"Add Job"}</button></form><br/>{jobs.map((j:any)=>(<div key={j.id} style={{ background:"white", padding:"12px", borderRadius:"10px", marginBottom:"8px", display:"flex", justifyContent:"space-between" }}><span>{j.title}</span><button onClick={async()=>{ await supabase.from("jobs").delete().eq("id",j.id); load(); }} style={{ color:"red" }}>Delete</button></div>))}</div>)}
      </div>
    </div>
  );
}