"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    }
  });
  const HandleLogout = async () => {
    const toastId = toast.loading("Loading...");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/api/v1/auth/LogoutSociety?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = await response.json();
      if (!response.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success(payload.message, { id: toastId });
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button onClick={HandleLogout} type="button" className="bg-red-400 border-2 font-medium border-red-400 rounded-lg px-3 py-1.5">
        Logout
      </button>
    </div>
  );
}
