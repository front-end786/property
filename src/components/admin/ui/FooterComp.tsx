import React from "react";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";

function FooterSticky() {
  return (
    <div className="flex bg-black fixed bottom-0 w-full justify-between px-12 py-5">
      <Edit />
      <Delete />
      <Help />
    </div>
  );
}

function Edit() {
  return (
    <div className="cursor-pointer text-white border border-white rounded-full py-2 px-6 shadow-md hover:scale-110 hover:bg-white hover:border-none hover:text-black hover:shadow-2xl">
      <button className="text-inherit flex font-bold text-2xl items-center gap-4">
        Edit <FaEdit />
      </button>
    </div>
  );
}

function Delete() {
  return (
    <div className="cursor-pointer text-white border border-white rounded-full py-2 px-6 shadow-md hover:scale-110 hover:bg-white hover:border-none hover:text-black hover:shadow-2xl">
      <button className="text-inherit flex font-bold text-2xl items-center gap-4">
        Delete <BiTrash />
      </button>
    </div>
  );
}

function Help() {
  return (
    <div className="cursor-pointer text-white border border-white rounded-full py-2 px-6 shadow-md hover:scale-110 hover:bg-white hover:border-none hover:text-black hover:shadow-2xl">
      <button className="text-inherit flex font-bold text-2xl items-center gap-4">
        Help <IoMdHelpCircle />{" "}
      </button>
    </div>
  );
}

export default FooterSticky;
