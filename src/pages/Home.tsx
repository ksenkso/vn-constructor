import {FC} from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {observer} from "mobx-react";
import {api} from "../hooks/api";

export const Home: FC = observer(() => {
  const logout = () => api.logout()

  return (
    <div>
      <div>
        <h1>{api.isLoggedIn ? "Hello" : "Log in"}</h1>
        <Button component={Link} to="/story">Story</Button>
        {!api.isLoggedIn && <Button component={Link} to="/login">Login</Button>}
        {api.isLoggedIn && <Button onClick={logout}>Logout</Button>}
      </div>
    </div>
  )
})
