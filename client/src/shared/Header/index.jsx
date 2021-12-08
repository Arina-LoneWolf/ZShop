import './Header.scss';
import React, { useEffect, useRef } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cartState } from '../../recoil/cartState';
import { loginState, signUpState } from '../../recoil/entryPointState';
import { userState } from '../../recoil/userState';
import { useQuery } from 'react-query';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ConditionalLink from '../../helpers/ConditionalLink';
import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import logo from '../../assets/images/textlogo.png';
import emptyCart from '../../assets/images/cart-empty.png';
import userApi from '../../apis/userApi';
import productApi from '../../apis/productApi';

function Header() {
  const { data: categories } = useQuery('categories', async () => {
    const response = await productApi.getAllCategories();
    console.log('CATEGORIES: ', response);
    return response;
  }, { refetchOnWindowFocus: false });

  const history = useHistory();
  const { pathname } = useLocation();

  const cart = useRecoilValue(cartState);

  const [login, setLogin] = useRecoilState(loginState);
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const [user, setUser] = useRecoilState(userState);

  const cartPreviewRef = useRef(null);
  const searchRef = useRef(null);

  const handleLoginUser = (e) => {
    if (e.target.innerText === 'Đăng nhập')
      setLogin(true);
  };

  const handleSignUpEscape = (e) => {
    if (e.target.innerText === 'Đăng ký') {
      setSignUp(true);
    } else {
      setUser({});
      localStorage.removeItem('accessToken');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const keyword = searchRef.current.value;
    if (keyword)
      history.push(`/search?name=${keyword}`);
  }

  useEffect(() => {
    const userAccessToken = localStorage.getItem('accessToken');

    if (userAccessToken) {
      userApi.getInfo().then(response => {
        console.log(response)
        setUser({
          accessToken: userAccessToken,
          ...response.user,
        })
      }).catch(error => {
        console.log(error);
      })
    }
  }, []);

  useEffect(() => {
    const handleAuthentication = (e) => {
      if (e.key === 'accessToken') {
        if (e.oldValue && !e.newValue) {
          setUser({});
        } else if (e.newValue) {
          const userAccessToken = localStorage.getItem('accessToken');

          userApi.getInfo().then(response => {
            console.log(response)
            setUser({
              accessToken: userAccessToken,
              ...response.user,
            })
          }).catch(error => {
            console.log(error);
          })
        }
      }
    }

    window.addEventListener('storage', handleAuthentication)

    return function cleanup() {
      window.removeEventListener('storage', handleAuthentication)
    }
  }, []);

  useEffect(() => {
    if (pathname !== '/search' && !pathname.includes('/admin')) {
      searchRef.current.value = '';
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/cart' || pathname.includes('/admin')) return;

    if (cart.products?.length) {
      cartPreviewRef.current.classList.remove('empty');
    } else {
      cartPreviewRef.current.classList.add('empty');
    }
  }, [cart, pathname]);

  const isInDashboard = useRouteMatch('/admin');
  const isInCartPage = useRouteMatch('/cart');

  if (isInDashboard) return null;

  return (
    <div className="navigation grid">
      <div className="header">
        <div className="container">
          <div className="logo col l-3">
            <Link to='/'>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <form className="search col l-6">
            <input className="search-bar" type="text" placeholder="Tìm kiếm sản phẩm" ref={searchRef} />
            <button type="submit" className="search-btn" onClick={onSubmit}>
              <FaSearch className="search-icon" />
            </button>
          </form>
          <div className="account-cart col l-3">
            <div className="account">
              <span className="name" onClick={handleLoginUser}>
                <ConditionalLink to='/account' condition={user.name}>
                  {user.name || 'Đăng nhập'}
                </ConditionalLink>
              </span>
              <span className="log-out" onClick={handleSignUpEscape}>{user.name ? 'Thoát' : 'Đăng ký'}</span>
            </div>
            <div className="cart-group">
              <Link to='/cart' className="cart-hover"></Link>
              <HiOutlineShoppingBag className="cart-icon" />
              <div className="cart-notice">{cart.numberProducts}</div>
              {!isInCartPage && <div className="cart-preview" ref={cartPreviewRef}>
                <div className="empty-cart-container">
                  <img src={emptyCart} alt="" className="empty-cart-img" />
                  <div className="empty-cart-message">Chưa có sản phẩm nào</div>
                </div>

                <div className="cart-list">
                  <div className="cart-items">
                    {cart?.products.length !== 0 && [...cart.products].reverse().map((product, index) => (
                      <div className="cart-product-container" key={index}>
                        <div className="product-info">
                          <div className="product-color" style={{ backgroundImage: `url(${product.colorLink})` }}></div>
                          <div className="product-description">
                            <div className="product-name"><Link to={`/product/${product.id}`}>{product.name}</Link></div>
                            <div className="product-quantity">x{product.quantity}</div>
                          </div>
                        </div>
                        <div className="product-price">{product.priceAfterDis.toLocaleString()}đ</div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total-price">
                    <span className="text-label">Thành tiền:</span>
                    <span className="total-price">{cart.totalPrice.toLocaleString()}đ</span>
                  </div>
                  <Link to='/cart'><div className="view-cart-btn">Xem giỏ hàng</div></Link>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="nav">
        <div className="nav-bar-container">
          <ul className="nav-bar">
            <li className="all"><Link to={{ pathname: '/category/all', state: 'Tất cả sản phẩm' }}>Tất cả</Link></li>
            {categories?.map(category => (
              <li className="category" key={category.categoryName}>
                <Link to={{ pathname: `/category/${category.categoryKey}`, state: category.categoryName }}>
                  {category.categoryName}
                </Link>
                <ul className="sub-nav">
                  {category.types?.map(type => (
                    <li key={type.typeName}>
                      <Link to={{ pathname: `/category/${category.categoryKey}/${type.typeKey}`, state: type.typeName}}>
                        {type.typeName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {signUp && <SignUpForm />}
      {login && <LoginForm />}
    </div>
  );
}

export default Header;