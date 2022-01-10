import {Endpoint} from "./Endpoint";
import {IStory} from "./types";

export default class StoriesEndpoint extends Endpoint {
  async getAll(): Promise<IStory[]> {
    return this.get('/story')
  }

  async getById(id: number): Promise<IStory> {
    return this.get(`/story/${id}`)
  }

  async destroy(id: number): Promise<void> {
    return this.transport.delete(`/story/${id}`)
  }
}
