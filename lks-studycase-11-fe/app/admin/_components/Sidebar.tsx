"use client";
import { useRouter } from "next/navigation";
import React from "react";
import LogoutAdmin from "./Logout";
interface SidebarProps {
  title: string;
  url: string;
}

export default function Sidebar() {
  const router = useRouter();
  const SidebarItem: SidebarProps[] = [
    {
      title: "Manage User",
      url: "/admin/manageUser",
    },
    {
      title: "Manage Vaccine",
      url: "/admin/manageVaccine",
    },
    {
      title: "Manage Regional",
      url: "/admin/manageRegional",
    },
    {
      title: "Manage Spot",
      url: "/admin/manageSpot",
    },
    {
      title: "Manage Medical",
      url: "/admin/manageMedical",
    },
    {
      title: "Verify Vaccination",
      url: "/admin/verifyVaccination",
    },
    {
      title: "Verify Consultations",
      url: "/admin/verifyConsultations",
    },
  ];
  return (
    <div className="max-w-xs w-full relative bg-yellow-100 px-3 min-h-screen max-h-full">
      <h1 className="text-xl font-semibold my-3">Admin Page</h1>
      {SidebarItem.map((x, i) => (
        <div key={i} className="my-3">
          <button onClick={() => router.push(x.url)} type="submit" className="bg-yellow-300 w-full border-2 font-semibold border-yellow-300 hover:bg-yellow-400 duration-300 rounded-lg px-3 py-1.5">
            {x.title}
          </button>
        </div>
      ))}
      <div className="my-3">
        <LogoutAdmin />
      </div>
    </div>
  );
}
