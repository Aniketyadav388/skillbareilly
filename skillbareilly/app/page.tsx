"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");

  async function loadJobs() {
    const { data } = await supabase.from("jobs").select("*").order("id", { ascending: false });
    if (data) setJobs(data);
  }
  useEffect(() => { loadJobs(); }, []);

  async function addJob() {
    if (!title) return alert("Title likh");
    await supabase.from("jobs").insert([{ title, location, salary, phone }]);
    setTitle(""); setLocation(""); setSalary(""); setPhone("");
    loadJobs();
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>SkillBareilly - Jobs</h1>
      <div style={{ border: "1px solid #ccc", padding: 15, marginBottom: 20 }}>
        <input placeholder="Job Title" value={title} onChange={e=>setTitle(e.target.value)} style={{ display:"block", margin:5, padding:8, width:"90%" }} />
        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} style={{ display:"block", margin:5, padding:8, width:"90%" }} />
        <input placeholder="Salary" value={salary} onChange={e=>setSalary(e.target.value)} style={{ display:"block", margin:5, padding:8, width:"90%" }} />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:"block", margin:5, padding:8, width:"90%" }} />
        <button onClick={addJob} style={{ padding: "10px 20px", background:"black", color:"white", margin:5 }}>Add Job</button>
      </div>
      <div>
        {jobs.map((j:any) => (
          <div key={j.id} style={{ border:"1px solid #ddd", padding:10, marginBottom:10 }}>
            <b>{j.title}</b> - {j.location} - {j.salary} <br/> Ph: {j.phone}
          </div>
        ))}
      </div>
    </div>
  );
}