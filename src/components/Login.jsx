import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { SERVER_URL } from '../assets/constants';
import { authActions } from '../store/auth-slice';
import { userActions } from '../store/user-slice';
import loginImg from '/login3.png'
import LoginForm from './LoginFrom';
import SignupForm from './SignupFrom';

const Login = () => {
  const [signupFormVisible, setSignupFormVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    async function checkToken() {
      if (!user) return;
      
      dispatch(authActions.logout());
      dispatch(userActions.setUser(null));
      const endpoint = SERVER_URL + '/check-token'; 
      const res = await axios.post(endpoint);
      const userDetails = res.data;
      dispatch(authActions.login());
      dispatch(userActions.setUser(userDetails));
      navigate('/dashboard');
    }

    try {
      checkToken();
    } catch (err) {
      console.log(err);
    }
  }, [])
  
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