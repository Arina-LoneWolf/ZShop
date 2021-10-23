import { atom } from 'recoil'

export const idState = atom({
  key: 'id',
  default: JSON.parse(localStorage.getItem("uuid")) || []
})

export const idCountState = atom({
  key: 'idCount',
  default: JSON.parse(localStorage.getItem("idCount")) || 0
})