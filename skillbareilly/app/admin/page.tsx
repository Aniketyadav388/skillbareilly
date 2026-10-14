"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    title: "", company: "", location: "Bareilly", job_type: "Full Time",
    salary: "", description: "", apply_link: "",
  });
  const [msg, setMsg] = useState("");

  const checkPass = () => {
    if (password === "bareilly123") setAuth(true);
    else alert("Galat Password!");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMsg("Adding...");
    const { error } = await supabase.from("jobs").insert([form]);
    if (error) setMsg("Error: " + error.message);
    else {
      setMsg("Job Add Ho Gayi!");
      setForm({ title: "", company: "", location: "Bareilly", job_type: "Full Time", salary: "", description: "", apply_link: "" });
    }
  };

  const s = { width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #333", background: "#000", color: "white", fontSize: "15px" };

  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "white", padding: "32px", borderRadius: "20px", width: "380px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "900", textAlign: "center" }}>Admin Login</h1>
          <br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #ddd" }} />
          <br /><br />
          <button onClick={checkPass} style={{ width: "100%", background: "black", color: "white", padding: "14px", borderRadius: "12px", fontWeight: "bold" }}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", padding: "24px" }}>
      <div style={{ maxWidth: "650px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>SkillBareilly - <span style={{ color: "#facc15" }}>Admin</span></h1>
        <br />
        <form onSubmit={handleSubmit} style={{ background: "#18181b", border: "1px solid #333", padding: "28px", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <input required placeholder="Job Title" value={form.title} onChange={e => setForm({...form, title: e.target.value })} style={s} />
          <input required placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value })} style={s} />
          <select value={form.job_type} onChange={e => setForm({...form, job_type: e.target.value })} style={s}>
            <option>Full Time</option><option>Part Time</option><option>Work From Home</option><option>Internship</option>
          </select>
          <input placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary: e.target.value })} style={s} />
          <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value })} style={s} />
          <textarea required placeholder="Job Description" rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value })} style={s}></textarea>
          <input required placeholder="WhatsApp Link" value={form.apply_link} onChange={e => setForm({...form, apply_link: e.target.value })} style={s} />
          <button type="submit" style={{ width: "100%", background: "#facc15", color: "black", padding: "16px", borderRadius: "12px", fontWeight: "900", fontSize: "18px" }}>Job Add Karo</button>
          {msg && <p style={{ textAlign: "center", color: "#facc15" }}>{msg}</p>}
        </form>
      </div>
    </div>
  );
}