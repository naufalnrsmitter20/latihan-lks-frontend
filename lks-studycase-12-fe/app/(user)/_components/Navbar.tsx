"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [dataToken, setDataToken] = useState<string | null>("");
  useEffect(() => {
    const token = localStorage.getItem("login_tokens");
    setDataToken(token);
  }, []);
  const router = useRouter();
  const HandleLogout = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const token = localStorage.getItem("login_tokens");
      const res = await fetch(`http://localhost:8000/api/v1/auth/logout?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = await res.json();
      if (!res.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success("success", { id: toastId });
      localStorage.removeItem("login_tokens");
      router.push("/Login");
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };
  return (
    <div className="w-screen flex justify-between px-5 py-4 bg-yellow-50 border-b-2 border-b-gray-500">
      <h1 className="font-bold text-3xl text-yellow-500">Website Manajemen Pekerjaan</h1>
      <ul className="flex gap-x-4">
        <li className="bg-gray-600 py-2 px-4 font-semibold rounded-lg text-yellow-500 hover:text-white">
          <Link href="/validation">Request Validation</Link>
        </li>
        <li className="bg-gray-600 py-2 px-4 font-semibold rounded-lg text-yellow-500 hover:text-white">
          <Link href="/jobVacancies">Job Vacancies</Link>
        </li>
        <li className="bg-gray-600 py-2 px-4 font-semibold rounded-lg text-yellow-500 hover:text-white">
          <Link href="/applications">Applications</Link>
        </li>
        {dataToken ? (
          <button onClick={() => HandleLogout()} className="bg-gray-600 py-2 px-4 font-semibold rounded-lg text-yellow-500 hover:text-white">
            <p>Logout</p>
          </button>
        ) : (
          <li className="bg-gray-600 py-2 px-4 font-semibold rounded-lg text-yellow-500 hover:text-white">
            <Link href="/Login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
