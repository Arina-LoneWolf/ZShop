import './ProductManagement.scss';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { productViewDisplayState } from '../../../recoil/productViewDisplayState';
import { productEditDisplayState } from '../../../recoil/productEditDisplayState';
import { productAddDisplayState } from '../../../recoil/productAddDisplayState';
import { dialogState } from '../../../recoil/dialogState';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import EditProduct from './EditProduct';
import ReactPaginate from "react-paginate";
import { useQuery } from 'react-query';
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { TiArrowSortedDown, TiTick } from "react-icons/ti";
import { BiChevronRight } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { EatLoading } from 'react-loadingg';
import viewIcon from '../../../assets/icons/visibility.svg';
import editIcon from '../../../assets/icons/edit.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import productApi from '../../../apis/productApi';

const productStatus = {
  'Không có': 'none',
  'Mới': 'new',
  'Khuyến mãi': 'sale',
  'Bán chạy': 'hot'
}

function ProductManagement() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({ typeKey: 'all' });
  const [searchKey, setSearchKey] = useState('');
  const [currentProduct, setCurrentProduct] = useState();

  const filterRef = useRef(null);
  const searchRef = useRef(null);

  const defaultTypeRef = useRef(null);
  const defaultSortRef = useRef(null);
  const newStatusRef = useRef(null);
  const saleStatusRef = useRef(null);
  const hotStatusRef = useRef(null);

  const setDialog = useSetRecoilState(dialogState);
  const [productViewDisplay, setProductViewDisplay] = useRecoilState(productViewDisplayState);
  const [productEditDisplay, setProductEditDisplay] = useRecoilState(productEditDisplayState);
  const [productAddDisplay, setProductAddDisplay] = useRecoilState(productAddDisplayState);

  const { data: categories } = useQuery('categories', async () => {
    const response = await productApi.getAllCategories();
    return response;
  }, { refetchOnWindowFocus: false });

  const { data: products, isLoading, refetch } = useQuery(['managedProducts', page, searchKey, filter], async () => {
    const pagination = {
      page: page + 1,
      limit: 8,
    }

    let response;

    if (searchKey) {
      const params = {
        ...pagination,
        name: searchKey
      };
      response = await productApi.search(params);
    } else if (filter.typeKey === 'all') {
      const { typeKey, ...filterParams } = filter;
      const params = {
        ...pagination,
        ...filterParams
      };
      response = await productApi.getAll(params);
    } else if (filter.typeKey.includes('/')) {
      const { typeKey, ...filterParams } = filter;
      const category = typeKey.split('/')[0];
      const type = typeKey.split('/')[1];
      const params = {
        ...pagination,
        ...filterParams,
        type
      }
      response = await productApi.getByCategory(category, params);
    } else {
      const { typeKey: category, ...filterParams } = filter;
      const params = {
        ...pagination,
        ...filterParams
      }
      response = await productApi.getByCategory(category, params);
    }

    setTotalPages(response.totalPages);
    return response.products;
  });

  const handleAddProductClick = () => {
    setProductAddDisplay(true);
  }

  const handleViewProductClick = (product) => {
    setCurrentProduct(product);
    setProductViewDisplay(true);
  }

  const handleEditProductClick = (product) => {
    setCurrentProduct(product);
    setProductEditDisplay(true);
  }

  const handleDeleteProductClick = (id) => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      acceptButtonName: 'Xóa',
      adminMode: true,
      func: () => {
        productApi.delete(id).then(response => {
          console.log(response.message);
          refetch();
        }).catch(error => console.log(error));
      }
    });
  }

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  const handleFilterChange = () => {
    setSearchKey('');
    searchRef.current.value = '';

    const formData = new FormData(filterRef.current);
    const typeKey = formData.get('productType');
    const status = formData.getAll('productStatus');
    const sort = formData.get('sortByPrice');

    let params = {
      typeKey,
      sort,
      status
    }

    setPage(0);
    setFilter(params);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;

    setFilter({ typeKey: 'all' });
    setSearchKey(search);
    resetFilterOptions();
    setPage(0);
  }

  const resetFilterOptions = () => {
    defaultTypeRef.current.checked = true;
    defaultSortRef.current.checked = true;
    newStatusRef.current.checked = false;
    saleStatusRef.current.checked = false;
    hotStatusRef.current.checked = false;
  }

  return (
    <React.Fragment>
      <div className="product-other-features">
        <span className="title">Danh sách sản phẩm</span>
        <div className="product-search">
          <IoSearchOutline className="search-icon" />
          <input type="text" placeholder="Tìm kiếm sản phẩm..." className="search-input" ref={searchRef} onChange={handleSearch} />
        </div>

        <div className="add-product-btn" onClick={handleAddProductClick}><AiOutlinePlus className="add-icon" /></div>
      </div>

      <div className={products?.length === 8 ? "product-table" : "product-table offset"}>
        <form className="title-list" ref={filterRef} onChange={handleFilterChange}>
          <div className="image-title fl-6 fl-o-1 title">Ảnh</div>
          <div className="name-title fl-20 title">Tên sản phẩm</div>
          <div className="type-title-container fl-15 title">
            <span className="type-title">Loại</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="type-options">
              {categories?.map(category => (
                <div className="category-option" key={category.categoryName}>
                  <input type="radio" name="productType" id={category.categoryKey} value={category.categoryKey} />
                  <label htmlFor={category.categoryKey}>
                    {category.categoryName}
                    <BiChevronRight className="expand-select-icon" />
                    <div className="type-option">
                      {category.types?.map(type => (
                        <React.Fragment>
                          <input type="radio" name="productType" id={type.typeKey} value={`${category.categoryKey}/${type.typeKey}`} />
                          <label htmlFor={type.typeKey}>{type.typeName}</label>
                        </React.Fragment>
                      ))}
                    </div>
                  </label>
                </div>
              ))}
              <div className="category-option">
                <input type="radio" name="productType" id="all" value="all" defaultChecked ref={defaultTypeRef} />
                <label htmlFor="all">Tất cả</label>
              </div>
            </div>
          </div>
          <div className="quantity-title fl-8 title">Số lượng</div>
          <div className="status-title-container fl-16 title">
            <span className="status-title">Trạng thái</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="status-options">
              <input type="checkbox" name="productStatus" id="new-status" value="Mới" ref={newStatusRef} />
              <label htmlFor="new-status">
                Mới nhất
                <TiTick className="tick-icon" />
              </label>
              <input type="checkbox" name="productStatus" id="sale-status" value="Khuyền mãi" ref={saleStatusRef} />
              <label htmlFor="sale-status">
                Khuyến mãi
                <TiTick className="tick-icon" />
              </label>
              <input type="checkbox" name="productStatus" id="hot-status" value="Bán chạy" ref={hotStatusRef} />
              <label htmlFor="hot-status">
                Bán chạy
                <TiTick className="tick-icon" />
              </label>
            </div>
          </div>
          <div className="unit-price-title-container fl-11 title">
            <span className="unit-price-title">Đơn giá</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="sort-options">
              <input type="radio" name="sortByPrice" id="ascending" value="1" />
              <label htmlFor="ascending">Tăng dần</label>
              <input type="radio" name="sortByPrice" id="descending" value="-1" />
              <label htmlFor="descending">Giảm dần</label>
              <input type="radio" name="sortByPrice" id="none" value="" defaultChecked ref={defaultSortRef} />
              <label htmlFor="none">Bình thường</label>
            </div>
          </div>
          <div className="discount-title fl-10 title">Khuyến mãi</div>
          <div className="manipulation fl-13 title"></div>
        </form>

        <div className="product-list">
          {isLoading && <EatLoading color="#ff7eae" />}
          {products?.map(product => (
            <div key={product.id} className="product-item">
              <div className="product-image-container fl-6 fl-o-1">
                <div className="product-image" style={{ backgroundImage: `url(${product.arrImages[0]})` }}></div>
              </div>
              <div className="product-name fl-20">
                <Link to={`/product/${product.id}`} target='_blank'>{product.name}</Link>
              </div>
              <div className="product-type fl-15">{product.typeName}</div>
              <div className="product-quantity fl-8">{product.quantity}</div>
              <div className="product-status fl-16">
                {product.arrStatus.map(status => (
                  <label key={status} className={'status-label ' + productStatus[status]}>{status}</label>
                ))}
              </div>
              <div className="product-unit-price fl-11">
                <div className="discount-price">{product.priceAfterDis.toLocaleString()}đ</div>
                {product.priceAfterDis !== product.price && <div className="original-price">{product.price.toLocaleString()}đ</div>}
              </div>
              <div className="product-discount fl-10">{product.discount.toLocaleString()}đ</div>
              <div className="product-manipulation fl-13">
                <div className="view-btn" onClick={() => handleViewProductClick(product)}>
                  <img src={viewIcon} className="btn-icon" alt="" />
                </div>
                <div className="edit-btn" onClick={() => handleEditProductClick(product)}>
                  <img src={editIcon} className="btn-icon" alt="" />
                </div>
                <div className="delete-btn" onClick={() => handleDeleteProductClick(product.id)}>
                  <img src={deleteIcon} className="btn-icon" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {products?.length > 0 && <ReactPaginate
        previousLabel={<GrFormPrevious className="prev-icon" />}
        nextLabel={<GrFormNext className="next-icon" />}
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

      {productAddDisplay && <AddProduct refetch={refetch} />}
      {currentProduct && productViewDisplay && <ViewProduct product={currentProduct} />}
      {currentProduct && productEditDisplay && <EditProduct product={currentProduct} refetch={refetch} />}
    </React.Fragment>
  );
}

export default ProductManagement;