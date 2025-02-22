import type { Metadata } from "next";
import "./../globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-start gap-x-4">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
