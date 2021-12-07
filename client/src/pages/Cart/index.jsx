import './Cart.scss';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { removeFromCart, decreaseCartItem, increaseCartItem, getProductQuantityInCart, cartTotalPrice, cartState } from '../../recoil/cartState';
import { toastDisplayState } from '../../recoil/toastDisplayState';
import { dialogState } from '../../recoil/dialogState';
import { userState } from '../../recoil/userState';
import { Link, useHistory } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import cartApi from '../../apis/cartApi';

function Cart() {
  const history = useHistory();

  const totalPrice = useRecoilValue(cartTotalPrice);

  const [cart, setCart] = useRecoilState(cartState);
  const setDialog = useSetRecoilState(dialogState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const getCart = async () => {
      const newCart = await cartApi.get();
      console.log(newCart);
    }

    getCart();
  }, [])

  const handleRemoveProduct = (id) => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      acceptButtonName: 'Xóa',
      func: () => {
        const newCart = removeFromCart(cart, id);

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
    });
  }

  const handleProductIncrement = (id, product) => {
    if (getProductQuantityInCart(cart, product._id) + 1 > product.quantity) {
      setToastDisplay({
        show: true,
        message: <span><strong>{product.name}</strong> hiện chỉ còn <strong>{product.quantity}</strong> sản phẩm</span>
      });
      return;
    }

    const newCart = increaseCartItem(cart, id);

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  const handleProductDecrement = (id, currentQuantity) => {
    if (currentQuantity <= 1) return;

    let newCart = [];

    newCart = decreaseCartItem(cart, id);

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
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
      {cart.length === 0 && <EmptyCart />}
      {cart.length !== 0 && <div className="full-cart">
        <table>
          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td width="10%" className="image-color-container">
                  <div className="image-color" style={{ backgroundImage: `url(${item.product.color})` }}></div>
                </td>

                <td width="30%" className="product-name"><Link to={item.product.url}>{`${item.product.name} - ${item.product.size}`}</Link></td>

                <td width="15%" className="unit-price">{(item.product.price - item.product.discount).toLocaleString()}đ</td>

                <td width="15%" className="quantity-adjustment">
                  <span className="decrement-btn" onClick={() => handleProductDecrement(item.id, item.quantity)}>-</span>
                  <span className="quantity">{item.quantity}</span>
                  <span className="increment-btn" onClick={() => handleProductIncrement(item.id, item.product)}>+</span>
                </td>

                <td width="15%" className="product-total-price">{((item.product.price - item.product.discount) * item.quantity).toLocaleString()}đ</td>

                <td width="15%" className="remove">
                  <span className="remove-btn" onClick={() => handleRemoveProduct(item.id)}>Xóa</span>
                </td>
              </tr>
            )
          })}
        </table>

        <div className="total-price">Tổng: {totalPrice.toLocaleString()}đ</div>

        <div className="btn-group">
          <Link to='/'><div className="continue-shopping-btn">Tiếp tục mua sắm</div></Link>
          <div className="checkout-btn" onClick={handleCheckoutClick}>Thanh toán</div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default Cart;