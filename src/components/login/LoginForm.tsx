'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
import Input from './inputs';
import Button from './button';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      console.log("Login success", response.data);

      // Extract user data from response
      const { isAdmin } = response.data;

      // Redirect based on user role
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/client");
      }
      
      // toast.success("Login success");
    } catch (error: any) {
      console.log("Login failed", error.message);
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (user.email.length > 0 && user.password.length > 0) {
  //     setButtonDisabled(false);
  //   } else {
  //     setButtonDisabled(true);
  //   }
  // }, [user]);

  return (
    <form
      action={}
      className="max-w-md mx-auto mt-20 p-6 border-gray-300 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">
        {" "}
        {loading ? "Processing" : "Login"}
      </h2>

      <div className="mb-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={user.email}
          onChange={(e: { target: { value: any } }) =>
            setUser({ ...user, email: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e: { target: { value: any } }) =>
            setUser({ ...user, password: e.target.value })
          }
        />
      </div>
      <Button onClick={onLogin} type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
