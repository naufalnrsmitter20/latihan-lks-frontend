"use client";
import { GetData, GetDataByToken } from "@/lib/getData";
import { JobCategory } from "@/lib/interfaces";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ setIsOpenModal }: { setIsOpenModal: Dispatch<SetStateAction<boolean>> }) {
  const [jobCategory, setJobCategory] = useState<JobCategory[]>([]);
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("job_category");
      setJobCategory(data.data);
    }
    fetching();
  }, []);
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData(e.target);
      const entryData = Object.fromEntries(formData);
      const token = localStorage.getItem("login_tokens");
      const res = await fetch(`http://localhost:8000/api/v1/validations?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      });
      const payload = await res.json();
      if (!res.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success("success", { id: toastId });
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className="bg-black/50 absolute w-screen h-screen"></div>
      <div className="z-20 bg-white border rounded-lg p-5">
        <h1 className="text-2xl font-semibold py-3">Add Request Validation</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div>
            <label className="text-lg font-medium" htmlFor="work_experience">
              work_experience
            </label>
            <input className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" type="text" name="work_experience" id="work_experience" />
          </div>
          <div>
            <label className="text-lg font-medium" htmlFor="job_category_id">
              job_category_id
            </label>
            <select className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" name="job_category_id" id="job_category_id">
              <option value=""></option>
              {jobCategory.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.job_category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-lg font-medium" htmlFor="job_position">
              job_position
            </label>
            <input className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" type="text" name="job_position" id="job_position" />
          </div>
          <div>
            <label className="text-lg font-medium" htmlFor="reason_accepted">
              reason_accepted
            </label>
            <input className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" type="text" name="reason_accepted" id="reason_accepted" />
          </div>
          <div className="py-3 flex gap-x-3">
            <button type="submit" className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-200 border-2 border-yellow-400 hover:border-yellow-500 duration-150">
              Submit
            </button>
            <button onClick={() => setIsOpenModal(false)} type="button" className="px-3 py-2 rounded-lg bg-red-400 hover:bg-red-500 focus:ring-2 focus:ring-red-200 border-2 border-red-400 hover:border-red-500 duration-150">
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
