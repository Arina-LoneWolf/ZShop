import './CloseButton.scss';
import React from 'react';
import { IoIosClose } from "react-icons/io";

function CloseButton() {
  return (
    <div className="close-button">
      <IoIosClose className="close-icon" />
    </div>
  );
}

export default CloseButton;