import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import Preloader from '../shared/Preloader';
import { useQuery } from 'react-query';
import userApi from '../apis/userApi';

function PrivateRoute({ component: Component, children, redirect, ...rest }) {
  const setUser = useSetRecoilState(userState);

  const { isLoading, isSuccess } = useQuery('authAdmin', async () => {
    const userAccessToken = localStorage.getItem('accessToken');

    if (!userAccessToken) {
      throw new Error('Access token not available');
    }

    const response = await userApi.getInfo();

    setUser({
      accessToken: userAccessToken,
      ...response.user,
    })
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

export default PrivateRoute;