import type { NextPage } from 'next';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import customAxios from '../components/axios/axiosHttp';
import Banner from '../components/Banner';
import ThreeDots from '../components/icons/ThreeDots';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const FetchData = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.homepage'
      );
      if (res.data.message) {
        setBanner(res.data.message.advertisement);
        setPopularProduct(res.data.message.popular_products);
        setSecondaryBanner(res.data.message.secondary_banner);
        setBrand(res.data.message.shop_by_brands);
      }
    };

    FetchData();
  }, []);

  const fetchMoreAllProduct = async () => {
    setCurrentPage(currentPage + 1);
    // Fetch Next Page
    const res = await customAxios.get(
      '/api/method/dipmarts_app.api.allproduct',
      { params: { current_page: currentPage } }
    );
    const newData: [] = res.data.message.result;
    setAllProduct((oldData) => [...oldData, ...newData]);
    const lastpage = res.data.message.meta.last_page;
    if (currentPage === lastpage) {
      setHasMore(false);
    }
  };

  return (
    <Layout title="DipMarts">
      <div className="px-4">
        {/* Banner Component */}
        <Banner banner={banner} />
        {/* Brand List */}
        <div className="brand-layout">
          {brand?.slice(0, 7).map((data: ShopByBrand) => (
            <Link href={`/brand/${data.name}`} key={data.id} passHref>
              <div className="brand-layout-item">
                <Image
                  src={data.logo}
                  alt={data.name}
                  width={150}
                  height={50}
                  className="object-contain"
                ></Image>
                <h3 className="text-center text-xs">{data.name}</h3>
              </div>
            </Link>
          ))}
          {/* See All Button */}
          <div className="py-1 sm:py-3 md:py-4  md:px-3 w-full  text-center rounded-lg m-auto bg-blue-500 shadow">
            <Link href="/category/brand">
              <div>
                <ThreeDots className={'mx-auto md:w-[150px] md:h-[50px]'} />
                <h3 className="text-center text-xs text-white">See all</h3>
              </div>
            </Link>
          </div>
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
          <h1 className="font-bold text-lg my-5">All Products</h1>

          {/* Scroll */}
          <InfiniteScroll
            className="IFC"
            dataLength={allProduct.length}
            next={fetchMoreAllProduct}
            hasMore={hasMore}
            loader={
              <h4 className="mt-2 text-gray-400 text-center">Loading...</h4>
            }
            endMessage={
              <p className="text-center mt-2 text-gray-500">
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {allProduct.map((item, index) => (
                <ProductItem product={item} key={index} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
