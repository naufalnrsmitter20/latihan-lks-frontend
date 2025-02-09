"use client";
import { login } from "@/lib/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
interface UserPayload extends JwtPayload {
  username: string;
  role: string;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  const user: UserPayload = JSON.parse(userData as string);
  const router = useRouter();
  if (token) {
    if (user.role === "ADMIN") {
      router.push("/admin");
    } else if (user.role === "CASHIER") {
      router.push("/cashier");
    } else if (user.role === "GASDANG") {
      router.push("/gasdang");
    } else {
      router.push("/accessDedied");
    }
  }

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      localStorage.setItem("authToken", token);
      const data = jwtDecode<UserPayload>(token as string);
      localStorage.setItem("userData", JSON.stringify(data));
      alert("Login success");
      if (data.role === "ADMIN") {
        router.push("/admin");
      } else if (data.role === "CASHIER") {
        router.push("/cashier");
      } else if (data.role === "GASDANG") {
        router.push("/gasdang");
      } else {
        router.push("/accessDedied");
      }
    } catch (error) {
      setError((error as Error).message);
      console.log((error as Error).message);
      throw error;
    }
  };

  return (
    <div className="w-screen h-full">
      <form method="POST" onSubmit={handleLogin} className="mx-auto max-w-xl w-full rounded-lg border border-slate-400 mt-40 p-5" action="">
        <h1 className="text-center text-lg font-semibold">Login Page</h1>
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
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="my-3 p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600" type="submit">
          Submit
        </button>
        <p className="text-red-500">{error && error}</p>
      </form>
    </div>
  );
}
