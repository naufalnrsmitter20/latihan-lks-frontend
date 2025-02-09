"use client";
import { GetData } from "@/lib/GetData";
import { Medical } from "@/lib/interfacse";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import AddMedical from "./AddMedical";
import Modal from "./Modal";

export default function Table() {
  const [dataMedical, setDataMedical] = useState<Medical[]>([]);
  const [dataMedicalOnly, setDataMedicalOnly] = useState<Medical>();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    async function fetching() {
      const data = await GetData("medical");
      setDataMedical(data.data);
    }
    fetching();
  }, []);
  const colums: TableColumn<Medical>[] = [
    {
      name: "id",
      selector: (row, index) => (index as number) + 1,
    },
    {
      name: "doctor name",
      selector: (row) => row.name,
    },
    {
      name: "dostor role",
      selector: (row) => row.role,
    },
    {
      name: " user_id",
      selector: (row) => row.user_id,
    },
    {
      name: "spot_id",
      selector: (row) => row.spot_id,
    },
    {
      name: "spot name",
      selector: (row) => row.spot.name,
    },
    {
      name: "spot address",
      selector: (row) => row.spot.address,
    },
    {
      name: "spot serve",
      selector: (row) => row.spot.serve,
    },
    {
      name: "spot capacity",
      selector: (row) => row.spot.capacity,
    },
    {
      name: "action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-x-2">
          <button onClick={() => editMedical(row)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
            Edit
          </button>
        </div>
      ),
    },
  ];
  const editMedical = async (data: Medical) => {
    setModal(true);
    setDataMedicalOnly(data);
  };

  return (
    <div className="max-w-7xl w-screen">
      <div className="mb-6">
        <AddMedical />
        <DataTable columns={colums} pagination data={dataMedical} />
        {modal && <Modal action="edit" setIsOpenModal={setModal} data={dataMedicalOnly} />}
      </div>
    </div>
  );
}
