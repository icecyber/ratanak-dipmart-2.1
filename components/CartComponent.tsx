import React from 'react';
import Close from './icons/Close';
import PlusPairButton from './PlusPairButton';

const CartComponent = (product) => {
  return (
    <div className="flex py-4 mt-4 border-y-2 justify-between">
      <img
        src={product.selection_image}
        alt={product.product.name}
        width={100}
      />
      {/* Info */}
      <div className="text-sm grid grid-rows-4 gap-2">
        <h1 className="font-bold">{product.product.name}</h1>
        <div className="flex">
          <div className="text-gray-500">
            Qty: <span className="text-black">1</span>
          </div>
          <div className="text-gray-500 ml-1">
            Capacity : <span className="text-black">256GB</span>
          </div>
        </div>
        <div>Red</div>
        <div>$1,199.00</div>
      </div>
      {/* End Into */}
      <div className="flex flex-col justify-between items-end">
        <Close className={'text-blue-900 w-[30px] h-[30px]'} />
        <PlusPairButton />
      </div>
    </div>
  );
};

export default CartComponent;
