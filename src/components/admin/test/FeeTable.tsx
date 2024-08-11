import React, { FC, useState, useCallback } from 'react';
import  {QuoteTypeEnum}  from '@/store'; // Import QuoteTypeEnum
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmModal from "./ConfirmModal"
interface TableRowProps {
  id: number;
  start: string;
  end: string;
  legalFees: number;
  percentageOfValue: boolean;
  plusedFixedFee: boolean;
  pricedOnApplication: boolean;
  onDelete: (id: number) => void;
  onSplit: (id: number) => void;
  onInputChange: (id: number, field: string, value: string | number | boolean) => void;
  isFirstRow: boolean;
  isOnlyRow: boolean;
  type: string; // Add type prop
}

const TableRow: FC<TableRowProps> = ({
  id,
  start,
  end,
  legalFees,
  percentageOfValue,
  plusedFixedFee,
  pricedOnApplication,
  onDelete,
  onSplit,
  onInputChange,
  isFirstRow,
  isOnlyRow,
  type, // Destructure type prop
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = useCallback(
    (field: string, value: string | number | boolean) => {
      onInputChange(id, field, value);
    },
    [id, onInputChange]
  );

  return (
    <div className="datatable my-6 flex items-center">
      <div className="inputs flex-1">
        <input
          type="number"
          placeholder="Start"
          value={start}
          onChange={(e) => handleInputChange("start", e.target.value)}
        />
        <input
          type="number"
          placeholder="End"
          value={end}
          onChange={(e) => handleInputChange("end", e.target.value)}
        />
      </div>
      <div className="valuesdata flex-1 flex items-center justify-between">
        <div className="flex items-center">
          <label>£</label>
          <input
            type="number"
            value={legalFees}
            onChange={(e) =>
              handleInputChange("legalFees", parseFloat(e.target.value))
            }
          />
        </div>
        <input
          type="checkbox"
          checked={percentageOfValue}
          onChange={(e) =>
            handleInputChange("percentageOfValue", e.target.checked)
          }
        />
        <input
          type="checkbox"
          checked={plusedFixedFee}
          onChange={(e) =>
            handleInputChange("plusedFixedFee", e.target.checked)
          }
        />
        <input
          type="checkbox"
          checked={pricedOnApplication}
          onChange={(e) =>
            handleInputChange("pricedOnApplication", e.target.checked)
          }
        />
        <div className="flex gap-4">
          {isOnlyRow ? (
            <button
              className="bg-blue-600 px-7 py-2 text-2xl text-white font-semibold rounded-md shadow-md"
              onClick={() => onSplit(id)}
            >
              <FaPlus />
            </button>
          ) : (
            <>
              {!isFirstRow && (
                <button
                  className="bg-blue-600 px-7 py-2 text-2xl text-white font-semibold rounded-md shadow-md"
                  onClick={() => onSplit(id)}
                >
                  Split
                </button>
              )}
              <button onClick={() => setShowConfirmModal(true)}>
                <FaRegTrashAlt
                  className={`${
                    !isFirstRow ? "" : "ms-32"
                  } w-8 h-8 shadow-md cursor-pointer `}
                />
              </button>
            </>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          onDelete(id);
        }}
      />
    </div>
  );
};

const FeeTable: FC<{  type: string;}> = ({ type }) => {
  const [rows, setRows] = useState<
    {
      id: number;
      start: string;
      end: string;
      legalFees: number;
      percentageOfValue: boolean;
      plusedFixedFee: boolean;
      pricedOnApplication: boolean;
    }[]
  >([
    {
      id: 1,
      start: "0",
      end: "100",
      legalFees: 450,
      percentageOfValue: false,
      plusedFixedFee: false,
      pricedOnApplication: false,
    },
  ]);

  const addRow = useCallback((id: number) => {
    setRows((prevRows) => {
      const index = prevRows.findIndex((row) => row.id === id);
      const lastRow = prevRows[index];
      const lastStart = parseInt(lastRow.end, 10);
      const lastEnd =
        lastStart + parseInt(lastRow.end, 10) - parseInt(lastRow.start, 10);

      const newRow = {
        id: Date.now(),
        start: (lastStart + 1).toString(),
        end: lastEnd.toString(),
        legalFees: lastRow.legalFees,
        percentageOfValue: lastRow.percentageOfValue,
        plusedFixedFee: lastRow.plusedFixedFee,
        pricedOnApplication: lastRow.pricedOnApplication,
      };

      return [
        ...prevRows.slice(0, index + 1),
        newRow,
        ...prevRows.slice(index + 1),
      ];
    });
  }, []);

  const deleteRow = useCallback((id: number) => {
    setRows((prevRows) => {
      if (prevRows.length === 1 && id === 1) {
        return [
          {
            ...prevRows[0],
            start: "",
            end: "",
            legalFees: 0,
            percentageOfValue: false,
            plusedFixedFee: false,
            pricedOnApplication: false,
          },
        ];
      }
      return prevRows.filter((row) => row.id !== id);
    });
  }, []);

  const handleInputChange = useCallback(
    (id: number, field: string, value: string | number | boolean) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, [field]: value } : row
        )
      );
    },
    []
  );

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
        {rows.map((row, index) => (
          <TableRow
            key={row.id}
            {...row}
            onDelete={deleteRow}
            onSplit={addRow}
            onInputChange={handleInputChange}
            isFirstRow={index === 0}
            isOnlyRow={rows.length === 1}
            type={type} // Pass type prop to TableRow
          />
        ))}
      </div>
    </div>
  );
};

export default FeeTable;
