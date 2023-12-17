import React from "react";

const AddItemBtn = ({ onClick, label }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-2 disabled:opacity-80 transition-all duration-500"
      >
        {label}
      </button>
    </div>
  );
};

export default AddItemBtn;
