import axiosClient from './axiosClient';

const bannerApi = {
  getAll: () => {
    const url = '/api/banner/get';
    return axiosClient.get(url);
  },

  add: (data) => {
    const url = '/api/banner/add';
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = '/api/banner/update';
    return axiosClient.patch(url, data);
  },

  delete: (id) => {
    const url = `/api/banner/delete/${id}`;
    return axiosClient.delete(url);
  }
}

export default bannerApi;