"use client";
import { PlaceDataProps, RouteDataProps } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import Table from "./_components/Table";
import Modal from "./_components/Modal";

export default function routeList() {
  const [modal, setModal] = useState(false);
  const [dataRoute, setDataRoute] = useState<RouteDataProps[]>([]);
  const [fromPlaceValue, setFromPlaceValue] = useState<string>("");
  const [toPlaceValue, setToPlaceValue] = useState<string>("");
  const [DataPlace, setDataPlace] = useState<PlaceDataProps[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchingData = async () => {
      const res = await fetch(`http://localhost:8000/api/v1/place`, {
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
      setDataPlace(payload.data);
    };
    fetchingData();
  });

  const FilteredData = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8000/api/v1/route?from_place_name=${fromPlaceValue}&to_place_name=${toPlaceValue}`, {
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
    setDataRoute(payload.data);
  };

  return (
    <section className="p-4 w-full max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-black my-4 ">Data Route</p>
        <button onClick={() => setModal(true)} type="button" className="text-white my-2.5 bg-blue-400 hover:bg-blue-500 focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 rounded-md duration-200  w-auto px-3 py-2">
          Add Route
        </button>
      </div>
      <form className="w-full flex justify-center items-end gap-x-5 py-2">
        <div className="space-y-2 mb-2">
          <label className="text-base font-semibold text-slate-700" htmlFor="fromPlaceName">
            From Place Name
          </label>
          <select
            value={fromPlaceValue}
            onChange={(e) => setFromPlaceValue(e.target.value)}
            className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
            required
            name="fromPlaceName"
            id="fromPlaceName"
          >
            <option value="">Select</option>

            {DataPlace.map((x, i) => (
              <option key={i} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 mb-2">
          <label className="text-base font-semibold text-slate-700" htmlFor="toPlaceName">
            To Place Name
          </label>
          <select
            value={toPlaceValue}
            onChange={(e) => setToPlaceValue(e.target.value)}
            className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
            required
            name="toPlaceName"
            id="toPlaceName"
          >
            <option value="">Select</option>
            {DataPlace.map((x, i) => (
              <option key={i} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={FilteredData} type="button" className="text-white my-2.5 bg-blue-400 hover:bg-blue-500 focus:border-2 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 rounded-md duration-200  w-auto px-3 py-2">
          Submit Filter
        </button>
      </form>
      <div className="w-full">
        <Table dataRoute={dataRoute} />
      </div>
      {modal && <Modal action="Add" setIsOpenModal={setModal} />}
    </section>
  );
}
