import {FC, ReactElement} from "react";
import {observer} from "mobx-react";
import {useApi} from "../hooks/api";
import {Navigate} from "react-router-dom";

export const PublicPage: FC<{ children: ReactElement }> = observer((props) => {
    const api = useApi()
    return api.isLoggedIn ? props.children : <Navigate to="/login"/>
})
