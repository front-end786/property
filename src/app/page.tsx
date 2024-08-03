import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="starter">
      <h1 className="">
        <Link className="admin-link" href="/admin">
          {" "}
          Admin Page
        </Link>{" "}
      </h1>
      <h1 className="">
        <Link className="client-link button-primary" href="/client">
          {" "}
          Client Page
        </Link>{" "}
      </h1>
    </main>
  );
}
