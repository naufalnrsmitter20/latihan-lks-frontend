import { redirect } from "next/navigation";
import React from "react";

export default function adminPage() {
  return redirect("/admin/manageUser");
}
