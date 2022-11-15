import {FC, useEffect, useState} from "react";
import {PublicPage} from "../routes/helpers";
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Loader} from "../components/Loader";
import {GraphEditor} from "../components/GraphEditor/GraphEditor";

function NotFound() {
  return (<div>Not found</div>)
}

export const EditorPage: FC = () => {
  const {storyId} = useParams()
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true);

  return (
    <PublicPage>
      <Box>
        <GraphEditor />
      </Box>
    </PublicPage>
  )
}
