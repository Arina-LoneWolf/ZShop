import './InfoSection.scss';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../../../recoil/cartState';
import { userState } from '../../../recoil/userState';
import { toastDisplayState } from '../../../recoil/toastDisplayState';
import { useQuery } from 'react-query';
import { MdLocalShipping } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { EatLoading } from 'react-loadingg';
import FetchError from '../../../shared/notifications/FetchError';
import productApi from '../../../apis/productApi';
import cartApi from '../../../apis/cartApi';

function ProductInfo() {
  const { pathname: url } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const { data: product, isLoading, isError, refetch } = useQuery(['productDetail', id], async () => {
    const response = await productApi.getInfo(id);
    console.log(response);
    return response.product;
  });

  const setCart = useSetRecoilState(cartState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);
  const user = useRecoilValue(userState);

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    setCurrentImage('');
    refetch();
  }, [url]);

  const handleSubImageClick = (e, image) => {
    // deactivate all the sub-images, then activate the selected sub-image
    const subImages = document.querySelectorAll('.sub-image.active');
    subImages.forEach((subImage) => {
      subImage.classList.remove('active');
    });
    e.target.classList.add('active');

    // set current image as selected sub-image
    setCurrentImage(image);
  }

  const handleColorClick = (e) => {
    // deactivate all the image-colors, then activate the selected image-color
    const subImages = document.querySelectorAll('.color-option.active');
    subImages.forEach((subImage) => {
      subImage.classList.remove('active');
    });
    e.target.classList.add('active');

    // set current color as selected image-color
    setColor(e.target.style.backgroundImage.slice(5, -2));
  }

  const addProductToCart = (sizeLabel, buttonType) => {
    const item = {
      productId: product.id,
      colorLink: color,
      size: sizeLabel.value,
      quantity
    }

    cartApi.add(item)
      .then(response => {
        console.log(response);
        setCart(response.cart);

        // if press the 'add_to_cart' button, then show the toast message
        // if press the 'buy_now' button, then go to the Cart Page
        if (buttonType === 'add_to_cart') {
          setToastDisplay({
            show: true,
            message: <span>B???n ???? th??m s???n ph???m <strong>{product.name}</strong> v??o gi??? h??ng!</span>
          });
        } else {
          history.push('/cart');
        }
      })
      .catch(error => {
        console.log('vo ham co return;');
        console.log(error.response.data);
        const errorProduct = error.response.data;
        setToastDisplay({
          show: true,
          message: <span><strong>{errorProduct.name}</strong> hi???n ch??? c??n <strong>{errorProduct.quantity}</strong> s???n ph???m</span>
        });
        return;
      });
  }

  const handleAddProductToCart = (buttonType) => {
    // get selected size from checked size label
    const sizeLabel = document.querySelector('input[name="size"]:checked');
    // check if the product information is not complete, then show the toast message, otherwise add the product to cart
    if (!user.accessToken) {
      setToastDisplay({
        show: true,
        message: 'Vui l??ng ????ng nh???p ????? mua s???n ph???m'
      });
    } else if (!sizeLabel) {
      setToastDisplay({
        show: true,
        message: 'B???n ch??a ch???n size cho s???n ph???m'
      });
    } else if (!color) {
      setToastDisplay({
        show: true,
        message: 'B???n ch??a ch???n m??u cho s???n ph???m'
      });
    } else {
      addProductToCart(sizeLabel, buttonType);
    }
  }

  const handleProductDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevValue => prevValue - 1);
    }
  }

  return (
    <React.Fragment>
      {isLoading && <div style={{ height: '80vh' }}><EatLoading color='#ffb0bd' /></div>}
      {isError && <FetchError />}
      {product && <div className="product-detail row">
        <div className="product-images col l-6">
          <div className="main-image" style={{ backgroundImage: `url(${currentImage || product.arrImages[0]})` }}></div>
          <div className="sub-images">
            <div className="row">
              {product.arrImages.map((image, index) => (
                <div className="l-2 sub-image-container" key={index}>
                  <div className="sub-image" style={{ backgroundImage: `url(${image})` }} onClick={(e) => handleSubImageClick(e, image)}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="product-detail-info col l-6">
          <div className="product-title">{product.name}</div>
          <div className="product-price">{product.priceAfterDis.toLocaleString()}??</div>
          {product.discount > 0 && <div className="product-original-price">{product.price.toLocaleString()}??</div>}

          <div className="size-group">
            <div className="size-title">Size</div>
            <div className="size-selection">
              {product.arrSizes.map((size, index) => (
                <div className="size-options" key={index}>
                  <input className="radio-option" type="radio" id={size} name="size" value={size} />
                  <label htmlFor={size} className="size-option">{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-title">M??u s???c</div>
            <ul className="color-selection">
              {product.arrColors.map((color, index) => <li className="color-option" key={index} style={{ backgroundImage: `url(${color})` }} onClick={handleColorClick}></li>)}
            </ul>
          </div>

          <div className="quantity-group">
            <div className="quantity-title">S??? l?????ng</div>
            <ul className="quantity-btn-group">
              <li onClick={handleProductDecrement}> - </li>
              <li>{quantity}</li>
              <li onClick={() => setQuantity(quantity + 1)}> + </li>
            </ul>
          </div>

          <div className="btn-group">
            <div className="add-cart-btn" onClick={() => handleAddProductToCart('add_to_cart')}>Th??m v??o gi??? h??ng</div>
            <div className="buy-now-btn" onClick={() => handleAddProductToCart('buy_now')}>Mua ngay</div>
          </div>

          <div className="shipping-policy">
            <div className="extra-info">
              <MdLocalShipping className="icon" />
              <div className="info">Giao h??ng to??n qu???c ????n h??ng t??? 100k</div>
            </div>

            <div className="extra-info">
              <GiTwoCoins className="icon" />
              <div className="info">COD n???i th??nh H?? N???i, H??? Ch?? Minh</div>
            </div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default ProductInfo;