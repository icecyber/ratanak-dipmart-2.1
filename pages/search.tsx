import { Input } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import customAxios from '../components/axios/axiosHttp';
import LeftArrow from '../components/icons/LeftArrow';
import Trending from '../components/icons/Trending';

interface ProductTranding {
  id: string;
  name: string;
}

const SearchPage = () => {
  const [getSearch, setGetSearch] = useState<Array<ProductTranding>>([]);

  const [keyValue, setKeyValue] = useState('');
  const data = { params: { id: keyValue } };

  useEffect(() => {
    const SearchFilter = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.search',
        data
      );
      setGetSearch(res.data.message.result.product_list);
    };
    SearchFilter();
  }, [keyValue]);

  const SearchHandler = (event: any) => {
    setKeyValue(event.target.value);
  };

  return (
    <div>
      <div className="font-bold text-base py-5 px-5 text-center bg-white shadow flex items-center">
        <Link href="/">
          <a>
            <LeftArrow className="mr-4" />
          </a>
        </Link>
        <Input
          variant="standard"
          label="Search for phone or other accessories"
          onChange={SearchHandler}
        />
      </div>
      <div className="px-5">
        <h1 className="font-bold mt-3">Trending</h1>
        {getSearch.map((product, index) => (
          <Link href={`product/${product.id}`} key={index}>
            <div className="flex gap-2 items-center mt-2">
              <Trending
                className={'w-9 h-9 bg-gray-200 p-2 text-black rounded-full'}
              />
              <h1>{product.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
