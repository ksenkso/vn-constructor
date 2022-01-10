import {FC, useEffect} from "react";
import {Grid} from "@mui/material";
import {observer} from "mobx-react";
import {editorStore} from "./EditorStore";

interface EditorProps {
}

function EditorCanvas() {
  return null;
}

function EditorSidebar() {
  return null;
}

export const Editor: FC<EditorProps> = observer(() => {
  useEffect(() => {
    if (editorStore.story) {
      editorStore.loadSequences()
        .then(() => {
          console.log(editorStore.sequences)
        })
    }
  }, [])
  return (
    <Grid container>
      <Grid item xs={8}>
        <EditorCanvas />
      </Grid>
      <Grid item xs={4}>
        <EditorSidebar />
      </Grid>
    </Grid>
  )
})
