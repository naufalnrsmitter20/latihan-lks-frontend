"use client";
import { GetData } from "@/lib/getData";
import { Validation } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function ValidationPage() {
  const [data, setData] = useState<Validation[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function fetching() {
      const data = await GetData("validations");
      setData(data.data);
    }
    fetching();
  });
  return (
    <div>
      <div className="my-3 mx-4">
        {" "}
        <button onClick={() => setModal(true)} type="button" className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-200 border-2 border-yellow-400 hover:border-yellow-500 duration-150">
          Request Validation
        </button>
      </div>
      <div className="p-2 grid grid-cols-3 gap-4">
        {data.map((x, i) => (
          <div key={i} className="rounded-lg border-2 border-gray-400 bg-yellow-50 p-4">
            <p className="py-2 font-semibold text-base">
              id: <span className="font-medium">{x.id}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              status: <span className="font-medium">{x.status}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              work_experience: <span className="font-medium">{x.work_experience}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              job_position: <span className="font-medium">{x.job_position}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              reason_accepted: <span className="font-medium">{x.reason_accepted}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              validator_notes: <span className="font-medium">{x.validator_notes || "null"}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              validator_name: <span className="font-medium">{x.validator ? x.validator.name : "null"}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              job category: <span className="font-medium">{x.job_category.job_category}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              society name: <span className="font-medium">{x.society.name}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              society id_card_number: <span className="font-medium">{x.society.id_card_number}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              society born_date: <span className="font-medium">{x.society.born_date}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              society gender: <span className="font-medium">{x.society.gender}</span>
            </p>
            <p className="py-2 font-semibold text-base">
              society address: <span className="font-medium">{x.society.address}</span>
            </p>
          </div>
        ))}
      </div>
      {modal && <Modal setIsOpenModal={setModal} />}
    </div>
  );
}
