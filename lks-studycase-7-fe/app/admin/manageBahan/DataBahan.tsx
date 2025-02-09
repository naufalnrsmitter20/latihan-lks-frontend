"use client";
import { GetData } from "@/lib/getData";
import { DataBahanProps } from "@/lib/utilities";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ModalAdd, ModalUpddate } from "./Modal";

export default function DataBahan() {
  const [bahan, setBahan] = useState<DataBahanProps[]>([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dataBahan, setDataBahan] = useState<DataBahanProps>();
  const token = localStorage.getItem("authToken");

  const delBahan = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/bahan/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
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

  const updateBahan = async (data: DataBahanProps) => {
    setDataBahan(data);
    setEdit(true);
  };

  useEffect(() => {
    const Fetching = async () => {
      const response = await GetData("bahan");
      setBahan(response.data);
    };
    Fetching();
  }, []);
  const columns: TableColumn<DataBahanProps>[] = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "nama bahan",
      selector: (row) => row.name,
    },
    {
      name: "QTY",
      selector: (row) => row.qty,
    },
    {
      name: "price",
      selector: (row) => row.price,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3 justify-center">
          <button onClick={() => delBahan(row.id)} className="my-3 p-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600" type="button">
            Delete
          </button>
          <button onClick={() => updateBahan(row)} className="my-3 p-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600" type="button">
            Update
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-screen max-w-6xl">
      <button onClick={() => setModal(true)} className="my-3 p-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600" type="button">
        Add Bahan
      </button>
      {modal && <ModalAdd setisopen={setModal} />}
      {edit && <ModalUpddate setisopen={setEdit} dataBahan={dataBahan} />}
      <DataTable className="w-1/2" columns={columns} data={bahan} pagination />
    </div>
  );
}
