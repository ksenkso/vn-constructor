import {ISequence} from "./ISequence";
import {IUser} from "./IUser";
import {IPlayerState} from "./IPlayerState";

export interface IStory {
  id: number;
  name: string;
  owner: IUser;
  rootId: number;
  root: ISequence;
  states: IPlayerState[];
}
