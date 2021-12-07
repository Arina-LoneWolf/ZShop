import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { resultMessageState, SUCCESS, FAILURE } from '../../../recoil/resultMessageState';
import { dialogState } from '../../../recoil/dialogState';
import TextError from '../../../shared/notifications/TextError';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userApi from '../../../apis/userApi';

const schema = yup.object({
  password: yup.string().required('*Bắt buộc'),
  newPassword: yup.string()
    .required('*Bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
    .notOneOf([yup.ref('password'), ''], 'Vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại của bạn'),
  confirmNewPassword: yup.string()
    .required('*Bắt buộc')
    .oneOf([yup.ref('newPassword'), ''], 'Mật khẩu nhập lại không đúng')
});

function ChangePassword() {
  const setDialog = useSetRecoilState(dialogState);
  const setResultMessage = useSetRecoilState(resultMessageState);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    const data = {
      newPassword: values.newPassword,
      currentPassword: values.password
    }

    setDialog({
      show: true,
      message: 'Bạn xác nhận muốn đổi mật khẩu?',
      acceptButtonName: 'Xác nhận',
      func: () => {
        userApi.updatePassword(data).then(response => {
          console.log(response.message);
          reset();
          setResultMessage({
            show: true,
            type: SUCCESS,
            message: 'Mật khẩu mới đã được cập nhật.'
          });
        }).catch(error => {
          console.log(error.response.data.message);
          if (error.response.data.message === 'Incorrect password') {
            reset();
            setResultMessage({
              show: true,
              type: FAILURE,
              message: 'Bạn đã nhập sai mật khẩu.'
            });
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <div className="info-title">Thay đổi mật khẩu</div>
      <div className="divider"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-interface"
      >
        <div className="form-control">
          <label htmlFor="password">Nhập mật khẩu:</label>
          <div className="input-container">
            <input {...register("password")} type="password" id="password" />
            <TextError>{errors.password?.message}</TextError>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="newPassword">Nhập mật khẩu mới:</label>
          <div className="input-container">
            <input {...register("newPassword")} type="password" id="newPassword" />
            <TextError>{errors.newPassword?.message}</TextError>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="confirmNewPassword">Nhập lại mật khẩu mới:</label>
          <div className="input-container">
            <input {...register("confirmNewPassword")} type="password" id="confirmNewPassword" />
            <TextError>{errors.confirmNewPassword?.message}</TextError>
          </div>
        </div>

        <button className="update-btn" type="submit">Cập nhật</button>
      </form>
    </React.Fragment>
  );
}

export default ChangePassword;