"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function LogoutAdmin() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/Login");
    }
  });
  const HandleLogout = async () => {
    const toastId = toast.loading("Loading...");
    localStorage.removeItem("admin_token");
    toast.success("logout success", { id: toastId });
    router.push("/AdminLogin");
  };
  return (
    <button onClick={HandleLogout} type="button" className="bg-red-400 w-full border-2 font-medium border-red-400 rounded-lg px-3 py-1.5">
      Logout
    </button>
  );
}
