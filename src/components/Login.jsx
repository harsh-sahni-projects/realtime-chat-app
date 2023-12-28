import React from 'react';
import { useState } from 'react';
import loginImg from '/login3.png'
import LoginForm from './LoginFrom';
import SignupForm from './SignupFrom';

const Login = () => {
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