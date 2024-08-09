"use client";
import SideBar from "@/components/admin/SideBar";
import React, { useState } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 mt-16 p-4 ${
          isOpen ? "ml-[28rem]" : "ml-0"
        } transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
