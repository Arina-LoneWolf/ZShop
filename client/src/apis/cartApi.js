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

  update: (data) => {
    let url = '/api/cart/update';
    return axiosClient.patch(url, data);
  },

  delete: (data) => {
    let url = '/api/cart/delete-item';
    return axiosClient.delete(url, { data });
  }
}

export default cartApi;