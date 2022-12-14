import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import BellSolid from '../../components/icons/BellSolid';
import DeliveryIcon from '../../components/icons/DeliveryIcon';
import Layout from '../../components/Layout';

const NotificationPage = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const FetchNotification = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.notificationlist',
        { params: { status: status } }
      );
    };
    FetchNotification();
  }, [status]);

  console.log(status);

  return (
    <Layout title="Notification">
      {/* Notification Bar */}
      <div className="grid grid-cols-4 pt-4 notification-bar ">
        <button type="button" name="new" onClick={() => setStatus('new')}>
          <div className="bg-blue-900 block p-3 rounded-full w-12 h-12 mx-auto">
            <BellSolid className={'text-white'} />
          </div>
          <h1 className="pt-2 text-center font-bold">New</h1>
        </button>
        <button
          type="button"
          name="promotion"
          onClick={() => setStatus('promotion')}
        >
          <div className="bg-gray-400 block p-3 rounded-full w-12 h-12 mx-auto">
            <BellSolid className={'text-white'} />
          </div>
          <h1 className="pt-2 text-center">Promotion</h1>
        </button>
        <button type="button" name="order" onClick={() => setStatus('order')}>
          <div className="bg-gray-400 block p-3 rounded-full w-12 h-12 mx-auto">
            <BellSolid className={'text-white'} />
          </div>
          <h1 className="pt-2 text-center">Order</h1>
        </button>
        <button
          type="button"
          name="delivery"
          onClick={() => setStatus('delivery')}
        >
          <div className="bg-gray-400 block p-3 rounded-full w-12 h-12 mx-auto">
            <BellSolid className={'text-white'} />
          </div>
          <h1 className="pt-2 text-center">Delivery</h1>
        </button>
      </div>
      {/* End Notificaiton Bar */}
      {/* Notification Lists */}

      {/* End Notification Lists */}
    </Layout>
  );
};

{
  /* <div className="pt-9 px-4">
        <div className="flex pb-4 ">
          <div className="bg-orange-600 block p-3 rounded-full w-12 h-12 ">
            <DeliveryIcon className={'text-white'} />
          </div>
          <div className="w-full ml-4">
            <div className="flex justify-between ">
              <h1 className="text-md font-bold">Order Arrived</h1>
              <h1 className="text-md text-gray-500">12:35 PM</h1>
            </div>
            <p className="text-gray-500">
              Order ID <strong className="text-black">1772</strong> has been
              completed & arrived at the location.
            </p>
          </div>
        </div>
      </div> */
}

export default NotificationPage;
