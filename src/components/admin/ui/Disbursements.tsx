import React from "react";

function Disbursements() {
  const selectedOption = [
    {
      value: "Client is Company",
    },
    {
      value: "Client is Company",
    },
    {
      value: "Client is Company",
    },
    {
      value: "Client is Company",
    },
    {
      value: "Client is Company",
    },
  ];
  const checkboxValue = [
    {
      text: "Free",
    },
    {
      text: "Only show once on Join quotes",
    },
    {
      text: "Per individual",
    },
    {
      text: "Variabel",
    },
    {
      text: "Price on Application",
    },
  ];
  const disbursementsHeading = "Disbursementss (ex.VAT)";
  return (
    <>
      <div className="w-[50%]  px-4">
        <div className="flex flex-col ">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 my-5">
              {disbursementsHeading}
            </h2>
            <div className="flex justify-between">
              <div className="flex flex-col  gap-3">
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
                  <input type="checkbox" name="" id="" />
                  <p className="text-gray-800 text-xl">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="bg-blue-600 text-xl rounded-lg font-bold text-white px-5 py-2 mt-4">
          Add Disbursements
        </button>
      </div>
    </>
  );
}

export default Disbursements;