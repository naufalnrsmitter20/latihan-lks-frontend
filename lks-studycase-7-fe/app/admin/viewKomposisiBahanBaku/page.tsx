"use client";
import { KomposisiProps } from "@/lib/utilities";
import React, { useEffect, useState } from "react";

export default function ViewKomposisiBahanBaku() {
  const [data, setData] = useState<KomposisiProps[]>([]);
  useEffect(() => {
    const Fetched = async () => {
      try {
        if (typeof window !== undefined) {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`http://localhost:8000/api/admin/view-komposisi-bahan-baku`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const dataset = await response.json();
          if (!response.ok) {
            console.log(dataset.message);
          }
          setData(dataset.data);
          console.log(dataset);
        }
      } catch (error) {
        throw error;
      }
    };
    Fetched();
  }, []);

  return (
    <>
      View Komposisi Bahan Baku
      <section className="flex flex-col w-full gap-4 p-6">
        {data ? (
          data.map((item, i) => (
            <div key={i} className="bg-slate-100 hover:bg-slate-200 border-2 border-blue-400 rounded-lg p-3">
              <p>
                <span className="font-semibold">Roti:</span> {item.Roti}
              </p>
              <span className="font-semibold">Detail:</span>{" "}
              <div className="flex flex-wrap gap-4 ">
                {item.Bahan.map((det, i) => (
                  <div className="bg-blue-300 text-sm border border-slate-300 rounded-lg p-2" key={i}>
                    <p>
                      <span className="font-semibold">No. </span> {i + 1}
                    </p>
                    <p>
                      <span className="font-semibold">Roti: </span> {det["nama bahan"]}
                    </p>
                    <p>
                      <span className="font-semibold">Harga: </span> {det["quantity used"]}
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
