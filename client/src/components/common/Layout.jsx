import React from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


// pages
import Header from "./Header";
import Footer from "./Footer";
import Loader from './Loader';

const Layout = () => {
  const {isLoading} = useSelector((state)=>state.shopProductReducer);
  if (isLoading) {
      return <Loader />; // or null
  }

  return (<>

    <header>
        <Header />
    </header>

    <main>
        <Outlet />
    </main>

    <footer>
        <Footer />
    </footer>

  </>);
};

export default Layout;