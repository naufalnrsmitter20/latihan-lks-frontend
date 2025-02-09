"use client";
import { GetDataByToken } from "@/lib/GetData";
import { Consultation } from "@/lib/interfacse";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function consultations() {
  const [consultation, setConsultation] = useState<Consultation[]>([]);
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("consultations");
      setConsultation(data.consultations);
    }
    fetching();
  });
  const router = useRouter();
  return (
    <div className="p-5">
      <div className="my-4">
        <button onClick={() => router.push("/consultations/create")} type="button" className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
          Create Consultations
        </button>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {consultation.map((x, i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-700">
            <p className="my-2 text-base font-semibold">
              Status:
              <span className="font-medium"> {x.status}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              {" "}
              disease history:
              <span className="font-medium"> {x.disease_history}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              {" "}
              current symptoms:
              <span className="font-medium"> {x.current_symptoms}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              doctor notes:
              <span className="font-medium"> {x.doctor_notes}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              society_id:
              <span className="font-medium"> {x.society_id}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              doctor_id:
              <span className="font-medium"> {x.doctor_id}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
