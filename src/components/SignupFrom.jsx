import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosCheckboxOutline  } from "react-icons/io";
import { SERVER_URL } from '../assets/constants';


const SignupForm = (props) => {
  const { setSignupFormVisible } = props;
  const navigate = useNavigate();
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
  let passwordValidityMsgStyles = "text-[0.95rem] ml-2 mt-2  " + ((password.length >= 8) ? 'text-green-500' : 'text-slate-300');

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
      if (res.status == 200) {
        // navigate('/dashboard');
        alert(res.data);
      }
    } catch (err) {
      const errMsg = (err?.response?.data) ? err.response.data : err.message;
      console.log(err);
      alert(errMsg);
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
        <span className={passwordValidityMsgStyles}><IoIosCheckboxOutline className="inline mb-1" /> Min 8 characters</span>
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

export default SignupForm;