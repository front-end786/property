import React from "react";
import { BiHelpCircle, BiHome, BiTrash } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

const tableData = [
  {
    id: "7878787687",
    nameSendto: "Jack and John",
    ownersName: "New Enquiries Team",
    primaryFor: "Clows and Clop",
    panels: "-",
  },
  {
    id: "7878787687",
    nameSendto: "Jack and John",
    ownersName: "New Enquiries Team",
    primaryFor: "Clows and Clop",
    panels: "-",
  },
  {
    id: "7878787687",
    nameSendto: "Jack and John",
    ownersName: "New Enquiries Team",
    primaryFor: "Clows and Clop",
    panels: "-",
  },
  {
    id: "7878787687",
    nameSendto: "Jack and John",
    ownersName: "New Enquiries Team",
    primaryFor: "Clows and Clop",
    panels: "-",
  },
  {
    id: "7878787687",
    nameSendto: "Jack and John",
    ownersName: "New Enquiries Team",
    primaryFor: "Clows and Clop",
    panels: "-",
  },
  {
    id: "7878787687",
    nameSendto: "Jack and John",
    ownersName: "New Enquiries Team",
    primaryFor: "Clows and Clop",
    panels: "-",
  },
];

const ButtonOptions: React.FC = () => (
  <div className="flex gap-3 items-center justify-center">
    <button className="bg-gray-500 text-slate-50 py-2 px-6 shadow-md rounded-md text-xl font-bold">
      Edit
    </button>
    <button className="bg-blue-600 text-slate-50 py-2 px-6 shadow-md rounded-md text-xl font-bold">
      Duplicate
    </button>
    <button className="py-2 px-6 shadow-md rounded-md text-xl font-bold border border-blue-600">
      Add to Website
    </button>
    <button className="text-4xl shadow-md">
      <BiTrash />
    </button>
  </div>
);

const CalculatorTable: React.FC = () => {
  const homeString = "Home > Admin >";

  return (
    <div>
      <div className="flex justify-between items-center mt-5 secondary-background p-4 rounded-md ">
        <div className="flex items-center gap-7">
          <p className="flex text-2xl font-bold text-white gap-3 items-center">
            <BiHome /> {homeString}
          </p>
          <p className="text-2xl font-bold text-white">Quote Calculators</p>
        </div>
        <div className="flex items-center gap-7">
          <button className="flex text-2xl font-bold text-white gap-3">
            <MdArrowDropDown className="text-3xl border border-white rounded-sm text-white" />{" "}
            More Option
          </button>
          <button className="flex text-2xl font-bold text-white gap-3 items-center">
            <BiHelpCircle className="text-3xl" /> Help
          </button>
        </div>
      </div>
      <table className="table-data w-full mt-8 shadow-md">
        <thead>
          <tr>
            {["Id", "Name & Send To", "Owners", "Primary For", "panels", "Options"].map((header) => (
              <th key={header} className="text-2xl p-2 capitalize">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((value, index) => (
                <td key={index} className="text-xl p-2 capitalize text-center">
                  {value}
                </td>
              ))}
              <td className="text-xl p-2 capitalize text-center">
                <ButtonOptions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculatorTable;