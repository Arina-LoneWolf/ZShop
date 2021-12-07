import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/userState';
import TextError from '../../../shared/notifications/TextError';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userApi from '../../../apis/userApi';
import OTPVerification from './OTPVerification';

const schema = yup.object({
  newEmail: yup.string()
    .required('*Bắt buộc')
    .notOneOf([yup.ref('currentEmail'), ''], 'Vui lòng nhập email mới khác với email hiện tại của bạn')
    .email('Email không hợp lệ')
});

function ChangeEmail() {
  const [user, setUser] = useRecoilState(userState);

  const OTPVerificationRef = useRef(null);

  const defaultValues = {
    currentEmail: user.email,
    newEmail: ''
  };

  const { register, handleSubmit, setError, getValues, reset, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    const newEmail = { newEmail: values.newEmail };

    userApi.updateEmail(newEmail).then(response => {
      console.log(response);
      OTPVerificationRef.current.classList.add('active');
      setUser({ ...user, emailToken: response.token });
    }).catch(error => {
      console.log(error);
      console.log(error.response.data.message);
      if (error.response.data.message === 'This email already exists') {
        setError('newEmail', { message: 'Email đã được sử dụng' }, { shouldFocus: true });
      }
    });
  };

  const resendOTP = () => {
    const newEmail = { newEmail: getValues('newEmail') };

    userApi.updateEmail(newEmail).then(response => {
      console.log(response);
      setUser({ ...user, emailToken: response.token });
    }).catch(error => console.log(error.response.data.message));
  }

  const updateNewEmail = (newEmail) => {
    reset({ currentEmail: newEmail });
  }

  return (
    <React.Fragment>
      <div className="info-title">Cập nhật địa chỉ Email</div>
      <div className="divider"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-interface"
      >
        <div className="form-control">
          <label htmlFor="currentEmail">Địa chỉ email hiện tại:</label>
          <div className="input-container">
            <input {...register("currentEmail")} type="email" disabled />
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="newEmail">Địa chỉ email mới:</label>
          <div className="input-container">
            <input {...register("newEmail")} type="email"/>
            <TextError>{errors.newEmail?.message}</TextError>
          </div>
        </div>

        <button className="update-btn" type='submit'>Cập nhật</button>
      </form>

      <OTPVerification ref={OTPVerificationRef} resendOTP={resendOTP} updateNewEmail={updateNewEmail} />
    </React.Fragment>
  );
}

export default ChangeEmail;