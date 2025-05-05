import React from "react";

type DateInputProps = {
  onDateChange: (date: string) => void;
  label?: string;
  value?: string;
};

const DateInput = ({ onDateChange, label = "Selecione uma data:", value }: DateInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateInput;

