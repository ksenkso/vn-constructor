import {IRole} from "./IRole";
import {IPlayerChoice} from "./IPlayerChoice";
import {IPlayerState} from "./IPlayerState";

export interface IUser {
  id: number;
  username: string;
  password: string;
  roles: IRole[];
  states: IPlayerState[];
  playerChoices: IPlayerChoice[];
}
