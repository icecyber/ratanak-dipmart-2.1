import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import customAxios from '../components/axios/axiosHttp';
import Banner from '../components/Banner';
import ThreeDots from '../components/icons/ThreeDots';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';

export interface Banner {
  id: string;
  title: string;
  image: string;
}

export interface ShopByBrand {
  id: string;
  name: string;
  logo: string;
}
interface PopularProduct {
  id?: string;
  name?: string;
  primary_image?: string;
  default_price?: number;
  discount?: number;
}

const Home: NextPage = () => {
  const [banner, setBanner] = useState<Array<Banner>>([]);
  const [popularProduct, setPopularProduct] = useState<Array<PopularProduct>>(
    []
  );
  const [secondaryBanner, setSecondaryBanner] = useState([]);
  const [brand, setBrand] = useState<Array<ShopByBrand>>([]);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.homepage'
      );
      setBanner(res.data.message.advertisement);
      setPopularProduct(res.data.message.popular_products);
      setSecondaryBanner(res.data.message.secondary_banner);
      setBrand(res.data.message.shop_by_brands);
    };

    FetchData();
  }, []);

  useEffect(() => {
    const FetchAllProduct = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.allproduct',
        { params: { current_page: 2 } }
      );
    };
    FetchAllProduct();
  }, []);

  return (
    <Layout title="DipMarts">
      {/* Banner Component */}
      <Banner banner={banner} />
      {/* Brand List */}
      <div className="brand-layout">
        {brand?.slice(0, 7).map((data: ShopByBrand) => (
          <Link href={`/brand/${data.name}`} key={data.id}>
            <a className="brand-layout-item">
              <Image
                src={data.logo}
                alt={data.name}
                width={150}
                height={50}
                objectFit="contain"
                className=""
                layout="responsive"
              ></Image>
              <h3 className="text-center text-xs">{data.name}</h3>
            </a>
          </Link>
        ))}
        {/* See All Button */}
        <Link href="/category">
          <a>
            <div className="py-1 sm:py-3 md:py-4  md:px-3 w-full  text-center rounded-lg m-auto bg-blue-500 shadow">
              <ThreeDots className={'mx-auto md:w-[150px] md:h-[50px]'} />
              <h3 className="text-center text-xs text-white">See all</h3>
            </div>
          </a>
        </Link>
      </div>
      {/* Block Item Component Popular*/}
      <div>
        <h1 className="font-bold text-lg my-5">Popular</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {popularProduct.map((item, index) => (
            <ProductItem product={item} key={index} />
          ))}
        </div>
      </div>
      {/* Secondary Banner */}
      <Banner banner={secondaryBanner} />
      {/* Block Item Component All Product*/}
      <div className="mb-4">
        <h1 className="font-bold text-lg my-5">Popular</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {popularProduct.map((item, index) => (
            <ProductItem product={item} key={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
