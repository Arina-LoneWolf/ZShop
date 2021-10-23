import './EmptyCart.scss';
import React from 'react';
import emptyCart from '../../../assets/images/empty_cart.jpg'

function EmptyCart() {
  return (
    <div className="empty-cart">
      <img src={emptyCart} alt="" />
      <div className="message">Giỏ hàng của bạn chưa có sản phẩm nào</div>
    </div>
  )
}

export default EmptyCart