import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { resultMessageState, SUCCESS, FAILURE } from '../../../recoil/resultMessageState';
import { dialogState } from '../../../recoil/dialogState';
import { userState } from '../../../recoil/userState';
import TextError from '../../../shared/notifications/TextError';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import provinces from '../../../shared/data/provinces';
import districts from '../../../shared/data/districts';
import userApi from '../../../apis/userApi';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  fullName: yup.string().required('*Bắt buộc'),
  phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
});

function Profile() {
  const [user, setUser] = useRecoilState(userState);
  const setDialog = useSetRecoilState(dialogState);
  const setResultMessage = useSetRecoilState(resultMessageState);

  const [province, setProvince] = useState(user.city);
  const [accordingDistricts, setAccordingDistricts] = useState(districts.filter(district => district.provinceName === province));

  useEffect(() => {
    const newDistricts = districts.filter(district => district.provinceName === province);
    setAccordingDistricts(newDistricts);
  }, [province]);

  const defaultValues = {
    fullName: user.name,
    phone: user.phone,
    province: user.city,
    district: user.district,
    addressDetail: user.adress // sai chính tả dm
  };

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    const data = {
      name: values.fullName,
      phone: values.phone,
      city: values.province,
      district: values.district,
      adress: values.addressDetail // sai chính tả dm
    }

    setDialog({
      show: true,
      message: 'Bạn xác nhận muốn cập nhật thông tin?',
      acceptButtonName: 'Xác nhận',
      func: () => {
        userApi.updateInfo(data).then(response => {
          console.log(response.message);
          setUser({ ...user, ...data });
          setResultMessage({
            show: true,
            type: SUCCESS,
            message: 'Thông tin tài khoản đã được cập nhật'
          });
        }).catch(error => console.log(error));
      }
    });
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.selectedOptions[0].value);
  };

  return (
    <React.Fragment>
      <div className="info-title">Hồ sơ của tôi</div>
      <div className="divider"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-interface"
      >
        <div className="form-control">
          <label htmlFor="fullName">Họ tên:</label>
          <div className="input-container">
            <input {...register("fullName")} id="fullName" />
            <TextError>{errors.fullName?.message}</TextError>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="phone">Điện thoại:</label>
          <div className="input-container">
            <input {...register("phone")} id="phone" />
            <TextError>{errors.phone?.message}</TextError>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="province">Tỉnh/Thành phố:</label>
          <select {...register("province")} id="province" onChange={(e) => handleProvinceChange(e)}>
            <option hidden value="">-- Tỉnh/Thành phố --</option>
            {provinces.map(province => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <TextError>{errors.province?.message}</TextError>
        </div>

        <div className="form-control">
          <label htmlFor="district">Quận/Huyện:</label>
          <select {...register("district")} id="district">
            <option hidden value="">-- Quận/Huyện --</option>
            {accordingDistricts.map(district => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          <TextError>{errors.district?.message}</TextError>
        </div>

        <div className="form-control">
          <label htmlFor="addressDetail">Địa chỉ chi tiết:</label>
          <div className="input-container">
            <input {...register("addressDetail")} id="addressDetail" />
            <TextError>{errors.addressDetail?.message}</TextError>
          </div>
        </div>

        <button className="update-btn" type="submit" disabled={!isDirty}>Cập nhật</button>
      </form>
    </React.Fragment>
  );
};

export default Profile;