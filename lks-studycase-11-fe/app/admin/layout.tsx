import SessionAccess from "@/lib/SessionAccess";
import Sidebar from "@/app/admin/_components/Sidebar";
import "./../globals.css";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionAccess>
      <div className="flex justify-start w-full gap-x-6">
        <Sidebar />
        <div>{children}</div>
      </div>
    </SessionAccess>
  );
}
