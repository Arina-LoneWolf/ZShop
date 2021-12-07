import axiosClient from './axiosClient';

const userApi = {
  login: (data) => {
    const url = '/api/user/login';
    return axiosClient.post(url, data);
  },

  loginWithGoogle: (data) => {
    const url = '/api/user/login-google';
    return axiosClient.post(url, data);
  },

  register: (data) => {
    const url = '/api/user/register';
    return axiosClient.post(url, data);
  },

  getInfo: () => {
    const url = '/api/user/info';
    return axiosClient.get(url);
  },

  updateInfo: (data) => {
    const url = '/api/user/update-info';
    return axiosClient.patch(url, data);
  },

  updateEmail: (data) => {
    const url = '/api/user/update-email';
    return axiosClient.patch(url, data);
  },

  verifyOTP: (data) => {
    const url = '/api/user/confirm-update-mail';
    return axiosClient.post(url, data);
  },

  updatePassword: (data) => {
    const url = '/api/user/update-pass';
    return axiosClient.patch(url, data);
  },

  updateMute: (data) => {
    const url = '/api/user/update-mute';
    return axiosClient.patch(url, data);
  }
}

export default userApi;