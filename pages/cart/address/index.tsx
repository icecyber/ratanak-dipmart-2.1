import { Progress } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Dolla from '../../../components/icons/Dolla';
import LeftArrow from '../../../components/icons/LeftArrow';
import Pin from '../../../components/icons/Pin';
import Plus from '../../../components/icons/Plus';
import ShoppingCart from '../../../components/icons/ShoppingCart';
import router from 'next/router';
import customAxios from '../../../components/axios/axiosHttp';
import Brif from '../../../components/icons/Brif';
import Pencil from '../../../components/icons/Pencil';
import PrimaryButton from '../../../components/button/PrimaryButton';
import EmptyAddress from '../../../components/icons/EmptyAddress';

interface Address {
  address: string;
  contact_email: string;
  contact_name: string;
  contact_number: number;
  created_date: string;
  description: string;
  id: string;
  is_active: boolean;
  is_default: boolean;
  label: string;
  latitude: string;
  longitude: string;
  updated_date: string;
}

const AddressPage = () => {
  const [getAddress, setGetAddress] = useState<Array<Address>>([]);
  useEffect(() => {
    const FetchAddress = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.getaddress'
      );
      setGetAddress(res.data.message);
    };
    FetchAddress();
  }, []);

  return (
    <div>
      <div className="shadow py-5 flex px-4">
        <button type="button" onClick={() => router.back()}>
          <LeftArrow />
        </button>
        <h1 className="text-center font-bold mx-auto">Address</h1>
      </div>
      <div>
        {/* Cart Bar */}
        <div className="grid grid-cols-5 pt-4 items-center relative px-4">
          {/* Cart */}
          <div className="text-center">
            <h1 className="font-bold pb-2">Cart</h1>
            <div className="bg-blue-900  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 border-blue-800">
              <ShoppingCart className={'text-white'} />
            </div>
          </div>
          {/* Process */}
          <Progress value={100} className="mt-8" color="indigo" />
          {/* Cart */}
          <div className="text-center">
            <h1 className="pb-2 font-bold">Address</h1>
            <div className="bg-blue-900  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 border-blue-800">
              <Pin className={'text-white'} />
            </div>
          </div>
          {/* Process */}
          <Progress value={50} className="mt-8" color="indigo" />
          {/* Cart */}
          <div className="text-center">
            <h1 className="text-gray-500 pb-2">Delivery</h1>
            <div className="bg-gray-500  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 ">
              <Dolla className={'text-white'} />
            </div>
          </div>
        </div>
        {/* Cart Bar End */}
        <div className="px-4 mt-4">
          {getAddress?.map((item) => (
            <div
              className={`p-6 bg-white shadow-md rounded-lg mt-4 ${
                item.is_default ? 'border-2 border-blue-900' : null
              }`}
              key={item.id}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Brif />
                  <h1 className="font-bold">{item.label}</h1>
                  {item.is_default ? (
                    <p className="bg-gray-400 text-white px-2 rounded-lg text-xs flex items-center justify-center">
                      Default
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div>
                  <button>
                    <Pencil />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-medium">{item.address}</p>
              </div>
            </div>
          ))}
          {getAddress.length === 0 ? (
            <div className="px-4 mb-4">
              <div className="py-20">
                <EmptyAddress className={'mx-auto'} />
              </div>
              <Link href={'/cart/address/add'}>
                <div className="flex items-center px-2 py-3 border-2 rounded-2xl mt-5 w-full bg-blue-900">
                  <Plus className="text-white mr-2" />
                  <h1 className="text-white font-bold">Add New Address</h1>
                </div>
              </Link>
            </div>
          ) : (
            <>
              <Link href={'/cart/address/add'}>
                <div className="flex items-center px-2 py-3 border-2 rounded-2xl mt-5 w-full bg-gray-600">
                  <Plus className="text-white mr-2" />
                  <h1 className="text-white font-bold">Add New Address</h1>
                </div>
              </Link>
              <Link href={'/cart/payment'}>
                <div className="my-4">
                  <PrimaryButton text="Payment" />
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
