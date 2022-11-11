import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import ChevronRight from '../../components/icons/ChevronRight';
import router from 'next/router';
import Layout from '../../components/Layout';

const EditProfile = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  console.log(userInfo);

  return (
    <Layout title="Edit Profile">
      <div
        className="flex items-center justify-between px-4 py-5 shadow"
        onClick={() => router.push('/profile/avatar')}
      >
        <div className="text-sm font-medium">Photo</div>
        <div className="flex items-center gap-3">
          <Image
            src={userInfo.avatar}
            alt={userInfo.account_id}
            width="61px"
            height="61px"
            className="rounded-full"
          />
          <ChevronRight className={'w-5 h-5'} />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow">
        <div className="text-sm font-medium">Account ID</div>
        <div className="text-sm text-gray-500">{userInfo.account_id}</div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow my-5">
        <div className="text-sm font-medium">Change Account Password</div>
        <div>
          <ChevronRight className={'w-5 h-5'} />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow">
        <div className="text-sm font-medium">Name</div>
        <div className="text-sm text-gray-500">{userInfo.fullname}</div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow">
        <div className="text-sm font-medium">Phone Number</div>
        <div className="text-sm text-gray-500">{userInfo.phone_number}</div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow">
        <div className="text-sm font-medium">Email</div>
        <div className="text-sm text-gray-500">
          {!userInfo.email ? (
            <div className="text-blue-800">Add</div>
          ) : (
            userInfo.email
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow">
        <div className="text-sm font-medium">Gender</div>
        <div className="text-sm text-gray-500">
          {!userInfo.gender ? (
            <div className="text-blue-800">Add</div>
          ) : (
            userInfo.gender
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow">
        <div className="text-sm font-medium">Birthday</div>
        <div className="text-sm text-gray-500">
          {!userInfo.birthday ? (
            <div className="text-blue-800">Add</div>
          ) : (
            userInfo.birthday
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 shadow my-5">
        <div className="text-sm font-medium text-red-600">Delete Account</div>
        <div>
          <ChevronRight className={'w-5 h-5 text-red-600'} />
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
