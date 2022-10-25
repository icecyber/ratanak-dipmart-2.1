/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import PrimaryButton from '../../components/button/PrimaryButton';
import ChevronRight from '../../components/icons/ChevronRight';
import Clock from '../../components/icons/Clock';
import HeartIcon from '../../components/icons/HeartIcon';
import Paper from '../../components/icons/Paper';
import Ticket from '../../components/icons/Ticket';
import UserProfile from '../../components/icons/UserProfile';
import Layout from '../../components/Layout';
import SettingsComp from '../../components/SettingsComp';
import Login from '../../components/profile/Login';
import Signup from '../../components/profile/Signup';

const ProfilePage = () => {
  const [switchPage, setSwitchPage] = useState('login');
  const [isModal, setIsModal] = useState(false);
  return (
    <Layout title="You logged in as guest">
      <div>
        {/* Login Start Shopping */}
        <div
          className="flex justify-between items-center pl-9 pr-5 mt-10 relative"
          onClick={() => setIsModal(!false)}
        >
          <div className="flex">
            <div className="bg-blue-900 p-1 rounded-full">
              <UserProfile className={'w-12 h-12 text-white'} />
            </div>
            <div className="ml-5">
              <h1 className="text-xl font-bold">Login</h1>
              <p className="text-gray-500">Start Shopping</p>
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
        <div className="px-4 md:px-0 mt-7" onClick={() => setIsModal(!false)}>
          <PrimaryButton text="Login"></PrimaryButton>
        </div>
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
      {isModal ? (
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
              {switchPage === 'login' ? <Login /> : <Signup />}
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default ProfilePage;
