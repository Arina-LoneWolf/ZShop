import './NewProducts.scss';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { TransverseLoading } from 'react-loadingg';
import productApi from '../../../apis/productApi';
import spinner from '../../../assets/icons/spinner.svg';
import ProductCard from '../../../shared/ProductCard';

function NewProductsSection() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { isLoading } = useQuery(['newProducts', page], async () => {
    const params ={
      page,
      limit: 16
    }

    const response = await productApi.getNew(params);
    const updatedProducts = [...products].concat(response.products);

    setProducts(updatedProducts);
    setTotalPages(response.totalPages);
  }, { refetchOnWindowFocus: false });

  const showMoreItems = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="new-products-section">
      <div className="container grid">
        <div className="row">
          <div className="section-title col l-12">Sản phẩm mới</div>
        </div>

        <div className="row">
          {isLoading && !products.length && <div style={{ height: '10vh', position: 'relative', width: '100%' }}>
            <TransverseLoading color='#ffb0bd' size='large' />
          </div>}

          {products?.map(product => <ProductCard product={product} key={product._id} />)}
        </div>

        {(products.length !== 0 && page < totalPages) && <div className="load-more-btn" onClick={showMoreItems}>
          {isLoading ? <img src={spinner} className="loading-icon" alt="" /> : 'Xem thêm'}
        </div>}
      </div>
    </div>
  );
}

export default NewProductsSection;