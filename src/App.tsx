import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {useApi} from "./hooks/api";
import {observer} from "mobx-react";
import {FC, ReactElement} from "react";

let PublicPage: FC<{ children: ReactElement }> = observer((props) => {
  const api = useApi()
  return api.isLoggedIn ? props.children : <Navigate to="/login"/>
})

const LoginPage = observer(() => {
  const api = useApi()
  return api.isLoggedIn ? <Navigate to="/"/> : <Login/>
})

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicPage>
            <Home />
          </PublicPage>
        }/>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
