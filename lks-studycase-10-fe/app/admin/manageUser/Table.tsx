"use client";
import { UserProps } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function Table() {
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [onlyDataUser, setOnlyDataUser] = useState<UserProps>();
  const [modal, setModal] = useState(false);
  const column: TableColumn<UserProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "role",
      selector: (row) => row.role,
    },
    {
      name: "umur",
      selector: (row) => (row.biodata != null ? row.biodata.age : ""),
    },
    {
      name: "kota",
      selector: (row) => (row.biodata != null ? row.biodata.kota.nama_kota : ""),
    },
    {
      name: "provinsi",
      selector: (row) => (row.biodata != null ? row.biodata.provinsi.nama_provinsi : ""),
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
      const response = await fetch("http://localhost:8000/api/v1/users", {
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

  const updateUser = async (data: UserProps) => {
    setModal(true);
    setOnlyDataUser(data);
  };

  const delUser = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/users/${id}`, {
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
      {modal && <Modal setIsOpenModal={setModal} dataUser={onlyDataUser} action="Edit" />}
    </>
  );
}
