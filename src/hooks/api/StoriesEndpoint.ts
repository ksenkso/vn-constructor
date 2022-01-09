import {Endpoint} from "./Endpoint";
import {Story} from "./types";

export default class StoriesEndpoint extends Endpoint {
  async getAll(): Promise<Story[]> {
    return this.get('/story')
  }

  async getById(id: number): Promise<Story> {
    return this.get(`/story/${id}`)
  }

  async destroy(id: number): Promise<void> {
    return this.transport.delete(`/story/${id}`)
  }
}
