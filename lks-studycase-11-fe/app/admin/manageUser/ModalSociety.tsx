import { GetData } from "@/lib/GetData";
import { Regional, Society, User } from "@/lib/interfacse";
import { Astloch } from "next/font/google";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ModalSociety({ action, setIsOpenModal, data }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; data?: Society }) {
  const [regional, setRegional] = useState<Regional[]>([]);
  useEffect(() => {
    async function fetching() {
      const data = await GetData("regional");
      setRegional(data.data);
    }
    fetching();
  });
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const data = new FormData(e.target);
      const EntryData = Object.fromEntries(data.entries());
      const response = await fetch("http://localhost:8000/api/v1/society", {
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
            <input required defaultValue={data?.name} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="name" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="password">
              password
            </label>
            <input required defaultValue={data?.password} type="password" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="password" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="id_card_number">
              id_card_number
            </label>
            <input required defaultValue={data?.id_card_number} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="id_card_number" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="born_date">
              born_date
            </label>
            <input required defaultValue={data?.born_date} type="date" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="born_date" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="gender">
              gender
            </label>
            <select required defaultValue={data?.gender} className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="gender">
              <option value=""></option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="address">
              address
            </label>
            <input required defaultValue={data?.address} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="address" />
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
            </select>
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
