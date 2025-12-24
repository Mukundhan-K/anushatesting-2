import { useState, useEffect, Suspense, lazy} from 'react';
import './App.css';

// packages
import { toast, Toaster } from 'sonner';
import {Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// pages
import PagenotFound from "./pages/common/404";

import CheckAuth from './components/common/CheckAuth';
// import AdminView from './pages/AdminView';
import AdminDashBoard from "./components/adminView/DashBoard";
import AddProjects from "./components/adminView/AddProjects";
import ViewProjects from "./components/adminView/ViewProjects";
import Login from './pages/Login';

import { checkUser } from './redux/authSlice';
import Loader from "./components/common/Loader";
import ChangeMyPass from './pages/ChangeMyPass';
import ResetPassword  from './pages/ResetPassword';

const AdminView = lazy(() => import("./pages/AdminView"));

function App() {

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=>state.adminProductReducer);
  const {authChecked, isLoading:loading, isAuthenticated, user} = useSelector((state)=>state.authReducer);

  console.log("user : ", isAuthenticated, user);

  useEffect(() => {
    if (authChecked ) return;
    const verifyUser = async () => {
      try {
        const response = await dispatch(checkUser());
        // console.log("ref tok data:", response);
      } catch (error) {
        console.error(error);
        toast.error("Failed", {
          description: error?.message || "Network error",
        });
      }
    };
    verifyUser();
  }, [dispatch, authChecked ]);


  // ⏳ loader......
    if (isLoading || loading) return <Loader />;

  return (
    <>
      
      <Toaster richColors position="top-center" />
        
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path='/'>
            <Route index element={
              <CheckAuth loading1={isLoading} loading2={loading}>
              <Login />
            </CheckAuth>}></Route>
            <Route path='login' element={
              <CheckAuth loading1={isLoading} loading2={loading}>
              <Login />
            </CheckAuth>}></Route>
          </Route>

          {/* <Route path='/login' element={
            <CheckAuth loading1={isLoading} loading2={loading}>
              <Login />
            </CheckAuth>
          }></Route> */}

          <Route path='/changemypass' element={
            <CheckAuth loading1={isLoading} loading2={loading}>
              <ChangeMyPass />
            </CheckAuth>
          }></Route>

          <Route path='/resetPassword/:token' element={
            <CheckAuth loading1={isLoading} loading2={loading}>
              <ResetPassword />
            </CheckAuth>
          }></Route>

          <Route path='/admin' element={
            <CheckAuth loading1={isLoading} loading2={loading}>
              <AdminView />
            </CheckAuth>
          }>
            <Route index element={<AdminDashBoard />}></Route>
            <Route path='dashboard' element={<AdminDashBoard />}></Route>
            <Route path='addproject' element={<AddProjects />}></Route>
            <Route path='viewprojects/:id' element={<ViewProjects />}></Route>
            <Route path='adduser' element={<AdminDashBoard />}></Route>
          </Route>


          <Route path='*' element={<PagenotFound />}></Route>

        </Routes>
      </Suspense>
    </>
  )
};

export default App;
