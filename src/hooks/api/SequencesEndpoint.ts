import {Endpoint} from "./Endpoint";
import {ISequence} from "./types";
import {IRouteCondition} from "./types/IRouteCondition";

export type GraphSequence = Pick<ISequence, 'id' | 'slug'> & {
  router: GraphRouterNode | null;
}
export type GraphRouterNode = {
  id: number;
  conditions: GraphRouteCondition[];
}
export type GraphRouteCondition = Pick<IRouteCondition, 'to'>


export class SequencesEndpoint extends Endpoint {
  getById(id: number): Promise<Omit<ISequence, 'router' | 'story'>> {
    return this.get(`/sequence/${id}`)
  }

  getForStory(storyId: number): Promise<GraphSequence[]> {
    return this.get(`/sequence/forStory/${storyId}`)
  }
}
