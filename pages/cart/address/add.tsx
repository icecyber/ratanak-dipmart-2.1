import router from 'next/router';
import React, { useEffect, useState } from 'react';
import LeftArrow from '../../../components/icons/LeftArrow';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Input } from '@material-tailwind/react';
import PrimaryButton from '../../../components/button/PrimaryButton';
import Plus from '../../../components/icons/Plus';
import customAxios from '../../../components/axios/axiosHttp';

const AddAddress = () => {
  const [address, setAddress] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const addAddressHandler = (e: any) => {
    e.preventDefault();
    const datas = {
      label: 'home',
      description: note,
      address: address,
      contact_name: receiverName,
      contact_number: phone,
      contact_email: email,
      latitude: '',
      longitude: '',
      is_default: 1,
      is_active: 1,
    };
    customAxios.post('/api/method/dipmarts_app.api.addaddress', datas);
    router.back();
  };

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
        <form
          className="px-4 flex flex-col gap-5 mt-5"
          onSubmit={addAddressHandler}
        >
          <Input label="Address" onChange={(e) => setAddress(e.target.value)} />
          <Input
            label="Receiver Name"
            required
            onChange={(e) => setReceiverName(e.target.value)}
          />
          <Input
            label="Phone Number"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Noted to delivery"
            onChange={(e) => setNote(e.target.value)}
          />
          <h1>Add address Type</h1>
          <div className="grid grid-cols-5">
            <div className="w-14 h-14">
              <div className="shadow mx-auto p-4 rounded-full">
                <Plus className={'mx-auto'} />
              </div>
              <h3 className="text-center text-xs text-gray-600 mt-1">Other</h3>
            </div>
          </div>
          <button className="mt-4" type="submit">
            <PrimaryButton text="Save Location" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
