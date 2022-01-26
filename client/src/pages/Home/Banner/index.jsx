import './Banner.scss';
import React from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { bannerManagerDisplayState } from '../../../recoil/bannerManagerDisplayState';
import { userState } from '../../../recoil/userState';
import { useQuery } from 'react-query';
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
import bannerApi from '../../../apis/bannerApi';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Banner() {
  const [bannerManagerDisplay, setBannerManagerDisplay] = useRecoilState(bannerManagerDisplayState);
  const user = useRecoilValue(userState);

  const { data: banners, refetch } = useQuery('banners', async () => {
    const response = await bannerApi.getAll();
    console.log('BANNER: ', response);
    return response.banners;
  }, { refetchOnWindowFocus: false });

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
            {banners?.map(banner => (
              <SwiperSlide key={banner.id}>
                <img src={banner.bannerLink} alt={'slider' + banner.id} />
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>
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
            </SwiperSlide> */}
          </Swiper>
        </div>

        {user?.isAdmin === 1 && <div className="edit-btn" onClick={showBannerManager}>
          Chỉnh sửa
          <MdEdit className="edit-icon" />
        </div>}
      </div>

      {bannerManagerDisplay && <EditBanner banners={banners} refetch={refetch} />}
    </div>
  );
}

export default Banner;