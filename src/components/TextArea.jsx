import React from "react";

const TextArea = ({ label, value, onChange }) => {
  return (
    <div className="flex gap-2">
      <label>{label}: </label>
      <textarea
        className="bg-transparent border"
        rows="1"
        cols=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
