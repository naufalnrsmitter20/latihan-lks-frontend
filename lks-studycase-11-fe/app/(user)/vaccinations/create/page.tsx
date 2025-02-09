"use client";
import { GetData, GetDataByToken } from "@/lib/GetData";
import { Spot } from "@/lib/interfacse";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function createVaccinations() {
  const router = useRouter();
  const [spot, setSpot] = useState<Spot[]>([]);
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("spots");
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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/v1/vaccination?token=${token}`, {
        method: "POST",
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
      router.push("/vaccinations");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-xl w-full shadow-sm border-2 border-gray-500 rounded-lg p-4">
        <h1 className="text-xl font-semibold my-3">Create vaccination</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="spot_id">
              spot_id
            </label>
            <select required className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="spot_id">
              <option value="">select</option>
              {spot.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>{" "}
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="date">
              date
            </label>
            <input type="date" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="date" />
          </div>
          <div className="py-2">
            <button type="submit" className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
