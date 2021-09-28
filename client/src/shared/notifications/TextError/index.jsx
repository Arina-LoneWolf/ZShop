import React from 'react';
import './TextError.scss';

function TextError(props) {
  return (
    <div className="error-container">
      <div className="error">
        {props.children}
      </div>
    </div>
  );
}

export default TextError;