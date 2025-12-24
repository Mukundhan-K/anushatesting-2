import { useState, useEffect, Suspense, lazy} from 'react';
import './App.css';
import 'react-photo-view/dist/react-photo-view.css';

// packages
import { toast, Toaster } from 'sonner';
import {Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// pages
import PagenotFound from "./pages/common/404";
import Layout from "./components/common/Layout";

// import Home from './pages/home';
import Service from './pages/service';
import About from './pages/about';
// import Projects from './pages/Projects';
import ProjectView from './components/projects/projectView';
import Estimator from './pages/estimator';
import Contact from "./pages/contact";
import BackToTopButton from './components/ui/BackToTop';
import PrivacyPolicy from './pages/privacyPolicy';
import Popup from './components/common/Popup';
import OpeningPopup from './components/about/OpeningPopup';

import Loader from "./components/common/Loader";

const Home = lazy(() => import("./pages/home"));
const Projects = lazy(() => import("./pages/Projects"));

function App() {

  const domlocation = useLocation();
  const dispatch = useDispatch();

    const [openPop, setOpenPop] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // useEffect(() => {
  //   if ((domlocation.pathname.includes("/home")) ||
  //       (domlocation.pathname.includes("/services")) ||
  //       (domlocation.pathname.includes("/about")) ||
  //       (domlocation.pathname.includes("/projects")) ||
  //       (domlocation.pathname.includes("/estimator")) ||
  //       (domlocation.pathname.includes("/contact")) 
  //     ) {
  //     const timer = setTimeout(() => {
  //               setShowPopup(true);
  //     }, 5000); // small delay after load
  //     return () => clearTimeout(timer);
  //   }
  // }, [domlocation.pathname]);

  const publicRoutes = [
    "/",
    "/home",
    "/services",
    "/about",
    "/projects",
    "/estimator",
    "/contact",
  ];

  useEffect(() => {
    if ((domlocation.pathname == "/") || (domlocation.pathname.includes("/home"))) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      
        <Toaster richColors position="top-center" />
        { (publicRoutes.includes(domlocation.pathname)) && <>
          <BackToTopButton openPop={openPop} setOpenPop={setOpenPop} />
          <Popup
            isOpen={openPop}
            onClose={() => setOpenPop(false)}
          >
          </Popup>
        </>}

          <Popup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            width={"max-w-[700px]"}
            otrcss={"p-8"}
          >
            <OpeningPopup />
          </Popup>
        
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path='/' element={<Layout />}>
            <Route index element={<Home setOpenPop={setOpenPop} />}></Route>
            <Route path='home' element={<Home setOpenPop={setOpenPop} />}></Route>
            <Route path='services' element={<Service setOpenPop={setOpenPop} />}></Route>
            <Route path='about' element={<About setOpenPop={setOpenPop} />}></Route>
            <Route path='floorplans' element={<About />}></Route>
            <Route path='projects' element={<Projects setOpenPop={setOpenPop} />}></Route>
            <Route path='projects/:projId' element={<ProjectView />}></Route>
            <Route path='estimator' element={<Estimator setOpenPop={setOpenPop} />}></Route>
            <Route path='contact' element={<Contact setOpenPop={setOpenPop} />}></Route>

            <Route path='privacy-policy' element={<PrivacyPolicy />}></Route>
          </Route>

          <Route path='*' element={<PagenotFound />}></Route>

        </Routes>
      </Suspense>
    </>
  )
};

export default App;
