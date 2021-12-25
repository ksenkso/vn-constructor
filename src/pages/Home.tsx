import {FC, useState} from "react";
import {Button} from "antd";
import {clearAuthTokens, isLoggedIn} from "axios-jwt";
import {Link} from "react-router-dom";

export const Home: FC = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn())

    const logout = () => {
        clearAuthTokens()
        setLoggedIn(false)
    }
    return (
        <div>
            <h1>{loggedIn ? "Hello" : "Log in"}</h1>
            {!loggedIn && <Link className="ant-btn" to="/login">Login</Link>}
            {loggedIn && <Button onClick={logout}>Logout</Button>}
        </div>
    )
}
