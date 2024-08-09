"use client";
import React, { useState, useCallback, useEffect, FC, useMemo } from "react";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { useSnapshot } from "valtio";
import store from "@/store";

enum QuoteTypeEnum {
  SALE = "SALE",
  PURCHASE = "PURCHASE",
  REMORTGAGE = "REMORTGAGE",
  TRANSFER_OF_EQUITY = "TRANSFER_OF_EQUITY",
}

interface Button {
  label: string;
  component: FC<ComponentProps>;
  heading: string;
  quoteType: QuoteTypeEnum;
}

interface ComponentProps {
  quoteTypeId: number | null;
  feeTableData: FeeTableRow[];
  supplementData: FieldData[];
  disbursementData: FieldData[];
  onFeeTableDataChange: (data: FeeTableRow[]) => void;
  onSupplementDataChange: (data: FieldData[]) => void;
  onDisbursementDataChange: (data: FieldData[]) => void;
  onSave: (isSaving: boolean, handleSave: () => void) => void;
}

interface FieldProps {
  onRemove: () => void;
  onChange: (data: any) => void;
  data: any;
}

interface ExtraFieldsProps {}

interface FeeTableRow {
  id: number;
  start: string;
  end: string;
  legalFees: number;
  percentageOfValue: boolean;
  plusedFixedFee: boolean;
  pricedOnApplication: boolean;
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

interface QuoteTypeData {
  feeTableData: FeeTableRow[];
  supplementData: FieldData[];
  disbursementData: FieldData[];
}

interface QuoteTypeState {
  [key: string]: QuoteTypeData;
}

const TableRow: FC<TableRowProps> = React.memo(({
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
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = useCallback(
    (field: string, value: string | number | boolean) => {
      let parsedValue = value;
      if (field === "start" || field === "end" || field === "legalFees") {
        parsedValue = value === "" ? "" : Number(value);
      }
      onInputChange(id, field, parsedValue);
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
});

TableRow.displayName = 'TableRow';

const FeeTable: FC<{
  quoteTypeId: number | null;
  onDataChange: (data: FeeTableRow[]) => void;
  initialData: FeeTableRow[];
}> = ({ quoteTypeId, onDataChange, initialData }) => {
  const [rows, setRows] = useState<FeeTableRow[]>(() => 
    initialData.length === 0 ? [{
      id: 1,
      start: "",
      end: "",
      legalFees: 0,
      percentageOfValue: false,
      plusedFixedFee: false,
      pricedOnApplication: false,
    }] : initialData
  );

  useEffect(() => {
    const rowsChanged = JSON.stringify(rows) !== JSON.stringify(initialData);
    if (rowsChanged) {
      onDataChange(rows);
    }
  }, [rows, initialData, onDataChange]);

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
          />
        ))}
      </div>
    </div>
  );
};

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

const Field: FC<FieldProps> = React.memo(({ onRemove, onChange, data }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
      onChange({ ...data, [name]: newValue });
    },
    [onChange, data]
  );

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
                <option key={option} value={option}>
                  {option}
                </option>
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
                  name={item.toLowerCase().replace(/ /g, "_")}
                  checked={data[item.toLowerCase().replace(/ /g, "_")]}
                  onChange={handleInputChange}
                />
                <label htmlFor={item} className="text-gray-800 text-xl">
                  {item}
                </label>
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

Field.displayName = "Field";

const Supplement: FC<
  ExtraFieldsProps & {
    quoteTypeId: number | null;
    onDataChange: (data: FieldData[]) => void;
    initialData: FieldData[];
  }
> = ({ quoteTypeId, onDataChange, initialData }) => {
  const [fields, setFields] = useState<FieldData[]>(initialData);

  useEffect(() => {
    const fieldsChanged = JSON.stringify(fields) !== JSON.stringify(initialData);
    if (fieldsChanged) {
      onDataChange(fields);
    }
  }, [fields, initialData, onDataChange]);

  const addField = useCallback(() => {
    setFields((prevFields) => [
      ...prevFields,
      {
        id: prevFields.length + 1,
        data: {
          name: "",
          price: "",
          free: false,
          only_show_once_on_join_quotes: false,
          per_individual: false,
          variable: false,
          price_on_application: false,
        },
      },
    ]);
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

const Disbursements: FC<
  ExtraFieldsProps & {
    quoteTypeId: number | null;
    onDataChange: (data: FieldData[]) => void;
    initialData: FieldData[];
  }
> = ({ quoteTypeId, onDataChange, initialData }) => {
  const [fields, setFields] = useState<FieldData[]>(initialData);

  useEffect(() => {
    const fieldsChanged = JSON.stringify(fields) !== JSON.stringify(initialData);
    if (fieldsChanged) {
      onDataChange(fields);
    }
  }, [fields, initialData, onDataChange]);

  const addField = useCallback(() => {
    setFields((prevFields) => [
      ...prevFields,
      {
        id: prevFields.length + 1,
        data: {
          name: "",
          price: "",
          free: false,
          only_show_once_on_join_quotes: false,
          per_individual: false,
          variable: false,
          price_on_application: false,
        },
      },
    ]);
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

const ConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-6">Are you sure you want to delete this field?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const BaseComp: FC<ComponentProps> = ({
  quoteTypeId,
  feeTableData,
  supplementData,
  disbursementData,
  onFeeTableDataChange,
  onSupplementDataChange,
  onDisbursementDataChange,
  onSave,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const snap = useSnapshot(store);

  const handleSave = useCallback(() => {
    if (!quoteTypeId) return;
    setIsSaving(true);
    try {
      // Collect all data
      const allData = {
        calculator: {
          id: Date.now(),
          name: "hacker",
          quoteTypes: snap.calculators.flatMap(calculator => calculator.quoteTypes)
        }
      };

      // Log all collected data to the console
      console.log('All Collected Data:', JSON.stringify(allData, null, 2));

      // Update the store with new data
      const quoteTypeIndex = snap.calculators.flatMap(calculator => calculator.quoteTypes).findIndex(
        (qt) => qt.id === quoteTypeId
      );
      if (quoteTypeIndex !== -1) {
        // Update values
        const updatedValues = feeTableData.map((row) => ({
          id: Date.now(),
          quoteTypeId,
          propertyValueStart: parseFloat(row.start),
          propertyValueEnd: parseFloat(row.end),
          legalFees: row.legalFees,
          percentageOfValue: row.percentageOfValue,
          plusFixedFee: row.plusedFixedFee,
          pricedOnApplication: row.pricedOnApplication,
        }));
        store.calculators.flatMap(calculator => calculator.quoteTypes)[quoteTypeIndex].values = updatedValues;

        // Update supplements
        const updatedSupplements = supplementData.map((field) => ({
          id: Date.now(),
          quoteTypeId,
          title: field.data.name,
          cost: parseFloat(field.data.price),
          free: field.data.free,
          joinQuotes: field.data.only_show_once_on_join_quotes,
          perIndividual: field.data.per_individual,
          variable: field.data.variable,
          pricedOnApplication: field.data.price_on_application,
        }));
        store.calculators.flatMap(calculator => calculator.quoteTypes)[quoteTypeIndex].supplements = updatedSupplements;

        // Update disbursements
        const updatedDisbursements = disbursementData.map((field) => ({
          id: Date.now(),
          quoteTypeId,
          title: field.data.name,
          cost: parseFloat(field.data.price),
          free: field.data.free,
          joinQuotes: field.data.only_show_once_on_join_quotes,
          perIndividual: field.data.per_individual,
          variable: field.data.variable,
          pricedOnApplication: field.data.price_on_application,
        }));
        store.calculators.flatMap(calculator => calculator.quoteTypes)[quoteTypeIndex].disbursements = updatedDisbursements;

        // Log the saved data in JSON format
        const savedData = {
          quoteTypeId,
          values: updatedValues,
          supplements: updatedSupplements,
          disbursements: updatedDisbursements,
        };
        console.log('Saved Data:', JSON.stringify(savedData, null, 2));
      }
      // Add success notification here if needed
    } catch (error) {
      console.error("Failed to save:", error);
      // Add error notification here if needed
    } finally {
      setIsSaving(false);
    }
  }, [quoteTypeId, feeTableData, supplementData, disbursementData, snap]);

  useEffect(() => {
    onSave(false, handleSave);
  }, [onSave, handleSave]);

  const handleFeeTableDataChange = useCallback((data: FeeTableRow[]) => {
    onFeeTableDataChange(data);
  }, [onFeeTableDataChange]);

  const handleSupplementDataChange = useCallback((data: FieldData[]) => {
    onSupplementDataChange(data);
  }, [onSupplementDataChange]);

  const handleDisbursementDataChange = useCallback((data: FieldData[]) => {
    onDisbursementDataChange(data);
  }, [onDisbursementDataChange]);

  return (
    <div className="pb-20">
      <FeeTable
        quoteTypeId={quoteTypeId}
        onDataChange={handleFeeTableDataChange}
        initialData={feeTableData}
      />
      <div className="lg:flex-row items-center lg:items-start flex flex-col border-t mt-10 pt-10 border-gray-400">
        <Supplement
          quoteTypeId={quoteTypeId}
          onDataChange={handleSupplementDataChange}
          initialData={supplementData}
        />
        <Disbursements
          quoteTypeId={quoteTypeId}
          onDataChange={handleDisbursementDataChange}
          initialData={disbursementData}
        />
      </div>
    </div>
  );
};

const Purchase: FC<ComponentProps> = (props) => <BaseComp {...props} />;
const Transfer_Equity: FC<ComponentProps> = (props) => <BaseComp {...props} />;
const Sale: FC<ComponentProps> = (props) => <BaseComp {...props} />;
const Remortgage: FC<ComponentProps> = (props) => <BaseComp {...props} />;

const buttons: Button[] = [
  {
    label: "Property Sale",
    component: Sale as FC<ComponentProps>,
    heading: "Sales",
    quoteType: QuoteTypeEnum.SALE,
  },
  {
    label: "Property Purchase",
    component: Purchase as FC<ComponentProps>,
    heading: "Purchase",
    quoteType: QuoteTypeEnum.PURCHASE,
  },
  {
    label: "Remortgage",
    component: Remortgage as FC<ComponentProps>,
    heading: "Remortgage",
    quoteType: QuoteTypeEnum.REMORTGAGE,
  },
  {
    label: "Transfer of Equity",
    component: Transfer_Equity as FC<ComponentProps>,
    heading: "Transfer of Equity",
    quoteType: QuoteTypeEnum.TRANSFER_OF_EQUITY,
  },
];

// BaseCalculator is the main component of the whole app. whole app works on the base of BaseCalculator
const BaseCalculator: FC<{ calculatorId: number; onSave: (newIsSaving: boolean, newHandleSave: () => void) => void }> = ({ calculatorId, onSave }) => {
  const [activeButton, setActiveButton] = useState<Button>(buttons[0]);
  const [quoteTypeId, setQuoteTypeId] = useState<number | null>(null);
  const [quoteTypeData, setQuoteTypeData] = useState<any>({});

  const handleButtonClick = useCallback((quoteType: QuoteTypeEnum) => {
    const existingQuoteType = store.calculators.flatMap(calculator => 
      calculator.quoteTypes).find(qt => qt.calculatorId === calculatorId && qt.type === quoteType);

    if (existingQuoteType) {
      setQuoteTypeId(existingQuoteType.id);
      setQuoteTypeData({
        feeTableData: existingQuoteType.values.map(v => ({
          start: v.propertyValueStart.toString(),
          end: v.propertyValueEnd.toString(),
          legalFees: v.legalFees,
          percentageOfValue: v.percentageOfValue,
          plusedFixedFee: v.plusFixedFee,
          pricedOnApplication: v.pricedOnApplication,
        })),
        supplementData: existingQuoteType.supplements,
        disbursementData: existingQuoteType.disbursements,
      });
    } else {
      const newQuoteType = {
        id: Date.now(),
        calculatorId,
        type: quoteType,
        values: [],
        supplements: [],
        disbursements: [],
      };
      store.calculators.find(cal => cal.id === calculatorId)?.quoteTypes.push(newQuoteType);
      setQuoteTypeId(newQuoteType.id);
    }
  }, [calculatorId]);

  const handleDataChange = useCallback(
    (
      type: "feeTableData" | "supplementData" | "disbursementData",
      data: any
    ) => {
      setQuoteTypeData((prevData: QuoteTypeState) => ({
        ...prevData,
        [activeButton.quoteType]: {
          ...prevData[activeButton.quoteType],
          [type]: data,
        },
      }));
    },
    [activeButton.quoteType]
  );

  return (
    <div className="main">
      <h1 className="page-head-text">{activeButton.heading}</h1>

      <div className="parent-basic">
        {buttons.map((button) => (
          <button
            key={button.label}
            className={
              activeButton.label !== button.label
                ? "button-primary button-primary-small"
                : "secondary-button"
            }
            onClick={() => handleButtonClick(button.quoteType)}
          >
            {button.label}
          </button>
        ))}
      </div>
      {React.createElement(activeButton.component, {
        quoteTypeId,
        feeTableData: quoteTypeData[activeButton.quoteType]?.feeTableData || [],
        supplementData: quoteTypeData[activeButton.quoteType]?.supplementData || [],
        disbursementData: quoteTypeData[activeButton.quoteType]?.disbursementData || [],
        onFeeTableDataChange: (data: FeeTableRow[]) =>
          handleDataChange("feeTableData", data),
        onSupplementDataChange: (data: FieldData[]) =>
          handleDataChange("supplementData", data),
        onDisbursementDataChange: (data: FieldData[]) =>
          handleDataChange("disbursementData", data),
        onSave: () => {}, // Add this line
      })}
    </div>
  );
}



const CalculatorListPage: FC = () => {
  const [isAddingCalculator, setIsAddingCalculator] = useState(false);
  const [calculatorName, setCalculatorName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [handleSave, setHandleSave] = useState<() => void>(() => () => {});
  const snap = useSnapshot(store);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculatorName(e.target.value);
  }, []);

  const toggleAddCalculator = useCallback(() => {
    setIsAddingCalculator(!isAddingCalculator);
    if (isAddingCalculator) {
      setCalculatorName("");
    }
  }, [isAddingCalculator]);

  const onSave = useCallback((newIsSaving: boolean, newHandleSave: () => void) => {
    setIsSaving(newIsSaving);
    setHandleSave(() => newHandleSave);
  }, []);

  const collectAndSaveData = useCallback(() => {
    const allData = {
      calculator: {
        id: Date.now(), // Assuming the ID is generated like this for the example
        name: calculatorName,
        quoteTypes: snap.calculators.flatMap(calculator => calculator.quoteTypes)
      }
    };

    console.log('All Collected Data:', JSON.stringify(allData, null, 2));
    // Here you would typically send this data to an API
  }, [calculatorName, snap.calculators]);

  return (
    <div>
      {!isAddingCalculator ? (
        <button
          className="client-link button-primary mt-64"
          onClick={toggleAddCalculator}
        >
          Add New Calculator
        </button>
      ) : (
        <div className="mt-6">
          <input
            type="text"
            id="calculatorname"
            name="calculatorname"
            placeholder="Calculator Name"
            value={calculatorName}
            onChange={handleInputChange}
            className="text-left"
            required
          />
          <BaseCalculator
            calculatorId={Date.now()}
            onSave={onSave}
          />
          <div className="fixed bottom-0 left-0 right-0 shadow-md p-4 flex justify-end">
            <button
              className="admin-link secondary-button"
              onClick={collectAndSaveData}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Calculator"}
            </button>
          </div>
        </div>
      )}
      {!isAddingCalculator && (
        <div className="w-full flex items-center justify-center">
          {`/ <CalculatorTable /> `}
        </div>
      )}
    </div>
  );
}

export default CalculatorListPage;
