import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import Feature from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Testimonials from "./Testimonials";
import Contactus from "./Contactus";
import Sell from "./Sell";
import { getItem, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
import { getUserData } from "../redux/slices/appConfigSlice";

function Landingpage() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    const token = getItem(KEY_ACCESS_TOKEN);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Header />
      {isLoggedIn ? <Sell /> : <Home />}
      <Testimonials />
      <Feature />
      <Contactus />
      <Footer />
    </>
  );
}

export default Landingpage;
