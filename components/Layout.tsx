import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBadge, initialBadge } from '../redux/cartSlice';
import customAxios from './axios/axiosHttp';
import HeartIcon from './icons/HeartIcon';
import HomeIcon from './icons/HomeIcon';
import ShoppingCart from './icons/ShoppingCart';
import SquaresIcon from './icons/SquaresIcon';
import UserProfile from './icons/UserProfile';
import TopNav from './navbar/TopNav';
import TopNavCategory from './navbar/TopNavCategory';

interface Layout {
  title: any;
  children: any;
  cart?: any;
}

const Layout = ({ title, children }: Layout) => {
  const cart = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBadge = async () => {
      const res = await customAxios.get(
        '/api/method/dipmarts_app.api.cartlist'
      );
      const qty = res.data.message.reduce(
        (prev: any, current: any) => prev + current.qty,
        0
      );

      dispatch(initialBadge(qty));
    };
    fetchBadge();
  }, []);

  return (
    <div className="main-layout h-screen">
      <Head>
        <title>
          {title === 'DipMarts'
            ? title +
              ' - The Trusted E-Commerce Marketplace Platform In Cambodia'
            : title +
              ' The Trusted E-Commerce Marketplace Platform In Cambodia'}
        </title>
        <meta
          name="DiPMart"
          content="The Trusted E-Commerce Marketplace Platform In Cambodia"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navbar */}
      {title === 'DipMarts' ? <TopNav /> : <TopNavCategory title={title} />}

      <main className="container mx-auto mb-auto">{children}</main>

      <footer className="footer">
        <Link href="/">
          <a className="nav-items">
            <HomeIcon className="nav-icons" />
          </a>
        </Link>
        <Link href="/category">
          <a className="nav-items">
            <SquaresIcon className="nav-icons" />
          </a>
        </Link>
        <Link href="/cart">
          <a className="nav-items relative">
            <ShoppingCart className="nav-icons" />
            {cart.badge > 0 ? (
              <div className="absolute top-2 -right-1 w-4 h-4 flex items-center justify-center text-[10px] bg-red-800 text-white font-bold p-1 rounded-full ">
                {cart.badge}
              </div>
            ) : null}
          </a>
        </Link>
        <Link href="/wishlist">
          <a className="nav-items">
            <HeartIcon className="nav-icons" />
          </a>
        </Link>
        <Link href="/profile">
          <a className="nav-items">
            <UserProfile className="nav-icons" />
          </a>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
