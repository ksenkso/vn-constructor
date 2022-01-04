import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {RoutesList} from "./routes";
import {api} from "./hooks/api";
import {observer} from "mobx-react";

const AppLoader = () => {
  return (
    <h1>Loading...</h1>
  )
}

const App = observer(() => {
  useEffect(() => {
    api.refresh()
  }, [])
  return (
    <BrowserRouter>
      {api.isLoggedIn ? <RoutesList/> : <AppLoader />}
    </BrowserRouter>
  );
});

export default App;
