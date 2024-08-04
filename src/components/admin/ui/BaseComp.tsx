import React from "react";
import Supplement from "./Supplement";
import Disbursements from "./Disbursements";
import FeeTable from "./FeeTable";

function BaseComp() {
  return (
    <div>
      <FeeTable />
      <div className=" flex flex-row border-t mt-10 pt-10 border-gray-400">
        <Supplement />
        <Disbursements />
      </div>
    </div>
  );
}

export default BaseComp;
