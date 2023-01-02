<script lang="ts">
  // TODO: maybe this can be a little less hard coded
	import { tabStore } from './stores/TabStore';
	import type { Tab as Ttab } from './stores/TabStore';

	const tabs: Ttab[] = ['sequencer', 'mixer', 'synth'];
	$: currentTab = $tabStore;
</script>

<nav>
	{#each tabs as tab}
		<button on:click={() => tabStore.set(tab)}>{tab}</button>
	{/each}
</nav>

{#if currentTab === 'sequencer'}
	<slot name="sequencer" />
{/if}
{#if currentTab === 'mixer'}
	<slot name="mixer" />
{/if}
{#if currentTab === 'synth'}
	<slot name="synth" />
{/if}
