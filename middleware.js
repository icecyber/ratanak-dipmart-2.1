import { NextResponse } from 'next/server';

export default function middleware(req) {
  let verify = req.localStorage.get('AccountID');
  let url = req.url;

  if (verify.value === '' && url.includes('/cart/address')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
  if (verify.value === '' && url.includes('/cart/addnewaddress')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
  if (verify.value === '' && url.includes('/cart/payment')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
  if (verify.value === '' && url.includes('/cart')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
  if (verify.value === '' && url.includes('/orderdetails/:path*')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
  if (verify.value === '' && url.includes('/profile/editprofile')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
  if (verify.value === '' && url.includes('/profile/avatar')) {
    return NextResponse.redirect('https://ratanak-dipmart.vercel.app/');
  }
}
