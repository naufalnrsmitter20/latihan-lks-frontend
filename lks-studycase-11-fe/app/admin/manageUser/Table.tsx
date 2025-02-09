"use client";
import { GetData } from "@/lib/GetData";
import { Society, User } from "@/lib/interfacse";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import AddUser from "./AddUser";
import ModalUser from "./ModalUser";
import AddUSociety from "./AddSociety";

// eslint-disabled-next-line @typescript-eslint/no-explicit-any @typescript-eslint/no-unused-vars
export default function Table(test: any) {
  const [dataUser, setDataUser] = useState<User[]>([]);
  const [dataSociety, setDataSociety] = useState<Society[]>([]);
  const [dataUserOnly, setDataUserOnly] = useState<User>();
  const [dataSocietyOnly, setDataSocietyOnly] = useState<Society>();
  const [modalUser, setModalUser] = useState(false);
  const [modalSociety, setModalSociety] = useState(false);
  useEffect(() => {
    async function fetching() {
      const data = await GetData("user&society");
      setDataUser(data.data.user);
      setDataSociety(data.data.society);
    }
    fetching();
  }, []);

  const colums1: TableColumn<User>[] = [
    {
      name: "id",
      selector: (row, index) => (index as number) + 1,
    },
    {
      name: "username",
      selector: (row, index) => row.username,
    },
    {
      name: "action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-x-2">
          <button onClick={() => editUser(row)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
            Edit
          </button>
          <button
            onClick={() => {
              const confirmation = confirm("yakin?");
              if (confirmation) {
                delUser(row.id);
              }
            }}
            type="button"
            className="bg-red-400 border-2 font-medium border-red-400 rounded-lg px-3 py-1.5"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const delUser = async (id: number) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = await response.json();
      if (!response.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success(payload.message, { id: toastId });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error, { id: toastId });
    }
  };
  const editUser = async (data: User) => {
    setModalUser(true);
    setDataUserOnly(data);
  };

  const colums2: TableColumn<Society>[] = [
    {
      name: "id",
      selector: (row, index) => (index as number) + 1,
    },
    {
      name: "username",
      selector: (row, index) => row.name,
    },
    {
      name: "action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-x-2">
          <button onClick={() => editSociety(row)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
            Edit
          </button>
          <button
            onClick={() => {
              const confirmation = confirm("yakin?");
              if (confirmation) {
                delSociety(row.id);
              }
            }}
            type="button"
            className="bg-red-400 border-2 font-medium border-red-400 rounded-lg px-3 py-1.5"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const delSociety = async (id: number) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(`http://localhost:8000/api/v1/society/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = await response.json();
      if (!response.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success(payload.message, { id: toastId });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error, { id: toastId });
    }
  };
  const editSociety = async (data: Society) => {
    setModalSociety(true);
    setDataSocietyOnly(data);
  };

  return (
    <div className="max-w-7xl w-screen">
      <div className="mb-6">
        <AddUser />
        <DataTable columns={colums1} pagination data={dataUser} />
        {modalUser && <ModalUser action="edit" setIsOpenModal={setModalUser} data={dataUserOnly} />}
      </div>
      <div className="mb-6">
        <AddUSociety />
        <DataTable columns={colums2} pagination data={dataSociety} />
      </div>
    </div>
  );
}
