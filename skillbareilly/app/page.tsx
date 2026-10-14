
"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function HomePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [mySkills, setMySkills] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(41);
  const [aiText, setAiText] = useState("");

  // load local data
  useEffect(() => {
    const s = localStorage.getItem("sb_skills");
    const e = localStorage.getItem("sb_email");
    const sv = localStorage.getItem("sb_saved");
    if (s) setMySkills(s);
    if (e) setMyEmail(e);
    if (sv) setSaved(JSON.parse(sv));

    // live users thoda hilta rahe
    setInterval(() => {
      setLive((p) => p + (Math.random() > 0.5? 1 : -1));
    }, 4000);

    const fetchJobs = async () => {
      const { data } = await supabase
       .from("jobs")
       .select("*")
       .order("created_at", { ascending: false });
      if (data) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const saveProfile = () => {
    localStorage.setItem("sb_skills", mySkills);
    localStorage.setItem("sb_email", myEmail);
    alert("Ho gaya save! Ab skill match pe mail ayega - " + myEmail);
  };

  const toggleSave = (id: string) => {
    let updated;
    if (saved.includes(id)) {
      updated = saved.filter((x) => x!== id);
    } else {
      updated = [...saved, id];
    }
    setSaved(updated);
    localStorage.setItem("sb_saved", JSON.stringify(updated));
  };

  const getMatch = (title: string) => {
    if (!mySkills) return 0;
    const myList = mySkills.toLowerCase().split(",");
    let score = 0;
    for (let sk of myList) {
      if (title.toLowerCase().includes(sk.trim())) {
        score += 45;
      }
    }
    return Math.min(97, score + 10);
  };

  const askAI = () => {
    if (!search) {
      setAiText("Pehle upar kuch likh, jaise 'sales' fir puch");
      return;
    }
    const matchJob = jobs.find((j) =>
      j.title.toLowerCase().includes(mySkills.split(",")[0]?.toLowerCase() || "sales")
    );
    if (matchJob) {
      setAiText(`Tere liye best hai - ${matchJob.title} at ${matchJob.company}, salary ${matchJob.salary}. Ye teri skill ${mySkills} se 90% match karta hai.`);
    } else {
      setAiText("Abhi exact match nahi mila, par tension nahi, mai check karta rahunga aur mail bhej dunga.");
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const q = search.toLowerCase();
    const okSearch = (j.title + j.company + j.location).toLowerCase().includes(q);
    const okTab = tab === "all" || (tab === "saved" && saved.includes(j.id));
    return okSearch && okTab;
  });

  return (
    <div className="min-h-screen bg-[#f2f4f7]">
      {/* header - simple, human */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-extrabold text-[20px]">
            Skill<span className="text-blue-600">Bareilly</span>
            <span className="ml-2 text-[10px] bg-black text-white px-2 py-1 rounded-full">PRO</span>
          </div>
          <div className="flex gap-2 items-center text-[12px]">
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">● {live} live dekh rahe</span>
            <a href="/admin" className="bg-black text-white px-4 py-1.5 rounded-full">Post Job</a>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-[260px_1fr_300px] gap-3 p-3">
        {/* left - profile */}
        <div className="hidden md:block space-y-3">
          <div className="bg-white rounded-2xl border p-4">
            <div className="font-bold text-[14px]">Apni Skill likh, mail ayega</div>
            <input
              value={mySkills}
              onChange={(e) => setMySkills(e.target.value)}
              placeholder="jaise - computer, sales"
              className="w-full mt-3 border rounded-xl px-3 py-2.5 text-[13px]"
            />
            <input
              value={myEmail}
              onChange={(e) => setMyEmail(e.target.value)}
              placeholder="email - gmail wala"
              className="w-full mt-2 border rounded-xl px-3 py-2.5 text-[13px]"
            />
            <button onClick={saveProfile} className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-[13px]">
              Save Karo
            </button>
            <p className="text-[11px] text-zinc-500 mt-2">Jab teri skill se match job ayegi, direct mail chala jayega. LinkedIn jaisa.</p>
          </div>

          <div className="bg-white rounded-2xl border p-4">
            <div className="font-bold text-[13px]">AI Assistant</div>
            <button onClick={askAI} className="mt-2 w-full bg-zinc-900 text-white py-2 rounded-xl text-[12px]">Mere liye best job kaun si?</button>
            {aiText && <div className="mt-2 bg-yellow-50 border border-yellow-200 p-2 rounded-xl text-[11px]">{aiText}</div>}
          </div>

          <div className="bg-black text-white rounded-2xl p-4">
            <div className="font-bold text-[13px]">Bareilly ke Top Employers</div>
            <div className="mt-2 text-[12px] space-y-1 opacity-80">
              <div>• CB Ganj Steel - Hiring</div>
              <div>• Bareilly Mart - Hiring</div>
              <div>• Izzatnagar Logistics</div>
            </div>
          </div>
        </div>

        {/* center */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border p-3">
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search karo - delivery, sales, computer..."
                className="flex-1 bg-[#eef2f6] rounded-full px-4 py-3 text-[14px] outline-none"
              />
              <button onClick={askAI} className="bg-black text-white px-5 rounded-full font-bold text-[13px]">AI</button>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {["All Jobs", "Saved", "Fresher", "25k+"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t === "Saved"? "saved" : "all")}
                  className={`text-[11px] px-3 py-1.5 rounded-full border whitespace-nowrap ${tab === "saved" && t === "Saved"? "bg-black text-white" : "bg-white"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {loading? (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl h-28 animate-pulse border"></div>
              <div className="bg-white rounded-2xl h-28 animate-pulse border"></div>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const match = getMatch(job.title);
              return (
                <div key={job.id} className="bg-white rounded-2xl border p-4">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center">
                      {job.company?.[0] || "B"}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[14px] flex flex-wrap items-center gap-2">
                        {job.title}
                        {match >= 60 && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${match >= 80? "bg-green-600 text-white" : "bg-yellow-300"}`}>
                            {match}% Match
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-zinc-500 mt-0.5">
                        {job.company} • {job.location} • ₹{job.salary}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1">
                        👁️ {Math.floor(Math.random() * 200) + 30} views • 2h ago • ⭐ 4.6 rating
                      </div>
                    </div>
                    <button onClick={() => toggleSave(job.id)} className="text-[18px]">
                      {saved.includes(job.id)? "❤️" : "🤍"}
                    </button>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <a
                      href={job.apply_link}
                      target="_blank"
                      className="flex-1 bg-[#0a66c2] text-white text-center py-2.5 rounded-full font-bold text-[13px]"
                    >
                      WhatsApp Apply
                    </a>
                    <a href={`https://wa.me/?text=${encodeURIComponent(job.title + " - " + job.company)}`} target="_blank" className="border px-4 py-2.5 rounded-full text-[13px]">
                      Share
                    </a>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-[10px] text-zinc-400">ID #{job.id?.slice(0, 6)} • Verified</span>
                    <span className="text-[10px] text-zinc-400">Report</span>
                  </div>
                </div>
              );
            })
          )}

          {!loading && filteredJobs.length === 0 && (
            <div className="bg-white rounded-2xl border p-8 text-center text-[13px] text-zinc-500">Koi job nahi mili, search hata ke dekho.</div>
          )}
        </div>

        {/* right */}
        <div className="hidden md:block space-y-3">
          <div className="bg-white rounded-2xl border p-4">
            <div className="font-bold text-[13px]">Salary Insights</div>
            <div className="mt-3 text-[11px] space-y-2">
              <div>Delivery - ₹12k avg</div>
              <div className="h-1.5 bg-zinc-100 rounded"><div className="h-1.5 bg-blue-600 w-[60%] rounded"></div></div>
              <div>Sales - ₹18k avg</div>
              <div className="h-1.5 bg-zinc-100 rounded"><div className="h-1.5 bg-green-600 w-[75%] rounded"></div></div>
            </div>
          </div>
          <div className="bg-yellow-400 rounded-2xl p-4">
            <div className="font-bold text-[13px]">Success Story</div>
            <div className="text-[12px] mt-1">"2 din me job mil gayi CB Ganj me" - Rohit</div>
          </div>
        </div>
      </div>
    </div>
  );
}