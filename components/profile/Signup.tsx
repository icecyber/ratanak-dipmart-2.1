import { Input } from '@material-tailwind/react/components/Input';
import Link from 'next/link';
import React from 'react';
import PrimaryButton from '../button/PrimaryButton';

const Signup = () => {
  return (
    <div className="px-4 mt-5">
      <div className="grid grid-rows-3 ">
        <h1 className="font-bold">Register with Phone Number</h1>
        <p className="text-xs text-gray-600">
          Please enter your phone number to continue
        </p>
        <Input label="(+855) Phone Number" type={'number'} required />
      </div>
      <div className="py-5">
        <PrimaryButton text={'Countinue'}></PrimaryButton>
      </div>
    </div>
  );
};

export default Signup;
