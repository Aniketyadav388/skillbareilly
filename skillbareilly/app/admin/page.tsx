"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({ name: "Aniket", role: "Admin", bio: "Founder SkillBareilly", photo_url: "" });
  const [showPost, setShowPost] = useState(false);
  const [form, setForm] = useState({ title: "", company: "", location: "Bareilly", job_type: "Full Time", salary: "", description: "", apply_link: "", category: "Technology", status: "Active" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => { if (auth) load(); }, [auth]);
  const login = () => { if (pass === "bareilly123") setAuth(true); else alert("Galat Password"); };
  const load = async () => {
    const { data: j } = await supabase.from("jobs").select("*").order("id", { ascending: false });
    const { data: u } = await supabase.from("users").select("*").order("id", { ascending: false });
    const { data: a } = await supabase.from("applications").select("*").order("id", { ascending: false });
    const { data: p } = await supabase.from("admin_profile").select("*").eq("id", 1).single();
    if (j) setJobs(j); if (u) setUsers(u); if (a) setApps(a); if (p) setProfile(p);
  };
  const saveJob = async (e: any) => {
    e.preventDefault();
    if (editId) await supabase.from("jobs").update(form).eq("id", editId);
    else await supabase.from("jobs").insert([form]);
    setForm({ title: "", company: "", location: "Bareilly", job_type: "Full Time", salary: "", description: "", apply_link: "", category: "Technology", status: "Active" });
    setEditId(null); setShowPost(false); load();
  };
  const filteredJobs = jobs.filter(j => j.title?.toLowerCase().includes(search.toLowerCase()) || j.company?.toLowerCase().includes(search.toLowerCase()));

  if (!auth) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-zinc-800 p-8 rounded-[20px] w-[360px]"><h1 className="font-black text-[22px] text-white text-center">Skill<span className="text-yellow-400">Bareilly</span></h1><p className="text-zinc-500 text-[11px] text-center tracking-[2px]">ADMIN PANEL</p><input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" className="w-full p-3.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white mt-6 outline-none"/><button onClick={login} className="w-full bg-yellow-400 text-black p-3.5 rounded-xl font-black mt-3">Login</button></div>
    </div>
  );

  const Menu = (id: string, label: string, icon: string) => (
    <button onClick={() => setTab(id)} className={`w-full text-left px-4 py-3 rounded-xl text-[14px] flex gap-3 items-center ${tab === id? "bg-[#1e293b] text-white font-bold border-l-4 border-blue-500" : "text-zinc-400 hover:bg-zinc-900"}`}><span>{icon}</span>{label}</button>
  );

  return (
    <div className="min-h-screen bg-[#eef2f7] flex text-black">
      {/* SIDEBAR - SAME THEME */}
      <div className="w-[250px] bg-[#0f172a] text-white p-4 flex flex-col fixed h-screen">
        <div className="flex items-center gap-3 px-2 py-2"><div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">💼</div><div><h1 className="font-black text-[17px]">SkillBareilly</h1><p className="text-[10px] tracking-[3px] text-zinc-400">JOB PORTAL</p></div></div>
        <div className="mt-8 flex flex-col gap-1">{Menu("dashboard", "Dashboard", "📊")}{Menu("profile", "My Profile", "👤")}{Menu("jobs", "Jobs", "💼")}{Menu("users", "Users", "👥")}{Menu("apps", "Applications", "📩")}{Menu("companies", "Companies", "🏢")}{Menu("analytics", "Analytics", "📈")}{Menu("settings", "Settings", "⚙️")}</div>
        <div className="mt-auto bg-[#162032] p-3 rounded-xl flex items-center gap-3"><img src={profile.photo_url || "https://i.pravatar.cc/100"} className="w-9 h-9 rounded-full"/><div><p className="text-sm font-bold">{profile.name}</p><p className="text-xs text-zinc-400">Admin</p></div></div>
      </div>

      {/* MAIN */}
      <div className="flex-1 ml-[250px]">
        {/* TOP BAR - SEARCH + POST JOB */}
        <div className="bg-white border-b sticky top-0 z-10 p-4 flex justify-between items-center">
          <div><h1 className="text-[24px] font-black capitalize">{tab}</h1>{tab==="dashboard" && <p className="text-sm text-zinc-500">Welcome back, {profile.name} — here's what's happening today</p>}</div>
          <div className="flex items-center gap-3">
            <div className="bg-[#f1f5f9] border px-4 py-2 rounded-xl flex items-center gap-2"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs, users, companies..." className="bg-transparent outline-none text-sm w-[240px]"/></div>
            <button className="text-xl">🔔</button>
            <select className="border px-3 py-2 rounded-xl text-sm bg-white"><option>Last 30 days</option><option>Last 7 days</option></select>
            <button onClick={()=>setShowPost(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold">+ Post Job</button>
          </div>
        </div>

        <div className="p-6">
          {tab==="dashboard" && (
            <div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border shadow-sm"><div className="flex gap-3"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">💼</div><div><p className="text-sm text-zinc-500">Total Jobs</p><h2 className="text-[32px] font-black leading-none mt-1">{jobs.length || 1248}</h2></div></div><p className="text-xs text-emerald-600 mt-3">↗ +12% from last month</p></div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm"><div className="flex gap-3"><div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">👥</div><div><p className="text-sm text-zinc-500">Total Users</p><h2 className="text-[32px] font-black leading-none mt-1">{users.length || 8532}</h2></div></div><p className="text-xs text-emerald-600 mt-3">↗ +8.2% from last month</p></div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm"><div className="flex gap-3"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">📄</div><div><p className="text-sm text-zinc-500">Applications</p><h2 className="text-[32px] font-black leading-none mt-1">{apps.length || 3917}</h2></div></div><p className="text-xs text-emerald-600 mt-3">↗ +15.4% from last month</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-5 rounded-2xl border shadow-sm"><div className="flex justify-between"><h3 className="font-bold">Applications Trend</h3><select className="border text-xs px-2 py-1 rounded-lg"><option>Last 30 days</option></select></div><div className="mt-4 h-[160px] bg-gradient-to-t from-blue-50 to-white rounded-xl border flex items-end gap-2 p-4"><div className="flex-1 bg-blue-600 rounded-t h-[10%]"></div><div className="flex-1 bg-blue-600 rounded-t h-[25%]"></div><div className="flex-1 bg-blue-600 rounded-t h-[35%]"></div><div className="flex-1 bg-blue-600 rounded-t h-[60%]"></div><div className="flex-1 bg-blue-600 rounded-t h-[85%]"></div><div className="flex-1 bg-blue-600 rounded-t h-[95%]"></div></div><p className="text-xs text-zinc-500 mt-2">Peak on Oct 12: 198 applications</p></div>
                <div className="bg-white p-5 rounded-2xl border shadow-sm"><div className="flex justify-between"><h3 className="font-bold">Jobs by Category</h3><select className="border text-xs px-2 py-1 rounded-lg"><option>This Month</option></select></div><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between items-center">Technology<div className="flex items-center gap-2"><div className="w-[140px] h-4 bg-blue-600 rounded"></div>420</div></div><div className="flex justify-between items-center">Healthcare<div className="flex items-center gap-2"><div className="w-[100px] h-4 bg-teal-600 rounded"></div>298</div></div><div className="flex justify-between items-center">Finance<div className="flex items-center gap-2"><div className="w-[80px] h-4 bg-blue-600 rounded"></div>215</div></div><div className="flex justify-between items-center">Education<div className="flex items-center gap-2"><div className="w-[70px] h-4 bg-teal-600 rounded"></div>176</div></div><div className="flex justify-between items-center">Marketing<div className="flex items-center gap-2"><div className="w-[60px] h-4 bg-blue-600 rounded"></div>134</div></div></div></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm mt-4"><h3 className="font-bold text-lg">Recent Applications</h3><table className="w-full mt-4 text-sm"><thead><tr className="text-left text-zinc-500 border-b"><th className="pb-2">Candidate</th><th>Position</th><th>Company</th><th>Status</th><th>Applied</th></tr></thead><tbody>{filteredJobs.slice(0,4).map((j:any,i:number)=>(<tr key={j.id} className="border-b"><td className="py-3"><div className="flex gap-2 items-center"><img src={`https://i.pravatar.cc/40?img=${i+1}`} className="w-8 h-8 rounded-full"/><div><p className="font-bold">{["Rahul Sharma","Priya Singh","Aman Verma","Sarah Khan"][i] || j.company}</p><p className="text-xs text-zinc-500">{j.title}</p></div></div></td><td>{j.title}</td><td>{j.company}</td><td><span className={`px-3 py-1 rounded-full text-xs ${i==0?"bg-green-100 text-green-700":i==1?"bg-yellow-100 text-yellow-700":"bg-blue-100 text-blue-700"}`}>{["Shortlisted","Pending","Interview","Active"][i]}</span></td><td>Oct 1{i}, 2024</td></tr>))}</tbody></table></div>
            </div>
          )}
          {tab==="jobs" && (<div className="bg-white p-6 rounded-2xl border"><div className="flex justify-between"><h2 className="font-black text-lg">All Jobs ({filteredJobs.length})</h2><button onClick={()=>setShowPost(true)} className="bg-black text-white px-4 py-2 rounded-xl text-sm">+ New Job</button></div><div className="mt-4 space-y-2">{filteredJobs.map((j:any)=>(<div key={j.id} className="flex justify-between p-3 border rounded-xl"><div><p className="font-bold">{j.title}</p><p className="text-xs text-zinc-500">{j.company} • {j.location}</p></div><div className="flex gap-2"><button onClick={()=>{setForm(j); setEditId(j.id); setShowPost(true);}} className="bg-zinc-100 px-3 py-1 rounded-lg text-xs">Edit</button><button onClick={async()=>{await supabase.from("jobs").delete().eq("id",j.id); load();}} className="text-red-500 text-xs">Delete</button></div></div>))}</div></div>)}
          {tab==="users" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold">Users - {users.length}</h2><div className="grid grid-cols-3 gap-3 mt-4">{users.map((u:any)=>(<div key={u.id} className="border p-4 rounded-xl"><p className="font-bold">{u.name}</p><p className="text-xs">{u.phone}</p><p className="text-xs text-zinc-500">{u.email}</p></div>))}</div></div>)}
          {tab==="apps" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold">Applications - {apps.length}</h2><p className="text-sm text-zinc-500 mt-2">All applications with status tracking</p></div>)}
          {tab==="profile" && (<div className="bg-white p-6 rounded-2xl border max-w-[500px]"><h2 className="font-bold">My Profile</h2><div className="mt-4 flex flex-col gap-3"><input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} className="border p-3 rounded-xl"/><input value={profile.role} onChange={e=>setProfile({...profile,role:e.target.value})} className="border p-3 rounded-xl"/><button onClick={async()=>{await supabase.from("admin_profile").update(profile).eq("id",1); alert("Saved");}} className="bg-black text-white p-3 rounded-xl">Save</button></div></div>)}
          {tab==="companies" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold">Companies Management</h2><p className="text-sm text-zinc-500">Verified companies list</p></div>)}
          {tab==="analytics" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold">Advanced Analytics</h2><p className="text-sm">Growth charts, user activity</p></div>)}
          {tab==="settings" && (<div className="bg-white p-6 rounded-2xl border"><h2 className="font-bold">Settings</h2><p className="text-sm">Site settings, API keys</p></div>)}
        </div>
      </div>

      {showPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={saveJob} className="bg-white p-6 rounded-2xl w-[500px] flex flex-col gap-3"><h2 className="font-black text-lg">{editId?"Edit Job":"Post New Job"}</h2><input required placeholder="Job Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="border p-3 rounded-xl"/><input required placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="border p-3 rounded-xl"/><input required placeholder="WhatsApp Apply Link" value={form.apply_link} onChange={e=>setForm({...form,apply_link:e.target.value})} className="border p-3 rounded-xl"/><div className="flex gap-2"><input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="border p-3 rounded-xl flex-1"/><input placeholder="Salary" value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} className="border p-3 rounded-xl flex-1"/></div><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="border p-3 rounded-xl"><option>Technology</option><option>Healthcare</option><option>Finance</option><option>Education</option><option>Marketing</option></select><textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="border p-3 rounded-xl"/><div className="flex gap-2"><button type="button" onClick={()=>{setShowPost(false); setEditId(null);}} className="flex-1 bg-zinc-100 p-3 rounded-xl">Cancel</button><button className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-bold">{editId?"Update":"Post Job"}</button></div></form>
        </div>
      )}
    </div>
  );
}