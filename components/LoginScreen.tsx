import { Input } from '@material-tailwind/react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import customAxios from './axios/axiosHttp';
import PrimaryButton from './button/PrimaryButton';

interface userProfile {
  account_id: string;
  avatar: string;
  birthday: string;
  country_code: any;
  email: string;
  fullname: string;
  gender: string;
  phone_number: string;
}

export function LoginScreen({}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<userProfile>();
  const [switchPage, setSwitchPage] = useState('login');

  const finalUsername = username.substring(1);
  const [wrongUser, setWrongUser] = useState(false);
  const [loginToken, setLoginToken] = useState('');

  const LoginHandler = async (e: any) => {
    e.preventDefault();
    // const res: any = await customAxios.post(
    //   '/api/method/dipmarts_app.api.login',
    //   {
    //     username: `+855968888418`,
    //     password: '@ratanak168',
    //   }
    // );

    // if (res?.response?.status === 404) {
    //   setWrongUser(true);
    //   return;
    // }
    // const api_key = res.data.message.api_key;
    // const api_secret = res.data.message.api_secret;
    // const Authorization = `Token ${api_key}:${api_secret}`;
    // setIsModal(false);
    // Cookies.set('Authorization', Authorization);
    // // fetchUserDetail();
    // console.log(Cookies.get('Authorization'));
    login();
  };

  const login = async () => {
    const headers = { Authorization: loginToken };
    const loginData = {
      username: `+855${username.substring(1)}`,
      password: password,
    };
    const baseURL = 'https://dev.dipmarts.com';
    const loginRes = await axios.post(
      '/api/method/dipmarts_app.api.login',
      loginData,
      {
        headers,
        baseURL,
      }
    );
    console.log(loginRes);

    if (loginRes?.data?.response?.status === 404) {
      setWrongUser(true);
      return;
    }

    console.log(wrongUser);

    const tokenAfterLogin = `Token ${loginRes?.data?.message.api_key}:${loginRes?.data?.message.api_secret}`;
    setToLocalStorageAfterLogin(tokenAfterLogin);
    getUserDetailAfterLogIn(tokenAfterLogin);
    // setIsModal(false);
  };

  const getGuestUser = async () => {
    const res = await (
      await customAxios.get('/api/method/dipmarts_app.api.generate_guest')
    )?.data;
    const token = `Token ${res.message.api_key}:${res.message.api_secret}`;
    setLoginToken(token);
  };

  const setToLocalStorageAfterLogin = (token: string) => {
    localStorage.setItem('Authorization', token);
  };

  const getUserDetailAfterLogIn = async (token: string) => {
    const headers = { Authorization: token };
    const res = await customAxios.get(
      '/api/method/dipmarts_app.api.userprofile',
      { headers }
    );
    setUserProfile(res?.data?.message);
  };

  useEffect(() => {
    fetchUserDetail();
    getGuestUser();
  }, []);

  const fetchUserDetail = async () => {
    const res = await customAxios.get(
      '/api/method/dipmarts_app.api.userprofile'
    );
    setUserProfile(res?.data?.message);
  };

  const LogoutHandler = () => {
    localStorage.removeItem('Authorization');
    setUserProfile({
      account_id: '',
      avatar: '',
      birthday: '',
      country_code: '',
      email: '',
      fullname: '',
      gender: '',
      phone_number: '',
    });
  };
  return (
    <>
      <div
        className="bg-black bg-transparent bg-opacity-50 w-full absolute top-0 h-[100%]"
        // onClick={() => setIsModal(!true)}
      ></div>
      <div>
        <div className=" bg-white rounded-t-2xl  absolute bottom-0 w-full z-50">
          <div className="grid grid-cols-2 border-b-2">
            <div
              className={
                switchPage === 'signup'
                  ? 'text-base py-3 text-center border-b-2 border-b-blue-800'
                  : 'text-base py-3 text-center'
              }
              onClick={() => setSwitchPage('signup')}
            >
              Sign Up
            </div>
            <div
              className={
                switchPage === 'login'
                  ? 'text-base py-3 text-center border-b-2 border-b-blue-800'
                  : 'text-base py-3 text-center'
              }
              onClick={() => setSwitchPage('login')}
            >
              Login
            </div>
          </div>
          {switchPage === 'login' ? (
            <div className="px-4 mt-5">
              <form onSubmit={LoginHandler}>
                <div className="grid grid-rows-2 gap-5">
                  <Input
                    label="(+855) Phone Number*"
                    type={'number'}
                    onChange={(e) => setUsername(e.target.value)}
                    error={wrongUser}
                  />
                  <Input
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    error={wrongUser}
                  />
                </div>
                <div className="mt-14 pb-6">
                  <Link href="/">
                    <a className="line-through text-sm text-blue-500 ">
                      Forgot password?
                    </a>
                  </Link>
                </div>
                <button className="pb-5 w-full" type="submit">
                  <PrimaryButton text={'Login'}></PrimaryButton>
                </button>
              </form>
            </div>
          ) : (
            <form className="px-4 mt-5">
              <div className="grid grid-rows-3 ">
                <h1 className="font-bold">Register with Phone Number</h1>
                <p className="text-xs text-gray-600">
                  Please enter your phone number to continue
                </p>
                <Input label="(+855) Phone Number" type={'number'} required />
              </div>
              <div className="py-5">
                <PrimaryButton text={'Countinue'}></PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
