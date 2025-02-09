"use client";
import { GetDataByToken } from "@/lib/GetData";
import { Vaccination } from "@/lib/interfacse";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Vaccinations() {
  const [Vaccination, setVaccination] = useState<{ first: Vaccination; second: Vaccination }>();
  const router = useRouter();

  useEffect(() => {
    async function fetching() {
      const data = await GetDataByToken("vaccination");
      setVaccination(data.vaccinations);
    }
    fetching();
  }, []);
  return (
    <div className="p-5">
      <div className="my-4">
        <button onClick={() => router.push("/vaccinations/create")} type="button" className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
          Create Vaccinations
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-gray-700">
          <p className="my-2 text-2xl font-bold">first</p>
          <p className="my-2 text-base font-semibold">
            id:
            <span className="font-medium"> {Vaccination?.first.id}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            dose:
            <span className="font-medium"> {Vaccination?.first.dose}</span>
          </p>
          <p className="my-2 text-base font-semibold">
            date:
            <span className="font-medium"> {Vaccination?.first.date}</span>
          </p>
          <div className="my-2 bg-gray-200 p-2 rounded-lg">
            <p className="my-2 text-base font-bold">spot</p>
            <p className="my-2 text-base font-semibold">
              name:
              <span className="font-medium"> {Vaccination?.first.spot.name}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              address:
              <span className="font-medium"> {Vaccination?.first.spot.address}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              serve:
              <span className="font-medium"> {Vaccination?.first.spot.serve}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              capacity:
              <span className="font-medium"> {Vaccination?.first.spot.capacity}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              regional:
              <span className="font-medium">
                {" "}
                {Vaccination?.first.spot.regional.province} - {Vaccination?.first.spot.regional.district}
              </span>
            </p>
          </div>
          <div className="my-2 bg-gray-200 p-2 rounded-lg">
            <p className="my-2 text-base font-bold">Vaccine</p>
            <p className="my-2 text-base font-semibold">
              name:
              <span className="font-medium"> {Vaccination?.first.vaccine ? Vaccination?.first.vaccine.name : "null"}</span>
            </p>
          </div>
          <div className="my-2 bg-gray-200 p-2 rounded-lg">
            <p className="my-2 text-base font-bold">Doctor</p>
            <p className="my-2 text-base font-semibold">
              username:
              <span className="font-medium"> {Vaccination?.first.doctor ? Vaccination?.first.doctor.username : "null"}</span>
            </p>
          </div>
        </div>
        {Vaccination?.second && (
          <div className="p-4 rounded-lg border border-gray-700">
            <p className="my-2 text-2xl font-bold">second</p>
            <p className="my-2 text-base font-semibold">
              id:
              <span className="font-medium"> {Vaccination?.second.id}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              dose:
              <span className="font-medium"> {Vaccination?.second.dose}</span>
            </p>
            <p className="my-2 text-base font-semibold">
              date:
              <span className="font-medium"> {Vaccination?.second.date}</span>
            </p>
            <div className="my-2 bg-gray-200 p-2 rounded-lg">
              <p className="my-2 text-base font-bold">spot</p>
              <p className="my-2 text-base font-semibold">
                name:
                <span className="font-medium"> {Vaccination?.second.spot.name}</span>
              </p>
              <p className="my-2 text-base font-semibold">
                address:
                <span className="font-medium"> {Vaccination?.second.spot.address}</span>
              </p>
              <p className="my-2 text-base font-semibold">
                serve:
                <span className="font-medium"> {Vaccination?.second.spot.serve}</span>
              </p>
              <p className="my-2 text-base font-semibold">
                capacity:
                <span className="font-medium"> {Vaccination?.second.spot.capacity}</span>
              </p>
              <p className="my-2 text-base font-semibold">
                regional:
                <span className="font-medium">
                  {" "}
                  {Vaccination?.second.spot.regional.province} - {Vaccination?.second.spot.regional.district}
                </span>
              </p>
            </div>
            <div className="my-2 bg-gray-200 p-2 rounded-lg">
              <p className="my-2 text-base font-bold">Vaccine</p>
              <p className="my-2 text-base font-semibold">
                name:
                <span className="font-medium"> {Vaccination?.second.vaccine ? Vaccination?.second.vaccine.name : "null"}</span>
              </p>
            </div>
            <div className="my-2 bg-gray-200 p-2 rounded-lg">
              <p className="my-2 text-base font-bold">Doctor</p>
              <p className="my-2 text-base font-semibold">
                username:
                <span className="font-medium"> {Vaccination?.second.doctor ? Vaccination?.second.doctor.username : "null"}</span>
              </p>
            </div>
          </div>
        )}
      </div>
      ;
    </div>
  );
}
