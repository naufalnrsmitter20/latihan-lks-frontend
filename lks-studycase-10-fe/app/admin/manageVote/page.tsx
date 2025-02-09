"use client";
import React, { useState } from "react";
import Table from "./Table";
import { DefaultModal } from "./Modal";

export default function manageVote() {
  const [modal, setModal] = useState(false);
  return (
    <div className="max-w-screen-2xl w-full">
      <button onClick={() => setModal(true)} type="button" className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black">
        Add Vote
      </button>
      <Table />
      {modal && <DefaultModal setIsOpenModal={setModal} action="Add" />}
    </div>
  );
}
