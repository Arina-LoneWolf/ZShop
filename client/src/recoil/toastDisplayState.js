import { atom } from 'recoil';

export const toastDisplayState = atom({
  key: 'toastDisplay',
  default: {
    show: false,
    message: ''
  }
});