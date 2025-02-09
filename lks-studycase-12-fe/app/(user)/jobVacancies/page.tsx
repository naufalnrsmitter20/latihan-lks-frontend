"use client";
import { GetDataByToken } from "@/lib/getData";
import { JobVacancy } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function JobVacancies() {
  const [data, setData] = useState<JobVacancy[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("job_vacancies");
      setData(data.data);
    }
    fetching();
  });
  return (
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
                </div>
              ))}
          </div>
          <button
            type="button"
            onClick={() => router.push(`jobVacancies/${x.id}`)}
            className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-200 border-2 border-yellow-400 hover:border-yellow-500 duration-150"
          >
            Detail
          </button>
        </div>
      ))}
    </div>
  );
}
