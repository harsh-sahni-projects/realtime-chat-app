import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../assets/constants';

const LoginForm = (props) => {
  const { setSignupFormVisible } = props;
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const creds = { username, password };
      const endpoint = SERVER_URL + '/login';
      const res = await axios.post(endpoint, creds);
      navigate('/dashboard')
    } catch(err) {
      const errMsg = (err?.response?.data) ? err.response.data : err.message;
      console.log(err);
      alert(errMsg);
    }
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
          onChange={e => setUsername(e.target.value.trim().toLocaleLowerCase())}
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
        <label htmlFor="password"
          className="font-bold mt-6 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder=""
          onChange={e => setPassword(e.target.value)}
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

export default LoginForm;