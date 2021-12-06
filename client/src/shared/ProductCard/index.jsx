import './ProductCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-container col l-3">
      <Link to={`/product/${product.id}`}>
        <div className="product-interface">
          <div className="product-image" style={{ backgroundImage: `url(${product.arrImages[0]})` }}></div>

          <div className="product-info">
            <div className="product-name">{product.name}</div>
            {product.discount === 0 && <div className="empty" />}
            <div className="product-price">{product.priceAfterDis.toLocaleString()}đ</div>
            {product.discount > 0 && <div className="product-original-price">{product.price.toLocaleString()}đ</div>}
          </div>

          {product.arrStatus.includes('Mới') && <div className="product-new-label">New</div>}
          {product.arrStatus.includes('Bán chạy') && <div className="product-hot-label-container">
            <div className="hot-label">Hot</div>
          </div>}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;