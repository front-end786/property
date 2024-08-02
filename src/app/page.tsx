import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl  cursor-pointer rounded-2xl bg-black px-8 py-6 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 text-white">
        <Link href="/admin"> Admin Page</Link>{" "}
      </h1>
      <h1 className="text-4xl cursor-pointer rounded-2xl bg-black px-8 py-6 hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 text-white">
        <Link href="/client"> Client Page</Link>{" "}
      </h1>
    </main>
  );
}
