import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
function RegisterForm() {
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
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "User Registration"}</h1>
        <hr />
        <form onSubmit={onSignup} className="flex flex-col items-center">
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
          />
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              id="isAdmin"
              checked={user.isAdmin}
              onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })}
            />
            Admin
          </label>
          <button
            type="submit"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Please Fill Details" : "Register New User"}
          </button>
        </form>
      </div>
    );
}

export default RegisterForm