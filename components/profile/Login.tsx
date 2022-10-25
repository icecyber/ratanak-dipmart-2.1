import { Input } from '@material-tailwind/react/components/Input';
import Link from 'next/link';
import React from 'react';
import PrimaryButton from '../button/PrimaryButton';

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="px-4 mt-5">
      <div className="grid grid-rows-2 gap-5">
        <Input label="(+855) Phone Number" type={'number'} />
        <Input label="Password" />
      </div>
      <div className="mt-14 pb-6">
        <Link href="/">
          <a className="line-through text-sm text-blue-500 ">
            Forgot password?
          </a>
        </Link>
      </div>
      <div className="pb-5">
        <PrimaryButton text={'Login'}></PrimaryButton>
      </div>
    </div>
  );
};

export default Login;
