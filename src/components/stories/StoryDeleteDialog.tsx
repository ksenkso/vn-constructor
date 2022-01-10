import {FC} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {IStory} from "../../hooks/api/types";

interface DeleteStoryProps {
    open: boolean;
    story: IStory | null;
    onCancel: () => void;
    onConfirm: () => void;
}

export const StoryDeleteDialog: FC<DeleteStoryProps> = ({open, story, onCancel, onConfirm}) => {
    return (
        <Dialog open={open} data-testid="StoryDeleteDialog">
            {story && <>
                <DialogTitle>
                    {`Delete story ${story.name}?`}
                </DialogTitle>
                <DialogActions>
                    <Button data-testid="DeleteCancel" variant="text" onClick={onCancel}>Cancel</Button>
                    <Button data-testid="DeleteConfirm" color="error" variant="text" onClick={onConfirm}>Delete</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
