/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import TopNavCategory from '../../components/navbar/TopNavCategory';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import HeartIcon from '../../components/icons/HeartIcon';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AuthForm from '../../components/AuthForm';
import { useDispatch } from 'react-redux';
import { increment } from '../../redux/cartSlice';
import Layout from '../../components/Layout';

interface ProductDetail {
  id: string;
  name: string;
  primary_image: string;
  in_wishlist: boolean;
  pre_spec: PreSpec;
  default_price: number;
  stock: number;
  product_varraint: ProductVarraint[];
  product_spec: ProductSpec[];
  product_feature: ProductFeature[];
}

interface PreSpec {
  spec: [];
}

interface ProductVarraint {
  id: string;
  name: string;
  product_varraint_value: ProductVarraintValue[];
}

interface ProductVarraintValue {
  id: string;
  value: string;
  note: string;
}

interface ProductSpec {
  id: string;
  value: string;
  value_spec: ValueSpec[];
}

interface ValueSpec {
  id: string;
  value: string;
}

interface ProductFeature {
  id: string;
  name: string;
  image_path: string;
}

interface Username {
  account_id: string;
  avatar: string;
  birthday: string;
  country_code: string;
  email: string;
  image: string;
  fullname: string;
  gender: string;
  phone_number: string;
}

const ProductDetail = () => {
  const router = useRouter();
  const route = router.query.id;
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [isWishList, setIsWishlist] = useState(false);
  const [open, setOpen] = useState(1);
  const [CapId, setCapId] = useState('');
  const [colorId, setColorID] = useState('');
  const [userProfile, setUserProfile] = useState<Username>();
  const data = { product_id: productDetail?.id };
  const [qty, setQty] = useState(1);
  const [isUserModal, setIsUserModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      const FetchData = async () => {
        const res = await customAxios.post(
          '/api/method/dipmarts_app.api.productdetail',
          { id: route }
        );
        const data = res.data.message;
        setProductDetail(data);
        setIsWishlist(res.data.message.in_wishlist);

        const value: [] = res.data.message.product_varraint;
        value?.map((data: any) => {
          if (data.name === 'Colour') {
            setColorID(data.product_varraint_value[0].id);
          }
          if (data.name === 'Capacity') {
            setCapId(data.product_varraint_value[0].id);
          }
        });
      };
      FetchData();
    }
  }, [router.isReady]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.userprofile'
      );
      setUserProfile(res.data.message);
    };
    fetchUserProfile();
  }, []);

  const AddTOCart = async () => {
    // Add To Cart Body
    const AddCartBody = {
      product_id: productDetail?.id,
      selection:
        CapId === '' || colorId === ''
          ? productDetail?.pre_spec.spec
          : [CapId, colorId],
      qty: qty,
      noted: '',
    };

    const req = await customAxios.post(
      '/api/method/dipmarts_app.api.addtocart',
      AddCartBody
    );
    dispatch(increment(1));
  };

  const handleOpen = (index: number) => {
    setOpen(open === index ? -1 : index);
  };

  const AddWishList = () => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishlist(true);
  };

  const RemoveAddWishList = () => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishlist(false);
  };

  function Icon({ id, open }: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  const CapSelectHandler = (id: string) => {
    setCapId(id);
  };
  const ColorSelectHandler = (id: string) => {
    setColorID(id);
  };

  const plusHandler = () => {
    setQty((prev) => prev + 1);
  };
  const minusHandler = () => {
    setQty((prev) => prev - 1);
  };

  const buyNowHandler = () => {
    const userAuth = localStorage.getItem('Authorization');
    if (!userAuth) {
      setIsUserModal(true);
    } else {
      router.push('/cart/address');
    }
  };

  const closePopUp = () => {
    setIsUserModal(false);
  };

  if (router.isReady === true) {
    return (
      <Layout title={`${router.query.id}`}>
        {productDetail && (
          <>
            <div className="mt-4 bg-white w-80 h-60 relative mx-auto">
              <Image
                src={productDetail?.primary_image}
                alt="Product Item"
                fill
                className="mt-3 md:w-1/2 md:mx-auto object-contain"
                priority
              />
            </div>
            <div className="px-4 pt-4 grid gap-2">
              {/* Product Name */}
              <h1 className="text-lg font-bold">{productDetail?.name}</h1>
              {/* Price and Plus Pair */}
              <div className="flex justify-between">
                <h1 className="text-lg font-bold text-blue-800">
                  $ {productDetail?.default_price}
                </h1>
                <div className="flex">
                  <button
                    className="border border-blue-900 px-2 rounded-lg disabled:opacity-50"
                    onClick={minusHandler}
                    disabled={qty === 1 ? true : false}
                  >
                    -
                  </button>
                  <h1 className="px-2">{qty}</h1>
                  <button
                    className="border border-blue-900 px-2 rounded-lg disabled:opacity-50"
                    onClick={plusHandler}
                    disabled={qty === productDetail.stock ? true : false}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Stock */}
              <div className="text-lg flex">
                Availability : &nbsp;
                <p className="text-blue-800 font-bold">
                  {productDetail?.stock}
                </p>{' '}
                &nbsp; Products in Stock
              </div>

              {productDetail?.product_varraint.map(
                (varraint: ProductVarraint, index: number) => (
                  <div key={index}>
                    <h1 className="font-bold">{varraint.name}</h1>
                    <div className="flex mt-2">
                      {varraint.product_varraint_value.map(
                        (value: ProductVarraintValue) => (
                          <div key={value.id}>
                            {varraint.name === 'Capacity' && (
                              <div className={`mr-2`}>
                                <button
                                  onClick={() => CapSelectHandler(value.id)}
                                  className={`px-2 py-1 ${
                                    CapId === value.id
                                      ? 'bg-blue-800'
                                      : 'bg-gray-600'
                                  } rounded-lg text-white `}
                                >
                                  {value.note}
                                </button>
                              </div>
                            )}
                            {varraint.name === 'Colour' && (
                              <div
                                className={`mr-2 ${
                                  colorId === value.id
                                    ? 'border border-blue-900 p-0.5 rounded-full flex justify-center items-center'
                                    : ''
                                }`}
                              >
                                <button
                                  onClick={() => ColorSelectHandler(value.id)}
                                  className="p-4 rounded-full"
                                  style={{ backgroundColor: `${value.value}` }}
                                ></button>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Product Description */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. A morbi
                convallis velit volutpat sit erat est. Eu malesuada amet,
                vestibulum eu. Mi, iaculis lectus nulla adipiscing sit sodales
                quam neque.
              </p>
              {/* Accordion */}
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  Product Description
                </AccordionHeader>
                <div>
                  <AccordionBody>
                    <div className="grid grid-cols-1">
                      {productDetail?.product_spec.map((spec: ProductSpec) => (
                        <div key={spec.id} className="flex justify-between">
                          {spec.value} :
                          <p className="w-[70%]">{spec.value_spec[0].value}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionBody>
                </div>
              </Accordion>

              <Accordion open={open === 2} icon={<Icon id={1} open={open} />}>
                {/* Feature */}
                <AccordionHeader onClick={() => handleOpen(2)}>
                  Feature
                </AccordionHeader>
                <div>
                  <AccordionBody>
                    <div className="grid grid-cols-2 gap-4">
                      {productDetail?.product_feature.map(
                        (feature: ProductFeature) => (
                          <div
                            key={feature.id}
                            className="bg-gray-300 rounded-lg w-full py-3 mx-auto flex flex-col"
                          >
                            <Image
                              src={feature.image_path}
                              alt={feature.name}
                              width={30}
                              height={30}
                              className="object-contain mx-auto"
                            />
                            <h1 className="text-center font-bold pt-1">
                              {feature.name}
                            </h1>
                          </div>
                        )
                      )}
                    </div>
                  </AccordionBody>
                </div>
              </Accordion>

              {/* End Accordion */}
            </div>
            {/* Add Wishlist */}
            <div className="sticky bottom-0 flex gap-10 bg-white justify-evenly p-3 my-3 shadow-inner">
              {isWishList ? (
                <button
                  className="border border-red-800 rounded-md p-3"
                  type="button"
                  onClick={RemoveAddWishList}
                >
                  <HeartIcon fill="red" />
                </button>
              ) : (
                <button
                  className="border border-gray-500 rounded-md p-3"
                  type="button"
                  onClick={AddWishList}
                >
                  <HeartIcon />
                </button>
              )}

              <button
                className="border-2 border-blue-900 text-blue-900 rounded-md font-bold p-3 md:px-10"
                onClick={AddTOCart}
              >
                Add to Cart
              </button>
              <button
                className="border-2 bg-blue-900 text-white rounded-md font-bold p-3 md:px-10"
                onClick={buyNowHandler}
              >
                Buy Now
              </button>
            </div>
          </>
        )}
        {isUserModal ? <AuthForm closeForm={closePopUp} /> : null}
      </Layout>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default ProductDetail;
