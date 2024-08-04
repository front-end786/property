import React, { useId, useState } from "react";
import { FeeTable } from "./sub_Components/feetable";

function Sale() {
  
  return (
    <div className="row">
      <div>
        <div className="flex justify-between">
          <p className="text-center w-[50%] font-bold text-gray-900 text-xl">
            Property Value
          </p>
          <div className="flex w-[50%] gap-14">
            <p className="w-80 font-bold text-gray-900 text-xl text-center">
              Leagel Fees
            </p>
            <p className="font-bold text-gray-900 text-xl text-center">
              Percentage of Value
            </p>
            <p className=" font-bold text-gray-900 text-xl text-center">
              Plused Fixed Fee
            </p>
            <p className="font-bold text-gray-900 text-xl text-center">
              Priced on Application
            </p>
          </div>
        </div>
        <div className="datatable">
          <div className="inputs">
            <input type="text" placeholder="0" />
            <input type="text" placeholder="150,000" />
          </div>
          <div className="valuesdata gap-14">
            <div className="w-80 flex">
              <label>£</label> <input type="text" value={450.0} />
            </div>
            <input type="checkbox" name="#" id="0" className="" />
            <div>&nbsp;</div>
            <input type="checkbox" name="#" id="0" className="mr-12" />
            <button
              onClick={handleAdd}
              className="bg-blue-600 px-7 py-0.5 text-2xl text-white font-semibold rounded-md shadow-md"
            >
              Split
            </button>
          </div>
        </div>
      </div>
      {crudObjectArr.map((item) => (
        <div>{item.comp}</div>
      ))}
    </div>
  );
}


export default Sale;