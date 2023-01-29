<script lang="ts">
	import Sequencer from '$lib/Sequencer.svelte';
	import TabBar from '$lib/TabBar.svelte';
	import Tab from '$lib/Tab.svelte';
  import Player from '$lib/Player.svelte';
</script>

<h1>Browser Daw</h1>

<Player />

<TabBar>
	<Tab slot="sequencer">
		<Sequencer />
	</Tab>
	<Tab slot="mixer">
		<div>Mixer</div>
	</Tab>
	<Tab slot="synth">
		<div>Synth</div>
	</Tab>
</TabBar>
