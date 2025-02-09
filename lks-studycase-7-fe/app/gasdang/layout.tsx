import { ProtectedGasdang } from "@/lib/ProtectedPage";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProtectedGasdang />
      <body>
        <div className="flex justify-start gap-4">
          <Sidebar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
