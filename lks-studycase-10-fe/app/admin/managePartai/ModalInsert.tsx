"use client";
import { KandidatProps, PartaiProps } from "@/lib/interfaces";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import animated from "react-select/animated";

const animateComponent = animated();

export default function ModalInsert({ setIsOpenModal, data }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; data?: PartaiProps }) {
  const [error, setError] = useState("");
  const [dataCandidate, setDataCandidate] = useState<KandidatProps[]>([]);
  const [kandidateIdGroup, setKandidateIdGroup] = useState<{ label: string; value: string }[]>(data?.kandidats?.map((x) => ({ label: x.nama_kandidat, value: x.id })) || []);

  useEffect(() => {
    async function FetchingCandidate() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/candidates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.message);
      }
      setDataCandidate(payload.data);
    }
    FetchingCandidate();
  }, []);

  const candidateOptions = dataCandidate.map((x) => ({ label: x.nama_kandidat, value: x.id }));
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      kandidat_id: kandidateIdGroup.map((x) => x.value),
    };
    console.log(formData);

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/partai/insert/${data?.id}`, {
      headers: {
        "Content-type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(formData),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message);
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    window.location.reload();
    setIsOpenModal(false);
  };

  const HandleChange = (selectedOption: { label: string; value: string }[]) => {
    const temp = [...kandidateIdGroup];
    setKandidateIdGroup(selectedOption || temp || []);
    console.log(selectedOption);
  };

  return (
    <section className="z-50 fixed flex top-0 left-0 w-screen h-screen bg-black/30 justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5 h-[600px] overflow-scroll">
        <h1 className="text-2xl font-semibold">Insert Kandidat Partai</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <Select value={kandidateIdGroup} onChange={HandleChange as any} components={animateComponent} isMulti closeMenuOnSelect={false} options={candidateOptions} />
          <div className="py-6">
            <h1 className="text-xl font-medium">Data Kandidat partai {data?.nama_partai}</h1>
            {data?.kandidats ? (
              data?.kandidats.map((x, i) => (
                <div key={i} className="my-6">
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Nama Kandidat :</span> {x.nama_kandidat}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Nomor Urut :</span> {x.no_urut}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Role :</span> {x.role}
                  </p>
                  <Image width={300} height={200} className="object-cover" src={`http://localhost:8000/${x.image.replace(" ", "%20")}`} alt={`gambar ${x.nama_kandidat}`} />
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Created At :</span> {x.created_at}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Updated At :</span> {x.updated_at}
                  </p>
                </div>
              ))
            ) : (
              <>Bekum ada kandidat</>
            )}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black">
              Submit
            </button>
            <button onClick={() => setIsOpenModal(false)} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
              close
            </button>
          </div>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </form>
      </div>
    </section>
  );
}
