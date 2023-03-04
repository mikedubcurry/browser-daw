import { writable } from "svelte/store";

import {samples} from './samples'

export type Step = {
  sample: string;
  state: boolean;
  velocity: number;
}
export type SequencerPattern = [Step, Step, Step, Step][]
export type SequencerState = {
  pattern: SequencerPattern
  name: string
}
export type Patterns = {
  patterns: SequencerState[];
  currentPattern: number;
}

export const sequencerStore = writable<Patterns>({patterns: [], currentPattern: 0}, (set) => {
  const pattern: SequencerPattern = Array.from(Array(16)).map(() => {
    return samples.map(sample => {
      return { sample, state: false, velocity: 100  }
    })
  }) as [Step, Step, Step, Step][]

  set({patterns: [{pattern, name: "Pattern 1"}], currentPattern: 0})
})

export const newPattern = (store: typeof sequencerStore) => {
  const pattern = Array.from(Array(16)).map(() => {
    return samples.map(sample => {
      return { sample, state: false, velocity: 100  }
    })
  }) as [Step, Step, Step, Step][];

  store.update((s) => {
    return { patterns: [...s.patterns, {pattern, name: `Pattern ${s.currentPattern + 2}`}], currentPattern: s.currentPattern + 1 }
  });

}
