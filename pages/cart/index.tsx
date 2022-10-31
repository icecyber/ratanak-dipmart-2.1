import { Progress } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createSecureContext } from 'tls';
import customAxios from '../../components/axios/axiosHttp';
import PrimaryButton from '../../components/button/PrimaryButton';
import Close from '../../components/icons/Close';
import Dolla from '../../components/icons/Dolla';
import EmptyCart from '../../components/icons/EmptyCart';
import Pin from '../../components/icons/Pin';
import ShoppingCart from '../../components/icons/ShoppingCart';
import Layout from '../../components/Layout';
import PlusPairButton from '../../components/PlusPairButton';
import ProductItem from '../../components/ProductItem';
interface CartItem {
  id: string;
  selection: Selection[];
  qty: number;
  final_price: number;
  product: Product;
  selection_image: string;
}
interface Selection {
  id: string;
  name: string;
  product_varraint_value: ProductVarraintValue;
}

interface ProductVarraintValue {
  id: string;
  value: string;
  price: number;
  note: string;
}

interface Product {
  id: string;
  name: string;
  primary_image: string;
  price: number;
}

const CartPage = () => {
  // Cart Data
  const [cartList, setCartList] = useState<Array<CartItem>>([]);
  const [cartRelate, setCartRelate] = useState([]);
  const [total, setTotal] = useState();

  // Get Cart
  useEffect(() => {
    const GetCart = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.cartlist'
      );
      setCartList(res.data.message);

      const getRelate = await customAxios.get(
        '/api/method/dipmarts_app.api.cartrelate'
      );
      setCartRelate(getRelate.data.message.list_product);
    };
    GetCart();
  }, []);

  const RemoveCart = (id: string, index: number) => {
    customAxios.post('/api/method/dipmarts_app.api.removecart', {
      id: id,
    });
    setCartList((current) => current.filter((item) => item.id !== id));
  };

  return (
    <Layout title="My Cart">
      {/* Empty Cart */}
      {cartList.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-center pt-10">
          <EmptyCart />
          <h1 className="text-md font-bold">Your Cart is Empty</h1>
          <p className="text-xs text-gray-500 py-2">
            Browse product and add to cart <br />
            to place order!
          </p>
        </div>
      ) : (
        <>
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
          <div className="px-4">
            {/* Cart Item */}
            <div className="mt-8">
              <h1 className="font-bold text-lg">Review Order</h1>
              {cartList.map((product, index) => (
                <div
                  className="flex py-4 mt-4 border-y-2 justify-between"
                  key={index}
                >
                  <Image
                    src={product.selection_image}
                    alt={product.product.name}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                  {/* Info */}
                  <div className="text-sm grid grid-rows-4 gap-2">
                    <h1 className="font-bold">{product.product.name}</h1>
                    <div className="flex">
                      <div className="text-gray-500">
                        Qty: <span className="text-black">{product.qty}</span>
                      </div>
                      {product.selection
                        .slice(0, 1)
                        .map((selection: Selection) => (
                          <div
                            className="text-gray-500 ml-1"
                            key={selection.id}
                          >
                            Capacity :{' '}
                            <span className="text-black">
                              {selection.product_varraint_value.value}
                            </span>
                          </div>
                        ))}
                    </div>
                    {}
                    {product.selection
                      .slice(1, 2)
                      .map((selection: Selection) => (
                        <div
                          className="text-gray-500 flex items-center"
                          key={selection.id}
                        >
                          <div
                            className="text-black w-6 h-6 rounded-full"
                            style={{
                              backgroundColor: `${selection.product_varraint_value.value}`,
                            }}
                          ></div>
                          <h1 className="ml-2">
                            {selection.product_varraint_value.note}
                          </h1>
                        </div>
                      ))}
                    <div>$ {product.final_price}</div>
                  </div>
                  {/* End Into */}
                  <div className="flex flex-col justify-between items-end">
                    <button onClick={() => RemoveCart(product.id, index)}>
                      <Close className={'text-blue-900 w-[30px] h-[30px]'} />
                    </button>
                    <PlusPairButton />
                  </div>
                </div>
              ))}
            </div>
            {/* Cart Item End */}
            {/* Product May you Like */}
            <div className="pt-4 mb-16">
              <h1 className="font-bold text-lg my-5">
                Products you might like
              </h1>
              <div className=" flex gap-4 overflow-x-scroll px-3 py-2">
                {cartRelate.map((item, index) => (
                  <div className="min-w-[150px]" key={index}>
                    <ProductItem product={item} />
                  </div>
                ))}
              </div>
            </div>
            {/* End Product May you like */}
            {/* Total and Checkout */}
            <div className="grid grid-cols-3 w-full sticky bottom-14 bg-white px-2 py-3 z-50">
              <div>
                <h3 className="text-sm text-gray-500">Total</h3>
                <h1 className="text-blue-900 font-bold">$1,199.00</h1>
              </div>
              <Link href="/cart/address">
                <button className="col-span-2">
                  <PrimaryButton text="Checkout" />
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
