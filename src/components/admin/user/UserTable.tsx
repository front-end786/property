"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import RegisterForm from "./RegisterForm";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isAdmin: boolean;
  password: string;
}

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get<User[]>("/api/user/userlist");
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
  }, []);

  const handleDelete = useCallback(async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/user/${userId}`);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } catch (err: any) {
        setError(err.message);
      }
    }
  }, [setUsers]);

  const handleUpdate = useCallback((updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  }, [setUsers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-6xl mb-4 font-bold text-gray-800 text-center">User List</h1>
      {editingUser && (
        <RegisterForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdate}
        />
      )}
      <table className="w-[95%] text-center table-data m-auto">
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
            <UserRow key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserRow: React.FC<{ user: User; onEdit: (user: User) => void; onDelete: (id: string) => void }> = React.memo(
  ({ user, onEdit, onDelete }) => (
    <tr>
      <td className="px-4 py-2 text-xl font-medium">{user.id}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.name}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.username}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.email}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.isAdmin ? "Yes" : "No"}</td>
      <td className="px-4 py-2 text-xl font-medium">
        <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => onEdit(user)}>
          <FaUserEdit className="w-8 h-8 shadow-md cursor-pointer" />
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(user.id)}>
          <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
        </button>
      </td>
    </tr>
  )
);

UserRow.displayName = 'UserRow';

export default UserList;