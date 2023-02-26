import { derived, get, writable } from 'svelte/store';

export type PlayerState = {
	playing: boolean;
	context: AudioContext | null;
	bpm: number;
  samples: {
    [sample: string]: AudioBuffer
  }
};

const samples = ['kick',  'snare', 'closed-hat', 'open-hat'];

export const loadSamples = async () => {
  samples.forEach(async sample => {
    const response = await fetch(`/samples/${sample}.wav`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await get(playerStore).context.decodeAudioData(arrayBuffer);
    playerStore.update(p => {
      return {...p, samples: {...p.samples, [sample]: audioBuffer}}
    })
  }) 
}

export const playerStore = writable<PlayerState>({ playing: false, context: null, bpm: 140, samples: {} },  () => {

  playerStore.update(p => ({...p, context: new AudioContext()}))
  loadSamples().then(() => {

  })
});

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

export const currentStep = derived(playerStore, ({ playing, bpm }, set) => {
	if (playing) {
		clearTimers();
		set(beatIndex);
		timers.push(
			setInterval(() => {
				nextBeat();
				set(beatIndex);
			}, bpmToMs(bpm))
		);
	} else {
		beatIndex = 0;
		set(0);
		clearTimers();
	}
});
