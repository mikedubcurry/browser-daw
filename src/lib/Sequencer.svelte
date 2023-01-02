<script lang="ts">
	export let samples = ['open-hat', 'closed-hat', 'snare', 'kick'];
	export let steps = Array.from(Array(16)).map(() =>
		Array.from(Array(samples.length)).map(() => 0)
	);
</script>

<section>
	<div class="sequencer">
		<div class="labels">
			{#each samples as sample}
				<span>{sample}</span>
			{/each}
		</div>
		{#each steps as step, i}
			<div class="step" class:beat={i % 4 === 0}>
				{#each step as state}
					<input type="checkbox" checked={state ? true : false} />
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

	.step {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.beat {
		border-left: solid 1px black;
	}
</style>
