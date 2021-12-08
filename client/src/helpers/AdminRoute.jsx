import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';
import { useQuery } from 'react-query';
import Preloader from '../shared/Preloader';
import userApi from '../apis/userApi';

function AdminRoute({ component: Component, children, redirect, ...rest }) {
  const user = useRecoilValue(userState);

  const { isLoading, isSuccess } = useQuery(['authAdmin', user], async () => {
    const userAccessToken = localStorage.getItem('accessToken');

    if (!userAccessToken) {
      throw new Error('Access token not available');
    }

    const response = await userApi.getInfo();
    if (response.user.isAdmin !== 1) {
      throw new Error('You are not an admin');
    }
  }, { retry: false });

  return (
    <React.Fragment>
      {isLoading ? (
        <Preloader />
      ) : (
        <Route {...rest} render={() =>
          isSuccess ? children || <Component /> : <Redirect to={{ pathname: redirect }} />
        } />
      )}
    </React.Fragment>
  );
}

export default AdminRoute;