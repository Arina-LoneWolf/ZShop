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
import axios from 'axios';

function SearchSection() {
  const { search, state, pathname } = useLocation();
  const { name } = queryString.parse(search);
  const { category } = useParams();
  const catalog = getCatalog(category);

  const filterRef = useRef(null);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');

  const { data, isLoading, isError } = useQuery(['filteredProducts', page, category, name, filter], async () => {
    const params = {};

    let categoryKey;
    if (getCategoryKey(category)) {
      categoryKey = getCategoryKey(category);
    } else {
      categoryKey = `search?name=${name}&`;
    }

    switch (filter) {
      case 'new':
        categoryKey += 'status=1&';
        break;
      case 'ascending':
        categoryKey += 'sort=1&';
        break;
      case 'descending':
        categoryKey += 'sort=-1&';
        break;
      case 'sale':
        categoryKey += 'status=2&';
        break;
      default:
        break;
    }

    // console.log(categoryKey);
    // console.log(`http://localhost:5000/api/product/${categoryKey}page=${page + 1}&limit=16`);

    const response = await axios.get(`http://localhost:5000/api/product/${categoryKey}page=${page + 1}&limit=16`);
    setTotalPages(response.data.totalPages);

    return response.data;
  });

  useEffect(() => {
    // console.log('set page 0');
    setPage(0);
  }, [category, filter]);

  const handlePageChange = ({ selected }) => {
    // console.log('page click: ', selected);
    setPage(selected);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setFilter('');
    filterRef.current.selectedIndex = 0;
  }, [pathname, category])

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="search-section">
      <div className="row">
        <div className="product-catalog col fl-20">
          <div className="title">Danh mục sản phẩm</div>
          <ul className="catalog-detail">
            {catalog.map((item, index) => (
              <li key={index}><Link to={{ pathname: `/category/${item.key}`, state: item.value }}>{item.value}</Link></li>
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
                  <select name="filters" id="filters" onChange={handleFilter} ref={filterRef}>
                    <option value="option">------ Lọc -----</option>
                    <option value="new">Mới nhất</option>
                    <option value="ascending">Giá tăng dần</option>
                    <option value="descending">Giá giảm dần</option>
                    <option value="sale">Sale</option>
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
            {data?.products.map(product => <ProductCard product={product} key={product._id} />)}
          </div>

          {category === 'set' && <div className="no-set">Hiện chưa có sản phẩm này</div>}

          {category !== 'set' && data?.products.length === 0 && <div className="no-result">Không có kết quả phù hợp với từ khóa "{name}"</div>}

          {data?.products.length > 0 && <ReactPaginate
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
  switch (category) {
    case 'ao':
    case 'ao-the-thao':
    case 'ao-thun-nu':
    case 'ao-kieu-nu':
    case 'ao-so-mi-nu':
    case 'ao-khoac-nu':
      return [
        {
          key: 'ao-the-thao',
          value: 'Áo thể thao'
        },
        {
          key: 'ao-thun-nu',
          value: 'Áo thun nữ'
        },
        {
          key: 'ao-kieu-nu',
          value: 'Áo kiểu nữ'
        },
        {
          key: 'ao-so-mi-nu',
          value: 'Áo sơ mi nữ'
        },
        {
          key: 'ao-khoac-nu',
          value: 'Áo khoác nữ'
        }
      ];

    case 'quan':
    case 'quan-dai':
    case 'quan-short-nu':
    case 'quan-legging':
      return [
        {
          key: 'quan-dai',
          value: 'Quần dài'
        },
        {
          key: 'quan-short-nu',
          value: 'Quần jean nữ'
        },
        {
          key: 'quan-legging',
          value: 'Quần legging'
        }
      ];

    case 'dam-vay':
    case 'chan-vay':
    case 'dam-nu':
    case 'yem':
      return [
        {
          key: 'chan-vay',
          value: 'Chân váy'
        },
        {
          key: 'dam-nu',
          value: 'Đầm nữ'
        },
        {
          key: 'yem',
          value: 'Yếm'
        }
      ];

    default:
      return [
        {
          key: 'ao',
          value: 'Áo'
        },
        {
          key: 'quan',
          value: 'Quần'
        },
        {
          key: 'dam-vay',
          value: 'Đầm váy'
        }
      ];
  }
}

const getCategoryKey = (category) => {
  switch (category) {
    case 'ao':
    case 'quan':
    case 'dam-vay':
      return `detail/${category}?`;

    case 'ao-the-thao':
    case 'ao-thun-nu':
    case 'ao-kieu-nu':
    case 'ao-so-mi-nu':
    case 'ao-khoac-nu':
      return `detail/ao?type=${category}&`;

    case 'quan-dai':
    case 'quan-short-nu':
    case 'quan-legging':
      return `detail/quan?type=${category}&`;

    case 'chan-vay':
    case 'dam-nu':
    case 'yem':
      return `detail/dam-vay?type=${category}&`;

    case 'hot':
      return `all?status=3&`;

    case 'sale':
      return `all?status=2&`;

    case 'all':
      return `all?`;

    default:
      return null;
  }
}