import {ISequenceNode, IStory} from "../../hooks/api/types";
import {SlimSequence} from "../../hooks/api/SequencesEndpoint";

export type SelectedItem = IStory | SlimSequence | ISequenceNode

export class SelectionStore {
    selection: SelectedItem[] = []

    select(items: SelectedItem[]) {
        this.selection = items
    }
}

export const selectionStore = new SelectionStore()
