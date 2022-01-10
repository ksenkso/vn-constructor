import {FC, useEffect, useState} from "react";
import {PublicPage} from "../routes/helpers";
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Loader} from "../components/Loader";
import {Editor} from "../components/editor/Editor";
import {editorStore} from "../components/editor/EditorStore";

function NotFound() {
  return (<div>Not found</div>)
}

export const EditorPage: FC = () => {
  const {storyId} = useParams()
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    editorStore.loadStory(Number(storyId))
      .then(() => {
        if (hasError) {
          setHasError(false)
        }
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [storyId, hasError])

  return (
    <PublicPage>
      <Box>
        <Loader loading={loading}/>
        {
          !loading
            ? hasError
              ? <NotFound/>
              : <Editor/>
            : null
        }
      </Box>
    </PublicPage>
  )
}
