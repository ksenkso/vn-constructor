import {Variable} from "./Variables";
import {IStory} from "./IStory";

export enum InternalVariables {
  Choice = 'choice',
  Sequence = 'sequence',
}

export interface IStoryState {
  id: number;
  state: Record<string, Variable>;
  storyId: number;
  story: IStory;
}
