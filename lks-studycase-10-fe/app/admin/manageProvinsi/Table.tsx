"use client";
import { ProvinsiProps } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function Table() {
  const [userData, setUserData] = useState<ProvinsiProps[]>([]);
  const [onlyProvinsi, setOnlyProvinsi] = useState<ProvinsiProps>();
  const [modal, setModal] = useState(false);
  const column: TableColumn<ProvinsiProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "nama provinsi",
      selector: (row) => row.nama_provinsi,
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
          <button onClick={() => updateUser(row)} type="button" className="mt-4 bg-green-400 hover:bg-green-500 rounded-lg border-2 border-green-300 hover:ring-2 hover:ring-green-100 px-4 py-2 font-semibold text-black">
            edit
          </button>
          <button
            onClick={() => {
              const confirmation = confirm("Yakin?");
              if (confirmation) {
                delUser(row.id);
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
      const response = await fetch("http://localhost:8000/api/v1/provinsi", {
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

  const updateUser = async (data: ProvinsiProps) => {
    setModal(true);
    setOnlyProvinsi(data);
  };

  const delUser = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/provinsi/${id}`, {
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
      {modal && <Modal setIsOpenModal={setModal} dataProvinsi={onlyProvinsi} action="Edit" />}
    </>
  );
}
