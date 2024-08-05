"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

function ClientPage() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      if (response.data.success) {
        alert(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="text-4xl">Client Page
    
    <button className="client-link button-primary " onClick={handleLogout}>
          Logout
        </button>
    </div>
  )
}

export default ClientPage