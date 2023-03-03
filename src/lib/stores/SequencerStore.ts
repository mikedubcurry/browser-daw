import { writable } from "svelte/store";

import {samples} from './samples'

export type Step = {
  sample: string;
  state: boolean;
  velocity: number;
}
export type SequencerSteps = [Step, Step, Step, Step][]
export type SequencerState = {
  steps: SequencerSteps
}

export const sequencerStore = writable<SequencerState>({steps:[],}, (set) => {
  const steps: SequencerSteps = Array.from(Array(16)).map(() => {
    return samples.map(sample => {
      return { sample, state: false, velocity: 100  }
    })
  })

  set({steps})
})
