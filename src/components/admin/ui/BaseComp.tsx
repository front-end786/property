
import React, { useState, useCallback, useEffect } from "react";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";

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
  onInputChange: (
    id: number,
    field: string,
    value: string | number | boolean
  ) => void;
  isFirstRow: boolean;
  isOnlyRow: boolean;
}

function TableRow({
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
}: TableRowProps) {
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
}

interface FeeTableRow {
  start: string;
  end: string;
  legalFees: number;
  percentageOfValue: boolean;
  plusedFixedFee: boolean;
  pricedOnApplication: boolean;
}

function FeeTable({ quoteTypeId, onDataChange }: { quoteTypeId: number | null, onDataChange: (data: FeeTableRow[]) => void }) {
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

  useEffect(() => {
    onDataChange(rows);
  }, [rows, onDataChange]);

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
        end: lastEnd.toString() ,
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
          />
        ))}
      </div>
    </div>
  );
}
const selectedOptions = [
  "Client is Company",
  "Client is Individual",
  "Client is Government",
  "Client is Non-Profit",
  "Client is Other",
];

const checkboxValues = [
  "Free",
  "Only show once on Join quotes",
  "Per individual",
  "Variable",
  "Price on Application",
];

interface FieldProps {
  onRemove: () => void;
  onChange: (data: any) => void;
  data: any;
}

const Field: React.FC<FieldProps> = React.memo(({ onRemove, onChange, data }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...data, [name]: newValue });
  }, [onChange, data]);

  return (
    <div className="flex flex-col mt-6">
      <div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              className="px-3 py-2 text-xl text-gray-600 items-center flex bg-gray-300 rounded-md"
              value={data.type}
              onChange={handleInputChange}
            >
              {selectedOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="text-left"
              value={data.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="price">Price(£)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              className="text-left"
              value={data.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex gap-9 py-5 border-b border-gray-400">
          <p className="font-bold text-xl">Options:</p>
          <div className="flex gap-8 flex-wrap">
            {checkboxValues.map((item) => (
              <div key={item} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={item}
                  name={item.toLowerCase().replace(/ /g, '_')}
                  checked={data[item.toLowerCase().replace(/ /g, '_')]}
                  onChange={handleInputChange}
                />
                <label htmlFor={item} className="text-gray-800 text-xl">{item}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-end mt-20">
            <button onClick={() => setShowConfirmModal(true)}>
              <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          onRemove();
        }}
      />
    </div>
  );
});

Field.displayName = 'Field';

interface ExtraFieldsProps {
}

interface FieldData {
  id: number;
  data: {
    name: string;
    price: string;
    free: boolean;
    only_show_once_on_join_quotes: boolean;
    per_individual: boolean;
    variable: boolean;
    price_on_application: boolean;
  };
}

const Supplement: React.FC<ExtraFieldsProps & { quoteTypeId: number | null, onDataChange: (data: FieldData[]) => void }> = ({ quoteTypeId, onDataChange }) => {
  const [fields, setFields] = useState<FieldData[]>([
    {
      id: 1,
      data: {
        name: '',
        price: '',
        free: false,
        only_show_once_on_join_quotes: false,
        per_individual: false,
        variable: false,
        price_on_application: false
      }
    }
  ]);

  useEffect(() => {
    onDataChange(fields);
  }, [fields, onDataChange]);

  const addField = useCallback(() => {
    setFields((prevFields) => [...prevFields, { id: prevFields.length + 1, data: {
      name: '',
      price: '',
      free: false,
      only_show_once_on_join_quotes: false,
      per_individual: false,
      variable: false,
      price_on_application: false
    } }]);
  }, []);

  const removeField = useCallback((id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  }, []);

  const updateField = useCallback((id: number, newData: any) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, data: newData } : field
      )
    );
  }, []);

  return (
    <div className="w-[50%] px-4">
      <h2 className="text-3xl font-bold text-gray-800 my-5">{`Supplement (ex.VAT)`}</h2>
      {fields.map((field) => (
        <Field
          key={field.id}
          onRemove={() => removeField(field.id)}
          onChange={(newData) => updateField(field.id, newData)}
          data={field.data}
        />
      ))}
      <button
        className="bg-blue-600 text-xl rounded-lg font-bold text-white px-5 py-2 mt-4"
        onClick={addField}
      >
        Add {`Supplements`}
      </button>
    </div>
  );
};
const Disbursements: React.FC<ExtraFieldsProps & { quoteTypeId: number | null, onDataChange: (data: FieldData[]) => void }> = ({ quoteTypeId, onDataChange }) => {
  const [fields, setFields] = useState<FieldData[]>([
    {
      id: 1,
      data: {
        name: '',
        price: '',
        free: false,
        only_show_once_on_join_quotes: false,
        per_individual: false,
        variable: false,
        price_on_application: false
      }
    }
  ]);

  useEffect(() => {
    onDataChange(fields);
  }, [fields, onDataChange]);

  const addField = useCallback(() => {
    setFields((prevFields) => [...prevFields, { id: prevFields.length + 1, data: {
      name: '',
      price: '',
      free: false,
      only_show_once_on_join_quotes: false,
      per_individual: false,
      variable: false,
      price_on_application: false
    } }]);
  }, []);

  const removeField = useCallback((id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  }, []);

  const updateField = useCallback((id: number, newData: any) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, data: newData } : field
      )
    );
  }, []);

  return (
    <div className="w-[50%] px-4">
      <h2 className="text-3xl font-bold text-gray-800 my-5">{`Disbursements (ex.VAT)`}</h2>
      {fields.map((field) => (
        <Field
          key={field.id}
          onRemove={() => removeField(field.id)}
          onChange={(newData) => updateField(field.id, newData)}
          data={field.data}
        />
      ))}
      <button
        className="bg-blue-600 text-xl rounded-lg font-bold text-white px-5 py-2 mt-4"
        onClick={addField}
      >
        Add {`Disbursements`}
      </button>
    </div>
  );
};
const ConfirmModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-6">Are you sure you want to delete this field?</p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
};

function BaseComp({ quoteTypeId }: { quoteTypeId: number | null }) {
  const [isSaving, setIsSaving] = useState(false);
  const [feeTableData, setFeeTableData] = useState<FeeTableRow[]>([]);
  const [supplementData, setSupplementData] = useState<FieldData[]>([]);
  const [disbursementData, setDisbursementData] = useState<FieldData[]>([]);

  const handleSave = async () => {
    if (!quoteTypeId) return;
    setIsSaving(true);
    try {
      const savePromises = [
        // Values
        ...feeTableData.map(row => axios.post('/api/values', {
          quoteTypeId,
          propertyValueStart: parseFloat(row.start),
          propertyValueEnd: parseFloat(row.end),
          legalFees: row.legalFees,
          percentageOfValue: row.percentageOfValue,
          plusFixedFee: row.plusedFixedFee,
          pricedOnApplication: row.pricedOnApplication
        })),
        // Supplements
        ...supplementData.map((field: FieldData) => axios.post('/api/supplements', {
          quoteTypeId,
          title: field.data.name,
          cost: parseFloat(field.data.price),
          free: field.data.free,
          joinQuotes: field.data.only_show_once_on_join_quotes,
          perIndividual: field.data.per_individual,
          variable: field.data.variable,
          pricedOnApplication: field.data.price_on_application
        })),
        // Disbursements
        ...disbursementData.map((field: FieldData) => axios.post('/api/disbursements', {
          quoteTypeId,
          title: field.data.name,
          cost: parseFloat(field.data.price),
          free: field.data.free,
          joinQuotes: field.data.only_show_once_on_join_quotes,
          perIndividual: field.data.per_individual,
          variable: field.data.variable,
          pricedOnApplication: field.data.price_on_application
        }))
      ];
      await Promise.all(savePromises);
      // Add success notification here if needed
    } catch (error) {
      console.error('Failed to save:', error);
      // Add error notification here if needed
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pb-20">
      <FeeTable quoteTypeId={quoteTypeId} onDataChange={setFeeTableData} />
      <div className="lg:flex-row items-center lg:items-start flex flex-col border-t mt-10 pt-10 border-gray-400">
        <Supplement quoteTypeId={quoteTypeId} onDataChange={setSupplementData}/>
        <Disbursements quoteTypeId={quoteTypeId} onDataChange={setDisbursementData}/>
      </div>
      <div className="fixed bottom-0 left-0 right-0  shadow-md p-4 flex justify-end">
        <button
          className="bg-black text-2xl rounded-lg font-bold text-white px-5 py-2"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
export default BaseComp