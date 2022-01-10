import {FC, useEffect} from "react";
import {Box, Grid} from "@mui/material";
import {observer} from "mobx-react";
import {editorStore, GraphNodeType} from "./EditorStore";
import ReactFlow, {Handle, NodeProps, Position} from "react-flow-renderer";

interface EditorProps {
}

const SequenceNode: FC<NodeProps> = observer((props) => {
  useEffect(() => {
    console.log(props.id, props.type, props.selected)
  }, [props.id, props.selected, props.type])
  return (
    <>
      <Handle
        position={Position.Top}
        type="target"
      />
      <div>
        Sequence
      </div>
      <Handle
        position={Position.Bottom}
        type="source"
      />
    </>
  )
})

const RouterNode: FC<NodeProps> = observer((props) => {
  useEffect(() => {
    console.log(props.id, props.type, props.selected)
  }, [props.id, props.selected, props.type])
  return (
    <>
      <Handle
        position={Position.Top}
        type="target"
      />
      <div>
        Router
      </div>
      <Handle
        position={Position.Top}
        type="source"
      />
    </>
  )
})

const NODE_TYPES = {
  [GraphNodeType.SEQUENCE]: SequenceNode,
  [GraphNodeType.ROUTER]: RouterNode,
}

const EditorCanvas = observer(() => {
  return (
    <Box width={800} height={800} border="1px solid grey">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        elements={editorStore.graph}
      />
    </Box>
  )
});

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
