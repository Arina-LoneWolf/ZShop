import './Banner.scss';
import React from 'react';
import slider3 from '../../../assets/images/slider-3.png';

function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="l-12 slider-container">
          <div className="slider" style={{ backgroundImage: `url(${slider3})` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Banner;