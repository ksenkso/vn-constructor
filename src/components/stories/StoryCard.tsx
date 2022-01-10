import {IStory} from "../../hooks/api/types";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {ButtonLink} from "../ButtonLink";
import {FC} from "react";

interface Props {
  story: IStory;
  onClick: () => void;
}

export const StoryCard: FC<Props> = (props) => (
  <Card data-testid="StoryCard">
    <CardContent>
      <Typography fontSize={16}>
        {props.story.name}
      </Typography>
    </CardContent>
    <CardActions>
      <ButtonLink to={`/editor/${props.story.id}`}>
        edit
      </ButtonLink>
      <Button color="error" variant="text" onClick={props.onClick}>
        Delete
      </Button>
    </CardActions>
  </Card>
);
