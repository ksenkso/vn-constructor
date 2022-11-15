import {FC, useRef} from "react";
import cytoscape from 'cytoscape';

interface GraphEditorProps {
}

export const GraphEditor: FC<GraphEditorProps> = () => {
  const domRef = useRef<HTMLDivElement | null>(null);

  const cy = cytoscape();
  (window as any).cy = cy;


  return (<div style={{width: '500px', height: '500px'}} ref={domRef}></div>);
}
