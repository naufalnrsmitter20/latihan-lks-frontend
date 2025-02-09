"use client";
import { PlaceDataProps, RouteDataProps } from "@/utils/utils";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Modal({ action, setIsOpenModal, dataRoute }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; dataRoute?: RouteDataProps }) {
  const [fromPlaceName, setfromPlaceName] = useState<string>(dataRoute?.from_place.id as string);
  const [toPlaceName, settoPlaceName] = useState<string>(dataRoute?.to_place.id as string);
  const [DataPlace, setDataPlace] = useState<PlaceDataProps[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchingData = async () => {
      const res = await fetch("http://localhost:8000/api/v1/place", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = await res.json();
      if (!payload.status) {
        console.log(payload.message);
      }
      console.log(payload.data);
      setDataPlace(payload.data);
    };
    fetchingData();
  }, []);

  return (
    <>
      <div className="w-screen h-screen z-10 fixed top-0 left-0 bg-black/20"></div>
      <div className="bg-white fixed rounded-lg top-[15%] overflow-scroll max-h-[600px] left-[25%] border p-4 z-20 border-black ring-2 mx-auto ring-slate-400 max-w-3xl h-auto w-full">
        <div>
          <h1 className="text-black font-semibold text-lg">Modal {action} Schedule</h1>
          <div className="space-y-3 my-2">
            {!dataRoute ? (
              <div className="space-y-2 mb-2">
                <label className="text-base font-semibold text-slate-700" htmlFor="fromPlaceName">
                  fromPlaceName
                </label>
                <select
                  value={fromPlaceName}
                  onChange={(e) => setfromPlaceName(e.target.value)}
                  className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                  required
                  name="fromPlaceName"
                  id="fromPlaceName"
                >
                  <option value="">Select</option>

                  {DataPlace.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                <label className="text-base font-semibold text-slate-700" htmlFor="username">
                  From Place Name
                </label>
                <input
                  name="from_place_name"
                  value={dataRoute?.from_place.name}
                  className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                  type="text"
                  disabled
                  readOnly
                />
              </div>
            )}
            {!dataRoute ? (
              <div className="space-y-2 mb-2">
                <label className="text-base font-semibold text-slate-700" htmlFor="toPlaceName">
                  toPlaceName
                </label>
                <select
                  value={toPlaceName}
                  onChange={(e) => settoPlaceName(e.target.value)}
                  className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                  required
                  name="toPlaceName"
                  id="toPlaceName"
                >
                  <option value="">Select</option>

                  {DataPlace.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                <label className="text-base font-semibold text-slate-700" htmlFor="username">
                  To Place Name
                </label>
                <input name="to_place_name" value={dataRoute?.to_place.name} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" type="text" disabled readOnly />
              </div>
            )}
            {dataRoute?.schedules.map((item, i) => (
              <div key={i} className="my-3">
                <div className="my-1">
                  <p className="text-lg font-semibold text-blue-400">Schedules {i + 1}</p>
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Type
                  </label>
                  <input name="type" value={item.type} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" type="text" disabled readOnly />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Type
                  </label>
                  <input name="type" value={item.line} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" type="text" disabled readOnly />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Departure Time
                  </label>
                  <input
                    name="departure_time"
                    value={`${new Date(item.departure_time).toDateString()}`}
                    className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                    type="text"
                    disabled
                    readOnly
                  />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Arrival Time
                  </label>
                  <input
                    name="arrival_time"
                    value={`${new Date(item.arrival_time).toDateString()}`}
                    className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                    type="text"
                    disabled
                    readOnly
                  />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Travel Time
                  </label>
                  <input name="travel_time" value={`${item.travel_time}h`} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" type="text" disabled readOnly />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Distance
                  </label>
                  <input name="distance" value={`${item.distance}km`} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" type="text" disabled readOnly />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="text-base font-semibold text-slate-700" htmlFor="username">
                    Speed
                  </label>
                  <input name="speed" value={`${item.speed}km/h`} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" type="text" disabled readOnly />
                </div>
              </div>
            ))}

            <div className="flex justify-start items-center gap-x-4">
              <button onClick={() => setIsOpenModal(false)} type="button" className="px-4 py-2 bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-200 rounded-md border-2 mt-2 text-white font-semibold border-red-600">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
