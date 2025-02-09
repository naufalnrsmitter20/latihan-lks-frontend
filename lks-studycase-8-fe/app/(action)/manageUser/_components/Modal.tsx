"use client";
import { UserDataProps } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Modal({ action, setIsOpenModal, dataUser }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; dataUser?: UserDataProps }) {
  const [username, setUsername] = useState<string>(dataUser?.username as string);
  const [password, setPassword] = useState<string>(dataUser?.password as string);
  const [role, setRole] = useState<string>(dataUser?.role as string);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });
      const payload = await res.json();
      if (!payload.status) {
        setError(payload.message);
        console.log(payload.message);
      }
      console.log(payload.message);
      alert("Success");
      router.refresh();
      setIsOpenModal(false);
      window.location.reload();

      return payload;
    } catch (error) {
      console.log(error);
      throw error as Error;
    }
  };
  const HandleUpdate = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/v1/user/${dataUser?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });
      const payload = await res.json();
      if (payload.status !== true) {
        alert(payload.message);
        console.log(payload.message);
      }
      setIsOpenModal(false);
      alert(payload.message);
      window.location.reload();
      return payload;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <>
      <div className="w-screen h-screen z-10 fixed top-0 left-0 bg-black/20"></div>
      <div className="bg-white fixed rounded-lg top-[25%] left-[25%] border p-4 z-20 border-black ring-2 mx-auto ring-slate-400 max-w-3xl h-auto w-full">
        <form method="POST" onSubmit={dataUser ? HandleUpdate : HandleSubmit}>
          <h1 className="text-black font-semibold text-lg">Modal {action} User</h1>
          <div className="space-y-3 my-2">
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="username">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Masukkan username anda"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="username">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Masukkan password anda"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="username">
                Role
              </label>
              <select value={role as string} onChange={(e) => setRole(e.target.value)} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" name="role" id="role">
                <option disabled value="">
                  Select
                </option>
                <option value={"USER"}>USER</option>
                <option value={"ADMIN"}>ADMIN</option>
              </select>
            </div>
            <p className="my-3 text-red-500">{error && error}</p>
            <div className="flex justify-start items-center gap-x-4">
              <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200 rounded-md border-2 mt-2 text-white font-semibold border-blue-600">
                Submit
              </button>
              <button onClick={() => setIsOpenModal(false)} type="button" className="px-4 py-2 bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-200 rounded-md border-2 mt-2 text-white font-semibold border-red-600">
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
