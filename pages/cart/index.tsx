import { Progress } from '@material-tailwind/react';
import Image from 'next/image';
import useRouter from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/AuthForm';
import customAxios from '../../components/axios/axiosHttp';
import PrimaryButton from '../../components/button/PrimaryButton';
import Close from '../../components/icons/Close';
import Dolla from '../../components/icons/Dolla';
import EmptyCart from '../../components/icons/EmptyCart';
import Pin from '../../components/icons/Pin';
import ShoppingCart from '../../components/icons/ShoppingCart';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import { decresment, getBadge } from '../../redux/cartSlice';

export interface CartItem {
  id: string;
  selection: Selection[];
  qty: number;
  final_price: number;
  product: PreProduct;
  selection_image: string;
}

interface PreProduct {
  qty?: number;
  default_price?: number;
  dilivery_fee?: number;
  discount?: number;
  id?: string;
  in_wishlist?: boolean;
  is_top_sell?: string;
  max_delivery_fee?: number;
  name?: string;
  primary_image?: string;
  stock?: number;
  stock_type?: string;
  vat?: number;
  view_status?: boolean;
  short_description?: string;
  product_varraint?: Spec[];
}
interface Spec {
  id: string;
  name: string;
  product_varraint_value: SpecInit[];
}
interface SpecInit {
  id: string;
  value: string;
  note: string;
}
export interface Selection {
  id: string;
  name: string;
  product_varraint_value: ProductVarraintValue;
}

export interface ProductVarraintValue {
  id: string;
  value: string;
  price: number;
  note: string;
}

export interface Product {
  id: string;
  name: string;
  primary_image: string;
  default_price: number;
}

const CartPage = () => {
  const dispatch = useDispatch();
  const [showMyModal, setShowMyModal] = useState(false);
  const [capacityValue, setCapacityValue] = useState('');
  const [colorcode, setColorcode] = useState('');
  // Cart Data
  const [cartList, setCartList] = useState<Array<CartItem>>([]);
  const [cartRelate, setCartRelate] = useState([]);
  const [items, setItems] = useState<PreProduct>();
  const router = useRouter();
  const [colorText, setColorText] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isUserModal, setIsUserModal] = useState(false);

  // Check No scroll

  var total = 0;
  cartList.map((item) => (total += item.final_price));

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

  const decBadge = useSelector((state: any) => state.cart);

  const removeCart = (id: string, qty: number, index: number) => {
    customAxios.post('/api/method/dipmarts_app.api.removecart', {
      id: id,
    });
    setCartList((current) => current.filter((item) => item.id !== id));

    dispatch(decresment(qty));
  };

  const plusHandler = (id: any) => {
    setShowMyModal(true);
    const initailValue = id.selection;
    setItems(id.product);
    initailValue.map((data: any) => {
      if (data.name === 'Colour') {
        setSelectedColor(data.product_varraint_value.id);
        setColorcode(data.product_varraint_value.value);
        setColorText(data.product_varraint_value.note);
      }
      if (data.name === 'Capacity') {
        setSelectedCapacity(data.product_varraint_value.id);
        setCapacityValue(data.product_varraint_value.value);
      }
    });
  };

  const minusHandler = async (product: any) => {
    const selection = product.selection.map((data: any) => {
      return data;
    });

    const selected = selection.map((data: any) => {
      return data.product_varraint_value.id;
    });

    const datas = {
      id: product.id,
      selection: selected,
      qty: product.qty - 1,
      noted: '',
    };

    const updateItem = await customAxios.post(
      '/api/method/dipmarts_app.api.updatecart',
      datas
    );
    console.log(updateItem);
  };

  const selectCapacity = (id: string, value: string) => {
    setCapacityValue(value);
    setSelectedCapacity(id);
  };
  const selectColor = (id: string, value: string, note: string) => {
    setColorcode(value);
    setSelectedColor(id);
  };

  const IncrementCard = async () => {
    setShowMyModal(false);
    const datas = {
      product_id: items?.id,
      qty: 1,
      selection: [selectedColor, selectedCapacity],
      noted: '',
    };
    const request = await customAxios.post(
      '/api/method/dipmarts_app.api.addtocart',
      datas
    );
  };

  const checkOutHandler = () => {
    const userAuth = localStorage.getItem('Authorization');
    if (!userAuth) {
      setIsUserModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      router.push('/cart/address');
    }
  };

  const closeForm = () => {
    setIsUserModal(false);
    document.body.style.overflow = 'auto';
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
                      {product.selection.map((selection: Selection) =>
                        selection.name === 'Capacity' ? (
                          <div
                            className="text-gray-500 ml-1"
                            key={selection.id}
                          >
                            Capacity :{' '}
                            <span className="text-black">
                              {selection.product_varraint_value.value}
                            </span>
                          </div>
                        ) : null
                      )}
                    </div>
                    {}
                    {product.selection.map((selection: Selection) =>
                      selection.name === 'Colour' ? (
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
                      ) : null
                    )}
                    <div>$ {product.final_price}</div>
                  </div>
                  {/* End Into */}
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeCart(product.id, product.qty, index)}
                      name="closeBTN"
                    >
                      <Close className={'text-blue-900 w-[30px] h-[30px]'} />
                    </button>
                    <div className="flex">
                      <button
                        className="border border-blue-900 px-2 rounded-lg disabled:opacity-50"
                        disabled={product.qty === 1}
                        onClick={() => minusHandler(product)}
                        name="minusBTN"
                      >
                        -
                      </button>
                      <h1 className="px-2">{product.qty}</h1>
                      <button
                        className="border border-blue-900 px-2 rounded-lg disabled:opacity-50"
                        onClick={() => plusHandler(product)}
                        name="plusBTN"
                      >
                        +
                      </button>
                    </div>
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
                <h1 className="text-blue-900 font-bold">${total}</h1>
              </div>
              <button
                className="col-span-2"
                name="checkoutBTN"
                type="button"
                onClick={checkOutHandler}
              >
                <PrimaryButton text="Checkout" />
              </button>
            </div>
          </div>
        </>
      )}
      {showMyModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-10">
            <div className="max-w-3xl bg-white rounded py-2 w-full absolute bottom-12 animate__animated animate__fadeInUp rounded-t-xl">
              <div className="bg-white rounded-md max-w-3xl mx-auto px-2">
                <div className="h-28 relative pb-5 mb-3 border border-gray-100 rounded-md">
                  <div className="flex pb-5 ">
                    <div className="p-2 rounded-lg bg-white ">
                      <Image
                        width={94}
                        height={90}
                        objectFit="cover"
                        src={items?.primary_image ?? ''}
                        alt={items?.name}
                      />
                    </div>
                    <div className="flex flex-col justify-between pl-2 pt-2">
                      <div>
                        <h1 className="text-[14px] mb-1">{items?.name}</h1>
                        <div>
                          <div className="flex gap-2">
                            <span className="text-xs">
                              <span className="opacity-50">Qty: </span>1
                            </span>
                            <div className="text-xs opacity-50">
                              Capacity: {capacityValue}
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-start pt-2">
                              <button
                                className={`rounded-full p-2.5 mr-1`}
                                style={{
                                  backgroundColor: `${colorcode}`,
                                }}
                                name="colorpicking"
                                disabled
                              />
                              <small className="opacity-50">{colorText}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h1 className=" text-base">$ {items?.default_price}</h1>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMyModal(false)}
                    className="absolute right-1 top-1 "
                    name="deletebtn"
                  >
                    <Close />
                  </button>
                </div>
                <div className="px-4 py-2">
                  {items?.product_varraint?.map((data) => (
                    <div key={data.id}>
                      <h1 className="font-bold">{data.name}</h1>
                      <div className="flex">
                        {data?.product_varraint_value.map((d) => (
                          <div key={d.id}>
                            {data.name === 'Capacity' && (
                              <div
                                key={d.id}
                                className={
                                  d.id === selectedCapacity
                                    ? 'bg-blue-800 m-1 shadow-md text-xs rounded-lg text-white '
                                    : 'bg-black bg-opacity-25 m-1 shadow-md text-xs rounded-lg text-black'
                                }
                              >
                                <button
                                  onClick={() => selectCapacity(d.id, d.value)}
                                  className={'py-2 px-2'}
                                  name={data.name}
                                  id={d.id}
                                >
                                  {d.value}
                                </button>
                              </div>
                            )}
                            {data.name === 'Colour' && (
                              <div
                                key={d.id}
                                className={
                                  d.id === selectedColor
                                    ? 'rounded-full p-0.5 flex items-center justify-center border border-blue-700 mr-1'
                                    : 'rounded-full p-0.5 flex items-center justify-center'
                                }
                              >
                                <button
                                  onClick={() => {
                                    selectColor(d.id, d.value, d.note);
                                  }}
                                  className={'rounded-full p-4'}
                                  style={{
                                    backgroundColor: `${d.value}`,
                                  }}
                                  name={data.name}
                                  id={d.id}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-2 gap-2">
                  <button
                    onClick={() => router.push(`/productdetail/${items?.id}`)}
                    name="productdetail"
                    className="text-blur-900 text-sm w-36 py-2 border-2 border-blue-900 rounded-xl"
                  >
                    Product Detail
                  </button>
                  <button
                    name="confirm"
                    className="text-white text-sm w-36 py-2 bg-blue-900 rounded-xl"
                    onClick={IncrementCard}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50"></div>
        </>
      ) : null}
      {isUserModal ? <AuthForm closeForm={closeForm} /> : null}
    </Layout>
  );
};

export default CartPage;
