<script lang="ts">
	import { sequencerStore } from '$lib/stores/SequencerStore';
	import {
		currentStep,
		playerStore,
		togglePlay,
		conductorStore,
		type Mode
	} from '$lib/stores/PlayerStore';
	import Dropdown from '$lib/Dropdown.svelte';

	const modes: Mode[] = ['loop', 'song'];
	$sequencerStore;
	$currentStep;

	conductorStore.subscribe(() => {
	});
</script>

<div>
	<button on:click={togglePlay}>{$playerStore.playing ? 'Pause' : 'Play'}</button>
	<div>
		<span>Mode</span>
		<Dropdown
			items={modes.map((m) => ({ item: m }))}
			bind:value={$playerStore.mode}
			on:select={(e) => playerStore.update((p) => ({ ...p, mode: modes[e.detail] }))}
		/>
	</div>
	<label>
		<span>BPM</span>
		<input type="number" min="60" max="200" bind:value={$playerStore.bpm} />
	</label>
</div>
