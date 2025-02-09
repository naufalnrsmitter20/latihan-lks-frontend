"use client";
import { KotaProps, ProvinsiProps } from "@/lib/interfaces";
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ setIsOpenModal, action, dataKota }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string; dataKota?: KotaProps }) {
  const [error, setError] = useState("");

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/kota", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
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
  const HandleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8000/api/v1/kota/${dataKota?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    const payload = await response.json();
    if (!response.ok && !response.ok) {
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
        <form onSubmit={dataKota ? HandleUpdate : HandleSubmit} className="space-y-2">
          <div className="flex flex-col my-3">
            <label htmlFor="nama_kota" className="text-lg font-medium">
              nama kota
            </label>
            <input defaultValue={dataKota?.nama_kota} required placeholder="masukkan nama_kota" type="text" name="nama_kota" id="nama_kota" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
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
