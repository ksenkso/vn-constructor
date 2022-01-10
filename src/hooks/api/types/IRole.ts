import {IUser} from "./IUser";

export interface IRole {
  id: number;
  name: string;
  users: IUser[];
}
