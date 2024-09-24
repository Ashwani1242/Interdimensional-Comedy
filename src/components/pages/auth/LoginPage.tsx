
import { Link, useNavigate } from "react-router-dom";
import Eye from "../../../icons/Eye";
import Google from "../../../icons/Google";
import PrimaryButton from "../../utils/PrimaryButton";
import Arrow from "../../../icons/Arrow";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { webData } from "../../../data/db";

import { BASE_URL } from '../../../../config'

type LoginInfo = {
  email: string;
  password: string;
};

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: ''
  });
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    setIsError(false);
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      setIsError(true);
      return;
    }

    const url = `${BASE_URL}/auth/login`

    axios.post(url, loginInfo)
      .then((res) => {
        setIsError(false)
        setLoginInfo({
          email: '',
          password: ''
        })

        // console.log(res.data)

        // const { success, message, jwtToken, name, email } = res.data;
        const { jwtToken, name, email } = res.data;

        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('loggedInUserEmail', email);

        navigate('/gallery')
      })
      .catch((err) => {
        console.log(err)
        alert('Unexpected Error, Try Again Later')
        setIsError(false)
      })
  }

  return (
    <div className="h-full w-full rounded-3xl bg-neutral-900 p-4 flex gap-x-4">
      <div className="flex-1 max-w-[600px] h-full w-full rounded-xl bg-neutral-900 p-20  flex flex-col justify-center /items-center">
        <div className="text-5xl uppercas font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent pb-6">
          Welcome Back!
        </div>
        <div className="flex w-full text-sm">
          <span className="block font-medium text-gray-600 dark:text-gray-200">
            Don't have an account?
          </span>
          <Link to={'/auth/signup'} className="hover:brightness-90 pl-1 text-blue-300 cursor-none hover:text-blue-400 transition-all duration-500 hover:-translate-y-[2px]">
            Sign Up
          </Link>
        </div>
        <form onSubmit={e => handleLogin(e)} action="login" className="gap-y-6 flex flex-col pt-12">
          {isError ? <span className="text-red-300">All fields are required!</span> : ''}
          <div className="rounded-sm bg-neutral-950 h-14 p-[1px] text-neutral-200 focus-within:text-neutral-900 transition-all duration-500 focus-within:bg-white">
            <input
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-full p-4 outline-none bg-transparent"
              type="email"
              name="email"
              autoComplete="email"
              value={loginInfo.email}
            />
          </div>
          <div className="rounded-sm bg-neutral-950 h-14 p-[1px] text-neutral-200 focus-within:text-neutral-900 transition-all duration-500 focus-within:bg-white flex justify-center items-center pr-4 gap-x-4">
            <input
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-full p-4 outline-none bg-transparent"
              type="password"
              name="password"
              autoComplete="password"
              value={loginInfo.password}
            />
            <Eye />
          </div>

          <div className="flex gap-x-4 text-sm items-center">
            <input
              type="checkbox"
              className="w-5 h-5"
            />
            <label> Remember Me </label>
          </div>

          <button type="submit">
            <PrimaryButton
              label="Login"
              customClass="h-12 flex justify-center items-center m-1"
            />
          </button>
        </form>
        <div className="flex items-center justify-between w-full mt-8 mb-8">
          <span className="h-[0.5px] border-b border-gray-500 w-full mx-2"></span>
          <span className="text-xs text-center text-gray-500 text-nowrap dark:text-gray-400">
            or login with
          </span>
          <span className="h-[0.5px] border-b border-gray-500 w-full mx-2"></span>
        </div>

        <div className="w-full">
          <div className="hover:brightness-110 flex items-center justify-center text-gray-400 transition-all duration-500 transform border border-gray-400 rounded-sm hover:bg-gray-200 hover:text-black">
            <Google />
            <span className="pr-4 pl-2 py-3 font-bold text-center">
              Google
            </span>
          </div>
        </div>
      </div>

      <div className="h-full w-full rounded-xl flex-1 relative">
        <Link to={'/'} className="absolute top-4 left-8 z-10"><Arrow title="Back to Homepage" /></Link>
        <div
          style={{ backgroundImage: `url(${webData.top[1].imageUrl})` }}
          className="flex-1 h-full w-full rounded-xl bg-no-repeat bg-cover filter brightness-[.6]"
        ></div>
        {/* <div className="absolute top-0 left-0 w-20 h-32 bg-neutral-900"></div> */}
      </div>
    </div>
  );
}

export default LoginPage;
