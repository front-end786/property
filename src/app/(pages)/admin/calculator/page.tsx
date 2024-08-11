"use client";
import React, { FC, useCallback, useState } from "react";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { useSnapshot } from "valtio";
import {
  store,
  QuoteTypeEnum as ImportedQuoteTypeEnum,
  setCalculatorName,
  setActiveQuoteType,
  updateFeeTable,
  updateSupplements,
  updateDisbursements,
  toggleAddingCalculator,
  setIsSaving,
} from "@/store";
import axios from 'axios';
import CalculatorTable from "@/components/admin/ui/CalculatorTable";

type Value = {
  id: number;
  quoteTypeId: number;
  propertyValueStart: number;
  propertyValueEnd: number;
  legalFees: number;
  percentageOfValue: boolean;
  plusFixedFee: boolean;
  pricedOnApplication: boolean;
};

type Supplement = {
  id: number;
  quoteTypeId: number;
  title: string;
  cost: number;
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

type Disbursement = {
  id: number;
  quoteTypeId: number;
  title: string;
  cost: number;
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

type QuoteType = {
  id: number;
  calculatorId: number;
  type: QuoteTypeEnum;
  values: Value[];
  supplements: Supplement[];
  disbursements: Disbursement[];
};

type Calculator = {
  id: number;
  name: string;
  quoteTypes: QuoteType[];
};

enum QuoteTypeEnum {
  SALE = "SALE",
  PURCHASE = "PURCHASE",
  REMORTGAGE = "REMORTGAGE",
  TRANSFER_OF_EQUITY = "TRANSFER_OF_EQUITY",
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
interface FeeTableRow {
  start: string;
  end: string;
  legalFees: number;
  percentageOfValue: boolean;
  plusedFixedFee: boolean;
  pricedOnApplication: boolean;
}
interface FieldProps {
  onRemove: () => void;
  onChange: (data: any) => void;
  data: any;
}

const CalculatorListPage: FC = () => {
  const snap = useSnapshot(store);

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
            onChange={(e) => handleInputChange("propertyValueStart", e.target.value)}
          />
          <input
            type="number"
            placeholder="End"
            value={end}
            onChange={(e) => handleInputChange("propertyValueEnd", e.target.value)}
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

  function FeeTable() {
    const rows =
      snap.currentCalculator.quoteTypes[snap.activeQuoteType].feeTable;

    const addRow = useCallback(
      (id: number) => {
        const newRows = [...rows];
        const index = newRows.findIndex((row) => row.id === id);
        const lastRow = newRows[index];
        const lastStart = parseInt(lastRow.propertyValueEnd.toString(), 10);
        const lastEnd =
          lastStart +
          parseInt(lastRow.propertyValueEnd.toString(), 10) -
          parseInt(lastRow.propertyValueStart.toString(), 10);

        const newRow: Value = {
          id: Date.now(),
          quoteTypeId: 0, // This should be set properly
          propertyValueStart: lastStart + 1,
          propertyValueEnd: lastEnd,
          legalFees: lastRow.legalFees,
          percentageOfValue: lastRow.percentageOfValue,
          plusFixedFee: lastRow.plusFixedFee,
          pricedOnApplication: lastRow.pricedOnApplication,
        };

        newRows.splice(index + 1, 0, newRow);
        updateFeeTable(snap.activeQuoteType, newRows);
      },
      [rows]
    );

    const deleteRow = useCallback(
      (id: number) => {
        let newRows = [...rows];
        if (newRows.length === 1 && id === newRows[0].id) {
          newRows = [
            {
              ...newRows[0],
              propertyValueStart: 0,
              propertyValueEnd: 0,
              legalFees: 0,
              percentageOfValue: false,
              plusFixedFee: false,
              pricedOnApplication: false,
            },
          ];
        } else {
          newRows = newRows.filter((row) => row.id !== id);
        }
        updateFeeTable(snap.activeQuoteType, newRows);
      },
      [rows]
    );

    const handleInputChange = useCallback(
      (id: number, field: string, value: string | number | boolean) => {
        const newRows = rows.map((row) =>
          row.id === id ? { ...row, [field]: field.includes("propertyValue") ? parseInt(value as string, 10) : value } : row
        );
        updateFeeTable(snap.activeQuoteType, newRows);
      },
      [rows]
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
              id={row.id}
              start={row.propertyValueStart.toString()}
              end={row.propertyValueEnd.toString()}
              legalFees={row.legalFees}
              percentageOfValue={row.percentageOfValue}
              plusedFixedFee={row.plusFixedFee}
              pricedOnApplication={row.pricedOnApplication}
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

  const Field: React.FC<FieldProps> = React.memo(
    ({ onRemove, onChange, data }) => {
      const [showConfirmModal, setShowConfirmModal] = useState(false);

      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value, type } = e.target;
          const newValue =
            type === "checkbox"
              ? (e.target as HTMLInputElement).checked
              : value;
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
    }
  );

  Field.displayName = "Field";

  const Supplement: React.FC = () => {
    const supplements =
      snap.currentCalculator.quoteTypes[snap.activeQuoteType].supplements;

    const addField = useCallback(() => {
      const newSupplements = [...supplements];
      newSupplements.push({
        id: Date.now(),
        quoteTypeId: Object.values(QuoteTypeEnum).indexOf(snap.activeQuoteType),
        title: "",
        cost: 0,
        free: false,
        joinQuotes: false,
        perIndividual: false,
        variable: false,
        pricedOnApplication: false,
      });
      updateSupplements(snap.activeQuoteType, newSupplements);
    }, [supplements]);

    const removeField = useCallback(
      (id: number) => {
        const newSupplements = supplements.filter((field) => field.id !== id);
        updateSupplements(snap.activeQuoteType, newSupplements);
      },
      [supplements]
    );

    const updateField = useCallback(
      (id: number, newData: any) => {
        const newSupplements = supplements.map((field) =>
          field.id === id ? { ...field, ...newData } : field
        );
        updateSupplements(snap.activeQuoteType, newSupplements);
      },
      [supplements]
    );

    return (
      <div className="w-[50%] px-4">
        <h2 className="text-3xl font-bold text-gray-800 my-5">{`Supplement (ex.VAT)`}</h2>
        {supplements.map((field) => (
          <Field
            key={field.id}
            onRemove={() => removeField(field.id)}
            onChange={(newData) => updateField(field.id, newData)}
            data={field}
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
  const Disbursements: React.FC = () => {
    const disbursements =
      snap.currentCalculator.quoteTypes[snap.activeQuoteType].disbursements;

    const addField = useCallback(() => {
      const newDisbursements = [...disbursements];
      newDisbursements.push({
        id: Date.now(),
        quoteTypeId: Object.values(QuoteTypeEnum).indexOf(snap.activeQuoteType),
        title: "",
        cost: 0,
        free: false,
        joinQuotes: false,
        perIndividual: false,
        variable: false,
        pricedOnApplication: false,
      });
      updateDisbursements(snap.activeQuoteType, newDisbursements);
    }, [disbursements]);

    const removeField = useCallback(
      (id: number) => {
        const newDisbursements = disbursements.filter(
          (field) => field.id !== id
        );
        updateDisbursements(snap.activeQuoteType, newDisbursements);
      },
      [disbursements]
    );

    const updateField = useCallback(
      (id: number, newData: any) => {
        const newDisbursements = disbursements.map((field) =>
          field.id === id ? { ...field, ...newData } : field
        );
        updateDisbursements(snap.activeQuoteType, newDisbursements);
      },
      [disbursements]
    );

    return (
      <div className="w-[50%] px-4">
        <h2 className="text-3xl font-bold text-gray-800 my-5">{`Disbursements (ex.VAT)`}</h2>
        {disbursements.map((field) => (
          <Field
            key={field.id}
            onRemove={() => removeField(field.id)}
            onChange={(newData) => updateField(field.id, newData)}
            data={field}
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

  const ConfirmModal: React.FC<{
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
  function BaseComp() {
    return (
      <div className="pb-20">
        <FeeTable />
        <div className="lg:flex-row items-center lg:items-start flex flex-col border-t mt-10 pt-10 border-gray-400">
          <Supplement />
          <Disbursements />
        </div>
      </div>
    );
  }

  const buttons = [
    { label: "Property Sale", type: QuoteTypeEnum.SALE, heading: "Sales" },
    {
      label: "Property Purchase",
      type: QuoteTypeEnum.PURCHASE,
      heading: "Purchase",
    },
    {
      label: "Remortgage",
      type: QuoteTypeEnum.REMORTGAGE,
      heading: "Remortgage",
    },
    {
      label: "Transfer of Equity",
      type: QuoteTypeEnum.TRANSFER_OF_EQUITY,
      heading: "Transfer of Equity",
    },
  ];

  function BaseCalculator() {
    return (
      <div className="main">
        <h1 className="page-head-text">
          {buttons.find((b) => b.type === snap.activeQuoteType)?.heading}
        </h1>
        <div className="">
          <div className="parent-basic">
            {buttons.map((button) => (
              <button
                key={button.label}
                className={
                  snap.activeQuoteType !== button.type
                    ? "button-primary button-primary-small"
                    : "secondary-button"
                }
                onClick={() => setActiveQuoteType(button.type)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <BaseComp />
      </div>
    );
  }

  const collectCalculatorData = () => {
    const quoteTypes = Object.values(QuoteTypeEnum).map(quoteType => ({
      type: quoteType,
      values: snap.currentCalculator.quoteTypes[quoteType].feeTable.map(row => ({
        propertyValueStart: Number(row.propertyValueStart),
        propertyValueEnd: Number(row.propertyValueEnd),
        legalFees: row.legalFees,
        percentageOfValue: row.percentageOfValue,
        plusFixedFee: row.plusFixedFee,
        pricedOnApplication: row.pricedOnApplication
      })),
      supplements: snap.currentCalculator.quoteTypes[quoteType].supplements.map(supp => ({
        title: supp.title,
        cost: Number(supp.cost),
        free: supp.free,
        joinQuotes: supp.joinQuotes,
        perIndividual: supp.perIndividual,
        variable: supp.variable,
        pricedOnApplication: supp.pricedOnApplication
      })),
      disbursements: snap.currentCalculator.quoteTypes[quoteType].disbursements.map(disb => ({
        title: disb.title,
        cost: Number(disb.cost),
        free: disb.free,
        joinQuotes: disb.joinQuotes,
        perIndividual: disb.perIndividual,
        variable: disb.variable,
        pricedOnApplication: disb.pricedOnApplication
      }))
    }));

    const calculatorData = {
      name: snap.currentCalculator.name,
      quote_types: quoteTypes
    };

    console.log(JSON.stringify(calculatorData, null, 2));

    return calculatorData;
  };

  const saveCalculator = async (calculatorData: any) => {
    try {
      const response = await axios.post('/api/test', calculatorData);
      console.log('Calculator saved successfully:', response.data);
      setIsSaving(false);
      toggleAddingCalculator();
      // You might want to add some success notification here
    } catch (error) {
      console.error('Error saving calculator:', error);
      setIsSaving(false);
      // You might want to add some error notification here
    }
  };

  return (
    <div className="">
      {!snap.isAddingCalculator ? (
        <button
          className="client-link button-primary "
          onClick={toggleAddingCalculator}
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
            value={snap.currentCalculator.name}
            onChange={(e) => setCalculatorName(e.target.value)}
            className="text-left"
            required
          />
          <BaseCalculator />
          <div className="fixed bottom-0 left-0 right-0 shadow-md p-4 flex justify-end">
            <button
              className="admin-link secondary-button"
              disabled={snap.isSaving}
              onClick={() => {
                setIsSaving(true);
                const calculatorData = collectCalculatorData();
                saveCalculator(calculatorData);
              }}
            >
              {snap.isSaving ? "Saving..." : "Save Calculator"}
            </button>
          </div>
        </div>
      )}
      {!snap.isAddingCalculator && (
        <div className="w-full flex items-center justify-center">
          <CalculatorTable /> 
        </div>
      )}
    </div>
  );
};

export default CalculatorListPage;
