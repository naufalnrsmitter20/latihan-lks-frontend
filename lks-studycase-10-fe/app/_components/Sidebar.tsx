"use client";
import { SidebarProps } from "@/lib/interfaces";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const SidebarItem: SidebarProps[] = [
    {
      title: "Manage User",
      url: "/admin/manageUser",
    },
    {
      title: "Manage Provinsi",
      url: "/admin/manageProvinsi",
    },
    {
      title: "Manage Kota",
      url: "/admin/manageKota",
    },
    {
      title: "Manage Partai",
      url: "/admin/managePartai",
    },
    {
      title: "Manage Kandidat",
      url: "/admin/manageKandidat",
    },
    {
      title: "Manage Vote",
      url: "/admin/manageVote",
    },
    {
      title: "Result Vote",
      url: "/admin/result",
    },
  ];
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
    <section className="relative mr-4 max-w-xs min-h-screen h-full max-h-full w-full">
      <div className="bg-yellow-200 p-5 mr-4 max-w-xs fixed min-h-screen h-full max-h-full w-full">
        <h1 className="text-2xl text-center font-semibold">Admin Panel</h1>
        <div className="mt-8 flex flex-col gap-y-4">
          {SidebarItem.map((x, i) => (
            <Link key={i} href={x.url} type="submit" className=" bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black text-lg">
              {x.title}
            </Link>
          ))}
          <button onClick={HandleLogout} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
            Logout
          </button>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </div>
      </div>
    </section>
  );
}
