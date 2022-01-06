import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import {RoutesList} from "./routes";
import {ProvideAuth} from "./hooks/auth";
import {api} from "./hooks/api";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.refresh()
      .catch(() => {
        navigate('/login')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [navigate])

  return (
    isLoading ? <h1>Loading...</h1> : <RoutesList />
  )
}

const App = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;
