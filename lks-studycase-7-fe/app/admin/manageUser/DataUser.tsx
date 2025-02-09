"use client";
import { GetData } from "@/lib/getData";
import { UserDataPayload } from "@/lib/utilities";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ModalAdd, ModalUpddate } from "./Modal";

export default function DataUser() {
  const [user, setUser] = useState<UserDataPayload[]>([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dataUser, setDataUser] = useState<UserDataPayload>();

  const delUser = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === false) {
      alert(data.message);
    }
    if (data.status === true) {
      alert(data.message);
      window.location.reload();
    }
  };

  const updateUser = async (data: UserDataPayload) => {
    setDataUser(data);
    setEdit(true);
  };

  useEffect(() => {
    const Fetching = async () => {
      const response = await GetData("user");
      setUser(response.data);
    };
    Fetching();
  }, []);
  const columns: TableColumn<UserDataPayload>[] = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "username",
      selector: (row) => row.username,
    },
    {
      name: "role",
      selector: (row) => row.role,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3 justify-center">
          <button onClick={() => delUser(row.id)} className="my-3 p-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600" type="button">
            Delete
          </button>
          <button onClick={() => updateUser(row)} className="my-3 p-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600" type="button">
            Update
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-screen max-w-6xl">
      <button onClick={() => setModal(true)} className="my-3 p-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600" type="button">
        Add User
      </button>
      {modal && <ModalAdd setisopen={setModal} />}
      {edit && <ModalUpddate setisopen={setEdit} dataUser={dataUser} />}
      <DataTable className="w-1/2" columns={columns} data={user} pagination />
    </div>
  );
}
