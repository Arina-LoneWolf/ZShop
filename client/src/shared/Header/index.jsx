import './Header.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cartTotalQuantity, cartTotalPrice, cartState } from '../../recoil/cartState';
import { loginState, signUpState } from '../../recoil/entryPointState';
import { userState } from '../../recoil/userState';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ConditionalLink from '../../helpers/ConditionalLink';
import logo from '../../assets/images/textlogo.png';
import emptyCart from '../../assets/images/cart-empty.png';
import userApi from '../../apis/userApi';

function Header() {
  const history = useHistory();
  const { pathname } = useLocation();

  const cart = useRecoilValue(cartState);
  const totalQuantity = useRecoilValue(cartTotalQuantity);
  const totalPrice = useRecoilValue(cartTotalPrice);

  const [login, setLogin] = useRecoilState(loginState);
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const [user, setUser] = useRecoilState(userState);

  const cartPreviewRef = useRef(null);
  const searchRef = useRef(null);

  const [name, setName] = useState('');

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
    if (user.accessToken) {
      setName(user.name);
    } else {
      setName('');
    }
  }, [user]);

  useEffect(() => {
    if (pathname !== '/search' && !pathname.includes('/admin')) {
      searchRef.current.value = '';
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/cart' || pathname.includes('/admin')) return;

    if (cart.length) {
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
                <ConditionalLink to='/account' condition={name}>
                  {name || 'Đăng nhập'}
                </ConditionalLink>
              </span>
              <span className="log-out" onClick={handleSignUpEscape}>{name ? 'Thoát' : 'Đăng ký'}</span>
            </div>
            <div className="cart-group">
              <Link to='/cart' className="cart-hover"></Link>
              <HiOutlineShoppingBag className="cart-icon" />
              <div className="cart-notice">{totalQuantity}</div>
              {!isInCartPage && <div className="cart-preview" ref={cartPreviewRef}>
                <div className="empty-cart-container">
                  <img src={emptyCart} alt="" className="empty-cart-img" />
                  <div className="empty-cart-message">Chưa có sản phẩm nào</div>
                </div>

                <div className="cart-list">
                  <div className="cart-items">
                    {[...cart].reverse().map((item, index) => (
                      <div className="cart-product-container" key={index}>
                        <div className="product-info">
                          <div className="product-color" style={{ backgroundImage: `url(${item.product.color})` }}></div>
                          <div className="product-description">
                            <div className="product-name"><Link to={item.product.url}>{item.product.name}</Link></div>
                            <div className="product-quantity">x{item.quantity}</div>
                          </div>
                        </div>
                        <div className="product-price">{((item.product.price - item.product.discount) * item.quantity).toLocaleString()}đ</div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total-price">
                    <span className="text-label">Thành tiền:</span>
                    <span className="total-price">{totalPrice.toLocaleString()}đ</span>
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
            <li className="shirt">
              <Link to={{ pathname: '/category/ao', state: 'Áo' }}>Áo</Link>
              <ul className="sub-nav">
                <li><Link to={{ pathname: '/category/ao-the-thao', state: 'Áo thể thao' }}>Áo thể thao</Link></li>
                <li><Link to={{ pathname: '/category/ao-thun-nu', state: 'Áo thun nữ' }}>Áo thun nữ</Link></li>
                <li><Link to={{ pathname: '/category/ao-kieu-nu', state: 'Áo kiểu nữ' }}>Áo kiểu nữ</Link></li>
                <li><Link to={{ pathname: '/category/ao-so-mi-nu', state: 'Áo sơ mi nữ' }}>Áo sơ mi nữ</Link></li>
                <li><Link to={{ pathname: '/category/ao-khoac-nu', state: 'Áo khoác nữ' }}>Áo khoác nữ</Link></li>
              </ul>
            </li>
            <li className="pants">
              <Link to={{ pathname: '/category/quan', state: 'Quần' }}>Quần</Link>
              <ul className="sub-nav">
                <li><Link to={{ pathname: '/category/quan-dai', state: 'Quần dài' }}>Quần dài</Link></li>
                <li><Link to={{ pathname: '/category/quan-short-nu', state: 'Quần jean nữ' }}>Quần jean nữ</Link></li>
                <li><Link to={{ pathname: '/category/quan-legging', state: 'Quần legging' }}>Quần legging</Link></li>
              </ul>
            </li>
            <li className="dress-skirt">
              <Link to={{ pathname: '/category/dam-vay', state: 'Đầm váy' }}>Đầm váy</Link>
              <ul className="sub-nav">
                <li><Link to={{ pathname: '/category/chan-vay', state: 'Chân váy' }}>Chân váy</Link></li>
                <li><Link to={{ pathname: '/category/dam-nu', state: 'Đầm nữ' }}>Đầm nữ</Link></li>
                <li><Link to={{ pathname: '/category/yem', state: 'Yếm' }}>Yếm</Link></li>
              </ul>
            </li>
            <li className="set"><Link to={{ pathname: '/category/set', state: 'Set - Jumpsuit' }}>Set - Jumpsuit</Link></li>
            <li className="hot"><Link to={{ pathname: '/category/hot', state: 'Sản phẩm bán chạy' }}>Bán chạy</Link></li>
            <li className="sale"><Link to={{ pathname: '/category/sale', state: 'Sản phẩm khuyến mãi' }}>Khuyến mãi</Link></li>
          </ul>
        </div>
      </div>

      {signUp && <SignUpForm />}
      {login && <LoginForm />}
    </div>
  );
}

export default Header;