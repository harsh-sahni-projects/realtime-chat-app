import React from 'react';
import loginImg from '../../public/login3.png'

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center bg-violet-600">
        <h1 className="text-6xl text-white font-bold mb-10">
          Chatly
        </h1>
        <img src={loginImg} className="w-[40%] h-auto object-contain"/>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="username"
            className="font-bold m-2">Username</label>
          <input type="text" id="username" placeholder="Username"
            className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
          <label htmlFor="password"
            className="font-bold mt-6 ml-2 mb-2">Password</label>
          <input type="text" id="password" placeholder="Password"
            className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400" />
          <button
            className="w-96 rounded-full text-white bg-violet-800 hover:bg-violet-900 p-3 my-4 mt-6 font-semibold">
            Login
          </button>
          <div className="mt-2 ml-2">
            <span
              className="font-semibold">Not registered yet?</span>
            <span
              className="ml-2 font-bold text-violet-800 cursor-pointer">
              Create an Account</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;