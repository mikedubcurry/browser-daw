import { derived, writable } from 'svelte/store';
import { Conductor } from './audio/Conductor';
import { sequencerStore } from './SequencerStore';
import { samples } from './samples';
import { browser } from '$app/environment';
export type SampleMap = {
	[sample: string]: AudioBuffer;
};

export type PlayerState = {
	playing: boolean;
	bpm: number;
	samples: SampleMap;
};

export type SampleResponse = [string, AudioBuffer][];

export const loadSamples = async (): Promise<SampleResponse> => {
  const context = new AudioContext();
	return await Promise.all(
		samples.map(async (sample) => {
			const response = await fetch(`/samples/${sample}.wav`);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await context.decodeAudioData(arrayBuffer);
			return [sample, audioBuffer];
		})
	);
};

export const playerStore = writable<PlayerState>(
	{ playing: false, bpm: 140, samples: {} },
	() => {
    if(browser)
		loadSamples().then((samples) => {
			samples.forEach(([name, buffer]) => {
				playerStore.update((p) => {
					return { ...p, samples: { ...p.samples, [name]: buffer } };
				});
			});
		});
	}
);

let conductor: Conductor;

export const togglePlay = () => {
	playerStore.update((p) => ({ ...p, playing: !p.playing }));
};

export const setBpm = (value: number) => {
	playerStore.update((p) => ({ ...p, bpm: value }));
};

let timers: NodeJS.Timer[] = [];
let beatIndex = 0;

const clearTimers = () => {
	timers.forEach((t) => clearInterval(t));
	timers = [];
};

const nextBeat = () => {
	beatIndex += 1;
	beatIndex %= 16;
};

const bpmToMs = (bpm: number) => {
	return 60000 / bpm / 4;
};

export const currentStep = derived(
	[playerStore, sequencerStore],
	([{ playing, samples, bpm }, { patterns, currentPattern }], set) => {
		if (!conductor && Object.keys(samples).length === 4) {
			conductor = new Conductor(samples);
		}
		if (conductor && playing) {
			clearTimers();
			set(beatIndex);
			conductor.playBeat(patterns[currentPattern].pattern[beatIndex]);
			timers.push(
				setInterval(() => {
					nextBeat();
					set(beatIndex);
					conductor.playBeat(patterns[currentPattern].pattern[beatIndex]);
				}, bpmToMs(bpm))
			);
		} else {
			beatIndex = 0;
			set(0);
			clearTimers();
		}
	}
);
