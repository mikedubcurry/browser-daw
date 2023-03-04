import type { Step } from '../SequencerStore';
import type { SampleMap } from '../PlayerStore';

export class Conductor {
	private context: AudioContext;
	private samples: SampleMap;
	private nodes: {
		[sample: string]: AudioBufferSourceNode;
	};
	constructor(context: AudioContext, samples: SampleMap) {
		this.context = context;
		this.samples = samples;
		this.nodes = Object.keys(samples).reduce((nodes, sample) => {
			nodes[sample] = new AudioBufferSourceNode(this.context, { buffer: this.samples[sample] });
			nodes[sample].connect(this.context.destination);
			return nodes;
		}, {} as { [sample: string]: AudioBufferSourceNode });
	}

	public playBeat(beat: [Step, Step, Step, Step]) {
		beat.forEach((sampleStep) => {
			// schedule sample plays here
			if (sampleStep.state) {
				this.nodes[sampleStep.sample].start(this.context.currentTime);
        this.newNode(sampleStep.sample)
			}
		});
	}

  private newNode(sample: string) {
    this.nodes[sample] = new AudioBufferSourceNode(this.context, {buffer: this.samples[sample]})
    this.nodes[sample].connect(this.context.destination)
  }
}
