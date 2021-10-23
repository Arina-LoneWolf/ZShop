import axiosClient from './axiosClient';

const userApi = {
  login: (data) => {
    const url = '/user/login';
    return axiosClient.post(url, data);
  },

  loginWithGoogle: (data) => {
    const url = '/user/login-google';
    return axiosClient.post(url, data);
  },

  register: (data) => {
    const url = '/user/register';
    return axiosClient.post(url, data);
  },

  getInfo: () => {
    const url = '/user/info';
    return axiosClient.get(url);
  },

  updateInfo: (data) => {
    const url = '/user/update-info';
    return axiosClient.patch(url, data);
  },

  updateEmail: (data) => {
    const url = '/user/update-email';
    return axiosClient.patch(url, data);
  },

  verifyOTP: (data) => {
    const url = '/user/confirm-update-mail';
    return axiosClient.post(url, data);
  },

  updatePassword: (data) => {
    const url = '/user/update-pass';
    return axiosClient.patch(url, data);
  },

  updateMute: (data) => {
    const url = '/user/update-mute';
    return axiosClient.patch(url, data);
  }
}

export default userApi;