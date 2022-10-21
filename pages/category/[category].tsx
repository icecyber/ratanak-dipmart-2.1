import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';

const ShopByBrand = () => {
  const [category, setCategory] = useState([]);

  const router = useRouter();
  const route = router.query.category;
  console.log(router.query);

  useEffect(() => {
    const FetchData = async () => {
      const params = { category: route };
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.allproduct',
        { params }
      );

      setCategory(res.data.message.result);
    };
    FetchData();
  }, []);

  return (
    <Layout title={route}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {category.map((item, index) => (
          <ProductItem product={item} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export default ShopByBrand;
