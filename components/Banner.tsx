import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
import Image from 'next/image';

interface Banner {
  id: string;
  image: string;
  name: string;
}

export default function Banner({ banner }: any) {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper shadow rounded-xl"
      >
        {banner.slice(1, 4).map((data: any) => (
          <SwiperSlide key={data.id}>
            <Image
              src={data.image}
              alt={data.name}
              layout="fill"
              objectFit="cover"
              priority
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
