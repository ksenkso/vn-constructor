import {ISequence} from "./ISequence";
import {IRouteCondition} from "./IRouteCondition";

export interface IRouterNode {
  id: number;
  sequenceId: number;
  sequence: ISequence;
  conditions: IRouteCondition[];
}
