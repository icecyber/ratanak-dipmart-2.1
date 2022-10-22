import { Input } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import LeftArrow from '../icons/LeftArrow';

const SearchLayout = (props: any) => {
  return (
    <div>
      <div className="font-bold text-base py-5 px-5 text-center bg-white shadow flex items-center">
        <Link href="/">
          <a>
            <LeftArrow className="mr-4" />
          </a>
        </Link>
        <Input
          variant="standard"
          label="Search for phone or other accessories"
        />
      </div>
    </div>
  );
};

export default SearchLayout;
