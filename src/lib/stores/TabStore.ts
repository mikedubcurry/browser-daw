import { writable } from 'svelte/store';

export type Tab = 'sequencer' | 'mixer' | 'synth' | 'timeline';

export const tabStore = writable<Tab>('sequencer');

