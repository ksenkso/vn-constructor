import ReactFlow, {addEdge, Edge, Elements, Node, removeElements} from "react-flow-renderer";
import {useEffect, useState} from "react";
import {Connection} from "react-flow-renderer/dist/types";
import {api} from "../hooks/api";

export enum SequenceNodeType {
  Text,
  Sound,
  Animation,
}

export type SequenceNodeDescription =
  | TextNodeDescription
  | SoundNodeDescription;

export interface TextNodeDescription {
  speaker: string;
  text: string;
}

export interface SoundNodeDescription {
  sound: string;
}

export interface AnimationNodeDescription {
  order: number;
}
interface ISequenceNode {
  id: number;
  type: SequenceNodeType;
  description: SequenceNodeDescription;
  sequenceId: number;
  nextId: number | null;
  prevId: number | null;
}

function createEdges(nodes: ISequenceNode[]): Edge[] {
  const edges: Edge[] = [];
  nodes.forEach(node => {
    if (node.nextId) {
      edges.push({
        id: `e${node.id}-${node.nextId}`,
        source: String(node.id),
        target: String(node.nextId),
      })
    }
  })

  return edges
}

function createNodes(source: ISequenceNode[]): Node[] {
  return source.map((node, index) => ({
    id: String(node.id),
    position: {
      x: 100,
      y: 100 + 70 * index
    },
    data: {
      label: (node.description as TextNodeDescription).text
    }
  }))
}


export const StoryGraph = () => {
  const [elements, setElements] = useState<Elements>([]);
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge | Connection) => {
    setElements((els) => addEdge(params, els))
    console.log(params)
  };
  useEffect(() => {
    api.stories.getById(3)
      .then((r) => {
        api.sequences.getById(r.rootId)
          .then(({ data: sequence }) => {
            const nodes = createNodes(sequence.nodes)
            const edges = createEdges(sequence.nodes)
            setElements(els => els.concat(nodes).concat(edges))
          })
      })
  }, [])

  const onSelectionChange = (change: Elements | null) => {
    if (change) {
      console.log(change)
    }
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        deleteKeyCode={46}
      />
    </div>
  )
}

export const Story = () => {
  return (
    <StoryGraph/>
  )
}
