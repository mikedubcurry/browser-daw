import { writable } from 'svelte/store';

export type PlayerState = {
	playing: boolean;
	context: AudioContext | null;
};

export const playerStore = writable<PlayerState>({ playing: false, context: null });

export const togglePlay = () => {
	playerStore.update((p) => ({ ...p, playing: !p.playing }));
};
