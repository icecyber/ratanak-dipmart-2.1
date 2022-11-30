import moment from 'moment';
import router from 'next/router';
import React from 'react';
import { dollaCurrency } from '../util/dollaCurrencyFormat';
import customAxios from './axios/axiosHttp';
import PrimaryButton from './button/PrimaryButton';
import Trash from './icons/Trash';

const OrderCard = ({ details }: any) => {
  const detailHandler = async (event: any, id: string) => {
    event.preventDefault();
    router.push(`/profile/orderdetail/${id}`);
  };

  return (
    <form className="p-5 border my-4 rounded-lg shadow">
      <div>
        <div className="flex justify-between">
          <h1 className="uppercase font-bold">order id : {details.order_no}</h1>
          <Trash />
        </div>
        <div>Ordered Date : {moment(details.created_date).format('lll')}</div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 items-end">
          <div>Order status:</div>
          <div className="ml-auto text-[#3080DC] font-bold">
            {details.order_status}
          </div>
          <div>Items purchased:</div>
          <div className="ml-auto font-bold">{details.total_item}</div>
          <div>Payment Type:</div>
          <div className="ml-auto font-bold">{details.payment_method}</div>
          <div>Total amount:</div>
          <div className="ml-auto font-bold">
            {dollaCurrency.format(details.total)}
          </div>
        </div>
      </div>
      <button
        className="w-full mt-4"
        type="button"
        onClick={() => detailHandler(event, details.id)}
      >
        <PrimaryButton text="Details" />
      </button>
    </form>
  );
};

export default OrderCard;
