import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes";
import {Stack} from "@mui/material";
import {Header} from "./components/Header";
import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <Stack>
        <Header/>
        <AppRoutes/>
      </Stack>
    </BrowserRouter>
  )
}
