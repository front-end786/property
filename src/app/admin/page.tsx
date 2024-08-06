"use client";
import NavigationBar from "@/components/admin/Navigation";
import DynamicForm from "@/components/Form";
import Link from "next/link";
import React from "react";

function AdminPage() {
  return (
    // <div className="grid h-screen w-full place-items-center">
    //   <h1 className="h-full flex items-center gap-8">
    //     <Link className="client-link button-primary" href="/admin/calculator">
    //       Calculators
    //     </Link>
    //     <Link className="client-link button-primary" href="/admin/users">
    //       Users
    //     </Link>
    //     {/* <DynamicForm /> */}
    //   </h1>
    // </div>
    <NavigationBar />
  );
}

export default AdminPage;
