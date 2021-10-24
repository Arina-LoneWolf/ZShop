import './Preloader.scss';
import React from 'react';
import preloader from '../../assets/images/preloader-1.gif';

function Preloader() {
  return (
    <div className="preloader">
      <img src={preloader} alt="preloader" />
    </div>
  );
}

export default Preloader;