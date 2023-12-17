import React from "react";

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <label>{label}: </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // required
        className="bg-transparent border p-2 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg "
      />
    </div>
  );
};

export default InputField;
