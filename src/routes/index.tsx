import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Story} from "../pages/Story";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/story" element={<Story/>}/>
    </Routes>
  )
}
