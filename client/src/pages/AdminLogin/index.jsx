import './AdminLogin.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/userState';
import ErrorLoginMessage from '../../shared/notifications/ErrorMessage';
import TextError from '../../shared/notifications/TextError';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import vividPinwheel from '../../assets/icons/pinwheel_vivid.svg';
import skyBackground from '../../assets/images/sky-background.jpg';
import userApi from '../../apis/userApi';

const schema = yup.object({
  username: yup.string().required('Chưa nhập tài khoản'),
  password: yup.string()
    .required('Chưa nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
});

function AdminLogin() {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const errorMsg = 'Tài khoản hoặc mật khẩu không đúng';

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
        console.log(res.user);
        if (res.user.isAdmin === 1) {
          setUser({
            accessToken: userAccessToken,
            ...res.user
          });
          history.push('/admin');
        } else {
          setShowErrorMessage(true);
        }
      }).catch(err => console.log(err));
    }).catch(error => {
      console.log(error.response.data.message);
      setShowErrorMessage(true);
    });
  }

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  return (
    <div className="admin-login full-screen-background" style={{ backgroundImage: `url(${skyBackground})` }}>
      <div className="blur-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="admin-login-container"
        >
          <div className="icon-container">
            <img src={vividPinwheel} className="logo-icon" alt="" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Tài khoản</label>
            <input {...register("username")} id="username" />
            <TextError>{errors.username?.message}</TextError>
          </div>

          <div className="form-control">
            <label htmlFor="password">Mật khẩu</label>
            <input {...register("password")} type="password" id="password" />
            <TextError>{errors.password?.message}</TextError>
          </div>

          <button className="submit-btn" type='submit'>Đăng nhập</button>
        </form>

        {showErrorMessage && <ErrorLoginMessage closeErrorMessage={closeErrorMessage} message={errorMsg} adminMode />}
      </div>
    </div>
  );
}

export default AdminLogin;