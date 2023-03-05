<script lang="ts">
	import { sequencerStore, newPattern } from '$lib/stores/SequencerStore';
	import { currentStep, playerStore } from '$lib/stores/PlayerStore';
	import Dropdown from '$lib/Dropdown.svelte';
	export let samples = ['open-hat', 'closed-hat', 'snare', 'kick'];

  $: patternList = $sequencerStore.patterns.map((p, i) => ({item: p.name, id: i}));
</script>

<section>
  <div class="controls">
    <!-- dropdown pattern selector -->
    <button on:click={() => newPattern(sequencerStore)}>New Pattern</button>
    <Dropdown bind:items={patternList} value={patternList[$sequencerStore.currentPattern].item} on:select={(e) => {
              sequencerStore.update(s => ({
              patterns: s.patterns,
              currentPattern: e.detail
              }))
              }}/>
  </div>
	<div class="sequencer">
		<div class="labels">
			{#each samples as sample}
				<span>{sample}</span>
			{/each}
		</div>
		{#each $sequencerStore.patterns[$sequencerStore.currentPattern].pattern as step, i}
			<div
				class="step"
				class:active={i === $currentStep && $playerStore.playing}
				class:beat={i % 4 === 0}
			>
				{#each step as stepState, j}
					<input type="checkbox" bind:checked={$sequencerStore.patterns[$sequencerStore.currentPattern].pattern[i][j].state}/>
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
