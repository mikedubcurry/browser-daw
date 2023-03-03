<script lang="ts">
	import { sequencerStore } from './stores/SequencerStore';
	import { currentStep, playerStore } from './stores/PlayerStore';
	import { debug } from 'svelte/internal';
	export let samples = ['open-hat', 'closed-hat', 'snare', 'kick'];

</script>

<section>
	<div class="sequencer">
		<div class="labels">
			{#each samples as sample}
				<span>{sample}</span>
			{/each}
		</div>
		{#each $sequencerStore.steps as step, i}
			<div
				class="step"
				class:active={i === $currentStep && $playerStore.playing}
				class:beat={i % 4 === 0}
			>
				{#each step as stepState, j}
					<input type="checkbox" bind:checked={$sequencerStore.steps[i][j].state}/>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	.sequencer {
		border: solid 2px black;
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.labels {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.active.active {
		border: solid 1px blue;
		accent-color: rebeccapurple;
	}

	.step {
		display: flex;
		flex-direction: column-reverse;
		gap: 1rem;
		border: solid 1px transparent;
		accent-color: #999;
	}

	.beat {
		border-left: solid 1px black;
	}
</style>
