import {IUser} from "./IUser";
import {IStory} from "./IStory";
import {Variable} from "./Variables";

export interface IPlayerState {
  id: number;
  state: Record<string, Variable>;
  userId: number;
  user: IUser;
  storyId: number;
  story: IStory;

  toMap(): Map<string, Variable>;

  setState(variableMap: Map<string, Variable>): void;
}
