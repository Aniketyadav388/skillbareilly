"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";
export default function ProfilePage(){
  const [profile, setProfile] = useState({ full_name: "", phone: "", city: "Bareilly", skill: "", bio: "" });
  const router = useRouter();
  useEffect(()=>{ loadProfile(); }, []);
  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) { router.push("/login"); return; }
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if(data) setProfile(data);
  };
  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("profiles").upsert({ id: user?.id,...profile });
    if(error) alert(error.message); else alert("Profile Save Ho Gayi ✅");
  };
  const logout = async () => { await supabase.auth.signOut(); router.push("/login"); };
  return(
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-[600px] mx-auto">
        <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold">Meri Profile</h1><button onClick={logout} className="text-sm bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">Logout</button></div>
        <div className="bg-zinc-900 rounded-[24px] p-6 border border-zinc-800">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-800 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-black">{profile.full_name?.[0] || "S"}</div>
          <label className="text-xs text-zinc-400">Pura Naam</label><input value={profile.full_name} onChange={e=>setProfile({...profile, full_name:e.target.value})} className="w-full p-3 rounded-xl bg-black border border-zinc-800 mb-3 mt-1" placeholder="Rahul Verma" />
          <label className="text-xs text-zinc-400">Mobile</label><input value={profile.phone} onChange={e=>setProfile({...profile, phone:e.target.value})} className="w-full p-3 rounded-xl bg-black border border-zinc-800 mb-3 mt-1" placeholder="98765 43210" />
          <label className="text-xs text-zinc-400">Skill</label><select value={profile.skill} onChange={e=>setProfile({...profile, skill:e.target.value})} className="w-full p-3 rounded-xl bg-black border border-zinc-800 mb-3 mt-1"><option>Skill Chuno</option><option>Electrician</option><option>Plumber</option><option>Computer Operator</option><option>Tailor</option><option>Teacher</option><option>Delivery Boy</option></select>
          <label className="text-xs text-zinc-400">Bio</label><textarea value={profile.bio} onChange={e=>setProfile({...profile, bio:e.target.value})} className="w-full p-3 rounded-xl bg-black border border-zinc-800 mb-4 mt-1" placeholder="Mujhe 2 saal ka experience hai..."></textarea>
          <button onClick={saveProfile} className="w-full bg-white text-black font-bold p-4 rounded-xl">Profile Save Karo</button>
        </div>
      </div>
    </div>
  )
}