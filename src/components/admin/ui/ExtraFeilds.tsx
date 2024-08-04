import React, { useState } from "react";

function Fields() {
  const selectedOption = [
    { value: "Client is Company" },
    { value: "Client is Individual" },
    { value: "Client is Government" },
    { value: "Client is Non-Profit" },
    { value: "Client is Other" },
  ];

  const checkboxValue = [
    { text: "Free" },
    { text: "Only show once on Join quotes" },
    { text: "Per individual" },
    { text: "Variable" },
    { text: "Price on Application" },
  ];

  return (
    <div className="flex flex-col mt-6">
      <div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-3">
            <label>Type</label>
            <select className="px-3 py-2 text-xl text-gray-600 items-center flex bg-gray-300 rounded-md">
              {selectedOption.map((item, index) => (
                <option key={index}>{item.value}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-between">
            <label>Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Name"
              className="text-left"
            />
          </div>
          <div className="flex flex-col justify-between">
            <label>Price(£)</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Price"
              className="text-left"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-9 py-5 border-b border-gray-400">
        <p className="font-bold text-xl">Options:</p>
        <div className="flex gap-8 flex-wrap">
          {checkboxValue.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input type="checkbox" />
              <p className="text-gray-800 text-xl">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExtraFeilds({ Heading }: { Heading: string }) {
  const [fields, setFields] = useState<Array<{ id: number }>>([{ id: 1 }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1 }]);
  };

  return (
    <div className="w-[50%] px-4">
      <h2 className="text-3xl font-bold text-gray-800 my-5">
        {Heading}
      </h2>
      {fields.map((field) => (
        <Fields key={field.id} />
      ))}
      <button
        className="bg-blue-600 text-xl rounded-lg font-bold text-white px-5 py-2 mt-4"
        onClick={addField}
      >
        Add {Heading}
      </button>
    </div>
  );
}

export default ExtraFeilds;
