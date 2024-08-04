import React from "react";
import Supplement from "./Supplement";
import Disbursements from "./ExtraFeilds";
import FeeTable from "./FeeTable";
import ExtraFeilds from "./ExtraFeilds";

function BaseComp() {
  return (
    <div>
      <FeeTable />
      <div className=" flex flex-row border-t mt-10 pt-10 border-gray-400">
        <ExtraFeilds Heading="Supplement (ex.VAT)" />
        <ExtraFeilds Heading="Disbursements (ex.VAT)" />
      </div>
    </div>
  );
}

export default BaseComp;
