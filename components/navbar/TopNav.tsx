import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Notification from '../icons/Notification';
import Search from '../icons/Search';

const TopNav = () => {
  return (
    <div className="navbar">
      <Link href={'/'}>
        <Image
          src="https://www.dipmarts.com/wp-content/themes/dipmarts/assets/images/DiPMarts-Horizontal-Logo.png"
          alt="DiPMart Logo"
          width={170}
          height={60}
          className="navbar-logo"
          objectFit="contain"
          priority
        />
      </Link>
      <div className="navbar-items">
        <Link href="/search">
          <Search className="navbar-item" />
        </Link>
        <Link href="/notification">
          <Notification className="navbar-item" />
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
