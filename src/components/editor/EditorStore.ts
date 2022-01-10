import {ISequenceNode, IStory} from "../../hooks/api/types";
import {SlimSequence} from "../../hooks/api/SequencesEndpoint";
import {makeAutoObservable} from "mobx";
import {api} from "../../hooks/api";

export class EditorStore {
  story: IStory | null = null
  nodes: ISequenceNode[] = []
  sequences: SlimSequence[] = []

  constructor() {
    makeAutoObservable(this)
  }

  loadStory(storyId: number) {
    return api.stories.getById(storyId)
      .then(story => {
        this.story = story
      })
  }

  loadSequences() {
    if (!this.story) throw new Error('Story is not loaded')

    return api.sequences.getForStory(this.story.id)
      .then(sequences => {
        this.sequences = sequences
      })
  }
}

export const editorStore = new EditorStore()
