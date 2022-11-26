import axios from 'axios';
import Cookies from 'js-cookie';
import { ErrorAlert } from './alert';

export const getHeader = (token = '') => {
  if (typeof window !== 'undefined') {
    token =
      localStorage.getItem('Authorization') ??
      'Token 5e5f20254531d63:dffd3e79a5de1f4';
  }

  return {
    Authorization: token,
  };
};

const customAxios = axios.create({
  baseURL: 'https://dev.dipmarts.com',
  headers: getHeader(),
});
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status) {
      ErrorAlert(error.message, true);
      return error?.response;
    }
  }
);

export default customAxios;
