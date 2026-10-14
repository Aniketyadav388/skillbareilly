"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UltimateAdmin() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [jobs, setJobs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({ name: "", role: "", bio: "", photo_url: "" });
  const [form, setForm] = useState({ title: "", company: "", location: "Bareilly", job_type: "Full Time", salary: "", description: "", apply_link: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { if(auth) load(); }, [auth]);
  const login = () => { if(pass==="bareilly123"){ setAuth(true); } else alert("Wrong Pass"); };
  const load = async () => {
    const { data: j } = await supabase.from("jobs").select("*").order("id", { ascending: false });
    const { data: u } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    const { data: a } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    const { data: p } = await supabase.from("admin_profile").select("*").eq("id",1).single();
    if(j) setJobs(j); if(u) setUsers(u); if(a) setApps(a); if(p) setProfile(p);
  };
  const uploadPhoto = async (e:any) => {
    const file = e.target.files[0]; if(!file) return;
    const { data } = await supabase.storage.from("profiles").upload(`admin-${Date.now()}.png`, file);
    if(data){ const { data: url } = supabase.storage.from("profiles").getPublicUrl(data.path); setProfile({...profile, photo_url: url.publicUrl}); }
  };
  const saveProfile = async () => { await supabase.from("admin_profile").update(profile).eq("id",1); setMsg("Profile Saved!"); setTimeout(()=>setMsg(""),2000); };
  const saveJob = async (e:any) => {
    e.preventDefault();
    if(editId) await supabase.from("jobs").update(form).eq("id", editId);
    else await supabase.from("jobs").insert([form]);
    setForm({ title:"", company:"", location:"Bareilly", job_type:"Full Time", salary:"", description:"", apply_link:"" }); setEditId(null); load();
  };

  const s = { width:"100%", padding:"12px", borderRadius:"10px", border:"1px solid #333", background:"#000", color:"white" };
  const T = (id:string, label:string) => (<button onClick={()=>setTab(id)} style={{ padding:"10px 14px", borderRadius:"10px", background:tab===id?"#facc15":"#222", color:tab===id?"black":"white", fontWeight:"bold", fontSize:"13px" }}>{label}</button>);

  if(!auth) return (<div style={{ minHeight:"100vh", background:"#000", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ background:"white", padding:"32px", borderRadius:"20px", width:"360px" }}><h1 style={{ fontWeight:"900", textAlign:"center" }}>LEVEL 5 ADMIN LOGIN</h1><br/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{ width:"100%", padding:"14px", borderRadius:"12px", border:"1px solid #ddd" }}/><br/><br/><button onClick={login} style={{ width:"100%", background:"black", color:"white", padding:"14px", borderRadius:"12px", fontWeight:"bold" }}>Unlock Ultimate</button></div></div>);

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex" }}>
      <div style={{ width:"230px", background:"#111", borderRight:"1px solid #222", padding:"16px", display:"flex", flexDirection:"column", gap:"8px" }}>
        <h1 style={{ fontWeight:"900", fontSize:"18px" }}>Skill<span style={{ color:"#facc15" }}>Bareilly</span> <span style={{ fontSize:"10px", background:"#facc15", color:"black", padding:"2px 6px", borderRadius:"4px" }}>L5</span></h1>
        <div style={{ marginTop:"20px", display:"flex", flexDirection:"column", gap:"8px" }}>
          {T("dashboard","📊 Dashboard")}{T("profile","👤 My Profile")}{T("jobs","💼 Jobs Manager")}{T("users","👥 Users")}{T("apps","📩 Applications")}{T("companies","🏢 Companies")}{T("analytics","📈 Analytics")}{T("settings","⚙️ Settings")}
        </div>
        <button onClick={()=>setAuth(false)} style={{ marginTop:"auto", background:"#222", padding:"10px", borderRadius:"8px" }}>Logout</button>
      </div>

      <div style={{ flex:1, padding:"24px", overflowY:"auto" }}>
        {tab==="dashboard" && (<div><h1 style={{ fontSize:"26px", fontWeight:"900" }}>Ultimate Dashboard</h1><br/><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"12px" }}>
          <div style={{ background:"#18181b", padding:"18px", borderRadius:"14px", border:"1px solid #222" }}><p style={{ color:"#888", fontSize:"12px" }}>Total Jobs</p><h2 style={{ fontSize:"28px", fontWeight:"900", color:"#facc15" }}>{jobs.length}</h2></div>
          <div style={{ background:"#18181b", padding:"18px", borderRadius:"14px", border:"1px solid #222" }}><p style={{ color:"#888", fontSize:"12px" }}>Total Users</p><h2 style={{ fontSize:"28px", fontWeight:"900" }}>{users.length}</h2></div>
          <div style={{ background:"#18181b", padding:"18px", borderRadius:"14px", border:"1px solid #222" }}><p style={{ color:"#888", fontSize:"12px" }}>Applications</p><h2 style={{ fontSize:"28px", fontWeight:"900" }}>{apps.length}</h2></div>
          <div style={{ background:"#18181b", padding:"18px", borderRadius:"14px", border:"1px solid #222" }}><p style={{ color:"#888", fontSize:"12px" }}>Earning Mode</p><h2 style={{ fontSize:"16px", fontWeight:"900", color:"#22c55e" }}>● ACTIVE</h2></div>
        </div></div>)}

        {tab==="profile" && (<div style={{ maxWidth:"500px" }}><h1 style={{ fontSize:"24px", fontWeight:"900" }}>My Founder Profile</h1><p style={{ color:"#888", fontSize:"12px" }}>Ye homepage pe sabko dikhega</p><br/><div style={{ background:"#18181b", padding:"20px", borderRadius:"16px", border:"1px solid #333", display:"flex", flexDirection:"column", gap:"12px" }}>
          {profile.photo_url && <img src={profile.photo_url} style={{ width:"90px", height:"90px", borderRadius:"50%", objectFit:"cover" }} />}
          <input type="file" onChange={uploadPhoto} /><input value={profile.name||""} onChange={e=>setProfile({...profile, name:e.target.value})} placeholder="Tera Naam" style={s} /><input value={profile.role||""} onChange={e=>setProfile({...profile, role:e.target.value})} placeholder="Role" style={s} /><textarea value={profile.bio||""} onChange={e=>setProfile({...profile, bio:e.target.value})} placeholder="Bio" style={s} rows={3}></textarea><button onClick={saveProfile} style={{ background:"#facc15", color:"black", padding:"12px", borderRadius:"10px", fontWeight:"900" }}>Save Profile</button>{msg && <p style={{ color:"#facc15", textAlign:"center" }}>{msg}</p>}
        </div></div>)}

        {tab==="jobs" && (<div><h1 style={{ fontSize:"22px", fontWeight:"900" }}>Jobs - Add / Edit / Delete</h1><br/><form onSubmit={saveJob} style={{ background:"#18181b", padding:"16px", borderRadius:"14px", border:"1px solid #333", display:"flex", flexDirection:"column", gap:"10px", maxWidth:"600px" }}><input required placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={s} /><input required placeholder="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} style={s} /><input required placeholder="WhatsApp Link" value={form.apply_link} onChange={e=>setForm({...form, apply_link:e.target.value})} style={s} /><button style={{ background:"#facc15", color:"black", padding:"12px", borderRadius:"10px", fontWeight:"900" }}>{editId?"Update Job":"Add Job"}</button></form><br/>{jobs.map((j:any)=>(<div key={j.id} style={{ background:"#18181b", border:"1px solid #222", padding:"12px", borderRadius:"10px", marginBottom:"8px", display:"flex", justifyContent:"space-between" }}><span>{j.title}</span><span><button onClick={()=>{ setForm(j); setEditId(j.id); }} style={{ background:"white", color:"black", padding:"4px 10px", borderRadius:"6px", marginRight:"6px" }}>Edit</button><button onClick={async()=>{ await supabase.from("jobs").delete().eq("id",j.id); load(); }} style={{ background:"#ef4444", color:"white", padding:"4px 10px", borderRadius:"6px" }}>Del</button></span></div>))}</div>)}

        {tab==="users" && (<div><h1 style={{ fontSize:"22px", fontWeight:"900" }}>Registered Users ({users.length})</h1><br/>{users.length===0?<p style={{ color:"#888" }}>Abhi koi user register nahi hua, jab hoga yaha dikhega.</p>:users.map((u:any)=>(<div key={u.id} style={{ background:"#18181b", padding:"12px", borderRadius:"10px", marginBottom:"8px" }}><p>{u.name} - {u.phone}</p></div>))}</div>)}
        {tab==="apps" && (<div><h1 style={{ fontSize:"22px", fontWeight:"900" }}>Applications</h1><br/>{apps.length===0?<p style={{ color:"#888" }}>Koi apply nahi hua abhi.</p>:apps.map((a:any)=>(<div key={a.id} style={{ background:"#18181b", padding:"12px", borderRadius:"10px", marginBottom:"8px" }}><p>{a.user_name} - {a.user_phone} applied for Job #{a.job_id}</p></div>))}</div>)}
        {tab==="companies" && (<div><h1 style={{ fontSize:"22px", fontWeight:"900" }}>Company Verification - Level 3</h1><br/><div style={{ background:"#18181b", padding:"20px", borderRadius:"14px" }}><p>Yaha se tu company ko Verified Tick dega. Earning feature: 199rs leke job post.</p></div></div>)}
        {tab==="analytics" && (<div><h1 style={{ fontSize:"22px", fontWeight:"900" }}>Analytics - Level 5</h1><br/><div style={{ background:"#18181b", padding:"20px", borderRadius:"14px" }}><p>Most Viewed Job: {jobs[0]?.title || "No data"}</p><p>AI Suggestion: Bareilly me Delivery jobs sabse zyada search ho rahi hai.</p></div></div>)}
        {tab==="settings" && (<div><h1 style={{ fontSize:"22px", fontWeight:"900" }}>Settings - Payment & AI</h1><br/><div style={{ background:"#18181b", padding:"20px", borderRadius:"14px" }}><p>Razorpay Key yaha add hogi.</p><p>WhatsApp Bot API yaha connect hogi.</p><p>Password: bareilly123</p></div></div>)}
      </div>
    </div>
  );
}