"use client";
import { decodeToken } from "@/lib/decodeToken";
import { JWTDataPayload } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

export default function RouteProtected({ children }: { children: ReactNode }) {
  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    const token = decodeToken(tempToken as string);
    const payload = token as JWTDataPayload;
    if (payload && payload.userData.role !== "ADMIN") {
      redirect("/");
    }
  });

  return <>{children}</>;
}
