import './ViewProduct.scss';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { productViewDisplayState } from '../../../../recoil/productViewDisplayState';
import { IoClose } from "react-icons/io5";

const productStatus = {
  'Không có': 'none',
  'Mới': 'new',
  'Khuyến mãi': 'sale',
  'Bán chạy': 'hot'
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
            <label className="text-lb">{product.categoryName}</label>
          </div>

          <div className="form-control">
            <label className="field-title">Loại:</label>
            <label className="text-lb">{product.typeName}</label>
          </div>

          <div className="form-control">
            <label className="field-title">Giá:</label>
            <label className="text-lb">{product.price.toLocaleString()}đ</label>
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
              {product.arrStatus.map(status => (
                <label key={status} className={'status-label ' + productStatus[status]}>{status}</label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="field-title">Kích thước:</label>
            <div className="product-size">
              {product.arrSizes.map(size => (
                <label key={size} className="size-label">{size}</label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="label-for-img field-title" htmlFor="product-image">Hình ảnh:</label>
            <div className="product-image">
              <div className="img-row">
                {product.arrImages.map(image => (
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
                {product.arrColors.map(color => (
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