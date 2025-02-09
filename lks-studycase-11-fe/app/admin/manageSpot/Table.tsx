"use client";
import { GetData } from "@/lib/GetData";
import { Spot } from "@/lib/interfacse";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import AddSpot from "./AddSpot";
import Modal from "./Modal";

export default function Table() {
  const [dataSpot, setDataSpot] = useState<Spot[]>([]);
  const [dataSpotOnly, setDataSpotOnly] = useState<Spot>();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    async function fetching() {
      const data = await GetData("spots/all");
      setDataSpot(data.data);
    }
    fetching();
  }, []);
  const colums: TableColumn<Spot>[] = [
    {
      name: "id",
      selector: (row, index) => (index as number) + 1,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "address",
      selector: (row) => row.address,
    },
    {
      name: "capacity",
      selector: (row) => row.capacity,
    },
    {
      name: "serve",
      selector: (row) => row.serve,
    },

    // {
    //   name: "action",
    //   cell: (row) => (
    //     <div className="flex justify-center items-center gap-x-2">
    //       <button onClick={() => editSociety(row)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
    //         Edit
    //       </button>
    //       <button
    //         onClick={() => {
    //           const confirmation = confirm("yakin?");
    //           if (confirmation) {
    //             delSociety(row.id);
    //           }
    //         }}
    //         type="button"
    //         className="bg-red-400 border-2 font-medium border-red-400 rounded-lg px-3 py-1.5"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  // const delSociety = async (id: number) => {
  //   const toastId = toast.loading("Loading...");
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/v1/Spot/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const payload = await response.json();
  //     if (!response.ok) {
  //       toast.error(payload.message, { id: toastId });
  //       return;
  //     }
  //     toast.success(payload.message, { id: toastId });
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error, { id: toastId });
  //   }
  // };
  // const editSociety = async (data: Spot) => {
  //   setModal(true);
  //   setDataSpotOnly(data);
  // };

  return (
    <div className="max-w-7xl w-screen">
      <div className="mb-6">
        <AddSpot />
        <DataTable columns={colums} pagination data={dataSpot} />
        {modal && <Modal action="edit" setIsOpenModal={setModal} data={dataSpotOnly} />}
      </div>
    </div>
  );
}
