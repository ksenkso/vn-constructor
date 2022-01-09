import {FC} from "react";
import {Container, Grid} from "@mui/material";
import {Story} from "../../hooks/api/types";
import {StoryCard} from "./StoryCard";

interface StoriesGridProps {
  stories: Story[];
  onDeleteClick: (story: Story) => void;
}

export const StoriesGrid: FC<StoriesGridProps> = ({stories, onDeleteClick}) => {
  return (
    <Container sx={{mt: 4}}>
      <Grid container gap={2}>
        {stories.map((story) => (
          <Grid key={story.id} item xs={4}>
            <StoryCard story={story} onClick={() => onDeleteClick(story)}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
