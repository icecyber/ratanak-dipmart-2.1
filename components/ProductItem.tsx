import Image from 'next/image';
import Router from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/cartSlice';
import customAxios from './axios/axiosHttp';
import HeartIcon from './icons/HeartIcon';
import Plus from './icons/Plus';

const ProductItem = ({ product }: any) => {
  const [isWishList, setIsWishList] = useState(product.in_wishlist);
  const data = { product_id: product.id };
  const dispatch = useDispatch();

  // Add To Cart Body
  const AddCartBody = {
    product_id: product.id,
    selection: product.pre_spec.spec,
    qty: 1,
    noted: '',
  };

  const falseHandler = (event: any) => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishList(false);
  };

  const trueHandler = (event: any) => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishList(true);
  };

  const AddToCart = () => {
    dispatch(increment(1));
    customAxios.post('/api/method/dipmarts_app.api.addtocart', AddCartBody);
  };

  return (
    <div className="bg-white relative rounded-lg shadow-md">
      <div className="pt-4 text-center">
        <div className="text-[10px] bg-red-600 text-white inline-block px-3 py-2 rounded-md absolute -left-2 z-10 shadow">
          {product.is_top_sell}
        </div>
        {/* Condition Wishlist */}
        {isWishList ? (
          <button
            type="button"
            className={
              'p-1 bg-gray-200 rounded-full shadow-xl absolute right-2 top-2 z-10'
            }
            name="wishlistfalse"
            onClick={falseHandler}
          >
            <HeartIcon
              className={'w-[20px] h-[20px] text-red-400 font-bold'}
              fill="red"
            />
          </button>
        ) : (
          <button
            name="wishlisttrue"
            type="button"
            className={
              'p-1 bg-gray-200 rounded-full shadow-xl absolute right-2 top-2 z-10'
            }
            onClick={trueHandler}
          >
            <HeartIcon
              className={'w-[20px] h-[20px] text-blue-800 font-bold'}
            />
          </button>
        )}
        {/* End Condition Wishlist */}
      </div>

      <div onClick={() => Router.push(`/product/${product.id}`)}>
        <div className="flex justify-center">
          <Image
            src={product.primary_image}
            width={106}
            height={133}
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="relative p-3">
          <h1 className="font-bold text-xs pb-3">{product.name}</h1>
          <div className="flex">
            <h1 className="font-bold text-xs text-blue-800 mr-1">
              $ {product.default_price}
            </h1>
            <s className="text-[10px] text- text-red-600">
              {product.discount ? product.discount : ''}
            </s>
          </div>
        </div>
      </div>
      <button
        className="p-1 bg-white rounded-full shadow-xl absolute right-2 bottom-2"
        onClick={AddToCart}
        name="addWishList"
      >
        <Plus className={'w-[20px] h-[20px] text-blue-800 font-bold'} />
      </button>
    </div>
  );
};

export default ProductItem;
