"use client";
import { DataBahanProps } from "@/lib/utilities";
import React, { Dispatch, FormEvent, useState } from "react";

export const ModalAdd = ({ setisopen }: { setisopen: Dispatch<React.SetStateAction<boolean>> }) => {
  const [name, setName] = useState<string>("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/roti", {
        method: "POST",
        body: JSON.stringify({ name, qty, price }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response) {
        setError(data.message);
      }
      if (response.status === 403) {
        setError(data.message);
      }
      if (response.status === 200) {
        alert(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      throw error;
    }
  };

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-45 z-10"></div>
      <form method="POST" onSubmit={handleSubmit} className="mx-auto fixed top-0 left-[35%] z-40 bg-white max-w-xl w-full rounded-lg border border-slate-400 mt-40 p-5" action="">
        <div className="w-full flex justify-end">
          <button onClick={() => setisopen(false)} className="my-3 p-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600" type="button">
            Close
          </button>
        </div>
        <h1 className="text-center text-lg font-semibold">Add Roti</h1>
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              name
            </label>
            <input placeholder="masukkan name" className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              QTY
            </label>
            <input
              placeholder="masukkan qty"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="number"
              name="qty"
              id="qty"
              value={qty}
              onChange={(e) => setQty(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              price
            </label>
            <input
              placeholder="masukkan price"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>
        <button className="my-3 p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600" type="submit">
          Submit
        </button>
        <p className="text-red-500">{error && error}</p>
      </form>
    </div>
  );
};
export const ModalUpddate = ({ setisopen, dataBahan }: { setisopen: Dispatch<React.SetStateAction<boolean>>; dataBahan?: DataBahanProps }) => {
  const [name, setName] = useState<string>(dataBahan?.name || "");
  const [qty, setQty] = useState<number>(dataBahan?.qty || 0);
  const [price, setPrice] = useState<number>(dataBahan?.price || 0);
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (dataBahan) {
        const response = await fetch(`http://localhost:8000/api/roti/${dataBahan.id}`, {
          method: "PUT",
          body: JSON.stringify({ name, qty, price }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const payload = await response.json();
        if (payload.status === false) {
          alert(payload.message);
        }
        if (payload.status === true) {
          alert(payload.message);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      throw error;
    }
  };

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-45 z-10"></div>
      <form method="POST" onSubmit={handleSubmit} className="mx-auto fixed top-0 left-[35%] z-40 bg-white max-w-xl w-full rounded-lg border border-slate-400 mt-40 p-5" action="">
        <div className="w-full flex justify-end">
          <button onClick={() => setisopen(false)} className="my-3 p-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600" type="button">
            Close
          </button>
        </div>
        <h1 className="text-center text-lg font-semibold">Add Roti</h1>
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              name
            </label>
            <input placeholder="masukkan name" className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              QTY
            </label>
            <input
              placeholder="masukkan qty"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="number"
              name="qty"
              id="qty"
              value={qty}
              onChange={(e) => setQty(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              price
            </label>
            <input
              placeholder="masukkan price"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>
        <button className="my-3 p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600" type="submit">
          Submit
        </button>
        <p className="text-red-500">{error && error}</p>
      </form>
    </div>
  );
};
