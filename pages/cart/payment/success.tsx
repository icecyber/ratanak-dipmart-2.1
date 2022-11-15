import Link from 'next/link';
import React from 'react';
import PrimaryButton from '../../../components/button/PrimaryButton';

const Success = () => {
  return (
    <>
      <h1 className="text-green-600 font-bold text-center py-6">Success</h1>
      <div className="text-center py-32">
        <svg
          width="142"
          height="143"
          viewBox="0 0 142 143"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <g filter="url(#filter0_d_1143_21931)">
            <rect
              x="30"
              y="20.2246"
              width="82"
              height="82"
              rx="41"
              fill="#32B768"
            />
          </g>
          <path
            d="M58.4722 61.7936L67.2037 70.3353L84.6666 53.252"
            stroke="white"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <filter
              id="filter0_d_1143_21931"
              x="0"
              y="0.224609"
              width="142"
              height="142"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="10" />
              <feGaussianBlur stdDeviation="15" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.25098 0 0 0 0 0.74902 0 0 0 0 1 0 0 0 0.24 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1143_21931"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1143_21931"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <h1 className="font-bold text-gray-700">Your order has been placed!</h1>
        <p className="text-gray-700">
          We will contact you shortly for delivery. You will <br /> be notified
          by the app of your order progress.
        </p>
      </div>
      <div className=" px-6">
        <Link href={'/'}>
          <PrimaryButton text="Back Home" />
        </Link>
      </div>
    </>
  );
};

export default Success;
