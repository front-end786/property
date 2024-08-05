"use client";
import DynamicForm from "@/components/Form";
import Link from "next/link";
import React from "react";

function AdminPage() {
  return (
    <h1 className="">
      <Link className="client-link button-primary" href="/admin/calculator">
        Calculators
      </Link>
      <Link className="client-link button-primary" href="/admin/users">
        Users
      </Link>
      <DynamicForm />
    </h1>
  );
}

export default AdminPage;
