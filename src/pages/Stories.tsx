import {FC, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {useApi} from "../hooks/api";
import {Story} from "../hooks/api/StoriesEndpoint";
import {ButtonLink} from "../components/ButtonLink";
import {StoryDeleteDialog} from "../components/stories/StoryDeleteDialog";

interface StoriesGridProps {
  stories: Story[];
  onDeleteClick: (story: Story) => void;
}

const StoriesGrid: FC<StoriesGridProps> = ({ stories, onDeleteClick }) => {
  return (
    <Grid container>
      {stories.map((story) => (
        <Grid key={story.id} item xs={4}>
          <Card>
            <CardContent>
              <Typography fontSize={16}>
                {story.name}
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonLink to={`/stories/${story.id}`}>
                edit
              </ButtonLink>
              <Button color="error" variant="text" onClick={() => onDeleteClick(story)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export const Stories: FC = () => {
  const api = useApi()
  const [stories, setStories] = useState<Story[]>([])
  const [storyToDelete, setStoryToDelete] = useState<Story>(null!);
  const askDelete = (story: Story) => {
    setStoryToDelete(story)
  }

  const addStory = () => {
    console.log('add story')
  }

  useEffect(() => {
    api.stories.getAll()
      .then(stories => {
        setStories(stories)
      })
  }, [api.stories])
  return (
    <>
      <Grid container alignItems="center" marginBottom={4}>
        <Typography variant="h2">
          Stories
        </Typography>
        <Button variant="contained" onClick={addStory} sx={{ml: 'auto'}}>
          Add
        </Button>
      </Grid>
      <StoriesGrid
        stories={stories}
        onDeleteClick={askDelete}
      />
      <StoryDeleteDialog
        story={storyToDelete}
        open={!!storyToDelete}
        onCancel={() => setStoryToDelete(null!)}
      />
    </>
  )
}
