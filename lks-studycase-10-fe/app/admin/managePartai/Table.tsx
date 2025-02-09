"use client";
import { PartaiProps } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "next/image";
import toast from "react-hot-toast";
import ModalInsert from "./ModalInsert";

export default function Table() {
  const [userData, setUserData] = useState<PartaiProps[]>([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [onlyPartaiData, setonlyPartaiData] = useState<PartaiProps>();
  const column: TableColumn<PartaiProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "nama partai",
      selector: (row) => row.nama_partai,
    },
    {
      name: "no urut",
      selector: (row) => row.no_urut,
    },
    {
      name: "logo",
      cell: (row) => <Image width={300} height={200} className="object-cover" src={`http://localhost:8000/${row.logo.replace(" ", "%20")}`} alt={row.nama_partai}></Image>,
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
        <div className="flex justify-center items-center w-full gap-3">
          <button onClick={() => inserPartai(row)} type="button" className="mt-4 bg-orange-400 w-full hover:bg-orange-500 rounded-lg border-2 border-orange-300 hover:ring-2 hover:ring-orange-100 px-4 py-2 font-semibold text-black">
            insert Kandidat
          </button>
          <button
            onClick={() => {
              const confirmation = confirm("Yakin?");
              if (confirmation) {
                delPartai(row.id);
              }
              return false;
            }}
            type="button"
            className="mt-4 bg-red-400 w-full hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black"
          >
            del
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/partai", {
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

  const delPartai = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/partai/${id}`, {
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

  const inserPartai = async (data: PartaiProps) => {
    setonlyPartaiData(data);
    setModalInsert(true);
  };

  return (
    <>
      <DataTable columns={column} data={userData} pagination highlightOnHover />
      {modalInsert && <ModalInsert setIsOpenModal={setModalInsert} data={onlyPartaiData} />}
    </>
  );
}
