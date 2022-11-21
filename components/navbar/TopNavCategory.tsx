import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/cartSlice';
import LeftArrow from '../icons/LeftArrow';
import ShoppingCart from '../icons/ShoppingCart';

interface layout {
  title: string;
}

const TopNavCategory = ({ title }: layout) => {
  const cart: State = useSelector((state: any) => state.cart);

  return (
    <div className="py-5 text-center bg-white shadow flex justify-between px-2 items-center ">
      <button onClick={() => router.back()}>
        <LeftArrow />
      </button>
      <div>{title}</div>
      <div className="relative">
        <Link href="/cart">
         <div>
         <ShoppingCart className="nav-icons" />
          {cart.badge > 0 ? (
            <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] bg-red-800 text-white font-bold p-1 rounded-full ">
              {cart.badge}
            </div>
          ) : null}
         </div>
        </Link>
      </div>
    </div>
  );
};

export default TopNavCategory;
