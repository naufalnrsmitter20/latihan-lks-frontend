"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const data = new FormData(e.target);
      const EntryData = Object.fromEntries(data.entries());
      console.log(EntryData);

      const response = await fetch("http://localhost:8000/api/v1/auth/LoginSociety", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EntryData),
      });
      const payload = await response.json();
      if (!response.ok) {
        toast.error(payload.message, { id: toastId });
        return;
      }
      toast.success(payload.message, { id: toastId });
      localStorage.setItem("token", payload.data.login_tokens);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-xl w-full shadow-sm border-2 border-gray-500 rounded-lg p-4">
        <h1 className="text-xl font-semibold my-3">Login Society</h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="id_card_number">
              id card number
            </label>
            <input type="text" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="id_card_number" />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="password">
              password
            </label>
            <input type="password" className="px-4 py-2 rounded-lg border-2 border-yellow-500 outline-none hover:border-yellow-600 focus:ring-2 focus:ring-yellow-200" name="password" />
          </div>
          <div className="py-2">
            <button type="submit" className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
