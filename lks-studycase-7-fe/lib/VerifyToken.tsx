"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function VerifyToken({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/auth/login");
      } else {
        setIsVerified(true);
      }
    }
  }, [router]);

  if (!isVerified) {
    return <p>Loading...</p>;
  }

  return <div>{children}</div>;
}
