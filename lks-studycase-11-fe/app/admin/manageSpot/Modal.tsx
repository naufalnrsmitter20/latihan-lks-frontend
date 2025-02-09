"use client";
import { GetData } from "@/lib/GetData";
import { User, Vaccination, Spot, Regional, Vaccine } from "@/lib/interfacse";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import animated from "react-select/animated";

const animatedSelected = animated();

export default function Modal({ action, setIsOpenModal, data }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; data?: Spot }) {
  const [regional, setRegional] = useState<Regional[]>([]);
  const [vaccine, setVaccine] = useState<Vaccine[]>([]);
  const [vaccineGroup, setVaccineGroup] = useState<{ label: string; value: number }[]>(data?.vaccines.map((x) => ({ label: x.name, value: x.id })) || []);
  useEffect(() => {
    async function fetching() {
      const data = await GetData("regional");
      setRegional(data.data);
    }
    fetching();
  });
  useEffect(() => {
    async function fetching() {
      const data = await GetData("vaccine");
      setVaccine(data.vaccine);
    }
    fetching();
  });
  const vaccineOptions = vaccine.map((x) => ({ label: x.name, value: x.id }));
  const HandleChange = (selectedVaccine: { label: string; value: number }[]) => {
    setVaccineGroup(selectedVaccine);
  };
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const data = new FormData(e.target);
      const vaccine_id = {
        vaccine_id: vaccineGroup.map((x) => x.value),
      };
      const EntryData = Object.fromEntries(data.entries());

      console.log(Object.assign(EntryData, vaccine_id));
      const response = await fetch("http://localhost:8000/api/v1/spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign(EntryData, vaccine_id)),
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
            <label className="text-base font-medium" htmlFor="name">
              name
            </label>
            <input defaultValue={data?.name} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="name" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="address">
              address
            </label>
            <input defaultValue={data?.address} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="address" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="serve">
              serve
            </label>
            <input defaultValue={data?.serve} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="serve" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="capacity">
              capacity
            </label>
            <input defaultValue={data?.capacity} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="capacity" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="vaccine_id">
              vaccine
            </label>
            <Select components={animatedSelected} value={vaccineGroup} options={vaccineOptions} onChange={HandleChange as any} isMulti />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="regional_id">
              regional
            </label>
            <select required defaultValue={data?.regional_id} className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="regional_id">
              <option value="">select</option>
              {regional.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.province} - {x.district}
                </option>
              ))}
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
