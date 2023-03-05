<script lang="ts">
	import TabBar from '$lib/TabBar.svelte';
	import Tab from '$lib/Tab.svelte';
	import Sequencer from '$lib/sequencer/Sequencer.svelte';
	import Player from '$lib/player/Player.svelte';
	import Timeline from '$lib/timeline/Timeline.svelte';
  import Mixer from '$lib/mixer/Mixer.svelte'
</script>

<Player />

<TabBar>
	<Tab slot="sequencer">
		<Sequencer />
	</Tab>
	<Tab slot="mixer">
    <Mixer />
	</Tab>
	<Tab slot="synth">
		<div>Synth</div>
	</Tab>
	<Tab slot="timeline">
		<Timeline />
	</Tab>
</TabBar>
