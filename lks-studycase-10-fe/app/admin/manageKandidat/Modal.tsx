"use client";
import { KandidatProps, KotaProps, ProvinsiProps } from "@/lib/interfaces";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ setIsOpenModal, action, dataKandidat }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string; dataKandidat?: KandidatProps }) {
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(`http://localhost:8000/${dataKandidat?.image}`);

  const [namaKandidat, setNamaKandidat] = useState(dataKandidat?.nama_kandidat ?? "");
  const [noUrut, setnoUrut] = useState(dataKandidat?.no_urut ?? "");
  const [Role, setRole] = useState(dataKandidat?.role ?? "");

  const HandleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePath(URL.createObjectURL(file));
    }
  };

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("nama_kandidat", namaKandidat);
    formData.append("no_urut", noUrut);
    formData.append("role", Role);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    console.log(formData);
    console.log(imageFile);

    const response = await fetch("http://localhost:8000/api/v1/candidates", {
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
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5">
        <h1 className="text-2xl font-semibold">{action} </h1>
        <form encType="multipart/form-data" onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col my-3">
            <label htmlFor="nama_kandidat" className="text-lg font-medium">
              nama kandidat
            </label>
            <input
              value={namaKandidat}
              onChange={(e) => setNamaKandidat(e.target.value)}
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
              value={noUrut}
              onChange={(e) => setnoUrut(e.target.value)}
              required
              placeholder="masukkan no_urut"
              type="text"
              name="no_urut"
              id="no_urut"
              className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300"
            />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="role" className="text-lg font-medium">
              role
            </label>
            <select onChange={(e) => setRole(e.target.value)} value={Role} required name="role" id="role" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
              <option value="">select</option>
              <option value="PRESIDEN">PRESIDEN</option>
              <option value="DPR">DPR</option>
            </select>{" "}
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="image" className="text-lg font-medium">
              image
            </label>
            <input required placeholder="masukkan image" onChange={HandleImageChange} name="image" type="file" id="image" accept="image/*" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
            <Image width={150} height={100} className="object-cover" src={imagePath as string} alt={dataKandidat?.nama_kandidat as string} />
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
