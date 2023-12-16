import React from "react";

const AddItemBtn = ({ onClick, label }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="md:uppercase border md:p-3 p-3 rounded-lg bg-white hover:border-black transition-all duration-500"
      >
        {label}
      </button>
    </div>
  );
};

export default AddItemBtn;
