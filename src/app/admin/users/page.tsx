"use client";
import React from "react";
import RegisterForm from "@/components/admin/user/RegisterForm";
import UserList from "@/components/admin/user/UserTable";

function UserRegister() {
  return (
    <>
      <RegisterForm />
      <UserList/>
    </>
  );
}

export default UserRegister;
