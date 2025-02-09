"use client";
import { GetDataByToken } from "@/lib/GetData";
import { Spot } from "@/lib/interfacse";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function filteredSpot() {
  const [Spot, setSpot] = useState<{ date: string; spot: Spot; vaccinations_count: number }>();
  const [date, setDate] = useState<string>();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetching() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/api/v1/spots/${id}?token=${token}&date=${date}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          console.error(data.message);
          return;
        }
        setSpot(data.data);
      } catch (error) {
        console.log(error);
        throw new Error((error as Error).message);
      }
    }
    fetching();
  });

  const setChangeDate = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    setDate(payload.date as string);
  };

  return (
    <div className="p-5">
      <form onSubmit={setChangeDate} className="my-4 flex justify-start gap-x-4 items-center">
        <input name="date" type="date" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" />
        <button type="submit" className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
          Filter
        </button>
      </form>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-gray-700">
          <p className="my-2 text-base font-semibold">
            date:
            <span className="font-medium"> {date}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            name:
            <span className="font-medium"> {Spot?.spot.name}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            {" "}
            address:
            <span className="font-medium"> {Spot?.spot.address}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            {" "}
            serve:
            <span className="font-medium"> {Spot?.spot.serve}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            capacity:
            <span className="font-medium"> {Spot?.spot.capacity}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            {" "}
            Vaccination count:
            <span className="font-medium"> {Spot?.vaccinations_count}</span>
          </p>
        </div>
      </div>
      ;
    </div>
  );
}
