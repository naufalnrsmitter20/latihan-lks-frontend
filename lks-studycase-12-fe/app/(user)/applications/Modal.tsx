"use client";
import { GetDataByToken } from "@/lib/getData";
import { AvailablePosition, JobCategory, JobVacancy } from "@/lib/interfaces";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ setIsOpenModal }: { setIsOpenModal: Dispatch<SetStateAction<boolean>> }) {
  const [jobVacancy, setJobVacancy] = useState<JobVacancy[]>([]);
  const [AvailablePositiond, setAvailablePositiond] = useState<AvailablePosition[]>([]);
  const [availablePosition, setAvailablePosition] = useState<[] | any>([]);
  const AddRow = () => {
    setAvailablePosition([...availablePosition, ""]);
  };
  const DelRow = (index: number) => {
    availablePosition.splice(index, 1);
  };
  const HandleChange = (index: number, value: any) => {
    const newAvPosition = [...availablePosition];
    newAvPosition[index] = value;
    setAvailablePosition(newAvPosition);
  };
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("job_vacancies");
      setJobVacancy(data.data);
    }
    fetching();
  }, []);
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("available_positions");
      setAvailablePositiond(data.data);
    }
    fetching();
  }, []);
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData(e.target);
      const availablePositionData = {
        available_position_id: availablePosition,
      };
      const entryData = Object.fromEntries(formData);
      const token = localStorage.getItem("login_tokens");
      const res = await fetch(`http://localhost:8000/api/v1/applications?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign(entryData, availablePositionData)),
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
      <div className="z-20 bg-white w-full max-w-3xl border rounded-lg p-5">
        <h1 className="text-2xl font-semibold py-3">Apply Job</h1>
        <form onSubmit={HandleSubmit} className="space-y-2 w-full">
          <div>
            <label className="text-lg font-medium" htmlFor="notes">
              notes
            </label>
            <input className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" type="text" name="notes" id="notes" />
          </div>
          <div>
            <label className="text-lg font-medium" htmlFor="job_vacancy_id">
              job_vacancy
            </label>
            <select className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" name="job_vacancy_id" id="job_category_id">
              <option value=""></option>
              {jobVacancy.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.company}
                </option>
              ))}
            </select>
          </div>
          <p className="text-lg font-medium">available_position</p>
          {availablePosition.map((x: any, i: any) => (
            <div className="flex gap-x-3 items-center" key={i}>
              <div>
                <label className="text-lg font-medium" htmlFor="available_position_id">
                  position {i + 1}
                </label>
                <select
                  className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  onChange={(e) => HandleChange(i, e.target.value)}
                  name="available_position_id"
                  id="available_position_id"
                >
                  <option value=""></option>
                  {AvailablePositiond.map((u, o) => (
                    <option key={o} value={u.id}>
                      {u.position}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={() => DelRow(i)} className="px-3 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 focus:ring-2 focus:ring-orange-200 border-2 border-orange-400 hover:border-yellow-500 duration-150">
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={() => AddRow()} className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-200 border-2 border-yellow-400 hover:border-yellow-500 duration-150">
            Add
          </button>

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
