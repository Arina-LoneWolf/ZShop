import './Search.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import ProductCard from '../../shared/ProductCard';
import FetchError from '../../shared/notifications/FetchError';
import ReactPaginate from "react-paginate";
import { EatLoading } from 'react-loadingg';
import productApi from '../../apis/productApi';
import categories from '../../shared/data/categories';
import types from '../../shared/data/types';

function SearchSection() {
  const { search, state, pathname } = useLocation();
  const { name } = queryString.parse(search);
  const { category, type } = useParams();
  const catalog = getCatalog(category);

  const filterRef = useRef(null);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({});

  const { data: products, isLoading, isError } = useQuery(['filteredProducts', page, category, type, name, filter], async () => {
    const pagination = {
      page: page + 1,
      limit: 16
    };

    let response;

    if (search) {
      const params = {
        ...pagination,
        ...filter,
        name
      };
      response = await productApi.search(params);
    } else if (category === 'all') {
      const params = {
        ...pagination,
        ...filter
      };
      response = await productApi.getAll(params);
    } else {
      let params;
      if (type) {
        params = {
          ...pagination,
          ...filter,
          type
        };
      } else {
        params = {
          ...pagination,
          ...filter
        };
      }
      response = await productApi.getByCategory(category, params);
    }

    setTotalPages(response.totalPages);
    console.log(response.products);
    return response.products;
  });

  useEffect(() => {
    setPage(0);
  }, [category, type, filter]);

  const handlePageChange = ({ selected }) => {
    setPage(selected);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setFilter({});
    filterRef.current.selectedIndex = 0;
  }, [pathname, category, type])

  const handleFilterChange = (e) => {
    switch (e.target.value) {
      case 'new':
        setFilter({ status: 'Mới' });
        break;
      case 'sale':
        setFilter({ status: 'Khuyến mãi' });
        break;
      case 'hot':
        setFilter({ status: 'Bán chạy' });
        break;
      case 'ascending':
        setFilter({ sort: 1 });
        break;
      case 'descending':
        setFilter({ sort: -1 });
        break;
      default:
        break;
    }
  };

  return (
    <div className="search-section">
      <div className="row">
        <div className="product-catalog col fl-20">
          <div className="title">Danh mục sản phẩm</div>
          <ul className="catalog-detail">
            {catalog.map((item, index) => (
              item.typeKey ? <li key={index}><Link to={{ pathname: `/category/${item.categoryKey}/${item.typeKey}`, state: item.name }}>{item.name}</Link></li>
                : <li key={index}><Link to={{ pathname: `/category/${item.categoryKey}`, state: item.name }}>{item.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="search-result col fl-80">
          <div className="row">
            <div className="title-and-filters col l-12">
              <div className="row">
                <div className="col fl-80">
                  <div className="title">{state || `Tìm kiếm: ${name}`}</div>
                </div>
                <div className="col fl-20">
                  <select name="filters" id="filters" onChange={handleFilterChange} ref={filterRef}>
                    <option value="option">------ Lọc -----</option>
                    <option value="new">Mới</option>
                    <option value="hot">Hot</option>
                    <option value="sale">Sale off</option>
                    <option value="ascending">Giá tăng dần</option>
                    <option value="descending">Giá giảm dần</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row products-list">
            {isLoading && <div style={{ height: '60vh' }}>
              <EatLoading color='#ffb0bd' />
            </div>}
            {isError && <FetchError />}
            {products?.map(product => <ProductCard product={product} key={product.id} />)}
          </div>

          {(category === 'gift' || category === 'decorator' || category === 'bag' || category === 'stuff-animal') && <div className="no-set">Hiện chưa có sản phẩm này</div>}

          {products?.length === 0 && <div className="no-result">Không có kết quả phù hợp với từ khóa "{name}"</div>}

          {products?.length > 0 && <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"paginated-btn"}
            breakClassName={"paginated-btn"}
            previousClassName={"prev-btn"}
            nextClassName={"next-btn"}
            disabledClassName={"disabled-btn"}
            activeClassName={"active-btn"}
            forcePage={page}
          />}
        </div>
      </div>
    </div>
  );
}

export default SearchSection;

const getCatalog = (category) => {
  let catalog = [];

  if (category === 'all') {
    catalog = categories.map(e => ({
      categoryKey: e.key,
      name: e.name
    }));
  } else {
    const accordingTypes = types.filter(type => type.categoryKey === category);
    catalog = accordingTypes.map(e => ({
      categoryKey: e.categoryKey,
      typeKey: e.key,
      name: e.name
    }))
  }

  return catalog;
}