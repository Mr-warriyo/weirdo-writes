import React, { useRef } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import LoginPage from './components/user/login';
import SignupPage from './components/user/signup';
import ForgotPassPage from './components/user/forgotpass';
import ProfilePage from './components/user/profile';
import DashBoardPage from "./components/notes/dashboard";
import Notes from './components/notes/edit'
import Create from "./components/notes/create"
import Delete from "./components/notes/delete"

function App() {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <React.Fragment>
        <div className='glass-container min-h-screen flex flex-col items-center justify-center'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none md:text-5xl text-center">
          Weirdo Writes
          <br />
          <br />
        </h1>
        <p className="mb-3 text-lg font-extrabold leading-none md:text-lg text-center">
          Looks like the URL you search for is Incorrect, tap the button below to be redirected to Main Site
        </p>
        <br />
        <Link to="/" className="transition ease-in-out delay-125 bg-blue-500 hover:scale-125 hover:bg-indigo-500 duration-300 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent py-2 px-4 rounded-full">
          Return Back!
        </Link> 
      </div>
      </React.Fragment>
    },
    {
      path: "/",
      element: <React.Fragment>
      <div className='bg-scroll glass-container min-h-screen flex flex-col items-center justify-center'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none md:text-5xl text-center">
          Weirdo Writes
          <br />
          <br />
        </h1>
        <p className="mb-3 text-lg font-extrabold leading-none md:text-lg text-center">
          Your secure, real-time notes hub. Edit, share with precision. <br />
          Speedy, authenticated, fostering teamwork and productivity. Experience seamless collaboration now!
        </p>
        <br />
        <Link to="/login" className="transition ease-in-out delay-125 bg-blue-500 hover:scale-125 hover:bg-indigo-500 duration-300 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent py-2 px-4 rounded-full">
          Start Notng!
        </Link> 
      </div>
    </React.Fragment>,
    },
    {
       path: "/login",
       element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    }, 
    {
      path: "/forgotpass",
      element: <ForgotPassPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/dashboard",
      element: <DashBoardPage />
    },
    {
      path: "/create",
      element: <Create />
    },
    {
      path: "/notes/:id",
      element: <Notes />
    },
    {
      path: "/notes/delete/:id",
      element: <Delete />
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  )
}

export default App