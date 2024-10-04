import React from 'react';

interface ButtonProps {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<ButtonProps> = ({ label, placeholder, type, onChange }) => {
  return (
    <div className="mb-4">
      <p className="text-left ml-6">{label}</p>
      <input
        type={type}
        className="w-[95%] text-xl rounded-md py-4 pl-2 m-3 border border-gray-400 placeholder-gray-500"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;