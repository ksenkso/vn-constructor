import {ISequence} from "./ISequence";
import {IRouterNode} from "./IRouterNode";

export interface IRouteCondition {
  id: number;
  condition: File;
  routerId: number;
  router: IRouterNode;
  sequenceId: number;
  sequence: ISequence;
}
