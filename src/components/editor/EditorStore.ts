import {IStory} from "../../hooks/api/types";
import {GraphRouteCondition, GraphRouterNode, GraphSequence} from "../../hooks/api/SequencesEndpoint";
import {makeAutoObservable} from "mobx";
import {api} from "../../hooks/api";
import {Edge, Node} from 'react-flow-renderer'
import ELK, {ElkNode} from 'elkjs'
import {ElkEdge} from "elkjs/lib/elk-api";

export type GraphEdge = Edge
export type GraphNode = Node
export type GraphData = Array<GraphNode | GraphEdge>

const routerId = (router: GraphRouterNode) => `r${router.id}`
const sequenceId = (sequence: GraphSequence | GraphRouteCondition) => {
  return (sequence as GraphSequence).id
    ? `s${(sequence as GraphSequence).id}`
    : `s${(sequence as GraphRouteCondition).sequenceId}`
}

export enum GraphNodeType {
  SEQUENCE = 'SEQUENCE',
  ROUTER = 'ROUTER'
}

const createSequence = (sequence: GraphSequence) => ({
  id: sequenceId(sequence),
  type: GraphNodeType.SEQUENCE,
  selectable: true,
  draggable: true,
  position: { x: 0, y: 0 },
})

const createRouter = (router: GraphRouterNode) => ({
  id: routerId(router),
  type: GraphNodeType.ROUTER,
  selectable: true,
  draggable: true,
  position: { x: 0, y: 0 },
})

const createEdge = (fromId: string, toId: string) => ({
  id: `${fromId}-${toId}`,
  source: fromId,
  target: toId,
  type: 'straight'
})

async function createGraph(sequences: GraphSequence[]): Promise<GraphData> {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  sequences.forEach((sequence) => {
    nodes.push(createSequence(sequence))

    if (sequence.router) {
      const rId = routerId(sequence.router)
      const sId = sequenceId(sequence)

      nodes.push(createRouter(sequence.router))
      edges.push(createEdge(sId, rId))

      sequence.router.conditions.forEach(condition => {
        const sourceId = routerId(sequence.router!)
        const targetId = sequenceId(condition)
        edges.push(createEdge(sourceId, targetId))
      })
    }
  })

  const elk = new ELK()

  const layout = await elk.layout({
    id: 'editor',
    layoutOptions: { "elk.algorithm": "mrtree" },
    children: nodes.map(node => ({
      id: node.id,
      width: 100,
      height: 50,
      node,
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
      edge,
    })) as unknown as ElkEdge[]
  })

  return [
    ...((layout.children || []) as Array<ElkNode & {node: GraphNode}>).map((child) => {
      const {node} = child
      node.position = {
        x: child.x!,
        y: child.y!,
      }
      return node
    }),
    ...edges
  ]
}

export class EditorStore {
  story: IStory | null = null
  sequences: GraphSequence[] = []
  graph: GraphData = [];

  constructor() {
    makeAutoObservable(this)
  }

  loadStory(storyId: number) {
    return api.stories.getById(storyId)
      .then(story => {
        this.story = story
      })
  }

  loadSequences() {
    if (!this.story) throw new Error('Story is not loaded')

    return api.sequences.getForStory(this.story.id)
      .then(sequences => {
        this.sequences = sequences
        return createGraph(sequences)
      })
      .then(graph => {
        this.graph = graph
      })
  }
}

export const editorStore = new EditorStore()
