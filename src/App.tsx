import React from 'react';
import './App.less';
import {BrowserRouter} from "react-router-dom";
import {RoutesList} from "./routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
