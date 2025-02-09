"use client";
import { UserDataProps } from "@/utils/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Modal from "./Modal";

export default function Table({ dataUser }: { dataUser: UserDataProps[] }) {
  const [dataUserOnly, setDataUserOnly] = useState<UserDataProps>();
  const [modal, setModal] = useState<boolean>(false);
  const Table: TableColumn<UserDataProps>[] = [
    {
      name: "no",
      selector: (e, i) => (i as number) + 1,
    },
    {
      name: "username",
      selector: (e) => e.username,
    },
    {
      name: "role",
      selector: (e) => e.role,
    },
    {
      name: "action",
      cell: (row) => (
        <section className="flex justify-center gap-3 items-center">
          <button onClick={() => updateUser(row)} type="button" className="text-white my-2.5 bg-green-400 hover:bg-green-500 focus:border-2 focus:border-green-300 focus:ring-2 focus:ring-green-300 rounded-md duration-200  w-auto px-3 py-2">
            Edit
          </button>
          <button onClick={() => deleteUser(row.id)} type="button" className="text-white my-2.5 bg-red-400 hover:bg-red-500 focus:border-2 focus:border-red-300 focus:ring-2 focus:ring-red-300 rounded-md duration-200  w-auto px-3 py-2">
            Delete
          </button>
        </section>
      ),
    },
  ];
  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = await res.json();
      if (!payload.status) {
        alert(payload.message);
      }
      alert(payload.message);
      window.location.reload();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateUser = async (data: UserDataProps) => {
    setModal(true);
    setDataUserOnly(data);
  };
  return (
    <section className="w-full">
      <DataTable className="w-full" columns={Table} data={dataUser} pagination />
      {modal && <Modal setIsOpenModal={setModal} action="Edit" dataUser={dataUserOnly} />}
    </section>
  );
}
