import {Story} from "../../hooks/api/StoriesEndpoint";
import {FC} from "react";
import {useApi} from "../../hooks/api";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

interface DeleteStoryProps {
    open: boolean;
    story: Story | null;
    onCancel: () => void;
}

export const StoryDeleteDialog: FC<DeleteStoryProps> = ({open, story, onCancel}) => {
    const api = useApi()
    const deleteStory = () => {
        api.stories.destroy(story!.id)
            .then()
    }
    return (
        <Dialog open={open}>
            {story && <>
                <DialogTitle>
                    {`Delete story ${story.name}?`}
                </DialogTitle>
                <DialogActions>
                    <Button variant="text" onClick={onCancel}>Cancel</Button>
                    <Button color="error" variant="text" onClick={deleteStory}>Delete</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
