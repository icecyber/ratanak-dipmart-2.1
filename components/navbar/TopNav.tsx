/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Notification from '../icons/Notification';
import Search from '../icons/Search';

const TopNav = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <a>
          <img
            src="https://www.dipmarts.com/wp-content/themes/dipmarts/assets/images/DiPMart-Horizontal-Logo.png"
            alt="DiPMart Logo"
            width={142}
            height={54}
            className="navbar-logo"
          />
        </a>
      </Link>
      <div className="navbar-items">
        <Link href="/">
          <a>
            <Search className="navbar-item" />
          </a>
        </Link>
        <Link href="/notification">
          <a>
            <Notification className="navbar-item" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
