import './Checkout.scss';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { cartTotalPrice, cartState } from '../../recoil/cartState';
import { toastDisplayState } from '../../recoil/toastDisplayState';
import { userState } from '../../recoil/userState';
import SuccessOrder from './SuccessOrder';
import TextError from '../../shared/notifications/TextError';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import provinces from '../../shared/data/provinces';
import districts from '../../shared/data/districts';
import orderApi from '../../apis/orderApi';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  fullName: yup.string().required('*Bắt buộc'),
  email: yup.string()
    .required('*Bắt buộc')
    .email('Email không hợp lệ'),
  phone: yup.string()
    .required('*Bắt buộc')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  addressDetail: yup.string().required('*Bắt buộc'),
  province: yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
  district: yup.string().required('Vui lòng chọn Quận/Huyện')
});

function Checkout() {
  const user = useRecoilValue(userState);
  const totalPrice = useRecoilValue(cartTotalPrice);
  const [cart, setCart] = useRecoilState(cartState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const [province, setProvince] = useState(user.city);
  const [accordingDistricts, setAccordingDistricts] = useState(districts.filter(district => district.provinceName === province));
  const [orderSuccessfully, setOrderSuccessfully] = useState(false);

  useEffect(() => {
    const newDistricts = districts.filter(district => district.provinceName === province);
    setAccordingDistricts(newDistricts);
  }, [province]);

  const defaultValues = {
    fullName: user.name,
    phone: user.phone,
    email: user.email,
    province: user.city,
    district: user.district,
    addressDetail: user.address,
    paymentMethod: 'Thanh toán tiền mặt khi nhận hàng'
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    // console.log('Form data', values);
    const products = cart.map(cartItem => {
      const { url, quantity, ...item } = cartItem.product;
      return {
        ...item,
        soldQuantity: cartItem.quantity
      }
    })

    const address = `${values.addressDetail}, ${values.district}, ${values.province}`;

    const order = {
      user: user._id,
      paymentMethod: values.paymentMethod,
      products,
      receiverInfo: {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        address,
        note: values.note
      }
    }

    console.log(order);

    // orderApi.add(order).then(response => {
    //   console.log(response);
    //   setCart([]);
    //   localStorage.removeItem('cart');
    //   setOrderSuccessfully(true);
    // }).catch(error => {
    //   console.log(error.response.data.error);
    //   const errorProducts = error.response.data.error;
    //   setToastDisplay({
    //     show: true,
    //     message: errorProducts.map(errProduct => <div><strong>{errProduct.name}</strong> hiện chỉ còn <strong>{errProduct.quantity}</strong> sản phẩm</div>)
    //   });
    // });
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.selectedOptions[0].value);
    setValue('district', '');
  };

  return (
    <React.Fragment>
      {orderSuccessfully && <SuccessOrder />}
      {!orderSuccessfully &&
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="checkout-section"
        >
          <div className="buyer-info l-4">
            <div className="step-container">
              <div className="step-number">1</div>
              <div className="step-title">Thông tin người nhận</div>
            </div>

            <div className="form-control">
              <input {...register("fullName")} id="fullName" placeholder="Họ tên" />
              <TextError>{errors.fullName?.message}</TextError>
            </div>

            <div className="form-control">
              <input {...register("phone")} id="phone" placeholder="Điện thoại" />
              <TextError>{errors.phone?.message}</TextError>
            </div>

            <div className="form-control">
              <input {...register("email")} type="email" id="email" placeholder="Email" />
              <TextError>{errors.email?.message}</TextError>
            </div>

            <div className="form-control">
              <input {...register("addressDetail")} id="addressDetail" placeholder="Địa chỉ chi tiết" />
              <TextError>{errors.addressDetail?.message}</TextError>
            </div>

            <div className="form-control">
              <select {...register("province")} id="province" onChange={(e) => handleProvinceChange(e)}>
                <option hidden value="">-- Tỉnh/Thành phố --</option>
                {provinces.map(province => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <TextError>{errors.province?.message}</TextError>
            </div>

            <div className="form-control">
              <select {...register("district")} id="district">
                <option hidden value="">-- Quận/Huyện --</option>
                {accordingDistricts.map(district => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
              <TextError>{errors.district?.message}</TextError>
            </div>

            <div className="form-control">
              <textarea {...register("note")} id="note" placeholder="Ghi chú" />
            </div>
          </div>

          <div className="payment-method l-4">
            <div className="step-container">
              <div className="step-number">2</div>
              <div className="step-title">Phương thức thanh toán</div>
            </div>

            <div className="checkout-method">
              <div className="form-control">
                <div className="input-container">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    id="moneyTransfer"
                    value="Chuyển khoản trước qua tài khoản ngân hàng"
                  />
                  <label htmlFor="moneyTransfer">Chuyển khoản trước qua tài khoản ngân hàng</label>
                </div>
              </div>

              <div className="method-detail">
                Với phương thức Chuyển khoản trước qua tài khoản ngân hàng, bộ phận CSKH sẽ gọi điện đến bạn để xác nhận đơn hàng và hướng dẫn cách thức thanh toán chuyển khoản.
              </div>
            </div>

            <div className="checkout-method">
              <div className="form-control">
                <div className="input-container">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    id="cod"
                    value="Thanh toán tiền mặt khi nhận hàng"
                  />
                  <label htmlFor="cod">Thanh toán tiền mặt khi nhận hàng</label>
                </div>
              </div>

              <div className="method-detail">
                Thanh toán khi nhận hàng (COD) chỉ áp dụng cho các đơn hàng ở các quận/huyện thuộc Hà Nội/TP.HCM
              </div>
            </div>
          </div>

          <div className="cart-info l-4">
            <div className="step-container">
              <div className="step-number">3</div>
              <div className="step-title">Thông tin giỏ hàng</div>
            </div>

            <table className="cart-detail" width="100%">
              <thead>
                <tr>
                  <th width="55%" className="product-name">Tên sản phẩm</th>
                  <th width="20%" className="product-quantity">Số lượng</th>
                  <th width="25%" className="product-unit-price">Đơn giá</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item, index) => (
                  <tr className="cart-item" key={index}>
                    <td className="product-name">{`${item.product.name} - ${item.product.size}`}</td>
                    <td className="product-quantity">{item.quantity}</td>
                    <td className="product-unit-price">{(item.product.price - item.product.discount).toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="cart-total-price" width="100%">
              <tfoot>
                <tr>
                  <td width="60%">Tạm tính</td>
                  <td width="40%">{totalPrice.toLocaleString()}đ</td>
                </tr>

                <tr>
                  <td width="60%">Phí vận chuyển</td>
                  <td width="40%">25,000đ</td>
                </tr>

                <tr>
                  <td width="60%">Tổng cộng</td>
                  <td width="40%">{(totalPrice + 25000).toLocaleString()}đ</td>
                </tr>
              </tfoot>
            </table>

            <button type="submit" className="order-btn">Đặt hàng</button>
          </div>
        </form>}
    </React.Fragment>
  );
}

export default Checkout;