import { useState } from "react";
import { FORM_NAMES } from "../../lib";
import { FaArrowLeftLong } from "react-icons/fa6";

const GuestLoginForm = ({ showThisForm, handleLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGuestLogin = async (e) => {
    const guestUsername = e.target.dataset.value;
    const guestPassword = 'Guest@123';
    setIsLoading(true);
    await handleLogin(e, guestUsername, guestPassword);
    setIsLoading(false);
  }
  
  return (
    <div className="sm:w-1/2 sm:grow sm:rounded-none
                    w-full h-full rounded-t-3xl
                    flex flex-col gap-4 justify-center items-center  bg-white">
      <h1 className="text-2xl my-2 font-semibold">Login as:</h1>
      <div className="flex gap-3">
        {[1,2,3,4,5].map((num,i) => 
          (
            <button
              key={i}
              disabled={isLoading}
              onClick={handleGuestLogin}
              data-value={`Guest ${num}`}
              className="bg-slate-100 px-3 py-2 rounded-md
                         hover:bg-violet-600 hover:text-white
                         disabled:text-slate-400 disabled:cursor-wait 
                         disabled:hover:bg-slate-100"
              >
              Guest {num}
            </button>
          )
        )}
      </div>
      <button className="text-violet-700 mt-2" onClick={() => showThisForm(FORM_NAMES.LOGIN_FORM)}>
        <FaArrowLeftLong className="inline mr-2"/>Go back</button>        
    </div>
  )
}

GuestLoginForm.propTypes = {
  showThisForm: Function,
  handleLogin: Function
}

export default GuestLoginForm;