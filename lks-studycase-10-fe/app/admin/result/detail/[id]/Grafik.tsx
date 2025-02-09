"use client";
import { VoteProps } from "@/lib/interfaces";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import React, { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Grafik({ id }: { id: string }) {
  const [voteData, setVoteData] = useState<VoteProps>();

  useEffect(() => {
    async function FetchingData() {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/v1/voting/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setVoteData(data.data);
    }
    FetchingData();
  });
  const data_name = voteData?.kandidats && voteData?.kandidats.map((kandidat) => kandidat.nama_kandidat);
  const data_count = voteData?.kandidats && voteData?.kandidats.map((x) => x.uservote && x.uservote.length);
  console.log(data_count);

  const dataDougnuts: ChartData<"doughnut", number[], unknown> = {
    labels: data_name,
    datasets: [
      {
        label: "Hasil Vote",
        data: data_count || [],
        backgroundColor: ["#aaa111", "#aaafff", "#afaf"],
      },
    ],
  };
  return (
    <div className="max-w-7xl">
      <Doughnut data={dataDougnuts} />
    </div>
  );
}
