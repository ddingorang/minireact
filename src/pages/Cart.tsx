import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import CartButton from "../components/CartButton";

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

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saveItems = sessionStorage.getItem("cartItems");
    return saveItems ? JSON.parse(saveItems) : [];
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const colors = ["black", "white", "gray", "navy", "beige", "brown", "silver"];

  const getData = () => {
    const productData = products.map((item: Product) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      discount: parseFloat((item.price * (Math.floor(Math.random() * 6) + 1)).toFixed(2)),
      category: item.category,
      quantity: (Math.floor(Math.random() * 3) + 1),
      color: colors[(Math.floor(Math.random()) * colors.length)],
      image: item.image,
    }));
    console.log(productData);
    setProducts(productData);
  };

  const updateData = () => {
    const totalPrice = products.reduce(
      (total: number, item: Product) => total + item.price, 0);

    setTotalPrice(totalPrice);
    setTotalCount(products.length);
    setIsEmpty(products.length === 0);
  }

  const handleRemove = (itemId: number) => {
    const updatedCart = products.filter(item => item.id !== itemId);
    setProducts(updatedCart);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateData();
    sessionStorage.setItem("cartItems", JSON.stringify(products));
  }, [products]);

  return (
    <div>
      <p className="text-2xl font-bold py-5">장바구니</p>
      {isEmpty ? (
        <div>
          <EmptyCart />
          <CartButton content="쇼핑 계속하기" />
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <CartItem item={product} action={handleRemove} />
          ))}
          <CartButton content={`$${totalPrice.toFixed(2)} 구매하기 (${totalCount}개)`} />
        </div>
      )}
    </div>
  );
};

export default Cart;
