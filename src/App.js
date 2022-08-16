import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import PrivateRoutes from "./components/PrivateRoute/PrivateRoutes";
import SignUp from "./components/SignUp/SignUp";
import Feed from "./components/Feed/Feed";
import Explore from "./components/Explore/Explore";
import Nortification from "./components/Nortification/Nortification";
import UserProfile from "./components/UserProfile/UserProfile";
import { setToken } from "./features/Auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    user?.token && dispatch(setToken({ token: user.token, name: user.name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isLoggedIn && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoutes path="/" element={<Feed />} />
        <PrivateRoutes path="/explore" element={<Explore />} />
        <PrivateRoutes path="/nortification" element={<Nortification />} />
        <PrivateRoutes path="/profile" element={<UserProfile />} />
        {/* <Route path='/navbar' element={<Navbar />} /> */}
      </Routes>
    </div>
  );
}

export default App;
