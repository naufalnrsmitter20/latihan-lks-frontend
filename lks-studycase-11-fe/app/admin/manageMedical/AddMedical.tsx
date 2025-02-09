import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";

export default function AddMedical() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-3">Data Medical</h1>
        <button onClick={() => setModal(true)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
          Add Medical
        </button>
      </div>
      {modal && <Modal action="add" setIsOpenModal={setModal} />}
    </>
  );
}
