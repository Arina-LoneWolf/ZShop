import '../Form.scss';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { signUpState } from '../../../recoil/entryPointState';
import { userState } from '../../../recoil/userState';
import { cartState } from '../../../recoil/cartState';
import { resultMessageState, SUCCESS } from '../../../recoil/resultMessageState';
import TextError from '../../notifications/TextError';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userApi from '../../../apis/userApi';
import cartApi from '../../../apis/cartApi';

const schema = yup.object({
  fullName: yup.string().required('*Bắt buộc'),
  username: yup.string().required('*Bắt buộc'),
  email: yup.string()
    .required('*Bắt buộc')
    .email('Email không hợp lệ'),
  password: yup.string()
    .required('*Bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
  confirmPassword: yup.string()
    .required('*Bắt buộc')
    .oneOf([yup.ref('password'), ''], 'Mật khẩu nhập lại không đúng')
});

function SignUpForm() {
  const setSignUp = useSetRecoilState(signUpState);
  const setUser = useSetRecoilState(userState);
  const setCart = useSetRecoilState(cartState);
  const setResultMessage = useSetRecoilState(resultMessageState);

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

      cartApi.get().then(response => {
        console.log(response)
        setCart(response);
      }).catch(error => {
        console.log(error);
      });

      setSignUp(false);
    });
  };

  const responseErrorGoogle = (err) => { };

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    const request = {
      name: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password
    }

    userApi.register(request).then(response => {
      console.log(response.message);
      setSignUp(false);
      setResultMessage({
        show: true,
        type: SUCCESS,
        message: (
          <React.Fragment>
            <div>Một email đã được gửi đến bạn.</div>
            <div>Vui lòng kiểm tra và xác thực tài khoản để hoàn tất đăng ký.</div>
          </React.Fragment>
        )
      });
    }).catch(error => {
      console.log(error.response.data.message);
      if (error.response.data.message === 'This username already exist') {
        setError('username', { message: 'Tên đăng nhập đã được sử dụng' }, { shouldFocus: true });
      } else if (error.response.data.message === 'Duplicate username or email') {
        setError('email', { message: 'Email đã được sử dụng' }, { shouldFocus: true });
      }
    });
  };

  return (
    <div id="sign-up-form">
      <div id="overlay" onClick={() => setSignUp(false)}></div>
      <div className="form-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-interface"
        >
          <div className="form-control">
            <label htmlFor="fullName">Họ tên</label>
            <input {...register("fullName")} />
            <TextError>{errors.fullName?.message}</TextError>
          </div>

          <div className="form-control">
            <label htmlFor="username">Tài khoản</label>
            <input {...register("username")} />
            <TextError>{errors.username?.message}</TextError>
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input {...register("email")} type="email" />
            <TextError>{errors.email?.message}</TextError>
          </div>

          <div className="form-control">
            <label htmlFor="password">Mật khẩu</label>
            <input {...register("password")} type="password" />
            <TextError>{errors.password?.message}</TextError>
          </div>

          <div className="form-control">
            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
            <input {...register("confirmPassword")} type="password" />
            <TextError>{errors.confirmPassword?.message}</TextError>
          </div>

          <button className="submit-btn" type='submit'>Đăng ký</button>

          <div className="strike">
            <span>HOẶC</span>
          </div>

          <GoogleLogin
            clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
            render={renderProps => (
              <div onClick={renderProps.onClick} className="google-submit-btn">
                <FcGoogle className="google-icon" />
                <span>Đăng ký với Google</span>
              </div>
            )}
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;