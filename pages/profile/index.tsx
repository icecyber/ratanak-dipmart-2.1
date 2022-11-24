/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/button/PrimaryButton';
import ChevronRight from '../../components/icons/ChevronRight';
import HeartIcon from '../../components/icons/HeartIcon';
import Paper from '../../components/icons/Paper';
import UserProfile from '../../components/icons/UserProfile';
import Layout from '../../components/Layout';
import SettingsComp from '../../components/SettingsComp';
import { Input } from '@material-tailwind/react';
import Link from 'next/link';
import customAxios from '../../components/axios/axiosHttp';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/profile/userSlice';
import router from 'next/router';
import AuthForm from '../../components/AuthForm';

export interface UserProfileInterface {
  account_id: string;
  avatar: string;
  birthday: string;
  country_code: any;
  email: string;
  fullname: string;
  gender: string;
  phone_number: string;
}

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfileInterface>();
  const [switchPage, setSwitchPage] = useState('login');
  const [isModal, setIsModal] = useState(false);
  const finalUsername = username.substring(1);
  const [wrongUser, setWrongUser] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const dispatch = useDispatch();

  const LoginHandler = async (e: any) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    const headers = { Authorization: loginToken };
    const loginData = {
      username: `+855${username.substring(1)}`,
      password: password,
    };
    const baseURL = 'https://dev.dipmarts.com';
    const loginRes = await customAxios.post(
      '/api/method/dipmarts_app.api.login',
      loginData,
      {
        headers,
        baseURL,
      }
    );
    console.log(loginRes);

    if (loginRes?.status === 404) {
      setWrongUser(true);
      return;
    }

    const tokenAfterLogin = `Token ${loginRes?.data?.message.api_key}:${loginRes?.data?.message.api_secret}`;
    setToLocalStorageAfterLogin(tokenAfterLogin);
    getUserDetailAfterLogIn(tokenAfterLogin);
    setIsModal(false);
    setWrongUser(false);
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

  const fetchUserDetail = async () => {
    const res = await customAxios.get(
      '/api/method/dipmarts_app.api.userprofile'
    );
    setUserProfile(res?.data?.message);

    dispatch(addUser(res?.data?.message));
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

  useEffect(() => {
    fetchUserDetail();
    getGuestUser();
  }, []);

  const editProfileHandler = () => {
    if (!localStorage.getItem('Authorization')) {
      setIsModal(true);
    } else {
      router.push('/profile/editprofile');
    }
  };

  const closeForm = () => {
    setIsModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Layout
      title={userProfile?.account_id ? 'My Account' : 'You logged in as guest'}
    >
      <div>
        {/* Login Start Shopping */}
        <div
          className="flex justify-between items-center pl-9 pr-5 mt-10 relative"
          onClick={editProfileHandler}
        >
          <div className="flex">
            {userProfile?.account_id ? (
              <Image
                src={userProfile?.avatar}
                alt={userProfile?.account_id}
                height={56}
                width={56}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="bg-blue-900 p-1 rounded-full">
                <UserProfile className={'w-12 h-12 text-white'} />
              </div>
            )}
            <div className="ml-5">
              <h1 className="text-xl font-bold">
                {userProfile?.account_id ? userProfile.fullname : 'Login'}
              </h1>
              <p className="text-gray-500">
                {userProfile?.account_id
                  ? 'Account Information'
                  : 'Start Shopping'}
              </p>
            </div>
          </div>
          <ChevronRight />
        </div>
        {/* 4 Order Grid */}
        <div className="mt-8 grid grid-cols-4">
          <Link href={'/orders'}>
            <div>
              <Paper className={'mx-auto'} />
              <p className="text-center">Orders</p>
            </div>
          </Link>
          <Link href={'/wishlist'}>
            <div>
              <HeartIcon className={'w-[30px] h-[30px] mx-auto'} />
              <p className="text-center">Wish List</p>
            </div>
          </Link>
        </div>
        {/* Settings */}
        <div className="px-5 bg-[#EAEAEA] mt-6 ">
          <SettingsComp>Notification Settings</SettingsComp>
        </div>
        <div className="px-5 bg-[#EAEAEA] mt-4">
          <SettingsComp subSetting="English">Language</SettingsComp>
        </div>
        <div className="px-5 bg-[#EAEAEA] mt-4">
          <SettingsComp>Privacy Policy</SettingsComp>
          <SettingsComp>Legal Information</SettingsComp>
          <SettingsComp subSetting="1.0">Version</SettingsComp>
        </div>
        {/* Login Button */}
        {userProfile?.account_id ? (
          <div className="px-4 md:px-0 mt-7" onClick={LogoutHandler}>
            <PrimaryButton text={'Logout'}></PrimaryButton>
          </div>
        ) : (
          <div className="px-4 md:px-0 mt-7" onClick={() => setIsModal(!false)}>
            <PrimaryButton text={'Login'}></PrimaryButton>
          </div>
        )}

        {/* Logo DiPMart */}
        <div className="pt-5 grid justify-center">
          <Image
            src="https://www.dipmarts.com/wp-content/themes/dipmarts/assets/images/DiPMarts-Horizontal-Logo.png"
            alt="DiPMart Logo"
            width={142}
            height={54}
            className="object-contain"
            priority
          />
          <p className="pt-2 text-xs text-gray-600 text-center">
            Copyright © 2022 DiPMart.
            <br /> All rights reserved.
          </p>
        </div>
      </div>
      {/* Login Screen */}
      {userProfile?.account_id ? (
        ''
      ) : isModal ? (
        <AuthForm closeForm={closeForm} />
      ) : null}
    </Layout>
  );
};

export default ProfilePage;
