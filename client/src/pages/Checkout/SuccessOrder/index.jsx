import './SuccessOrder.scss';
import React, { useEffect} from 'react';
import congrats from '../../../assets/images/congrats.png';

function SuccessOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="success-order">
      <img src={congrats} alt="" />
      <div className="success-order-message">Đơn hàng của bạn đã được <span>ZShop</span> ghi nhận</div>
    </div>
  );
}

export default SuccessOrder;