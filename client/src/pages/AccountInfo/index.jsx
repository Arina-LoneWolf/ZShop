import './AccountInfo.scss';
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import OrderHistory from './OrderHistory';
import ChangeEmail from './ChangeEmail';
import { IoPersonCircle } from "react-icons/io5";

function AccountInfo() {
  // let { path, url } = useRouteMatch();

  const [catalogOption, setCatalogOption] = useState('changePassword');
  console.log('account info render');

  const catalogOptionInfo = {
    profile: <Profile />,
    changePassword: <ChangePassword />,
    orderHistory: <OrderHistory />,
    changeEmail: <ChangeEmail />
  }

  const catalogRef = useRef(null);
  useEffect(() => {
    console.log('catalog change');
  }, [catalogOption])

  const handleCatalogClick = (e, option) => {
    const catalogItems = catalogRef.current.childNodes;
    catalogItems.forEach((catalogItem) => {
      catalogItem.classList.remove('active');
    });
    e.target.classList.add('active');
    setCatalogOption(option);
  };

  return (
    <div className="account-info grid">
      <div className="row">
        <div className="catalog-container l-2-4">
          <IoPersonCircle className="account-icon" />
          <ul className="catalog" ref={catalogRef}>
            <li className="active" onClick={(e) => handleCatalogClick(e, 'profile')}>Thông tin tài khoản</li>
            <li onClick={(e) => handleCatalogClick(e, 'orderHistory')}>Lịch sử đơn hàng</li>
            <li onClick={(e) => handleCatalogClick(e, 'changeEmail')}>Cập nhật email</li>
            <li onClick={(e) => handleCatalogClick(e, 'changePassword')}>Đổi mật khẩu</li>
          </ul>
          {/* <div className="catalog" ref={catalogRef}>
            <NavLink to={`/account/info`} activeClassName="active">Thông tin tài khoản</NavLink>
            <NavLink to={`/account/order-history`} activeClassName="active">Lịch sử đơn hàng</NavLink>
            <NavLink to={`/account/update-email`} activeClassName="active">Cập nhật email</NavLink>
            <NavLink to={`/account/update-password`} activeClassName="active">Đổi mật khẩu</NavLink>
          </div> */}
        </div>

        <div className="info-container l-8">
          {catalogOptionInfo[catalogOption]}
          {/* <Switch>
            <Route path={`/account/info`} component={Profile} />
            <Route path={`/account/order-history`} component={OrderHistory} />
            <Route path={`/account/update-email`} component={ChangeEmail} />
            <Route path={`/account/update-password`} component={ChangePassword} />
          </Switch> */}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;