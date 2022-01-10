import {Endpoint} from "./Endpoint";
import {ISequence} from "./types";
import {IRouteCondition} from "./types/IRouteCondition";

export type SlimSequence = Omit<ISequence, 'choice' | 'nodes' | 'router' | 'story'>
export type GraphSequence = Pick<ISequence, 'id' | 'slug'> & {
  router: GraphRouterNode | null;
}
export type GraphRouterNode = {
  conditions: GraphRouteCondition[];
}
export type GraphRouteCondition = Pick<IRouteCondition, 'sequenceId'>


export class SequencesEndpoint extends Endpoint {
  getById(id: number): Promise<Omit<ISequence, 'router' | 'story'>> {
    return this.get(`/sequence/${id}`)
  }

  getForStory(storyId: number): Promise<GraphSequence[]> {
    return this.get(`/sequence/forStory/${storyId}`)
  }
}
