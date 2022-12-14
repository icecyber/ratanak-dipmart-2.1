import { Progress } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import Dolla from '../../../components/icons/Dolla';
import LeftArrow from '../../../components/icons/LeftArrow';
import Pin from '../../../components/icons/Pin';
import ShoppingCart from '../../../components/icons/ShoppingCart';
import router from 'next/router';
import customAxios from '../../../components/axios/axiosHttp';
import Payment from '../../../components/icons/Payment';
import OrderSummery from '../../../components/icons/OrderSummery';
import Image from 'next/image';
import { CartItem } from '..';
import Link from 'next/link';
import PrimaryButton from '../../../components/button/PrimaryButton';
import { dollaCurrency } from '../../../util/dollaCurrencyFormat';
import Swal from 'sweetalert2';

interface Props {
  id: string;
  final_price: number;
  selection_image: string;
  qty: number;
  vat: number;
  product: Product;
  selection: Selection[];
  noted: string;
}
interface Selection {
  product_varraint_value: Product_varraint_value;
}
interface Product_varraint_value {
  id: string;
}
interface Product {
  id: string;
  name: string;
  default_price: number;
  delivery_fee: number;
}

interface ItemList {
  product_id: string;
  selection: Selection[];
  qty: number;
}

const PaymentPage: React.FC<Props> = () => {
  const [cartList, setCartList] = useState<Array<CartItem>>([]);
  const [itemList, setItemList] = useState<Array<ItemList>>([]);
  let total = 0;

  cartList.map((item) => (total += item.final_price));

  useEffect(() => {
    const GetCart = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.cartlist'
      );
      setCartList(res.data.message);
    };
    GetCart();
  }, []);

  async function placeOrderHandler() {
    const data = cartList.map((item) => {
      return {
        product_id: item.product.id ?? '',
        selection: [item.selection[0].id, item.selection[1].id],
        qty: item.qty,
      };
    });

    const orderBody = {
      user_address: '4rd floor, north gateway,..',
      noted: 'note1',
      item_list: data,
    };
    const res = await customAxios.post(
      '/api/method/dipmarts_app.api.placeorder',
      orderBody
    );
    if (res.status === 200) {
      setTimeout(() => {
        router.push('/cart/payment/success');
      }, 2000);
    }
  }

  return (
    <div>
      <div className="shadow py-5 flex px-4">
        <button type="button" onClick={() => router.back()}>
          <LeftArrow />
        </button>
        <h1 className="text-center font-bold mx-auto">Review Payment</h1>
      </div>
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
        <Progress value={100} className="mt-8" color="indigo" />
        {/* Cart */}
        <div className="text-center">
          <h1 className="font-bold pb-2">Delivery</h1>
          <div className="bg-blue-900  w-10 h-10 flex justify-center items-center rounded-full mx-auto border-2 border-blue-800">
            <Dolla className={'text-white'} />
          </div>
        </div>
      </div>
      {/* Cart Bar End */}
      {/* Payment Method */}
      <div className="px-4 mt-7">
        <div className="flex items-center">
          <Payment />
          <h1 className="font-bold ml-2">Payment Method:</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center mt-2">
          <div className="border-2 rounded-lg py-4 text-blue-gray-500">
            Loan
          </div>
          <div className="border-2 rounded-lg py-4 text-blue-gray-500">
            Cash On Delivery
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <OrderSummery />
            <h1 className="font-bold ml-2">Order Summery</h1>
          </div>
          {/* Summary Card */}
          {cartList.map((item) => (
            <div className="flex mt-3 border-b-2 pb-4" key={item.id}>
              <div>
                <Image
                  src={item.selection_image}
                  height={120}
                  width={100}
                  alt={item.product.name ?? ''}
                  className="object-cover"
                ></Image>
              </div>
              <div className="flex flex-col justify-between w-full ml-2">
                <h1>{item.product.name}</h1>
                <div className="flex justify-between">
                  <h1 className="font-bold text-blue-900">
                    ${item.product.default_price}
                  </h1>
                  <span className="border-2 rounded-lg p-1 text-xs">
                    x{item.qty}
                  </span>
                  <h1 className="font-bold">
                    {dollaCurrency.format(item.final_price)}
                  </h1>
                </div>
              </div>
            </div>
          ))}
          {/* Total */}
          <div className="mt-2">
            <h1 className="font-bold py-2">Fee Breakdown</h1>
            <div className="grid grid-rows-1 gap-2 border-b-2 pb-2">
              <div className="flex justify-between items-center">
                <h1>Subtotal</h1>
                <h1 className="text-gray-800 font-bold">
                  {dollaCurrency.format(total)}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1>Delivery fee</h1>
                <h1 className="text-gray-800 font-bold">$0.00</h1>
              </div>
              <div className="flex justify-between items-center">
                <h1>VAT</h1>
                <h1 className="text-gray-800 font-bold"> $0.00</h1>
              </div>
            </div>
            <div className="flex justify-between py-4 items-center">
              <h1 className="text-blue-900">Total Payable</h1>
              <h1 className="font-bold text-blue-900 text-2xl">
                {dollaCurrency.format(total)}
              </h1>
            </div>
          </div>
          {/* Button Place Order */}
          <div className="pb-4">
            <div onClick={placeOrderHandler}>
              <PrimaryButton text="Place Order" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
