import React from 'react'

const EmptyCart: React.FC = () => {
  return (
    <div className="justify-center p-28">
      <p className="font-extrabold text-lg">장바구니에 담은 상품이 없어요</p>
      <p className="text-lg">상품을 추가해보세요.</p>
    </div>
  )
}

export default EmptyCart;