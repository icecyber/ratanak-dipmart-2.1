/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import customAxios from '../../components/axios/axiosHttp';
import TopNavCategory from '../../components/navbar/TopNavCategory';
import PlusPairButton from '../../components/PlusPairButton';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import HeartIcon from '../../components/icons/HeartIcon';
import { useRouter } from 'next/router';

interface ProductDetail {
  id: string;
  name: string;
  primary_image: string;
  in_wishlist: boolean;
  pre_spec: PreSpec;
  default_price: number;
  stock: number;
  product_varraint: ProductVarraint[];
  product_spec: ProductSpec[];
  product_feature: ProductFeature[];
}

interface PreSpec {
  spec: [];
}

interface ProductVarraint {
  id: string;
  name: string;
  product_varraint_value: ProductVarraintValue[];
}

interface ProductVarraintValue {
  id: string;
  value: string;
  note: string;
}

interface ProductSpec {
  id: string;
  value: string;
  value_spec: ValueSpec[];
}

interface ValueSpec {
  id: string;
  value: string;
}

interface ProductFeature {
  id: string;
  name: string;
  image_path: string;
}

const ProductDetail = () => {
  const router = useRouter();
  const route = router.query.id;
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [isWishList, setIsWishlist] = useState(false);
  const [open, setOpen] = useState(0);
  const [CapId, setCapId] = useState('');
  const [colorId, setColorID] = useState('');

  const data = { product_id: productDetail?.id };

  // Add To Cart Body
  const AddCartBody = {
    product_id: productDetail?.id,
    selection: [CapId, colorId],
    qty: 1,
    noted: '',
  };

  // Add to Cart

  const AddTOCart = async () => {
    const req = await customAxios.post(
      '/api/method/dipmarts_app.api.addtocart',
      AddCartBody
    );
  };

  useEffect(() => {
    if (router.isReady) {
      const FetchData = async () => {
        const res = await customAxios.post(
          '/api/method/dipmarts_app.api.productdetail',
          { id: route }
        );
        const data = res.data.message;
        setProductDetail(data);
        setIsWishlist(res.data.message.in_wishlist);
      };
      FetchData();
    }
  }, [router.isReady]);

  const handleOpen = (index: number) => {
    setOpen(open === index ? -1 : index);
  };

  const AddWishList = () => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishlist(true);
  };

  const RemoveAddWishList = () => {
    customAxios.post('/api/method/dipmarts_app.api.itemtowishlist', data);
    setIsWishlist(false);
  };

  function Icon({ id, open }: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  const CapSelectHandler = (id: string, name: string) => {
    if (name === 'Colour') {
      setColorID(id);
    } else if (name === 'Capacity') {
      setCapId(id);
    }
  };

  // const ColorIDHandler = (id: string, index: number) => {
  //   console.log(id);

  //   // setColorID(id);
  // };

  if (router.isReady === true) {
    return (
      <div>
        <TopNavCategory title="Product" />
        {productDetail && (
          <>
            <div className="bg-gray-400">
              <img
                src={productDetail?.primary_image}
                alt="Product Item"
                width="100%"
                height="100%"
                className="mt-3 md:w-1/2 md:mx-auto"
              />
            </div>
            <div className="px-4 pt-4 grid gap-2">
              {/* Product Name */}
              <h1 className="text-lg font-bold">{productDetail?.name}</h1>
              {/* Price and Plus Pair */}
              <div className="flex justify-between">
                <h1 className="text-lg font-bold text-blue-800">
                  $ {productDetail?.default_price}
                </h1>
                <PlusPairButton />
              </div>
              {/* Stock */}
              <div className="text-lg flex">
                Availability : &nbsp;
                <p className="text-blue-800 font-bold">
                  {productDetail?.stock}
                </p>{' '}
                &nbsp; Products in Stock
              </div>
              {productDetail?.product_varraint.map(
                (varraint: ProductVarraint, index: number) => (
                  <div key={index}>
                    <h1 className="font-bold">{varraint.name}</h1>
                    <div className="flex mt-2">
                      {varraint.product_varraint_value.map(
                        (value: ProductVarraintValue) => (
                          <button
                            key={value.id}
                            className={`py-1 px-2 ${
                              value.id === CapId ? 'bg-blue-800' : 'bg-gray-500'
                            } rounded-lg text-white mr-2`}
                            type="button"
                            onClick={() =>
                              CapSelectHandler(value.id, varraint.name)
                            }
                            style={
                              varraint.name === 'Colour'
                                ? {
                                    backgroundColor: `${value.value}`,
                                    border: '1px solid gray',
                                    color: 'black',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '100%',
                                  }
                                : {}
                            }
                          >
                            {varraint.name === 'Colour' ? null : value.value}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
              {/* Product Description */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. A morbi
                convallis velit volutpat sit erat est. Eu malesuada amet,
                vestibulum eu. Mi, iaculis lectus nulla adipiscing sit sodales
                quam neque.
              </p>
              {/* Accordion */}
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  Product Description
                </AccordionHeader>
                <div>
                  <AccordionBody>
                    <div className="grid grid-cols-1">
                      {productDetail?.product_spec.map((spec: ProductSpec) => (
                        <div key={spec.id} className="flex justify-between">
                          {spec.value} :
                          <p className="w-[70%]">{spec.value_spec[0].value}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionBody>
                </div>
                {/* Feature */}
                <AccordionHeader onClick={() => handleOpen(1)}>
                  Feature
                </AccordionHeader>
                <div>
                  <AccordionBody>
                    <div className="grid grid-cols-2 gap-4">
                      {productDetail?.product_feature.map(
                        (feature: ProductFeature) => (
                          <div
                            key={feature.id}
                            className="bg-gray-300 rounded-lg w-[70%] py-3 mx-auto"
                          >
                            <img
                              src={feature.image_path}
                              alt={feature.name}
                              width="30"
                              height="auto"
                              className="mx-auto"
                            />
                            <h1 className="text-center font-bold pt-1">
                              {feature.name}
                            </h1>
                          </div>
                        )
                      )}
                    </div>
                  </AccordionBody>
                </div>
              </Accordion>

              {/* End Accordion */}
            </div>
            {/* Add Wishlist */}
            <div className="sticky bottom-0 flex gap-10 bg-white justify-evenly p-3 my-3 shadow-inner">
              {isWishList ? (
                <button
                  className="border border-red-800 rounded-md p-3"
                  type="button"
                  onClick={RemoveAddWishList}
                >
                  <HeartIcon fill="red" />
                </button>
              ) : (
                <button
                  className="border border-gray-500 rounded-md p-3"
                  type="button"
                  onClick={AddWishList}
                >
                  <HeartIcon />
                </button>
              )}

              <button
                className="border-2 border-blue-900 text-blue-900 rounded-md font-bold p-3 md:px-10"
                onClick={AddTOCart}
              >
                Add to Cart
              </button>
              <button className="border-2 bg-blue-900 text-white rounded-md font-bold p-3 md:px-10">
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default ProductDetail;
