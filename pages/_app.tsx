import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import customAxios, { getHeader } from '../components/axios/axiosHttp';
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const user = Cookies.get('Authorization'); // => 'value'
    let Authorization: any = '';
    if (!user) {
      customAxios
        .get('/api/method/dipmarts_app.api.generate_guest')
        .then((res) => {
          const api_key = res.data.message.api_key;
          const api_secret = res.data.message.api_secret;
          Authorization = `Token ${api_key}:${api_secret}`;
          getHeader(Authorization);
          Cookies.set('Authorization', Authorization, { expires: 1 / 24 });
        });
    } else {
      Authorization = Cookies.get('Authorization');
      getHeader(Authorization);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
