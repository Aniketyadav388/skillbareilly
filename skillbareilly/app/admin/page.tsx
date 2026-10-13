"use client";
import { useState } from "react";
import { supabase } from "../supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Bareilly");
  const [link, setLink] = useState("");

  const addJob = async () => {
    const { error } = await supabase.from("jobs").insert([
      { title, company, location, apply_link: link }
    ]);
    if (!error) {
      alert("Job Add Ho Gayi! Live site pe check kar");
      setTitle(""); setCompany(""); setLink("");
    } else {
      alert(error.message);
    }
  };

  return (
    <div style={{padding: 30, maxWidth: 500, margin: "auto"}}>
      <h1>SkillBareilly - Admin Panel</h1>
      <input placeholder="Job Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:"100%", margin:10, padding:10}} />
      <input placeholder="Company Name" value={company} onChange={e=>setCompany(e.target.value)} style={{width:"100%", margin:10, padding:10}} />
      <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} style={{width:"100%", margin:10, padding:10}} />
      <input placeholder="Apply Link" value={link} onChange={e=>setLink(e.target.value)} style={{width:"100%", margin:10, padding:10}} />
      <button onClick={addJob} style={{width:"100%", padding:12, background:"black", color:"white"}}>Job Add Karo</button>
    </div>
  );
}