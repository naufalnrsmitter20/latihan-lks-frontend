"use client";
import { PartaiProps, KandidatProps, VoteProps, VoteTypeProps } from "@/lib/interfaces";
import React, { FormEvent, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { ModalKandidat, ModalPartai } from "./Modal";

export default function Table() {
  const [voteData, setvoteData] = useState<VoteProps[]>([]);
  const [voteType, setvoteType] = useState<VoteTypeProps[]>([]);
  const [modalUpsertCandidates, setmodalUpsertCandidates] = useState(false);
  const [modalUpsertPartai, setmodalUpsertPartai] = useState(false);
  const [onlyDataVote, setOnlyDataVote] = useState<VoteProps>();
  const [error, setError] = useState("");
  const column: TableColumn<VoteProps>[] = [
    {
      name: "no",
      selector: (row, i) => (i as number) + 1,
    },
    {
      name: "Tipe Pemilihan",
      selector: (row) => row.tipe_pemilihan,
    },
    {
      name: "status",
      selector: (row) => row.status,
    },
    {
      name: "start date",
      selector: (row) => row.start_date,
    },
    {
      name: "end date",
      selector: (row) => row.end_date,
    },
    {
      name: "minimal umur",
      selector: (row) => row.min_age,
    },
    {
      name: "Kota",
      selector: (row) => (row.kota ? row.kota.nama_kota : "All"),
    },
    {
      name: "Provinsi",
      selector: (row) => (row.provinsi ? row.provinsi.nama_provinsi : "All"),
    },
    {
      name: "Action 1",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            disabled={row.tipe_pemilihan === "PILWANTAI"}
            onClick={() => UpdateKandidat(row)}
            type="button"
            className="mt-4 bg-orange-400 disabled:bg-slate-300 disabled:border-slate-400 hover:bg-orange-500 rounded-lg border-2 border-orange-300 hover:ring-2 hover:ring-orange-100 px-4 py-2 font-semibold text-black"
          >
            Upsert Candidate
          </button>
        </div>
      ),
    },
    {
      name: "Action 2",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            disabled={row.tipe_pemilihan === "PILPRES" || row.tipe_pemilihan === "PILKADA"}
            onClick={() => UpdatePartai(row)}
            type="button"
            className="mt-4 bg-yellow-400 disabled:bg-slate-300 disabled:border-slate-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black"
          >
            Upsert Partai
          </button>
        </div>
      ),
    },
    {
      name: "Action 3",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          {row.status === "ACTIVE" ? (
            <button onClick={() => HandleActivateVote(row)} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
              Disactive Vote
            </button>
          ) : (
            <button onClick={() => HandleActivateVote(row)} type="button" className="mt-4 bg-green-400 hover:bg-green-500 rounded-lg border-2 border-green-300 hover:ring-2 hover:ring-green-100 px-4 py-2 font-semibold text-black">
              Activate Vote
            </button>
          )}
        </div>
      ),
    },
    {
      name: "delete",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => {
              const confirmation = confirm("Yakin?");
              if (confirmation) {
                delVote(row.id);
              }
              return false;
            }}
            type="button"
            className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black"
          >
            delete
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/vote/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setvoteData(payload.data);
    };
    FecthUserData();
  }, []);

  const HandleActivateVote = async (data: VoteProps) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/vote/activate/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: data.status === "ACTIVE" ? JSON.stringify({ status: "NOTACTIVE" }) : JSON.stringify({ status: "ACTIVE" }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message);
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    window.location.reload();
  };
  const delVote = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/vote/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message);
    }

    toast.success(payload.message);
    window.location.reload();
  };

  function UpdatePartai(data: VoteProps) {
    setOnlyDataVote(data);
    setmodalUpsertPartai(true);
  }
  function UpdateKandidat(data: VoteProps) {
    setOnlyDataVote(data);
    setmodalUpsertCandidates(true);
  }

  return (
    <>
      <DataTable columns={column} data={voteData} pagination highlightOnHover style={{ overflow: "auto" }} />
      {modalUpsertPartai && <ModalPartai action="Upsert Partai" setIsOpenModal={setmodalUpsertPartai} data={onlyDataVote} />}
      {modalUpsertCandidates && <ModalKandidat action="Upsert Kandidat" setIsOpenModal={setmodalUpsertCandidates} data={onlyDataVote} />}
    </>
  );
}
