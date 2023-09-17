import './App.css';
import { createContext, useEffect, useReducer, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import axios from 'axios' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Home/Navbar';
import HeroSection from './components/Home/HeroSection';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Questions from './components/User/Questions';
import UpdateQuestions from './components/Admin/UpdateQuestions';
import AddQuestions from './components/Admin/AddQuestions';

import { initialState, reducer } from './utils/reducer';
import Editor from './components/Editor/Main';
import PageNotFound from './components/404/PageNotFound';
import Footer from './components/Home/Footer';
import Loader from './components/Loader/Loader';

import ScrollToTop from './scroll/ScrollToTop';
import EditQuestions from './components/Admin/EditQuestion';
import ErrorBoundary from './utils/ErrorBoundary';

export const UserContext = createContext()

function App() {

  //Checks whether the user is logged in or not
  const [state, dispatch] = useReducer(reducer, initialState);

  //Checks the role of the user
  const [role, dispatchRole] = useReducer(reducer, "CLIENT")

  const [loader, setLoader] = useState(false)

  const options = {
    method: 'GET',
    withCredentials: true,
    url: `${process.env.REACT_APP_BASE_URL}/user/check`
  }

  useEffect(() => {
    const check = async () => {
      const result = await axios.request(options)

      if (result.status === 201) {
        dispatch({ type: 'USER', payload: true })
        if (result.data === 'ADMIN') {
          dispatchRole({ type: 'ROLE', payload: 'ADMIN' })
        }

      }

      else if (result.status === 401) {
        console.log("No token provided")
        dispatch({ type: 'USER', payload: false });
      }

      setLoader(true)
    }
    check();
  }, [])


  return (
    loader ?
      (<>
        <UserContext.Provider value={{ state, dispatch, role, dispatchRole }}>
          <ToastContainer />

          <Router>

            <Routes>


              <Route path="/" element={
                <>
                  <ScrollToTop />
                  <HeroSection colour={'transparent'} alignment={'mr-20'} />
                  {/* <Footer /> */}
                </>
              }
              />
              <Route path="/login" element={
                <>
                  <Navbar colour={'transparent'} alignment={'mr-20'} edit={true}/>
                  <Login />
                </>
              }
              />
              <Route path="/signup" element={
                <>
                  <Navbar colour={'transparent'} alignment={'mr-20'} edit={true}/>
                  <Signup />
                </>
              }
              />
              <Route path='/questions' element={
                !state ? (
                  <>
                    <Navigate to="/login" />
                  </>
                )
                  :
                  (
                    <>
                      {/* <LoggedInNavbar /> */}
                      <ScrollToTop />
                      <Navbar colour={'#01080E'} alignment={'mr-20'} />
                      <Questions />
                      <Footer />
                    </>
                  )

              }
              />
              <Route path='/adminQuestions' element={
                !state ? (
                  <Navigate to="/login" />
                )
                  :
                  role === 'ADMIN' ?
                    (
                      <>
                        {/* <LoggedInNavbar /> */}
                        <Navbar colour={'#01080E'} alignment={'mr-20'} />
                        <ScrollToTop />
                        <UpdateQuestions />
                        <Footer />
                      </>
                    ) :
                    (
                      <Navigate to="/" />
                    )
              }
              />
              <Route path='/addQuestions' element={
                !state ? (
                  <Navigate to="/login" />
                )
                  :
                  (
                    <>
                      {/* <LoggedInNavbar /> */}
                      <Navbar colour={'#01080E'} alignment={'mr-20'} />
                      <ScrollToTop />
                      <AddQuestions />
                      <Footer />
                    </>
                  )
              }
              />
              <Route path='/editQuestions/:qname' element={
                !state ? (
                  <Navigate to="/login" />
                )
                  :
                  (
                    <>
                      {/* <LoggedInNavbar /> */}
                      <Navbar colour={'#01080E'} alignment={'mr-20'} />
                      <ScrollToTop />
                      <EditQuestions />
                      <Footer />
                    </>
                  )
              }
              />
              <Route path='/questions/:qname' element={
                !state ? (
                  <Navigate to="/login" />
                )
                  :
                  (
                    <>
                      <ErrorBoundary>
                        {/* <LoggedInNavbar /> */}
                        <Navbar colour={'#01080E'} alignment={'mr-4'} edit={true}/>
                        <Editor />
                      </ErrorBoundary>
                    </>
                  )
              }
              />

              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />

            </Routes>
          </Router>

        </UserContext.Provider>

      </>
      ) :
      (<>
        <Loader />
      </>)


  );
}

export default App;
