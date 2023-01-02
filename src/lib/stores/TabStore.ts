import { writable } from 'svelte/store';

export type Tab = 'sequencer' | 'mixer' | 'synth';

export const tabStore = writable<Tab>('sequencer');

