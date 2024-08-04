import { FaRegTrashAlt } from "react-icons/fa";

export function FeeTable() {
  return (
    <div className="datatable">
      <div className="inputs">
        <input type="text" placeholder="0" />
        <input type="text" placeholder="150,000" />
      </div>
      <div className="valuesdata items-center justify-start">
        <div>
          <label>£</label> <input type="text" value={450.0} />
        </div>
        <input type="checkbox" name="#" id="0" className="" />
        <div>&nbsp;</div>
        <input type="checkbox" name="#" id="0" className="w-8" />
        <div className="flex gap-12">
          <button className="bg-blue-600 px-7 py-2 text-2xl text-white font-semibold rounded-md shadow-md">
            Split
          </button>
          <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
