"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ImEqualizer, ImEqualizer2 } from "react-icons/im";
import { useRouter } from "next/navigation";

interface MenuItem {
  link: string;
  name: string;
}
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const SideBar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Added state for isAdmin
  const router = useRouter();
  useEffect(() => {
    const fetchAdminStatus = async () => {
      const response = await axios.get(`/api/user/profile`);
      setIsAdmin(response.data.data.isAdmin); // Set isAdmin state
    };
    fetchAdminStatus();
  }, []); // Fetch admin status on component mount

  const data: MenuItem[] = isAdmin 
    ? [ // Show all links if isAdmin is true
        { link: "/admin", name: "Admin" },
        { link: "/admin/users", name: "Users" },
        { link: "/admin/calculator", name: "Calculators" },
        { link: "/client", name: "Client" },
      ] 
    : [ // Show only Client link if isAdmin is false
        { link: "/client", name: "Client" },
      ];
     
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
    <div
      
      >
      <button
        onClick={toggleSidebar}
        className=" text-black py-2 px-4 font-bold text-6xl rounded-lg fixed top-4 left-4 z-50"
      >
        {!isOpen ? <ImEqualizer /> : <ImEqualizer2 />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full transition-transform duration-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[28rem] sidebar shadow-lg`}
      >
        {/* Ensure this div is visible when isOpen is true */}
        <div className="flex flex-col items-center gap-6 p-4 mt-24">
          <Image
            src="/assets/profile-icon.png"
            width={200}
            height={200}
            className="rounded-full border border-gray-400"
            alt="profile"
          />
          <ul className="w-full">
            {data.map((item) => (
              <li
                key={item.name}
                className="w-full flex items-center hover:bg-slate-100"
              >
                <Link
                  href={isAdmin ? item.link : "/"} // Updated link logic
                  className="block text-2xl font-bold text-center my-2 bg-gray-200 w-full py-2"
                >
                  {item.name} 
                </Link>
              </li>
            ))}
          </ul>
          <button  onClick={handleLogout} className="bg-black text-2xl py-2 px-4 w-full text-white hover:bg-gray-800 font-bold shadow-lg rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;