import React from "react";
import  FeeTable  from "./FeeTable";
import Supplement from "./supplement";
import Disbursements from "./disbursements";

function Sale() {
  return (
    <>
      <FeeTable />
      <div className="flex">
        <Supplement />
        <Disbursements />
      </div>
    </>
  );
}


export default Sale;