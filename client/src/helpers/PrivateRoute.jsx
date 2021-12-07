import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';
import Preloader from '../shared/Preloader';
import { useQuery } from 'react-query';
import userApi from '../apis/userApi';

function PrivateRoute({ component: Component, children, redirect, ...rest }) {
  const user = useRecoilValue(userState);
  const history = useHistory();

  const { isLoading, isSuccess } = useQuery('auth', async () => {
    const userAccessToken = localStorage.getItem('accessToken');

    if (!userAccessToken) {
      throw new Error('Access token not available');
    }

    await userApi.getInfo();
  }, { retry: false });

  useEffect(() => {
    const userAccessToken = localStorage.getItem('accessToken');
    if (!userAccessToken) history.replace(redirect);
  }, [user]);

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