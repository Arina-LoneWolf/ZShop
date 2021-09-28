import './ProductCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-container col l-3">
      <Link to={`/product/${product._id}`}>
        <div className="product-interface">
          <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}></div>

          <div className="product-info">
            <div className="product-name">{product.name}</div>
            {product.discount === 0 && <div className="empty"></div>}
            <div className="product-price">{product.new_price.toLocaleString()}đ</div>
            {product.discount > 0 && <div className="product-original-price">{product.real_price.toLocaleString()}đ</div>}
          </div>

          {product.status.includes(1) && <div className="product-new-label">New</div>}
          {product.status.includes(3) && <div className="product-hot-label-container">
            <div className="hot-label">Hot</div>
          </div>}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;