import { VoteProps } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export default function Table() {
  const [Data, setData] = useState<VoteProps[]>([]);
  const router = useRouter();
  const column: TableColumn<VoteProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "Tipe Pemilihan",
      selector: (row) => row.tipe_pemilihan,
    },
    {
      name: "Provinsi",
      selector: (row) => (row.provinsi ? row.provinsi.nama_provinsi : "All"),
    },
    {
      name: "Kota",
      selector: (row) => (row.kota ? row.kota.nama_kota : "All"),
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => router.push(`/admin/result/detail/${row.id}`)}
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
      const response = await fetch("http://localhost:8000/api/v1/vote/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setData(payload.data);
    };
    FecthUserData();
  }, []);

  return (
    <div className="max-w-screen-2xl w-full">
      <DataTable columns={column} data={Data} pagination highlightOnHover />
    </div>
  );
}
