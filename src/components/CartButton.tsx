import React from 'react';

interface ButtonProps {
  content: string;
  onClick?: () => void;
}

const CartButton: React.FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <div className="flex justify-center py-7">
      <button
        className="w-[95%] text-white bg-black font-bold text-xl rounded-md py-4"
        onClick={onClick}
      >
        {content}
      </button>
    </div>
  );
};

export default CartButton;