import Image from 'next/image';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import Close from '../../components/icons/Close';
import EmptyWishList from '../../components/icons/EmptyWishList';
import Layout from '../../components/Layout';

interface Item {
  id: string;
  primary_image: string;
  name: string;
  default_price: number;
}

const WishListPage = () => {
  const [wishlist, setWishlist] = useState<Array<Item>>([]);

  useEffect(() => {
    const FetchWishList = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.wishlist'
      );
      setWishlist(res.data.message.result);
    };
    FetchWishList();
  }, []);

  const removeWishlistHandler = (id: string, index: number) => {
    const data = { product_id: id };
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);

    setWishlist((current) => current.filter((e, i) => i !== index));
  };

  return (
    <Layout title="Wish List">
      {wishlist.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-center pt-10">
          <EmptyWishList />
          <h1 className="text-md font-bold">Empty Wish List</h1>
          <p className="text-xs text-gray-500 py-2">
            You haven’t added any items
            <br /> to your Wish List yet.
          </p>
        </div>
      ) : (
        wishlist.map((data, index) => (
          <div
            className="flex mt-3 shadow rounded-lg py-3 px1 items-start justify-between"
            key={index}
          >
            <div className="flex">
              <Image
                src={data?.primary_image}
                alt={data.name}
                width={84}
                height={108}
              />
              <div>
                <h1 className="font-bold">{data.name}</h1>
                <h1 className="text-gray-500">$ {data.default_price}</h1>
              </div>
            </div>

            <button
              type="button"
              className="pr-4"
              onClick={() => removeWishlistHandler(data.id, index)}
            >
              <Close className={'text-red-700'} />
            </button>
          </div>
        ))
      )}
    </Layout>
  );
};

export default WishListPage;
