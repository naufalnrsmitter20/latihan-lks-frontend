"use client";
import { VoteProps } from "@/lib/interfaces";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [voteData, setVoteData] = useState<VoteProps[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/login");
    }
  }, []);
  const router = useRouter();
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/vote/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setVoteData(payload.data);
    };
    FecthUserData();
  }, []);
  return (
    <div className="w-full h-full p-5">
      <div className="w-full">
        <h1 className="text-black text-4xl font-bold text-center">Pemilihan Umum</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {voteData.map((x, i) => (
            <div className="border-yellow-300 border-2 shadow-md shadow-yellow-100 rounded-md p-4" key={i}>
              <h1 className="text-black text-lg font-semibold">{x.tipe_pemilihan === "PILPRES" ? "Pemilihan presiden" : x.tipe_pemilihan === "PILWANTAI" ? "Pemilihan dewan perwakilan rakyat" : "Pemilihan dewan perwakilan daerah"}</h1>
              <p className="font-semibold">
                Start Date : <span className="font-medium">{x.start_date}</span>
              </p>
              <p className="font-semibold">
                End Date : <span className="font-medium">{x.end_date}</span>
              </p>
              <div className="my-3">
                <p className="text-base font-semibold">
                  Minimal Umur : <span className="font-medium">{x.min_age}th</span>
                </p>
                <p className="text-base font-semibold">
                  Kota/Kabupaten : <span className="font-medium">{x.kota ? x.kota.nama_kota : "All"}</span>
                </p>
                <p className="text-base font-semibold">
                  Provinsi : <span className="font-medium">{x.provinsi ? x.provinsi.nama_provinsi : "All"}</span>
                </p>
                <p className="text-base font-semibold">
                  Status : <span className="font-medium">{x.status}</span>
                </p>
              </div>
              {x.status === "ACTIVE" ? (
                <button
                  type="button"
                  onClick={() => router.push(`/vote/${x.id}`)}
                  className="mt-4 bg-yellow-400 disabled:bg-slate-300 disabled:border-slate-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black"
                >
                  Vote Sekarang!
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => alert("vote tidak tersedia")}
                  className="mt-4 bg-slate-400 disabled:bg-slate-300 disabled:border-slate-400 hover:bg-slate-500 rounded-lg border-2 border-slate-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black"
                >
                  tidak tersedia
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
