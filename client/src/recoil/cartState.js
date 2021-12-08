import { atom, selector } from 'recoil';
import cartApi from '../apis/cartApi';

const getCart = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return {};
  const cart = await cartApi.get();
  return cart;
}

export const cartState = atom({
  key: 'cart',
  default: getCart()
  // default: {}
});
