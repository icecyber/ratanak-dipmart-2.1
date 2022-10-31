import { Progress } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import Dolla from '../../../components/icons/Dolla';
import LeftArrow from '../../../components/icons/LeftArrow';
import Pin from '../../../components/icons/Pin';
import Plus from '../../../components/icons/Plus';
import ShoppingCart from '../../../components/icons/ShoppingCart';
import Layout from '../../../components/Layout';
import router from 'next/router';

const AddressPage = () => {
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
        <div className="grid grid-cols-5 pt-4 items-center relative ">
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
        <div className="px-4">
          <Link href={'/cart/address/add'}>
            <div className="flex items-center px-2 py-3 bg-gray-200 border-2 rounded-2xl mt-5 w-full">
              <Plus className="text-blue-900 mr-2" />
              <h1>Add New Address</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
