import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Notification from '../icons/Notification';
import Search from '../icons/Search';

const TopNav = () => {
  return (
    <div className="navbar">
      <Link href={'/'}>
        <div>
          <Image
            src="https://www.dipmarts.com/wp-content/themes/dipmarts/assets/images/DiPMarts-Horizontal-Logo.png"
            alt="DiPMart Logo"
            width={170}
            height={60}
            className="navbar-logo"
            objectFit="contain"
            priority
          />
        </div>
      </Link>
      <div className="navbar-items">
        <Link href="/search">
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
