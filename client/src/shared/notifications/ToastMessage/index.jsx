import './ToastMessage.scss';
import React, { useRef, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { toastDisplayState } from '../../../recoil/toastDisplayState';

function ToastMessage() {
  const toastRef = useRef(null);
  let progressClassName = '';

  const [toastDisplay, setToastDisplay] = useRecoilState(toastDisplayState);

  const match = useRouteMatch('/admin');
  if (match) {
    progressClassName = 'progress-bar admin-mode';
  } else {
    progressClassName = 'progress-bar';
  }

  const disableToast = () => {
    toastRef.current.classList.add('disabled');
    setTimeout(() => {
      setToastDisplay({...toastDisplay, show: false});
    }, 400);
  }

  useEffect(() => {
    const autoDisappear = setTimeout(() => {
      setToastDisplay({...toastDisplay, show: false})
    }, 5400);

    return () => clearTimeout(autoDisappear);
  }, []);

  return (
    <div id="toast" ref={toastRef}>
      <div id="overlay" onClick={disableToast}></div>
      <div className="toast-message-container">
        <div className="message">{toastDisplay.message}</div>
        <div className={progressClassName}></div>
      </div>
    </div>
  )
}

export default ToastMessage;