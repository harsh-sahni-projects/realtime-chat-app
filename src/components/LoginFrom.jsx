import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";

import { SERVER_URL } from '../assets/constants';
import { authActions } from '../store/auth-slice';
import { userActions } from '../store/user-slice';

const LoginForm = (props) => {
  const { setSignupFormVisible } = props;
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showGuestUsers, setShowGuestUsers ] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const loginButton = useRef(null);

  useEffect(() => {
    if (usernameInput.current)
      usernameInput.current.focus();
  },[])

  const handleLogin = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const creds = { username, password };
      const endpoint = SERVER_URL + '/login';
      const res = await axios.post(endpoint, creds);
      const userDetails = res.data;
      dispatch(authActions.login());
      dispatch(userActions.setUser(userDetails));
      dispatch(userActions.setActiveFriend(null));
      navigate('/dashboard')
    } catch(err) {
      const errMsg = (err?.response?.data) ? err.response.data : err.message;
      console.log(err);
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const showSignupForm = () => {
    setSignupFormVisible(true);
  }

  const handleGuestLogin = (e) => {
    const guestUsername = e.target.dataset.value;
    const guestPassword = 'Guest@123';
    setUsername(guestUsername);
    setPassword(guestPassword);
    setTimeout(() => {
      if (loginButton.current)
        loginButton.current.click();
    },0);
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h1 className="text-4xl mb-4 font-semibold">Login</h1>

      <form className="flex flex-col" onSubmit={handleLogin}>
        {/* USERNAME */}
        <label htmlFor="username"
          className="font-bold m-2">Username</label>
        <input type="text" ref={usernameInput} id="username" value={username} placeholder="" autoComplete="off"
          onChange={e => setUsername(e.target.value.trim())}
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
        
        {/* PASSWORD */}
        <label htmlFor="password"
          className="font-bold mt-3 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder="" value={password}
          onChange={e => setPassword(e.target.value)}
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400" />
        
        {/* LOGIN */}
        <button
          className="w-96 rounded-full text-white bg-violet-800 hover:bg-violet-900 duration-200 p-3 my-4 mt-6 font-semibold"
          disabled={isLoading} ref={loginButton}
        >
          {!isLoading && <span>Login</span>} {isLoading && <HiOutlineDotsHorizontal className="inline animate-ping"/>}
        </button>
      </form>
        
      {/* OR */}
      <div className="relative flex justify-center flex-col items-center w-96">
        <div className="inline-block absolute w-full border top-3 z-0"></div>
        <div className="bg-white z-10 px-3 text-slate-400">or</div>
      </div>
      
      {/* GUEST LOGIN */}
      {!showGuestUsers && <button
        className="w-96 rounded-full text-violet-800 border-2 border-violet-800 hover:bg-violet-100 hover:text-whiteE duration-200 px-3 py-2 my-4 mt-6 font-semibold"
        disabled={isLoading}
        onClick={e => setShowGuestUsers(true)}
      >Login as guest</button>}

      {showGuestUsers &&
        <div className="w-96">
          <div className="my-4 font-semibold">Choose guest username:</div>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-slate-100 hover:bg-violet-100 duration-200 px-3 py-2 rounded-md" onClick={handleGuestLogin} data-value="Guest 1">Guest 1</button>
            <button className="bg-slate-100 hover:bg-violet-100 duration-200 px-3 py-2 rounded-md" onClick={handleGuestLogin} data-value="Guest 2">Guest 2</button>
            <button className="bg-slate-100 hover:bg-violet-100 duration-200 px-3 py-2 rounded-md" onClick={handleGuestLogin} data-value="Guest 3">Guest 3</button>
            <button className="bg-slate-100 hover:bg-violet-100 duration-200 px-3 py-2 rounded-md" onClick={handleGuestLogin} data-value="Guest 4">Guest 4</button>
            <button className="bg-slate-100 hover:bg-violet-100 duration-200 px-3 py-2 rounded-md" onClick={handleGuestLogin} data-value="Guest 5">Guest 5</button>
          </div>
          <button className="text-violet-700 mt-4" onClick={e => setShowGuestUsers(false)}><FaArrowLeftLong className="inline mr-2"/>Cancel</button>
        </div>
      }

      {/* CREATE ACCOUNT */}
      {!showGuestUsers &&
        <div className="mt-2 ml-2 w-96">
          <span
            className="font-semibold">Not registered yet?</span>
          <span onClick={showSignupForm}
            className="ml-2 font-bold text-violet-800 cursor-pointer">
            Create an Account</span>
        </div>
      }
    </div>
  )
}

export default LoginForm;