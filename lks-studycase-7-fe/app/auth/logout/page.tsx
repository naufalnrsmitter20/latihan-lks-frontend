import VerifyToken from "@/lib/VerifyToken";
import React from "react";
import Logout from "./Logout";

export default function LogoutPage() {
  return (
    <VerifyToken>
      <Logout />
    </VerifyToken>
  );
}
