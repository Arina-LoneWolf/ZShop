import axiosClient from './axiosClient';

const imageUploadApi = {
  uploadImages: (data) => {
    const url = '/api/image/upload';
    return axiosClient.post(url, data);
  }
}

export default imageUploadApi;