import { atom } from 'recoil';

export const dialogState = atom({
  key: 'dialog',
  default: {
    show: false,
    message: '',
    acceptButtonName: '',
    adminMode: false,
    func: () => {}
  }
})