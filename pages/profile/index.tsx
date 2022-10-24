import React from 'react';
import PrimaryButton from '../../components/button/PrimaryButton';
import ChevronRight from '../../components/icons/ChevronRight';
import Clock from '../../components/icons/Clock';
import HeartIcon from '../../components/icons/HeartIcon';
import Paper from '../../components/icons/Paper';
import Ticket from '../../components/icons/Ticket';
import UserProfile from '../../components/icons/UserProfile';
import Layout from '../../components/Layout';
import SettingsComp from '../../components/SettingsComp';

const ProfilePage = () => {
  return (
    <Layout title="You logged in as guest">
      <div>
        {/* Login Start Shopping */}
        <div className="flex justify-between items-center pl-9 pr-5 mt-10">
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
        <div className="px-4 md:px-0 mt-7">
          <PrimaryButton text="Login"></PrimaryButton>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
