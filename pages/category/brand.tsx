import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ShopByBrand } from '..';
import customAxios from '../../components/axios/axiosHttp';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';

const Brand = () => {
  const [brand, setBrand] = useState<Array<ShopByBrand>>([]);
  const [brandData, setBrandData] = useState([]);
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    const FetchData = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.homepage'
      );

      setBrand(res.data.message.shop_by_brands);
    };

    FetchData();
  }, []);

  const clickHandle = (name: string) => {
    setBrandName(name);
    console.log(name);
  };

  useEffect(() => {
    const FetchData = async () => {
      const res = await customAxios.get(
        `/api/method/dipmarts_app.api.brandproduct?id=${
          brandName === '' ? 'Apple' : brandName
        }`
      );

      setBrandData(res.data.message.product_list);
    };
    FetchData();
  }, [brandName]);

  return (
    <Layout title="Shop By Brand">
      <div className="flex">
        <div className="grid-cols-2">
          <div className="px-3 overflow-y-scroll w-[87px]">
            {brand?.map((data: ShopByBrand, index: number) => (
              <Link href={`/category/brand/`} key={index}>
                <div
                  className="py-3 border-b border-b-gray-300"
                  onClick={() => clickHandle(data.name)}
                >
                  <Image
                    src={data.logo}
                    alt={data.name}
                    width={50}
                    height={25}
                    objectFit="contain"
                    className=""
                    layout="responsive"
                  ></Image>
                  <h3 className="text-center text-xs pt-1">{data.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full px-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {brandData.map((item, index) => (
              <ProductItem product={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Brand;
