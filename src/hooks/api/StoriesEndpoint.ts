import {Endpoint} from "./Endpoint";

interface Story {
  id: number;
  title: string;
  rootId: number;
}

export class StoriesEndpoint extends Endpoint {
    async getAll(): Promise<Story[]> {
        return this.get('/story')
    }

  async getById(id: number): Promise<Story> {
    return this.get(`/story/${id}`)
  }
}
