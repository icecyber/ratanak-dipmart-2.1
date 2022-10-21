import axios from 'axios';

import { ErrorAlert } from './alert';

export const customAxios = axios.create({
  baseURL: 'https://dev.dipmarts.com',
  headers: {
    Authorization: 'Token e72b1ea61e7508f:a1bb165d628161e',
    'Access-Control-Allow-Origin': '*',
  },
});
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status) {
      ErrorAlert(error.message, true);
    }
  }
);

export default customAxios;
