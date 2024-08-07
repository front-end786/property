"use client";
import NavigationBar from "@/components/admin/Navigation";
import CalculatorTable from "@/components/admin/ui/CalculatorTable";
import DynamicForm from "@/components/Form";
import Link from "next/link";
import React from "react";

function AdminPage() {
  return (
    <div className="grid h-screen w-full place-items-center">
    <NavigationBar />

      <h1 className="h-full flex items-center gap-8">
        <Link className="client-link button-primary" href="/admin/calculator">
          Calculators
        </Link>
        <Link className="client-link button-primary" href="/admin/users">
          Users
        </Link>
        {/* <DynamicForm /> */}
      </h1>
      <CalculatorTable/>
    </div>
  );
}

export default AdminPage;
