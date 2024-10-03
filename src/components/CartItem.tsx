import React, { useState } from "react";
import cancel from "../assets/cancel.svg";
import checked from "../assets/checked.svg";
import unchecked from "../assets/unchecked.svg";

interface Product {
  id: number;
  title: string;
  price: number;
  discount: number;
  category: string;
  quantity: number;
  color: string;
  image: string;
}

interface ProuductProps {
  item: Product;
  action: (itemId: number) => void;
}

const CartItem: React.FC<ProuductProps> = ({ item, action }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const textStyle = {
    textDecoration: "line-through"
  };

  return (
    <div style={{ maxWidth: "703.2px" }} className="p-5">
      <div className="flex items-center mb-8">
        <div className="text-black font-bold text-xl">{item.category}</div>
      </div>

      <div className="flex items-start gap-5">
        <img
          src={isChecked ? checked : unchecked}
          alt={isChecked ? "Checked" : "Unchecked"}
          onClick={toggleCheckbox}
          className="h-7 w-7"
        />
        <div className="flex-1">
          <div className="flex gap-8 items-start">
            <img
              src={item.image ? item.image : "https://via.placeholder.com/300x400?text=Item+1"}
              className="w-24 h-28 rounded-sm"
            />
            <div className="flex-1 text-left">
              <p className="font-medium text-black text-lg">{item.title}</p>
              <p className="text-gray-700 text-lg">{`${item.color} / ${item.quantity}개`}</p>
              {item.discount === item.price ? (
                <div>
                  <p className="font-bold text-black text-lg">${item.price}</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 text-lg" style={textStyle}>${item.discount}</p>
                  <p className="font-bold text-black text-lg">${item.price}</p>
                </div>
              )}
            </div>
            <img
              src={cancel}
              alt="Cancel"
              className="h-3 w-3 cursor-pointer"
              onClick={() => action(item.id)}
            />
          </div>
          <div className="flex space-x-2 my-7">
            <button className="flex-grow border rounded-md bg-white border-gray-300 py-2.5 text-lg font-semibold text-black">
              옵션변경
            </button>
            <button className="flex-grow border rounded-md bg-white border-gray-300 py-2.5 text-lg font-semibold text-black">
              쿠폰사용
            </button>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 mb-10" />
    </div>
  );
};

export default CartItem;