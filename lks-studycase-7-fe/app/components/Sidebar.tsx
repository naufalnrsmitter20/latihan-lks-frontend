"use client";
import { UserPayload } from "@/lib/utilities";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logout from "../auth/logout/Logout";

interface SidebarProps {
  title: string;
  link: string;
}

export default function Sidebar() {
  const [user, setUser] = useState<UserPayload>();
  useEffect(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem("userData");
      if (data) {
        setUser(JSON.parse(data as string));
      }
    }
  }, []);
  const sidebarAdminContent: SidebarProps[] = [
    {
      link: "manageUser",
      title: "Manage User",
    },
    {
      link: "manageBahan",
      title: "Manage Bahan",
    },
    {
      link: "manageRoti",
      title: "Manage Roti",
    },
    {
      link: "catatKomposisiRoti",
      title: "Catat Komposisi Roti",
    },
    {
      link: "viewDataTransaction",
      title: "View Data Transaction",
    },
    {
      link: "viewKomposisiBahanBaku",
      title: "View Komposisi Bahan Baku",
    },
    {
      link: "viewLogSupply",
      title: "View Log Supply",
    },
    {
      link: "viewLogUsage",
      title: "view Log Usage",
    },
    {
      link: "viewTotalPengeluaran",
      title: "view Total Pengeluaran",
    },
    {
      link: "viewTotalPenjualan",
      title: "view Total Penjualan",
    },
  ];
  const sidebarCashierContent: SidebarProps[] = [
    {
      link: "catatTransaksi",
      title: "Catat Transaksi",
    },
  ];
  const sidebarGasdangContent: SidebarProps[] = [
    {
      link: "catatLogSupply",
      title: "Catat Log Supply",
    },
    {
      link: "catatLogUsage",
      title: "Catat Log Usage",
    },
  ];
  return (
    <div className="max-w-xs w-full p-4 border-r-2 border-blue-300">
      {user?.role === "ADMIN" && (
        <div className="w-full space-y-2 flex flex-col">
          {sidebarAdminContent.map((item, i) => (
            <Link key={i} href={`/admin/${item.link}`} className="bg-blue-100 text-lg font-medium block rounded-lg p-2 w-full hover:bg-blue-300 text-slate-700 hover:text-slate-950 focus:ring-2 focus:ring-blue-200">
              {item.title}
            </Link>
          ))}
        </div>
      )}
      {user?.role === "CASHIER" && (
        <div className="w-full space-y-2 flex flex-col">
          {sidebarCashierContent.map((item, i) => (
            <Link key={i} href={`/cashier/${item.link}`} className="bg-blue-100 block text-lg font-medium rounded-lg p-2 w-full hover:bg-blue-300 text-slate-700 hover:text-slate-950 focus:ring-2 focus:ring-blue-200">
              {item.title}
            </Link>
          ))}
        </div>
      )}
      {user?.role === "GASDANG" && (
        <div className="w-full space-y-2 flex flex-col">
          {sidebarGasdangContent.map((item, i) => (
            <Link key={i} href={`/gasdang/${item.link}`} className="bg-blue-100 block text-lg font-medium rounded-lg p-2 w-full hover:bg-blue-300 text-slate-700 hover:text-slate-950 focus:ring-2 focus:ring-blue-200">
              {item.title}
            </Link>
          ))}
        </div>
      )}
      <Logout />
    </div>
  );
}
