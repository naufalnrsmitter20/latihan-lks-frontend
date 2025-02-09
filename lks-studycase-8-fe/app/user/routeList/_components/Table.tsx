"use client";
import { RouteDataProps, UserDataProps } from "@/utils/utils";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Modal from "./Modal";

export default function Table({ dataRoute }: { dataRoute: RouteDataProps[] }) {
  const [dataRouteOnly, setDataRouteOnly] = useState<RouteDataProps>();
  const [modal, setModal] = useState<boolean>(false);
  const [filteredRoute, setFilteredRoute] = useState<RouteDataProps[]>([]);
  const Table: TableColumn<RouteDataProps>[] = [
    {
      name: "no",
      selector: (e, i) => (i as number) + 1,
    },
    {
      name: "from place name",
      selector: (e) => e.from_place.name,
    },
    {
      name: "to place name",
      selector: (e) => e.to_place.name,
    },
    {
      name: "created at",
      selector: (e) => `${new Date(e.created_at).toDateString()}`,
    },
    {
      name: "updated at",
      selector: (e) => `${new Date(e.updated_at).toDateString()}`,
    },
    {
      name: "detail",
      cell: (row) => (
        <section className="flex justify-center gap-3 items-center">
          <button onClick={() => viewRoute(row)} type="button" className="text-white my-2.5 bg-green-400 hover:bg-green-500 focus:border-2 focus:border-green-300 focus:ring-2 focus:ring-green-300 rounded-md duration-200  w-auto px-3 py-2">
            View Details
          </button>
          {/* <button onClick={() => deleteRoute(row.id)} type="button" className="text-white my-2.5 bg-red-400 hover:bg-red-500 focus:border-2 focus:border-red-300 focus:ring-2 focus:ring-red-300 rounded-md duration-200  w-auto px-3 py-2">
            Delete
          </button> */}
        </section>
      ),
    },
  ];

  const viewRoute = async (data: RouteDataProps) => {
    setModal(true);
    setDataRouteOnly(data);
  };
  return (
    <section className="w-full">
      <DataTable className="w-full" columns={Table} data={dataRoute} pagination />
      {modal && <Modal setIsOpenModal={setModal} action="View" dataRoute={dataRouteOnly!} />}
    </section>
  );
}
