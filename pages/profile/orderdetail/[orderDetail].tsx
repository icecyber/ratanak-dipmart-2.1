import moment from 'moment';
import Image from 'next/dist/client/image';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import customAxios from '../../../components/axios/axiosHttp';
import PrimaryButton from '../../../components/button/PrimaryButton';

import Layout from '../../../components/Layout';
import { dollaCurrency } from '../../../util/dollaCurrencyFormat';
import { ProductVarraintValue } from '../../cart';

interface OrderDetails {
  id: string;
  order_detail: OrderDetail[];
  created_date: string;
  order_no: string;
  order_status: string;
  total_item: string;
  payment_method: string;
  total: number;
  delivery_fee: number;
}

interface OrderDetail {
  id: string;
  product: Product;
  total: number;
  selection_image: string;
  qty: number;
  product_selection: ProductSelection[];
  vat: number;
}

interface Product {
  id: string;
  name: string;
}

interface ProductSelection {
  id: string;
  name: string;
  product_varraint_value: ProductVarraintValue;
}

const OrderDetail = () => {
  const router = useRouter();
  const orderDetailRoute = router.query.orderDetail;
  const [orderDetailItems, setOrderDetailItems] = useState<OrderDetails>();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const res = await customAxios.post(
        '/api/method/dipmarts_app.api.orderdetail',
        { id: orderDetailRoute }
      );
      if (res.data.message) {
        setOrderDetailItems(res.data.message);
      }
    };
    if (orderDetailRoute) {
      fetchOrderDetail();
    }
  }, [orderDetailRoute]);

  const VAT =
    orderDetailItems?.order_detail.reduce((a, b) => a + b.vat, 0) ?? 0;
  return (
    <Layout title="Order Detail">
      <div className="px-4 mt-4">
        <div className="border rounded-lg ">
          <div className="text-blue-900 text-center font-medium py-4  rounded-lg border-b-2 border-gray-400 border-dashed">
            ORDER ID {orderDetailItems?.id}
          </div>
        </div>
        <div className="border rounded-lg py-4 shadow">
          <div className="grid grid-cols-2 px-4">
            <div className="text-[#C2C2C2]">PLACED ON</div>
            <div className="text-[#C2C2C2]">PAYMENT TYPE</div>
            <div className="font-bold">
              {moment(orderDetailItems?.created_date).format('lll')}
            </div>
            <div className="font-bold">{orderDetailItems?.payment_method}</div>
            <div className="text-[#C2C2C2]">TOTAL AMOUNT</div>
            <div className="text-[#C2C2C2]">ORDER STATUS</div>
            <div className="font-bold">
              {dollaCurrency.format(orderDetailItems?.total ?? 0)}
            </div>
            <div className="font-bold">{orderDetailItems?.order_status}</div>
          </div>
        </div>
        <div className="border-b-2 border-gray-400 border-dashed my-6"></div>
        <h1 className="font-bold text-lg">Payment Summary</h1>
        <h1 className="font-bold text-lg text-gray-500 mt-4">Items</h1>
        <div className="mt-4">
          {orderDetailItems?.order_detail.map((item) => (
            <div key={item.id} className="flex justify-between my-4">
              <div className="flex">
                <div className="md:w-16 md:h-16">
                  <Image
                    src={item.selection_image}
                    alt={item.product.id}
                    width={42}
                    height={52}
                    className="object-cover w-auto h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-black text-sm font-bold">
                    {item.product.name}
                  </h3>
                  <h3 className="text-sm text-gray-600">Qty: {item.qty}</h3>
                  {item.product_selection.map((selection) => (
                    <div key={selection.id}>
                      {selection.name === 'Capacity' ? (
                        <h3 className="text-sm text-gray-600">
                          {selection.name}:
                          {selection.product_varraint_value.value}
                        </h3>
                      ) : null}
                    </div>
                  ))}
                  {item.product_selection.map((selection) => (
                    <div key={selection.id}>
                      {selection.name === 'Colour' ? (
                        <div className="flex items-center">
                          <h3 className="text-sm text-gray-600">
                            {selection.name}:{' '}
                          </h3>
                          <div
                            className="w-4 h-4 rounded-full border-white border shadow-lg ml-2"
                            style={{
                              backgroundColor: `${selection.product_varraint_value.value}`,
                            }}
                          ></div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-bold text-base">
                {dollaCurrency.format(item.total)}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2">
          <div className="text-sm text-gray-500">Sub Total:</div>
          <div className="ml-auto text-sm font-bold text-black">
            {dollaCurrency.format(orderDetailItems?.total ?? 0)}
          </div>
          <div className="text-sm text-gray-500">Delivery fee:</div>
          <div className="ml-auto text-sm font-bold text-black">
            {dollaCurrency.format(orderDetailItems?.delivery_fee ?? 0)}
          </div>
          <div className="text-sm text-gray-500">VAT:</div>
          <div className="ml-auto text-sm font-bold text-black">
            {dollaCurrency.format(VAT ?? 0)}
          </div>
        </div>
        <div className="border-b-2 border-gray-400 border-dashed my-6"></div>
        <div className="grid grid-cols-2">
          <div className="text-blue-700">Total Price:</div>
          <div className="text-red-600 ml-auto font-bold">
            {orderDetailItems
              ? dollaCurrency.format(
                  VAT + orderDetailItems?.delivery_fee + orderDetailItems?.total
                )
              : null}
          </div>
        </div>
        <p className="my-2">
          <span className="text-red-800">*</span>
          <span className="text-gray-600">
            {' '}
            In case, you want to cancel the order. Please contact this number:
          </span>{' '}
          <span className="font-bold text-blue-800">070 123 456</span>
        </p>
        <div className="my-4">
          <PrimaryButton text="Tracking" />
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
