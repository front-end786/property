"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImEqualizer, ImEqualizer2 } from "react-icons/im";

interface NavbarProps {
  isOpen: boolean;
  isAdmin: boolean;
  email: string;
  name: string;
  id: number;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Navigation: React.FC<NavbarProps> = ({
  toggleSidebar,
  handleLogout,
  isOpen,
  isAdmin,
  name,
  email,
  id,
}) => {
  const router = usePathname();
  const [pageTitle, setPageTitle] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    if (router) {
      const path = router
        .split("/")
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" > ");
      setPageTitle(path || "Admin");
    }
  }, [router]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <nav className="navbar">
      <div className="flex flex-row justify-between items-center">
        <button
          className="text-black py-2 px-4 font-bold text-6xl rounded-lg"
          onClick={toggleSidebar}
        >
          {isOpen ? <ImEqualizer2 /> : <ImEqualizer />}
        </button>
        <h1 className="text-2xl font-bold ml-4 w-96">{pageTitle}</h1>
      </div>

      <div className="flex flex-wrap w-full justify-end items-center">
        <div className="relative flex flex-col py-2 px-4">
          <button
            className="flex text-2xl rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
            onClick={toggleDropdown}
          >
            <Image
              src={isAdmin ? "/assets/admin.webp" : "/assets/clientAvatar.webp"}
              alt="profile"
              className="cursor-pointer rounded-full"
              width={50}
              height={50}
            />
          </button>
          {dropdownOpen && ( // Conditional rendering for dropdown
            <div className="absolute right-0 top-[7.2rem] z-10 w-fit bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 border-b-2 border-gray-300 text-2xl  text-gray-900 dark:text-white">
                <div className=" font-bold">{name}</div>
                <div className="font-medium truncate">{email}</div>
              </div>
              <ul className="py-2 text-xl text-gray-700  dark:text-gray-200">
                <li className=" border-b-2 border-gray-300">
                  <Link
                    href={`/admin/users/${id}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <div className="py-2 ">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
