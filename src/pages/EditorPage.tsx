import {FC, useEffect, useState} from "react";
import {PublicPage} from "../routes/helpers";
import {useApi} from "../hooks/api";
import {useParams} from "react-router-dom";
import {Story} from "../hooks/api/types";
import {Container} from "@mui/material";
import {Loader} from "../components/Loader";
import {Editor} from "../components/editor/Editor";

function NotFound() {
  return (<div>Not found</div>)
}

export const EditorPage: FC = () => {
  const api = useApi()
  const {storyId} = useParams()
  const [story, setStory] = useState<Story>(null!)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stories.getById(Number(storyId))
      .then(story => {
        setStory(story)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [storyId, api.stories])

  return (
    <PublicPage>
      <Container sx={{mt: 4}}>
        <Loader open={loading}/>
        {
          !loading
            ? story
              ? <Editor story={story}/>
              : <NotFound/>
            : null
        }
      </Container>
    </PublicPage>
  )
}
