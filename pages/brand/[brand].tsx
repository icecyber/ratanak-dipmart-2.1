import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';

const ShopByBrand = () => {
  const [brandData, setBrandData] = useState([]);
  const [brandTitle, setBrandTitle] = useState('');

  const router = useRouter();
  const route = router.query.brand;

  useEffect(() => {
    const FetchData = async () => {
      const res = await customAxios.get(
        `/api/method/dipmarts_app.api.brandproduct?id=${route}`
      );
      setBrandData(res.data.message.product_list);
      setBrandTitle(res.data.message.id);
    };
    FetchData();
  }, []);

  return (
    <Layout title={brandTitle}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
        {brandData.map((item, index) => (
          <ProductItem product={item} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export default ShopByBrand;