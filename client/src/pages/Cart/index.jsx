import './Cart.scss';
import React from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { cartState } from '../../recoil/cartState';
import { toastDisplayState } from '../../recoil/toastDisplayState';
import { dialogState } from '../../recoil/dialogState';
import { userState } from '../../recoil/userState';
import { Link, useHistory } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import cartApi from '../../apis/cartApi';

function Cart() {
  const history = useHistory();

  const [cart, setCart] = useRecoilState(cartState);
  const setDialog = useSetRecoilState(dialogState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);
  const user = useRecoilValue(userState);

  const handleRemoveProduct = (product) => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      acceptButtonName: 'Xóa',
      func: () => {
        const item = {
          products: [
            {
              productId: product.id,
              size: product.size,
              colorLink: product.colorLink
            }
          ]
        }

        cartApi.delete(item)
          .then(response => {
            console.log(response);
            setCart(response.cart);
          })
          .catch(error => console.log(error));
      }
    });
  }

  const handleProductIncrement = (product) => {
    const item = {
      productId: product.id,
      size: product.size,
      quantity: product.quantity + 1,
      colorLink: product.colorLink
    }

    cartApi.update(item)
      .then(response => {
        console.log(response);
        setCart(response.cart);
      })
      .catch(error => {
        console.log(error.response.data);
        const errorProduct = error.response.data;
        setToastDisplay({
          show: true,
          message: <span><strong>{errorProduct.name}</strong> hiện chỉ còn <strong>{errorProduct.quantity}</strong> sản phẩm</span>
        });
      });
  }

  const handleProductDecrement = (product) => {
    if (product.quantity <= 1) return;

    const item = {
      productId: product.id,
      size: product.size,
      quantity: product.quantity - 1,
      colorLink: product.colorLink
    }

    cartApi.update(item)
      .then(response => {
        console.log(response);
        setCart(response.cart);
      })
      .catch(error => console.log(error));
  }

  const handleCheckoutClick = () => {
    if (!user.accessToken) {
      setToastDisplay({
        show: true,
        message: 'Vui lòng đăng nhập để thanh toán'
      });
    } else {
      history.push('/checkout');
    }
  }

  return (
    <React.Fragment>
      {cart.products?.length === 0 && <EmptyCart />}
      {cart.products?.length !== 0 && <div className="full-cart">
        <table>
          {cart.products?.map((product, index) => {
            return (
              <tr key={index}>
                <td width="10%" className="image-color-container">
                  <div className="image-color" style={{ backgroundImage: `url(${product.colorLink})` }}></div>
                </td>

                <td width="30%" className="product-name"><Link to={`/product/${product.id}`}>{`${product.name} - ${product.size}`}</Link></td>

                <td width="15%" className="unit-price">{product.priceAfterDis.toLocaleString()}đ</td>

                <td width="15%" className="quantity-adjustment">
                  <span className="decrement-btn" onClick={() => handleProductDecrement(product)}>-</span>
                  <span className="quantity">{product.quantity}</span>
                  <span className="increment-btn" onClick={() => handleProductIncrement(product)}>+</span>
                </td>

                <td width="15%" className="product-total-price">{(product.priceAfterDis * product.quantity).toLocaleString()}đ</td>

                <td width="15%" className="remove">
                  <span className="remove-btn" onClick={() => handleRemoveProduct(product)}>Xóa</span>
                </td>
              </tr>
            )
          })}
        </table>

        <div className="total-price">Tổng: {cart.totalPrice.toLocaleString()}đ</div>

        <div className="btn-group">
          <Link to='/'><div className="continue-shopping-btn">Tiếp tục mua sắm</div></Link>
          <div className="checkout-btn" onClick={handleCheckoutClick}>Thanh toán</div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default Cart;