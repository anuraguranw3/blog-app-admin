import { Link } from "react-router-dom";


const SignUp = ({ signUpForm, handleSignUpFormChange, handleSignUpFormSubmit }) => {
  return (
    <>
      <form
        onSubmit={handleSignUpFormSubmit}
        className="w-[50%] rounded-md bg-white p-3 text-black flex flex-col"
      >
        <h3 className="text-2xl font-bold py-5 text-center">Sign Up</h3>
        <label className="text-xl font-semibold py-3 pl-5" htmlFor="username">Username</label>
        <input
          className="w-[75%] text-lg p-2 border-2 rounded-md border-gray-400 mb-5 ml-5"
          onChange={handleSignUpFormChange}
          type="text"
          name="username"
          id="username"
          value={signUpForm.username}
          placeholder="username"
          required
        />
        <label className="text-xl font-semibold py-3 pl-5" htmlFor="email">Email</label>
        <input
          className="w-[75%] text-lg p-2 border-2 rounded-md border-gray-400 mb-5 ml-5"
          onChange={handleSignUpFormChange}
          type="email"
          name="email"
          id="email"
          value={signUpForm.email}
          placeholder="email"
          required
        />
        <label className="text-xl font-semibold py-3 pl-5" htmlFor="password">Password</label>
        <input
          className="w-[75%] text-lg p-2 border-2 rounded-md border-gray-400 mb-5 ml-5"
          onChange={handleSignUpFormChange}
          type="password"
          name="password"
          id="password"
          value={signUpForm.password}
          placeholder="password"
          required
        />
        <button className="bg-black py-2 px-4 w-26 self-center rounded-md text-lg font-semibold text-white hover:bg-blue-950" type="submit">Sign Up</button>
        <p>Already have an account? <Link className="underline text-blue-600 font-bold" to="/login">Login</Link></p>
      </form>
    </>
  );
};

export default SignUp;