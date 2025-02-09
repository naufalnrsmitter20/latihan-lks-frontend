"use client";
import React from "react";
import Table from "./Table";
import { useParams } from "next/navigation";
import Grafik from "./Grafik";

export default function page() {
  const params = useParams();
  const { id } = params;
  return (
    <div className="max-w-screen-2xl w-full">
      <div className="my-3 mx-2">
        <h4 className="text-2xl font-semibold">Table</h4>
      </div>
      <Table id={id as string} />
      <div className="my-3 mx-2">
        <h4 className="text-2xl font-semibold">Grafik</h4>
      </div>
      <Grafik id={id as string} />
    </div>
  );
}
