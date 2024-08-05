"use client";

import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const userApi = "http://localhost:3000/api/user/userlist";
  const id = useId();
  console.log(userApi, "SAU");

  const dummyData = [
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
    {
      name: "Jack",
      id,
      userName: "user123",
      email: "example@mail.com",
      admin: "admin",
      action: "action",
    },
  ];

  /*

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/userlist", {
          headers: { "Content-Type": "application/json" },
        });
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
*/
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-6xl mb-4 font-bold text-gray-800 text-center ">
        User List
      </h1>
      <table className=" w-[95%]  text-center table-data m-auto">
        <thead className="">
          <tr className="">
            <th className="py-2 px-4 text-2xl font-bold">ID</th>
            <th className="py-2 px-4 text-2xl font-bold">Name</th>
            <th className="py-2 px-4 text-2xl font-bold">Username</th>
            <th className="py-2 px-4 text-2xl font-bold">Email</th>
            <th className="py-2 px-4 text-2xl font-bold">Admin</th>
            <th className="py-2 px-4 text-2xl font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 border">{user.id}</td>
              <td className="py-2 border">{user.name}</td>
              <td className="py-2 border">{user.username}</td>
              <td className="py-2 border">{user.email}</td>
              <td className="py-2 border">{user.isAdmin ? "Yes" : "No"}</td>
              <td className="py-2 border">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))} */}
          {dummyData.map((item) => (
            <tr className="">
              <td className="px-4 py-2 text-xl font-medium">{item.id}</td>
              <td className="px-4 py-2 text-xl font-medium">{item.name}</td>
              <td className="px-4 py-2 text-xl font-medium">{item.userName}</td>
              <td className="px-4 py-2 text-xl font-medium">{item.email}</td>
              <td className="px-4 py-2 text-xl font-medium">{item.admin}</td>
              <td className="px-4 py-2 text-xl font-medium">{item.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
