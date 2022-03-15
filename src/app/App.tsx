// The app declaration
import React from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";
import "../assets/fonts/Claxton-Bold.otf";
import "../assets/fonts/Claxton-Light.otf";
import "../assets/fonts/Claxton.otf";
import About from "../pages/About/About";
import AdminHome from "../pages/Admin/Home/AdminHome";
import Login from "../pages/Admin/Login/Login";
import PrivateRoute from "../pages/Admin/PrivateRoute";
import Body from "../pages/Body";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Music from "../pages/Music/Music";
import "../styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route index element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Route>

      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
}

export default App;
