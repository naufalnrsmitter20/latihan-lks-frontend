"use client";
import { UserDataPayload } from "@/lib/utilities";
import React, { Dispatch, FormEvent, useState } from "react";

export const ModalAdd = ({ setisopen }: { setisopen: Dispatch<React.SetStateAction<boolean>> }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        body: JSON.stringify({ username, password, role }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response) {
        setError(data.message);
      }
      if (response.status === 403) {
        setError(data.message);
      }
      if (response.status === 200) {
        alert(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      throw error;
    }
  };

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-45 z-10"></div>
      <form method="POST" onSubmit={handleSubmit} className="mx-auto fixed top-0 left-[35%] z-40 bg-white max-w-xl w-full rounded-lg border border-slate-400 mt-40 p-5" action="">
        <div className="w-full flex justify-end">
          <button onClick={() => setisopen(false)} className="my-3 p-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600" type="button">
            Close
          </button>
        </div>
        <h1 className="text-center text-lg font-semibold">Add User</h1>
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              Username
            </label>
            <input
              placeholder="masukkan username"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              Password
            </label>
            <input
              placeholder="masukkan password"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              Role
            </label>
            <select className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option className="selection:text-slate-500" disabled value="">
                Select
              </option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CASHIER">CASHIER</option>
              <option value="GASDANG">GASDANG</option>
            </select>
          </div>
        </div>
        <button className="my-3 p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600" type="submit">
          Submit
        </button>
        <p className="text-red-500">{error && error}</p>
      </form>
    </div>
  );
};
export const ModalUpddate = ({ setisopen, dataUser }: { setisopen: Dispatch<React.SetStateAction<boolean>>; dataUser?: UserDataPayload }) => {
  const [username, setUsername] = useState<string>(dataUser?.username || "");
  const [password, setPassword] = useState<string>(dataUser?.password || "");
  const [role, setRole] = useState<string>(dataUser?.role || "");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (dataUser) {
        const response = await fetch(`http://localhost:8000/api/user/${dataUser.id}`, {
          method: "PUT",
          body: JSON.stringify({ username: username, password: password, role: role }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const payload = await response.json();
        if (payload.status === false) {
          alert(payload.message);
        }
        if (payload.status === true) {
          alert(payload.message);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      throw error;
    }
  };

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-45 z-10"></div>
      <form method="POST" onSubmit={handleSubmit} className="mx-auto fixed top-0 left-[35%] z-40 bg-white max-w-xl w-full rounded-lg border border-slate-400 mt-40 p-5" action="">
        <div className="w-full flex justify-end">
          <button onClick={() => setisopen(false)} className="my-3 p-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600" type="button">
            Close
          </button>
        </div>
        <h1 className="text-center text-lg font-semibold">Add User</h1>
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              Username
            </label>
            <input
              placeholder="masukkan username"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              Password
            </label>
            <input
              placeholder="masukkan password"
              className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-800" htmlFor="username">
              Role
            </label>
            <select className="px-2 py-2 rounded-lg border border-slate-600 hover:ring-2 hover: ring-slate-100" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option className="selection:text-slate-500" disabled value="">
                Select
              </option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CASHIER">CASHIER</option>
              <option value="GASDANG">GASDANG</option>
            </select>
          </div>
        </div>
        <button className="my-3 p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600" type="submit">
          Submit
        </button>
        <p className="text-red-500">{error && error}</p>
      </form>
    </div>
  );
};
