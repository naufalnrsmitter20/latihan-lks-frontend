import { User, Vaccination, Vaccine } from "@/lib/interfacse";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function Modal({ action, setIsOpenModal, data }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; data?: Vaccine }) {
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const data = new FormData(e.target);
      const EntryData = Object.fromEntries(data.entries());
      const response = await fetch("http://localhost:8000/api/v1/vaccine", {
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
            <input defaultValue={data?.name} type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="name" />
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
