import {SequenceNode, Story} from "../../hooks/api/types";
import {Sequence} from "../../hooks/api/SequencesEndpoint";

export type SelectedItem = Story | Sequence | SequenceNode

export class SelectionStore {
    selection: SelectedItem[] = []

    select(items: SelectedItem[]) {
        this.selection = items
    }
}

export const selectionStore = new SelectionStore()
