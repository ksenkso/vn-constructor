import {IChoice} from "./IChoice";
import {IChoiceOption} from "./IChoiceOption";
import {IUser} from "./IUser";

export interface IPlayerChoice {
  id: number;
  choiceId: number;
  choice: IChoice;
  optionId: number;
  option: IChoiceOption;
  userId: number;
  user: IUser;
}
