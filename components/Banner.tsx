/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

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
        className="mySwiper shadow"
      >
        {banner.slice(1, 4).map((data: any) => (
          <SwiperSlide key={data.id}>
            <img src={data.image} alt={data.name} className="banner-img"></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
