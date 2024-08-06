import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navigation() {
  const pathname = usePathname();
  const data = [
    { link: "/", name: "Home" },
    { link: "/admin", name: "Admin" },
    { link: "/admin/users", name: "Users" },
    { link: "/admin/calculator", name: "Calculators" },
  ];
  return (
    <nav className="bg-black text3 fixed w-full z-20 top-0 start-0 border-b border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div></div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
         
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black">
            {data.map((i, index) => (
              <li key={index}>
                <Link
                  href={i.link}
                  className={`block  rounded md:p-0 text-3xl  py-2 px-3 ${
                    pathname === i.link
                      ? " text-blue-400 hover:text-white hover:font-semibold "
                      : " text-white hover:text-blue-400"
                  }`}
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;