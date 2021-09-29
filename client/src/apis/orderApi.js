import axiosClient from './axiosClient';

// const config = {
//   headers: {
//     Authorization: user.accessToken
//   }
// }

const orderApi = {
  getAllByUserId: (id) => {
    const url = `/api/order/get-by-user/${id}`;
    return axiosClient.get(url);
  },

  updateStatus: (status) => {},

  // add: (item) => {
  //   const url = '/api/order/add';
  //   return axiosClient.post(url, item, config);
  // }
}

export default orderApi;