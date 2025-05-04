import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Error from "./components/Error";
import Login from "./components/Login";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";

const App = () => {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleSignUpFormChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/signup`, signUpForm, {
        headers: {
          'Content-Type': "application/json",
        }
      });
      navigate("/");
      console.log("Signup successfull", response.data);
      getUserInfo();
      setMessage(response.data.message);
      setSignUpForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Error Signing up');
    }
  };

  const handleLoginFormChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, loginForm, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      navigate("/");
      getUserInfo();
      setMessage(response.data.message);
      setLoginForm({
        email: "",
        password: ""
      });
    } catch (err) {
      console.log("Login error ", err);
      setMessage(err.response?.data?.message || 'Error Logging in');
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logout initiated");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      setMessage(response.data.message);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Logout failed ", err);
      setMessage(err.response?.data?.message || 'Logout failed');
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  }, [message]);

  return (
    <div className="w-full flex flex-col items-center">
      {
        message && <h2 className="fixed top-2 m-3 p-3 bg-yellow-500 text-black text-lg font-bold text-center rounded-md">{message}</h2>
      }
      <div className="w-[50%] h-16 flex justify-center items-center bg-white my-3 rounded-xl text-black">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          <Link to="/">Blog App Admin</Link>
        </h1>
      </div>
      <div className="w-full p-3">
        {
          !user ? <div className="flex gap-3 float-right mr-4">
            <Link
              className="bg-white text-black text-lg font-bold rounded-md px-3 py-2"
              to="/signup"
            >Sign Up</Link>

            <Link
              className="bg-white text-black text-lg font-bold rounded-md px-3 py-2"
              to="/login"
            >Login</Link>
          </div>
            : <div className="w-28 flex flex-col float-right gap-2 mr-4">
              <button
                className="bg-white text-black text-lg font-bold rounded-md px-3 py-2 mr-4 float-right"
                type="button"
                onClick={handleLogout}
              >Logout</button>
              <h2>Hello, {user.user.username}</h2>
            </div>
        }
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={
          <SignUp
            signUpForm={signUpForm}
            handleSignUpFormChange={handleSignUpFormChange}
            handleSignUpFormSubmit={handleSignUpFormSubmit}
          />
        } />
        <Route path="/login" element={
          <Login
            loginForm={loginForm}
            handleLoginFormChange={handleLoginFormChange}
            handleLoginFormSubmit={handleLoginFormSubmit}
          />
        } />
        <Route path="/create-post" element={
          <CreatePost
            setMessage={setMessage}
          />
        } />
        <Route path="/posts/:id" element={
          <Post
            user={user}
            setMessage={setMessage}
          />
        } />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;