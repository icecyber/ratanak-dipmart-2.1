import { Input } from '@material-tailwind/react';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import customAxios from './axios/axiosHttp';
import PrimaryButton from './button/PrimaryButton';
import CheckCircle from './icons/CheckCircle';

interface userProfile {
  account_id: string;
  avatar: string;
  birthday: string;
  country_code: any;
  email: string;
  fullname: string;
  gender: string;
  phone_number: string;
}

interface AuthFormProps {
  closeForm: () => void;
}

const AuthForm = ({ closeForm }: AuthFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<userProfile>();
  const [switchPage, setSwitchPage] = useState('login');
  const [isModal, setIsModal] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const [phoneNumberSignUp, setPhoneNumberSignUp] = useState('');
  const [isError, setIsError] = useState(false);
  const [isOtpVerify, setIsOtpVerify] = useState(false);

  const [otp1, setOpt1] = useState<any>();
  const [otp2, setOpt2] = useState();
  const [otp3, setOpt3] = useState();
  const [otp4, setOpt4] = useState();
  const [otp5, setOpt5] = useState();
  const [otp6, setOpt6] = useState();
  let verifyOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

  const handleInputSignUp = (e: any) => {
    setPhoneNumberSignUp(e.target.value);
    setIsError(false);
  };

  const getOTPHandler = async (e: any) => {
    e.preventDefault();
    if (phoneNumberSignUp.length > 8) {
      const getOTP = await customAxios.post(
        '/api/method/dipmarts_app.api.getotp',
        { phone: `+855${phoneNumberSignUp.substring(1)}` }
      );
      setIsError(false);
      setIsVerify(true);
    } else {
      setIsError(true);
      return;
    }
  };

  const LoginHandler = async (e: any) => {
    e.preventDefault();
    login();
  };

  const SignupHandler = async (e: any) => {
    e.preventDefault();
    const res = await customAxios.post('/api/method/dipmarts_app.api.signup', {
      username: `+855${phoneNumberSignUp.substring(1)}`,
      password: password,
    });
    if (res.status === 200) {
      setIsModal(true);
    } else {
      setWrongUser(true);
      setPassword('');
    }
  };

  const login = async () => {
    const headers = { Authorization: loginToken };
    const loginData = {
      username: `+855${username.substring(1)}`,
      password: password,
    };
    const baseURL = 'https://dev.dipmarts.com';
    const loginRes = await customAxios.post(
      '/api/method/dipmarts_app.api.login',
      loginData,
      {
        headers,
        baseURL,
      }
    );
    console.log(loginRes);

    if (loginRes?.status === 404) {
      setWrongUser(true);
      return;
    }

    const tokenAfterLogin = `Token ${loginRes?.data?.message.api_key}:${loginRes?.data?.message.api_secret}`;
    setToLocalStorageAfterLogin(tokenAfterLogin);
    getUserDetailAfterLogIn(tokenAfterLogin);
    setIsModal(false);
    setWrongUser(false);
    router.push('/cart/address');
  };

  const getGuestUser = async () => {
    const res = await (
      await customAxios.get('/api/method/dipmarts_app.api.generate_guest')
    )?.data;
    const token = `Token ${res.message.api_key}:${res.message.api_secret}`;
    setLoginToken(token);
  };

  const setToLocalStorageAfterLogin = (token: string) => {
    localStorage.setItem('Authorization', token);
  };

  const getUserDetailAfterLogIn = async (token: string) => {
    const headers = { Authorization: token };
    const res = await customAxios.get(
      '/api/method/dipmarts_app.api.userprofile',
      { headers }
    );
    setUserProfile(res?.data?.message);
  };

  useEffect(() => {
    fetchUserDetail();
    getGuestUser();
  }, []);

  const fetchUserDetail = async () => {
    const res = await customAxios.get(
      '/api/method/dipmarts_app.api.userprofile'
    );
    setUserProfile(res?.data?.message);
  };

  const LogoutHandler = () => {
    localStorage.removeItem('Authorization');
    setUserProfile({
      account_id: '',
      avatar: '',
      birthday: '',
      country_code: '',
      email: '',
      fullname: '',
      gender: '',
      phone_number: '',
    });
  };

  const closePopUp = () => {
    closeForm();
    setIsModal(false);
  };

  const tabChange = function (val: any) {
    let ele = document.querySelectorAll('input');
    if (ele[val - 1].value != '') {
      if (val !== 6) {
        ele[val].focus();
      }
    } else if (ele[val - 1].value == '') {
      if (val !== 1) {
        ele[val - 2].focus();
      }
    }
  };

  const OTPInput = async (e: any) => {
    e.preventDefault();
    const res = await customAxios.post(
      '/api/method/dipmarts_app.api.validotp',
      { phone: `+855${phoneNumberSignUp.substring(1)}`, otp: verifyOTP }
    );
    if (res.status === 200) {
      setIsOtpVerify(true);
    } else {
      setIsVerify(false);
    }
  };

  return (
    <>
      <div
        className="bg-black bg-transparent bg-opacity-50 w-full absolute top-0 h-[100%]"
        onClick={() => closePopUp()}
      ></div>
      <div>
        <div className=" bg-white rounded-t-2xl  absolute bottom-0 w-full z-50">
          <div className="grid grid-cols-2 border-b-2">
            <div
              className={
                switchPage === 'signup'
                  ? 'text-base py-3 text-center border-b-2 border-b-blue-800'
                  : 'text-base py-3 text-center'
              }
              onClick={() => setSwitchPage('signup')}
            >
              Sign Up
            </div>
            <div
              className={
                switchPage === 'login'
                  ? 'text-base py-3 text-center border-b-2 border-b-blue-800'
                  : 'text-base py-3 text-center'
              }
              onClick={() => setSwitchPage('login')}
            >
              Login
            </div>
          </div>
          {switchPage === 'login' ? (
            <div className="px-4 mt-5">
              <form onSubmit={LoginHandler}>
                <div className="grid grid-rows-2 gap-5">
                  <Input
                    label="(+855) Phone Number*"
                    type={'number'}
                    onChange={(e) => setUsername(e.target.value)}
                    error={wrongUser}
                    onClick={() => setWrongUser(false)}
                  />
                  <Input
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    error={wrongUser}
                    onClick={() => setWrongUser(false)}
                  />
                </div>
                <div className="mt-14 pb-6 line-through text-sm text-blue-500 ">
                  <Link href="/">Forgot password?</Link>
                </div>
                <button className="pb-5 w-full" type="submit">
                  <PrimaryButton text={'Login'}></PrimaryButton>
                </button>
              </form>
            </div>
          ) : isVerify ? (
            isOtpVerify ? (
              <div className="px-4 mt-5">
                <form onSubmit={SignupHandler}>
                  <div className="my-4">
                    <Input
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      error={wrongUser}
                      value={password}
                      onClick={() => setWrongUser(false)}
                    />
                  </div>
                  <ul className="my-4 text-xs">
                    <li>Must have 5-18 characters</li>
                    <li>Must have at least 1 number & 1 letter</li>
                    <li>Must not have spaces</li>
                  </ul>
                  <button className="pb-5 w-full" type="submit">
                    <PrimaryButton text="Countinue"></PrimaryButton>
                  </button>
                </form>
              </div>
            ) : (
              <form
                className="max-w-sm mx-auto md:max-w-lg"
                onSubmit={OTPInput}
              >
                <div className="w-full">
                  <div className="bg-white h-64 py-3 rounded text-center">
                    <h1 className="text-2xl font-bold">Phone Verifcation</h1>
                    <div className="flex flex-col mt-4">
                      <span>Enter code sent to your phone</span>
                    </div>
                    <div
                      id="otp"
                      className="flex flex-row justify-center text-center px-2 mt-5"
                    >
                      <input
                        className="m-2 border-b border-black h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="first"
                        maxLength={1}
                        onKeyUp={() => tabChange(1)}
                        onChange={(e: any) => setOpt1(e.target.value)}
                      />
                      <input
                        className="m-2 border-b border-black h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="second"
                        maxLength={1}
                        onKeyUp={() => tabChange(2)}
                        onChange={(e: any) => setOpt2(e.target.value)}
                      />
                      <input
                        className="m-2 border-b border-black h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="third"
                        maxLength={1}
                        onKeyUp={() => tabChange(3)}
                        onChange={(e: any) => setOpt3(e.target.value)}
                      />
                      <input
                        className="m-2 border-b border-black h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="fourth"
                        maxLength={1}
                        onKeyUp={() => tabChange(4)}
                        onChange={(e: any) => setOpt4(e.target.value)}
                      />
                      <input
                        className="m-2 border-b border-black h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="fifth"
                        maxLength={1}
                        onKeyUp={() => tabChange(5)}
                        onChange={(e: any) => setOpt5(e.target.value)}
                      />
                      <input
                        className="m-2 border-b border-black h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="sixth"
                        maxLength={1}
                        onKeyUp={() => tabChange(6)}
                        onChange={(e: any) => setOpt6(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center text-center mt-5">
                      <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                        <span className="font-bold">Resend OTP</span>
                        <i className="bx bx-caret-right ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                <button className="w-full" type="submit">
                  <PrimaryButton text="Verify"></PrimaryButton>
                </button>
              </form>
            )
          ) : (
            <form className="px-4 mt-5" onSubmit={getOTPHandler}>
              <div className="grid grid-rows-3 ">
                <h1 className="font-bold">Register with Phone Number</h1>
                <p className="text-xs text-gray-600">
                  Please enter your phone number to continue
                </p>
                <Input
                  label="(+855) Phone Number"
                  type={'number'}
                  required
                  onChange={handleInputSignUp}
                  error={isError}
                />
              </div>
              <button className="py-5 w-full" type="submit">
                <PrimaryButton text={'Countinue'}></PrimaryButton>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
