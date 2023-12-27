import React from 'react';
import { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { SERVER_URL } from '../assets/constants';
import loginImg from '/login3.png'
import axios from 'axios';


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
  const { setSignupFormVisible } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let errorClass = 'border-red-400';
  let inputFiledStyles = "outline-none px-4 py-2 rounded-full w-96 focus:border-violet-400 border-2 ";

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);


  let usernameStyles = inputFiledStyles + (!isUsernameValid ? errorClass : '');
  let passwordStyes = inputFiledStyles + (!isPasswordValid ? errorClass : '');
  let confirmPasswordStyles = inputFiledStyles + (!isConfirmPasswordValid ? errorClass : '');

  const validateForm = () => {
    let isFormValid = (username.trim().length > 0)
                   && (password.length >= 8)
                   && (confirmPassword === password);
    if (!isFormValid) {
      if (!(username.trim().length > 0)) {
        setIsUsernameValid(false);
        alert('Username can\'t be empty');
      } else {
        setIsUsernameValid(true);
      }
      if (!(password.length >= 8)) {
        setIsPasswordValid(false);
        alert('Password must be at least 8 characters long')
      } else {
        setIsPasswordValid(true);
      }
      if (!(confirmPassword === password)) {
        setIsConfirmPasswordValid(false);
        alert('Confirm password didn\'t match');
      } else {
        setIsConfirmPasswordValid(true);
      }
      return false;
    }
    setIsUsernameValid(true);
    setIsPasswordValid(true);
    setIsConfirmPasswordValid(true);
    return true;
  }

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
  
      const isFormValid = validateForm();
      if (!isFormValid) return;
      
      const payload = {
        username,
        password,
        confirmPassword
      }
      const endpoint = SERVER_URL + '/create-new-account';
      const res = await axios.post(endpoint, payload);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
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
        <input type="text" id="username" placeholder="" autoComplete="off" required
          onChange={e => setUsername(e.target.value.trim())}
          className={usernameStyles}/>
        <label htmlFor="password"
          className="font-bold mt-6 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder="" required
          onChange={e => setPassword(e.target.value.trim())}
          className={passwordStyes}/>
        <label htmlFor="confirmPassword"
          className="font-bold mt-6 ml-2 mb-2">Confirm Password</label>
        <input type="password" id="confirmPassword" required
          onChange={e => setConfirmPassword(e.target.value.trim())}
          className={confirmPasswordStyles} />
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