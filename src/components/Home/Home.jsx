import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SERVER_URL } from '../../assets/constants';
import { authActions } from '../../store/auth-slice';
import { userActions } from '../../store/user-slice';
import { FORM_NAMES } from "../../lib/index.js";
import loginImg from '/login3.png'
import chatlyIcon from '/title-icon-32.png';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import GuestLoginForm from './GuestLoginForm.jsx';

const Home = () => {
  const [showThisForm, setShowThisForm] = useState(FORM_NAMES.LOGIN_FORM);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const year = (new Date()).getFullYear();

  const handleLogin = async (e = null, username, password) => {
    try {
      e ? e.preventDefault() : "";
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
      return errMsg; // return for "GuestLoginForm"
    } 
  }

  useEffect(() => {
    async function checkToken() {
      console.log("user:", user);
      if (!user) return;
      console.log("... Running check token again, use IS present");
      
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
  }, []);
  
  return (
    // LEFT SECTION
    <div className="sm:flex-row sm:h-screen sm:bg-white sm:from-white sm:to-white
                    flex flex-col w-full h-[90vh]  bg-violet-600 bg-gradient-to-b_ from-violet-700 to-white
                     ">
      <section className="sm:w-1/2 sm:flex-col sm:h-full
                    h-auto flex
                    items-center justify-center bg-violet-600">
        <h1 className="sm:text-6xl sm:mb-10 sm:block
                       text-4xl my-3 flex items-center
                    text-white font-bold font-dancingScript">
          <img src={chatlyIcon} className="inline sm:hidden mr-2"/> Chatly
        </h1>
        <img src={loginImg} className="sm:block hidden w-[40%] h-auto object-contain"/>

        {/* Copyright, Developer, Version */}
        <div className="sm:w-1/2 sm:px-8 sm:text-violet-100
                        w-full px-4 text-violet-800
                        absolute bottom-2
                        flex justify-between items-center">
          <div className="sm:block hidden">
            © 2024. All rights reserved
          </div>
          <div>
            Developed By - <span className="text-2xl font-bold">Harsh</span>
          </div>
        </div>
      </section>

      {showThisForm == FORM_NAMES.LOGIN_FORM && <LoginForm showThisForm={setShowThisForm} handleLogin={handleLogin}/>}
      {showThisForm == FORM_NAMES.SIGNUP_FORM && <SignupForm showThisForm={setShowThisForm} />}
      {showThisForm == FORM_NAMES.GUEST_LOGIN_FORM && <GuestLoginForm showThisForm={setShowThisForm} handleLogin={handleLogin}/>}
    </div>
  )
}

export default Home;