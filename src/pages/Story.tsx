import {Canvas, Node, NodeProps} from "reaflow";
import {EdgeData} from "reaflow/dist/types";

const nodes = [
    {
        id: '1',
        text: '1',
        data: {
            color: 'blue',
            nextId: '2'
        },
    },
    {
        id: '2',
        text: '2',
        data: {
            color: 'red',
            nextId: null
        },
    }
]

interface SequenceNode {
    id: string;
    data: {
        color: string;
        nextId: string | null;
    }
}

function createEdges(nodes: SequenceNode[]): EdgeData[] {
    const edges: EdgeData[] = [];
    nodes.forEach(node => {
        if (node.data.nextId) {
            edges.push({
                id: `${node.id}-${node.data.nextId}`,
                from: node.id,
                to: node.data.nextId,
            })
        }
    })

    return edges
}

const edges = createEdges(nodes)

export const StoryGraph = () => {
    return (
        <Canvas
            maxHeight={1000}
            maxWidth={1000}
            nodes={nodes}
            edges={edges}
            node={(node: NodeProps) => (
                <Node
                    {...node}
                    onClick={() => console.log(node.properties.data)}
                    style={{ fill: node.properties.data?.color }}
                />
            )}
            onLayoutChange={layout => console.log('Layout', layout)}
        />
    )
}

export const Story = () => {
    return (
        <StoryGraph />
    )
}
