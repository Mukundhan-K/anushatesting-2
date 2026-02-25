import { useState, useEffect, Suspense, lazy} from 'react';
import './App.css';

// packages
import { toast, Toaster } from 'sonner';
import {Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// pages
import Layout from "./components/common/Layout";
import Loader from "./components/common/Loader";
import Home from './pages/home';
import CursorFollower from './components/ui/CursorFollower';
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/about"));
const Service = lazy(() => import("./pages/service"));
const ProjectView = lazy(() => import("./components/projects/projectView"));
const Estimator = lazy(() => import("./pages/estimator"));
const Contact = lazy(() => import("./pages/contact"));
const BackToTopButton = lazy(() => import("./components/ui/BackToTop"));
const PrivacyPolicy = lazy(() => import("./pages/privacyPolicy"));
const Popup = lazy(() => import("./components/common/Popup"));
const OpeningPopup = lazy(() => import("./components/about/OpeningPopup"));
const PagenotFound = lazy(() => import("./pages/common/404"));

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
      }, 15000);
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

        <CursorFollower />
        
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path='/' element={<Layout setOpenPop={setOpenPop} />}>
            <Route index element={<Home setOpenPop={setOpenPop} />}></Route>
            <Route path='home' element={<Home setOpenPop={setOpenPop} />}></Route>
            <Route path='services' element={<Service setOpenPop={setOpenPop} />}></Route>
            <Route path='about' element={<About setOpenPop={setOpenPop} />}></Route>
            <Route path='floorplans' element={<About />}></Route>
            <Route path='projects' element={<Projects setOpenPop={setOpenPop} />}></Route>
            <Route path='projects/:projId' element={<ProjectView />}></Route>
            <Route path='estimator' element={<Estimator setOpenPop={setOpenPop} />}></Route>
            <Route path='contact' element={<Contact setOpenPop={setOpenPop} />}></Route>
            <Route path='blogs' element={<Contact setOpenPop={setOpenPop} />}></Route>

            <Route path='privacy-policy' element={<PrivacyPolicy />}></Route>
            <Route path='terms-and-conditions' element={<PrivacyPolicy />}></Route>
          </Route>

          <Route path='*' element={<PagenotFound />}></Route>

        </Routes>
      </Suspense>
    </>
  )
};

export default App;
