import axiosClient from './axiosClient';

const productApi = {
  getNew: (params) => {
    const url = '/api/product/home';
    return axiosClient.get(url, { params });
  },

  getAll: () => {},

  getAllCategory: (params) => {},

  getDetail: (id) => {
    const url = `/api/product/home/get-product/${id}`;
    return axiosClient.get(url);
  },

  searchAll: (params) => {},

  add: (params) => {},

  update: (params) => {},

  delete: (params) => {}
}

export default productApi;