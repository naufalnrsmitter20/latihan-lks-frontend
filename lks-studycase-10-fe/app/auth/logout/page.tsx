"use client";
import { redirect } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Logout() {
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/login");
    }
  }, []);

  const HandleLogout = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/auth/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message);
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    localStorage.removeItem("token");
    redirect("/auth/login");
  };
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="max-w-3xl border-2 rounded-lg border-slate-400 ring-4 ring-slate-200 w-full p-5 h-auto flex justify-center">
        <div>
          <button onClick={HandleLogout} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
            Logout
          </button>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </div>
      </div>
    </section>
  );
}
