import router from 'next/router';
import React from 'react';
import LeftArrow from '../../../components/icons/LeftArrow';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Input } from '@material-tailwind/react';
import PrimaryButton from '../../../components/button/PrimaryButton';
import Plus from '../../../components/icons/Plus';

const AddAddress = () => {
  return (
    <div>
      <div className="shadow py-5 flex px-4">
        <button type="button" onClick={() => router.back()}>
          <LeftArrow />
        </button>
        <h1 className="text-center font-bold mx-auto">New Address</h1>
      </div>
      {/* End Header */}
      <div>
        <form className="px-4 flex flex-col gap-5 mt-5">
          <Input label="Receiver Name" required />
          <Input label="Phone Number" required />
          <Input label="Email" />
          <Input label="Noted to delivery" />
          <h1>Add address Type</h1>
          <div className="grid grid-cols-5">
            <div className="w-14 h-14">
              <div className="shadow mx-auto p-4 rounded-full">
                <Plus className={'mx-auto'} />
              </div>
              <h3 className="text-center text-xs text-gray-600 mt-1">Other</h3>
            </div>
          </div>
          <button className="mt-4">
            <PrimaryButton text="Save Location" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
