"use client";
import { GetDataByToken } from "@/lib/getData";
import { JobVacancy } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function Applications() {
  const [data, setData] = useState<JobVacancy[]>([]);
  const [modal, setModal] = useState(false);

  const router = useRouter();
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("applications");
      setData(data.vacancies);
    }
    fetching();
  });
  return (
    <div>
      <div className="my-3 mx-4">
        {" "}
        <button onClick={() => setModal(true)} type="button" className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-200 border-2 border-yellow-400 hover:border-yellow-500 duration-150">
          Apply Job
        </button>
      </div>
      <div className="p-2 grid grid-cols-3 gap-4">
        {data.map((x, i) => (
          <div key={i} className="rounded-lg border-2 border-gray-400 bg-yellow-50 p-4">
            <p className="py-2 font-semibold text-base">
              id: <span className="font-medium">{x.id}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              company: <span className="font-medium">{x.company}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              address: <span className="font-medium">{x.address}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              description: <span className="font-medium">{x.description}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              job_category name: <span className="font-medium">{x.job_category.job_category}</span>
            </p>
            <div className="my-3 mx-2 p-2 bg-yellow-100 rounded-lg">
              <p className="py-2 font-semibold text-base">available_positions</p>
              {x.available_positions &&
                x.available_positions.map((y, h) => (
                  <div key={h}>
                    <p className="py-2 font-semibold text-base">
                      position: <span className="font-medium">{y.position}</span>
                    </p>
                    <p className="py-2 font-semibold text-base">
                      capacity: <span className="font-medium">{y.capacity}</span>
                    </p>
                    <p className="py-2 font-semibold text-base">
                      apply_capacity: <span className="font-medium">{y.apply_capacity}</span>
                    </p>
                    <div className="mb-5 p-2 bg-yellow-200 border-b border-b-yellow-800 rounded-lg">
                      <p className="py-2 font-semibold text-base">job_apply_positions</p>
                      {y.job_apply_positions.map((f, l) => (
                        <div className="my-4 border-b border-b-gray-600" key={l}>
                          <p className="py-2 font-semibold text-base">
                            date: <span className="font-medium">{f.date}</span>
                          </p>
                          <p className="py-2 font-semibold text-base">
                            status: <span className="font-medium">{f.status}</span>
                          </p>
                          <p className="py-2 font-semibold text-base">
                            society: <span className="font-medium">{f.society.name}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {modal && <Modal setIsOpenModal={setModal} />}
    </div>
  );
}
