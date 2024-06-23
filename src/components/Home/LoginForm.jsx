import { useState, useRef, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FORM_NAMES } from '../../lib';

const LoginForm = ({ showThisForm, handleLogin }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const usernameInput = useRef(null);
  const loginButton = useRef(null);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    await handleLogin(e, username, password);
    setIsLoading(false);
  }

  useEffect(() => {
    if (usernameInput.current)
      usernameInput.current.focus();
  },[]);

  return (
    <div className="sm:w-1/2 sm:grow sm:rounded-none
                    w-full h-full rounded-t-3xl
                    flex flex-col justify-center items-center  bg-white">
      <h1 className="text-4xl mb-4 font-semibold">Login</h1>

      <form className="sm:w-96
                      w-4/5
                      flex flex-col" onSubmit={handleSubmit}>
        {/* USERNAME */}
        <label htmlFor="username"
          className="font-bold m-2">Username</label>
        <input type="text" ref={usernameInput} id="username" value={username} placeholder="" autoComplete="off"
          onChange={e => setUsername(e.target.value.trim())}
          className="outline-none border-2 px-4 py-2 rounded-full  focus:border-violet-400"/>
        
        {/* PASSWORD */}
        <label htmlFor="password"
          className="font-bold mt-3 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder="" value={password}
          onChange={e => setPassword(e.target.value)}
          className="outline-none border-2 px-4 py-2 rounded-full focus:border-violet-400" />
        
        {/* LOGIN */}
        <button
          className="rounded-full text-white bg-violet-800 hover:bg-violet-900 duration-200 p-3 my-4 mt-6 font-semibold"
          disabled={isLoading} ref={loginButton}
        >
          {!isLoading && <span>Login</span>} {isLoading && <HiOutlineDotsHorizontal className="inline animate-ping"/>}
        </button>
      </form>
        
      {/* OR */}
      <div className="sm:w-96 w-4/5 relative flex justify-center flex-col items-center ">
        <div className="inline-block absolute w-full border top-3 z-0"></div>
        <div className="bg-white z-10 px-3 text-slate-400">or</div>
      </div>
      
      {/* GUEST LOGIN */}
      <button
        className="sm:w-96 w-4/5 rounded-full text-violet-800 border-2 border-violet-800 hover:bg-violet-100 hover:text-whiteE duration-200 px-3 py-2 my-4 mt-6 font-semibold"
        disabled={isLoading}
        onClick={() => showThisForm(FORM_NAMES.GUEST_LOGIN_FORM)}
      >Login as guest</button>

      {/* CREATE ACCOUNT */}
      <div className="sm:w-96 w-4/5 mt-2 ml-2 ">
        <span
          className="font-semibold">Not registered yet?</span>
        <span onClick={() => showThisForm(FORM_NAMES.SIGNUP_FORM)}
          className="ml-2 font-bold text-violet-800 cursor-pointer">
          Create an Account</span>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  showThisForm: Function,
  handleLogin: Function
}

export default LoginForm;