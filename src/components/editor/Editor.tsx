import {Story} from "../../hooks/api/types";
import {FC} from "react";

interface EditorProps {
    story: Story
}

export const Editor: FC<EditorProps> = ({story}) => {
    return (
        <div>{story.name}</div>
    )
}
