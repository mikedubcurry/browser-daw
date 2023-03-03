<script lang="ts">
	import { sequencerStore } from './stores/SequencerStore';
	import { currentStep, playerStore, togglePlay } from './stores/PlayerStore';

	$sequencerStore;
	$currentStep;
</script>

<div>
	<button on:click={togglePlay}>{$playerStore.playing ? 'Pause' : 'Play'}</button>
	<label>
		<span>BPM</span>
		<input type="number" min="60" max="200" bind:value={$playerStore.bpm} />
	</label>
</div>
