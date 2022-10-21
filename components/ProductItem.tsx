import Image from 'next/image';
import React, { useState } from 'react';
import customAxios from './axios/axiosHttp';
import HeartIcon from './icons/HeartIcon';
import Plus from './icons/Plus';

const ProductItem = ({ product }: any) => {
  const [isWishList, setIsWishList] = useState(product.in_wishlist);
  const data = { product_id: product.id };

  const falseHandler = (event: any) => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishList(false);
  };

  const trueHandler = (event: any) => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishList(true);
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
            onClick={falseHandler}
          >
            <HeartIcon
              className={'w-[20px] h-[20px] text-red-400 font-bold'}
              fill="red"
            />
          </button>
        ) : (
          <button
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
        <Image
          src={product.primary_image}
          width={106}
          height={133}
          alt={product.name}
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
        <button className="p-1 bg-white rounded-full shadow-xl absolute right-2 bottom-2">
          <Plus className={'w-[20px] h-[20px] text-blue-800 font-bold'} />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
