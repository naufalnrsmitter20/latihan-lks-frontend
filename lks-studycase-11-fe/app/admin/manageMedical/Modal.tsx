"use client";
import { GetData } from "@/lib/GetData";
import { User, Vaccination, Medical, Spot } from "@/lib/interfacse";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ action, setIsOpenModal, data }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; data?: Medical }) {
  const [spot, setSpot] = useState<Spot[]>([]);
  useEffect(() => {
    async function fetching() {
      const data = await GetData("spots/all");
      setSpot(data.data);
    }
    fetching();
  });
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const data = new FormData(e.target);
      const EntryData = Object.fromEntries(data.entries());
      console.log(EntryData);

      const user_id = localStorage.getItem("user_id");
      const response = await fetch(`http://localhost:8000/api/v1/medical/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EntryData),
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
      toast.error(error);
    }
  };
  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-50 flex justify-center items-center">
      <div className="w-screen h-screen absolute bg-black/30"></div>
      <div className="bg-white max-w-xl w-full rounded-lg p-5 z-20">
        <h1 className="text-xl font-semibold my-3">{action}</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="spot_id">
              spot
            </label>
            <select required defaultValue={data?.spot_id} className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="spot_id">
              <option value="">select</option>
              {spot.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>{" "}
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="role">
              role
            </label>
            <select required defaultValue={data?.role} className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="role">
              <option value=""></option>
              <option value="doctor">doctor</option>
              <option value="officer">officer</option>
            </select>{" "}
          </div>
          <div className="py-2 flex gap-x-3">
            <button type="submit" className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
              Submit
            </button>
            <button onClick={() => setIsOpenModal(false)} type="button" className="bg-red-400 border-2 font-medium border-red-400 rounded-lg px-3 py-1.5">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
