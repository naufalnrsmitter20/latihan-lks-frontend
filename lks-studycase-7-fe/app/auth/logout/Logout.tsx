"use client";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
export default function Logout() {
  const router = useRouter();
  const HandleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <button onClick={HandleLogout} className="my-3 p-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600" type="submit">
      Logout
    </button>
  );
}
