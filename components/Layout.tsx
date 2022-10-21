import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import HeartIcon from './icons/HeartIcon';
import HomeIcon from './icons/HomeIcon';
import ShoppingCart from './icons/ShoppingCart';
import SquaresIcon from './icons/SquaresIcon';
import UserProfile from './icons/UserProfile';
import TopNav from './navbar/TopNav';
import TopNavCategory from './navbar/TopNavCategory';

interface Layout {
  title: string;
  children: any;
}

const Layout = ({ title, children }: Layout) => {
  return (
    <>
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
      <div className="main-layout">
        <main className="container mx-auto">{children}</main>
      </div>
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
          <a className="nav-items">
            <ShoppingCart className="nav-icons" />
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
    </>
  );
};

export default Layout;
