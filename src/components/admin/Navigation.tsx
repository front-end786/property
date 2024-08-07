import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function Navigation() {
  const [addStyle, setAddstyle] = useState(true);

  function scrollEvent() {
    if (window.screenY > 1) setAddstyle(true);
    else setAddstyle(false);
  }

  const pathname = usePathname();
  const data = [
    { link: "/", name: "Home" },
    { link: "/admin", name: "Admin" },
    { link: "/admin/users", name: "Users" },
    { link: "/admin/calculator", name: "Calculators" },
  ];
  return (
    <nav className={addStyle ? "border-b border-gray-500 h-[15]" : "h-[15vh]"}>
      <div className=" flex flex-wrap w-full justify-end p-8 items-center">
        <div className="">
          <ul className="flex justify-end w-full items-center gap-12">
            {data.map((i, index) => (
              <li key={index}>
                <Link
                  href={i.link}
                  className={` ${
                    pathname !== i.link
                      ? "font-bold text-2xl px-2 py-6 hover:border-b hover:border-gray-400"
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
