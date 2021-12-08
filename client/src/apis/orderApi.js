import axiosClient from './axiosClient';

const orderApi = {
  getByUserId: (userId, params) => { // params: page, limit
    const url = `/api/order/get-by-user/${userId}`;
    return axiosClient.get(url, { params });
  },

  getAll: (data, params) => { // data: timeStart, timeEnd, status;  params: page, limit
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

  // getCategorySales: () => {
  //   const url = '/api/order/gettotalcategory';
  //   return axiosClient.get(url);
  // },

  // getCategorySold: () => {
  //   const url = '/api/order/gettotalsoldcategory';
  //   return axiosClient.get(url);
  // },

  getMonthlySales: () => {
    const url = '/api/order/gettotalonemonth/2021';
    return axiosClient.get(url);
  },

  getMonthlyCategorySold: () => { // chưa hiểu lắm, có lẽ cần chỉnh lại (cách) dữ liệu trả về
    const url = '/api/order/gettotalsoldcategory-followmonth/2021';
    return axiosClient.get(url);
  },

  getCategorySoldByMonth: (month) => {
    const url = `/api/order/gettotalcategoryonemonth/${month}`;
    return axiosClient.get(url);
  },

  getCategorySalesByMonth: (month) => {
    const url = `/api/order/getsalecategoryonemonth/${month}`;
    return axiosClient.get(url);
  },
}

export default orderApi;