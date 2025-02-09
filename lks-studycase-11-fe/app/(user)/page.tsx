import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-5">
      {" "}
      <Link href={"/consultations"} className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
        Consultations
      </Link>
      <Link href={"/spotList"} className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
        Spot List
      </Link>
      <Link href={"/vaccinations"} className="bg-yellow-400 border-2 font-medium border-yellow-400 rounded-lg px-3 py-1.5">
        vaccinations
      </Link>
    </div>
  );
}
