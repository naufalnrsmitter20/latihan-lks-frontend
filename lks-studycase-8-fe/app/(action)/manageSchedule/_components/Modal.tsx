"use client";
import { PlaceDataProps, ScheduleDataProps } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Modal({ action, setIsOpenModal, DataSchedule }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; DataSchedule?: ScheduleDataProps }) {
  const [error, setError] = useState<string>("");
  const [type, setType] = useState<string>(DataSchedule?.type as string);
  const [line, setline] = useState<string>(DataSchedule?.line as string);
  const [fromPlaceName, setfromPlaceName] = useState<string>(DataSchedule?.from_place.id as string);
  const [toPlaceName, settoPlaceName] = useState<string>(DataSchedule?.to_place.id as string);
  const [departureTime, setdepartureTime] = useState<string>(DataSchedule?.departure_time as string);
  const [arrivalTime, setarrivalTime] = useState<string>(DataSchedule?.arrival_time as string);
  // const [travelTime, settravelTime] = useState<string>(DataSchedule?.travel_time as string);
  // const [speed, setspeed] = useState<string>(DataSchedule?.speed as string);
  // const [distance, setdistance] = useState<string>(DataSchedule?.distance as string);
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

  const router = useRouter();

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/v1/schedule", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ type, line, from_place_id: fromPlaceName, to_place_id: toPlaceName, departure_time: departureTime, arrival_time: arrivalTime }),
      });
      const payload = await res.json();
      if (!payload.status) {
        setError(payload.message);
        console.log(payload.message);
        return;
      }
      console.log(payload.message);
      alert(payload.message);
      router.refresh();
      setIsOpenModal(false);
      window.location.reload();

      return payload;
    } catch (error) {
      console.log(error);
      throw error as Error;
    }
  };
  const HandleUpdate = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/api/v1/schedule/${DataSchedule?.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ type, line, fromPlaceName, toPlaceName, departureTime, arrivalTime }),
      });
      const payload = await res.json();
      if (payload.status !== true) {
        setError(payload.message);
        console.log(payload.message);
        return;
      }
      setIsOpenModal(false);
      alert(payload.message);
      window.location.reload();
      return payload;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <>
      <div className="w-screen h-screen z-10 fixed top-0 left-0 bg-black/20"></div>
      <div className="bg-white fixed rounded-lg top-[15%] overflow-scroll max-h-[600px] left-[25%] border p-4 z-20 border-black ring-2 mx-auto ring-slate-400 max-w-3xl h-auto w-full">
        <form encType="multipart/formdata" onSubmit={DataSchedule ? HandleUpdate : HandleSubmit}>
          <h1 className="text-black font-semibold text-lg">Modal {action} User</h1>
          <div className="space-y-3 my-2">
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="type">
                type
              </label>
              <select value={type as string} onChange={(e) => setType(e.target.value)} className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2" name="type" id="type">
                <option value="">Select</option>
                <option value={"BUS"}>BUS</option>
                <option value={"TRAIN"}>TRAIN</option>
              </select>
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="line">
                line
              </label>
              <input
                value={line}
                onChange={(e) => setline(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                required
                placeholder="Input line of schedule"
                type="text"
                name="line"
                id="line"
              />
            </div>
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
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="departureTime">
                departureTime
              </label>
              <input
                value={departureTime}
                onChange={(e) => setdepartureTime(e.target.value)}
                className="border border-slate-500 outdepartureTime-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                required
                placeholder="Input departureTime of schedule"
                type="datetime-local"
                name="departureTime"
                id="departureTime"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="arrivalTime">
                arrivalTime
              </label>
              <input
                value={arrivalTime}
                onChange={(e) => setarrivalTime(e.target.value)}
                className="border border-slate-500 outarrivalTime-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                required
                placeholder="Input arrivalTime of schedule"
                type="datetime-local"
                name="arrivalTime"
                id="arrivalTime"
              />
            </div>
            {/* <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="travelTime">
                travelTime
              </label>
              <input
                value={travelTime}
                onChange={(e) => settravelTime(e.target.value)}
                className="border border-slate-500 outtravelTime-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                required
                placeholder="Input travelTime of schedule"
                type="text"
                name="travelTime"
                id="travelTime"
              />
            </div> */}
            {/* <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="speed">
                speed
              </label>
              <input
                value={speed}
                onChange={(e) => setspeed(e.target.value)}
                className="border border-slate-500 outspeed-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                required
                placeholder="Input speed of schedule"
                type="text"
                name="speed"
                id="speed"
              />
            </div> */}
            {/* <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="distance">
                distance
              </label>
              <input
                value={distance}
                onChange={(e) => setdistance(e.target.value)}
                className="border border-slate-500 outdistance-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                required
                placeholder="Input distance of schedule"
                type="text"
                name="distance"
                id="distance"
              />
            </div> */}

            <p className="my-3 text-red-500">{error && error}</p>
            <div className="flex justify-start items-center gap-x-4">
              <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200 rounded-md border-2 mt-2 text-white font-semibold border-blue-600">
                Submit
              </button>
              <button onClick={() => setIsOpenModal(false)} type="button" className="px-4 py-2 bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-200 rounded-md border-2 mt-2 text-white font-semibold border-red-600">
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
