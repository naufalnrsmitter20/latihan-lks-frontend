"use client";
import { useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData(e.target);
      const entryData = Object.fromEntries(formData);
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      });
      const payload = await res.json();
      if (!res.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success("success", { id: toastId });
      localStorage.setItem("login_tokens", payload.login_tokens);
      router.push("/");
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="rounded-lg border-2 max-w-lg w-full border-yellow-600 ring-4 ring-yellow-200 p-5">
        <h1 className="text-2xl font-semibold py-3">Login Page</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div>
            <label className="text-lg font-medium" htmlFor="id_card_number">
              id_card_number
            </label>
            <input className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" type="text" name="id_card_number" id="id_card_number" />
          </div>
          <div>
            <label className="text-lg font-medium" htmlFor="password">
              password
            </label>
            <input className="px-4 py-2 w-full border-2 rounded-lg outline-none border-yellow-400 hover:border-yellow-500 focus:ring-2 focus:ring-yellow-200" type="password" name="password" id="password" />
          </div>
          <div className="py-3">
            <button type="submit" className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-200 border-2 border-yellow-400 hover:border-yellow-500 duration-150">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
