import {FC, useCallback, useEffect, useState} from "react";
import {Button, Container, Grid, Typography} from "@mui/material";
import {useApi} from "../hooks/api";
import {StoryDeleteDialog} from "../components/stories/StoryDeleteDialog";
import {Story} from "../hooks/api/types";
import {Loader} from "../components/Loader";
import {StoriesGrid} from "../components/stories/StoriesGrid";

export const StoriesPage: FC = () => {
  const api = useApi()
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [storyToDelete, setStoryToDelete] = useState<Story>(null!);
  const askDelete = (story: Story) => {
    setStoryToDelete(story)
  }

  const deleteStory = () => {
    api.stories.destroy(storyToDelete.id)
      .then(() => {
        setStories((stories) => stories.filter(story => story.id !== storyToDelete.id))
        setStoryToDelete(null!)
      })
  }

  const addStory = () => {
    console.log('add story')
  }

  const loadStories = useCallback(() => {
    setLoading(true)
    api.stories.getAll()
      .then(stories => {
        setStories(stories)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [api.stories])

  useEffect(() => {
    loadStories()
  }, [loadStories])

  return (
    <Container sx={{mt: 4}}>
      <Grid container alignItems="center" marginBottom={4}>
        <Typography variant="h2">
          Stories
        </Typography>
        <Button variant="contained" onClick={addStory} sx={{ml: 'auto'}}>
          Add
        </Button>
      </Grid>
      <Loader open={loading} />
      <StoriesGrid
        stories={stories}
        onDeleteClick={askDelete}
      />
      <StoryDeleteDialog
        story={storyToDelete}
        open={!!storyToDelete}
        onCancel={() => setStoryToDelete(null!)}
        onConfirm={deleteStory}
      />
    </Container>
  )
}
