export function FeeTable() {
  return (
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
        <button>Split</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
