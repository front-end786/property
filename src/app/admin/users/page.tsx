"use client";
import React, { useState } from "react";
import RegisterForm from "@/components/admin/user/RegisterForm";
import UserList from "@/components/admin/user/UserTable";

function User() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleRegisterForm = () => {
    setShowRegisterForm(prevState => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleRegisterForm}
        className="py-5  rounded-lg shadow-lg bg-black text-white text-2xl font-bold px-3 hover:bg-gray-900"
      >
        {showRegisterForm ? "Hide Register Form" : "Show Register Form"}
      </button>
      {showRegisterForm && <RegisterForm />}
      <UserList />
    </>
  );
}

export default User;
