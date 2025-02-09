"use client";
import { decodeToken } from "@/lib/decodeToken";
import { JWTDataPayload } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [error, setError] = useState("");

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:8000/api/v1/auth/login", {
      headers: {
        "Content-Type": "application/json",
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
    localStorage.setItem("token", payload.token);
    const payloadToken = decodeToken(payload.token);
    const FixToken = payloadToken as JWTDataPayload;
    if (FixToken?.userData.role === "USER") {
      redirect("/");
    } else if (FixToken?.userData.role === "ADMIN") {
      redirect("/admin");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="max-w-3xl border-2 rounded-lg border-slate-400 ring-4 ring-slate-200 w-full p-5 h-auto">
        <h1 className="text-2xl font-semibold">Login Untuk Melanjutkan</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col my-3">
            <label htmlFor="email" className="text-lg font-medium">
              email
            </label>
            <input required placeholder="masukkan email" type="text" name="email" id="email" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="password" className="text-lg font-medium">
              password
            </label>
            <input required placeholder="masukkan password" type="password" name="password" id="password" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
          </div>
          <button type="submit" className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black">
            Submit
          </button>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </form>
      </div>
    </section>
  );
}
