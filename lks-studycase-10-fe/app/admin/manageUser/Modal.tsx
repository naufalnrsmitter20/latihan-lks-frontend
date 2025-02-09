"use client";
import { KotaProps, ProvinsiProps, UserProps } from "@/lib/interfaces";
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ setIsOpenModal, action, dataUser }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string; dataUser?: UserProps }) {
  const [error, setError] = useState("");
  const [kota, setKota] = useState<KotaProps[]>([]);
  const [provinsi, setProvinsi] = useState<ProvinsiProps[]>([]);

  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/kota", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setKota(payload.data);
    };
    FecthUserData();
  }, []);
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/provinsi", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setProvinsi(payload.data);
    };
    FecthUserData();
  }, []);

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/users", {
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

    const response1 = await fetch(`http://localhost:8000/api/v1/users/${dataUser?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    const payload1 = await response1.json();
    if (!response1.ok) {
      setError(payload1.message);
      toast.error(payload1.message);
      return;
    }
    toast.success(payload1.message);
    window.location.reload();
    setIsOpenModal(false);
  };

  return (
    <section className="z-50 fixed flex top-0 left-0 w-screen h-screen bg-black/30 justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5">
        <h1 className="text-2xl font-semibold">{action} </h1>
        <form onSubmit={dataUser ? HandleUpdate : HandleSubmit} className="space-y-2">
          <div className="flex flex-col my-3">
            <label htmlFor="email" className="text-lg font-medium">
              email
            </label>
            <input defaultValue={dataUser?.email} required placeholder="masukkan email" type="text" name="email" id="email" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
          </div>
          {/* {!dataUser && ( */}
          <div className="flex flex-col my-3">
            <label htmlFor="password" className="text-lg font-medium">
              password
            </label>
            <input placeholder="masukkan password" value={dataUser?.password} type="password" name="password" id="password" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
          </div>
          {/* )} */}
          <div className="flex flex-col my-3">
            <label htmlFor="role" className="text-lg font-medium">
              role
            </label>
            <select defaultValue={dataUser?.role} required name="role" id="role" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
              <option value="">select</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          {dataUser && (
            <>
              <div className="flex flex-col my-3">
                <label htmlFor="age" className="text-lg font-medium">
                  age
                </label>
                <input defaultValue={dataUser?.biodata && dataUser?.biodata.age} placeholder="masukkan age" type="age" name="age" id="age" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="kota" className="text-lg font-medium">
                  kota
                </label>
                <select defaultValue={dataUser?.biodata && dataUser?.biodata.kota_id} required name="kota_id" id="kota" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
                  <option value="">select</option>
                  {kota.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.nama_kota}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="provinsi" className="text-lg font-medium">
                  provinsi
                </label>
                <select defaultValue={dataUser?.biodata && dataUser?.biodata.provinsi_id} required name="provinsi_id" id="provinsi" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
                  <option value="">select</option>
                  {provinsi.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.nama_provinsi}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
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
