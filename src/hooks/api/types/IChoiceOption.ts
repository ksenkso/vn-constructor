import {IChoice} from "./IChoice";
import {IPlayerChoice} from "./IPlayerChoice";

export interface IChoiceOption {
  id: number;
  title: string;
  slug: string;
  choiceId: number;
  choice: IChoice;
  playerChoices: IPlayerChoice[];
}
