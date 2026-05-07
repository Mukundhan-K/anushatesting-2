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
// import HomeCons from './pages/homeCons';
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
    "/home-construction",
    "/commercial-construction",
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
            width={"max-w-[700px]"}
            otrcss={"p-6 md:p-8"}
          >
            <OpeningPopup />
          </Popup>
        </>}

        <CursorFollower />
        
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path='/' element={<Layout setOpenPop={setOpenPop} />}>
            <Route index element={<Home url="default" setOpenPop={setOpenPop} />}></Route>
            <Route path='home' element={<Home url="default" setOpenPop={setOpenPop} />}></Route>
            <Route path='services' element={<Service setOpenPop={setOpenPop} />}></Route>
            <Route path='about' element={<About setOpenPop={setOpenPop} />}></Route>
            <Route path='projects' element={<Projects setOpenPop={setOpenPop} />}></Route>
            <Route path='projects/:projId' element={<ProjectView />}></Route>
            <Route path='estimator' element={<Estimator setOpenPop={setOpenPop} />}></Route>
            <Route path='contact' element={<Contact setOpenPop={setOpenPop} />}></Route>
            <Route path='blogs' element={<Contact setOpenPop={setOpenPop} />}></Route>

            <Route path='privacy-policy' element={<PrivacyPolicy />}></Route>
            <Route path='terms-and-conditions' element={<PrivacyPolicy />}></Route>

          {/* Dynamic landing pages */}
            <Route path="home-construction" element={<Home url="home" setOpenPop={setOpenPop} />} />
            <Route path="commercial-construction" element={<Home url="default" setOpenPop={setOpenPop} />} />
            <Route path="hopital-construction" element={<Home url="hospital" setOpenPop={setOpenPop} />} />
            {/* <Route path="hotel-construction" element={<Home url="commercial" setOpenPop={setOpenPop} />} />
            <Route path="education-construction" element={<Home url="commercial" setOpenPop={setOpenPop} />} /> */}
          </Route>

          <Route path='*' element={<PagenotFound />}></Route>

        </Routes>
      </Suspense>
    </>
  )
};

export default App;
