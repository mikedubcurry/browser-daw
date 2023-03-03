import { derived, get, writable } from 'svelte/store';
import {Conductor} from './audio/Conductor'
import { sequencerStore } from './SequencerStore';
import {samples } from './samples'
export type SampleMap = {
	[sample: string]: AudioBuffer;
};

export type PlayerState = {
	playing: boolean;
	context: AudioContext | null;
	bpm: number;
	samples: SampleMap;
};

export type SampleResponse = [string, AudioBuffer][];


export const loadSamples = async (): Promise<SampleResponse> => {
	return await Promise.all(
		samples.map(async (sample) => {
			const response = await fetch(`/samples/${sample}.wav`);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await get(playerStore).context!.decodeAudioData(arrayBuffer);
			return [sample, audioBuffer];
		})
	);
};

export const playerStore = writable<PlayerState>(
	{ playing: false, context: null, bpm: 140, samples: {} },
	() => {
		playerStore.update((p) => ({ ...p, context: new AudioContext() }));
		loadSamples().then((samples) => {
			samples.forEach(([name, buffer]) => {
				playerStore.update((p) => {
					return { ...p, samples: { ...p.samples, [name]: buffer } };
				});
			});
		});
	}
);


let conductor;

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

export const currentStep = derived([playerStore, sequencerStore], ([{ playing, context, samples, bpm,  }, {steps}], set) => {
  if(!conductor) {
    conductor = new Conductor(context, samples)
  }
	if (playing) {
		clearTimers();
		set(beatIndex);
    conductor.playBeat(steps[beatIndex])
		console.log('playing note');
		timers.push(
			setInterval(() => {
				nextBeat();
				set(beatIndex);
    conductor.playBeat(steps[beatIndex])
				console.log('playing note');
			}, bpmToMs(bpm))
		);
	} else {
		beatIndex = 0;
		set(0);
		clearTimers();
	}
});
