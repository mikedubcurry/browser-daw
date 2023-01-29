<script lang="ts">
  import {playerStore, togglePlay} from './stores/PlayerStore'
</script>

<div>
  <button on:click={togglePlay}>{$playerStore.playing ? 'Pause' : 'Play'}</button>
</div>
