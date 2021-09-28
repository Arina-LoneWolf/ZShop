import React from 'react';
import './ErrorMessage.scss';

function ErrorMessage({ closeErrorMessage, message, adminMode }) {
  return (
    <div className="error-message">
      <div id="overlay"></div>
      <div className={adminMode ? "container admin-mode" : "container"}>
        <div className="message">{message}</div>
        <div className="ok-btn" onClick={() => closeErrorMessage()}>OK</div>
      </div>
    </div>
  );
}

export default ErrorMessage;