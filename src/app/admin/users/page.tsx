"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent, useCallback } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import NavigationBar from "@/components/admin/Navigation";
import Link from 'next/link';
import RegisterForm from "@/components/admin/user/RegisterForm";

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

interface RegisterFormProps {
  onRegister?: (newUser: User) => void;
  user?: User;
  onClose?: () => void;
  onUpdate?: (updatedUser: User) => void;
}

const initialUserState: User = {
  id: '',
  name: "",
  email: "",
  username: "",
  isAdmin: false,
  password: "",
};

const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

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

  const handleDelete = useCallback((userId: string) => {
    setDeletingUserId(userId);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deletingUserId) return;
    try {
      await axios.delete(`/api/user/${deletingUserId}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== deletingUserId));
      alert("User deleted successfully");
    } catch (err: any) {
      alert(`Failed to delete user: ${err.message}`);
    } finally {
      setDeletingUserId(null);
    }
  }, [deletingUserId, setUsers]);

  if (loading) return <div className="loader"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-6xl mb-4 font-bold text-gray-800 text-center">User List</h1>
      <table className="w-[95%] text-center table-data m-auto">
        <thead>
          <tr>
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
            <UserRow 
              key={user.id} 
              user={user} 
              onDelete={handleDelete} 
            />
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={!!deletingUserId}
        onClose={() => setDeletingUserId(null)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

const UserRow: React.FC<{ user: User; onDelete: (id: string) => void }> = React.memo(
  ({ user, onDelete }) => (
    <tr>
      <td className="px-4 py-2 text-xl font-medium">{user.id}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.name}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.username}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.email}</td>
      <td className="px-4 py-2 text-xl font-medium">{user.isAdmin ? "Yes" : "No"}</td>
      <td className="px-4 py-2 text-xl font-medium">
        <Link href={`/admin/users/${user.id}`}>
          <button className="text-blue-500 hover:text-blue-700 mr-2">
            <FaUserEdit className="w-8 h-8 shadow-md cursor-pointer" />
          </button>
        </Link>
        <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(user.id)}>
          <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
        </button>
      </td>
    </tr>
  )
);

UserRow.displayName = 'UserRow';

function User() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const toggleRegisterForm = () => {
    setShowRegisterForm(prevState => !prevState);
  };

  const handleNewUser = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setShowRegisterForm(false);
  };

  return (
    <>
      <NavigationBar />
      <button
        onClick={toggleRegisterForm}
        className="py-5 mt-64 rounded-lg shadow-lg bg-black text-white text-2xl font-bold px-3 hover:bg-gray-900"
      >
        {showRegisterForm ? "Hide Register Form" : "Show Register Form"}
      </button>
      {showRegisterForm && <RegisterForm onRegister={handleNewUser} />}
     
      <UserList 
        users={users} 
        setUsers={setUsers} 
      />
    </>
  );
}

export default User;