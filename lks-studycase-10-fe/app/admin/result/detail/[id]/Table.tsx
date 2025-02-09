"use client";
import { KandidatProps, PartaiProps, VoteProps } from "@/lib/interfaces";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export default function detail({ id }: { id: string }) {
  const [data, setData] = useState<VoteProps>();
  const [KandidatData, setKandidatData] = useState<KandidatProps[]>([]);
  const [PartaiData, setPartaiData] = useState<PartaiProps[]>([]);
  const router = useRouter();
  const column1: TableColumn<KandidatProps>[] = [
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
  const column2: TableColumn<PartaiProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "Nama Partai",
      selector: (row) => row.nama_partai,
    },
    {
      name: "Nomor urut",
      selector: (row) => row.no_urut,
    },
    {
      name: "Total Kandidat",
      selector: (row) => row.kandidats.length,
    },
    {
      name: "Total Vote",
      selector: (row) => (row.kandidats && row.kandidats.map((x) => (x.uservote && x.uservote.length) || 0).length != 0 ? row.kandidats.map((x) => (x.uservote && x.uservote.length) || 0).reduce((acc, curr) => acc + curr) : 0),
    },
    {
      name: "Image",
      cell: (row) => <Image width={200} height={100} src={`http://localhost:8000/${row.logo.replace(" ", "%20")}`} alt={row.nama_partai} />,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => router.push(`/admin/result/detail/kandidat/${row.id}`)}
            type="button"
            className="mt-4 bg-green-400 hover:bg-green-500 rounded-lg border-2 border-green-300 hover:ring-2 hover:ring-green-100 px-4 py-2 font-semibold text-black"
          >
            View Details
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/v1/voting/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setData(payload.data);
      setKandidatData(payload.data.kandidats);
      setPartaiData(payload.data.partais);
    };
    FecthUserData();
  }, []);
  if (data && data.tipe_pemilihan !== "PILWANTAI") {
    return (
      <div className="max-w-screen-2xl w-full">
        <DataTable columns={column1} data={KandidatData} pagination highlightOnHover />
      </div>
    );
  } else if (data && data.tipe_pemilihan === "PILWANTAI") {
    return (
      <div className="max-w-screen-2xl w-full">
        <DataTable columns={column2} data={PartaiData} pagination highlightOnHover />
      </div>
    );
  }
}
