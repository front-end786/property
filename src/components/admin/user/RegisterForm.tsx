import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
function RegisterForm() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    isAdmin: false,
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/user/register", user, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(`${user.name} registered successfully`, response.data);
      setUser({
        name: "",
        email: "",
        password: "",
        username: "",
        isAdmin: false,
      });
    } catch (error: any) {
      console.log("Registration failed", error.message);
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center  py-2 gap-8">
      <hr />
      <h1 className="text-left text-5xl py-4 font-bold text-gray-700">
        {loading ? "Processing" : "Register New User"}
      </h1>
      <form
        onSubmit={onSignup}
        className="flex flex-col gap-6 w-[400px] py-6 px-8 rounded-xl"
      >
        <div className="flex flex-col gap-2 w-full relative">
          <label htmlFor="name" className="text-gray-600 font-medium text-2xl">
            Your Name
          </label>
          <input
            className="py-2 px-4 text-left border border-gray-300 rounded-3xl mb-4  text-black shadow-sm"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="username"
            className="text-gray-600 font-medium text-2xl"
          >
            Username
          </label>
          <input
            className="py-2 px-4 text-left border border-gray-300 rounded-3xl mb-4  text-black shadow-sm"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-gray-600 font-medium text-2xl">
            Email
          </label>
          <input
            className="py-2 px-4 text-left border border-gray-300 rounded-3xl mb-4  text-black shadow-sm"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="password"
            className="text-gray-600 font-medium text-2xl"
          >
            Password
          </label>
          <input
            className="py-2 px-4 text-left border border-gray-300 rounded-3xl mb-4  text-black shadow-sm"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <div className="flex gap-3 w-full">
          <input
            type="checkbox"
            id="isAdmin"
            checked={user.isAdmin}
            onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })}
          />
          <label
            htmlFor="isAdmin"
            className="text-gray-600 font-medium text-2xl"
          >
            Admin
          </label>
        </div>
        <button
          type="submit"
          className="p-2  rounded-lg shadow-lg bg-black text-white text-xl font-bold py-3 hover:bg-gray-900"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Please Fill Details" : "Register New User"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm