import { safe_not_equal } from "svelte/internal";
import type { Step } from "../SequencerStore";
import type {SampleMap} from '../PlayerStore'

export class Conductor {
  private context: AudioContext
  private samples: SampleMap
  private nodes: {
    [sample: string]: AudioBufferSourceNode
  }
  constructor(context: AudioContext, samples: SampleMap) {
    this.context = context;
    this.samples = samples
    this.nodes = Object.keys(samples).reduce((nodes, sample) => {
      nodes[sample] = new AudioBufferSourceNode(this.context, {buffer: this.samples[sample]});
      return nodes;
    }, {} as {[sample: string]: AudioBufferSourceNode})
  }

  public playBeat(beat: [Step, Step, Step, Step]) {
    beat.forEach(sampleStep => {
      console.log(sampleStep)
      // schedule sample plays here
    })
  }
}
