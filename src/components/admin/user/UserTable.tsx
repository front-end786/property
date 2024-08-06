"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";

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
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 text-xl font-medium">{user.id}</td>
              <td className="px-4 py-2 text-xl font-medium">{user.name}</td>
              <td className="px-4 py-2 text-xl font-medium">{user.username}</td>
              <td className="px-4 py-2 text-xl font-medium">{user.email}</td>
              <td className="px-4 py-2 text-xl font-medium">
                {user.isAdmin ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 text-xl font-medium">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaUserEdit className="w-8 h-8 shadow-md cursor-pointer" />
                </button>
                <button className="">
                  <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
