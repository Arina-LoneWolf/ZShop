import axiosClient from './axiosClient';

const commentApi = {
  getAllByProductId: (params) => { // params: productId
    const url = '/api/comment/get';
    return axiosClient.get(url, { params });
  },

  add: (data, params) => {
    const url = '/api/comment/add'; // params: reply: 1, id (commentId)
    return axiosClient.post(url, data, { params });
  },

  delete: (params) => { // params: id (commentId) / id (parentId), node (commentId)
    let url = '/api/comment/delete';
    return axiosClient.delete(url, { params });
  }
}

export default commentApi;