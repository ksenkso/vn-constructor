import React from "react";
import {Navigate, Route, Routes,} from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Story} from "../pages/Story";
import {useApi} from "../hooks/api";
import {observer} from "mobx-react";

export const ProtectedRoute = observer(({ children }: {children: React.ReactElement}) => {
  const api = useApi()

  return api.isLoggedIn ? children : <Navigate to="/login"/>
})

export const LoginRoute = observer((props: any) => {
  const api = useApi()
  return api.isLoggedIn ? <Navigate to="/"/> : props.children
})

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path="/login" element={<LoginRoute><Login/></LoginRoute>}/>
      <Route path="/story" element={
        <ProtectedRoute>
          <Story/>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}
