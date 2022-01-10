import {Endpoint} from "./Endpoint";

export interface Sequence {
  id: number;
  nodes: any[];
}

export class SequencesEndpoint extends Endpoint {
  getById(id: number): Promise<Sequence> {
    return this.get(`/sequence/${id}`)
  }

  getForStory(storyId: number): Promise<Sequence[]> {
    return this.get(`/sequence/forStory/${storyId}`)
  }
}
