import axiosClient from './axiosClient';

const cartApi = {
  get: () => {
    const url = '/api/cart/get';
    return axiosClient.get(url);
  },

  add: (data) => {
    const url = '/api/cart/add';
    return axiosClient.post(url, data);
  },

  update: (userId) => {
    let url = `/api/cart/update/${userId}`;
    return axiosClient.delete(url);
  },

  delete: (userId) => {
    let url = `/api/cart/delete/${userId}`;
    return axiosClient.delete(url);
  }
}

export default cartApi;