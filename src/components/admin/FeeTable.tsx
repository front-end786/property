import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

// Define interface for row data
interface TableRowProps {
  id: number;
  start: string;
  end: string;
  onDelete: (id: number) => void;
  onSplit: () => void;
  onInputChange: (id: number, field: string, value: string) => void;
}

function TableRow({
  id,
  start,
  end,
  onDelete,
  onSplit,
  onInputChange,
}: TableRowProps) {
  return (
    <div className="datatable my-6">
      <div className="inputs">
        <input
          type="text"
          placeholder="Start"
          value={start}
          onChange={(e) => onInputChange(id, "start", e.target.value)}
        />
        <input
          type="text"
          placeholder="End"
          value={end}
          onChange={(e) => onInputChange(id, "end", e.target.value)}
        />
      </div>
      <div className="valuesdata items-center justify-start">
        <div>
          <label>£</label> <input type="text" value={450.0} />
        </div>
        <input type="checkbox" name="#" id={`checkbox-${id}`} className="" />
        <div>&nbsp;</div>
        <input type="checkbox" name="#" id={`checkbox-${id}`} className="w-8" />
        <div className="flex gap-12">
          <button
            className="bg-blue-600 px-7 py-2 text-2xl text-white font-semibold rounded-md shadow-md"
            onClick={onSplit}
          >
            Split
          </button>
          <button onClick={() => onDelete(id)}>
            <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeeTable() {
  // Define the initial state for rows
  const [rows, setRows] = useState<
    { id: number; start: string; end: string }[]
  >([{ id: 0, start: "0", end: "100" }]);

  // Function to add a new row
  const addRow = () => {
    const newRows = rows.map((row) => ({
      ...row,
      end: (parseInt(row.end) + 100).toString(), // Increase end by 100
    }));

    // Determine the last row's new start and end values
    const lastRow = rows[rows.length - 1];
    const newStart = (parseInt(lastRow.end) + 1).toString();
    const newEnd = (parseInt(newStart) + 100).toString();

    setRows([...newRows, { id: rows.length, start: newStart, end: newEnd }]);
  };

  // Function to delete a row
  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Function to handle input changes
  const handleInputChange = (id: number, field: string, value: string) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="row">
      <div>
        <div className="flex justify-between">
          <p className="text-center w-[50%] font-bold text-gray-900 text-xl">
            Property Value
          </p>
          <div className="flex w-[50%] gap-14">
            <p className="w-80 font-bold text-gray-900 text-xl text-center">
              Legal Fees
            </p>
            <p className="font-bold text-gray-900 text-xl text-center">
              Percentage of Value
            </p>
            <p className="font-bold text-gray-900 text-xl text-center">
              Plused Fixed Fee
            </p>
            <p className="font-bold text-gray-900 text-xl text-center">
              Priced on Application
            </p>
            <p className="font-bold text-gray-900 text-xl text-center">
              Action
            </p>
          </div>
        </div>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            id={row.id}
            start={row.start}
            end={row.end}
            onDelete={deleteRow}
            onSplit={addRow}
            onInputChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );
}

export default FeeTable;
