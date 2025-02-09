"use client";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserPayload } from "./utilities";

export const ProtectedAdmin = () => {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }
      const data = jwtDecode<UserPayload>(token as string);
      if (data.role !== "ADMIN") {
        router.push("/accessDenied");
      }
      setIsAuthorized(true);
    }
  }, [router]);

  if (isAuthorized === null) {
    return "Loading...";
  }

  return null;
};

export const ProtectedCashier = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/auth/login");
      }
      const data = jwtDecode<UserPayload>(token as string);
      if (data.role !== "CASHIER") {
        router.push("/accessDenied");
      }
      setIsAuthorized(true);
    }
  }, [router]);
  if (isAuthorized === null) {
    return "Loading...";
  }

  return null;
};
export const ProtectedGasdang = () => {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/auth/login");
      }
      const data = jwtDecode<UserPayload>(token as string);
      if (data.role !== "GASDANG") {
        router.push("/accessDenied");
      }
      setIsAuthorized(true);
    }
  }, [router]);

  if (isAuthorized === null) {
    return "Loading...";
  }
  return null;
};
