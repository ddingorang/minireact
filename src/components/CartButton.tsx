import React from 'react';

interface ButtonProps {
  content: string;
}

const CartButton: React.FC<ButtonProps> = ({ content }) => {
  return (
    <div className="flex justify-center py-7">
      <button className="w-[95%] text-white bg-black font-bold text-xl rounded-md py-4">
        {content}
      </button>
    </div>
  );
};

export default CartButton;