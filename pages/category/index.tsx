import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import Layout from '../../components/Layout';

interface Category {
  id: string;
  name: string;
  image_id: string;
}

const CategoryPage = () => {
  const [category, setCategory] = useState<Array<Category>>([]);

  useEffect(() => {
    const FetchData = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.categorylist'
      );
      setCategory(res.data.message.result.dipmart_cartgory);
    };
    FetchData();
  }, []);

  return (
    <Layout title="Category">
      <div className="grid grid-cols-2 mt-4">
        {category.map((data) => (
          <Link href={`/category/${data.id}`} key={data.id}>
            <div className="relative text-center w-[160px] h-[150px] md:w-[320px] md:h-[300px]">
              <h1 className="text-lg font-bold absolute left-4 z-10 bottom-4 text-white ">
                {data.name}
              </h1>
              <Image
                src={data.image_id}
                fill
                className="object-contain rounded-lg"
                alt="By Brand"
              />
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;
