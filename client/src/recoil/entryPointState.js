import { atom } from 'recoil';

export const loginState = atom({
  key: 'login',
  default: false
})

export const signUpState = atom({
  key: 'signUp',
  default: false
})