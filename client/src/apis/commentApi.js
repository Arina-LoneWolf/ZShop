import axiosClient from './axiosClient';

const commentApi = {
  getAllByProductId: (productId) => { // params: productId
    const url = `/api/comment/get/${productId}`;
    return axiosClient.get(url);
  },

  add: (data) => {
    const url = '/api/comment/add';
    return axiosClient.post(url, data);
  },

  delete: (commentId) => {
    let url = `/api/comment/delete/${commentId}`;
    return axiosClient.delete(url);
  }
}

export default commentApi;