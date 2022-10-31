/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/button/PrimaryButton';
import ChevronRight from '../../components/icons/ChevronRight';
import Clock from '../../components/icons/Clock';
import HeartIcon from '../../components/icons/HeartIcon';
import Paper from '../../components/icons/Paper';
import Ticket from '../../components/icons/Ticket';
import UserProfile from '../../components/icons/UserProfile';
import Layout from '../../components/Layout';
import SettingsComp from '../../components/SettingsComp';
import { Input } from '@material-tailwind/react';
import Link from 'next/link';
import customAxios from '../../components/axios/axiosHttp';
import Cookies from 'js-cookie';
import router from 'next/router';
import { useForm } from 'react-hook-form';

interface Username {
  account_id: string;
  avatar: string;
  birthday: string;
  country_code: string;
  email: string;
  image: string;
  fullname: string;
  gender: string;
  phone_number: string;
}

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<Username>();
  const [switchPage, setSwitchPage] = useState('login');
  const [isModal, setIsModal] = useState(false);
  const finalUsername = username.substring(1);
  const [wrongUser, setWrongUser] = useState(false);

  const LoginHandler = async (e: any) => {
    e.preventDefault();
    const res: any = await customAxios.post(
      '/api/method/dipmarts_app.api.login',
      {
        username: `+855${finalUsername}`,
        password: password,
      }
    );
    console.log(res);

    if (res?.response?.status === 404) {
      setWrongUser(true);
      return;
    }
    const api_key = res.data.message.api_key;
    const api_secret = res.data.message.api_secret;
    const Authorization = `Token ${api_key}:${api_secret}`;
    setIsModal(false);
    Cookies.set('Authorization', Authorization, { expires: 1 / 24 });
    router.reload();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.userprofile'
      );
      setUserProfile(res.data.message);
      console.log(userProfile);
    };
    fetchUserProfile();
  }, []);

  const LogoutHandler = () => {
    Cookies.remove('Authorization');
    router.reload();
  };

  return (
    <Layout
      title={userProfile?.account_id ? 'My Account' : 'You logged in as guest'}
    >
      <div>
        {/* Login Start Shopping */}
        <div
          className="flex justify-between items-center pl-9 pr-5 mt-10 relative"
          onClick={() => setIsModal(!false)}
        >
          <div className="flex">
            {userProfile?.account_id ? (
              <div className="w-14 h-14">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.account_id}
                  className="rounded-full"
                />
              </div>
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
          <div>
            <Paper className={'mx-auto'} />
            <p className="text-center">Orders</p>
          </div>
          <div>
            <HeartIcon className={'w-[30px] h-[30px] mx-auto'} />
            <p className="text-center">Wish List</p>
          </div>
          <div>
            <Clock className={'w-[30px] h-[30px] mx-auto'} />
            <p className="text-center">View</p>
          </div>
          <div>
            <Ticket className={'w-[30px] h-[30px] mx-auto'} />
            <p className="text-center">Coupons</p>
          </div>
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
        <div className="pt-5">
          <img
            src="https://www.dipmarts.com/wp-content/themes/dipmarts/assets/images/DiPMart-Horizontal-Logo.png"
            alt="DiPMart Logo"
            width={142}
            height={54}
            className="mx-auto"
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
        <>
          <div
            className="bg-black bg-transparent bg-opacity-50 w-full absolute top-0 h-[100%]"
            onClick={() => setIsModal(!true)}
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
                <div className="px-4 mt-5">
                  <div className="grid grid-rows-3 ">
                    <h1 className="font-bold">Register with Phone Number</h1>
                    <p className="text-xs text-gray-600">
                      Please enter your phone number to continue
                    </p>
                    <Input
                      label="(+855) Phone Number"
                      type={'number'}
                      required
                    />
                  </div>
                  <div className="py-5">
                    <PrimaryButton text={'Countinue'}></PrimaryButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default ProfilePage;
