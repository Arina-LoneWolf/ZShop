import './Footer.scss';
import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { RiYoutubeFill, RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare, FaPhoneSquareAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import logo from '../../assets/images/footerlogo.png';

function Footer() {
  const match = useRouteMatch('/admin');
  if (match) return null;

  return (
    <div className="footer">
      <div className="container grid">
        <div className="row">
          <div className="contact col l-2">
            <div className="title">Liên hệ</div>
            <div className="phone">
              <FaPhoneSquareAlt className="phone-icon" />
              <span>0899.181.919</span>
            </div>
            <div className="email">
              <IoMail className="mail-icon" />
              <span>cskh@zshop.vn</span>
            </div>
          </div>

          <div className="hanoi-address col l-3">
            <div className="title">Hà Nội (9h - 22h)</div>
            <ul>
              <li>81 Bà Triệu, Hai Bà Trưng</li>
              <li>241 Chùa Bộc, Đống Đa</li>
              <li>60 Trần Đại Nghĩa, Hai Bà Trưng</li>
              <li>226 Nguyễn Trãi, Nam Từ Liêm (gần ĐH Hà Nội)</li>
              <li>157 Xuân Thủy, Cầu Giấy</li>
              <li>7 ngõ 165 Thái Hà, Đống Đa</li>
            </ul>
          </div>

          <div className="hcm-address col l-5">
            <div className="title">Tp.Hồ Chí Minh (9h30 - 22h)</div>
            <ul>
              <li>92 Hồ Tùng Mậu, P.Bến Nghé, Q1</li>
              <li>459E Nguyễn Đình Chiểu, P.5, Q.3 (ngã tư Cao Thắng)</li>
              <li>708 Sư Vạn Hạnh, P.12, Q.10 (đối diện chéo Vạn Hạnh Mall)</li>
              <li>87 Bàu Cát, P.14, Q.Tân Bình (khúc giao Nguyễn Hồng Đào)</li>
              <li>54A Hoa Lan, P.2, Q.Phú Nhuận (gần Pizza Hut Phan Xích Long)</li>
            </ul>
          </div>

          <div className="logo-and-socials col l-2">
            <div className="logo"><img src={logo} alt="logo" /></div>
            <div className="socials">
              <Link to={{ pathname: 'https://www.facebook.com/zshopfashionista' }} target='_blank'><FaFacebookSquare className="facebook-icon" /></Link>
              <RiInstagramFill className="instagram-icon" />
              <RiYoutubeFill className="youtube-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="copyright l-12">Copyright © 2021 . All Rights Reserved</div>
      </div>
    </div>
  );
}

export default Footer;