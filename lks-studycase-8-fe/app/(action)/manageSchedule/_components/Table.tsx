"use client";
import { ScheduleDataProps } from "@/utils/utils";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Modal from "./Modal";

export default function Table({ DataSchedule }: { DataSchedule: ScheduleDataProps[] }) {
  const [DataScheduleOnly, setDataScheduleOnly] = useState<ScheduleDataProps>();
  const [modal, setModal] = useState<boolean>(false);
  const Table: TableColumn<ScheduleDataProps>[] = [
    {
      name: "no",
      selector: (e, i) => (i as number) + 1,
    },
    {
      name: "type",
      selector: (e) => e.type,
    },
    {
      name: "line",
      selector: (e) => e.line,
    },
    {
      name: "from place",
      selector: (e) => e.from_place.name,
    },
    {
      name: "to place",
      selector: (e) => e.to_place.name,
    },
    {
      name: "departure time",
      selector: (e) => e.departure_time,
    },

    {
      name: "arrival time",
      selector: (e) => e.arrival_time,
    },
    {
      name: "travel time / h",
      selector: (e) => `${e.travel_time}h`,
    },
    {
      name: "speed", 
      selector: (e) => `${e.speed}km/h`,
    },
    {
      name: "distance",
      selector: (e) => `${e.distance}km`,
    },
    {
      name: "action",
      cell: (row) => (
        <section className="flex justify-center gap-3 items-center">
          {/* <button
            onClick={() => updateSchedule(row)}
            type="button"
            className="text-white my-2.5 bg-green-400 hover:bg-green-500 focus:border-2 focus:border-green-300 focus:ring-2 focus:ring-green-300 rounded-md duration-200  w-auto px-3 py-2"
          >
            Edit
          </button> */}
          <button onClick={() => deleteSchedule(row.id)} type="button" className="text-white my-2.5 bg-red-400 hover:bg-red-500 focus:border-2 focus:border-red-300 focus:ring-2 focus:ring-red-300 rounded-md duration-200  w-auto px-3 py-2">
            Delete
          </button>
        </section>
      ),
    },
  ];
  const deleteSchedule = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/v1/schedule/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const updateSchedule = async (data: ScheduleDataProps) => {
    setModal(true);
    setDataScheduleOnly(data);
  };
  return (
    <section className="w-full">
      <DataTable className="w-full" columns={Table} data={DataSchedule} pagination highlightOnHover />
      {modal && <Modal setIsOpenModal={setModal} action="Edit" DataSchedule={DataScheduleOnly} />}
    </section>
  );
}
