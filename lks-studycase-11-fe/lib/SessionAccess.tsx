"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function SessionAccess({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/AdminLogin");
    }
  });
  return <>{children}</>;
}
