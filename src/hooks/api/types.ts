export interface Story {
  id: number;
  name: string;
  rootId: number;
}

export enum SequenceNodeType {
  Text,
  Sound,
  Animation,
}

export type SequenceNodeDescription =
  | TextNodeDescription
  | SoundNodeDescription;

export interface TextNodeDescription {
  speaker: string;
  text: string;
}

export interface SoundNodeDescription {
  sound: string;
}

export interface AnimationNodeDescription {
  order: number;
}

export interface SequenceNode {
  id: number;
  type: SequenceNodeType;
  description: SequenceNodeDescription;
  sequenceId: number;
  nextId: number | null;
  prevId: number | null;
}
