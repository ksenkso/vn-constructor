import {FC} from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {api} from "../hooks/api";
import {observer} from "mobx-react";

export const Home: FC = observer(() => {
  const loggedIn = api.isLoggedIn

  const logout = () => {
    api.logout()
  }
  return (
    <div>
      <div>
        <h1>{loggedIn ? "Hello" : "Log in"}</h1>
        <Button component={Link} to="/story">Story</Button>
        {!loggedIn && <Button component={Link} to="/login">Login</Button>}
        {loggedIn && <Button onClick={logout}>Logout</Button>}
      </div>
    </div>
  )
})
