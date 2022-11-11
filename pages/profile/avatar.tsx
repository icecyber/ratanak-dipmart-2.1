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
  const fileInputRef = useRef<HTMLInputElement>();

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
    formData.append('username', '+855968888418');
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
            <div className="relative flex justify-center">
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
