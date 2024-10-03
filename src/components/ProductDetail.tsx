import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

interface Rating {
  count: number;
  rate: number;
}

interface ProductDetail {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}

const ProductDetail = () => {
  // 상품 ID를 쿼리 파라미터에서 가져온다.
  const params = useParams();
  const productId = params.id;
  const url = `https://fakestoreapi.com/products/${productId}`;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProductDetail | null>(null);

  const [cart, setCart] = useState<ProductDetail[]>(() => {
    const saveItems = sessionStorage.getItem("cartItems");
    return saveItems ? JSON.parse(saveItems) : [];
  });

  const addCart = (newItem: ProductDetail) => {
    setCart((prev) => [...prev, newItem]);
  };

  // 상품 상세 정보 요청 API
  const getProductDetail = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  console.log(data);
  return (
    // 최대 너비 설정해줘야 함
    <div style={{ maxWidth: "703.2px" }}>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center my-5">
          <img src={data!.image} className="size-4/5" />
          <div className="flex flex-col items-start w-full my-5">
            <p className="text-gray-400">{data!.category}</p>
            <p className="text-xl">{data!.title}</p>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="text-sm font-bold text-gray-900 ms-2 dark:text-white">
                {data!.rating.rate}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a
                href="#"
                className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
              >
                {data!.rating.count} reviews
              </a>
            </div>
            <p className="text-gray-400 line-through">${data!.price}</p>
            <div className="flex gap-2">
              <p className="font-semibold text-red-500">30%</p>
              <p className="font-semibold">${(data!.price * 0.7).toFixed(2)}</p>
            </div>
            <div className="my-5">
              <p className="text-start">"{data!.description}"</p>
            </div>
            <div className="flex w-full h-12 gap-3">
              <button className="w-1/5" onClick={data ? () => addCart(data) : undefined}>장바구니</button>
              <button className="w-4/5">구매하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
