import React, { Dispatch, SetStateAction, useState } from "react";
import ModalUser from "./ModalUser";

export default function AddUser() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-3">Data User</h1>
        <button onClick={() => setModal(true)} type="button" className="bg-green-400 border-2 font-medium border-green-400 rounded-lg px-3 py-1.5">
          Add User
        </button>
      </div>
      {modal && <ModalUser action="add" setIsOpenModal={setModal} />}
    </>
  );
}
