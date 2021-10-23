import { atom, selector } from 'recoil'
import successImage from '../assets/images/success-img.png'
import failureImage from '../assets/images/failure-img.png'

export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const resultMessageState = atom({
  key: 'resultMessage',
  default: {
    show: false,
    type: SUCCESS,
    message: '',
    func: () => {}
  }
})

export const messageContent = selector({
  key: 'messageContent',
  get: ({ get }) => {
    const resultMessage = get(resultMessageState);

    if (resultMessage.type === SUCCESS) {
      return {
        image: successImage,
        title: 'Thành công',
        acceptButtonName: 'OK'
      }
    }

    return {
      image: failureImage,
      title: 'Thất bại',
      acceptButtonName: 'Thử lại'
    }
  }
})