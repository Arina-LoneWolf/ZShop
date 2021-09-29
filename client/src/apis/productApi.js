import axiosClient from './axiosClient';

const productApi = {
  getNew: (params) => {
    const url = '/api/product/home';
    return axiosClient.get(url, { params });
  },

  getAll: () => {},

  getAllByCategory: (params) => {},

  getDetail: (id) => {
    const url = `/api/product/home/get-product/${id}`;
    return axiosClient.get(url);
  },

  searchAll: (params) => {},

  add: (params) => {
    const url = '/api/product/'
  },

  update: (params) => {},

  delete: (params) => {}
}

export default productApi;