import React, { useState, useCallback } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

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
            <button onClick={onRemove}>
              <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Field.displayName = 'Field';

interface ExtraFieldsProps {
  Heading: string;
}

const ExtraFields: React.FC<ExtraFieldsProps> = ({ Heading }) => {
  const [fields, setFields] = useState<Array<{ id: number; data: any }>>([
    { id: 1, data: {} }
  ]);

  const addField = useCallback(() => {
    setFields((prevFields) => [...prevFields, { id: prevFields.length + 1, data: {} }]);
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
      <h2 className="text-3xl font-bold text-gray-800 my-5">{Heading}</h2>
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
        Add {Heading}
      </button>
    </div>
  );
};

export default ExtraFields;