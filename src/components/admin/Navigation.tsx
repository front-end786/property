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
    <nav className="  fixed w-full z-20 top-0 start-0  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  ">
            {data.map((i, index) => (
              <li key={index}>
                <Link
                  href={i.link}
                  className={` ${
                    pathname === i.link
                      ? " button-primary"
                      : " admin-link secondary-button"
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
