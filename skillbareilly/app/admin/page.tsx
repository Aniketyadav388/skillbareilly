"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "Bareilly",
    job_type: "Full Time",
    salary: "",
    description: "",
    apply_link: "",
  });
  const [msg, setMsg] = useState("");

  const checkPass = () => {
    if (password === "bareilly123") {
      setAuth(true);
    } else {
      alert("Galat Password!");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMsg("Adding...");
    const { error } = await supabase.from("jobs").insert([form]);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("✅ Job Add Ho Gayi!");
      setForm({ title: "", company: "", location: "Bareilly", job_type: "Full Time", salary: "", description: "", apply_link: "" });
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
          <input type="password" placeholder="Password dalo" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-3 rounded-xl mb-4" />
          <button onClick={checkPass} className="w-full bg-black text-white p-3 rounded-xl font-bold">Login Karo</button>
          <p className="text-xs text-gray-400 mt-2 text-center">Pass: bareilly123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black mb-2">SkillBareilly - <span className="text-yellow-400">Admin Panel</span></h1>
        <p className="text-gray-400 mb-8">Yahan se nayi job add karo</p>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-2xl">
          <input required placeholder="Job Title - ex: Telecaller" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl" />
          <input required placeholder="Company Name" value={form.company} onChange={e=>setForm({...form, company: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl" />

          <div className="grid grid-cols-2 gap-4">
            <select value={form.job_type} onChange={e=>setForm({...form, job_type: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl">
              <option>Full Time</option><option>Part Time</option><option>Work From Home</option><option>Internship</option>
            </select>
            <input placeholder="Salary - ex: 15k-20k" value={form.salary} onChange={e=>setForm({...form, salary: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl" />
          </div>

          <input value={form.location} onChange={e=>setForm({...form, location: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl" />
          <textarea required placeholder="Job Description" rows={5} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl"></textarea>
          <input required placeholder="Apply Link / WhatsApp Link" value={form.apply_link} onChange={e=>setForm({...form, apply_link: e.target.value})} className="w-full bg-black border border-zinc-700 p-3.5 rounded-xl" />

          <button type="submit" className="w-full bg-yellow-400 text-black p-4 rounded-xl font-black text-lg hover:bg-yellow-300">Job Add Karo 🚀</button>
          {msg && <p className="text-center text-yellow-400 font-bold">{msg}</p>}
        </form>
      </div>
    </div>
  );
}