"use client";
import { GetDataByToken } from "@/lib/getData";
import { JobVacancy } from "@/lib/interfaces";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function detail() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<JobVacancy>();
  const router = useRouter();
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken(`job_vacancies/${id}`);
      setData(data.vacancy);
    }
    fetching();
  });
  return (
    <div className="p-2 grid grid-cols-1 gap-4">
      <div className="rounded-lg border-2 border-gray-400 bg-yellow-50 p-4">
        <p className="py-2 font-semibold text-xl">
          id: <span className="font-medium">{data?.id}</span>
        </p>
        <p className="py-2 font-semibold text-xl">
          company: <span className="font-medium">{data?.company}</span>
        </p>
        <p className="py-2 font-semibold text-xl">
          address: <span className="font-medium">{data?.address}</span>
        </p>
        <p className="py-2 font-semibold text-xl">
          description: <span className="font-medium">{data?.description}</span>
        </p>
        <p className="py-2 font-semibold text-xl">
          job_category name: <span className="font-medium">{data?.job_category.job_category}</span>
        </p>
        <div className="my-3 mx-2 p-2 bg-yellow-100 rounded-lg">
          <p className="py-2 font-semibold text-xl">available_positions</p>
          {data?.available_positions &&
            data?.available_positions.map((y, h) => (
              <div key={h}>
                <p className="py-2 font-semibold text-xl">
                  position: <span className="font-medium">{y.position}</span>
                </p>
                <p className="py-2 font-semibold text-xl">
                  capacity: <span className="font-medium">{y.capacity}</span>
                </p>
                <p className="py-2 font-semibold text-xl">
                  apply_capacity: <span className="font-medium">{y.apply_capacity}</span>
                </p>
                <p className="py-2 font-semibold text-xl">
                  job_apply_positions: <span className="font-medium">{y.job_apply_positions_count}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
