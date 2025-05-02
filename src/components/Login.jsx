import { Link } from "react-router-dom";

const Login = ({ loginForm, handleLoginFormChange, handleLoginFormSubmit }) => {
  return (
    <>
      <form
        onSubmit={handleLoginFormSubmit}
        className="w-[50%] rounded-md bg-white p-3 text-black flex flex-col"
      >
        <h3 className="text-2xl font-bold py-5 text-center">Login</h3>
        <label className="text-xl font-semibold py-3 pl-5" htmlFor="email">Email</label>
        <input
          className="w-[75%] text-lg p-2 border-2 rounded-md border-gray-400 mb-5 ml-5"
          onChange={handleLoginFormChange}
          type="email"
          name="email"
          id="email"
          value={loginForm.email}
          placeholder="email"
          required
        />
        <label className="text-xl font-semibold py-3 pl-5" htmlFor="password">Password</label>
        <input
          className="w-[75%] text-lg p-2 border-2 rounded-md border-gray-400 mb-5 ml-5"
          onChange={handleLoginFormChange}
          type="password"
          name="password"
          id="password"
          value={loginForm.password}
          placeholder="password"
          required
        />
        <button className="bg-black py-2 px-4 w-26 self-center rounded-md text-lg font-semibold text-white hover:bg-blue-950" type="submit">Login</button>
        <p>Don't have an account? <Link className="underline text-blue-600 font-bold" to="/signup">Sign Up</Link></p>
      </form>
    </>
  );
};

export default Login;