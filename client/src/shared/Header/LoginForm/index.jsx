import '../Form.scss';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../recoil/entryPointState';
import { userState } from '../../../recoil/userState';
import TextError from '../../notifications/TextError';
import ErrorLoginMessage from '../../notifications/ErrorMessage'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userApi from '../../../apis/userApi';

const schema = yup.object({
  username: yup.string().required('Chưa nhập tài khoản'),
  password: yup.string()
    .required('Chưa nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
});

function LoginForm() {
  const setLogin = useSetRecoilState(loginState);
  const setUser = useSetRecoilState(userState);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const responseSuccessGoogle = (res) => {
    console.log(res);
    const request = { tokenId: res.tokenId };
    userApi.loginWithGoogle(request).then(response => {
      console.log(response);
      const userAccessToken = response.accessToken;
      localStorage.setItem('accessToken', userAccessToken);

      userApi.getInfo().then(res => {
        console.log(res.user);
        setUser({
          accessToken: userAccessToken,
          ...res.user
        });
      }).catch(err => console.log(err));

      setLogin(false);
    });
  };

  const responseErrorGoogle = (res) => { };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    const request = {
      username: values.username,
      password: values.password
    }

    userApi.login(request).then(response => {
      console.log(response);
      const userAccessToken = response.accessToken;
      localStorage.setItem('accessToken', userAccessToken);

      userApi.getInfo().then(res => {
        console.log(res);
        setUser({
          accessToken: userAccessToken,
          ...res.user
        });
      }).catch(err => console.log(err));

      setLogin(false);
    }).catch(error => {
      console.log(error.response.data.message);
      if (error.response.data.message === 'Please active account') {
        setErrorMsg('Vui lòng xác thực tài khoản trước khi đăng nhập');
      } else {
        setErrorMsg('Tài khoản hoặc mật khẩu không đúng');
      }
      setShowErrorMessage(true);
    });
  };

  return (
    <div id="login-form">
      <div id="overlay" onClick={() => setLogin(false)}></div>
      <div className="form-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-interface"
        >
          <div className="form-control">
            <label htmlFor="name">Tài khoản</label>
            <input {...register("username")} id="username" />
            <TextError>{errors.username?.message}</TextError>
          </div>

          <div className="form-control">
            <label htmlFor="password">Mật khẩu</label>
            <input {...register("password")} id="password" type="password" />
            <TextError>{errors.password?.message}</TextError>
          </div>

          <button className="submit-btn" type='submit'>Đăng nhập</button>

          <div className="strike">
            <span>HOẶC</span>
          </div>

          <GoogleLogin
            clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
            render={renderProps => (
              <div onClick={renderProps.onClick} className="google-submit-btn">
                <FcGoogle className="google-icon" />
                <span>Đăng nhập với Google</span>
              </div>
            )}
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </form>
      </div>

      {showErrorMessage && <ErrorLoginMessage closeErrorMessage={closeErrorMessage} message={errorMsg} />}
    </div>
  );
}

export default LoginForm;