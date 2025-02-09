"use client";
import { decodeToken } from "@/lib/decodeToken";
import { JWTDataPayload, VoteProps } from "@/lib/interfaces";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailVote() {
  const [dataVoteDetail, setDataVoteDetail] = useState<VoteProps>();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const HandleVoting = async (candidate_id: string) => {
    const token = localStorage.getItem("token");
    const parseToken = decodeToken(token as string);
    const userData = parseToken as JWTDataPayload;

    console.log(userData);
    const response = await fetch(`http://localhost:8000/api/v1/voting/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({ user_id: userData.userData.id, vote_id: id, kandidat_id: candidate_id }),
    });
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    window.location.reload();
  };

  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/v1/voting/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setDataVoteDetail(payload.data);
    };
    FecthUserData();
  }, []);
  return (
    <div className="w-full h-full p-5">
      <div className="w-full">
        <h1 className="text-black text-4xl font-bold text-center">
          {dataVoteDetail?.tipe_pemilihan === "PILPRES" ? "Pemilihan presiden" : dataVoteDetail?.tipe_pemilihan === "PILWANTAI" ? "Pemilihan dewan perwakilan rakyat" : "Pemilihan dewan perwakilan daerah"}
        </h1>
        {dataVoteDetail?.tipe_pemilihan != "PILWANTAI" && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {dataVoteDetail?.kandidats.map((x, i) => (
              <div className="border-yellow-300 border-2 shadow-md shadow-yellow-100 rounded-md p-4" key={i}>
                <Image src={`http://localhost:8000/${x.image.replace(" ", "%20")}`} width={300} height={200} className="w-full h-[300px] object-cover rounded-md" alt={x.nama_kandidat} />
                <h1 className="text-black text-lg font-semibold">{x.nama_kandidat}</h1>
                <p className="font-semibold">
                  Nomor Urut : <span className="font-medium">{x.no_urut}</span>
                </p>
                <p className="font-semibold">
                  Total Vote : <span className="font-medium">{x.uservote.length}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const confirmation = confirm("Yakin?");
                    if (confirmation) {
                      HandleVoting(x.id);
                    }
                  }}
                  className="mt-4 bg-yellow-400 disabled:bg-slate-300 disabled:border-slate-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        )}
        {dataVoteDetail?.tipe_pemilihan === "PILWANTAI" && (
          <div className="grid grid-cols-5 justify-center w-full gap-4 mt-4">
            {dataVoteDetail.partais.map((x, i) => (
              <div className="border-yellow-300 border-2 shadow-md shadow-yellow-100 rounded-md p-4" key={i}>
                <Image src={`http://localhost:8000/${x.logo.replace(" ", "%20")}`} width={150} height={100} className="w-full h-[300px] object-cover rounded-md" alt={x.nama_partai} />
                <h1 className="text-black text-lg font-semibold">{x.nama_partai}</h1>
                <p className="font-semibold">
                  Nomor Urut : <span className="font-medium">{x.no_urut}</span>
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/kandidat/${x.id}`)}
                  className="mt-4 bg-yellow-400 disabled:bg-slate-300 disabled:border-slate-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black"
                >
                  Vote Sekarang!
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
