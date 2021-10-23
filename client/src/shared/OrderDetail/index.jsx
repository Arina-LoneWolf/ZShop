import './OrderDetail.scss';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { orderDisplayState } from '../../recoil/orderDisplayState';
import { IoClose } from "react-icons/io5";

function OrderDetail({ order }) {
  const setOrderDisplay = useSetRecoilState(orderDisplayState);

  return (
    <React.Fragment>
      <div id="overlay" onClick={() => setOrderDisplay(false)}></div>
      <div className="order-detail">
        <div className="order-cart-list" width="100%">
          <div className="heading-id">Đơn hàng <span>#{order.idOrder}</span></div>
          <div className="heading-title">
            <div className="product-color">Ảnh</div>
            <div className="product-description">Sản phẩm</div>
            <div className="product-quantity">Số lượng</div>
            <div className="product-unit-price">Đơn giá</div>
            <div className="product-discount">Khuyến mãi</div>
            <div className="product-total-price">Thành tiền</div>
          </div>

          <div className="order-cart-detail">
            {order.products.map(product => (
              <div className="item-row" key={product._id}>
                <div className="product-color-container">
                  <div className="product-color" style={{ backgroundImage: `url(${product.color})` }}></div>
                </div>
                <div className="product-description">{`${product.name} - ${product.size}`}</div>
                <div className="product-quantity">{product.soldQuantity}</div>
                <div className="product-unit-price">{product.price.toLocaleString()}đ</div>
                <div className="product-discount">{product.discount.toLocaleString()}đ</div>
                <div className="product-total-price">{((product.price - product.discount) * product.soldQuantity).toLocaleString()}đ</div>
              </div>
            ))}
          </div>
        </div>

        <div className="extra-info">
          <ul className="buyer-info col-60">
            <li className="name">Tên người nhận: <span>{order.receiverInfo.name}</span></li>
            <li className="phone">Điện thoại: <span>{order.receiverInfo.phone}</span></li>
            <li className="email">Email: <span>{order.receiverInfo.email}</span></li>
            <li className="note">Ghi chú: <span>{order.receiverInfo.note ? order.receiverInfo.note : 'Không có'}</span></li>
            <li className="address">Địa chỉ giao hàng: <span>{order.receiverInfo.address}</span></li>
          </ul>
          <ul className="payment-info col-40">
            <li className="total-price">Tổng đơn: <span>{order.total.toLocaleString()}đ</span></li>
            <li className="shipping-fee">Phí vận chuyển: <span>{order.shipFee.toLocaleString()}đ</span></li>
            <li className="payment-method">Trạng thái: <span>{getStatus(order.status)}</span></li>
            <li className="date">Ngày đặt: {new Date(order.date).toLocaleString("en-GB").slice(0, 10)}</li>
            <li className="payment-method">{order.paymentMethod}</li>
          </ul>
        </div>

        <div className="close-btn" onClick={() => setOrderDisplay(false)}>
          <IoClose className="close-icon" />
        </div>
      </div>
    </React.Fragment>
  );
}

const getStatus = (status) => {
  switch (status) {
    case 0: return 'Chờ xác nhận';
    case 1: return 'Đã xác nhận';
    case 2: return 'Đã thanh toán';
    case 3: return 'Giao thành công';
    case 4: return 'Đã hủy';
    default: return null;
  }
}

export default OrderDetail;