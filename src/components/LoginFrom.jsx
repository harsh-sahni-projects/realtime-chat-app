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

export default LoginForm;