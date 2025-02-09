"use client";
import { GetData } from "@/lib/getData";
import { DataBahanProps, UserDataPayload } from "@/lib/utilities";
import React, { useEffect, useState } from "react";

export default function LogSupply() {
  const [dataBahan, setDataBahan] = useState<DataBahanProps[]>([]);
  const [user, setUser] = useState<UserDataPayload[]>([]);
  useEffect(() => {
    const FetchUser = async () => {
      const response = await GetData("get-cashier");
      setUser(response);
      return response;
    };
    const FetchBahan = async () => {
      const response = await GetData("get-bahan");
      setDataBahan(response);
      return response;
    };
    FetchUser();
    FetchBahan();
  }, []);
  
  return (
    <div>
      <div>{JSON.stringify(dataBahan)}</div>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}
