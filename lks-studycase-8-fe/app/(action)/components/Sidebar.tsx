"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface sidebarProps {
  title: string;
  url: string;
}

export default function Sidebar() {
  const router = useRouter();
  const SidebarItem: sidebarProps[] = [
    {
      title: "Manage User",
      url: "/manageUser",
    },
    {
      title: "Manage Place",
      url: "/managePlace",
    },
    {
      title: "Manage Schedule",
      url: "/manageSchedule",
    },
  ];

  return (
    <div className="max-w-xs w-full h-screen bg-blue-200 border-r-2 border-blue-300 py-2 px-4">
      <h1 className="text-lg font-bold text-slate-900 my-4 text-center">Admin Panel</h1>
      <div className="my-5">
        {SidebarItem.map((x, i) => (
          <button onClick={() => router.push(x.url)} key={i} className="text-white my-2.5 bg-blue-400 hover:bg-blue-500 focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 rounded-md duration-200  w-full px-3 py-2">
            {x.title}
          </button>
        ))}
      </div>
    </div>
  );
}
