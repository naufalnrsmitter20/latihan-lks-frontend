"use client";
import { DataTransactionProps } from "@/lib/utilities";
import React, { useState } from "react";

export default function ViewDataTransaction() {
  const [data, setData] = useState<DataTransactionProps[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const HandleFilter = async () => {
    try {
      if (typeof window !== undefined) {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:8000/api/admin/view-data-transaction`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
          }),
        });
        const dataset = await response.json();
        if (response.status == 403) {
          setError(dataset.message);
        }
        setData(dataset.data);
        console.log(dataset);
      }
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  return (
    <>
      <div className="my-8">
        Filter Data Transaction
        <form>
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold text-slate-800" htmlFor="username">
                Start Date
              </label>
              <input
                className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
                type="datetime-local"
                name="start_date"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold text-slate-800" htmlFor="username">
                End Date
              </label>
              <input className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100" type="datetime-local" name="end_date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <button className="my-3 p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600" type="button" onClick={HandleFilter}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <p>{error && error}</p>
      <section className="flex flex-col gap-4 p-6">
        {data ? (
          data.map((item, i) => (
            <div key={i} className="bg-slate-100 hover:bg-slate-200 border-2 border-blue-400 rounded-lg p-3">
              <p>
                <span className="font-semibold">Customer name:</span> {item.customer.username}
              </p>
              <p>
                <span className="font-semibold">Cashier name:</span> {item.cashier.username}
              </p>
              <p>
                <span className="font-semibold">Total Amount:</span> {item.total_amount}
              </p>
              <p>
                <span className="font-semibold">Transaction Date:</span> {item.transaction_date}
              </p>
              <span className="font-semibold">Detail:</span>{" "}
              <div className="flex flex-wrap gap-4 ">
                {item.detail_transaction.map((det, i) => (
                  <div className="bg-blue-300 text-sm border border-slate-300 rounded-lg p-2" key={i}>
                    <p>
                      <span className="font-semibold">No. </span> {i + 1}
                    </p>
                    <p>
                      <span className="font-semibold">Roti: </span> {det.name}
                    </p>
                    <p>
                      <span className="font-semibold">Harga: </span> {det.price}
                    </p>
                    <p>
                      <span className="font-semibold">QTY: </span> {det.qty}
                    </p>
                    <p>
                      <span className="font-semibold">Subtotal: </span> {det.subtotal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <>Data tidak ditemukan</>
        )}
      </section>
    </>
  );
}
