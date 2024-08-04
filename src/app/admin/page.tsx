"use client";
import Link from "next/link";
import React from "react";

function AdminPage() {
  return (
    <h1 className="">
      <Link className="client-link button-primary" href="/admin/calculator">
        Calculators
      </Link>
    </h1>
  );
}

export default AdminPage;
