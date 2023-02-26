export type Step = {
  sample: string;
  state: boolean;
  velocity: number;
}
export type SequencerState = {
  steps: Step[]
}
