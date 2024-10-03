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
  image: string;
}

const Cart: React.FC = () => {
  const [products, getProducts] = useState<Product[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const getData = async () => {
    const json = await (
      await fetch(`https://fakestoreapi.com/products`)
    ).json();
    console.log(json.length);
    const jsonData = json.slice(0, 10);

    const totalPrice = jsonData.reduce(
      (total: number, item: Product) => total + item.price, 0);

    const productData = jsonData.map((item: Product) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      discount: item.price * (Math.floor(Math.random() * 10) + 1),
      category: item.category,
      image: item.image,
    }));
    console.log(productData);

    if (jsonData.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    getProducts(productData);
    setTotalPrice(totalPrice);
    setTotalCount(productData.length);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
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
            <CartItem item={product} />
          ))}
          <CartButton content={`$${totalPrice} 구매하기 (${totalCount}개)`} />
        </div>
      )}
    </div>
  );
};

export default Cart;
