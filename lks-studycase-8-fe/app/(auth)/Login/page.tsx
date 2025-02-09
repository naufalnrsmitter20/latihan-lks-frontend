"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userPayload, setUserPayload] = useState<any>();
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userPayload = JSON.parse(localStorage.getItem("role") as string);
    setUserPayload(userPayload);
    setToken(token as string);
  }, []);
  async function HandleLogin(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res) {
      setError("Failed to fetch");
    }
    const data = await res.json();
    if (!data.status) {
      setError(data.message);
    } else {
      setError("");
      alert(data.message);
      localStorage.setItem("token", data[0].token);
      localStorage.setItem("role", JSON.stringify(data[0].role));
      setIsLogin(true);
      window.location.reload();
    }
  }

  async function HandleLogout() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/v1/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!data.status) {
        setError(data.message);
      }
      setError("");
      alert(data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.reload();
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex w-full h-screen justify-center items-center">
      {!isLogin && !token ? (
        <form method="POST" onSubmit={HandleLogin} className="rounded-md border border-slate-400 mx-auto p-4 max-w-3xl w-full">
          <p className="text-xl mb-6 text-black font-semibold">Halaman Login</p>
          <div className="space-y-2 mb-2">
            <label className="text-base font-semibold text-slate-700" htmlFor="username">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
              placeholder="Masukkan username anda"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="space-y-2 mb-2">
            <label className="text-base font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
              placeholder="Masukkan password anda"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200 rounded-md border-2 mt-2 text-white font-semibold border-blue-600">
            Login
          </button>
          <p className="text-red-500 text-sm my-3"> {error && error}</p>
        </form>
      ) : (
        <section className="flex justify-center gap-x-4">
          {userPayload == "ADMIN" ? (
            <button onClick={() => router.push("/manageUser")} type="button" className="px-4 py-2 bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-200 rounded-md border-2 mt-2 text-white font-semibold border-green-600">
              Admin Panel
            </button>
          ) : (
            <button onClick={() => router.push("/user")} type="button" className="px-4 py-2 bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-200 rounded-md border-2 mt-2 text-white font-semibold border-green-600">
              User Panel
            </button>
          )}
          <button onClick={HandleLogout} type="button" className="px-4 py-2 bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-200 rounded-md border-2 mt-2 text-white font-semibold border-red-600">
            Logout
          </button>
          <p className="text-black text-lg font-semibold">{userPayload?.username}</p>
        </section>
      )}
    </section>
  );
}
