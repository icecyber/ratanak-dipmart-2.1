import React, { useEffect, useState } from 'react';

import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';

import customAxios from '../../../../components/axios/axiosHttp';
import Delivering from '../../../../components/delivery/delivering';
import Successfill from '../../../../components/delivery/successfill';
import Successout from '../../../../components/delivery/successout';
import BackIcon from '../../../../components/icons/BackIcon';

type Props = {
  order_no: string;
  id: string;
  created_date: any;
  payment_method: string;
  delivery_fee: number;
  total: number;
  order_status: string;
  user_address: string;
  delivery_address: Daddress;
  order_tracking: Tracking[];
};
interface Tracking {
  created_date: any;
  id: string;
  order_status: string;
}
interface Daddress {
  contact_name: string;
  contact_number: number;
  label: string;
  address: string;
}

const Delivery = () => {
  const [orderData, setOrderData] = useState<Props>();
  const router = useRouter();
  const id = router.query.orderid;

  // console.log(moment(orderData?.order_tracking[0].created_date).format('LT'));

  useEffect(() => {
    const getDetail = async () => {
      const res = await customAxios.post(
        '/api/method/dipmarts_app.api.orderdetail',
        { id: id }
      );
      setOrderData(res.data.message);
    };
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          DipMarts - The Trusted E-Commerce Marketplace Platform In Cambodia
        </title>
        <meta
          name="description"
          content="DiPMarts, E-Commerce Marketplace Platform, is a top phone E-Marketplace that offers a 360-degree service for mobile Phone online shopping via the website or mobile app to customers and our partners. Furthermore, our platform accepts online payments, allows for installment payments, and provides a quick delivery service."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-5xl mx-auto relative bg-[white] min-h-screen">
        <div className="flex justify-between sticky bg-white top-0 items-center w-full mx-auto h-12 shadow-md p-4 z-40">
          <button onClick={() => router.back()} name="backfromdelivery">
            <BackIcon />
          </button>
          <h1 className="font-bold text-md">Delivery Status</h1>
          <span></span>
        </div>
        <div>
          <div className="p-5">
            <span className="text-sm text-[#9E9E9E] font-thin">
              Estimated Received date:{' '}
            </span>
            <span>{moment(orderData?.created_date).format('L')}</span>
          </div>
          <h1 className="font-semibold text-sm px-5">
            Order ID: {orderData?.id}
          </h1>
          <div className="px-5">
            <span className="font-semibold text-sm">Deliver items to: </span>
            <span className="text-sm text-[#9E9E9E] font-thin">
              {orderData?.delivery_address?.contact_name}, +855{' '}
              {orderData?.delivery_address?.contact_number} ,{' '}
              {orderData?.delivery_address?.label} , {orderData?.user_address}
            </span>
          </div>
          <div className="flex justify-center mx-5 my-5">
            <Delivering />
          </div>
          <div className="flex flex-col gap-6 bg-white rounded-xl m-4 py-5">
            <div className="grid grid-cols-5 gap-3 text-sm ">
              <div className="col-span-2 flex flex-col items-end mr-3 relative">
                <div className="absolute top-0 -right-8 z-30 border-2 rounded-full border-[#5BC7D8]">
                  {orderData?.order_status === 'Ordered' ? (
                    <Successfill />
                  ) : (
                    <Successout />
                  )}
                </div>
                <div className="absolute top-0 -right-[22px] w-[2px] h-[280px] bg-[#5BC7D8]"></div>
                <span className="font-semibold text-[#4D4C4C]">
                  {moment(orderData?.order_tracking[0].created_date).format(
                    'L'
                  )}
                </span>
                <span className="text-[#9E9E9E] font-thin">
                  {moment(orderData?.order_tracking[0].created_date).format(
                    'LT'
                  )}
                </span>
              </div>
              <div className="col-span-3 flex flex-col items-start ml-5">
                <span className="font-semibold text-[#4D4C4C]">Ordered</span>
                <span className="text-[#9E9E9E] font-thin">
                  Your order was confirmed by DipMarts
                </span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 text-sm">
              <div className="col-span-2 flex flex-col items-end mr-3 relative">
                <div className="absolute top-0 -right-8 z-30 border-2 rounded-full border-[#5BC7D8]">
                  {orderData?.order_status === 'Confirmed' ? (
                    <Successfill />
                  ) : (
                    <Successout />
                  )}
                </div>
                <span className="font-semibold text-[#4D4C4C]">21/02/2022</span>
                <span className="text-[#9E9E9E] font-thin">15:30PM</span>
              </div>
              <div className="col-span-3 flex flex-col items-start ml-5">
                <span className="font-semibold text-[#4D4C4C]">Confirmed</span>
                <span className="text-[#9E9E9E] font-thin">DiP accepted</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 text-sm">
              <div className="col-span-2 flex flex-col items-end mr-3 relative">
                <div className="absolute top-0 -right-8 z-30 border-2 rounded-full border-[#5BC7D8]">
                  {orderData?.order_status === 'Preparing' ? (
                    <Successfill />
                  ) : (
                    <Successout />
                  )}
                </div>
                <span className="font-semibold text-[#4D4C4C]">21/02/2022</span>
                <span className="text-[#9E9E9E] font-thin">15:30PM</span>
              </div>
              <div className="col-span-3 flex flex-col items-start ml-5">
                <span className="font-semibold text-[#4D4C4C]">Preparing</span>
                <span className="text-[#9E9E9E] font-thin">
                  Prepared your order
                </span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 text-sm">
              <div className="col-span-2 flex flex-col items-end mr-3 relative">
                <div className="absolute top-0 -right-8 z-30 border-2 rounded-full border-[#5BC7D8]">
                  {orderData?.order_status === 'Delivering' ? (
                    <Successfill />
                  ) : (
                    <Successout />
                  )}
                </div>
                <span className="font-semibold text-[#4D4C4C]">21/02/2022</span>
                <span className="text-[#9E9E9E] font-thin">15:30PM</span>
              </div>
              <div className="col-span-3 flex flex-col items-start ml-5">
                <span className="font-semibold text-[#4D4C4C]">Delivering</span>
                <span className="text-[#9E9E9E] font-thin">
                  Delivery accepted
                </span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 text-sm">
              <div className="col-span-2 flex flex-col items-end mr-3 relative">
                <div className="absolute top-0 -right-8 z-30 border-2 rounded-full border-[#5BC7D8]">
                  {orderData?.order_status === 'Delivered' ? (
                    <Successfill />
                  ) : (
                    <Successout />
                  )}
                </div>
                <span className="font-semibold text-[#4D4C4C]">21/02/2022</span>
                <span className="text-[#9E9E9E] font-thin">15:30PM</span>
              </div>
              <div className="col-span-3 flex flex-col items-start ml-5">
                <span className="font-semibold text-[#4D4C4C]">Delivered</span>
                <span className="text-[#9E9E9E] font-thin">To location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
