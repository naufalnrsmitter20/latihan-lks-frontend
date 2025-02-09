"use client";
import { GetDataByToken } from "@/lib/GetData";
import { Spot } from "@/lib/interfacse";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Spotist() {
  const [Spot, setSpot] = useState<Spot[]>([]);
  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("spots");
      setSpot(data.data);
    }
    fetching();
  });

  return (
    <div className="p-5">
      {" "}
      <div className="w-full grid grid-cols-3 gap-4">
        {Spot.map((x, i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-700">
            <p className="my-2 text-base font-semibold">
              name:
              <span className="font-medium"> {x.name}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              {" "}
              address:
              <span className="font-medium"> {x.address}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              {" "}
              serve:
              <span className="font-medium"> {x.serve}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              capacity:
              <span className="font-medium"> {x.capacity}</span>
            </p>
            <p className="my-2 text-base font-semibold">available_vaccines:</p>
            <p className="my-2 text-base font-semibold">
              <span className="font-medium"> {JSON.stringify(x.available_vaccines)}</span>
            </p>
            <Link href={`/spotList/filteredSpot/${x.id}`} className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
              Detail
            </Link>
          </div>
        ))}
      </div>
      ;
    </div>
  );
}
