"use client";
import { useState } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const handleAuth = async () => {
    if(isLogin){
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if(error) alert(error.message); else router.push("/profile");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if(error) alert(error.message); else { alert("Account ban gaya! Login karo"); setIsLogin(true); }
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-zinc-900 border border-yellow-600/20 rounded-[24px] p-8">
        <img src="/logo.png" className="w-16 mx-auto mb-4" alt="logo" />
        <h1 className="text-white text-2xl font-bold text-center">SkillBareilly</h1>
        <p className="text-zinc-400 text-sm text-center mb-6">{isLogin? "Wapas Swagat Hai" : "Naya Account Banao"}</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-4 rounded-xl bg-black border border-zinc-800 text-white mb-3" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-4 rounded-xl bg-black border border-zinc-800 text-white mb-4" />
        <button onClick={handleAuth} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold p-4 rounded-xl">{isLogin? "Login Karo" : "Sign Up Karo"}</button>
        <p onClick={()=>setIsLogin(!isLogin)} className="text-yellow-500 text-sm text-center mt-4 cursor-pointer">{isLogin? "Naya ho? Sign Up karo" : "Account hai? Login karo"}</p>
      </div>
    </div>
  );
}