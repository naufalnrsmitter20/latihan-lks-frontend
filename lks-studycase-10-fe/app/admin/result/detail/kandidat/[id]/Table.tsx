"use client";
import { KandidatProps } from "@/lib/interfaces";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export default function Table() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<KandidatProps[]>([]);
  const column: TableColumn<KandidatProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "Nama kandidat",
      selector: (row) => row.nama_kandidat,
    },
    {
      name: "Nomor urut",
      selector: (row) => row.no_urut,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Total Vote",
      selector: (row) => row.uservote.length,
    },
    {
      name: "Image",
      cell: (row) => <Image width={200} height={100} src={`http://localhost:8000/${row.image.replace(" ", "%20")}`} alt={row.nama_kandidat} />,
    },
  ];

  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/v1/partai/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setData(payload.data.kandidats);
    };
    FecthUserData();
  }, []);

  return (
    <div className="max-w-screen-2xl w-full">
      <DataTable columns={column} data={data} pagination highlightOnHover />
    </div>
  );
}
