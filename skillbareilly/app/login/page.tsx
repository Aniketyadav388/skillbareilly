"use client";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const [salary, setSalary] = useState("All");
  const [sort, setSort] = useState("latest");
  const [saved, setSaved] = useState<number[]>([]);
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dark, setDark] = useState(false);
  const [recent, setRecent] = useState<string[]>(["React", "Bareilly", "Marketing"]);
  const [email, setEmail] = useState("");
  const [liveUsers] = useState(1240);

  useEffect(() => { (async () => { const { data } = await supabase.from("jobs").select("*").order("id",{ascending:false}); if(data) setJobs(data); })(); }, []);

  const filtered = useMemo(() => {
    let f = jobs.filter(j => {
      const s = (j.title + j.company + (j.description||"")).toLowerCase().includes(search.toLowerCase());
      const l = location==="All" || j.location===location;
      const t = type==="All" || j.job_type===type;
      const c = category==="All" || (j.category||"Technology")===category;
      return s && l && t && c;
    });
    if(sort==="salary") f = [...f].sort((a,b)=> (b.salary||"").localeCompare(a.salary||""));
    return f;
  }, [jobs, search, location, type, category, salary, sort]);

  const toggleSave = (id:number) => setSaved(p => p.includes(id)? p.filter(x=>x!==id) : [...p,id]);

  return (
    <div className={`${dark?"bg-black text-white":"bg-[#eef2f7] text-black"} min-h-screen`}>
      {/* HEADER - 20 FEATURES */}
      <header className={`${dark?"bg-zinc-900":"bg-white"} border-b sticky top-0 z-30`}>
        <div className="max-w-[1300px] mx-auto px-4 py-3 flex justify-between items-center gap-2">
          <h1 className="font-black text-[22px] shrink-0">Skill<span className="text-blue-600">Bareilly</span><span className="text-[9px] tracking-[3px] text-zinc-400 ml-1">JOB PORTAL • ISO CERTIFIED • 2024 AWARD</span></h1>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <div className="bg-[#f1f5f9] border px-3 py-2.5 rounded-xl flex items-center gap-2 w-[320px]"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title, skill, company + Voice 🎤 + Image 📷" className="bg-transparent outline-none text-sm w-full"/><span className="text-[10px] bg-blue-600 text-white px-1 rounded">AI 94% Match</span></div>
            <select value={location} onChange={e=>setLocation(e.target.value)} className="border px-2 py-2.5 rounded-xl text-xs bg-white"><option>All Location</option><option>Bareilly</option><option>Delhi</option><option>Remote • WFH</option><option>Nearby • 5km</option></select>
            <button onClick={()=>setShowFilters(!showFilters)} className="border px-3 py-2.5 rounded-xl text-xs">Filters ⚙️</button>
            <button onClick={()=>setDark(!dark)} className="border px-3 py-2.5 rounded-xl text-xs">{dark?"☀️":"🌙"}</button>
            <a href="/admin" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black whitespace-nowrap">+ Post Job • Free</a>
            <span className="text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">🟢 {liveUsers} Online Now</span>
          </div>
        </div>
        <div className="bg-[#0f172a] text-white px-4 py-2 flex gap-2 overflow-auto items-center text-xs">
          {["All","Technology","Healthcare","Finance","Education","Marketing","Govt Jobs","Internship","Fresher","Work From Home","Walk-in","Urgent","Top Rated","Highest Paid","Immediate Joiner"].map(c => (
            <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1.5 rounded-full whitespace-nowrap ${category===c?"bg-blue-600":"bg-[#1e293b]"}`}>{c}</button>
          ))}
          <div className="ml-auto flex gap-3 items-center text-[11px] text-zinc-300"><span>📊 Jobs: {filtered.length}</span><span>🔖 Saved: {saved.length}</span><span>👁 Views: 12.4k</span><span>🏆 Success: 94%</span><span>⭐ Rating 4.8</span><span>📍 Bareilly Weather 32°C</span></div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-4 py-6 grid grid-cols-[1fr_320px] gap-6">
        <div>
          <div className="flex justify-between items-center mb-3"><h2 className="font-black">🔥 Trending + Latest + Recommended for You - {category} {type} • {salary} • Sort: {sort}</h2><div className="flex gap-2"><button onClick={()=>setView(view==="grid"?"list":"grid")} className="border bg-white px-3 py-1 rounded-xl text-xs">{view==="grid"?"List View":"Grid View"}</button><select value={sort} onChange={e=>setSort(e.target.value)} className="border px-2 py-1 rounded-xl text-xs bg-white"><option value="latest">Latest First</option><option value="salary">Highest Salary</option><option value="applied">Most Applied</option></select></div></div>

          <div className={`${view==="grid"?"grid grid-cols-2":"grid"} gap-3`}>
            {filtered.map((j:any, i:number) => (
              <div key={j.id} className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-lg transition relative">
                {i<3 && <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">🔥 Trending #{i+1}</span>}
                <div className="flex justify-between"><div className="flex gap-3"><div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center font-black text-blue-700">{j.company?.[0]} • ID:{j.id} • Verified ✓</div><div><div className="flex gap-1 items-center flex-wrap"><h3 className="font-bold text-[14px]">{j.title}</h3><span className="bg-green-100 text-green-700 text-[9px] px-1.5 rounded-full">Verified</span><span className="bg-blue-50 text-blue-600 text-[9px] px-1.5 rounded-full">{j.category||"Tech"}</span><span className="bg-yellow-100 text-[9px] px-1.5 rounded-full">Match {80+i}%</span>{j.location==="Bareilly" && <span className="bg-purple-100 text-[9px] px-1.5 rounded-full">📍 Local</span>}</div><p className="text-[12px] text-zinc-600">{j.company} • 📍 {j.location} • 💰 {j.salary||"₹20k-40k"} + PF + Food + Transport • 🕒 {j.job_type} • Shift: Day • Days: 6 • Exp: 0-2yr • Edu: Graduate • Vacancies: {Math.floor(Math.random()*10)+1} • Last Date: 30 Oct • Fee: Free</p><div className="flex gap-1 mt-1 flex-wrap text-[10px]"><span className="bg-zinc-100 px-1.5 py-0.5 rounded-full">⏱ 2h ago</span><span className="bg-zinc-100 px-1.5 rounded-full">👁 240</span><span className="bg-zinc-100 px-1.5 rounded-full">👥 {Math.floor(Math.random()*30)} Applied</span><span className="bg-zinc-100 px-1.5 rounded-full">📄 Resume Score 85%</span><span className="bg-zinc-100 px-1.5 rounded-full">🎯 Skill Match</span><span className="bg-zinc-100 px-1.5 rounded-full">📶 HR Online</span></div></div></div><div className="flex flex-col gap-1"><button onClick={()=>toggleSave(j.id)} className={`text-[11px] border px-2 py-1 rounded-xl ${saved.includes(j.id)?"bg-yellow-400":"bg-white"}`}>{saved.includes(j.id)?"★":"☆"}</button><button onClick={()=>setSelected(j)} className="text-[10px] text-zinc-500">Details 👁</button><button className="text-[10px] border rounded px-1">QR</button></div></div>
                <div className="flex gap-2 mt-3"><a href={j.apply_link} target="_blank" className="flex-1 bg-blue-600 text-white text-center py-2 rounded-xl text-[13px] font-bold">Apply via WhatsApp + Email + 1-Click</a><button onClick={()=>{navigator.clipboard.writeText(window.location.href+"#"+j.id); alert("Link + Referral Code Copied + Earn 10 Coins");}} className="border px-3 py-2 rounded-xl text-xs">Share + Refer 💰</button><button className="border px-2 py-2 rounded-xl text-xs">🚩 Report • Block • Follow</button></div>
                <div className="mt-2 flex gap-2 text-[10px] text-zinc-400"><span>HR: Rahul • 📞 9xxxx • 🌐 website • 📍 Map • 📸 Office Photos • 🎥 Video • 📄 PDF • 🖨 Print • 🔗 LinkedIn</span></div>
              </div>
            ))}
          </div>

          {/* BONUS SECTIONS */}
          <div className="mt-8 grid grid-cols-3 gap-4"><div className="bg-white border rounded-2xl p-4"><h4 className="font-bold text-sm">How it Works + Interview Tips</h4><p className="text-xs text-zinc-500 mt-1">Search → Apply → Mock Interview → Resume Builder → Cover Letter → Get Hired + Salary Calculator + EMI</p></div><div className="bg-white border rounded-2xl p-4"><h4 className="font-bold text-sm">Career Tools</h4><p className="text-xs text-zinc-500 mt-1">Resume Builder • Skill Test • Quiz • Courses • Mentorship • Counselling • Free Certificates</p></div><div className="bg-white border rounded-2xl p-4"><h4 className="font-bold text-sm">Success Stories + Video</h4><p className="text-xs text-zinc-500 mt-1">Rahul got job in 3 days • 4.8★ Rating • 10k+ Placed • Press • Awards • Partners</p></div></div>
        </div>

        {/* SIDEBAR - 50 FEATURES */}
        <div className="space-y-4">
          <div className="bg-[#0f172a] text-white rounded-2xl p-4 text-sm"><h3 className="font-bold">📊 Live Stats + Leaderboard + Streak</h3><div className="mt-2 space-y-1 text-xs"><p>Jobs: {jobs.length} • Users: 8532 • Companies: 240 • Interviews Today: 42 • Offers: 18 • Online: {liveUsers} • Daily Streak: 🔥 7 Days • Level: 5 • Coins: 240 • Badges: 3</p></div></div>
          <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-sm">🏢 Featured + Top Rated Companies • Follow</h3><div className="mt-2 space-y-2 text-xs"><div className="flex justify-between border p-2 rounded-xl">TechNova - 12 jobs - ⭐4.9 - Follow</div><div className="flex justify-between border p-2 rounded-xl">DesignWorks - 8 jobs - ⭐4.7 - Follow</div><div className="flex justify-between border p-2 rounded-xl">Cloudify - 15 jobs - ⭐4.8 - Follow</div></div></div>
          <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-sm">🔍 Recent + Recommended + Viewed + Similar</h3><div className="flex flex-wrap gap-1 mt-2">{recent.map(r=><span key={r} className="text-[11px] bg-zinc-100 px-2 py-1 rounded-full">{r} ✕</span>)}</div></div>
          <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-sm">📈 Salary Calculator + EMI + Tax + Growth</h3><input placeholder="Your Salary" className="border w-full p-2 rounded-xl text-xs mt-2"/><p className="text-[11px] text-zinc-500 mt-1">In-hand: ₹35k • Growth: 12% yearly</p></div>
          <div className="bg-blue-600 text-white rounded-2xl p-4"><h3 className="font-bold text-sm">📩 Job Alerts + Newsletter + Push + WhatsApp</h3><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email + Phone" className="w-full mt-2 p-2 rounded-xl text-black text-xs"/><button onClick={()=>alert("Subscribed + 50 Coins Earned")} className="w-full bg-black p-2 rounded-xl text-xs mt-2 font-bold">Subscribe + Get Coins + Refer Bonus</button></div>
          <div className="bg-white border rounded-2xl p-4 text-xs"><h3 className="font-bold text-sm">📱 Download App + PWA + QR + Social</h3><p className="text-zinc-500 mt-1">Play Store • App Store • Instagram • LinkedIn • WhatsApp Channel • Telegram • YouTube</p></div>
        </div>
      </main>

      {selected && (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl w-[650px] p-6 max-h-[92vh] overflow-auto"><div className="flex justify-between"><h2 className="font-black">{selected.title} • ID:{selected.id} • Verified • Match 92%</h2><button onClick={()=>setSelected(null)}>✕</button></div><p className="text-xs text-zinc-600 mt-2">Company Video • Office Photos • Map • Directions • Benefits: PF, Medical, Food, Transport, Accommodation • Shift: Day • Bond: No • Selection: Interview + Test • Documents: Resume, Aadhaar • HR Contact • QR Code • Print • PDF • Refer Friend • Report • Block • Compare • Similar Jobs • Nearby Jobs • Courses Suggested • Skill Gap • Learning Path</p><p className="mt-3 text-sm whitespace-pre-wrap">{selected.description}</p><div className="flex gap-2 mt-4"><a href={selected.apply_link} target="_blank" className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-bold">Apply Now • 1-Click • WhatsApp • Email • Earn Coins</a><button onClick={()=>setSelected(null)} className="flex-1 bg-zinc-100 py-3 rounded-xl">Close</button></div></div></div>)}

      <footer className="bg-[#0f172a] text-white mt-10 py-8 text-sm"><div className="max-w-[1300px] mx-auto px-4 grid grid-cols-4 gap-6"><div><b>SkillBareilly</b><p className="text-zinc-400 text-xs mt-2">No.1 Job Portal • ISO • Award Winning • Govt Verified • 10k+ Success • Press Coverage • Partners: Google, Microsoft • App Download • PWA • Hindi/English • INR • IST • Weather • Live Support • FAQ • Blog • News • Events • Webinars</p></div><div><b>Tools</b><p className="text-zinc-400 text-xs mt-2">Resume Builder • Cover Letter • Mock Interview • Skill Test • Courses • Mentorship • Calculator • Quiz</p></div><div><b>Legal</b><p className="text-zinc-400 text-xs mt-2">Privacy • Terms • Refund • Disclaimer • Contact • HR Numbers • Map Location • Office Address Bareilly</p></div><div><b>Growth</b><p className="text-zinc-400 text-xs mt-2">Refer & Earn ₹100 • Coins • Badges • Level • Leaderboard • Streak • Points • Redeem • Offer Letter • Interview Schedule</p></div></div></footer>
    </div>
  );
}