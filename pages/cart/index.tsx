import { Progress } from '@material-tailwind/react';
import React from 'react';
import Close from '../../components/icons/Close';
import Dolla from '../../components/icons/Dolla';
import EmptyCart from '../../components/icons/EmptyCart';
import Pin from '../../components/icons/Pin';
import ShoppingCart from '../../components/icons/ShoppingCart';
import Layout from '../../components/Layout';
import PlusPairButton from '../../components/PlusPairButton';
import ProductItem from '../../components/ProductItem';

const CartPage = () => {
  return (
    <Layout title="My Cart">
      {/* Empty Cart */}
      {/* <div className="flex flex-col justify-center items-center text-center pt-10">
        <EmptyCart />
        <h1 className="text-md font-bold">Your Cart is Empty</h1>
        <p className="text-xs text-gray-500 py-2">
          Browse product and add to cart <br />
          to place order!
        </p>
      </div> */}
      {/* Cart Bar */}
      <div className="grid grid-cols-5 pt-4 items-center relative">
        {/* Cart */}
        <div className="text-center">
          <h1 className="font-bold pb-2">Cart</h1>
          <div className="bg-blue-900  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 border-blue-800">
            <ShoppingCart className={'text-white'} />
          </div>
        </div>
        {/* Process */}
        <Progress value={50} className="mt-8" color="indigo" />
        {/* Cart */}
        <div className="text-center">
          <h1 className="text-gray-500 pb-2">Address</h1>
          <div className="bg-gray-500  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 ">
            <Pin className={'text-white'} />
          </div>
        </div>
        {/* Process */}
        <Progress value={0} className="mt-8" color="indigo" />
        {/* Cart */}
        <div className="text-center">
          <h1 className="text-gray-500 pb-2">Delivery</h1>
          <div className="bg-gray-500  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 ">
            <Dolla className={'text-white'} />
          </div>
        </div>
      </div>
      {/* Cart Bar End */}
      {/* Cart Item */}
      <div className="mt-8">
        <h1 className="font-bold text-lg">Review Order</h1>
        <div className="flex py-4 mt-4 border-y-2 justify-between">
          <img
            src="https://s3.ap-southeast-1.amazonaws.com/dipmarts-s3/files/2022/08/04/Item/2QEPSWMA_p-30pro-.jpg.Green.jpg"
            alt="product"
            width={100}
          />
          {/* Info */}
          <div className="text-sm grid grid-rows-4 gap-2">
            <h1 className="font-bold">IPhone 13 Pro</h1>
            <div className="flex">
              <div className="text-gray-500">
                Qty: <span className="text-black">1</span>
              </div>
              <div className="text-gray-500 ml-1">
                Capacity : <span className="text-black">256GB</span>
              </div>
            </div>
            <div>Red</div>
            <div>$1,199.00</div>
          </div>
          {/* End Into */}
          <div className="flex flex-col justify-between items-end">
            <Close className={'text-blue-900 w-[30px] h-[30px]'} />
            <PlusPairButton />
          </div>
        </div>
      </div>
      {/* Cart Item End */}
      {/* Product May you Like */}
      <div className="pt-4 ">
        <h1 className="font-bold text-lg my-5">Products you might like</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* {popularProduct.map((item, index) => (
            <ProductItem product={item} key={index} />
          ))} */}
        </div>
      </div>
      {/* End Product May you like */}
    </Layout>
  );
};

export default CartPage;
