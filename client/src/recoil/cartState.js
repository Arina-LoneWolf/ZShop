import { atom, selector } from 'recoil';
import cartApi from '../apis/cartApi';

const getCart = async () => {
  const cart = await cartApi.get();
  return cart;
}

export const cartState = atom({
  key: 'cart',
  default: getCart()
});
