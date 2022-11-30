import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import Layout from '../../components/Layout';
import OrderCard from '../../components/OrderCard';
import router from 'next/router';
import EmptyOrder from '../../components/icons/EmptyOrder';
import PrimaryButton from '../../components/button/PrimaryButton';

export interface Details {
  id: string;
  created_date: string;
  order_no: string;
  order_status: string;
  total_item: string;
  payment_method: string;
  total: number;
}

const Myorder = () => {
  const [tabActiveStyle, setTabActiveStlye] = useState(
    'bg-blue-900 text-white font-bold rounded-full py-2 px-3'
  );
  const [tabActive, setTabActive] = useState('currentorder');
  const [orderItems, setOrderItems] = useState<Array<Details>>([]);

  useEffect(() => {
    const fetchUserOrder = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.orderlist'
      );
      setOrderItems(res?.data.message.result);
    };
    fetchUserOrder();
  }, []);

  return (
    <Layout title={'My Orders'}>
      <div className="px-4 pt-4">
        {/* TabIndex */}
        <div className="grid grid-cols-2 items-center gap-4">
          <div
            className={`text-center ${
              tabActive === 'currentorder' ? tabActiveStyle : null
            }`}
            onClick={() => setTabActive('currentorder')}
          >
            Current Order
          </div>
          <div
            className={`text-center ${
              tabActive === 'delivered' ? tabActiveStyle : null
            }`}
            onClick={() => setTabActive('delivered')}
          >
            Delivered
          </div>
        </div>
        {/* End TabIndex */}
        {/* ORder Card */}

        {orderItems.length > 0 ? (
          orderItems?.map((item, index) => (
            <OrderCard details={item} key={index} />
          ))
        ) : (
          <div className="mt-4 grid gap-4 justify-center text-center">
            <EmptyOrder />
            <h1 className="font-bold">Your Shopping Order is Empty</h1>
            <p className="text-xs text-gray-500">
              Your order will show up here once you make a purchase .
            </p>
            <div onClick={() => router.push('/')}>
              <PrimaryButton text="Start Shopping" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Myorder;
