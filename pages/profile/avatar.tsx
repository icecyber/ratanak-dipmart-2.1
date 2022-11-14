import Image from 'next/image';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import customAxios from '../../components/axios/axiosHttp';
import EditIcon from '../../components/icons/EditIcon';
import LeftArrow from '../../components/icons/LeftArrow';
import axios from 'axios';

const Avatar = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [preview, setPreview] = useState<string>(userInfo?.avatar);
  const [userAvatar, setUserAvatar] = useState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userAvatar) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result + '');
      };
      reader.readAsDataURL(userAvatar);
    }
  }, [userAvatar]);

  const inputHandler = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === 'image') {
      setUserAvatar(file);
    } else {
      setUserAvatar(userInfo.avatar);
    }
  };

  const saveHandler = async (e: any) => {
    e.preventDefault();
    const form: any = document.getElementById('form');

    const formData: any = new FormData(form);
    formData.append('file', preview);
    formData.append('username', userInfo.fullname);
    console.log([...formData]);

    customAxios
      .post('/api/method/dipmarts_app.api.uploadimg', formData)
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <>
      <div className="py-5 text-center bg-white shadow grid grid-cols-3 px-2 items-center ">
        <button onClick={() => Router.back()}>
          <LeftArrow />
        </button>
        <div>Avatar</div>
      </div>
      <div className=" px-5">
        <div className="w-full flex justify-center mt-10">
          <form className="w-full" onSubmit={saveHandler} id="form">
            <div className="relative flex justify-center ">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }}
              >
                <div className="relative">
                  <Image
                    src={preview}
                    width={91}
                    height={91}
                    alt={userInfo.account_id}
                    className="rounded-full "
                    objectFit="cover"
                  />
                  <EditIcon className={'absolute bottom-0 -right-1'} />
                </div>
              </button>
              <div>
                <input
                  type="file"
                  id="file"
                  name="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <label htmlFor="disabled-input" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 mt-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={userInfo.fullname}
              disabled
            />
            <button
              type="submit"
              className="mt-52 bg-blue-900 w-full py-3  rounded-xl text-white font-bold"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Avatar;
