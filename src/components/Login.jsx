import React from 'react';
import { useState } from 'react';
import loginImg from '../../public/login3.png'
import { FaArrowLeftLong } from "react-icons/fa6";

const LoginForm = (props) => {
  const { setSignupFormVisible } = props;

  const handleLogin = (e) => {
    e.preventDefault();
  }
  const showSignupForm = () => {
    setSignupFormVisible(true);
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h1 className="text-4xl mb-4 font-semibold">Login</h1>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="username"
          className="font-bold m-2">Username</label>
        <input type="text" id="username" placeholder="" autoComplete="off"
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
        <label htmlFor="password"
          className="font-bold mt-6 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder=""
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400" />
        <button
          className="w-96 rounded-full text-white bg-violet-800 hover:bg-violet-900 p-3 my-4 mt-6 font-semibold">
          Login
        </button>
        <div className="mt-2 ml-2">
          <span
            className="font-semibold">Not registered yet?</span>
          <span onClick={showSignupForm}
            className="ml-2 font-bold text-violet-800 cursor-pointer">
            Create an Account</span>
        </div>
      </form>
    </div>
  )
}

const SignupForm = (props) => {
  const { setSignupFormVisible } = props
  const handleSignup = (e) => {
    e.preventDefault();
  }
  const hideSignupForm = () => {
    setSignupFormVisible(false);
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h1 className="text-4xl mb-4 font-semibold">Signup</h1>
      <form className="flex flex-col" onSubmit={handleSignup}>
        <label htmlFor="username"
          className="font-bold m-2">Username</label>
        <input type="text" id="username" placeholder="" autoComplete="off"
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
        <label htmlFor="password"
          className="font-bold mt-6 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder=""
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
        <label htmlFor="confirmPassword"
          className="font-bold mt-6 ml-2 mb-2">Confirm Password</label>
        <input type="password" id="confirmPassword"
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400" />
        <button
          className="w-96 rounded-full text-white bg-violet-800 hover:bg-violet-900 p-3 my-4 mt-6 font-semibold">
          Create Account
        </button>
        <div className="mt-2 ml-2">
          <span onClick={hideSignupForm}
            className="ml-2 font-bold text-violet-800 cursor-pointer">
            <FaArrowLeftLong className="inline"/> Back to Login</span>
        </div>
      </form>
    </div>
  )
}


const Login = (props) => {
  const [signupFormVisible, setSignupFormVisible] = useState(false);
  
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center bg-violet-600">
        <h1 className="text-6xl text-white font-bold mb-10">
          Chatly
        </h1>
        <img src={loginImg} className="w-[40%] h-auto object-contain"/>
      </div>
      {signupFormVisible
        ? <SignupForm setSignupFormVisible={setSignupFormVisible}/>
        : <LoginForm setSignupFormVisible={setSignupFormVisible}/>
      }
    </div>
  )
}

export default Login;