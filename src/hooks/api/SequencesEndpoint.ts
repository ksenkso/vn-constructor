import {Endpoint} from "./Endpoint";
import {ISequence} from "./types";

export type SlimSequence = Omit<ISequence, 'choice' | 'nodes' | 'router' | 'story'>



export class SequencesEndpoint extends Endpoint {
  getById(id: number): Promise<Omit<ISequence, 'router' | 'story'>> {
    return this.get(`/sequence/${id}`)
  }

  getForStory(storyId: number): Promise<SlimSequence[]> {
    return this.get(`/sequence/forStory/${storyId}`)
  }
}
