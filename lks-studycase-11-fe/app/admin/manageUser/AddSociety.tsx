import React, { Dispatch, SetStateAction, useState } from "react";
import ModalUser from "./ModalUser";
import ModalSociety from "./ModalSociety";

export default function AddUSociety() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-3">Data Society</h1>
        <button onClick={() => setModal(true)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
          Add Society
        </button>
      </div>
      {modal && <ModalSociety action="add" setIsOpenModal={setModal} />}
    </>
  );
}
