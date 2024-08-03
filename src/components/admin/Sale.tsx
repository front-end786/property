import React, { useId, useState } from "react";
import { FeeTable } from "./sub_Components/feetable";

function Sale() {
  const [addCrud, setAddcrud] = useState([]);
  const [crudName, setCrudName] = useState("");
  const crudListId = useId;

  const crudObjectArr = [
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
    {
      comp: <FeeTable />,
      id: crudListId,
    },
  ];
  const handleAdd = () => {};
  const deleteCrudList = () => {
    setAddcrud(addCrud.filter((item) => item.id !== crudListId));
  };
  return (
    <div className="row">
      <div>
        <div className="headtable">
          <p>Property Value</p>
          <div>
            <p>Leagel Fees</p>
            <p>Percentage of Value</p>
            <p>Plused Fixed Fee</p>
            <p>Priced on Application</p>
          </div>
        </div>
        <div className="datatable">
          <div className="inputs">
            <input type="text" placeholder="0" />
            <input type="text" placeholder="150,000" />
          </div>
          <div className="valuesdata">
            <div>
              <label>£</label> <input type="text" value={450.0} />
            </div>
            <input type="checkbox" name="#" id="0" />
            <div>&nbsp;</div>
            <input type="checkbox" name="#" id="0" />
            <button>Split</button>
          </div>
        </div>
      </div>
      {crudObjectArr.map((item) => (
        <div>{item.comp}</div>
      ))}
    </div>
  );
}


// How can I hide numbers indicator in input type num?
export default Sale;
