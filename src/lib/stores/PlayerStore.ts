import { derived, get, writable } from 'svelte/store';
import { Conductor } from './audio/Conductor';
import { sequencerStore } from './SequencerStore';
import { samples } from './samples';
export type SampleMap = {
	[sample: string]: AudioBuffer;
};

// TODO: implement song mode
export type Mode = 'song' | 'loop';

export type PlayerState = {
	playing: boolean;
	context: AudioContext | null;
	bpm: number;
	samples: SampleMap;
  mode: Mode;
};

export type SampleResponse = [string, AudioBuffer][];

export const loadSamples = async (): Promise<SampleResponse> => {
<<<<<<< Updated upstream
=======
	const context = new AudioContext();
>>>>>>> Stashed changes
	return await Promise.all(
		samples.map(async (sample) => {
			const response = await fetch(`/samples/${sample}.wav`);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await get(playerStore).context!.decodeAudioData(arrayBuffer);
			return [sample, audioBuffer];
		})
	);
};

<<<<<<< Updated upstream
export const playerStore = writable<PlayerState>(
	{ playing: false, context: null, bpm: 140, samples: {} },
	() => {
		playerStore.update((p) => ({ ...p, context: new AudioContext() }));
=======
export const playerStore = writable<PlayerState>({ playing: false, bpm: 140, samples: {}, mode: 'loop' }, () => {
	if (browser)
>>>>>>> Stashed changes
		loadSamples().then((samples) => {
			samples.forEach(([name, buffer]) => {
				playerStore.update((p) => {
					return { ...p, samples: { ...p.samples, [name]: buffer } };
				});
			});
		});
});

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
<<<<<<< Updated upstream
	([{ playing, context, samples, bpm }, { patterns, currentPattern }], set) => {
		if (!conductor && context && Object.keys(samples).length === 4) {
			conductor = new Conductor(context, samples);
=======
	([{ playing, samples, bpm, mode }, { patterns, currentPattern }], set) => {
		if (!conductor && Object.keys(samples).length === 4) {
			conductor = new Conductor(samples);
>>>>>>> Stashed changes
		}
    let playingLoopMode = playing && mode === 'loop'
		if (conductor && playingLoopMode) {
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

    return () => {
      clearTimers();
    }
	}
);

export const conductorStore = derived([currentStep], ([store], set) => {
	console.log(store);
});
