import './ViewProduct.scss';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { productViewDisplayState } from '../../../../recoil/productViewDisplayState';
import { IoClose } from "react-icons/io5";

const productStatus = {
  '0': {
    key: 'none',
    value: 'Không có'
  },
  '1': {
    key: 'new',
    value: 'Mới'
  },
  '2': {
    key: 'sale',
    value: 'Khuyến mãi'
  },
  '3': {
    key: 'hot',
    value: 'Bán chạy'
  }
}

  function ViewProduct({ product }) {
  const setProductViewDisplay = useSetRecoilState(productViewDisplayState);

  const handleClosing = () => {
    setProductViewDisplay(false);
  }

  return (
    <div className="view-product">
      <div id="overlay"></div>
      <div className="view-product-container">
        <div className="form-container">
          <div className="form-control">
            <label className="field-title">Tên sản phẩm:</label>
            <label className="text-lb">{product.name}</label>
          </div>

          <div className="form-control">
            <label className="field-title">Phân loại:</label>
            <label className="text-lb">{product.category}</label>
          </div>

          <div className="form-control">
            <label className="field-title">Loại:</label>
            <label className="text-lb">{product.type === 'Quần Short Nữ' ? 'Quần Jean Nữ' : product.type}</label>
          </div>

          <div className="form-control">
            <label className="field-title">Giá:</label>
            <label className="text-lb">{product.real_price.toLocaleString()}đ</label>
          </div>

          <div className="form-control">
            <label className="field-title">Khuyến mãi:</label>
            <label className="text-lb">{product.discount.toLocaleString()}đ</label>
          </div>

          <div className="form-control">
            <label className="field-title">Số lượng:</label>
            <label className="text-lb">{product.quantity}</label>
          </div>

          <div className="form-control mt-9">
            <label className="field-title">Trạng thái:</label>
            <div className="product-status-view">
              {product.status.map(status => (
                <label key={status} className={'status-label ' + productStatus[status].key}>{productStatus[status].value}</label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="field-title">Kích thước:</label>
            <div className="product-size">
              {product.sizes.map(size => (
                <label key={size} className="size-label">{size}</label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="label-for-img field-title" htmlFor="product-image">Hình ảnh:</label>
            <div className="product-image">
              <div className="img-row">
                {product.images.map(image => (
                  <div className="img-col" key={image}>
                    <div className="image-color" style={{ backgroundImage: `url(${image})` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label-for-img field-title" htmlFor="product-image">Màu sắc:</label>
            <div className="product-color">
              <div className="img-row">
                {product.colors.map(color => (
                  <div className="img-col" key={color}>
                    <div className="image-color" style={{ backgroundImage: `url(${color})` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="close-btn" onClick={handleClosing}>
          <IoClose className="close-icon" />
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;