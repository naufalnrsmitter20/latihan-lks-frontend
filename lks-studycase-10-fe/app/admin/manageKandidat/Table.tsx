"use client";
import { KandidatProps, KotaProps } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Table() {
  const [userData, setUserData] = useState<KandidatProps[]>([]);
  const column: TableColumn<KandidatProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "nama kandidat",
      selector: (row) => row.nama_kandidat,
    },
    {
      name: "no urut",
      selector: (row) => row.no_urut,
    },
    {
      name: "role",
      selector: (row) => row.role,
    },
    {
      name: "nama partai",
      selector: (row) => (row.partai ? row.partai.nama_partai : ""),
    },
    {
      name: "image",
      cell: (row) => <Image width={300} height={200} className="object-cover" src={`http://localhost:8000/${row.image.replace(" ", "%20")}`} alt={row.nama_kandidat}></Image>,
    },
    {
      name: "created at",
      selector: (row) => row.created_at,
    },
    {
      name: "updated at",
      selector: (row) => row.updated_at,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => {
              const confirmation = confirm("Yakin?");
              if (confirmation) {
                delKandidat(row.id);
              }
              return false;
            }}
            type="button"
            className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black"
          >
            delete
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/candidates", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setUserData(payload.data);
    };
    FecthUserData();
  }, []);

  const delKandidat = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/candidates/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message);
    }

    toast.success(payload.message);
    window.location.reload();
  };

  return (
    <>
      <DataTable columns={column} data={userData} pagination highlightOnHover />
    </>
  );
}
