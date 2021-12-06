import axiosClient from './axiosClient';

const productApi = {
  getNew: (params) => { // params: page, limit
    const url = '/api/product/home';
    return axiosClient.get(url, { params });
  },

  getAll: (params) => { // params: status, sort, page, limit
    const url = '/api/product/all';
    return axiosClient.get(url, { params });
  },

  getByCategory: (category, params) => { // params: type, status, sort, page, limit
    const url = `/api/product/detail/${category}`;
    return axiosClient.get(url, { params });
  },

  getInfo: (id) => {
    const url = `/api/product/get-product/${id}`;
    return axiosClient.get(url);
  },

  search: (params) => { // params: name, status, sort, page, limit
    const url = '/api/product/search';
    return axiosClient.get(url, { params });
  },

  add: (data) => {
    const url = '/api/product/add';
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/api/product/update/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/product/delete/${id}`;
    return axiosClient.delete(url);
  },

  // uploadImages: (data) => {
  //   const url = '/api/image/upload';
  //   return axiosClient.post(url, data);
  // },

  getAllCategories: () => {
    const url = '/api/category/getAll';
    return axiosClient.get(url);
  }
}

export default productApi;