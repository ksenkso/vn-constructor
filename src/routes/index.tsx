import {Route, Routes} from "react-router-dom";
import {EditorPage} from "../pages/EditorPage";
import {LoginPage} from "../pages/LoginPage";
import {PublicPage} from "./helpers";
import {StoriesPage} from "../pages/StoriesPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PublicPage>
          <StoriesPage/>
        </PublicPage>
      }/>
      <Route path="/editor/:storyId" element={<EditorPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  )
}
