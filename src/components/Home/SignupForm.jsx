import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosCheckboxOutline  } from "react-icons/io";
import { SERVER_URL } from "../../assets/constants"
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { authActions } from "../../store/auth-slice";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FORM_NAMES } from "../../lib/index";


const SignupForm = ({ showThisForm }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  let errorClass = 'border-red-400';
  let inputFiledStyles = "sm:w-96 outline-none px-4 py-2 rounded-full focus:border-violet-400 border-2";

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  let usernameStyles = inputFiledStyles + (!isUsernameValid ? errorClass : '');
  let passwordStyes = inputFiledStyles + (!isPasswordValid ? errorClass : '');
  let confirmPasswordStyles = inputFiledStyles + (!isConfirmPasswordValid ? errorClass : '');
  let passwordValidityMsgStyles = "text-[0.95rem] ml-2 mt-2  " + ((password.length >= 8) ? 'sm:text-green-500 text-green-600' : 'sm:text-slate-300 text-violet-200 ');

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
      setIsLoading(true);
  
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
        dispatch(userActions.setUser(res.data));
        dispatch(authActions.login());
        navigate('/dashboard');
        // alert(res.data);
      }
    } catch (err) {
      const errMsg = (err?.response?.data) ? err.response.data : err.message;
      console.log(err);
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="sm:w-1/2 grow flex flex-col justify-center items-center bg-white rounded-t-3xl">
      <h1 className="text-4xl mb-4 font-semibold">Signup</h1>
      <form className="sm:w-96 w-4/5 flex flex-col self-center" onSubmit={handleSignup}>
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
          className={`sm:w-96 rounded-full text-white  p-3 my-4 mt-6 font-semibold duration-300
            ${isLoading ? "bg-slate-300" : "bg-violet-800 hover:bg-violet-900"}`}
          disabled={isLoading}>
          {!isLoading ? "Create Account" : <HiOutlineDotsHorizontal className="inline animate-ping"/>}
        </button>
        <div className="mt-2 ml-2">
          <span onClick={() => showThisForm(FORM_NAMES.LOGIN_FORM)}
            className="ml-2 font-bold text-violet-800 cursor-pointer">
            <FaArrowLeftLong className="inline"/> Back to Login</span>
        </div>
      </form>
    </div>
  )
}

SignupForm.propTypes = {
  showThisForm: Function
}

export default SignupForm;