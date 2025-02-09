"use client";
import { ScheduleDataProps } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import Table from "./_components/Table";
import Modal from "./_components/Modal";

export default function manageSchedule() {
  const [modal, setModal] = useState(false);
  const [DataSchedule, setDataSchedule] = useState<ScheduleDataProps[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchingData = async () => {
      const res = await fetch("http://localhost:8000/api/v1/schedule", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = await res.json();
      if (!payload.status) {
        console.log(payload.message);
      }
      console.log(payload.data);
      setDataSchedule(payload.data);
    };
    fetchingData();
  }, []);
  console.log(DataSchedule);

  return (
    <section className="p-4 w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-black my-4 ">Data Schedule</p>
        <button onClick={() => setModal(true)} type="button" className="text-white my-2.5 bg-blue-400 hover:bg-blue-500 focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 rounded-md duration-200  w-auto px-3 py-2">
          Add Schedule
        </button>
      </div>
      <div className="max-w-screen-2xl w-full">
        <Table DataSchedule={DataSchedule} />
      </div>
      {modal && <Modal action="Add" setIsOpenModal={setModal} />}
    </section>
  );
}
