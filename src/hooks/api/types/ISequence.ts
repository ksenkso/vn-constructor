import {IStory} from "./IStory";
import {IChoice} from "./IChoice";
import {ISequenceNode} from "./ISequenceNode";
import {IRouterNode} from "./IRouterNode";

export interface ISequence {
  id: number;
  slug: string;
  storyId: number;
  story: IStory;
  enterProgram: File | null;
  leaveProgram: File | null;
  choiceId: number | null;
  choice: IChoice;
  nodes: ISequenceNode[];
  router: IRouterNode;
}

