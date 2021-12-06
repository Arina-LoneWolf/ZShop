import './Banner.scss';
import React from "react";
import { useRecoilState } from 'recoil';
import { bannerManagerDisplayState } from '../../../recoil/bannerManagerDisplayState';
import EditBanner from './EditBanner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import { MdEdit } from 'react-icons/md';
import slider1 from '../../../assets/images/slider-1.png';
import slider2 from '../../../assets/images/slider-2.png';
import slider3 from '../../../assets/images/slider-3.png';
import slider4 from '../../../assets/images/slider-4.png';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Banner() {
  const [bannerManagerDisplay, setBannerManagerDisplay] = useRecoilState(bannerManagerDisplayState);

  const showBannerManager = () => {
    setBannerManagerDisplay(true);
  }

  return (
    <div className="banner">
      <div className="container">
        <div className="l-12 slider-container">
          <Swiper
            spaceBetween={0}
            loop={true}
            speed={500}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
            navigation={true}
            className="slideshow-banner"
          >
            <SwiperSlide>
              <img src={slider1} alt="slider1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider2} alt="slider2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider3} alt="slider3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider4} alt="slider4" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="edit-btn" onClick={showBannerManager}>
          Chỉnh sửa
          <MdEdit className="edit-icon" />
        </div>
      </div>

      {bannerManagerDisplay && <EditBanner />}
    </div>
  );
}

export default Banner;