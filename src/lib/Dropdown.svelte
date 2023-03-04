<script lang="ts">
	import { createEventDispatcher } from "svelte";



  export let items: {item: string}[] = [];

  export let value: string;

  const dispatch = createEventDispatcher();

  let open = false;

</script>

<div class="container">
  
  <span>{value}</span>

  <span on:click={() => open = !open}>
    <svg class:open={open} viewBox="0 0 20 20">
      <path stroke='#333' stroke-width='1' d='M0 0, 10 20, 20 0'/>
    </svg>
  </span>

  {#if open}
    <ul>
      {#each items as item, i}
        <li on:click={() => {
            dispatch('select', i)
            open = !open
            }}>{item.item}</li>
      {/each}
    </ul>
  {/if}

</div>

<style>
  svg {
    width: 20px;
    transition: transform .2s ease;
  }

  svg.open {
    transform: rotateX(0.5turn);
  }
</style>
