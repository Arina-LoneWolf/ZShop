import axiosClient from './axiosClient';

const orderApi = {
  getByUserId: (id, params) => { // params: page, limit
    const url = `/api/order/get-by-user/${id}`;
    return axiosClient.get(url, { params });
  },

  getAll: (data, params) => { // data: timeStart, timeEnd;  params: page, limit
    const url = '/api/order/get-all';
    return axiosClient.post(url, data, { params });
  },

  search: (params) => { // params: page, limit
    const url = '/api/order/search';
    return axiosClient.get(url, { params });
  },

  update: (data) => {
    const url = '/api/order/update';
    return axiosClient.patch(url, data);
  },

  add: (data) => {
    const url = '/api/order/add';
    return axiosClient.post(url, data);
  },

  getCategorySales: () => {
    const url = '/api/order/gettotalcategory';
    return axiosClient.get(url);
  },

  getCategorySold: () => {
    const url = '/api/order/gettotalsoldcategory';
    return axiosClient.get(url);
  },

  getMonthlySales: () => {
    const url = '/api/order/gettotalonemonth';
    return axiosClient.get(url);
  },

  getMonthlySold: () => {
    const url = '/api/order/gettotalsoldcategory-followmonth';
    return axiosClient.get(url);
  }
}

export default orderApi;