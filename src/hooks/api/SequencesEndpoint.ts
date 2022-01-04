import {Endpoint} from "./Endpoint";

export interface Sequence {
  id: number;
  nodes: any[];
}

export class SequencesEndpoint extends Endpoint {
  getById(id: number) {
    return this.transport.get(`/sequence/${id}`)
  }
}
