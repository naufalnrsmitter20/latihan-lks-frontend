"use client";
import { PartaiProps } from "@/lib/interfaces";
import { trackAllowedDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ setIsOpenModal, action, dataPartai }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string; dataPartai?: PartaiProps }) {
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(`http://localhost:8000/${dataPartai?.logo}`);
  const [namaPartai, setNamaPartai] = useState<string>(dataPartai?.nama_partai ?? "");
  const [NoUrut, setNoUrut] = useState<string>(dataPartai?.nama_partai ?? "");

  const HandleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePath(URL.createObjectURL(file));
    }
  };

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const token = localStorage.getItem("token");
    if (imageFile) {
      formData.append("logo", imageFile);
      formData.append("nama_partai", namaPartai);
      formData.append("no_urut", NoUrut);
    }
    console.log(...formData.entries());

    const response = await fetch("http://localhost:8000/api/v1/partai", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
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

  return (
    <section className="z-50 fixed flex top-0 left-0 w-screen h-screen bg-black/30 justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5 h-[600px] overflow-y-scroll">
        <h1 className="text-2xl font-semibold">{action} </h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col my-3">
            <label htmlFor="nama_kandidat" className="text-lg font-medium">
              nama partai
            </label>
            <input
              onChange={(e) => setNamaPartai(e.target.value)}
              value={namaPartai}
              required
              placeholder="masukkan nama_kandidat"
              type="text"
              name="nama_kandidat"
              id="nama_kandidat"
              className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300"
            />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="no_urut" className="text-lg font-medium">
              no urut
            </label>
            <input
              onChange={(e) => setNoUrut(e.target.value)}
              value={NoUrut}
              required
              placeholder="masukkan no_urut"
              type="number"
              name="no_urut"
              id="no_urut"
              className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300"
            />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="image" className="text-lg font-medium">
              logo
            </label>
            <input required placeholder="masukkan image" onChange={HandleImageChange} type="file" name="image" id="image" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
            <Image width={150} height={150} className="object-cover" src={imagePath as string} alt={(dataPartai && (dataPartai?.nama_partai as string)) || ""} />
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
