import axios from 'axios';
import Cookies from 'js-cookie';
import { ErrorAlert } from './alert';

export const getHeader = (token = '') => {
  if (typeof window !== 'undefined') {
    token =
      localStorage.getItem('Authorization') ??
      'Token 02913ca4b801fcf:85fe94e403dd6ff';
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
