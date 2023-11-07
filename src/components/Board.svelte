<script>
  import Card from "./Card.svelte";
  import { store } from "../store/store";
  import AddButton from "./AddButton.svelte";

  // TODO: Render components dynamically from store objects from components array
</script>

<section class="grid">
  {#each $store.cards as card, index (index)}
    <Card {card} />
  {/each}
  <AddButton />
</section>

<style lang="scss">
</style>
