import {IChoiceOption} from "./IChoiceOption";
import {IPlayerChoice} from "./IPlayerChoice";

export interface IChoice {
  id: number;
  title: string;
  slug?: string;
  options?: IChoiceOption[];
  playerChoices?: IPlayerChoice[];
}
