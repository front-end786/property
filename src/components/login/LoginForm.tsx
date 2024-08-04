"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./inputs";
import Button from "./button";
import axios from "axios";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      console.log("Login success", response.data);

      const { isAdmin } = response.data;
      router.push(isAdmin ? "/admin" : "/client");
    } catch (error: any) {
      console.error("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <form
      onSubmit={onLogin}
      className="formLogin w-[35%] h-1/3  py-4 flex flex-col justify-between px-6 rounded-2xl"
    >
      <h2 className="text-5xl font-bold mb-7  text-gray-800 border-b pb-4">
        {loading ? "Processing" : "Sign in"}
      </h2>

  <div className=" bg-transparent">
  <div className="mb-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={user.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
          required
        />
      </div>
  </div>
      <Button type="submit">{loading ? "Signing In..." : "Sign In"}</Button>
    </form>
  );
};

export default LoginForm;
