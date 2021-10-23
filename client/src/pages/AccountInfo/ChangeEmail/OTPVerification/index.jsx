import './OTPVerification.scss';
import React, { useState, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../../../recoil/userState';
import { resultMessageState, SUCCESS } from '../../../../recoil/resultMessageState';
import ErrorOTPMessage from '../../../../shared/notifications/ErrorMessage';
import userApi from '../../../../apis/userApi';

const OTPVerification = React.forwardRef(({ resendOTP, updateNewEmail }, ref) => {
  const [user, setUser] = useRecoilState(userState);
  const setResultMessage = useSetRecoilState(resultMessageState);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const errorMsg = 'Mã OTP không chính xác';

  const onSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current.value.trim()) return;

    const request = {
      token: user.emailToken,
      otp: parseInt(inputRef.current.value)
    }

    userApi.verifyOTP(request).then(response => {
      console.log(response);
      bodyRef.current.classList.add('disabled');
      setUser({ ...user, email: response.newEmail });
      setResultMessage({
        show: true,
        type: SUCCESS,
        message: 'Email đã được cập nhật',
        func: () => {
          closeOTPVerification();
          updateNewEmail(response.newEmail);
          bodyRef.current.classList.remove('disabled');
        }
      });
    }).catch(error => {
      console.log(error.response.data.message);
      setShowErrorMessage(true);
    });
  }

  const closeOTPVerification = () => {
    document.querySelector('.otp-verification').classList.remove('active');
    inputRef.current.value = '';
  }

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  return (
    <div className="otp-verification" ref={ref}>
      <div className="otp-verification-body" ref={bodyRef}>
        <div id="overlay" onClick={closeOTPVerification}></div>
        <form className="otp-verification-container">
          <p className="otp-message">
            Mã xác nhận đã được gửi đến email mới của bạn.
            Vui lòng kiểm tra và nhập mã xác nhận để hoàn tất cập nhật.
          </p>

          <div className="otp-input">
            <input type="text" ref={inputRef} />
            <button type="submit" className="submit-otp-btn" onClick={onSubmit}>Xác nhận</button>
          </div>

          <span className="resend-otp-message">Không nhận được mã xác minh?</span>
          <span className="resend-otp-btn" onClick={resendOTP}>Gửi lại mã</span>
        </form>
      </div>

      {showErrorMessage && <ErrorOTPMessage closeErrorMessage={closeErrorMessage} message={errorMsg} />}
    </div>
  );
});

export default OTPVerification;