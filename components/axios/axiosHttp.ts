import axios from 'axios';
import Cookies from 'js-cookie';
import { ErrorAlert } from './alert';

export const getHeader = (token = '') => {
  if (typeof window !== 'undefined') {
    token =
      Cookies.get('Authorization') ?? 'Token bceaff231358912:0ad1cb16e77f552';
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
      return error;
    }
  }
);

export default customAxios;
